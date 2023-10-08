import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import { usePlayList } from "../context/playlist-context";
import AddToPlayListBox from "./AddToPlayListBox";
import ListOfPlayListInModal from "./ListOfPlayListInModal";
import "./PlayListModal.css";

function PlayListModal() {
  const [inputBox, setInputBox] = useState(false);
  const { playListModalState, dispatchPlayList } = usePlayList();
  return (
    <div
      className={`${
        playListModalState ? "playlist-modal show-modal" : "playlist-modal"
      }`}
    >
      <div className="playlist-modal__body">
        <div className="playlist-modal__content">
          {!inputBox && (
            <div className="add-to-playlist">
              <div className="add-to-playlist-text">Save video to...</div>
              <div
                className="add-to-playlist-icon pointer-cursor"
                onClick={() => setInputBox(true)}
              >
                <AddIcon />
                <span> NEW PLAYLIST</span>
              </div>
            </div>
          )}
          {inputBox && <AddToPlayListBox setterFun={setInputBox} />}
          <div className="list">
            <ListOfPlayListInModal />
          </div>
          <div
            className="done-btn pointer-cursor"
            onClick={() => dispatchPlayList({ type: "MODAL_CONTROL" })}
          >
            <DoneIcon />
            <span> Done</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayListModal;
