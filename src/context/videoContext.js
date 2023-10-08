import { useContext, createContext, useEffect, useState } from "react";
import axios from "axios";
export const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [loader, setLoader] = useState(true);
  const [videos, setVideo] = useState(null);
  const closeLoader = () => {
    setLoader(false);
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}`);
        setVideo(res.data.videos);
      } catch (err) {
        console.log(err.response);
      } finally {
        closeLoader();
      }
    };
    getVideos();
  }, []);
  return (
    <VideoContext.Provider value={{ loader, closeLoader, videos, setLoader }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
