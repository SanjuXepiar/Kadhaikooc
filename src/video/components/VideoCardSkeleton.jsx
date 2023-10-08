import React from "react";

import "./VideoCard.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function VideoCardSkeleton() {
  return (
    <SkeletonTheme 
    >
      <div className="video-card video-card__skeleton">
        
          <Skeleton height={100} />
          
        <div className="video-card__info">
          <Skeleton circle={true} className="avatar"/>
          <div className="video-card__text">
            <h4><Skeleton /></h4>
            <p><Skeleton /></p>
            <p>
            <Skeleton width={100}/>{" "}<Skeleton width={100}/>
            </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default VideoCardSkeleton;
