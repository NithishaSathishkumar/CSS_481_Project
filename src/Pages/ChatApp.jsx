import React, { useRef, useState, useEffect } from 'react';
import '../Styling/ChatApp.css';
import { useAuth } from '/AuthContext';

// Import Firebase app from firebaseConfig.js
import {app} from '/firebaseConfi.js';

// Import Realtime Database functions from Firebase
import { getDatabase, ref, get } from 'firebase/database';

// Import the functions you need from the Firestore SDK
import { getFirestore, collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Import hooks for Firestore collections
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Initialize Firestore and Realtime Database using the imported app
const firestore = getFirestore(app);
const database = getDatabase(app);

function ChatApp() {
  return (
    <div className="App">
      <header></header>
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();

  const { currentUser } = useAuth(); 

  const [username, setUsername] = useState('');

  // Fetch messages collection from Firestore
  const messagesRef = collection(firestore, 'messages');
  const [messages] = useCollectionData(query(messagesRef, orderBy('createdAt'), limit(25)), { idField: 'id' });

  // State for tutors data from Realtime Database
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null); // State to track selected tutor

  //set chat username
  useEffect(() => {

    if (currentUser) {
      setUsername(currentUser.displayName || '');
    }
  }, [currentUser]);

  // Fetch tutors data from Realtime Database using `get` method
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorsRef = ref(database, 'tutors');
        const snapshot = await get(tutorsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const tutorsList = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setTutors(tutorsList);
        } else {
          console.log('No tutors data available');
        }
      } catch (error) {
        console.error('Error fetching tutors data:', error);
      }
    };

    fetchTutors();
  }, []);

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!selectedTutor) {
      alert('Please select a tutor to start the chat');
      return;
    }

    const uid = 'anonymous'; // Placeholder UID for messages without login
    const photoURL = 'https://api.adorable.io/avatars/23/abott@adorable.png';

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      tutorId: selectedTutor.id // Attach the selected tutor's ID to the message
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="ChatAppRootContainer">
        <div className="ChatAppMainContent">
          <div className="ChatAppLeftSideContent">
            <h1>Contact List</h1>
            <div className="ContactsList">
              {tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <div
                    key={tutor.id}
                    className={`TutorContactCard ${selectedTutor && selectedTutor.id === tutor.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTutor(tutor)} // Set selected tutor on click
                  >
                    <img
                      src={tutor.photo}
                      alt="Tutor Avatar"
                      className="TutorAvatar"
                    />

                    <div className="TutorCardTutorDetails">
                      <p>
                        <b>{tutor.firstName} {tutor.lastName}</b>
                      </p>

                      <p>
                        {tutor.email}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tutors available</p>
              )}
            </div>
          </div>

          <div className="ChatAppRightSideContent">
            {selectedTutor ? (
              <>
                <div className="UserChat">
                  <h2>Chat with {selectedTutor.firstName} {selectedTutor.lastName}</h2>
                  {messages && messages
                    .filter((msg) => msg.tutorId === selectedTutor.id) // Filter messages based on selected tutor
                    .map((msg) => <ChatMessage key={msg.id} message={msg} user = {username} />)}
                  <span ref={dummy}></span>
                </div>

                <form className="ChatAppSendingMessage" onSubmit={sendMessage}>
                  <input
                    id="UsersTextArea"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder={`Message ${selectedTutor.firstName}`}
                  />
                  <button className="SendTextButton" type="submit" disabled={!formValue}>
                    Send
                  </button>
                </form>
              </>
            ) : (
              <p>Please select a tutor to start chatting</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL, user } = props.message;

  const messageClass = uid === 'anonymous' ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg'
        }
        alt="Avatar"
        className="MessageAvatar"
      />

      <div className="MessageSentUserDetails">
        <p>
          <b>{props.user}</b>
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatApp;
