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
  removeDataRequest,
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
import { stat } from "fs";

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

interface calorieandportionsize {
  type: string;
  value: string;
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
  coloriePoint?: calorieandportionsize;
  selectedcolorie: string;
  portionSize?: calorieandportionsize;
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

  const uploadImageLoading = useSelector(
    (state: any) => state.productCatalog?.uploadImageLoading
  );
  const selectedcategory = useSelector(
    (state: any) => state.productCatalog?.selectedCategory
  );

  // const [imageIdtosend, setimageIdtosend] = useState<string>("");

  useEffect(() => {
    setError([]);
  }, []);

  const primarypagedetails = useSelector((state: RootState) => state);
  const MAX_IMAGES = 6;
  const subsectiondata = useSelector(
    (state: any) => state.productCatalog.uploadFailures
  );
  const subsectiondatamsg = useSelector(
    (state: any) => state.productCatalog.imageUploadsuccessemsg
  );
  const UploadImageImageID = useSelector(
    (state: any) => state.productCatalog.successImageId
  );

  const retrymsg = useSelector(
    (state: any) => state.productCatalog.retryFailure
  );

  const [failedImage, setfailedImage] = useState<imageType[]>();

  useEffect(() => {
    setfailedImage(subsectiondata);
  }, [subsectiondata]);

  const imageFailure =
    subsectiondata?.length > 0 &&
    subsectiondata.map((img: any) => img?.file?.name);

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

  const emptySlots =
    selectedImages.length === 0
      ? MAX_IMAGES - selectedImages.length - 1
      : MAX_IMAGES - selectedImages.length;

  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

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

      const newImage = {
        file: filedata,
        preview: URL.createObjectURL(filedata),
      };
      setUploadedimage((prevImages) => {
        const updatedImages = prevImages;
        updatedImages[indexToReplace] = newImage;

        return updatedImages;
      });

      setRetriedImages([newImage]);
      dispatch(retryImageUpload(newImage));

      dispatch(cleanMenuItemSuccessMsg());

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

  const menuAddedSuccess = useSelector(
    (state: any) => state.productCatalog.menuDataSuccess
  );

