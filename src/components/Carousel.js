import React from "react";

class Carousel extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner fullscreen">
          <div className="carousel-item active">
            <img
              src="https://tinyurl.com/4kkfx8j6"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item fullscreen">
            <img
              src="https://tinyurl.com/yph9t4cu"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
