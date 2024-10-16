import React, { useContext, useState, useEffect } from "react";
import "./PrimaryDetailsReviewpage.scss";
import axios from "axios";
import edit from "../../../assets/images/edit.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Step2 from "../../../components/productCatalog/Step2/Step2";
import { Contextpagejs } from "../contextpage";
import ReviewValues from "../../../components/productCatalog/ReviewValues/ReviewValues";
import ImagePillsSelected from "../../../components/productCatalog/ImagePillsSelected/ImagePillsSelected";
import Step3Review, {
  RootStateIC,
} from "../../../components/productCatalog/Step3Review/Step3Review";
import PrimaryImageSelected from "../../../components/productCatalog/PrimaryImageSelected/PrimaryImageSelected";
import {
  addMenuItemRequest,
  addMockDataRequest,
  cleanMenuItemSuccessMsg,
  retryImageUpload,
  startImageUpload,
  updateMenuItemRequest,
  uploadImage,
} from "redux/productCatalog/productCatalogActions";
import SidePanel from "pages/SidePanel";
import { useHistory } from "react-router-dom";
import emptyfoodimg from "../../../assets/images/emptyfoodimg.png";
import {
  categoryType,
  cuisine,
  dietarytype,
  mealType,
} from "assets/mockData/Moca_data";

interface Image {
  id: string;
  image: string;
  name: string;
  mimeType?: string;
  base64String?: string;
}
interface AllergenImage {
  id: string;
  name: string;
}
interface Base64Image {
  mimeType: string;
  base64String: string;
}
interface imageType {
  file: File;
  itemId: string;
}

interface PrimaryData {
  locationId: string;
  altName: string;
  price: string;
  subCategoryId: string;
  categoryId: string;
  kitchenStations: string[];
  taxFeeId: string;
  modifiers: string[];
  availabilityId: string[];
  itemId: string;
  itemName?: string;
  category?: string;
  subCategory?: string;
  itemCode?: string;
  description?: string;
  dietaryType?: string;
  cuisine?: string;
  mealType?: string;
  bestPair?: string;
  Ingredients: AllergenImage[];
  alcohol: string;
  barCode: string;
  coloriePoint?: string;
  selectedcolorie: string;
  portionSize?: string;
  selectedPortion: string;
  tax: string;
  masterCode: string;
  imageUrls: ImageFile[];
  allergens: AllergenImage[];
  popularItem: boolean;
}
interface RootState {
  primarypage: {
    data: PrimaryData;
  };
  PricingDetailReducer: {
    prizingData: PricingData;
  };
}
interface PricingData {
  mainForm: MainForm;
}

interface MainForm {
  KitchenStationId?: string;
  normalForm?: NormalForm;
}

interface PreparationTime {
  hours: string;
  minutes: string;
}
interface NormalForm {
  availabilityid: string[];
  formNormal: FormNormal;
  dineinfields: DineInField[];
  Normaldays: number[];
  DeliveryMealType: string[];
  PicupMealType: string[];
  Pickup: number[];
  DineInServiceArea: DineInServiceArea;
  Delivery: number[];
  thirdParty: number[];
  WeekDays: number[][];
  DineIn: number[][];
  Swiggy: string[];
  Zomato: string[];
  Preparationtime: PreparationTime;
}

interface FormNormal {
  PickuppriceNormal: string;
  PickupmealtypeNormal: string;
  DeliverypriceNormal: string;
  DeliverymealtypeNormal: string;
  SwiggyorzomatoNormal: string;
  SwiggyNormal: string;
  SwiggymealtypeNormal: string;
  ZomatoNormal: string;
  ZomatomealtypeNormal: string;
}

interface DineInField {
  DineInPrice: string;
  DineInMealType: string[];
  DineInService: string[];
  showDay: boolean;
  dayButtonText: string;
}

interface DineInServiceArea {
  [key: number]: string[];
}

interface Status {
  id: number;
  image: File;
  status: string;
  index: number;
}

interface ImageUpload {
  uploadStatus: Status;
  errorMessages: Status;
}

interface ImageFile {
  file: File;
  preview: string;
}

interface ImageId {
  productCatalog: {
    addMenuSuccessMessage: string;
  };
}

interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}

interface Detail {
  typeId: string;
  typeName: string[]; 
  price: number | string; 
}

