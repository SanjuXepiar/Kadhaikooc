import React, { useRef, useEffect, useState } from "react";
import { usePlayList } from "../context/playlist-context";
import { userInfo } from "../utils/authrelated";
import { createPlaylist } from "../api/playlist_api";
import { MiniLoader } from "./loader/Loader";
const customStyleInput = {
  outlineColor: "var(--vid-primary)",
};
function AddToPlayListBox({ setterFun }) {
  const [playListName, setPlayListName] = useState("");
  const [loader, setLoader] = useState(false);
  const { dispatchPlayList } = usePlayList();
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const addList = () => {
    const userId = userInfo()?.user._id;
    createPlaylist(
      userId,
      playListName,
      dispatchPlayList,
      setterFun,
      setLoader
    );
  };
  return (
    <div className="playlist-modal__input">
      <input
        ref={inputRef}
        type="text"
        value={playListName}
        placeholder="ENTER NAME"
        style={customStyleInput}
        onChange={(e) => setPlayListName(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addList()}
      />
      <button
        disabled={playListName.length === 0}
        style={{ cursor: playListName.length === 0 && "no-drop" }}
        onClick={() => {
          addList();
        }}
      >
        {loader ? (
          <MiniLoader spinner={true} size={{ height: "1rem", width: "1rem" }} />
        ) : (
          "ADD"
        )}
      </button>
    </div>
  );
}

export default AddToPlayListBox;
