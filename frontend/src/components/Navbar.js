import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import { Navbar, Nav, Button } from 'react-bootstrap';

const AppNavbar = () => {

  const { user, logout } = useContext(AuthContext);

  return (
    <Navbar variant="dark" expand="lg" className="mb-4 sticky-top" style={{ background: '#f77f00', boxShadow: '0 0 20px #1d2d44' }}>
      <div className="container">
        <Navbar.Brand as={Link} to="/" className='fw-semibold' style={{ color: "black" }}>🎬 Movie Watchlist</Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} to="/watchlist" className='text-decoration-underline' style={{ color: "black" }}>
                My Watchlist
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3" style={{ color: "black" }}>Welcome back, {user.firstName}</Navbar.Text>
                {/* <Nav.Link as={Link} to="/wheel" style={{ color: "black" }}>Wheel</Nav.Link> */}
                <Button variant="outline-light" style={{ color: "black" }} onClick={logout} >
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
