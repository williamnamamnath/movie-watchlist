import { Carousel } from 'react-bootstrap';

const Intro = () => {
    const features = [
        {
            icon: "📝",
            title: "Personal Watchlists",
            description: "Create and manage personal movie watchlists tailored to your preferences."
        },
        {
            icon: "🔍",
            title: "Movie Discovery",
            description: "Search and discover new movies with our comprehensive movie database."
        },
        {
            icon: "📱",
            title: "Access Anywhere",
            description: "Access your watchlist anywhere, anytime with our responsive design."
        }
    ];

    return (
        <section className="intro m-5 shadow-md" style={{ color: "white" }}>
            <div className="intro-content p-3">
                <h5 className="intro-description">
                    Your personal movie companion for discovering, tracking, and organizing your favorite films.
                </h5>
                <br/>

                <div className="features">
                    <Carousel 
                        indicators={true} 
                        controls={true} 
                        interval={4000}
                        className="mx-auto"
                        style={{ maxWidth: "600px" }}
                    >
                        {features.map((feature, index) => (
                            <Carousel.Item key={index}>
                                <div 
                                    className="d-flex flex-column align-items-center justify-content-center text-center p-4"
                                    style={{ 
                                        minHeight: "200px",
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "10px",
                                        border: "1px solid #e0e0e0"
                                    }}
                                >
                                    <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                                        {feature.icon}
                                    </div>
                                    <h4 className="mb-3" style={{ color: "#1d2d44" }}>
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