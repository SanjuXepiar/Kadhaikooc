import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useLikeHistoryWatchLater } from "../../context/likeHistoryWatchLater-context";
import { usePlayList } from "../../context/playlist-context";
import { userInfo, isAuthenticated } from "../../utils/authrelated";
import {
  saveToLikedVideo,
  removeFromLikedVideo,
} from "../../api/like_watch_history_api";
import { Loader } from "../../shared/loader/Loader";
import "./VideoPage.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { videoData } from "../data";

function VideoPage() {
  const [video, setVideo] = useState(null);
  const { likedVideo, dispatchLikeHistoryWatchLater } =
    useLikeHistoryWatchLater();
  const { dispatchPlayList } = usePlayList();
  let navigate = useNavigate();
  let location = useLocation();
  const { videoid } = useParams();
  let likedOrNot;
  if (video) {
    likedOrNot = likedVideo.some((vid) => vid._id === videoid);
  }

  const isAccessible = (type) => {
    if (isAuthenticated()) {
      if (type === "like") {
        const userId = userInfo()?.user._id;
        likedOrNot
          ? removeFromLikedVideo(userId, videoid, dispatchLikeHistoryWatchLater)
          : saveToLikedVideo(userId, videoid, dispatchLikeHistoryWatchLater);
      }
      if (type === "save") {
        dispatchPlayList({ type: "MODAL_CONTROL", payload: video });
      }
    } else {
      return navigate(
        `/authenticate`,
        { state: { from: location.pathname } },
        { replace: true }
      );
    }
  };
  useEffect(() => {
    const getVideo = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/video/${videoid}`
        );
        setVideo(res.data.video);
      } catch (err) {
        console.log(err.response);
      }
    };
    getVideo();
  }, [videoid]);
  useEffect(() => {
    const updateHistory = async () => {
      try {
        const userId = userInfo()?.user._id;
        const res = await axios.post(`${process.env.REACT_APP_API}/history`, {
          userId,
          videoId: videoid,
        });
        const history = res.data.history.reverse();
        dispatchLikeHistoryWatchLater({
          type: "UPDATE_HISTORY",
          payload: history,
        });
      } catch (err) {
        console.log(err.response);
      }
    };
    isAuthenticated() && updateHistory();
  }, [videoid, dispatchLikeHistoryWatchLater]);
  return (
    <div className="section-padding video-page">
      {video ? (
        <>
          <iframe
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${video.videoLink}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="video-details">
            <h2>{video.title}</h2>
            <div>
              <p>{video.views} •</p>
              <p>{video.timestamp}</p>
            </div>
          </div>
          <div className="video-channel-and-control">
            <div className="channel">
              <Avatar
                alt={video.title}
                src={video.avatar_img}
                className="avatar"
              />
              <p>{video.channel}</p>
            </div>
            <div className="control">
              <div
                className="pointer-cursor"
                onClick={() => isAccessible("like")}
              >
                {video && likedOrNot ? (
                  <ThumbUpIcon className="icon liked" />
                ) : (
                  <ThumbUpAltOutlinedIcon className="icon" />
                )}
                <span>{likedOrNot ? "Unlike" : "Like"}</span>
              </div>
              <div
                className="pointer-cursor"
                onClick={() => isAccessible("save")}
              >
                <PlaylistAddIcon className="icon" />
                <span>Save</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader
          spinner={false}
          size={{ height: "1.5rem", width: "1.5rem" }}
          select={false}
        />
      )}
    </div>
  );
}
export default VideoPage;
