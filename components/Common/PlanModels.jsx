import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";
import { addPlan } from "../../redux/planSlice";
import basicPlan from "../../service/basicPlan";
import proPlan from "../../service/proPlan";
const PlanModels = () => {
   
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addPlan(basicPlan))
    }

    const handleProPlan = () => {
        dispatch(addPlan(proPlan))
    }
    
  return (
    <>
      <div className="container">
        <div className="row">
           {/* Basic Plan Container */}
                <div className="col-sm-6" key={basicPlan.id}>
                <div className="card" style={{ width: "25rem" }}>
                  <img
                    src={basicPlan.img}
                    className="card-img-top px-5"
                    alt="Product"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{basicPlan.title}</h5>
                    <h6 className="card-title text-center">${basicPlan.price}</h6>
                    <p className="card-text">
                      {basicPlan.desc}
                    </p>
                    <div className="flex text-center m-auto">
                      <Link href={'/subscribe'}>
                        <button
                          className="btn btn-primary"
                          style={{ alignItems: "center" }}
                          onClick={handleClick}
                        >
                          Subscribe
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
           {/* Pro Plan Container */}
                <div className="col-sm-6" key={proPlan.id}>
                <div className="card" style={{ width: "25rem" }}>
                  <img
                    src={proPlan.img}
                    className="card-img-top px-5"
                    alt="Product"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{proPlan.title}</h5>
                    <h6 className="card-title text-center">${proPlan.price}</h6>
                    <p className="card-text">
                      {proPlan.desc}
                    </p>
                    <div className="flex text-center m-auto">
                      <Link href={'/subscribe'}>
                        <button
                          className="btn btn-primary"
                          style={{ alignItems: "center" }}
                          onClick={handleProPlan}
                        >
                          Subscribe
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </>
  );
};

export default PlanModels;
