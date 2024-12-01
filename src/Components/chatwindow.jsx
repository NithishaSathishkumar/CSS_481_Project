// ChatWindow.jsx
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { auth } from '/firebaseConfi';
import '/src/Components/ComponentStyling/chatwindow.css';

function ChatWindow({ isOpen, onClose, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (selectedUser && currentUser) {
      const db = getDatabase();
      const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
      const messagesRef = ref(db, `chats/${chatId}`);

      // Listen for new messages
      onValue(messagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setMessages(Object.values(data));
        }
      });
    }
  }, [selectedUser, currentUser]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const db = getDatabase();
      const chatId = [currentUser.uid, selectedUser.uid].sort().join('_');
      const messagesRef = ref(db, `chats/${chatId}`);

      const messageData = {
        senderId: currentUser.uid,
        receiverId: selectedUser.uid,
        text: newMessage,
        timestamp: Date.now(),
      };

      push(messagesRef, messageData);
      setNewMessage('');
    }
  };

  if (!isOpen || !selectedUser) return null;

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>{selectedUser.displayName}</span>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderId === currentUser.uid ? 'sent' : 'received'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;
