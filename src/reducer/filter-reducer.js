function reducer(state, action) {
  const { type, payload } = action;

  if (type === "LOADING_VIDEOS") {
    return {
      ...state,
      all_videos: payload,
      filtered_videos: payload,
    };
  }
  if (type === "UPDATE_FILTERS") {
    const { name, value } = payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (type === "FILTER_PRODUCTS") {
    const { all_videos } = state;
    const { text, category } = state.filters;
    let tempVideos = all_videos;
    if (text) {
      tempVideos = tempVideos.filter((video) => {
        return video.title.toLowerCase().startsWith(text.toLowerCase());
      });
    }
    if (category !== "all") {
      tempVideos = tempVideos.filter((video) => {
        return video.category.toLowerCase() === category;
      });
    }
    return { ...state, filtered_videos: tempVideos };
  }

  throw new Error(`No Matching "${type}" - action type`);
}

export default reducer;
