
  
  const CategoryOverviewShimmer = ({ count = 4 }) => {
    return (
      <div className="categories-overview-shimmer-container">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="categories-overview-shimmer-card">
              <div className="shimmer-card">
                <div className="shimmer-title" />
                <div className="shimmer-data" />
              </div>
            </div>
          ))}
      </div>
    );
  };
  
  export default CategoryOverviewShimmer;