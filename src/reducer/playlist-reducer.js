export const reducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case "MODAL_CONTROL":
      return {
        ...state,
        singleVideo: state.singleVideo === "" ? action.payload : "",
        playListModalState: state.playListModalState ? false : true,
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        playListStorage: [...action.payload],
      };

    case "SAVE_NEW_PLAYLIST":
      return {
        ...state,
        playListStorage: [...action.payload],
      };

    
    default:
      return state;
  }
};
