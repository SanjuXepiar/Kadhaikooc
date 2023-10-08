import axios from "axios";

export const getPlaylist = async (userId, dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/playlist/${userId}`
    );
    dispatch({ type: "ADD_TO_PLAYLIST", payload: res.data.playlist });
  } catch (err) {
    console.log(err.response);
  }
};

export const createPlaylist = async (
  userId,
  name,
  dispatch,
  setterFun,
  setLoader
) => {
  try {
    setLoader(true);
    const res = await axios.post(`${process.env.REACT_APP_API}/playlist`, {
      userId,
      playlist: {
        name,
        list: [],
      },
    });
    dispatch({
      type: "SAVE_NEW_PLAYLIST",
      payload: res.data.playlist,
    });
  } catch (err) {
    console.log(err.response);
  }
  setterFun(false);
};

export const addVideo = async ({
  playlistId,
  video,
  userId,
  dispatchPlayList,
  setLoaderOne,
}) => {
  try {
    setLoaderOne(true);
    const res = await axios.post(
      `${process.env.REACT_APP_API}/playlist/${playlistId}`,
      {
        userId,
        video,
      }
    );
    dispatchPlayList({
      type: "SAVE_NEW_PLAYLIST",
      payload: res.data.playlist,
    });
  } catch (err) {
    console.log(err.response);
  }
  setLoaderOne(false);
};

export const removeVideo = async ({
  playlistId,
  videoId,
  userId,
  dispatchPlayList,
  setLoaderOne,
  setLoaderTwo,
}) => {
  try {
    setLoaderTwo && setLoaderTwo(true);
    setLoaderOne && setLoaderOne(true);
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/playlist/${userId}/${playlistId}/${videoId}`
    );
    dispatchPlayList({
      type: "SAVE_NEW_PLAYLIST",
      payload: res.data.playlist,
    });
  } catch (err) {
    console.log(err.response);
  }
  setLoaderOne && setLoaderOne(false);
};

export const removeListFromPlaylist = async (
  userId,
  playlistId,
  dispatch,
  setLoader
) => {
  try {
    setLoader(true);
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/playlist/${userId}/${playlistId}`
    );
    console.log(res.data);
    dispatch({
      type: "SAVE_NEW_PLAYLIST",
      payload: res.data.playlist,
    });
  } catch (err) {
    console.log(err.response);
  }
};
