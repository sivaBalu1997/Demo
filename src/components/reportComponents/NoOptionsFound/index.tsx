import React from 'react'

interface NoOptionsFoundProps {
    noDataFoundMesssage: string;
    noDataFoundIcon: React.ReactNode;
    // noDataFoundIconAlt: string; 
    noOptionsFoundContainerClassName: string;   
}

const NoOptionsFound: React.FC<NoOptionsFoundProps>  = ({noDataFoundMesssage, noDataFoundIcon, noOptionsFoundContainerClassName}) => {
  return (
    <div className={noOptionsFoundContainerClassName}>
        <div className="no-data-found-icon">
            {noDataFoundIcon}
        </div>
        <div className="no-data-found-message">{noDataFoundMesssage}</div>
        {/* <div className="no-data-found-icon-alt">{noDataFoundIconAlt}</div>  */}
    </div>
  )
}

export default NoOptionsFound
