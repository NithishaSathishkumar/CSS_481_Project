import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import Layout from './Components/Layout';
import Contact from './Components/contact';
import About from './Components/About';

function App() {
  return (
    <Router>
      <Routes>
        Route for LandingPage with Layout (Navbar)
        <Route path="/" element={
          <Layout>
            <LandingPage />
          </Layout>
        } />

        {/* Route for LogInPage without Layout */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/CreateAccount" element={<SignUpPage />} />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />

        <Route path="/About" element={
          <Layout>
            <About />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;
