import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Wheel from './components/Wheel';
import Register from './pages/Register';
import Login from './pages/Login';
import Watchlist from './pages/Watchlist';
import Home from './pages/Home';
import DetailsPage from './pages/DetailsPage';
import SearchPage from './pages/SearchPage';

import './styles.css';

const App = () => {

  return (
    <div style={{ background: "white", color: "black", minHeight: "100vh", margin: 0, padding: 0 }}>
      <AuthProvider>
        <Router>
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/wheel" element={<Wheel />} />
            <Route path="/movie/:id" element={<DetailsPage />} />
            <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
};

export default App;
