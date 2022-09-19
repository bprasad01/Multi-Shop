import React from "react";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../redux/cardSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const getTotalPrice = () => {
    return cart.reduce(
      (acc, item) => acc + item.quantity * item.prices.price,
      0
    );
  };

  return (
    <>
      {cart.length === 0 ? (
        <h1>Your Cart Is Empty!...</h1>
      ) : (
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
              <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                  <tr>
                    <th>Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cart.map((item) => {
                    return (
                      <tr key={item.id}>
                        {item.images.slice(0, 1).map((imgItem) => (
                          <td className="align-middle" key={imgItem.id}>
                            <img
                              src={imgItem.src}
                              alt="items"
                              style={{ width: "50px" }}
                            />
                            {item.name}
                          </td>
                        ))}

                        <td className="align-middle">${item.prices.price}</td>
                        <td className="align-middle">
                          <div
                            className="input-group quantity mx-auto"
                            style={{ width: "100px" }}
                          >
                            <div className="input-group-btn">
                              <button onClick={() => dispatch(decrementQuantity(item.id))} className="btn btn-sm btn-primary btn-minus">
                               <FaMinus />
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm bg-secondary border-0 text-center"
                              value={item.quantity}
                            />
                            <div className="input-group-btn">
                              <button onClick={() => dispatch(incrementQuantity(item.id))} className="btn btn-sm btn-primary btn-plus">
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          ${item.prices.price * item.quantity}
                        </td>
                        <td className="align-middle">
                          <button onClick={() => dispatch(removeFromCart(item.id))} className="btn btn-sm btn-danger">
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4">
              <form className="mb-30" action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control border-0 p-4"
                    placeholder="Coupon Code"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                  </div>
                </div>
              </form>
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Cart Summary</span>
              </h5>
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>${getTotalPrice()}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">$10</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>${getTotalPrice()}</h5>
                  </div>
                  <button className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
