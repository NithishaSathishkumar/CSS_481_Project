import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import Layout from './Components/layout';
import ForgotPassword from './Pages/forgotPassword';
import ResetPassword from './Pages/resetPassword';
import ConfirmationAccountPage from './Pages/ConfirmationAccountPage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import FAQHelpPage from './Pages/FAQHelpPage';
import BookingPage from './Pages/BookingPage';
import ConfirmationPage from './Pages/ConfirmationPage';
import FilterTutor from './Pages/FilterTutor';
import TutorProfilePage from './Pages/TutorProfilePage';
import ProfilePage from './Pages/ProfilePage';
import PaymentPortal from './Pages/PaymentPage';
import ChatApp from './Pages/ChatApp';
import TutorSignup from './Pages/TutorSignup';

function App() {
  return (
    
    <Router>

      {/* Routes with the navbar layout */}
      <Routes>
        Route for LandingPage with Layout (Navbar)
        <Route path="/" element={
          <Layout>
            <LandingPage />
          </Layout>
        } />

        <Route path="/about" element={
          <Layout>
            <AboutUs />
          </Layout>
        } />

        <Route path="/contact" element={
          <Layout>
            <ContactUs />
          </Layout>
        } />

        <Route path="/faq" element={
          <Layout>
            <FAQHelpPage />
          </Layout>
        } />

        <Route path="/booking/:tutorId" element={
          <Layout>
            <BookingPage />
          </Layout>
        } />

        <Route path="/tutorFind" element={
          <Layout>
            <FilterTutor />
          </Layout>
        } />

        <Route path="/tutor/:tutorId" element={
          <Layout>
            <TutorProfilePage />
          </Layout>
        } />

        <Route path="/edit-profile/" element={
          <Layout>
            <ProfilePage />
          </Layout>
        } />

        <Route path="/payment/:tutorId" element={
          <Layout>
            <PaymentPortal />
          </Layout>
        } />

        <Route path="/Chat" element={
          <Layout>
            <ChatApp/>
          </Layout>
        } />

        {/* Route for LogInPage without Layout */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/CreateAccount" element={<SignUpPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/AccountConfirmation" element={<ConfirmationAccountPage />} />
        <Route path='/tutorSignup' element={<TutorSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
