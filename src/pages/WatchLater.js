import React from "react";
import {
  VideoCardTypeList,
  SectionHeading,
  NoItem,
} from "../shared/MiniComponent";
import { useLikeHistoryWatchLater } from "../context/likeHistoryWatchLater-context";

function WatchLater() {
  const { watchLater, dispatchLikeHistoryWatchLater } =
    useLikeHistoryWatchLater();
  const remove = "REMOVE_FROM_WATCHLATER";
  return (
    <div className="section-padding">
      <SectionHeading headingName={"Watch Later"} />
      {!watchLater?.length && (
        <NoItem heading={"No video to watch later"} buttonText={"Add Some"} />
      )}
      {watchLater && (
        <div className="video-list-container">
          {watchLater.map((vid) => (
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

export default WatchLater;
