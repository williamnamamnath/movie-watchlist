import { useEffect, useState } from 'react';

import RandomMovies from '../components/RandomMovies';
import Intro from '../components/Intro';
import SpacingTop from '../components/SpacingTop';
import SpacingBottom from '../components/SpacingBottom';

import heroImg from '../images/hero-section-image.png';

const Home = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Home - Movie Watchlist";
  }, []);

  const handleAddMovie = (movie) => {
    console.log('Movie added to watchlist:', movie);
  };


  return (
    <>
      <div className="container-fluid p-0">
        <div className="position-relative">
          <img 
            src={heroImg} 
            alt="Welcome to Movie Watchlist" 
            className="img-fluid w-100" 
            style={{ 
              maxHeight: '100vh', 
              objectFit: 'cover',
              objectPosition: 'center'
            }} 
          />
        </div>
      </div>      

      <div className="container">
        <SpacingTop />
        
        {loading && (
          <div className="d-flex justify-content-center mt-4">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <RandomMovies onAdd={handleAddMovie} />
      </div>
    </>
  )
};

export default Home;