// Import React library
import React from 'react';
// Import the Navbar component, which will be used in the layout
import Navbar from './navbar';
// Define the Layout component, which acts as a wrapper for the page structure
// `children` represents the content that will be passed into the layout
const Layout = ({ children }) => {
  return (
    <div>
      {/* Render the Navbar at the top of the layout */}
      <Navbar />
      {/* Render the main content of the page */}
      <main>{children}</main>
    </div>
  );
};
// Export the Layout component to make it available for use in other files
export default Layout;
