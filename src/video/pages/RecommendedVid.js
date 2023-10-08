import React from "react";
import VideoCard from "../components/VideoCard";
import CategoryList from "../components/CategoryList";
import { useFilterContext } from "../../context/filterContext";
import { useVideoContext } from "../../context/videoContext";
import "./RecommendedVid.css";
import VideoCardSkeleton from "../components/VideoCardSkeleton";

function RecommendedVid() {
  const { filtered_videos } = useFilterContext();
  const { loader } = useVideoContext();
  return (
    <>
      <CategoryList />
      <div className="section-padding">
        <div className="recommended-vid__videos">
        { loader && (
          [1,1,1,1,1,1,1,1,1,1,1,1].map((item, index)=> <VideoCardSkeleton key={index}/>)
        )
        }
          {!loader && (filtered_videos?.length ? (
            filtered_videos?.map((item) => (
              <VideoCard videoInfo={item} key={item._id} />
            ))
          ) : (
            <h3>did not match any video.</h3>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecommendedVid;
