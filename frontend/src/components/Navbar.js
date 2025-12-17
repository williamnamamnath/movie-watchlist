import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import SearchBar from './SearchBar';

import { Navbar, Nav } from 'react-bootstrap';

const AppNavbar = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Navbar variant="dark" expand="lg" className="sticky-top" style={{ background: '#f77f00', boxShadow: '0 0 20px #1d2d44' }}>
      <div className="container-fluid">
        <Navbar.Brand as={Link} to="/" className='fw-semibold' style={{ color: "black" }}>
          🎬 Movie Watchlist
        </Navbar.Brand>
        
          <Nav className="ms-auto me-2">
            {user && (
              <Nav.Link as={Link} to="/watchlist" style={{ color: "black" }} className='mx-auto my-2 text-decoration-underline'>
                {user.firstName}'s Watchlist
              </Nav.Link>
            )}
          </Nav>
          
        <Navbar.Toggle aria-controls="nav" />

        <Navbar.Collapse id="nav">
          <div className="d-lg-none w-100 my-2">
            <SearchBar onSearch={handleSearch} />
          </div>


          <div className="d-none d-lg-block mx-auto my-2 my-lg-0" style={{ maxWidth: '500px', width: '100%' }}>
            <SearchBar onSearch={handleSearch} />
          </div>

          <Nav className="ms-auto">
            {user ? (
              <>
              <button 
              type="button" 
              className="btn btn-danger my-2" 
              onClick={logout}>
                Logout
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
