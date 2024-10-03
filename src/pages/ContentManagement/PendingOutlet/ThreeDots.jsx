import { useState } from "react";
import React from "react";
import "./ThreeDots.scss"
import moreVertical from "../../../assets/images/more-vertical.png"
import Bin from "../../../assets/images/trash-2.png"
import Copy from "../../../assets/images/Frame 3466695.png"
import Duplicate from "../../../assets/images/duplicate.png"
const ThreeDots = () => {

   
    const [threedots, setThreeDots] = useState(false);
    const [showmodal, setshowmodal] = useState(false);
   
   
    return (
      <>
        {threedots ? (
          <div className="ThreeDots-container">
         <img src={Bin} width="20" height="20"/>
         <img src={Copy} width="20" height="20"/>
         <img src={Duplicate} width="20" height="20"/>

          </div>
        ) : (
          ''
        )}
        <button onClick={() => setThreeDots(!threedots)} className="dots" >
          <img src={moreVertical} alt="More options"   />
        </button>
      </>
    );
  };
   
  export default ThreeDots;
   
   