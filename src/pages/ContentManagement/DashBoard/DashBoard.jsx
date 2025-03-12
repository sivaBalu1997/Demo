import DashBoardTopNav from 'components/contentManagement/dashBoardTopNav/dashBoardTopNav'
import React, { useContext } from 'react'
import './DashBoard.scss'
import Banner from '../../../assets/svg/DashBoardBanner.svg'
import { Contextpagejs } from 'pages/productCatalog/contextpage'
import SidePanel from 'pages/SidePanel/indexOld'

const DashBoard = () => {

  const toNavigate = ['Welcome Page', 'Restaurant Info', 'Explore Menu', 'Full Menu']
  const { isExpanded } = useContext(Contextpagejs);


  return (
    <div className='dashboard'>
      <SidePanel />
      <div className='dashBoardContainer'>
        <DashBoardTopNav /> 
        <div className='dashBoardBody'>
          <div className={isExpanded ? 'dashBoardHeadingsExpanded' : 'dashBoardHeadings'}>
            <div className='dashBoardHeader'>
              <p className='templateText'>Diwali Template-1</p>
              <p className='changeText'>Change</p>
            </div>
            <p>Completed : {" "}
              <span style={{color:'#00B71D'}}>80%</span>
            </p>
          </div>
          <div className='tabContainer'>
            {toNavigate.map((page)=><div className='dashBoardTab'>{page}</div>)}
          </div>
          <div className='completionText'>
            It should be at least 80% complete to be ready for publishing.
          </div>
          <div className='dashBoardBanner'>
            <img src={Banner} />
          </div>
        </div>
        <div className='dashBoardBtn'>
          <button className='dashBoardbackBtn'>Back</button>
          <button className='dashBoardsavebtn'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
