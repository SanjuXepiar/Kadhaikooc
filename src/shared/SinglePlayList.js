import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import playlistImage from "../asset/online-live-video-marketing-concept_12892-37.jpg";
import { removeListFromPlaylist } from "../api/playlist_api";
import { usePlayList } from "../context/playlist-context";
import { userInfo } from "../utils/authrelated";

import { useNavigate } from "react-router-dom";
import { MiniLoader } from "./loader/Loader";

function SinglePlayList({ data }) {
  const { dispatchPlayList } = usePlayList();
  const [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  const { _id, name, list } = data;

  const removePlaylist = () => {
    const userId = userInfo()?.user?._id;
    removeListFromPlaylist(userId, _id, dispatchPlayList, setLoader);
  };
  const navigation = () => {
    return navigate(`/playlist/${name}/${_id}`);
  };
  return (
    <div className="playlist-card">
      <img
        src={data.list.length ? data.list[0].image : `${playlistImage}`}
        alt={name}
        onClick={navigation}
        className="pointer-cursor"
        width="190px"
      />
      <article>
        <p
          className="playlist-card__heading pointer-cursor"
          onClick={navigation}
        >
          {name}
        </p>
        <p className="playlist-card__count">No. of videos : {list.length}</p>
        <div
          style={{ height: "2rem", width: "2rem" }}
          className="pointer-cursor"
        >
          {loader ? (
            <MiniLoader
              spinner={false}
              size={{ height: "1.25rem", width: "1.25rem" }}
            />
          ) : (
            <DeleteIcon className="delete-icon" onClick={removePlaylist} />
          )}
        </div>
      </article>
    </div>
  );
}

export default SinglePlayList;
