import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
// stripe
import { loadStripe } from "@stripe/stripe-js";
// paypal
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");

  const cart = useSelector((state) => state.cart);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  // function for calculating total price
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
      items: cart,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
      country: country,
      city: city,
      state: state,
      zipcode: zipcode,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

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
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: getTotalPrice(),
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <>
      {/* BreadCrumb */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-12">
            <nav className="breadcrumb bg-light mb-30">
              <a className="breadcrumb-item text-dark" href="#">
                Home
              </a>
              <a className="breadcrumb-item text-dark" href="#">
                Shop
              </a>
              <span className="breadcrumb-item active">Checkout</span>
            </nav>
          </div>
        </div>
      </div>

      {/* Checkout */}
      <div className="container-fluid">
        <div className="row px-xl-5">
          <div className="col-lg-8">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Billing Address</span>
            </h5>
            <div className="bg-light p-30 mb-5">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>First Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Last Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>E-mail</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Mobile No</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="+123 456 789"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Address Line 1</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123 Street"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>Country</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New York"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>City</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>State</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="New York"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>ZIP Code</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="123"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <h5 className="section-title position-relative text-uppercase mb-3">
              <span className="bg-secondary pr-3">Order Total</span>
            </h5>
            {cart.length === 0 ? (
              <p>Please add product to proceed payment!...</p>
            ) : (
              <div className="bg-light p-30 mb-5">
                <div className="border-bottom">
                  <h6 className="mb-3">Products</h6>
                  {cart.map((item) => (
                    <div className="d-flex justify-content-between">
                      <p>{item.name}</p>
                      <p>{item.quantity}</p>
                      <p>${getTotalPrice()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-bottom pt-3 pb-2">
                  <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>${getTotalPrice()}</h6>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="d-flex justify-content-between mt-2">
                    <h5>Total</h5>
                    <h5>${getTotalPrice()}</h5>
                  </div>
                </div>
              </div>
            )}
            <div className="mb-5">
              <div className="bg-light p-30">
                {open ? (
                  <div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "AXZln8aHJVNeL2xVgwRASscAxyODvvqzV4W5iq3wwvWn5Mt_UwBPOuw-e_wF3DTbbm08fNmRSAwIceo9",
                        components: "buttons",
                        currency: "USD",
                        "disable-funding": "credit,card,p24",
                      }}
                    >
                      <ButtonWrapper currency={currency} showSpinner={false} />
                    </PayPalScriptProvider>
                    <button
                      onClick={createCheckOutSession}
                      className="btn btn-block btn-primary font-weight-bold my-3 py-3"
                    >
                      Pay With Stripe
                    </button>
                  </div>
                ) : (
                  <button
                    disabled={cart.length === 0 ? true : false}
                    onClick={() => setOpen(true)}
                    className="btn btn-block btn-primary font-weight-bold py-3"
                  >
                    Proced To Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
