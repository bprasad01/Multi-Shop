import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/config";
import axios from "axios";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cardSlice";
// stripe
import { loadStripe } from "@stripe/stripe-js";
// paypal
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const router = useRouter();
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const getTotalPrice = () => {
    return cart.reduce(
      (acc, item) => acc + item.quantity * item.prices.price,
      0
    );
  };

  // function for stripe payment integration
  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items : cart,
      email : "test@gmail.com"
    });

    const result = await stripe.redirectToCheckout({
      sessionId : checkoutSession.data.id,
    });

    if(result.error){
      alert(result.error.message);
    }
  }

  // function for subscription
  const createSubscription = async () => {
    try {
      
    } catch (err) {
      console.log(err);
      alert('Payment Failed', err.message);
    }
  }

  const createOrder = async(data) => {
    try {
      const res = await api.post('wp-json/wc/v1/orders', data)
      res.status === 201 && router.push('/');
    } catch (err) {
      console.log(err)
    }
  }

  // This values are the props in the UI
  const amount = getTotalPrice();
  const currency = "USD";
  const style = { layout: "vertical" };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer : shipping.name.full_name,
                address : shipping.address.address_line_1,
                total : getTotalPrice(),
                method : 1
              })
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {cart.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>Your Cart Is Empty!...</h1>
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
                              <button
                                onClick={() =>
                                  dispatch(decrementQuantity(item.id))
                                }
                                className="btn btn-sm btn-primary btn-minus"
                              >
                                <FaMinus />
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm bg-secondary border-0 text-center"
                              value={item.quantity}
                            />
                            <div className="input-group-btn">
                              <button
                                onClick={() =>
                                  dispatch(incrementQuantity(item.id))
                                }
                                className="btn btn-sm btn-primary btn-plus"
                              >
                                <FaPlus />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">
                          ${item.prices.price * item.quantity}
                        </td>
                        <td className="align-middle">
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="btn btn-sm btn-danger"
                          >
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
                  {open ? (
                    <div>
                     <PayPalScriptProvider
                     options={{
                       "client-id": "AXZln8aHJVNeL2xVgwRASscAxyODvvqzV4W5iq3wwvWn5Mt_UwBPOuw-e_wF3DTbbm08fNmRSAwIceo9",
                       components: "buttons",
                       currency: "USD",
                       "disable-funding": "credit,card,p24"
                     }}
                   >
                     <ButtonWrapper currency={currency} showSpinner={false} />
                   </PayPalScriptProvider>
                   <button onClick={createCheckOutSession} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Pay With Stripe
                  </button>
                  <button onClick={createSubscription} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Subscribe
                  </button>
                   </div>
                  ) : (
                    <button onClick={() => setOpen(true)} className="btn btn-block btn-primary font-weight-bold my-3 py-3">
                    Proceed To Checkout
                  </button>
                  )}  
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
