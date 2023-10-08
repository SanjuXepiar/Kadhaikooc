import React from "react";
import { useVideoContext } from "../context/videoContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
function SignOut() {
  const { setLoader, closeLoader } = useVideoContext();
  let navigate = useNavigate();
  const signOutUser = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("jwt");
      setLoader(true);
      navigate(`/authenticate`);
      setTimeout(() => {
        closeLoader();
        toast.success(`Sign Out, Successful!`);
      }, 1000);
    }
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/signout`);
      console.log(response.data.message);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <span
      className="login-item__text pointer-cursor"
      onClick={() => signOutUser()}
    >
      Signout
    </span>
  );
}

export default SignOut;
