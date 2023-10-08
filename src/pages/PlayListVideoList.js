import React, { useEffect, useState } from "react";
import { usePlayList } from "../context/playlist-context";
import { useParams } from "react-router-dom";
import { Loader } from "../shared/loader/Loader";
import "./PlayListVideoList.css";
import {
  NoItem,
  SectionHeading,
  VideoCardTypeList,
} from "../shared/MiniComponent";

function PlayListVideoList() {
  const [playlist, setPlaylist] = useState(null);
  const { playListStorage, dispatchPlayList } = usePlayList();
  const { id } = useParams();
  const remove = "REMOVE_VID_FROM_PLAYLIST";

  useEffect(() => {
    // const reqPlayList = playListStorage.filter((list) => list._id === id)[0];
    const reqPlayList =  playListStorage.find((list) => list._id === id);
    setPlaylist(reqPlayList);
  }, [id, playListStorage]);

  return (
    <section className="section-padding">
      {!playlist ? (
        <Loader
          spinner={false}
          size={{ height: "1.5rem", width: "1.5rem" }}
          select={false}
        />
      ) : (
        <>
          <SectionHeading headingName={`Play List / ${playlist?.name}`} />
          {playlist?.list && (
            <div className="video-list-container">
              {playlist?.list?.map((vid) => (
                <VideoCardTypeList
                  key={vid._id}
                  {...vid}
                  dispatch={dispatchPlayList}
                  remove={remove}
                  playListId={playlist._id}
                />
              ))}
            </div>
          )}
          {playlist.list && playlist.list.length === 0 && (
            <NoItem heading={"No Video Added"} buttonText={"Add Some"} />
          )}{" "}
        </>
      )}
    </section>
  );
}

export default PlayListVideoList;
