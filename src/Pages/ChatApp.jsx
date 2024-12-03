import React, { useRef, useState } from 'react';
// import '../Styling/ChatApp.css';

// Import Firebase app from firebaseConfig.js
import app from '/firebaseConfi.js';

// Import the functions you need from the Firebase SDK
import { getFirestore, collection, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

// Import hooks for Firestore collections
import { useCollectionData } from 'react-firebase-hooks/firestore';

// Initialize Firestore using the imported app
const firestore = getFirestore(app);

function ChatApp() {
  return (
    <div className="App">
      <header>
        
      </header>

      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(firestore, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = 'anonymous'; // Placeholder UID for messages without login
    const photoURL = 'https://api.adorable.io/avatars/23/abott@adorable.png';

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === 'anonymous' ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg'} alt="Avatar" />
      <p>{text}</p>
    </div>
  );
}

export default ChatApp;
