import React from "react";
import { useSelector } from "react-redux";

const SubscriptionCard = () => {
  const plan = useSelector(state => state.plan);
  
  let price;
  let duration;
  let title;
  plan.products.map(item => {
    price = item.price;
    duration = item.duration;
    title = item.title
    return {price, duration};
})
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <div className="d-flex mt-10">
            <h6 className="card-subtitle mt-10 mb-2 text-muted col-md-6">
              {title} Subscription
            </h6>
            <h6 className="col-md-6 card-subtitle">${price} - {duration}</h6>
          </div>
          <hr />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Total Price - ${price}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
