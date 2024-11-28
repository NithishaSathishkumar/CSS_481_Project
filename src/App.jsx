import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import Layout from './Components/Layout';
import Contact from './Pages/contact';
import About from './Pages/About';
import FilterTutor from './Pages/FilterTutor';

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

        <Route path="/FilterTutor" element={
          <Layout>
            <FilterTutor />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;