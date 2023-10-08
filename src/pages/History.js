import {
  VideoCardTypeList,
  SectionHeading,
  NoItem,
} from "../shared/MiniComponent";
import { useLikeHistoryWatchLater } from "../context/likeHistoryWatchLater-context";

function History() {
  const { history, dispatchLikeHistoryWatchLater } = useLikeHistoryWatchLater();
  const remove = "REMOVE_FROM_HISTORY";
  return (
    <div className="section-padding">
      <SectionHeading headingName={"History"} />
      {!history.length && (
        <NoItem heading={"No recent watch"} buttonText={"Watch"} />
      )}
      {history && (
        <div className="video-list-container">
          {history.map((vid) => (
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

export default History;
