import { createContext, useReducer, useContext, useEffect } from "react";
import { reducer } from "../reducer/playlist-reducer";
import { userInfo, isAuthenticated } from "../utils/authrelated";
import { getPlaylist } from "../api/playlist_api.js";
const PlayListContext = createContext();

const defaultState = {
  playListModalState: false,
  singleVideo: "",
  playListStorage: [],
};
export const PlayListProvider = ({ children }) => {
  const [state, dispatchPlayList] = useReducer(reducer, defaultState);

  useEffect(() => {
    const userId = userInfo()?.user?._id;
    isAuthenticated() && getPlaylist(userId, dispatchPlayList);
  }, []);

  return (
    <PlayListContext.Provider value={{ ...state, dispatchPlayList }}>
      {children}
    </PlayListContext.Provider>
  );
};

export const usePlayList = () => {
  return useContext(PlayListContext);
};
