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
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/" className='fw-semibold' style={{ color: "black" }}>
          🎬 Movie Watchlist
        </Navbar.Brand>
        
        <div className="d-lg-none mx-auto" style={{ maxWidth: '500px', width: '100%', flex: '1' }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} to="/watchlist" style={{ color: "black" }} className='my-3 mx-auto text-decoration-underline'><span className='fw-semibold'>
                {user.firstName}</span>'s Watchlist
              </Nav.Link>
            )}
          </Nav>

          <div className="d-none d-lg-block mx-auto my-2 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <Nav className="ms-auto">
            {user ? (
              <>
                <button type="button" 
                className="btn-grad mx-auto" 
                onClick={logout} 
                data-mdb-ripple-init
                >Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ color: "black" }} className='mx-auto'>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" style={{ color: "black" }} className='mx-auto'>Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
        
      </div>
    </Navbar>
  )
};

export default AppNavbar;
