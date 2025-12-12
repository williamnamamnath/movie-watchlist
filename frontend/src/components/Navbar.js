import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

import { Navbar, Nav, Button } from 'react-bootstrap';

const AppNavbar = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Navbar variant="dark" expand="lg" className="mb-4 sticky-top" style={{ background: '#f77f00', boxShadow: '0 0 20px #1d2d44' }}>
      <div className="container">
        <Navbar.Brand as={Link} to="/" className='fw-semibold' style={{ color: "black" }}>🎬 Movie Watchlist</Navbar.Brand>
          <div className="mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar onSearch={handleSearch} />
          </div>
        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} to="/watchlist" className='mx-auto' style={{ color: "black" }}>
                My Watchlist
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <br/>
            {user ? (
              <>
                <Navbar.Text className="mx-auto fw-bold" style={{ color: "black" }}>Welcome back, {user.firstName}</Navbar.Text>
                {/* <Nav.Link as={Link} to="/wheel" style={{ color: "black" }}>Wheel</Nav.Link> */}
                <Button variant="outline-light" className='w-50 mx-auto' style={{ color: "black" }} onClick={logout} >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* <Nav.Link as={Link} to="/wheel" style={{ color: "black" }}>Wheel</Nav.Link> */}
                <Nav.Link as={Link} to="/login" style={{ color: "black" }}>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: "black" }}>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        
      </div>
    </Navbar>
  )
};

export default AppNavbar;
