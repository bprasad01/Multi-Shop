import React, { useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Tabs from "../../components/Common/Tabs";
import RelatedProducts from "../../components/Products/RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cardSlice";

import {
  FaFacebook,
  FaLinkedin,
  FaMinus,
  FaPinterest,
  FaPlus,
  FaShoppingCart,
  FaTwitter,
} from "react-icons/fa";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductPage = ({ product, deviceType, relatedProducts }) => {
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  const { description } = product;
  const dispatch = useDispatch();

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleClick = () => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <div className="container-fluid pb-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 mb-30">
            <div
              id="product-carousel"
              className="carousel slide"
              data-ride="carousel"
            >
              <Carousel
                ssr
                deviceType={deviceType}
                itemClass="image-item"
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={2000}
              >
                {product.images.map((imgD) => (
                  <div className="carousel-inner bg-light" key={imgD.id}>
                    <div className="carousel-item active">
                      <img
                        className="w-100 h-100"
                        src={imgD.src}
                        alt="Image"
                        draggable={false}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="col-lg-7 h-auto mb-30">
            <div className="h-100 bg-light p-30">
              <h3>{product.name}</h3>
              <div className="d-flex mb-3">
                <div className="text-primary mr-2">
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star"></small>
                  <small className="fas fa-star-half-alt"></small>
                  <small className="far fa-star"></small>
                </div>
                <small className="pt-1">({product.review_count} Reviews)</small>
              </div>
              <h3 className="font-weight-semi-bold mb-4">
                ${product.prices.price}
              </h3>
              <p className="mb-4">{product.description}</p>

              <div className="d-flex align-items-center mb-4 pt-2">
                <div
                  className="input-group quantity mr-3"
                  style={{ width: "130px" }}
                >
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-minus"
                      onClick={() => handleQuantity("dec")}
                    >
                      <FaMinus />
                    </button>
                  </div>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-center"
                    value={quantity}
                  />
                  <div className="input-group-btn">
                    <button
                      className="btn btn-primary btn-plus"
                      onClick={() => handleQuantity("inc")}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary px-3" onClick={handleClick}>
                  <FaShoppingCart /> Add To Cart
                </button>
              </div>
              <div className="d-flex pt-2">
                <strong className="text-dark mr-2">Share on:</strong>
                <div className="d-inline-flex">
                  <a className="text-dark px-2" href="">
                    <FaFacebook />
                  </a>
                  <a className="text-dark px-2" href="">
                    <FaTwitter />
                  </a>
                  <a className="text-dark px-2" href="">
                    <FaLinkedin />
                  </a>
                  <a className="text-dark px-2" href="">
                    <FaPinterest />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs description={description} />
      </div>
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const params = context.query;
  const resProduct = await axios.get(
    `https://wpfurniture.mangoitsol.com/wp-json/wc/store/products/${params.id}`
  );
  const resRelated = await axios.get(
    `https://wpfurniture.mangoitsol.com/wp-json/wc/store/products?orderby=slug`
  );
  const product = resProduct.data;
  const relatedProducts = resRelated.data;

  return {
    props: {
      product,
      relatedProducts,
    },
  };
};

export default ProductPage;
