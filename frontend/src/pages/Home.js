import { useEffect, useState } from 'react';

import RandomMovies from '../components/RandomMovies';
import Intro from '../components/Intro';
import SpacingTop from '../components/SpacingTop';
import SpacingBottom from '../components/SpacingBottom';

const Home = () => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Home - Movie Watchlist";
  }, []);


  return (
    <div className="container">
      <SpacingTop /> 
      <div className="d-flex justify-content-center">
        <div className="rounded p-2 mb-5 mt-5" style={{ maxWidth: '40vw', minWidth: '300px', width: '100%'}}>
          <h1 className="text-center mb-3" style={{ color: "black" }}>Welcome to 
            <br/>
            <span style={{ color: "#f77f00" }}>Movie Watchlist</span></h1>
            <hr/>
            <p className="intro-description text-center">
                    Your personal movie companion for discovering, tracking, and organizing your favorite films.
                </p>
                <SpacingBottom />
          <Intro />
          <br/>
        </div>
      </div>      

      {loading && (
        <div className="d-flex justify-content-center mt-4">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <RandomMovies />
    </div>
  )
};

export default Home;