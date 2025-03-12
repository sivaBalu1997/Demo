import React from 'react'
import "./PendingOutlet.scss"
import Diwali from "../../../assets/images/Diwali.jpeg"
import ThreeDots from './ThreeDots'
import SidePanel from 'pages/SidePanel/indexOld'
import DashBoardTopNav from 'components/contentManagement/dashBoardTopNav/dashBoardTopNav'
import Christmas from "../../../assets/images/christmas.webp"
import AddOutlet from 'components/contentManagement/AddOutlet/AddOutlet'

const PendingComponent = () => {
  const pendingdata = [
    {
      name: "Diwali Special",
      img: Diwali // Placeholder for the image
    },
    {
      name: "Christmas",
      img: Christmas // Placeholder for the image
    }
  ]

  return (
    <>
      <div className='dashboardPending'>
        <SidePanel />
        <div className='dashBoardPendingContainer'>
          <DashBoardTopNav />
          <div className='pendingmain-Container'>
          {
            pendingdata.map((item, index) => {
              return (
               
                  <div className="pendingmain">
                    <div>
                      <img src={item.img} alt={item.name} className="pendingimg" />
                    </div>
                    <div className="pendingcontent">
                      <div className="pendingcontent1">
                        <div className="pendingheading">
                          <h1 className="pendingheading">{item.name} </h1>
                        </div>
                        <div className="pendingbtndot">
                          <ThreeDots />
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
                
              )
            })
          }
          <div className='AddOutletPending'>
            <AddOutlet/>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PendingComponent
