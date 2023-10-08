export const reducer = (state, action) => {
  const { type, payload } = action;
  if (type === "UPDATE_DEFAULTSTATE_ARRAY") {
    return {
      ...state,
      watchLater: payload.watchLater,
      likedVideo: payload.likedVideo,
      history: payload.history,
    };
  }
  if (type === "UPDATE_HISTORY") {
    return {
      ...state,
      history: payload,
    };
  }
  if (type === "UPDATE_WATCHLATER") {
    return {
      ...state,
      watchLater: payload,
    };
  }
  if (type === "UPDATE_LIKEDVIDEO") {
    return {
      ...state,
      likedVideo: payload,
    };
  }

  throw new Error(`No Matching "${type}" - action type`);
};
