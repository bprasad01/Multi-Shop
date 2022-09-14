import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import OwlCarousel from "react-owl-carousel";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}

const VendorCards = [
  {
    id: 1,
    banner: "img/vendor-1.jpg",
  },
  {
    id: 2,
    banner: "img/vendor-2.jpg",
  },
  {
    id: 3,
    banner: "img/vendor-3.jpg",
  },
  {
    id: 4,
    banner: "img/vendor-4.jpg",
  },
  {
    id: 5,
    banner: "img/vendor-5.jpg",
  },
  {
    id: 6,
    banner: "img/vendor-6.jpg",
  },
  {
    id: 7,
    banner: "img/vendor-7.jpg",
  },
  {
    id: 8,
    banner: "img/vendor-8.jpg",
  },
];

const VendorCarousel = () => {
  return (
    <>
      {" "}
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col">
            <div className="vendor-carousel">
              <OwlCarousel
                className="owl-theme owl-carousel"
                loop
                nav={false}
                autoplay={true}
                dots={false}
                items={5}
                autoplayTimeout={2000}
                autoplaySpeed={2000}
                autoplayHoverPause={false}
                margin = {20}
              >
                {VendorCards.map((card) => (
                  <div className="bg-light p-4" key={card.id}>
                    <img
                      src={card.banner}
                      alt=""
                      style={{ width: "180px", height : "100px" }}
                    />
                  </div>
                ))}
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorCarousel;
