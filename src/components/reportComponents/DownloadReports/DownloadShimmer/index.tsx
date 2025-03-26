import React from 'react';
import './style.scss';

const DownloadShimmer = () => {
  return (
    <div className="table-download-options-pop-over shimmer-wrapper">
      <div className="pop-over-title shimmer"></div>
      <div className="formats-container">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="download-icon-with-title">
            <div className="icon-shimmer shimmer"></div>
            <div className="text-shimmer shimmer"></div>
          </div>
        ))}
      </div>
      <div className="download-btn-shimmer shimmer"></div>
    </div>
  );
};

export default DownloadShimmer;