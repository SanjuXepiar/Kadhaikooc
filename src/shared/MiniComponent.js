import React, { useState } from "react";
import "./MiniComponent.css";
import {
  removeFromLikedVideo,
  removeFromWatchLater,
  removeFromHistory,
} from "../api/like_watch_history_api";
import { removeVideo } from "../api/playlist_api";
import { userInfo } from "../utils/authrelated";
import { useNavigate } from "react-router-dom";

function VideoCardTypeList({
  _id,
  image,
  title,
  views,
  timestamp,
  channel,
  dispatch,
  remove,
  playListId,
}) {
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  const removeFunction = () => {
    const userId = userInfo()?.user?._id;
    if (remove === "REMOVE_FROM_LIKEDVID") {
      removeFromLikedVideo(userId, _id, dispatch, setLoader);
    }
    if (remove === "REMOVE_FROM_HISTORY") {
      removeFromHistory(userId, _id, dispatch, setLoader);
    }
    if (remove === "REMOVE_FROM_WATCHLATER") {
      removeFromWatchLater(userId, _id, dispatch, setLoader);
    }
    if (remove === "REMOVE_VID_FROM_PLAYLIST") {
      removeVideo({
        playlistId: playListId,
        videoId: _id,
        userId,
        dispatchPlayList: dispatch,
        setLoaderTwo: setLoader,
      });
    }
  };

  const navigation = () => {
    return navigate(`/${_id}`);
  };
  return (
    <article className="playlist-video-card">
      <img
        src={image}
        alt={title}
        onClick={navigation}
        className="pointer-cursor"
      />
      <div className="details">
        <h3 className="pointer-cursor" onClick={navigation}>
          {title}
        </h3>
        <p>Channel : {channel}</p>
        <p>{views}</p>
        <p>{timestamp}</p>
        <span className="pointer-cursor" onClick={removeFunction}>
          {loader ? "removing..." : "remove"}
        </span>
      </div>
    </article>
  );
}

// Page incase no item
function NoItem({ heading, buttonText }) {
  let navigate = useNavigate();
  return (
    <article className="no-item">
      <p>{heading}</p>
      <button onClick={() => navigate(`/`)}>{buttonText}</button>
    </article>
  );
}
// Heading
function SectionHeading({ headingName }) {
  return <h2 className="section-heading">{headingName}</h2>;
}

export { NoItem, SectionHeading, VideoCardTypeList };
