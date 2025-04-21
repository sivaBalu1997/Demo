import React from 'react';
import './style.scss';

const CustomerDropdownShimmer = () => {
  return (
    <div className="shimmer-loader">
      {[...Array(20)].map((_, i) => (
        <div key={i} className="shimmer-line"></div>
      ))}
    </div>
  );
};

export default CustomerDropdownShimmer;