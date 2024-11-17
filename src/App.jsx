import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Layout from './Components/layout'

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes with Navbar */}
        <Route path="/" element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App;