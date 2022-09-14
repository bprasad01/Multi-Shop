import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaBars, FaHeart, FaShoppingCart } from 'react-icons/fa'

const NavBar = () => {

    const [category, setCategory] = useState([]);
    const [ toggleState, setToggleState ] = useState(false);
    useEffect(() => {
        fetchCategoryData();
    }, [])
    const fetchCategoryData = async () => {
        const res = await axios.get('https://wpfurniture.mangoitsol.com/wp-json/wc/store/products/categories');
        const categoryData = res.data;
        setCategory(categoryData);
    }

    const handleTab = () => {
        setToggleState(!toggleState);
    }

  return (
    <>
     <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <a className="btn d-flex align-items-center justify-content-between bg-primary w-100" data-toggle="collapse" style={{height: "65px", padding: "0 30px"}}>
                    <h6 className="text-dark m-0"><FaBars className='mr-2'/>Categories</h6>
                    <FaAngleDown className=' text-dark' onClick={handleTab}/>
                </a>
                {toggleState &&  (<nav className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light" id="navbar-vertical" style={{width:" calc(100% - 30px)", zIndex: "999"}}>
                    <div className="navbar-nav w-100">
                        <a href="" className="nav-item nav-link">Shirts</a>
                        <a href="" className="nav-item nav-link">Jeans</a>
                        <a href="" className="nav-item nav-link">Swimwear</a>
                        <a href="" className="nav-item nav-link">Sleepwear</a>
                        <a href="" className="nav-item nav-link">Sportswear</a>
                        <a href="" className="nav-item nav-link">Jumpsuits</a>
                        <a href="" className="nav-item nav-link">Blazers</a>
                        <a href="" className="nav-item nav-link">Jackets</a>
                        <a href="" className="nav-item nav-link">Shoes</a>
                    </div>
                </nav>)}
               
            </div>
            <div className="col-lg-9">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                    <a href="" className="text-decoration-none d-block d-lg-none">
                        <span className="h1 text-uppercase text-dark bg-light px-2">Multi</span>
                        <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">Shop</span>
                    </a>
                    <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav mr-auto py-0">
                            <Link href={'/'}><a className="nav-item nav-link active">Home</a></Link>
                            <Link href={'/shop'}><a className="nav-item nav-link">Shop</a></Link>
                            <a href="detail.html" className="nav-item nav-link">Shop Detail</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Pages <i className="fa fa-angle-down mt-1"></i></a>
                                <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                                    <a href="cart.html" className="dropdown-item">Shopping Cart</a>
                                    <a href="checkout.html" className="dropdown-item">Checkout</a>
                                </div>
                            </div>
                            <a href="contact.html" className="nav-item nav-link">Contact</a>
                        </div>
                        <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                            <a href="" className="btn px-0">
                                
                                <FaHeart className='text-primary'/>
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                            </a>
                            <a href="" className="btn px-0 ml-3">
                                <FaShoppingCart className='text-primary' />
                                <span className="badge text-secondary border border-secondary rounded-circle" style={{paddingBottom: "2px"}}>0</span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar