import React, { useState } from "react";
import { usePlayList } from "../../context/playlist-context";
import { userInfo, isAuthenticated } from "../../utils/authrelated";
import { saveToWatchLater } from "../../api/like_watch_history_api";
import { useNavigate, useLocation } from "react-router-dom";
import { useLikeHistoryWatchLater } from "../../context/likeHistoryWatchLater-context";

function DropDownList({ videoInfo }) {
  const { dispatchPlayList } = usePlayList();
  const { dispatchLikeHistoryWatchLater } = useLikeHistoryWatchLater();
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();
  const accessibility = (type) => {
    if (isAuthenticated()) {
      if (type === "playlist") {
        dispatchPlayList({ type: "MODAL_CONTROL", payload: videoInfo });
      }
      if (type === "watch") {
        const userId = userInfo().user?._id;
        const videoId = videoInfo._id;
        saveToWatchLater(
          userId,
          videoId,
          dispatchLikeHistoryWatchLater,
          setLoader
        );
      }
    } else {
      return navigate(
        `/authenticate`,
        { state: { from: location.pathname } },
        { replace: true }
      );
    }
  };

  return (
    <span className="video-card__option dropdown pointer-cursor">
      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
      <div className="dropdown-content">
        <p onClick={() => accessibility("playlist")}>Save to playlist</p>
        <p onClick={() => accessibility("watch")}>
          {loader ? `Adding......` : "Save to watch Later"}
        </p>
      </div>
    </span>
  );
}

export default DropDownList;
