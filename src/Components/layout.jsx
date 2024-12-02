import React, { useState } from 'react';
import Navbar from './navbar';
import ChatWindow from './chatwindow';

const Layout = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openChatWithUser = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
    setSelectedUser(null);
  };

  return (
    <div>
      <Navbar />
      <ChatWindow
        isOpen={isChatOpen}
        onClose={closeChat}
        selectedUser={selectedUser}
      />
      <main>
        {React.cloneElement(children, { openChatWithUser })}
      </main>
    </div>
  );
};

export default Layout;
