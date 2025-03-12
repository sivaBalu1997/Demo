import React, { useEffect, useRef, useState } from 'react';
import './FullMenu.scss';
import UploadVideo from "../uploadVideo/UploadVideo";
import TopNavbar from '../../../components/common/CmsTopNavBar';
import Button from '../../../components/common/CmsButton';
import toolTip from "../../../assets/svg/TipTool.svg";
import { useDispatch, useSelector } from 'react-redux';
import FullmenuVideo from '../../../assets/svg/FullMenuVideo.svg';
import { GetFullMenuVideoRequest, PostFullMenuVideoRequest } from '../../../redux/contentManagement/cmsActions';
import SidePanel from 'pages/SidePanel'

const FullMenu = () => {
  const inputRefsFullMenu = [useRef(null)];
  const [fullMenuVideo, setfullMenuVideo] = useState([null]);
  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(GetFullMenuVideoRequest())
  }, [])

  const fullMenuVideos = useSelector(state => state.contentImageReducer?.fullMenuVideo)

  useEffect(() => {
    if (fullMenuVideos && fullMenuVideos.length > 0) {
      const fetchedVideo = fullMenuVideos[0].base64Image
      if (fetchedVideo) {
        setfullMenuVideo([fetchedVideo])
      }
    }
  }, [fullMenuVideos])

  const handleSave = () => {
    if (fullMenuVideo && fullMenuVideo[0]) {
      const payload = []
      const video = fullMenuVideo[0]
      const mediaId = (fullMenuVideos && fullMenuVideos.length > 0 && fullMenuVideos[0].id) ? fullMenuVideos[0].id : null
      const sortOrder = fullMenuVideo.length
      
      if (typeof video === 'string' && video.startsWith('http')) {
        const base64Image = video.split(',')[1];
        payload.push({
          id: mediaId,
          entityId: "1",
          entityType: "div11",
          sortOrder: sortOrder,
          base64Image: base64Image, 
        })
        dispatch(PostFullMenuVideoRequest(payload))
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result.split(',')[1]
          payload.push({
            id: mediaId,
            entityId: '1',
            entityType: 'div11',
            sortOrder: sortOrder,
            base64Image: base64Image,
          })
          dispatch(PostFullMenuVideoRequest(payload))
        }
        reader.readAsDataURL(video)
      }
    }
  }

  const resetImages = () => {
    setfullMenuVideo([null])
  }

  return (
   <div className='fullNameContainer'>
      <SidePanel />
      <div className='fullMenu'>
      <TopNavbar />
      <div className="fullMenu restaurantVideo">
        <div className='leftPart'>
          <div className='fullMenu head'><div className="fullMenu videoTitle">Full Menu Video</div>
           <div className="tooltip">
              <img src={toolTip} />
              <span className="tooltiptexts">If an image is not uploaded for a mandatory field, a default image will be displayed. For non-mandatory sections, the section will remain hidden</span>
            </div>
          </div>
          <div 
            className="fullMenu image"
            onMouseEnter={() => setPreviewImage(FullmenuVideo)}
            onMouseLeave={() => setPreviewImage(null)}
          >
            <div className="fullMenu video">
              <UploadVideo videos={fullMenuVideo} setVideos={setfullMenuVideo} inputRefs={inputRefsFullMenu} />
            </div>
          </div>
        </div>
      </div>
      <div className='fullMenu previewContainers'>
        {previewImage && <img className='pImage' src={previewImage} alt="Preview" />}
      </div>
      <Button resetImages={resetImages} handleSave={handleSave} />
    </div>
   </div>
  )
}

export default FullMenu;
