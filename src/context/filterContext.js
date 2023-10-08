import React, { createContext, useReducer, useContext, useEffect } from "react";
import reducer from "../reducer/filter-reducer";
import { useVideoContext } from "./videoContext";

export const FilterContext = createContext();

const defaultState = {
  filtered_videos: [],
  all_videos: [],
  filters: {
    text: "",
    category: "all",
  },
};
export const FilterProvider = ({ children }) => {
  const [filtered_state, dispatch] = useReducer(reducer, defaultState);
  const { videos } = useVideoContext();

  useEffect(() => {
    dispatch({ type: "LOADING_VIDEOS", payload: videos });
  }, [videos]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [filtered_state.filters]);

  const updateFilters = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "UPDATE_FILTERS", payload: { name, value } });
  };

  return (
    <FilterContext.Provider
      value={{
        ...filtered_state,
        dispatch,
        // clearFilters,
        updateFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
