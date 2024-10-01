import React from 'react'
import './LiveOutlets.scss'
import imagerest from './imagerest.svg'
import SidePanel from 'pages/SidePanel'
import DashBoardTopNav from 'components/contentManagement/dashBoardTopNav/dashBoardTopNav'
import ThreeDots from '../PendingOutlet/ThreeDots'

const LiveOutlets = () => {
  return (
    <>
   

        <div className='dashboard'>
      <SidePanel />
      <div className='dashBoardContainer'>
        <DashBoardTopNav /> 


    <div className="Livemain">
    <div >
      <img src={imagerest} alt="Pending" className="Liveimg" />
    </div>
    <div className="Livecontent">
      <div className="livecontent1">
        <div className="liveHeading">
          <h1 className="liveHeading">Diwali Special 2.0 </h1>
          
        </div>
        <div className='ThreeDotsLivecontainer'>
          <ThreeDots/>
        </div>
        <div className="pendingbtndot">
          {/* <ThreeDots /> */}
        </div>
      </div>
      <div className="Livecontent2">
        <div className="Livetoggle">
            <div>
                <h4 className='labelLive'>Last Update : 27/05/2024</h4>
            </div>
            <div>
            <h4 className='labelLive'>Completed:<span className='completed-percentage' >80%</span></h4>

            </div>
        
         
       
        </div>
      
       
{/*         
          <div >
            <button className="btnLive" onClick={() => {
          
            }}>Publish</button>
          </div> */}
        
      </div>
    </div>
  </div>
  </div>
  </div>


</>
  )
}

export default LiveOutlets