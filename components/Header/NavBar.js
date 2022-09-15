import Link from "next/link";
import React, { useState } from "react";
import { FaAngleDown, FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { useSelector } from "react-redux";

const NavBar = () => {

  const quantity = useSelector(state => state.cart)
  
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => {
    setIsOpen(!isOpen);
  };

  const getItemsCount = () => {
    return quantity.reduce((acc, items ) => acc + items.quantity, 0)
  }

  return (
    <>
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <button
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              style={{ height: "65px", padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <FaBars className="mr-2" onClick={() => toggling()} />
                Categories
              </h6>
              <FaAngleDown className=" text-dark" onClick={() => toggling()} />
            </button>
           {isOpen && <Dropdown />}
          </div>
          
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href="" className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link href={"/"} passHref>
                    <a className="nav-item nav-link active">Home</a>
                  </Link>
                  <Link href={"/shop"} passHref>
                    <a className="nav-item nav-link">Shop</a>
                  </Link>
                  <a href="contact.html" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <a href="" className="btn px-0">
                    <FaHeart className="text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      0
                    </span>
                  </a>
                  <Link href={'/cartitem'} passHref>
                  <a className="btn px-0 ml-3">
                    <FaShoppingCart className="text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: "2px" }}
                    >
                      {getItemsCount()}
                    </span>
                  </a>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default NavBar;