interface PrizingDetail {
  normalForm: {
    dineInDetails: Record<string, Detail>;
    pickupDetails: Record<string, Detail>;
    deliveryDetails: Record<string, Detail>;
  };
}
const PrimaryDetailsReviewpage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { isExpanded, setActiveCategory } = useContext(Contextpagejs);

  const uploadStatus = useSelector(
    (state: { imageUpload: ImageUpload }) => state.imageUpload?.uploadStatus
  );
  const errorMessages = useSelector(
    (state: { imageUpload: ImageUpload }) => state.imageUpload?.errorMessages
  );
  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );

  const primarydata = useSelector((state: RootState) => state.primarypage.data);
  const prizingDetail = useSelector(
    (state: RootState) => state?.PricingDetailReducer?.prizingData as any
  );
  const itemCustomizationData = useSelector(
    (state: RootStateIC) => state?.itemCustomizationsReducer1?.itemData || []
  );

  const fetchedprimarydata = primarydata;

  const [error, setError] = useState<Status[]>([]);

  const ImageId = useSelector(
    (state: ImageId) => state.productCatalog.addMenuSuccessMessage
  );

  // const [imageIdtosend, setimageIdtosend] = useState<string>("");

  useEffect(() => {
    setError([]);
  }, []);

  // useEffect(() => {
  //   if (uploadStatus && uploadStatus.index !== undefined) {

  //     setError((prevErro) => {
  //       const existingErrorIndex = prevErro.findIndex(
  //         (entry) => entry.index === uploadStatus.index
  //       );

  //       if (existingErrorIndex !== -1) {
  //         const updatedErro = [...prevErro];
  //         updatedErro[existingErrorIndex] = {
  //           ...updatedErro[existingErrorIndex],
  //           status: uploadStatus.status,
  //           image: uploadStatus.image,
  //           id: uploadStatus.id,
  //         };
  //         return updatedErro;
  //       } else {
  //         return [
  //           ...prevErro,
  //           {
  //             index: uploadStatus.index,
  //             status: uploadStatus.status,
  //             image: uploadStatus.image,
  //             id: uploadStatus.id,
  //           },
  //         ];
  //       }
  //     });
  //   }
  // }, [uploadStatus, errorMessages]);

  // useEffect(() => {
  //   if (uploadStatus.id && Object.keys(uploadStatus).length > 0){
  //     setError((prev)=>[...prev,uploadStatus]);
  //     console.log(error,"errosrs")
  //   } else {
  //     // If uploadStatus is not an array, you can handle it here
  //     console.error("uploadStatus is not an array:", uploadStatus);
  //   }
  // }, [uploadStatus, errorMessages]);

  const primarypagedetails = useSelector((state: RootState) => state);
  const MAX_IMAGES = 6;
  const subsectiondata = useSelector(
    (state: any) => state.productCatalog.uploadFailures
  );
  const retrymsg = useSelector(
    (state: any) => state.productCatalog.retryFailure
  );
  console.log("retrymsg", retrymsg);

  const [failedImage, setfailedImage] = useState<imageType[]>();

  useEffect(() => {
    setfailedImage(subsectiondata);
  }, [subsectiondata]);

  console.log("subsectiondata", subsectiondata);
  console.log(
    "fileArraydata",
    subsectiondata.length > 0 &&
      subsectiondata.map((img: any) => img?.file?.name)
  );

  const Wholedata = {
    locationId: "9c485244-afd4-11eb-b6c7-42010a010026",
    itemCode: primarypagedetails.primarypage.data.itemCode,
    altName: "alt name",
    type: "steamedVeg",
    itemName: primarypagedetails.primarypage.data.itemName,
    imageUrls: primarypagedetails.primarypage.data.imageUrls,
    description: primarypagedetails.primarypage.data.description,
    price: "12",
    categoryId: primarypagedetails.primarypage.data.categoryId,
    subCategoryId: "",
    kitchenStations: ["3bdfa61-0e4f-48e6-b2bb-b4bd1d103950"],
    taxFeeId: "",
    ingredients: ["03348389-4b2a-4fca-affa-6ad4291b0241"],
    modifiers: [],
    availabilityId: ["b1492143-2c4c-4a4f-bc49-a3b99cbb1349"],
    category: primarypagedetails.primarypage.data.category,
    subCategory: primarypagedetails.primarypage.data.subCategory,
    itemId: null,
  };
  // console.log("the whole data",Wholedata)

  const [uploadedimage, setUploadedimage] = useState<ImageFile[]>(
    fetchedprimarydata.imageUrls
  );

  let [selectedImages, setselectedImages] = useState(uploadedimage || []);
  // const selectedImages=uploadedimage || [];

  // console.log("selectedImages", uploadedimage);

  // const imagesNotPresent = selectedImages.filter(selectedImage =>
  //   !subsectiondata.some((subsectionFile:imageType) => subsectionFile.file.name === selectedImage.file.name)
  // )

  // useEffect(()=>(

  //   setselectedImages(imagesNotPresent)

  // ),[selectedImages,subsectiondata])

  const emptySlots =
    selectedImages.length === 0
      ? MAX_IMAGES - selectedImages.length - 1
      : MAX_IMAGES - selectedImages.length;

  const [disableSubmit, setDisableSubmit] = useState<boolean>(true); // Initialize submit as disabled

  const hasImageError = (image: File): boolean => {
    return error.some(
      (entry) => entry.image === image && entry.status !== "success"
    );
  };

  const checkAllImagesForErrors = () => {
    if (Array.isArray(uploadedimage)) {
      const hasErrors = uploadedimage.some((img) => hasImageError(img.file));
      setDisableSubmit(hasErrors);
    } else {
      setDisableSubmit(true);
    }
  };

  const [disablesubmitbtn, setdisablesubmitbtn] = useState<boolean>(false);
  const [indextoreplace, setindextoreplace] = useState<Status[]>([]);
  const allUploaded =
    uploadedimage &&
    uploadedimage.every((img) => img && !hasImageError(img.file));
  useEffect(() => {
    if (allUploaded) {
      setdisablesubmitbtn(false);
    }
  }, [allUploaded]);

  useEffect(() => {
    checkAllImagesForErrors();
  }, [uploadedimage, error]);

  const [retriedImages, setRetriedImages] = useState<ImageFile[]>([]);
  const handleRetry = (
    e: React.ChangeEvent<HTMLInputElement>,
    indexToReplace: number
  ) => {
    const filedata = e.target.files?.[0];
    if (filedata) {
      const validImageTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 2 * 1024 * 1024;

      if (!validImageTypes.includes(filedata.type)) {
        alert(`Invalid file type: Only PNG and JPG are allowed.`);
        return;
      }
      if (filedata.size > maxSizeInBytes) {
        alert(`File too large: ${filedata.name}. Maximum size is 2MB.`);
        return;
      }

      console.log("index", indexToReplace);

      const newImage = {
        file: filedata,
        preview: URL.createObjectURL(filedata),
      };
      // setUploadedimage((prevImages) => {
      //   const updatedImages = [];
      //   updatedImages[indexToReplace] = newImage;

      //   return updatedImages;
      // });
      setUploadedimage((prevImages) => {
        const updatedImages = prevImages;
        updatedImages[indexToReplace] = newImage;

        return updatedImages;
      });

      console.log("slectdimg", selectedImages);

      // console.log("prevoiew",selectedImages[indexToReplace])
      // setRetriedImages([newImage])
      setRetriedImages([newImage]);
      console.log("Retry images", retriedImages);
      dispatch(retryImageUpload(newImage));

      // setTimeout(() => {
      //   dispatch(startImageUpload(retriedImages))
      // }, 2000);

      dispatch(cleanMenuItemSuccessMsg());

      // setindextoreplace((prev)=>[...prev,ReplaceImage]);

      const allUploaded = uploadedimage.every(
        (img) => img && !hasImageError(img.file)
      );
      const allSuccess = error.every((data) => data.status === "success");
      if (allUploaded && allSuccess) {
        setdisablesubmitbtn(false);
      }

      setTimeout(() => checkAllImagesForErrors(), 0);
    }
  };

  const dietaryData = useSelector(
    (state: any) => state.productCatalog.dietaryData.data
  );

  const cuisineData = useSelector(
    (state: any) => state.productCatalog.cuisineData.data
  );

  const subCategoryData = useSelector(
    (state: any) => state.productCatalog.subCategoryData.data
  );

  const categoryData = useSelector(
    (state: any) => state.productCatalog.categoryData.data
  );

  const bestPairData = useSelector(
    (state: any) => state.productCatalog.bestPairData.data
  );

  const menuAddedSuccess = useSelector((state:any) => state.productCatalog.menuDataSuccess)

  const editData = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const kitchenStationData = useSelector(
    (state: any) => state.productCatalog.kitchenStation
  );

