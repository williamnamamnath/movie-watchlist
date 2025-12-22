import { Carousel } from 'react-bootstrap';

import watchlist from '../images/watchlist.png';
import searchBar from '../images/search-bar.jpg';
import miniSearchBar from '../images/mini-search-bar.png';
import movieDetails from '../images/movie-details.png';
import randomMovies from '../images/random-movies.png';

const Intro = () => {
    
    const features = [
        {
            image: <img src={watchlist} alt="User's Watchlist" style={{ maxWidth: "85%" }} />,
            title: "Your Movie Watchlist",
            description: "Create and manage your personal movie watchlist."
        },
        {
            image: <img src={searchBar} alt="Search Bar" style={{ maxWidth: "85%" }} />,
            title: "Search for Movies",
            description: "Search and discover movies by making use of the search bar in the navigation bar."
        },
        {
            image: <img src={miniSearchBar} alt="Mini Search Bar" style={{ maxWidth: "85%" }} />,
            title: <>Search for Movies - <em>mobile devices</em></>,
            description: "For mobile devices, simply click on the toggle menu button (☰) to access the search bar."
        },
        {
            image: <img src={movieDetails} alt="Movie Details" style={{ maxWidth: "85%" }} />,
            title: "Detailed Movie Information",
            description: "Access detailed information about your favorite movies by clicking on their movie cards."
        },
        {
            image: <img src={randomMovies} alt="Random Movies" style={{ maxWidth: "85%" }} />,
            title: "Random Movie Suggestions",
            description: <>Looking for recommendations? Browse through the <em>Discover Movies</em> section for random movie suggestions.</>
        }
    ];

    return (
        <section className="intro shadow-md">
            <div className="intro-content">

                <div className="features">
                    <Carousel 
                        indicators={true} 
                        controls={true} 
                        interval={4000}
                        className="mx-auto"
                        style={{ maxWidth: "100%" }}
                        variant="dark"
                    >
                        {features.map((feature, index) => (
                            <Carousel.Item key={index}>
                                <div 
                                    className="d-flex flex-column align-items-center justify-content-center text-center p-4"
                                    style={{ 
                                        minHeight: "250px",
                                        backgroundColor: "#eee8c5",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0"
                                    }}
                                >
                                    <div className='mb-5' style={{ fontSize: "3rem", marginBottom: "15px" }}>
                                        {feature.image}
                                    </div>
                                    <hr style={{ width: "80%", borderTop: "2px solid #1d2d44", marginTop: "15px" }} />
                                    <h4 className="mb-3 fw-bold" style={{ color: "#1d2d44" }}>
                                        {feature.title}
                                    </h4>
                                    <p className="lead" style={{ color: "black" }}>
                                        {feature.description}
                                    </p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Intro;