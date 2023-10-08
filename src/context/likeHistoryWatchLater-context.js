import { createContext, useContext, useReducer, useEffect } from "react";
import { reducer } from "../reducer/likeHistoryWatchLater-reducer";
import { userInfo, isAuthenticated } from "../utils/authrelated";
import { getUserExploredData } from "../api/like_watch_history_api";
const LikeHistoryWatchLaterContext = createContext();

const defaultState = {
  watchLater: [],
  history: [],
  likedVideo: [],
};

export const LikeHistoryWatchLaterProvider = ({ children }) => {
  const [state, dispatchLikeHistoryWatchLater] = useReducer(
    reducer,
    defaultState
  );

  useEffect(() => {
    const userId = userInfo()?.user?._id;
    isAuthenticated() &&
      getUserExploredData(userId, dispatchLikeHistoryWatchLater);
  }, []);

  return (
    <LikeHistoryWatchLaterContext.Provider
      value={{ ...state, dispatchLikeHistoryWatchLater }}
    >
      {children}
    </LikeHistoryWatchLaterContext.Provider>
  );
};

export const useLikeHistoryWatchLater = () => {
  return useContext(LikeHistoryWatchLaterContext);
};
