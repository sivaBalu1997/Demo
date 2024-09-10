import React from "react";
import "./Menu120.scss";
import { Outlet } from "react-router-dom";



const Menu120 = () => {

    const data=[
        {
            OutletName:"Outlet1",
            Live:"Live(100)",
            Unavailable:"Unavailable(10)",
            Hidden:"Hidden(10)"
        },

        {
            OutletName:"Outlet2",
            Live:"Live(100)",
            Unavailable:"Unavailable(10)",
            Hidden:"Hidden(10)"
        }
    ]
  return (
    <>
     <div className="Header-Heading">Menu(120)

    
      <div className="Menu120-Tooltip-container">

        {data.map((elem,index)=>(
           <div className="Menu120-Tooltip-container-heading" key={index}>
           <div className="Menu120-Heading">{elem.OutletName}</div>
           <div className="Menu120-sub-Heading">{elem.Live}</div>
           <div className="Menu120-sub-Heading">{elem.Unavailable}</div>
           <div className="Menu120-sub-Heading">{elem.Hidden}</div>
         </div>
        ))}
        
        
        
      </div>
      </div>

    </>
  );
};

export default Menu120;
