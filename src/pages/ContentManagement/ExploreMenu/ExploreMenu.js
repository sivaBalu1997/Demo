import React, { useEffect, useRef, useState } from 'react';
import TopNavbar from '../../../components/common/CmsTopNavBar';
import Button from '../../../components/common/CmsButton';
import '../ExploreMenu/Explore.scss';
import ExploreVideo from '../../../assets/svg/ExploreVideo.svg';
import toolTip from "../../../assets/svg/TipTool.svg";
import UploadVideo from "../uploadVideo/UploadVideo";
import { useDispatch, useSelector } from 'react-redux';
import { GetExploreVideoRequest, PostExploreVideoRequest } from '../../../redux/contentManagement/cmsActions';
import SidePanel from 'pages/SidePanel/indexOld'

const ExploreMenu = () => {
  const inputRefsVideo = [useRef(null)];

  const [video, setVideo] = useState([null]);
  const [previewImage, setPreviewImage] = useState(null);

  const [prevVideo, setPrevVideo] = useState([]);

  const dispatch = useDispatch();

  const exploreVideos = useSelector((state) => state.contentImageReducer?.exploreVideo);

  useEffect(() => {
    dispatch(GetExploreVideoRequest());
  }, [])

  useEffect(() => {
    if (exploreVideos && exploreVideos.length > 0) {
      const fetchedImage = exploreVideos[0].base64Image;
      if (fetchedImage) {
        setVideo([fetchedImage])
      }
    }
  }, [exploreVideos])

  const handleFileConversion = (file, entityType, mediaId, sortOrder, prevImages) => {
    let base64Image;
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64Image = reader.result.split(',')[1];
        if (base64Image !== prevImages[0]) {
          const payload = [{
            id: mediaId,
            entityId: "1",
            entityType: entityType,
            sortOrder: sortOrder,
            base64Image: base64Image,
          }];
          if (entityType === "div9") {
            dispatch(PostExploreVideoRequest(payload));
          }
        }
      };
      reader.readAsDataURL(file);
    } else if (typeof file === 'string' && file.startsWith('data:image')) {
      base64Image = file.split(',')[1];
      if (base64Image !== prevImages[0]) {
        const payload = [{
          id: mediaId,
          entityId: "1",
          entityType: entityType,
          sortOrder: sortOrder,
          base64Image: base64Image,
        }];
        if (entityType === "div9") {
          dispatch(PostExploreVideoRequest(payload));
        } 
      }
    }
  };

  const handleSave = () => {
    if (video && video[0]) {
      const exploreVideoItem = video[0];
      const sortOrder = video.length;
      const mediaId = (exploreVideos && exploreVideos.length > 0 && exploreVideos[0].id) ? exploreVideos[0].id : null;
      handleFileConversion(exploreVideoItem, 'div9', mediaId, sortOrder, prevVideo);
      setPrevVideo(video);
    }
  };

  const resetImages = () => {
    setVideo([null])
  }


  return (
   <div className='exploreContainer'>
    <SidePanel />
    <div className="exploreMenu">
      <TopNavbar />
      <div className="exploreMenu info">
        <div className="exploreMenu restaurantImage">
          <div className="leftPart1">
            <div className='exploreMenu headers1'>
              <div className="exploreMenu imageTitle">Explore Video</div>
              <div className="tooltip">
                <img src={toolTip} />
                <span className="tooltiptexts">If an image is not uploaded for a mandatory field, a default image will be displayed. For non-mandatory sections, the section will remain hidden</span>
              </div>
            </div>
            <div
              className="exploreMenu image"
              onMouseEnter={() => setPreviewImage(ExploreVideo)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadVideo videos={video} setVideos={setVideo} inputRefs={inputRefsVideo} />
            </div>
          </div>
        </div>
        <div className="exploreMenu previewContainers">
          {previewImage && <img className='pImage' src={previewImage} alt="Preview" />}
        </div>
        <Button resetImages={resetImages} handleSave={handleSave} />
      </div>
    </div>
   </div>
  );
};

export default ExploreMenu;
