import Link from "next/link";
import React from "react";
import { FaHeart, FaSearch, FaShoppingCart, FaSyncAlt } from "react-icons/fa";

const RecentProducts = ({ recentProducts }) => {
  return (
    <>
      <div className="container-fluid pt-5 pb-3">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Recent Products</span>
        </h2>
        <div className="row px-xl-5">
          {recentProducts.slice(2).map((product) => (
            <Link href={`/shop/${product.id}`} passHref key={product.id}>
              <div
                key={product.id}
                className="col-lg-3 col-md-4 col-sm-6 pb-1"
                style={{ cursor: "pointer" }}
              >
                <div className="product-item bg-light mb-4">
                  <div className="product-img position-relative overflow-hidden">
                    {product.images.slice(0, 1).map((imgData) => (
                      <img
                        key={imgData.id}
                        className="img-fluid w-100"
                        src={imgData.src}
                        alt="product"
                      />
                    ))}
                    <div className="product-action">
                      <a className="btn btn-outline-dark btn-square" href="">
                        <FaShoppingCart />
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <FaHeart />
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <FaSyncAlt />
                      </a>
                      <a className="btn btn-outline-dark btn-square" href="">
                        <FaSearch />
                      </a>
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <a
                      className="h6 text-decoration-none text-truncate"
                      href=""
                    >
                      {product.name}
                    </a>
                    <div className="d-flex align-items-center justify-content-center mt-2">
                      <h5>${product.prices.price}</h5>
                      <h6 className="text-muted ml-2">
                        <del>${product.prices.regular_price}</del>
                      </h6>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-1">
                      <small className="fa fa-star text-primary mr-1"></small>
                      <small className="fa fa-star text-primary mr-1"></small>
                      <small className="fa fa-star text-primary mr-1"></small>
                      <small className="fa fa-star text-primary mr-1"></small>
                      <small className="fa fa-star text-primary mr-1"></small>
                      <small>(99)</small>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentProducts;
