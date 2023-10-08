import axios from "axios";
export const getUserExploredData = async (userId, dispatch) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/${userId}/like_watch_history`
    );
    const { watchLater, likedVideo } = res.data;
    const history = res.data.history.reverse();
    dispatch({
      type: "UPDATE_DEFAULTSTATE_ARRAY",
      payload: { likedVideo, watchLater, history },
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const saveToWatchLater = async (
  userId,
  videoId,
  dispatch,
  setLoader
) => {
  try {
    setLoader(true);
    const res = await axios.post(`${process.env.REACT_APP_API}/watch_later`, {
      userId,
      videoId,
    });
    dispatch({
      type: "UPDATE_WATCHLATER",
      payload: res.data.watchLater,
    });
  } catch (err) {
    console.log(err.response);
  } finally {
    setLoader(false);
  }
};

export const saveToLikedVideo = async (userId, videoId, dispatch) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_API}/like`, {
      userId,
      videoId,
    });
    dispatch({
      type: "UPDATE_LIKEDVIDEO",
      payload: res.data.likedVideo,
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const removeFromLikedVideo = async (
  userId,
  videoId,
  dispatch,
  setLoader
) => {
  try {
    setLoader && setLoader(true);
    const res = await axios.post(`${process.env.REACT_APP_API}/like/remove`, {
      userId,
      videoId,
    });
    dispatch({
      type: "UPDATE_LIKEDVIDEO",
      payload: res.data.likedVideo,
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const removeFromWatchLater = async (
  userId,
  videoId,
  dispatch,
  setLoader
) => {
  try {
    setLoader(true);
    const res = await axios.post(
      `${process.env.REACT_APP_API}/watch_later/remove`,
      {
        userId,
        videoId,
      }
    );
    dispatch({
      type: "UPDATE_WATCHLATER",
      payload: res.data.watchLater,
    });
  } catch (err) {
    console.log(err.response);
  }
};

export const removeFromHistory = async (
  userId,
  videoId,
  dispatch,
  setLoader
) => {
  try {
    setLoader(true);
    const res = await axios.post(
      `${process.env.REACT_APP_API}/history/remove`,
      {
        userId,
        videoId,
      }
    );
    const history = res.data.history.reverse();
    dispatch({
      type: "UPDATE_HISTORY",
      payload: history,
    });
  } catch (err) {
    console.log(err.response);
  }
};
