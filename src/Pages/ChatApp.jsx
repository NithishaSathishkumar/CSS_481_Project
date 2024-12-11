/*
  Idea Credit: https://www.youtube.com/watch?v=zQyrwxMPm88
  Creator's Github Repo: https://github.com/fireship-io/react-firebase-chat

  Note: This file is incomplete and requires additional work for full implementation.
*/
import React, { useRef, useState, useEffect } from 'react';
import '../Styling/ChatApp.css';
import { useAuth } from '/AuthContext';

//Firebase
import { app } from '/firebaseConfi.js'; //Importing Firebase app
import { getDatabase, ref, get } from 'firebase/database'; //Realtime Database functions
import { getFirestore, collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore'; //Firestore SDK
import { useCollectionData } from 'react-firebase-hooks/firestore'; //Hooks for Firestore collections

const firestore = getFirestore(app);
const database = getDatabase(app);

function ChatApp() {
  return (
    <div className="App">
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  //Variables
  const dummy = useRef();
  const { currentUser } = useAuth(); //Get the current logged-in user
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [tutors, setTutors] = useState([]); //Tutors from Realtime Database
  const [selectedTutor, setSelectedTutor] = useState(null); //Selected tutor
  const [formValue, setFormValue] = useState(''); //Chat input field

  //Fetch messages collection from Firestore
  const messagesRef = collection(firestore, 'messages');
  const [messages] = useCollectionData(query(messagesRef, orderBy('createdAt'), limit(25)), { idField: 'id' });

  //Set username and profile image when user logs in
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.displayName || 'Anonymous User');
      setProfileImage(currentUser.photoURL || '');
    }
  }, [currentUser]);

  // Fetch tutors data from Realtime Database
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const tutorsRef = ref(database, 'tutors');  //Reference to the 'tutors' path in the Firebase Realtime Database
        const snapshot = await get(tutorsRef);  //Fetch the data from the database

        if (snapshot.exists()) {
          //If the data exists, convert it into an array of tutor objects
          const tutorsList = Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }));
          setTutors(tutorsList);  //Update the tutors state with the fetched data

        } else {
          console.log('No tutors data available');
        }
      } catch (error) {
        console.error('Error fetching tutors data:', error);
      }
    };

    fetchTutors();
  }, []);

  //Send a message
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!selectedTutor) {
      alert('Please select a tutor to start the chat'); //Deafult Message, user need to click on a tutor
      return;
    }

    const uid = currentUser?.uid || 'anonymous'; //Use actual user ID if logged in
    const photoURL = profileImage; //Default profile image 

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
      tutorId: selectedTutor.id, //Attach the selected tutor's ID to the message
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="ChatAppRootContainer">
      <div className="ChatAppMainContent">
        <div className="ChatAppLeftSideContent">
          <h1>Contact List</h1>
          <div className="ContactsList">
            {tutors.length > 0 ? (
              tutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`TutorContactCard ${selectedTutor?.id === tutor.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTutor(tutor)} //Set selected tutor
                >
                  <img
                    src={tutor.photo || 'https://via.placeholder.com/50'}
                    alt="Tutor Avatar"
                    className="TutorAvatar"
                  />

                  <div className="TutorCardTutorDetails">
                    <p>
                      <b>{tutor.firstName} {tutor.lastName}</b>
                    </p>
                    <p>{tutor.email}</p>
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
                {messages &&
                  messages
                    .filter((msg) => msg.tutorId === selectedTutor.id) //Show messages for selected tutor
                    .map((msg) => (
                      <ChatMessage
                        key={msg.id}
                        message={msg}
                        user={username}
                      />
                    ))}
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
  );
}

function ChatMessage(props) {
  const { text, photoURL } = props.message;
  const { user } = props;

  return (
    <div className="message">
      <img src={photoURL || 'https://via.placeholder.com/50'} alt="Avatar" className="MessageAvatar" />
      <div className="MessageSentUserDetails">
        <p>
          <b>{user}</b>
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ChatApp;
