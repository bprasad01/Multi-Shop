import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import OwlCarousel from "react-owl-carousel";

var $ = require("jquery");
if (typeof window !== "undefined") {
  window.$ = window.jQuery = require("jquery");
}
const carouselData = [
  {
    id: 1,
    title: "Men's Fashion",
    desc: "Lorem rebum magna amet lorem magna erat diam stet.Sadips duo stet amet amet ndiam elitr ipsum diam",
    img: "img/carousel-1.jpg",
  },
  {
    id: 2,
    title: "Women's Fashion",
    desc: "Lorem rebum magna amet lorem magna erat diam stet.Sadips duo stet amet amet ndiam elitr ipsum diam",
    img: "img/carousel-2.jpg",
  },
  {
    id: 3,
    title: "Kid's Fashion",
    desc: "Lorem rebum magna amet lorem magna erat diam stet.Sadips duo stet amet amet ndiam elitr ipsum diam",
    img: "img/carousel-3.jpg",
  },
];

const BannerCarousel = () => {
  return (
    <>
      <div className="container-fluid mb-3">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <div
              id="header-carousel"
              className="carousel slide carousel-fade mb-30 mb-lg-0"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <OwlCarousel
                  className="owl-theme owl-carousel"
                  loop
                  nav={false}
                  autoplay={true}
                  dots={false}
                  autoplayHoverPause={false}
                  items={1}
                  margin={10}
                >
                  {carouselData.map((item) => (
                    <div
                      className="carousel-item position-relative active"
                      style={{ height: "430px" }}
                      key={item.id}
                    >
                      <img
                        className="position-absolute w-100 h-100"
                        src={item.img}
                        style={{ objectFit: "cover" }}
                      />
                      <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: "700px" }}>
                          <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                            {item.title}
                          </h1>
                          <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                            {item.desc}
                          </p>
                          <a
                            className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                            href="#"
                          >
                            Shop Now
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </OwlCarousel>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img className="img-fluid" src="img/offer-1.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="product-offer mb-30" style={{ height: "200px" }}>
              <img className="img-fluid" src="img/offer-2.jpg" alt="" />
              <div className="offer-text">
                <h6 className="text-white text-uppercase">Save 20%</h6>
                <h3 className="text-white mb-3">Special Offer</h3>
                <a href="" className="btn btn-primary">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerCarousel;
