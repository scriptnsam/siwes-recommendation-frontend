import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Header from './pages/components/Header';

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Test with another static route */}
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
