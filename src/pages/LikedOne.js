import React from "react";
import {
  VideoCardTypeList,
  SectionHeading,
  NoItem,
} from "../shared/MiniComponent";
import { useLikeHistoryWatchLater } from "../context/likeHistoryWatchLater-context";

function LikedOne() {
  const { likedVideo, dispatchLikeHistoryWatchLater } =
    useLikeHistoryWatchLater();
  const remove = "REMOVE_FROM_LIKEDVID";
  return (
    <div className="section-padding">
      <SectionHeading headingName={"Liked Videos"} />
      {!likedVideo.length && (
        <NoItem heading={"No video liked yet"} buttonText={"Like some"} />
      )}
      {likedVideo && (
        <div className="video-list-container">
          {likedVideo.map((vid) => (
            <VideoCardTypeList
              key={vid._id}
              {...vid}
              dispatch={dispatchLikeHistoryWatchLater}
              remove={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedOne;
