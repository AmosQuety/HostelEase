import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./CustomCarousel.css";

const Carousels = () => {
  return (
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
  );
};

export default Carousels;
