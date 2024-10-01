import React from 'react'
import "./PendingOutlet.scss"
import Diwali from "../../../assets/images/Diwali.jpeg"
import ThreeDots from './ThreeDots'
import SidePanel from 'pages/SidePanel'
import DashBoardTopNav from 'components/contentManagement/dashBoardTopNav/dashBoardTopNav'

const PendingComponent = () => {
  return (
    <> 
    <div className='dashboardPending'>
      <SidePanel />
      <div className='dashBoardPendingContainer'>
        <DashBoardTopNav /> 
    
    <div className="pendingmain">
    <div>
      <img src={Diwali} alt="Pending"  className="pendingimg" />
    </div>
    <div className="pendingcontent">
      <div className="pendingcontent1">
        <div className="pendingheading">
          <h1 className="pendingheading">Diwali Special (2.0)</h1>
        </div>
        <div className="pendingbtndot">
            <ThreeDots/>
        </div>
      </div>
      <div className="pendingcontent2">
        <div className="pendingtoggle">
         <p className='LastUpdate'>Last Update 17/02/2024</p>
         <p className='completedheading'>Completed 80%</p>
       
        </div>
        
          <div className="btnpending">
            <button className="btnpend">Publish</button>
          </div>
        
      </div>
    </div>
  </div>
  </div>
  </div>

</>
  )
}

export default PendingComponent