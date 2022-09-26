import React from "react";

const SubscriptionCard = () => {
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Order Summary</h5>
          <div className="d-flex mt-10">
            <h6 className="card-subtitle mt-10 mb-2 text-muted col-md-6">
              Standard Subscription
            </h6>
            <h6 className="col-md-6 card-subtitle">$10 monthly</h6>
          </div>
          <hr />
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Today Price - $10</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SubscriptionCard;
