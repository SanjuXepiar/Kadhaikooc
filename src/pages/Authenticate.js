import React, { useState } from "react";
import "./Authenticate.css";
import { isAuthenticated } from "../utils/authrelated";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import { Navigate } from "react-router-dom";

function Authenticate() {
  const [addClass, setClass] = useState(true);
  function toggleForm() {
    setClass((prev) => !prev);
  }
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return (
    <section className="authenticate">
      <div className={addClass ? "container" : "container active"}>
        <div className="user signinBx">
          <div className="imgBx">
            <div>
              <p className="heading">Welcome back</p>
              <p className="para">
                {" "}
                To keep connected with us please login with your personal
                information
              </p>
            </div>
          </div>
          <SignIn toggleForm={toggleForm} />
        </div>
        <div className="user signupBx">
          <SignUp toggleForm={toggleForm} />
          <div className="imgBx">
            <div>
              <p className="heading">Hello friend</p>
              <p className="para">
                Enter you personal details and start your journey with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Authenticate;