useEffect(()=>{
  console.log({menuAddedSuccess})
},[menuAddedSuccess])
  //////////////

  const matchedDietary = dietaryData?.filter((dietary: any) =>
    primarydata?.dietaryType?.includes(dietary.name)
  );

  const matchedCuisine = cuisineData?.find(
    (cuisine: any) => cuisine?.name === primarydata?.cuisine
  );

  const matchedCategory = categoryData?.find(
    (category: any) => category.name === primarydata?.category
  );

  const matchedSubCategory = subCategoryData?.find(
    (subCategory: any) => subCategory.name === primarydata?.subCategory
  );

  const matchedKitchenStation = kitchenStationData?.find((kitchen : any) => kitchen.name === prizingDetail?.kitchenstation)

  console.log({matchedKitchenStation})

  // const matchedBestPair = bestPairData?.find(
  //   (bestPair : any) => bestPair.name === primarydata?.bestPair
  // );

  const matchedBestPair = bestPairData?.filter((bestPair: any) =>
    primarydata?.bestPair?.includes(bestPair?.name)
  );

  const matchedDietaryId = matchedDietary?.map((m: any) => m?.id);
  const matchedCuisineId = matchedCuisine?.id;
  const matchedCategoryId = matchedCategory?.id;
  const matchedSubCategoryId = matchedSubCategory?.id;
  const bestPairId = matchedBestPair?.map((m: any) => m?.id);
  const kitchenStationId = matchedKitchenStation?.id

  const modifierData = itemCustomizationData?.map((item) => ({
    modifierName: item?.modifierName,
    maxCount: item?.maxSelection,
    minCount: item?.minSelection,
    noFreeCustomization: item?.freeCustomization,
    options: item?.options,
  }));

  const dineInDetails = prizingDetail?.normalForm?.dineInDetails;
  const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
  const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
  const thirdPartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;

  const combinedDetails: Detail[] = [
    dineInDetails && dineInDetails,
    pickupDetails && pickupDetails,
    deliveryDetails && deliveryDetails,
    thirdPartyDetails && thirdPartyDetails,
  ].filter(Boolean);

  const normalDays = prizingDetail?.normalForm?.Normaldays;
  const stringNormalDays = Array.isArray(normalDays)
    ? normalDays.map(String)
    : [];

  const menuPayload = {
    locationId: locationid,
    itemId: editData ? editData[0]?.id : '',
    itemName: primarydata?.itemName || null,
    itemCode: primarydata?.itemCode || null,
    dietTypes: matchedDietaryId || null,
    pairedItems: bestPairId || null,
    barCode: primarydata?.barCode || null,
    cuisine: matchedCuisineId || null,
    // mealType: primarydata?.mealType || null,
    categoryId: matchedCategoryId || null,
    subCategoryId: matchedSubCategoryId || null,
    isPopularItem: primarydata?.popularItem || null,
    allergens: primarydata?.allergens || null,
    description: primarydata?.description || null,
    containsAlcohol: primarydata?.alcohol === "yes" ? true : false,
    ingredients: primarydata?.Ingredients || null,
    calorieInfo: primarydata?.coloriePoint || null,
    portionInfo: primarydata?.portionSize || null,
    taxClassAssociation: primarydata?.taxFeeId || null,
    // masterItemCode: primarydata?.masterCode || null,

    kitchenStation: kitchenStationId || null,
    preparationTimeInHours:
      prizingDetail?.mainForm?.normalForm?.Preparationtime?.hours || null,
    preparationTimeInMinutes:
      prizingDetail?.mainForm?.normalForm?.Preparationtime?.minutes || null,
    ignoreMasterKotPrint: false,
    availabilityDays: stringNormalDays || null,
    orderTypesWithRespectToAvailability: combinedDetails || null,

    ...(modifierData.length > 1 && { modifiers: modifierData || null }),
  };

  console.log("Primary",primarydata?.taxFeeId)

  console.log({ menuPayload });

  const handleDispatch = async () => {
    checkAllImagesForErrors();
    const allUploaded = uploadedimage?.every(
      (img) => img && !hasImageError(img.file)
    );

    if (uploadStatus.id && error && error.length > 0) {
      const allSuccess = error.every((data) => data.status === "success");
      if (allUploaded && allSuccess) {
        dispatch(cleanMenuItemSuccessMsg());

        setTimeout(() => {
          setTimeout(() => checkAllImagesForErrors(), 0);

          if (allUploaded && allSuccess) {
            history.push("/menuListing");
          }
        }, 5000);
      } else {
        alert("you can't go");
        setdisablesubmitbtn(true);
      }
    }

    // for(let [index,image] of indextoreplace.entries()){
    //   console.log("image",image,"index",index)

    // }
    if (ImageId === "" || ImageId === undefined) {
      // dispatch(addMenuItemRequest({ menuPayload, locationid }));
      // dispatch(addMockDataRequest(data));
    } else {
      setindextoreplace((prev) => {
        const updatedIndexToReplace = [...prev];

        // Dispatch after state is updated
        updatedIndexToReplace.forEach((item) => {
          dispatch(uploadImage(item.image, item.id, item.index));
        });

        return updatedIndexToReplace; // Ensure the state is updated with the new value
      });
    }
    if(editData.length > 0){
      dispatch(updateMenuItemRequest({menuPayload, locationid}))
    }else{
      dispatch(addMenuItemRequest({ menuPayload, locationid }));
    }
    // dispatch(addMockDataRequest(data));

    // If needed, redirect or perform other actions here
    // if (allUploaded) {
    //   history.push("/menuListing");
    // }
  };

  // const handleDispatch = async () => {
  //   checkAllImagesForErrors();
  //   const allUploaded =  uploadedimage.every(
  //     (img) => img && !hasImageError(img.file)
  //   );

  //   if (uploadStatus.id && error && error.length > 0) {
  //     const allSuccess = error.every((data) => data.status === "success");
  //     if (allUploaded && allSuccess) {
  //       dispatch(cleanMenuItemSuccessMsg())

  //       setTimeout(() => {

  //         setTimeout(() => checkAllImagesForErrors(), 0);

  //         if(allUploaded && allSuccess){

  //           history.push("/menuListing");

  //         }

  //       }, 5000);

  //     } else {
  //       alert("you can't go")
  //       setdisablesubmitbtn(true)
  //     }
  //   }

  //   // for(let [index,image] of indextoreplace.entries()){
  //   //   console.log("image",image,"index",index)

  //   // }
  //   if (ImageId === "" || ImageId === undefined) {
  //     dispatch(addMenuItemRequest(data));
  //     dispatch(addMockDataRequest(data));
  //   } else {
  //     setindextoreplace((prev) => {
  //       const updatedIndexToReplace = [...prev];

  //       // Dispatch after state is updated
  //       updatedIndexToReplace.forEach((item) => {
  //         dispatch(uploadImage(item.image, item.id, item.index));
  //       });

  //       return updatedIndexToReplace; // Ensure the state is updated with the new value
  //     });
  //   }
  //   dispatch(addMenuItemRequest(data));
  //   dispatch(addMockDataRequest(data));

  //   // If needed, redirect or perform other actions here
  //   // if (allUploaded) {
  //   //   history.push("/menuListing");
  //   // }
  // };

  const handleSubmitItemDetails = () => {
    if (Wholedata.imageUrls.length === 0) {
      console.log("is  emty");
    } else {
      console.log("is not emty");
      dispatch(startImageUpload(Wholedata.imageUrls));
    }
  };
  const handleAddImage = (index: number) => {
    document.getElementById(`imgadd-${index}`)?.click();
  };

  const imagecheck = (imagevalue: ImageFile) => {
    const result = subsectiondata.some(
      (image: imageType) => image?.file?.name === imagevalue?.file?.name
    );
    // console.log(subsectiondata.map((img:imageType)=>img?.file?.name));

    const matchingIndex = subsectiondata.findIndex(
      (subsectionFile: imageType) =>
        selectedImages.some(
          (selectedImage) =>
            subsectionFile.file.name === selectedImage.file.name
        )
    );
    return result;
  };

  return (
    <div className={isExpanded ? "reviewContaineExpanded" : "reviewContainer"}>
      <SidePanel />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="reviewheading">
          <p>
            Review menu item - {primarypagedetails.primarypage.data?.itemName}
          </p>
        </div>
        <div className="reviewpage">
          <div className="reviewpagebody">
            <div className="primaryreview">
              <div className="primaryreviewdetailspart1">
                <div className="primaryreviewheading">
                  <p>Step 1: Primary Details</p>
                </div>
                <div className="primaryreviews">
                  <div className="primaryreviewdetails">
                    <div className="primaryreviewdetails1">
                      <div>
                        <ReviewValues
                          label="Item Name"
                          textvalue={
                            fetchedprimarydata.itemName
                              ? fetchedprimarydata.itemName
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Dietary type"
                          textvalue={
                            fetchedprimarydata.dietaryType
                              ? fetchedprimarydata.dietaryType
                              : "-"
                          }
                        />
                      </div>
                      {/* 
                      <div>
                        <ReviewValues
                          label="Meal type"
                          textvalue={
                            fetchedprimarydata.mealType
                              ? fetchedprimarydata.mealType
                              : "-"
                          }
                        />
                      </div> */}

                      <div>
                        <ReviewValues
                          label="Category"
                          textvalue={
                            fetchedprimarydata.category
                              ? fetchedprimarydata.category
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        {/* <ReviewValues
                          label="Calorie Point"
                          textvalue={
                            fetchedprimarydata.coloriePoint
                              ? fetchedprimarydata.coloriePoint
                              : "-"
                          }
                        /> */}
                      </div>
                      {/* 
                      <div>
                        <ReviewValues
                          label="Portion Size"
                          textvalue={
                            fetchedprimarydata.portionSize
                              ? fetchedprimarydata.portionSize?.type
                              : "-"
                          }
                        />
                      </div> */}

                      <div>
                        <ReviewValues
                          label="Tax Class Association"
                          textvalue={
                            fetchedprimarydata.tax
                              ? fetchedprimarydata.tax
                              : "-"
                          }
                        />
                      </div>
                    </div>

                    <div className="primaryreviewdetails2">
                      <div>
                        <ReviewValues
                          label="Item code"
                          textvalue={
                            fetchedprimarydata.itemCode
                              ? fetchedprimarydata.itemCode
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Other dietary details"
                          textvalue={
                            fetchedprimarydata.itemCode
                              ? fetchedprimarydata.itemCode
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Cuisine"
                          textvalue={
                            fetchedprimarydata.cuisine
                              ? fetchedprimarydata.cuisine
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Sub-category"
                          textvalue={
                            fetchedprimarydata.subCategory
                              ? fetchedprimarydata.subCategory
                              : "-"
                          }
                        />
                      </div>

                      {/* <div>
                        <ReviewValues
                          label="Unit of measurement"
                          textvalue={
                            fetchedprimarydata.selectedPortion
                              ? fetchedprimarydata.selectedPortion
                              : "-"
                          }
                        />
                      </div> */}

                      <div>
                        <ReviewValues
                          label="Master product code"
                          textvalue={
                            fetchedprimarydata.masterCode
                              ? fetchedprimarydata.masterCode
                              : "-"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="primaryreviewdetailspart2">
                <div className="EditData">
                  <Link
                    to="/productCatalog/PrimaryDetails"
                    className="primarypageedit"
                    onClick={() => setActiveCategory("Step 1: Primary Details")}
                  >
                    <img
                      src={edit}
                      alt=""
                      className="step3-Review-Container-heading-EditImage"
                      width={15}
                      height={15}
                    />
                    <h3 className="Edit-heading">Edit</h3>
                  </Link>{" "}
                </div>
                {
                  <div className="primaryimages">
                    <p>Primary Image</p>
                    <div style={{ display: "flex" }}>
                      {error.map((item) => (
                        <p style={{ width: "100px" }}>{item.status} </p>
                      ))}
                    </div>

                    <div className="images">
                      <div className="images">
                        <ol>
                          {selectedImages && selectedImages[0] && (
                            <li>
                              {/* <img
                                className="uploaded-image"
                                src={selectedImages[0].preview}
                                alt={`Preview of `}
                              /> */}
                              <div style={{ fontSize: "30px" }}>
                                {imagecheck(selectedImages[0]) ? (
                                  <>
                                    <div className="imagewitherror">
                                      <img
                                        src={emptyfoodimg}
                                        alt={``}
                                        className="eerroremptyimage"
                                      />

                                      <input
                                        type="file"
                                        name="imageUrls"
                                        className="imgfile"
                                        id={`imgadd-${0}`}
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleRetry(e, 0)}
                                        style={{ display: "none" }}
                                      />

                                      <span
                                        className="errromsg"
                                        onClick={() => handleAddImage(0)}
                                      >
                                        Retry
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <img
                                    className="uploaded-image"
                                    src={selectedImages[0].preview}
                                    alt={`Preview of `}
                                  />
                                )}
                              </div>
                            </li>
                          )}

                          {selectedImages?.length === 0 &&
                            [0].map((_, index) => (
                              <li key={index + 1}>
                                <img
                                  src={emptyfoodimg}
                                  alt={`sample ${index}`}
                                />
                              </li>
                            ))}

                          <div className="selectediagelist">
                            {selectedImages &&
                              selectedImages.slice(1).map((image, index) => (
                                <li key={index + 1}>
                                  {imagecheck(selectedImages[index + 1]) ? (
                                    <div className="imagewitherror">
                                      <img
                                        src={emptyfoodimg}
                                        alt={``}
                                        className="eerroremptyimage"
                                      />

                                      <input
                                        type="file"
                                        name="imageUrls"
                                        className="imgfile"
                                        id={`imgadd-${index + 1}`} // Unique ID for each input
                                        accept="image/png, image/jpeg"
                                        onChange={(e) =>
                                          handleRetry(e, index + 1)
                                        }
                                        style={{ display: "none" }} // Hide the file input, trigger it with a button
                                      />

                                      <span
                                        className="errromsg"
                                        onClick={() =>
                                          handleAddImage(index + 1)
                                        } // Pass the correct index to handleAddImage
                                      >
                                        Retry
                                      </span>
                                    </div>
                                  ) : (
                                    <img
                                      className="uploaded-image"
                                      src={selectedImages[index + 1].preview}
                                      alt={`Preview of `}
                                    />
                                  )}
                                </li>
                              ))}

                            {Array.from({ length: emptySlots })
                              .slice(0)
                              .map((_, index) => (
                                <li key={selectedImages.length + index + 1}>
                                  <img
                                    src={emptyfoodimg}
                                    alt={`empty ${index}`}
                                  />
                                </li>
                              ))}
                          </div>
                        </ol>
                        <ol>
                          {/* {selectedImages.map((img, index) => (
                      <div key={index} className="image-container">
                        <img
                          className="uploaded-image"
                          src={img.preview}
                          alt={`Preview of ${img.file.name}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }} // Display a small thumbnail
                        />
                        <div>
                          {img.file.name} -{" "}
                          {img.uploaded
                            ? "Uploaded"
                            : img.failed
                            ? "Failed"
                            : "Pending Upload"}
                        </div>
                      </div>
                    ))} */}
                        </ol>
                      </div>
                    </div>

                    {/* <PrimaryImageSelected fetchedprimarydata={uploadedimage}  /> */}
                  </div>
                }

                {fetchedprimarydata.description && (
                  <div className="primarydescription">
                    <p>Description</p>
                    <div className="description">
                      <p>{fetchedprimarydata.description}</p>
                    </div>
                  </div>
                )}
                {
                  <div className="primarybestpairedfood">
                    <p>Best paired with</p>
                    <div className="bestpairfoods">
                      <p>
                        {fetchedprimarydata.bestPair
                          ? fetchedprimarydata.bestPair
                          : "No item selected"}
                      </p>
                    </div>
                  </div>
                }

                <div className="allergensandingredients">
                  <div>
                    {fetchedprimarydata?.Ingredients?.length > 0 && (
                      <>
                        {" "}
                        <p className="ingredients">Ingredients</p>
                        <ImagePillsSelected
                          imageselected={fetchedprimarydata}
                          name="Ingredients"
                        />
                      </>
                    )}
                  </div>

                  <div>
                    {fetchedprimarydata?.allergens?.length > 0 && (
                      <>
                        {" "}
                        <p className="allergen">Allergens</p>{" "}
                        <ImagePillsSelected
                          imageselected={fetchedprimarydata}
                          name="allergens"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="part-two">
                <Step2 />
                <div className="verticalLine" />

                <Step3Review />
              </div>
            </div>
          </div>
        </div>{" "}
        <div
          className={isExpanded ? "saveandnextreview" : "saveandnextreview1"}
        >
          <button
            className={`${isExpanded ? "clearall1" : "clearall"}`}
            onClick={() => history.push("/menuListing")}
          >
            Cancel
          </button>
          <button
            className="saveall"
            // style={{disablesubmitbtn}}
            onClick={handleDispatch}
            disabled={disablesubmitbtn}
          >
            Submit for review
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetailsReviewpage;
