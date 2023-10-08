import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ViewListIcon from "@material-ui/icons/ViewList";
import HistoryIcon from "@material-ui/icons/History";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useAuthContext } from "../context/auth-context";

import "./Sidebar.css";

function Sidebar() {
  const { authPage } = useAuthContext();
  return (
    <div className={`sidebar ${authPage ? "slide-in" : "slide-out"}`}>
      <div className="sidebar-firstchild">
        <NavLink to="/" end className="sidebar__item">
          <HomeIcon />
          <p>Home</p>
        </NavLink>
        <NavLink to="/playlist" className="sidebar__item">
          <ViewListIcon />
          <p>Playlist</p>
        </NavLink>
        <NavLink to="/watchlater" className="sidebar__item">
          <WatchLaterIcon />
          <p>Watch later</p>
        </NavLink>
        <NavLink to="/history" className="sidebar__item">
          <HistoryIcon />
          <p>History</p>
        </NavLink>{" "}
        <NavLink to="/likedone" className="sidebar__item">
          <ThumbUpIcon />
          <p>Liked One</p>
        </NavLink>
      </div>
      <div className="footer" style={{ background: "white" }}>
        <p>Made in India</p>
        <img
          src="https://uidesign-lib.netlify.app/images/Flag_of_India.svg"
          alt="Indian-flag"
        />
      </div>
    </div>
  );
}

export default Sidebar;
