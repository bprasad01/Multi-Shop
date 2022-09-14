import React, { useState } from "react";

const Tabs = ({description}) => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <div className="row px-xl-5">
        <div className="col">
          <div className="bg-light p-30">
            <div className="nav nav-tabs mb-4">
              <a
                className={
                  toggleState === 1
                    ? "nav-item nav-link text-dark active"
                    : "nav-item nav-link text-dark"
                }
                data-toggle="tab"
                onClick={() => toggleTab(1)}
              >
                Description
              </a>
              <a
                className={
                  toggleState === 2
                    ? "nav-item nav-link text-dark active"
                    : "nav-item nav-link text-dark"
                }
                data-toggle="tab"
                onClick={() => toggleTab(2)}
              >
                Information
              </a>
              <a
                className={
                  toggleState === 3
                    ? "nav-item nav-link text-dark active"
                    : "nav-item nav-link text-dark"
                }
                data-toggle="tab"
                onClick={() => toggleTab(3)}
              >
                Reviews (0)
              </a>
            </div>
            <div className="tab-content">
              <div
                className={
                  toggleState === 1
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="tab-pane-1"
              >
                <h4 className="mb-3">Product Description</h4>
                <p>
                  {description}
                </p>
                
              </div>
              <div
                className={
                  toggleState === 2
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="tab-pane-2"
              >
                <h4 className="mb-3">Additional Information</h4>
                <p>
                  Eos no lorem eirmod diam diam, eos elitr et gubergren diam
                  sea. Consetetur vero aliquyam invidunt duo dolores et duo sit.
                  Vero diam ea vero et dolore rebum, dolor rebum eirmod
                  consetetur invidunt sed sed et, lorem duo et eos elitr,
                  sadipscing kasd ipsum rebum diam. Dolore diam stet rebum sed
                  tempor kasd eirmod. Takimata kasd ipsum accusam sadipscing,
                  eos dolores sit no ut diam consetetur duo justo est, sit
                  sanctus diam tempor aliquyam eirmod nonumy rebum dolor
                  accusam, ipsum kasd eos consetetur at sit rebum, diam kasd
                  invidunt tempor lorem, ipsum lorem elitr sanctus eirmod
                  takimata dolor ea invidunt.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">
                        Sit erat duo lorem duo ea consetetur, et eirmod
                        takimata.
                      </li>
                      <li className="list-group-item px-0">
                        Amet kasd gubergren sit sanctus et lorem eos sadipscing
                        at.
                      </li>
                      <li className="list-group-item px-0">
                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                      </li>
                      <li className="list-group-item px-0">
                        Takimata ea clita labore amet ipsum erat justo voluptua.
                        Nonumy.
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">
                        Sit erat duo lorem duo ea consetetur, et eirmod
                        takimata.
                      </li>
                      <li className="list-group-item px-0">
                        Amet kasd gubergren sit sanctus et lorem eos sadipscing
                        at.
                      </li>
                      <li className="list-group-item px-0">
                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                      </li>
                      <li className="list-group-item px-0">
                        Takimata ea clita labore amet ipsum erat justo voluptua.
                        Nonumy.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={
                  toggleState === 3
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="tab-pane-3"
              >
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="mb-4">1 review for Product Name</h4>
                    <div className="media mb-4">
                      <img
                        src="img/user.jpg"
                        alt="Image"
                        className="img-fluid mr-3 mt-1"
                        style={{ width: "45px" }}
                      />
                      <div className="media-body">
                        <h6>
                          John Doe
                          <small>
                            
                            - <i>01 Jan 2045</i>
                          </small>
                        </h6>
                        <div className="text-primary mb-2">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star-half-alt"></i>
                          <i className="far fa-star"></i>
                        </div>
                        <p>
                          Diam amet duo labore stet elitr ea clita ipsum, tempor
                          labore accusam ipsum et no at. Kasd diam tempor rebum
                          magna dolores sed sed eirmod ipsum.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h4 className="mb-4">Leave a review</h4>
                    <small>
                      Your email address will not be published. Required fields
                      are marked *
                    </small>
                    <div className="d-flex my-3">
                      <p className="mb-0 mr-2">Your Rating * :</p>
                      <div className="text-primary">
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                      </div>
                    </div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="message">Your Review *</label>
                        <textarea
                          id="message"
                          cols="30"
                          rows="5"
                          className="form-control"
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor="name">Your Name *</label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Your Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                        />
                      </div>
                      <div className="form-group mb-0">
                        <input
                          type="submit"
                          value="Leave Your Review"
                          className="btn btn-primary px-3"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
