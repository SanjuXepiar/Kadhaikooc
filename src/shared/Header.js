import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MenuIcon from "@material-ui/icons/Menu";
import SignOut from "../auth/SignOut";
import { isAuthenticated } from "../utils/authrelated";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";
import { useFilterContext } from "../context/filterContext";
import "./Header.css";

function Header() {
  const { authPage, slideOpen, slideClose } = useAuthContext();
  const {
    filters: { text },
    updateFilters,
  } = useFilterContext();
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div className="header" style={{ background: "white" }}>
      <span
        className={`menu-icon ${
          authPage ? "rotate-clock" : "rotate-anticlock"
        }`}
        onClick={() => (authPage ? slideClose() : slideOpen())}
      >
        <MenuIcon />
      </span>
      <NavLink to="/" onClick={() => authPage && slideClose()}>
        <button className="header__logo pointer-cursor">
          <span className="logoText">
            C<span className="ooking">ooking</span> Vid
          </span>
          <PlayCircleFilledIcon style={{ fontSize: "1.5rem" }} />
        </button>
      </NavLink>
      <div
        className="search-section"
        style={{
          visibility: location.pathname === "/" ? "visible" : "hidden",
        }}
      >
        <input
          type="text"
          name="text"
          value={text}
          placeholder="search"
          onChange={updateFilters}
        />
      </div>
      <NavLink to="/authenticate">
        <p className="login">
          {" "}
          {isAuthenticated() ? (
            <SignOut />
          ) : (
            <span
              className="login-item__text"
              onClick={() => navigate(`/authenticate`)}
            >
              Signin
            </span>
          )}
        </p>
      </NavLink>
    </div>
  );
}

export default Header;
