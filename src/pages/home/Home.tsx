// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to the Home Page</h1>
//
//     </div>
//   );
// };

// export default Home;

import React from "react";
import "./Home.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CustomCarousel.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <main>
        <section className="hero">
          {/* Caruosel Component */}
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            showStatus={false}
            dynamicHeight={true}
          >
            <div>
              <img src="assets/hero/hero1.jpg" alt="Slide 1" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="assets/hero/hero2.jpg" alt="Slide 2" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="assets/hero/hero3.jpg" alt="Slide 3" />
              <p className="legend">Legend 3</p>
            </div>
            <div>
              <img src="assets/hero/hero4.jpg" alt="Slide 4" />
              <p className="legend">Legend 4</p>
            </div>
            <div>
              <img src="assets/hero/hero5.jpg" alt="Slide 5" />
              <p className="legend">Legend 5</p>
            </div>
            <div>
              <img src="assets/hero/hero6.jpg" alt="Slide 6" />
              <p className="legend">Legend 6</p>
            </div>
            <div>
              <img src="assets/hero/hero7.jpg" alt="Slide 7" />
              <p className="legend">Legend 7</p>
            </div>
          </Carousel>

          <h2>Find and Book Your Perfect Hostel</h2>
          <p>
            Explore the best hostels in the city with our easy-to-use booking
            system.
          </p>
          <button onClick={() => navigate("/hostels")} className="cta-button">
            Book Now
          </button>
        </section>
        <section className="features">
          <div className="feature">
            <h3>Easy Booking</h3>
            <p>Book your stay in just a few clicks.</p>
          </div>
          <div className="feature">
            <h3>Best Prices</h3>
            <p>Get the best deals and discounts on your bookings.</p>
          </div>
          <div className="feature">
            <h3>Top-rated Hostels</h3>
            <p>
              Stay at the highest-rated hostels reviewed by other travelers.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
