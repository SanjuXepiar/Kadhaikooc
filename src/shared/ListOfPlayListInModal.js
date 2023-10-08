import React, { useState } from "react";
import { usePlayList } from "../context/playlist-context";
import { userInfo } from "../utils/authrelated";
import { addVideo, removeVideo } from "../api/playlist_api";
import { MiniLoader } from "./loader/Loader";

function ListOfPlayListInModal() {
  const { playListStorage } = usePlayList();

  if (!playListStorage.length) {
    return "Playlist will be displayed here!";
  }

  return (
    <>
      {playListStorage.map((playList) => {
        return <ModalList key={playList._id} playList={playList} />;
      })}
    </>
  );
}

export const ModalList = ({ playList }) => {
  const { dispatchPlayList, singleVideo } = usePlayList();
  const [loader, setLoaderOne] = useState(false);

  // to check whether video is present in the list
  const handleCheck = () => {
    return playList?.list?.some((video) => video._id === singleVideo._id);
  };

  const handlePlayListAccess = () => {
    const presentOrNot = playList?.list?.some(
      (video) => video._id === singleVideo._id
    );

    //if vid not present, then add
    const userId = userInfo()?.user._id;
    const playlistId = playList._id;
    const videoId = singleVideo._id;
    if (!presentOrNot) {
      addVideo({
        playlistId,
        video: singleVideo,
        userId,
        dispatchPlayList,
        setLoaderOne,
      });
    } else {
      removeVideo({
        playlistId,
        videoId,
        userId,
        dispatchPlayList,
        setLoaderOne,
      });
    }
  };

  return (
    <div>
      <div style={{ height: "1rem", width: "1rem" }}>
        {loader ? (
          <MiniLoader
            spinner={false}
            size={{ height: "0.75rem", width: "0.75rem" }}
          />
        ) : (
          <input
            type="checkbox"
            checked={handleCheck()}
            onChange={() => handlePlayListAccess(playList._id)}
          />
        )}
      </div>
      <label htmlFor={playList.name}>{playList.name}</label>
    </div>
  );
};

export default ListOfPlayListInModal;
