import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import Layout from './Components/Layout';
import ContactUs from './Pages/ContactUs';
import AboutUs from './Pages/AboutUs';
import BookingPage from './Pages/BookingPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import FAQHelpPage from './Pages/FAQHelpPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for pages with Navbar */}
        <Route path="/" element={
          <Layout>
            <LandingPage />
          </Layout>
        } />

        <Route path="/ContactUs" element={
          <Layout>
            <ContactUs />
          </Layout>
        } />

        <Route path="/AboutUs" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />
        <Route path="/booking" element={
          <Layout>
            <BookingPage />
          </Layout>
        } />
        <Route path="/confirmation" element={
          <Layout>
            <ConfirmationPage />
          </Layout>
        } />
        <Route path="/questions" element={
          <Layout>
            <FAQHelpPage />
          </Layout>
        } />

        {/* Route for LogInPage without Navbar*/}
        <Route path="/Login" element={<LogInPage />} />
        <Route path="/CreateAccount" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;