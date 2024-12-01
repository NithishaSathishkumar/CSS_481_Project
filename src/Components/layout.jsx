// src/components/Layout.jsx
import React from 'react';
import Navbar from './navbar';
import ChatWindow from './chatwindow';


const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <ChatWindow />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
