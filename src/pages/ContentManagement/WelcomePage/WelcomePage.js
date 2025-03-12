import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopNavbar from "../../../components/common/CmsTopNavBar";
import UploadImage from "../uploadImage/UploadImage";
import welcomePage1 from "../../../assets/svg/WelcomePage1.svg";
import WelcomPage2 from "../../../assets/svg/WelcomePage2.svg";
import toolTip from "../../../assets/svg/TipTool.svg";
import Button from "../../../components/common/CmsButton";
import "./Welcomepage.scss";
import {
  GetRestaurantLogoRequest,
  GetWelcomeBgImgRequest,
  PostRestaurantLogoRequest,
  PostWelcomeBgImgRequest,
} from "../../../redux/contentManagement/cmsActions";
import SidePanel from "pages/SidePanel/indexOld";

const WelcomPage = () => {
  const inputRefsbg = [useRef(null)];
  const inputRefslogo = [useRef(null)];
  const [welcomeImages, setWelcomeImages] = useState([null]);
  const [logoImages, setLogoImages] = useState([null]);
  const [previewImage, setPreviewImage] = useState(null);
  const [prevWelcomeImages, setPrevWelcomeImages] = useState([]);
  const [prevLogoImages, setPrevLogoImages] = useState([]);

  const dispatch = useDispatch();

  const welcomeBgImg = useSelector(
    (state) => state.contentImageReducer?.welcomeBgImg
  );
  const restLogo = useSelector(
    (state) => state.contentImageReducer?.restaurantLogo
  );

  useEffect(() => {
    dispatch(GetWelcomeBgImgRequest());
  }, []);

  useEffect(() => {
    dispatch(GetRestaurantLogoRequest());
  }, []);

  useEffect(() => {
    if (welcomeBgImg && welcomeBgImg.length > 0) {
      const fetchedImage = welcomeBgImg[0].base64Image;
      setWelcomeImages([fetchedImage]);
    }
  }, [welcomeBgImg]);

  useEffect(() => {
    if (restLogo && restLogo.length > 0) {
      const fetchedLogo = restLogo[0].base64Image;
      setLogoImages([fetchedLogo]);
    }
  }, [restLogo]);

  const handleFileConversion = (
    file,
    entityType,
    mediaId,
    sortOrder,
    currentImages,
    prevImages
  ) => {
    let base64Image;
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64Image = reader.result.split(",")[1];
        if (base64Image !== prevImages[0]) {
          const payload = [
            {
              id: mediaId,
              entityId: "1",
              entityType: entityType,
              sortOrder: sortOrder,
              base64Image: base64Image,
            },
          ];

          if (entityType === "div1") {
            dispatch(PostWelcomeBgImgRequest(payload));
          } else if (entityType === "div2") {
            dispatch(PostRestaurantLogoRequest(payload));
          }
        }
      };
      reader.readAsDataURL(file);
    } else if (typeof file === "string" && file.startsWith("data:image")) {
      base64Image = file.split(",")[1];
      if (base64Image !== prevImages[0]) {
        const payload = [
          {
            id: mediaId,
            entityId: "1",
            entityType: entityType,
            sortOrder: sortOrder,
            base64Image: base64Image,
          },
        ];
        if (entityType === "div1") {
          dispatch(PostWelcomeBgImgRequest(payload));
        } else if (entityType === "div2") {
          dispatch(PostRestaurantLogoRequest(payload));
        }
      }
    }
  };

  const handleSave = () => {
    if (welcomeImages && welcomeImages[0]) {
      const welcomeImage = welcomeImages[0];
      const sortOrder = welcomeImages.length;
      const mediaId =
        welcomeBgImg && welcomeBgImg.length > 0 && welcomeBgImg[0].id
          ? welcomeBgImg[0].id
          : null;
      handleFileConversion(
        welcomeImage,
        "div1",
        mediaId,
        sortOrder,
        welcomeImages,
        prevWelcomeImages
      );
      setPrevWelcomeImages(welcomeImages);
    }

    if (logoImages && logoImages[0]) {
      const logoImage = logoImages[0];
      const sortOrder = logoImages.length;
      const mediaId =
        restLogo && restLogo.length > 0 && restLogo[0].id
          ? restLogo[0].id
          : null;
      handleFileConversion(
        logoImage,
        "div2",
        mediaId,
        sortOrder,
        logoImages,
        prevLogoImages
      );
      setPrevLogoImages(logoImages);
    }
  };

  const resetImages = () => {
    setWelcomeImages([null]);
    setLogoImages([null]);
  };

  return (
   <div className="welcomPageContainer">
    <SidePanel />
     <div className="welcomPage">
      <TopNavbar />
      <div className="welcomPage info">
        <div className="welcomPage restaurantImage">
          <div className="leftpart1">
            <div className="welcomPage header1">
              <div className="welcomPage imageTitle">
                Welcome Background Image
              </div>
              <div className="tooltip">
                <img src={toolTip} />
                <span className="tooltiptexts">
                  If an image is not uploaded for a mandatory field, a default
                  image will be displayed. For non-mandatory sections, the
                  section will remain hidden
                </span>
              </div>
            </div>
            <div
              className="welcomPage image"
              onMouseEnter={() => setPreviewImage(welcomePage1)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadImage
                images={welcomeImages}
                setImages={setWelcomeImages}
                inputRefs={inputRefsbg}
              />
            </div>
          </div>
        </div>
        <div className="welcomPage previewContainers">
          {previewImage && (
            <img className="pImages" src={previewImage} alt="Preview" />
          )}
        </div>
        <div className="welcomPage restaurantImage">
          <div className="leftpart2">
            <div className="welcomPage header2">
              <div className="welcomPage imageTitle">Restaurant Logo</div>
              <div className="tooltip">
                <img src={toolTip} />
                <span className="tooltiptexts">
                  If an image is not uploaded for a mandatory field, a default
                  image will be displayed. For non-mandatory sections, the
                  section will remain hidden
                </span>
              </div>
            </div>
            <div
              className="welcomPage image"
              onMouseEnter={() => setPreviewImage(WelcomPage2)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadImage
                images={logoImages}
                setImages={setLogoImages}
                inputRefs={inputRefslogo}
              />
            </div>
          </div>
        </div>
        <Button resetImages={resetImages} handleSave={handleSave} />
      </div>
    </div>
   </div>
  );
};

export default WelcomPage;
