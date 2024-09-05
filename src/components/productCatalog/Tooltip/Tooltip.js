import React from 'react';
import './Tooltip.scss';
import tooltiparrow from '../../assets/svg/ArrowHover.svg'

const Tooltip = ({ message, children ,style,tooltipstyle}) => {
    return (
        <div className="tooltip-container">
            {children}
           
            <div className="tooltip-message" style={style}>
           
            <img src={tooltiparrow} alt="" style={tooltipstyle}/>
                {message}
            </div>
        </div>
    );
};

export default Tooltip;