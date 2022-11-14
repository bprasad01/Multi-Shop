import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { setLogin } from "../../service/authService";

const Login = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const doSubmit = async () => {
    const response = await setLogin(userData);
    const token = response.data.token;
    try {
      if (response.status === 200) {
        localStorage.setItem("token", token);
        router.replace("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const userdata = { ...userData };
    userdata[input.name] = input.value;
    setUserData(userdata);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSubmit();
  };

  return (
    <div className="container">
      <div
        style={{
          width: "400px",
          margin: "auto",
          border: "1px solid black",
          padding: "2rem",
        }}
      >
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example1">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form2Example2">
              Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Sign in
          </button>

          <div className="text-center">
            <p>
              Not a member? <a href="#!">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
