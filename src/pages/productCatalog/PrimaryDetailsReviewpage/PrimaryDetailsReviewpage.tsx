import React, { useContext, useState, useEffect } from "react";
import "./PrimaryDetailsReviewpage.scss";
import axios from "axios";
// import edit from "../../../assets/images/edit.png";
import edit from "../../../assets/svg/editimg.svg";

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
  fetchDropDownRequest,
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
  DietaryType?: string;
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
  exclusiveItem: boolean;
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
  url?: any;
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
  // const locationid = useSelector(
  //   (state: State) => state?.auth?.credentials?.locationId
  // );

  const locationid = useSelector((state: any) => state.auth.selectedBranch?.id);

  const primarydata: any = useSelector(
    (state: RootState) => state.primarypage.data
  );

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

  const [uploadedimage, setUploadedimage] = useState<any[]>(
    fetchedprimarydata.imageUrls?.map((url: any) => ({ url })) || []
  );

  const [selectedImages, setSelectedImages] = useState<ImageFile[]>(
    uploadedimage || []
  );

  const emptySlots =
    selectedImages.length === 0
      ? MAX_IMAGES - selectedImages?.length - 1
      : MAX_IMAGES - selectedImages?.length;

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

  const filteredCategory = menuData.find((category: any) =>
    category?.itemResponseList?.some(
      (item: any) => item.itemId === editData[0]?.itemId
    )
  );

  const allItemResponseLists = menuData
  ?.flatMap((category:any) =>
    category?.subCategoryResponseList?.map((subCategory:any) => ({
      categoryId: category.categoryId,
      categoryName: category?.categoryName,
      subCategoryId: subCategory?.subCategoryId,
      subCategoryName: subCategory?.subCategoryName,
      itemResponseList: subCategory?.itemResponseList,
    }))
  )
  .filter(
    (item:any) =>
      item?.itemResponseList !== null &&
      item?.itemResponseList?.length > 0
  );


  const filteredSubCategory = allItemResponseLists.find((category: any) =>
    category?.itemResponseList?.some(
      (item: any) => item.itemId === editData[0]?.itemId
    )
  );

  const selectedCategory = useSelector((state:any) => state.productCatalog.selectedCategory)
  const selectedSubCategory = useSelector((state:any) => state.productCatalog.selectedSubCategory)


  const kitchenStationData = useSelector(
    (state: any) => state.productCatalog.kitchenStation
  );

  const addMenuLoading = useSelector(
    (state: any) => state.productCatalog?.addMenuLoading
  );
  

  const matchedDietary = dietaryData?.filter((dietary: any) =>
    primarydata?.DietaryType?.includes(dietary.name)
  );

  const matchedCuisine = cuisineData?.find(
    (cuisine: any) => cuisine.name === primarydata?.cuisine
  );

  const matchedCategory = categoryData?.find(
    (category: any) => category.name === primarydata?.category
  );

  const matchedKitchenStation = Array.isArray(kitchenStationData)
    ? kitchenStationData.find(
        (kitchen: any) =>
          kitchen.name?.toLowerCase() ===
          prizingDetail?.kitchenstation?.toLowerCase()
      )
    : undefined;
    const data =typeof(primarydata?.bestPair)=='string' ? primarydata?.bestPair.split(", ") :[]

  const matchedBestPair = typeof(primarydata?.bestPair)=='string'?(primarydata?.bestPair &&
    data?.map((best: any) => {
      return bestPairData?.find((b: any) => b.name == best)})): primarydata?.bestPair && primarydata?.bestPair?.map((best: any) => {
    return bestPairData?.find((b: any) => b.name == best)
  }) 

  // const matchedBestPair = bestPairData?.filter((bestPair: any) =>
  //   primarydata?.bestPair?.includes(bestPair?.name)
  // );

  const matchedDietaryId = matchedDietary?.map((m: any) => m?.id);
  const matchedCuisineId = matchedCuisine?.id;
  const matchedCategoryId = matchedCategory?.id;
  const bestPairId = matchedBestPair && matchedBestPair?.map((m: any) => m?.id);
  const kitchenStationId = matchedKitchenStation?.id;

  const payload = {
    locationId: locationid,
    type: "SUB_CATEGORY",
    parentId: matchedCategoryId && matchedCategoryId,
  };

  useEffect(() => {
    if (subCategoryData === undefined || matchedSubCategory === undefined) {
      dispatch(fetchDropDownRequest(payload));
    }
  }, [matchedCategoryId]);

  const subCategoryData = useSelector(
    (state: any) => state.productCatalog.subCategoryData.data
  );



  const matchedSubCategory = subCategoryData?.find(
    (subCategory: any) => subCategory.name === primarydata?.subCategory
  );
  console.log({matchedSubCategory});
  const matchedSubCategoryId = matchedSubCategory?.id;

  const orderTypess = useSelector(
    (state: any) =>
      state.auth?.restaurantDetails?.branch &&
      state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );
  const selectedBranch = useSelector(
    (state: any) => state.auth.selectedBranch || null
  );

  const getOrderTypeId = (value: any) => {
    const orderTypes = selectedBranch?.orderTypes?.find(
      (item: any) => item?.typeName?.toLowerCase() === value?.toLowerCase()
    );
    return orderTypes ? orderTypes?.id : null;
  };

  const modifierData = itemCustomizationData?.map((item) => ({
    modifierId: item?.modifierId || null,
    modifierName: item?.modifierName || null,
    isModifierChanged: item?.isModifierChanged || false,
    maxCount: item?.maxSelection,
    minCount: item?.minSelection,
    noFreeCustomization: item?.freeCustomization,
    orderTypeIds: (item?.selectedValue || [])?.map((value) =>
      getOrderTypeId(value)
    ),
    options:
      item?.modifierOptions
        ?.map((option: any) => ({
          ...option,
          optionName: option.modifierOptionName || option.name || "",
          cost: option.cost || option.price || 0,
          isModifierOptionChanged: option?.isModifierOptionChanged ?? false,
        }))
        ?.map(({ modifierOptionName, ...rest }) => rest) || [],
  }));

  const hasData = modifierData?.some(
    (item) =>
      item.modifierName !== null ||
      (item.orderTypeIds && item.orderTypeIds?.length > 0) ||
      (item.options &&
        item.options.some((opt) => opt.optionName !== "" || opt.cost > 0))
  );

  const dineInDetails = prizingDetail?.normalForm?.dineInDetails;
  const pickupDetails = prizingDetail?.normalForm?.pickupDetails;
  const deliveryDetails = prizingDetail?.normalForm?.deliveryDetails;
  const thirdPartyDetails = prizingDetail?.normalForm?.thirdpartyDetails;

  const ingredientsdata = useSelector(
    (state: any) => state.productCatalog?.ingredients?.data
  );
  const allergensData = useSelector(
    (state: any) => state.productCatalog?.allergens?.data
  );

  const editDetails = editData[0]?.orderTypes;
  const removePricing = [];
  const addPricing = [];
  const normalDays = prizingDetail?.normalForm?.Normaldays;

  const DineIndays = prizingDetail?.normalForm?.DineIn;
  const stringNormalDays = Array.isArray(normalDays)
    ? normalDays.map(String)
    : [];
  const stringDineInDays = Array.isArray(DineIndays)
    ? DineIndays.map(String)
    : [];
  const result = stringNormalDays.includes("0") ? ["0"] : stringNormalDays;
  const Dineinresult = stringDineInDays.includes("0") ? ["0"] : stringDineInDays;  

  const combinedDetails: Detail[] = [
    dineInDetails && {
      ...dineInDetails,
      isEnabled: dineInDetails?.Enabled===true||dineInDetails?.Enabled===1?1:0, 
      isNotHide:dineInDetails && dineInDetails?.price && parseFloat(dineInDetails?.price) > 0.00 ? 1 : 0,
      availabilityEnabled:dineInDetails && dineInDetails?.availabilityEnabled===true,
      // isNotHide: editData[0]?.orderTypes?.find((o: any) => o.typeGroup ===  'D' )?.isNotHide || null,

      inActiveUntil: dineInDetails?.inActiveUntil
        ? dineInDetails.inActiveUntil.split(".")[0]
        : null,

      availabilities: dineInDetails?.availabilities?.map(
        (availability: any) => ({
          ...availability,
          availabilityDays:
            availability.availabilityDays &&
            availability.availabilityDays.length === 0 &&
            Dineinresult.length === 0
              ? result
              : Dineinresult,
        })
      ),
    },
    pickupDetails && {
      ...pickupDetails,
      isEnabled: pickupDetails.Enabled ===true || pickupDetails.Enabled ===1?1:0, 
      isNotHide: pickupDetails && pickupDetails?.price && parseFloat(pickupDetails?.price) > 0.00 ? 1 : 0,
      availabilityEnabled:pickupDetails && pickupDetails?.availabilityEnabled===true,

      // isNotHide: editData[0]?.orderTypes?.find((o: any) => o.typeGroup ===  'P' )?.isNotHide || null,
      inActiveUntil: pickupDetails?.inActiveUntil
        ? pickupDetails.inActiveUntil.split(".")[0]
        : null,

      availabilities: pickupDetails.availabilities?.map(
        (availability: any) => ({
          ...availability,
          availabilityDays:
            availability.availabilityDays &&
            availability.availabilityDays.length === 0
              ? result
              : availability.availabilityDays,
        })
      ),
    },
    deliveryDetails && {
      ...deliveryDetails,
      isEnabled: deliveryDetails.Enabled ===true ||deliveryDetails.Enabled===1?1:0, 
      inActiveUntil: deliveryDetails?.inActiveUntil ? deliveryDetails.inActiveUntil.split(".")[0] : null,
      availabilityEnabled:deliveryDetails && deliveryDetails?.availabilityEnabled===true,


      isNotHide:
        deliveryDetails &&
        deliveryDetails?.price &&
        parseFloat(deliveryDetails?.price) > 0.0
          ? 1
          : 0,
      availabilities: deliveryDetails.availabilities?.map(
        (availability: any) => ({
          ...availability,
          availabilityDays:
            availability.availabilityDays &&
            availability.availabilityDays.length === 0
              ? result
              : availability.availabilityDays,
        })
      ),
    },

    ...(Array.isArray(thirdPartyDetails)
      ? thirdPartyDetails?.map((detail) => ({
          ...detail,
          isEnabled: detail.Enabled ===true||deliveryDetails.Enabled===1?1:0, 
          isNotHide:detail && detail?.price && parseFloat(detail?.price) > 0.00 ? 1 : 0,
          inActiveUntil: detail?.inActiveUntil ? detail.inActiveUntil.split(".")[0] : null,
          availabilityEnabled: detail?.availabilityEnabled && detail?.availabilityEnabled===true,


          availabilities: detail.availabilities?.map((availability: any) => ({
            ...availability,
            availabilityDays:
              availability.availabilityDays &&
              availability.availabilityDays.length === 0
                ? result
                : availability.availabilityDays,
          })),
        }))
      : []),
  ]
    .filter(Boolean)
    .map(({ Enabled, ...rest }) => rest);

  // const combinedDetails: Detail[] = [
  //   dineInDetails && dineInDetails,
  //   pickupDetails && pickupDetails,
  //   deliveryDetails && deliveryDetails,
  //   ...(Array.isArray(thirdPartyDetails) ? thirdPartyDetails : []),
  // ].filter(Boolean);

  const formatFirstNameUppercase = (fullName: string) => {
    if (!fullName.trim()) return ""; // Handle empty input gracefully

    const [firstName, ...rest] = fullName.split(" ");
    return [firstName.toUpperCase(), ...rest].join(" ");
  };

  const taxData =
    typeof primarydata?.tax === "string"
      ? primarydata.tax
      : Array.isArray(primarydata?.tax)
      ? (primarydata.tax as any[])?.join(", ")
      : "";
 
  let parsedDate;
  let parsedDate1;
  if(prizingDetail?.normalForm?.startDate){
    const dateStr = prizingDetail?.normalForm?.startDate 
    const [day, month, year] = dateStr?.split('-');
    parsedDate = (`${year}-${month}-${day}`);
  }

  if(prizingDetail?.normalForm?.endDate){
    const dateStr = prizingDetail?.normalForm?.endDate 
    const [day, month, year] = dateStr?.split('-');
    parsedDate1 = (`${year}-${month}-${day}`);
  }

  const menuPayload = {
    locationId: locationid,
    itemId:
      editData?.length === 0 && UploadImageImageID ? UploadImageImageID : "",
    itemName: primarydata?.itemName || null,
    itemCode: primarydata?.itemCode || null,
    dietTypes: matchedDietaryId || null,
    pairedItems: bestPairId || null,
    barCode: primarydata?.barCode || null,
    cuisine: matchedCuisineId || null,
    // mealType: primarydata?.mealType || null,
    categoryId: matchedCategoryId || null,
    subCategoryId: matchedSubCategoryId || null,
    isExclusiveItem: primarydata?.exclusiveItem,
    allergens: primarydata?.allergens || null,
    description: primarydata?.description || null,
    containsAlcohol: primarydata?.alcohol === "yes" ? true : false,
    ingredients: primarydata?.Ingredients || null,
    calorieInfo: primarydata?.coloriePoint || null,
    portionInfo: primarydata?.portionSize || null,
    taxClassAssociation: taxData || null,
    // masterItemCode: primarydata?.masterCode || null,

    kitchenStation: kitchenStationId || null,
    preparationTimeInHours: prizingDetail?.Preparationtime?.hours || null,
    preparationTimeInMinutes: prizingDetail?.Preparationtime?.minutes || null,
    ignoreMasterKotPrint: prizingDetail?.printKot || false,
    availabilityDays: result || null,
    orderTypesWithRespectToAvailability: combinedDetails || null,

    isSeasonalItem: prizingDetail?.normalForm?.isSeasonalItem,
    startDate: parsedDate,
    endDate: parsedDate1,
    availabilities: prizingDetail?.normalForm?.availabilities,
    isStandardAvailability: prizingDetail?.normalForm?.isOptionTrue ? prizingDetail?.normalForm?.isOptionTrue : false,

    ...(itemCustomizationData?.length > 0 && {
      modifiers: hasData ? modifierData : null,
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

  const categoryIdMatch = selectedCategory.id !==  matchedCategoryId||(matchedSubCategoryId ?(matchedSubCategoryId!==selectedSubCategory.id):false)
  console.log({selectedSubCategory});
  console.log({selectedCategory});
  console.log({matchedCategoryId});
  
  
  

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
    isExclusiveItem: primarydata?.exclusiveItem,
    allergens: primarydata?.allergens || null,
    description: primarydata?.description || null,
    containsAlcohol: primarydata?.alcohol === "yes" ? true : false,
    ingredients: primarydata?.Ingredients || null,
    calorieInfo: primarydata?.coloriePoint || null,
    portionInfo: primarydata?.portionSize || null,
    taxClassAssociation: taxData || null,

    kitchenStation: kitchenStationId || null,
    preparationTimeInHours: prizingDetail?.Preparationtime?.hours || null,
    preparationTimeInMinutes: prizingDetail?.Preparationtime?.minutes || null,
    ignoreMasterKotPrint: prizingDetail?.printKot || false,
    availabilityDaysToAdd: result || null,
    latestOrderTypesDTOWithRespectToAvailability: combinedDetails || null,
    isStandardAvailability: prizingDetail?.normalForm?.isOptionTrue ? prizingDetail?.normalForm?.isOptionTrue : false,

    isSeasonalItem: prizingDetail?.normalForm?.isOptionTrue ? false : prizingDetail?.normalForm?.isSeasonalItem,
    startDate: prizingDetail?.normalForm?.isOptionTrue ? null : parsedDate,
    endDate:  prizingDetail?.normalForm?.isOptionTrue ? null : parsedDate1,
    availabilities: prizingDetail?.normalForm?.availabilities,

    modifiersToAdd: hasData ? modifierData : [],

    isCategoryUpdated: categoryIdMatch,

    // isCategoryUpdated:filteredCategory.length===0?filteredCategory?.categoryName !==primarypagedetails.primarypage.data.category:filteredSubCategory.length===0?filteredSubCategory?. !==primarypagedetails.primarypage.data.category:filteredCategory?.categoryName !==primarypagedetails.primarypage.data.category,

    // isCategoryUpdated:(filteredCategory.length===0)? (filteredCategory?.categoryName !==primarypagedetails.primarypage.data.category )
    // :filteredCategory.length===0filteredCategory?.categoryName !==primarypagedetails.primarypage.data.category

    //   ,
    isSingleMenu: false,
    modifiersToRemove: combinedData?.filter(Boolean),
    availabilityDaysRemove: editData[0]?.availabilityDays,
    // latestOrderTypesDTOWithRespectToAvailability: editData[0]?.combinedDetails || null,
    specialItem: null,
  };

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

  const updateMenuItemSuccess = useSelector(
    (state: any) => state.productCatalog?.updateMenuItemSuccess
  );

  const updateMenuItemLoading = useSelector(
    (state: any) => state.productCatalog?.updateMenuItemLoading
  );

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmitItemDetails = () => {
    if (editData?.length === 0) {
      if (Wholedata?.imageUrls?.length > 0) {
        const imageuploadpayload = {
          itemId: "",
          imageUrls: primarydata?.imageUrls,
        };
        dispatch(startImageUpload(imageuploadpayload));
        if (subsectiondatamsg && UploadImageImageID !== "") {
          dispatch(addMenuItemRequest({ menuPayload, locationid }));
        }
      } else {
        dispatch(addMenuItemRequest({ menuPayload, locationid }));
      }
      setButtonClicked(true);
    } else if (editData?.length > 0) {
      // setButtonClicked(true);

      const isImageFile = (fileName: any) => {
        const imageExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = fileName.split(".").pop().toLowerCase();
        return imageExtensions.includes(fileExtension);
      };

      const imageFiles = primarydata?.imageUrls?.filter(
        (item: any, index: any) => {
          return item.file && item.file.name && isImageFile(item.file.name);
        }
      );

      if (primarydata?.imageUrls?.length > 0 && imageFiles.length > 0) {
        const imageuploadpayload = {
          itemId: editData[0]?.itemId,
          imageUrls: imageFiles,
        };

        dispatch(startImageUpload(imageuploadpayload));
        if (subsectiondatamsg && UploadImageImageID !== "") {
          dispatch(updateMenuItemRequest(editPayload));
        }
      } else {
        dispatch(updateMenuItemRequest(editPayload));
      }
      setButtonClicked(true);
    }

    // if (editData?.length === 0 && Wholedata?.imageUrls?.length > 0) {

    //   const imageuploadpayload={
    //     itemId:primarydata?.itemId,
    //     imageUrls:primarydata?.imageUrls

    //   }
    //   dispatch(startImageUpload(imageuploadpayload));
    //   setButtonClicked(true);
    //   if (subsectiondatamsg && UploadImageImageID !== '') {
    //     if (editData?.length > 0 && editData[0]) {
    //       const imageuploadpayload={
    //         itemId:primarydata?.itemId,
    //         imageUrls:primarydata?.imageUrls

    //       }
    //       dispatch(startImageUpload(imageuploadpayload));
    //       dispatch(updateMenuItemRequest(editPayload));
    //     } else {
    //       dispatch(addMenuItemRequest({ menuPayload, locationid }));
    //     }
    //   }
    // } else {
    //   if (editData?.length > 0 && editData[0]) {
    //     // dispatch(startImageUpload(primarydata?.imageUrls));
    //     const imageuploadpayload={
    //       itemId:primarydata?.itemId||"",
    //       imageUrls:primarydata?.imageUrls

    //     }
    //     dispatch(startImageUpload(imageuploadpayload));
    //     dispatch(updateMenuItemRequest(editPayload));
    //   } else {
    //     dispatch(addMenuItemRequest({ menuPayload, locationid }));
    //   }
    //   // dispatch(addMenuItemRequest({ menuPayload, locationid }));
    //   setButtonClicked(true);
    // }
  };

  useEffect(() => {
    if (subsectiondatamsg && buttonClicked && UploadImageImageID !== "") {
      editData?.length > 0 && editData[0]
        ? dispatch(updateMenuItemRequest(editPayload))
        : dispatch(addMenuItemRequest({ menuPayload, locationid }));
    }
  }, [subsectiondatamsg, UploadImageImageID]);

  useEffect(() => {
    if (buttonClicked && (updateMenuItemSuccess || addMenuSuccess)) {
      dispatch(removeDataRequest());
      // dispatch(removeDataRequest(prizingDetail))
      // dispatch(removeDataRequest(itemCustomizationData))
      history.push("/productCatalog/menuListing");
    }
  }, [addMenuSuccess, updateMenuItemSuccess]);

  const handleAddImage = (index: number) => {
    document.getElementById(`imgadd-${index}`)?.click();
  };

  // const imagecheck = (imagevalue: ImageFile) => {
  //   const result = subsectiondata.some(
  //     (image: imageType) => image?.file?.name === imagevalue?.file?.name
  //   );

  //   const matchingIndex = subsectiondata.findIndex(
  //     (subsectionFile: imageType) =>
  //       selectedImages.some(
  //         (selectedImage) =>
  //           subsectionFile.file.name === selectedImage.file.name
  //       )
  //   );
  //   return result;
  // };

  const imagecheck = (imagevalue: any) => {
    const result = subsectiondata.some(
      (image: any) =>
        image?.file?.name === imagevalue?.file?.name ||
        image?.url === imagevalue?.url
    );

    const matchingIndex = subsectiondata.findIndex((subsectionFile: any) =>
      selectedImages.some((selectedImage) =>
        subsectionFile.file
          ? subsectionFile.file.name === selectedImage.file?.name
          : subsectionFile.url === selectedImage.url
      )
    );

    return result;
  };

  return (
    <div className={isExpanded ? "reviewContaineExpanded" : "reviewContainer"}>
      <SidePanel />
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="reviewpage-whole-container"
      >
        <div
          className={isExpanded ? "reviewheading-Expanded" : "reviewheading"}
        >
          <p>
            Review menu item -{" "}
            {primarypagedetails.primarypage.data?.itemName || "N/A"}
          </p>
        </div>
        <div className="reviewpage">
          <div className="reviewpagebody">
            <div className="primaryreview">
              <div
                style={{
                  display: "flex",
                  borderBottom: "1px solid #c4c4c4",
                  width: isExpanded ? "78vw" : "83vw",
                }}
              >
                <div className="primaryreviewdetailspart1">
                  <div className="primaryreviewheading">
                    <div
                      className={
                        isExpanded
                          ? "primary-and-edit-heading-extended"
                          : "primary-and-edit-heading"
                      }
                    >
                      <p>Step 1: Primary Details</p>
                      <Link
                        to="/productCatalog/PrimaryDetails"
                        className="primarypageedit"
                        onClick={() =>
                          setActiveCategory("Step 1: Primary Details")
                        }
                      >
                        <img
                          src={edit}
                          alt=""
                          className="step3-Review-Container-heading-EditImage-primary"
                          width={15}
                          height={15}
                        />

                        <span className="edit-primary-data">Edit</span>
                      </Link>
                    </div>
                  </div>
                  <div className="primaryreviews">
                    <div className="primaryreviewdetails">
                      <div className="primaryreviewdetails1">
                        <div>
                          <ReviewValues
                            label="Item Name"
                            textvalue={
                              primarydata.itemName
                                ? primarydata?.itemName
                                : "N/A"
                            }
                          />
                        </div>

                        <div>
                          <ReviewValues
                            label="Dietary type"
                            textvalue={
                              primarydata?.DietaryType &&
                              typeof primarydata?.DietaryType[0] === "string" &&
                              primarydata?.DietaryType?.length > 0
                                ? Array.isArray(primarydata?.DietaryType)
                                  ? primarydata?.DietaryType?.map(
                                      (type: any) => type
                                    ).join(", ")
                                  : primarydata?.DietaryType
                                : Array.isArray(primarydata?.DietaryType) &&
                                  primarydata?.DietaryType?.length > 0
                                ? primarydata?.DietaryType.map(
                                    (type: any) => type?.name
                                  ).join(", ")
                                : "N/A"
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
                              primarydata.category
                                ? primarydata.category
                                : "N/A"
                            }
                          />
                        </div>

                        <div>
                          <ReviewValues
                            label="Calorie Point"
                            textvalue={
                              primarydata?.coloriePoint?.value
                                ? `${primarydata.coloriePoint?.value} ${primarydata.coloriePoint?.type}`
                                : "N/A"
                            }
                          />
                        </div>

                        <div>
                          <ReviewValues
                            label="Portion Size"
                            textvalue={
                              primarydata.portionSize?.value
                                ? primarydata.portionSize?.value
                                : "N/A"
                            }
                          />
                        </div>
                      </div>

                      <div className="primaryreviewdetails2">
                        <div>
                          <ReviewValues
                            label="Item code"
                            textvalue={
                              primarydata.itemCode
                                ? primarydata.itemCode
                                : "N/A"
                            }
                          />
                        </div>

                        {/* <div>
                        <ReviewValues
                          label="Other dietary details"
                          textvalue={"N/A"}
                        />
                      </div> */}

                        <div>
                          <ReviewValues
                            label="Cuisine"
                            textvalue={
                              fetchedprimarydata.cuisine
                                ? fetchedprimarydata.cuisine
                                : "N/A"
                            }
                          />
                        </div>

                        <div>
                          <ReviewValues
                            label="Sub-category"
                            textvalue={
                              fetchedprimarydata.subCategory
                                ? fetchedprimarydata.subCategory
                                : "N/A"
                            }
                          />
                        </div>

                        <div>
                          <ReviewValues
                            label="Unit of measurement"
                            textvalue={
                              fetchedprimarydata.portionSize?.type
                                ? fetchedprimarydata.portionSize?.type
                                : "N/A"
                            }
                          />
                        </div>
                        {/* <div>
                          <ReviewValues
                            label="Tax Class Association"
                            textvalue={
                              primarydata.tax ? primarydata.tax : "N/A"
                            }
                          />
                        </div> */}

                        {/* <div>
                        <ReviewValues
                          label="Master product code"
                          textvalue={
                            fetchedprimarydata.masterCode
                              ? fetchedprimarydata.masterCode
                              : "N/A"
                          }
                        />
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="primaryreviewdetailspart2">
                  {/* <div className="EditData">
                    <Link
                      to="/productCatalog/PrimaryDetails"
                      className="primarypageedit"
                      onClick={() =>
                        setActiveCategory("Step 1: Primary Details")
                      }
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
                  </div> */}
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
                            {selectedImages && selectedImages?.length > 0 && (
                              <li>
                                <div style={{ fontSize: "30px" }}>
                                  {imagecheck(selectedImages[0]) ? (
                                    <div className="imagewitherror">
                                      <img
                                        src={emptyfoodimg}
                                        alt={``}
                                        className="eerroremptyimage"
                                        style={{ cursor: "context-menu" }}
                                      />
                                      <input
                                        type="file"
                                        name="imageUrls"
                                        className="imgfile"
                                        id={`imgadd-${0}`}
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => handleRetry(e, 0)}
                                        style={{
                                          display: "none",
                                          cursor: "context-menu",
                                        }}
                                      />
                                      <span
                                        className="errromsg"
                                        onClick={() => handleAddImage(0)}
                                      >
                                        Retry
                                      </span>
                                    </div>
                                  ) : (
                                    <img
                                      className="uploaded-image"
                                      style={{ cursor: "context-menu" }}
                                      src={
                                        selectedImages[0]?.url?.file
                                          ? selectedImages[0].url.preview
                                          : selectedImages[0].url ||
                                            emptyfoodimg
                                      }
                                      alt={`Preview of `}
                                    />
                                  )}
                                </div>
                              </li>
                            )}

                            {selectedImages?.length === 0 && (
                              <li className="empty-image">
                                <img
                                  src={emptyfoodimg}
                                  style={{ cursor: "context-menu" }}
                                  alt={`No images available`}
                                />
                              </li>
                            )}

                            <div className="selectediagelist">
                              {selectedImages &&
                                selectedImages.slice(1).map((image, index) => (
                                  <li key={index + 1}>
                                    {imagecheck(selectedImages[index + 1]) ? (
                                      <div
                                        className="imagewitherror"
                                        style={{ cursor: "context-menu" }}
                                      >
                                        <img
                                          src={emptyfoodimg}
                                          alt={``}
                                          style={{ cursor: "context-menu" }}
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
                                          style={{
                                            display: "none",
                                            cursor: "context-menu",
                                          }}
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
                                        className="uploaded-image-img"
                                        style={{ cursor: "context-menu" }}
                                        src={
                                          image.url?.file
                                            ? image.url.preview
                                            : image.url || emptyfoodimg
                                        }
                                        alt={`Preview of image ${index + 1}`}
                                      />
                                    )}
                                  </li>
                                ))}
                              {Array.from({ length: emptySlots })
                                .slice(0)
                                .map((_, index) => (
                                  <li key={selectedImages?.length + index + 1}>
                                    {typeof emptyfoodimg === "string" ? (
                                      <img
                                        style={{ cursor: "context-menu" }}
                                        src={emptyfoodimg}
                                        alt={`empty ${index}`}
                                      />
                                    ) : (
                                      <span>
                                        Error: emptyfoodimg is not a valid image
                                        path
                                      </span>
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

                  <div className="primarydescription">
                    <p>Description</p>
                    <div className="description">
                      <p>
                        {fetchedprimarydata?.description
                          ? fetchedprimarydata?.description
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  {
                    <div className="primarybestpairedfood">
                      <p>Best paired with food items</p>
                      <div className="bestpairfoods">
                        <p>
                          {primarydata?.bestPair &&
                          typeof primarydata?.bestPair[0] === "string" &&
                          primarydata?.bestPair?.length > 0
                            ? Array.isArray(primarydata?.bestPair)
                              ? primarydata?.bestPair
                                  ?.map((type: any) => type)
                                  .join(", ")
                              : primarydata?.bestPair
                            : Array.isArray(primarydata?.bestPair) &&
                              primarydata?.bestPair?.length > 0
                            ? primarydata?.bestPair
                                .map((type: any) => type?.name)
                                .join(", ")
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  }

                  <div className="allergensandingredients">
                    <div className="ingredients-review">
                      <p className="ingredients">Ingredients</p>
                      {primarydata?.Ingredients?.length > 0 ? (
                        <>
                          {" "}
                          <ImagePillsSelected
                            imageselected={primarydata}
                            name="Ingredients"
                          />
                        </>
                      ) : (
                        "N/A"
                      )}
                    </div>

                    <div className="allergens-review">
                      <p className="allergen">Allergens</p>{" "}
                      {primarydata?.allergens?.length > 0 ? (
                        <>
                          {" "}
                          <ImagePillsSelected
                            imageselected={primarydata}
                            name="allergens"
                          />
                        </>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="part-two">
                <Step2 />

                <span
                  className={isExpanded ? "verticalLineExpand" : "verticalLine"}
                  style={{
                    height: thirdPartyDetails?.length > 0 ? "55rem" : "50rem",
                  }}
                />

                <Step3Review />
              </div>
            </div>
          </div>
        </div>{" "}
        <div
          className={isExpanded ? "saveandnextreview" : "saveandnextreview1"}
        >
          <div
            className={
              isExpanded
                ? "save-and-next-button-extended"
                : "save-and-next-button"
            }
          >
                 <button
              className={`${isExpanded ? "clearall1" : "clearall"}`}
              onClick={() => history.push("/productCatalog/menuListing")}
            >
            Cancel
          </button>
          <button
            className="saveall"
            onClick={handleSubmitItemDetails}
            disabled={(editData?.length===0 &&addMenuLoading) || (editData?.length>0 &&updateMenuItemLoading)}
          >
            {(editData?.length===0 &&addMenuLoading) || (editData?.length>0 &&updateMenuItemLoading) ? (
              <div className="reviewLoaders"></div>
            ) : (
              "Publish"
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryDetailsReviewpage;
