import DashBoardTopNav from 'components/contentManagement/dashBoardTopNav/dashBoardTopNav'
import SidePanel from 'pages/SidePanel'
import React, { useContext, useRef, useState } from 'react'
import './template.scss'
import templateBanner from '../../../assets/svg/TemplateBanner.svg'
import idliVideo from '../../../assets/svg/idli.mp4'
import { useHistory } from 'react-router'
import { Contextpagejs } from 'pages/productCatalog/contextpage'

const Template = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef(null)
  const history = useHistory()

  const handlePlayPause = () => {
    if(isPlaying){
        videoRef.current.pause()
    }else{
        videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const { isExpanded } = useContext(Contextpagejs);

  return (
    <div className='templateContainer'>
        <SidePanel />
        <div className='template'>
            <DashBoardTopNav />
            <div className='templateContext'>
                <div className='templateHeader'>
                    <div className='heading'>Diwali Template-1</div>
                    <p className='templateSubHead'>
                        This template is specially designed for Diwali 2024, celebrating one of the most {" "}
                    </p>
                    <p className='templateSubHead'>important and cherished indian festivals.</p>
                </div>
                <div className={isExpanded ? 'templateBodyExpanded' : 'templateBody'}>
                    <div className='templateVideoContent'>
                        <div className='videoContainer'>
                                <div className='videoBox'>
                                    <video 
                                        ref={videoRef}
                                        src={idliVideo} 
                                        className='video' 
                                        preload='none'
                                        onPlay={() => setIsPlaying(true)}
                                        onPause={() => setIsPlaying(false)}
                                    />
                                </div>
                                <button
                                    className="play-pause-btn" 
                                    onClick={handlePlayPause}
                                >
                                    {isPlaying ?
                                    <p className='pButton1'>❚❚</p> : 
                                    <p className='pButton2'>►</p>
                                    }
                                </button>
                        </div>
                        <div className='editBtn'>
                            <button onClick={()=>history.replace('/cms/dashboard')}>Start Editing</button>
                        </div>
                    </div>  
                    <div className='templateBanner'>
                        <img src={templateBanner} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Template
