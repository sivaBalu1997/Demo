import React, { useEffect, useRef, useState } from "react";
import "./RestInfo.scss";
import UploadImage from "../uploadImage/UploadImage";
import UploadVideo from "../uploadVideo/UploadVideo";
import TopNavbar from "../../../components/common/CmsTopNavBar";
import Button from "../../../components/common/CmsButton";
import { useDispatch, useSelector } from "react-redux";
import restoVideo from "../../../assets/svg/RestaurantVideo.svg";
import restoFoodImg from "../../../assets/svg/RestaurantFoodImg.svg";
import restoInfrastructure from "../../../assets/svg/RestaurantInfra.svg";
import happyCustomer from "../../../assets/svg/HappyCustomer.svg";
import toolTip from "../../../assets/svg/TipTool.svg";
import {
  GetFoodImgRequest,
  GetHappyCustomerRequest,
  GetRestaurantInfrastructureRequest,
  GetRestaurantVideoRequest,
  PostFoodImageRequest,
  PostHappyCustomerImageRequest,
  PostInfrastructureImageRequest,
  PostRestaurantVideoRequest,
} from "../../../redux/contentManagement/cmsActions";
import SidePanel from "pages/SidePanel/indexOld";

const RestaurantInfo = () => {
  const [restaurantVideo, setRestaurantVideo] = useState([null]);
  const [foodImage, setFoodImage] = useState([null]);
  const [infrastructureImage, setInfrastructureImage] = useState([null]);
  const [customerImage, setCustomerImage] = useState([null, null]);
  const [previewImage, setPreviewImage] = useState(null);

  const [prevRestVideo, setPrevRestVideo] = useState([]);
  const [prevFoodImage, setPrevFoodImage] = useState([]);
  const [prevInfrastructureImage, setPrevInfrastructureImage] = useState([]);
  const [prevCustomerImage, setPrevCustomerImage] = useState([]);

  const RestVideoRef = [useRef(null)];
  const RestFoodImgRef = [useRef(null)];
  const RestInfraRef = [useRef(null)];
  const HappyCustomerRef = [useRef(null), useRef(null)];

  const dispatch = useDispatch();

  const restVideo = useSelector(
    (state) => state.contentImageReducer?.restaurantVideo
  );
  const FoodImage = useSelector(
    (state) => state.contentImageReducer?.restaurantFoodImg
  );
  const InfraImage = useSelector(
    (state) => state.contentImageReducer?.restaurantInfrastructureimg
  );
  const CustomerImage = useSelector(
    (state) => state.contentImageReducer?.happyCustomerImg
  );

  // Fetch initial data
  useEffect(() => {
    dispatch(GetRestaurantVideoRequest());
    dispatch(GetFoodImgRequest());
    dispatch(GetRestaurantInfrastructureRequest());
    dispatch(GetHappyCustomerRequest());
  }, []);

  // Update state when data changes
  useEffect(() => {
    if (restVideo && Array.isArray(restVideo) && restVideo.length > 0) {
      setRestaurantVideo([restVideo[0].base64Image]);
    }
  }, [restVideo]);
  useEffect(() => {
    if (FoodImage && Array.isArray(FoodImage) && FoodImage.length > 0) {
      setFoodImage([FoodImage[0].base64Image]);
    }
  }, [FoodImage]);
  useEffect(() => {
    if (InfraImage && Array.isArray(InfraImage) && InfraImage.length > 0) {
      setInfrastructureImage([InfraImage[0].base64Image]);
    }
  }, [InfraImage]);
  useEffect(() => {
    if (
      CustomerImage &&
      Array.isArray(CustomerImage) &&
      CustomerImage.length > 0
    ) {
      const images = CustomerImage.map((imageData) => imageData.base64Image);
      setCustomerImage(images.length === 1 ? [...images, null] : images);
    }
  }, [CustomerImage]);

  const handleFileConversion = (
    file,
    entityType,
    mediaId,
    sortOrder,
    prevImages,
    postAction
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
          dispatch(postAction(payload));
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
        dispatch(postAction(payload));
      }
    }
  };

  const handleSave = () => {
    if (restaurantVideo && restaurantVideo[0]) {
      handleFileConversion(
        restaurantVideo[0],
        "div3",
        restVideo && restVideo.length > 0 ? restVideo[0].id : null,
        1,
        prevRestVideo,
        PostRestaurantVideoRequest
      );
      setPrevRestVideo(restaurantVideo);
    }

    if (foodImage && foodImage[0]) {
      handleFileConversion(
        foodImage[0],
        "div4",
        FoodImage && FoodImage.length > 0 ? FoodImage[0].id : null,
        1,
        prevFoodImage,
        PostFoodImageRequest
      );
      setPrevFoodImage(foodImage);
    }

    if (infrastructureImage && infrastructureImage[0]) {
      handleFileConversion(
        infrastructureImage[0],
        "div5",
        InfraImage && InfraImage.length > 0 ? InfraImage[0].id : null,
        1,
        prevInfrastructureImage,
        PostInfrastructureImageRequest
      );
      setPrevInfrastructureImage(infrastructureImage);
    }

    if (customerImage && customerImage[0]) {
      handleFileConversion(
        customerImage[0],
        "div6",
        CustomerImage && CustomerImage.length > 0 ? CustomerImage[0].id : null,
        1,
        prevCustomerImage,
        PostHappyCustomerImageRequest
      );
      setPrevCustomerImage([customerImage[0]]);
    }

    if (customerImage && customerImage[1]) {
      handleFileConversion(
        customerImage[1],
        "div7",
        CustomerImage && CustomerImage.length > 1 ? CustomerImage[1].id : null,
        2,
        prevCustomerImage,
        PostHappyCustomerImageRequest
      );
      setPrevCustomerImage([customerImage[1]]);
    }
  };

  const resetImages = () => {
    setRestaurantVideo([null]);
    setFoodImage([null]);
    setInfrastructureImage([null]);
    setCustomerImage([null, null]);
  };

  return (
    <div className="restInfoContainer">
      <SidePanel />
      <div className="restaurantInfo">
      <TopNavbar />
      <div className="restaurantInfo info">
        <div className="restaurantInfo restaurantVideo">
          <div className="leftPart1">
            <div className="restaurantInfo headers">
              <div className="restaurantInfo videoTitle">Restaurant Video</div>
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
              className="restaurantInfo image"
              onMouseEnter={() => setPreviewImage(restoVideo)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadVideo
                videos={restaurantVideo}
                setVideos={setRestaurantVideo}
                inputRefs={RestVideoRef}
              />
            </div>
          </div>
        </div>

        <div className="restaurantInfo restaurantImages">
          <div className="leftPart2">
            <div className="restaurantInfo header6">
              <div className="restaurantInfo imageTitle">
                Restaurant Food Image
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
              className="restaurantInfo image"
              onMouseEnter={() => setPreviewImage(restoFoodImg)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadImage
                images={foodImage}
                setImages={setFoodImage}
                inputRefs={RestFoodImgRef}
              />
            </div>
          </div>
        </div>

        <div className="restaurantInfo restaurantImages">
          <div className="leftPart3">
            <div className="restaurantInfo header3">
              <div className="restaurantInfo imageTitle">
                Infrastructure Image
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
              className="restaurantInfo image"
              onMouseEnter={() => setPreviewImage(restoInfrastructure)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadImage
                images={infrastructureImage}
                setImages={setInfrastructureImage}
                inputRefs={RestInfraRef}
              />
            </div>
          </div>
        </div>

        <div className="PreviewContainer">
          {previewImage && <img src={previewImage} alt="Preview" />}
        </div>

        <div className="restaurantInfo restaurantImages">
          <div className="leftPart4">
            <div className="header4">
              <div className="restaurantInfo imageTitle">
                Happy Customer Image
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
              className="restaurantInfo image"
              onMouseEnter={() => setPreviewImage(happyCustomer)}
              onMouseLeave={() => setPreviewImage(null)}
            >
              <UploadImage
                images={customerImage}
                setImages={setCustomerImage}
                inputRefs={HappyCustomerRef}
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

export default RestaurantInfo;