  const editData = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );
  const menuData = useSelector((state: any) => state.productCatalog?.menuData);

  const menudata = [
    {
      categoryName: "Category 1",
      categoryId: "1",
      itemresponse: [{ itemId: "101" }, { itemId: "102" }],
    },
    {
      categoryName: "Category 2",
      categoryId: "2",
      itemresponse: [{ itemId: "103" }, { itemId: "104" }],
    },
    {
      categoryName: "Category 3",
      categoryId: "3",
      itemresponse: [{ itemId: "105" }, { itemId: "106" }],
    },
  ];

  const targetItemId = "104";

  const filteredCategory = menuData.find((category: any) =>
    category?.itemResponseList?.some(
      (item: any) => item.itemId === editData[0]?.itemId
    )
  );

  const kitchenStationData = useSelector(
    (state: any) => state.productCatalog.kitchenStation
  );

  const addMenuLoading = useSelector((state : any) => state.productCatalog?.addMenuLoading)

  const matchedDietary = dietaryData?.filter((dietary: any) =>
    primarydata?.dietaryType?.includes(dietary.name)
  );

  const matchedCuisine = cuisineData?.find(
    (cuisine: any) => cuisine.name === primarydata?.cuisine
  );

  const matchedCategory = categoryData?.find(
    (category: any) => category.name === primarydata?.category
  );

  const matchedSubCategory = subCategoryData?.find(
    (subCategory: any) => subCategory.name === primarydata?.subCategory
  );

  const matchedKitchenStation = Array.isArray(kitchenStationData)
  ? kitchenStationData.find(
      (kitchen: any) => kitchen.name === prizingDetail?.kitchenstation
    )
  : undefined;

  const matchedBestPair = bestPairData?.filter((bestPair: any) =>
    primarydata?.bestPair?.includes(bestPair?.name)
  );

  const matchedDietaryId = matchedDietary?.map((m: any) => m?.id);
  const matchedCuisineId = matchedCuisine?.id;
  const matchedCategoryId = matchedCategory?.id;
  const matchedSubCategoryId = matchedSubCategory?.id;
  const bestPairId = matchedBestPair?.map((m: any) => m?.id);
  const kitchenStationId = matchedKitchenStation?.id;

  const modifierData = itemCustomizationData?.map((item) => ({
    modifierId: item?.modifierId|| null,
    modifierName: item?.modifierName || null,
    isModifierChanged: item?.isModifierChanged || false,
    maxCount: item?.maxSelection || null,
    minCount: item?.minSelection || null,
    noFreeCustomization: item?.freeCustomization || null,
    options: item?.modifierOptions,
  }));

  const dineInDetails = prizingDetail?.normalForm?.dineInDetails;
  const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
  const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
  const thirdPartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;

  const ingredientsdata = useSelector((state : any) => state.productCatalog?.ingredients?.data) 
  const allergensData = useSelector((state: any) => state.productCatalog?.allergens?.data)

  const editDetails = editData[0]?.orderTypes
  const removePricing = []
  const addPricing = []
  
  const combinedDetails: Detail[] = [
    dineInDetails && dineInDetails,
    pickupDetails && pickupDetails,
    deliveryDetails && deliveryDetails,
    ...(Array.isArray(thirdPartyDetails) ? thirdPartyDetails : []),
  ].filter(Boolean);
  
  const normalDays = prizingDetail?.normalForm?.Normaldays;
  const stringNormalDays = Array.isArray(normalDays)
    ? normalDays.map(String)
    : [];


  const menuPayload = {
    locationId: locationid,
    itemId: UploadImageImageID ? UploadImageImageID : "",
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
    preparationTimeInHours: prizingDetail?.Preparationtime?.hours || null,
    preparationTimeInMinutes: prizingDetail?.Preparationtime?.minutes || null,
    ignoreMasterKotPrint: false,
    availabilityDays: stringNormalDays || null,
    orderTypesWithRespectToAvailability: combinedDetails || null,

    ...(itemCustomizationData.length > 0 && {
      modifiers: modifierData || null,
    }),

    // isSingleMenu: false,
  };

  const deletedId = useSelector((state: any) => state.productCatalog.deletedId);
  const updateModifierId = useSelector(
    (state: any) => state.productCatalog.updateModifierId
  );

  const [combinedData, setCombinedData] = useState<string[]>([]);

  useEffect(() => {
    const flatDeletedId = deletedId.flat();
    const mergedData = [...new Set([...updateModifierId, ...flatDeletedId])];
    setCombinedData(mergedData);
  }, [deletedId, updateModifierId]);

  const editPrevData = useSelector(
    (state: any) => state.productCatalog.updatedPayload
  );

  const editPayload = {
    itemId: editData[0]?.itemId,
    locationId: locationid,
    itemName: primarydata?.itemName || null,
    itemCode: primarydata?.itemCode || null,
    dietTypes: matchedDietaryId || null,
    pairedItems: bestPairId || null,
    barCode: primarydata?.barCode || null,
    cuisine: matchedCuisineId || null,
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

    kitchenStation: kitchenStationId || null,
    preparationTimeInHours: prizingDetail?.Preparationtime?.hours || null,
    preparationTimeInMinutes: prizingDetail?.Preparationtime?.minutes || null,
    ignoreMasterKotPrint: false,
    availabilityDaysToAdd: stringNormalDays || null,
    latestOrderTypesDTOWithRespectToAvailability: combinedDetails || null,

    ...(itemCustomizationData.length > 0 && { modifiersToAdd: modifierData || null }),
    isCategoryUpdated:
      filteredCategory?.categoryName !==
      primarypagedetails.primarypage.data.category,
    // isSingleMenu: false,
    modifiersToRemove: combinedData?.filter(Boolean),
    availabilityDaysRemove: editData[0]?.availabilityDays,
    // latestOrderTypesDTOWithRespectToAvailability: editData[0]?.combinedDetails || null,
    specialItem: null,
  };

  console.log({menuPayload}, {editPayload})

  // const handleDispatch = async () => {
  //   checkAllImagesForErrors();
  //   const allUploaded = uploadedimage.every(
  //     (img) => img && !hasImageError(img.file)
  //   );

  //   if (uploadStatus.id && error && error.length > 0) {
  //     const allSuccess = error.every((data) => data.status === "success");
  //     if (allUploaded && allSuccess) {
  //       dispatch(cleanMenuItemSuccessMsg());

  //       setTimeout(() => {
  //         setTimeout(() => checkAllImagesForErrors(), 0);

  //         if (allUploaded && allSuccess) {
  //           history.push("/menuListing");
  //         }
  //       }, 5000);
  //     } else {
  //       alert("you can't go");
  //       setdisablesubmitbtn(true);
  //     }
  //   }

  //   if (ImageId === "" || ImageId === undefined) {
  //   } else {
  //     setindextoreplace((prev) => {
  //       const updatedIndexToReplace = [...prev];
  //       updatedIndexToReplace.forEach((item) => {
  //         dispatch(uploadImage(item.image, item.id, item.index));
  //       });
  //       return updatedIndexToReplace;
  //     });
  //   }
  //   if (editData.length > 0 && editData[0]) {
  //     dispatch(updateMenuItemRequest(editPayload));
  //   } else {
  //     dispatch(addMenuItemRequest({ menuPayload, locationid }));
  //   }
  // };

  const addMenuSuccess = useSelector(
    (state: any) => state.productCatalog.addMenuSuccess
  );

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmitItemDetails = () => {
    if (Wholedata?.imageUrls?.length > 0) {
      dispatch(startImageUpload(primarydata?.imageUrls));
      setButtonClicked(true);
      if (subsectiondatamsg) {
        if (editData.length > 0 && editData[0]) {
          console.log('1')
          dispatch(updateMenuItemRequest( editPayload ));
        } else {
          console.log('2')
          dispatch(addMenuItemRequest({ menuPayload, locationid }));
        }
      }
    } else {
      if (editData.length > 0 && editData[0]) {
        console.log("3")
        dispatch(updateMenuItemRequest( editPayload ));
      } else {
        console.log('4')
        dispatch(addMenuItemRequest({ menuPayload, locationid }));
      }
      // dispatch(addMenuItemRequest({ menuPayload, locationid }));
      setButtonClicked(true);
    }
  };

  useEffect(() => {
    if (subsectiondatamsg && buttonClicked) {
      console.log('5')
      editData.length > 0 && editData[0]
        ? dispatch(updateMenuItemRequest(editPayload))
        : dispatch(addMenuItemRequest({ menuPayload, locationid }));
    }
  }, [subsectiondatamsg]);

  useEffect(() => {
    if (buttonClicked) {
      dispatch(removeDataRequest());
      // dispatch(removeDataRequest(prizingDetail))
      // dispatch(removeDataRequest(itemCustomizationData))
      history.push("/menuListing");
    }
  }, [addMenuSuccess]);

  const handleAddImage = (index: number) => {
    document.getElementById(`imgadd-${index}`)?.click();
  };

  const imagecheck = (imagevalue: ImageFile) => {
    const result = subsectiondata.some(
      (image: imageType) => image?.file?.name === imagevalue?.file?.name
    );

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
                            primarydata.itemName ? primarydata?.itemName : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Dietary type"
                          textvalue={
                            Array.isArray(primarydata.dietaryType) && primarydata.dietaryType.length > 0
                              ? primarydata.dietaryType.map((type) => type.name).join(", ")
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
                            primarydata.category ? primarydata.category : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Calorie Point"
                          textvalue={
                            primarydata?.coloriePoint?.value
                              ? primarydata.coloriePoint?.value
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Portion Size"
                          textvalue={
                            primarydata.portionSize?.value
                              ? primarydata.portionSize?.value
                              : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Tax Class Association"
                          textvalue={primarydata.tax ? primarydata.tax : "-"}
                        />
                      </div>
                    </div>

                    <div className="primaryreviewdetails2">
                      <div>
                        <ReviewValues
                          label="Item code"
                          textvalue={
                            primarydata.itemCode ? primarydata.itemCode : "-"
                          }
                        />
                      </div>

                      <div>
                        <ReviewValues
                          label="Other dietary details"
                          textvalue={
                            primarydata.itemCode ? primarydata.itemCode : "-"
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

                      <div>
                        <ReviewValues
                          label="Unit of measurement"
                          textvalue={
                            fetchedprimarydata.portionSize?.type
                              ? fetchedprimarydata.portionSize?.type
                              : "-"
                          }
                        />
                      </div>

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
                                        id={`imgadd-${index + 1}`}
                                        accept="image/png, image/jpeg"
                                        onChange={(e) =>
                                          handleRetry(e, index + 1)
                                        }
                                        style={{ display: "none" }}
                                      />

                                      <span
                                        className="errromsg"
                                        onClick={() =>
                                          handleAddImage(index + 1)
                                        }
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
                                    {typeof emptyfoodimg === "string" ? (
                                      <img src={emptyfoodimg} alt={`empty ${index}`} />
                                    ) : (
                                      <span>Error: emptyfoodimg is not a valid image path</span>
                                    )}
                                  </li>
                                ))}
                          </div>
                        </ol>
                        <ol></ol>
                      </div>
                    </div>
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
                    {primarydata?.Ingredients?.length > 0 && (
                      <>
                        {" "}
                        <p className="ingredients">Ingredients</p>
                        <ImagePillsSelected
                          imageselected={primarydata}
                          name="Ingredients"
                        />
                      </>
                    )}
                  </div>

                  <div>
                    {primarydata?.allergens?.length > 0 && (
                      <>
                        {" "}
                        <p className="allergen">Allergens</p>{" "}
                        <ImagePillsSelected
                          imageselected={primarydata}
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
            onClick={handleSubmitItemDetails}
            disabled={addMenuLoading}
          >
            {!addMenuLoading ? (
              "Submit for review"
            ) : (
              <div className="reviewLoaders"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetailsReviewpage;
