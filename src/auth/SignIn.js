import React, { useState } from "react";
import { useVideoContext } from "../context/videoContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUserExploredData } from "../api/like_watch_history_api";
import { getPlaylist } from "../api/playlist_api";
import { useLikeHistoryWatchLater } from "../context/likeHistoryWatchLater-context";
import { usePlayList } from "../context/playlist-context";
import { userInfo } from "../utils/authrelated";
import { toast } from "react-toastify";
import axios from "axios";

function SignIn({ toggleForm }) {
  const { setLoader, closeLoader } = useVideoContext();
  const { dispatchLikeHistoryWatchLater } = useLikeHistoryWatchLater();
  const { dispatchPlayList } = usePlayList();
  const [passwordVisibililty, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formField, setFormField] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();
  const { state } = useLocation();

  const { email, password } = formField;
  const readyToSubmit = email && password;
  const authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      // check to see if the script is being run in a web-page, inside a web-browser or not.
      localStorage.setItem("jwt", JSON.stringify(jwt));
      const userId = userInfo()?.user?._id;
      getUserExploredData(userId, dispatchLikeHistoryWatchLater);
      getPlaylist(userId, dispatchPlayList);
      next();
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (readyToSubmit) {
      try {
        setLoading(true);
        const user = {
          email,
          password,
        };
        const { data, status } = await axios.post(
          `${process.env.REACT_APP_API}/signin`,
          user
        );
        if (data.success && status === 200) {
          const { token, user } = data;
          authenticate({ user, token }, () => {
            setLoader(true);
            navigate(state?.from ? state.from : "/");
            setTimeout(() => {
              closeLoader();
              toast.success(`You have successfully Signed In!`);
            }, 1000);
          });
        }
      } catch (err) {
        setLoading(false);
        return toast.error(err.response.data.message);
      }
    }
  };

  const signinAsGuest = () => {
    setFormField({
      email: "kumar@gmail.com",
      password: "@Kumar12",
    });
  };
  return (
    <div className="formBx">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={email}
        />
        <div className="password-section">
          <input
            type={`${passwordVisibililty ? "text" : "password"}`}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <span
            className="password-visibility"
            onClick={() => setPasswordVisibility(!passwordVisibililty)}
          >
            {passwordVisibililty ? (
              <i className="fas fa-eye-slash icon"></i>
            ) : (
              <i className="fas fa-eye icon"></i>
            )}
          </span>
        </div>
        <button type="submit" disabled={readyToSubmit ? false : true}>
          {loading ? "Signing..." : "Sign In"}
        </button>
        <button
          type="submit"
          className="signin-as-guest"
          onClick={signinAsGuest}
        >
          Sign In as Guest
        </button>
        <p className="signup">
          Don't have an account ?
          <Link to="#" onClick={() => toggleForm()}>
            Sign Up.
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
