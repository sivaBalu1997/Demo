import React, { useState, useEffect, useContext, useRef } from "react";
import LableComponent from "../../../components/productCatalog/LableComponent/LableComponent";
import InputFieldComponent from "../../../components/productCatalog/InputFieldComponent/InputFieldComponent";
import Dropdown from "../../../components/productCatalog/DropDownList/DropDownList";
import DigitInput from "../../../components/productCatalog/DigitInput/DigitInput";
import RadioButtonGroup from "../../../components/productCatalog/RadioButton/RadioButton";
import { ImCross } from "react-icons/im";
import info from "../../../assets/svg/info.svg";
import ImgaeUploading from "../../../assets/images/addimage.png";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Imagepillsselection from "../../../components/productCatalog/ImagePillsSelection/ImagePillsSelection";
import SaveAndNext from "../../../components/productCatalog/Savenextbutton/SaveAndNext";
import {
  imageslist,
  dietarytype,
  cuisine,
  mealType,
  subcategory,
  alcoholradio,
  calorieponitradio,
  portionsizeradio,
} from "../../../assets/mockData/Moca_data";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import {
  addDropDowRequest,
  bestPairDataRequest,
  catogoryDataRequest,
  cuisineDataRequest,
  dietdatarequest,
  fetchDropDownRequest,
  getIngredientsRequest,
  getItemCodeRequest,
  getMenuCategoryRequest,
  getPopularItemRequest,
  PrimaryDataClear,
  removeCodeRequest,
  removeDataRequest,
  subCategoryDataRequest,
} from "redux/productCatalog/productCatalogActions";
import SidePanel from "pages/SidePanel";
import { Contextpagejs } from "../contextpage";
import { RootState } from "redux/rootReducer";

import { stat } from "fs";
import TooltipMsg from "components/productCatalog/Tooltip/TooltipMsg";
import { useLocation } from "react-router-dom";
import "./PrimaryPage.scss";
import { showErrorToast } from "util/toastUtils";

interface Ingredients {
  id: string;
  name: string;
}
interface Allergens {
  id: string;
  name: string;
}

interface FormData {
  itemName: string;
  DietaryType: string;
  cuisine: string;
  mealType: string;
  bestPair: string;
  description: string;
  imageUrls: ImageFile[];
  alcohol: string;
  itemCode: string;
  barCode: string;
  category: string;
  categoryId: string;
  subCategory: string;
  Ingredients: Ingredients[];
  allergens: Allergens[];
  coloriePoint: string;
  selectedcolorie: string;
  portionSize: string;
  selectedPortion: string;
  tax: string;
  masterCode: string;
  popularItem: boolean;
}
interface Category {
  id: string;
  name: string;
}
interface Base64Image {
  mimeType: string;
  base64String: string;
}
interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}

interface StateDataTag {
  productCatalog: {
    ingredients: [];
  };
}
interface StateDataTag2 {
  productCatalog: {
    categoryData: [];
  };
}
export interface StateDataTag3 {
  productCatalog: {
    dietaryData: [];
    cuisineData: [];
    categoryData: [];
    subCategoryData: [];
    bestPairData: [];
  };
}
interface ListingData {
  addMockDataReducer: {
    data: Item[];
  };
  storeMockDataReducer: {
    data: Item[];
  };
}

interface primarypage {
  primarypage: {
    data: FormData;
  };
}

interface option {
  name: string[];
}
interface ImageOptions {
  name: string;
  id: string;
  imageId?: string;
  imageType?: string;
}

interface ImageFile {
  file: File;
  uploaded: boolean;
  failed: boolean;
  preview: string;
}
interface LocationState {
  id: number;
}
interface PricingDetails {
  Dinein1: string[];
  Pickup1: string[];
  Delivery1: string[];
  Dinein2: string[];
  Pickup2: string[];
  Delivery2: string[];
  Inventory1: string[];
  Customize1: string[];
}

interface CalorieInfo {
  type: string;
  value: string;
}

interface PortionInfo {
  type: string;
  value: string;
}

interface Item {
  id: number;
  itemName: string;
  itemCode: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: PricingDetails;
}

const PrimaryPage = () => {
  const dispatch = useDispatch();
  const dietRef = useRef<(() => void) | null>(null);
  const resetSelectionRef = useRef<(() => void) | null>(null);
  const cuisineRef = useRef<(() => void) | null>(null);
  const categoryref = useRef<(() => void) | null>(null);
  const BestpairedRef = useRef<(() => void) | null>(null);
  const descriptionRef = useRef<(() => void) | null>(null);
  const allergensRef = useRef<(() => void) | null>(null);
  const ingredientsRef = useRef<(() => void) | null>(null);
  const imageClearRef = useRef<(() => void) | null>(null);
  const digitClearRef = useRef<(() => void) | null>(null);
  const subCatagoryRef = useRef<(() => void) | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      itemName: "",
      DietaryType: "",
      cuisine: "",
      mealType: "",
      bestPair: "",
      description: "",
      imageUrls: [],
      alcohol: "no",
      itemCode: "",
      barCode: "",
      category: "",
      categoryId: "",
      subCategory: "",
      Ingredients: [],
      allergens: [],
      coloriePoint: "",
      selectedcolorie: "per100grams",
      portionSize: "",
      selectedPortion: "Portion(count)",
      tax: "",
      masterCode: "",
    },
  });

  const [popularItem, setPopularItem] = useState<any>(0);
  const [popularItemlimit, setPopularItemLimit] = useState<any>("");

  const [calorieInfo, setCalorieInfo] = useState<any>({
    type: "per 100 grams",
    value: "",
  });

  const [portionInfo, setPortionInfo] = useState<any>({
    type: "portion(count)",
    value: "",
  });

  const location = useLocation<LocationState | undefined>();
  const locationid = useSelector(
    (state: State) => state.auth.credentials?.locationId
  );
  const addedData = useSelector(
    (state: ListingData) => state.addMockDataReducer.data
  );
  const popularItemLimit = useSelector(
    (state: any) => state.auth?.restaurantDetails?.popularItemCount
  );

  const Mockdata = useSelector(
    (state: ListingData) => state.storeMockDataReducer.data
  );
  const PopularItemFormApi = useSelector(
    (state: any) =>
      state?.getPopularItemReducer?.popularItems?.data?.popularItemCount
  );

  const mergedMockData = [...Mockdata, ...addedData];
  const [SelectedFooditemtoedit, setSelectedFooditemtoedit] =
    useState<Item[]>();

  useEffect(() => {
    setPopularItem(PopularItemFormApi ? PopularItemFormApi : 0);
    setPopularItemLimit(popularItemLimit);
  }, [PopularItemFormApi]);

  useEffect(() => {
    dispatch(getPopularItemRequest(locationid));
    dispatch(removeCodeRequest());
  }, []);

  // useEffect(() => {
  //   const SelectedFooditemtoedit = mergedMockData.filter(
  //     (item) => item.id === location.state?.id
  //   );

  //   if (SelectedFooditemtoedit && SelectedFooditemtoedit[0]) {
  //     const selectedItem = SelectedFooditemtoedit[0];

  //     setValue("itemName", selectedItem?.itemName);
  //     setValue("dietaryType", selectedItem?.dietary);
  //     setValue("cuisine", selectedItem?.cusine);
  //     setValue("mealType", selectedItem?.mealType);
  //     setValue("itemCode", selectedItem?.itemCode);
  //   }
  // }, [mergedMockData, location.state?.id, setValue]);

  const requestCompleted = useSelector(
    (state: RootState) => state.productCatalog.requestCompleted
  );

  const ItemsPrimaryDetails = useSelector(
    (state: primarypage) => state.primarypage?.data
  );

  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    if (ItemsPrimaryDetails) {
      setValue("itemName", ItemsPrimaryDetails.itemName);
      setValue("description", ItemsPrimaryDetails.description);
      if (ItemsPrimaryDetails?.description) {
        setCharCount(ItemsPrimaryDetails?.description.length);
      }
      setDescription(ItemsPrimaryDetails.description);
      // Set other fields
      setValue("alcohol", ItemsPrimaryDetails.alcohol);
      setValue("itemCode", ItemsPrimaryDetails.itemCode);
      setValue("barCode", ItemsPrimaryDetails.barCode);
      setValue("Ingredients", ItemsPrimaryDetails.Ingredients);
      setValue("allergens", ItemsPrimaryDetails.allergens);
      setValue("coloriePoint", ItemsPrimaryDetails.coloriePoint);
      setCalorieInfo(
        ItemsPrimaryDetails?.coloriePoint
          ? ItemsPrimaryDetails?.coloriePoint
          : { type: "per 100 grams", value: "" }
      );
      setPortionInfo(
        ItemsPrimaryDetails?.portionSize
          ? ItemsPrimaryDetails?.portionSize
          : { type: "portion(count)", value: "" }
      );
      setValue("selectedcolorie", ItemsPrimaryDetails.selectedcolorie);
      setValue("portionSize", ItemsPrimaryDetails.portionSize);
      setValue("selectedPortion", ItemsPrimaryDetails.selectedPortion);
      setValue("tax", ItemsPrimaryDetails.tax);
      setValue("masterCode", ItemsPrimaryDetails.masterCode);
    }
  }, [ItemsPrimaryDetails, setValue]);

  const baseImageUrl = "https://storage.googleapis.com/mhd-media/img/testing/";

  useEffect(() => {
    if (ItemsPrimaryDetails?.imageUrls) {
      const imageArray = ItemsPrimaryDetails.imageUrls.map((img: any) => ({
        file: img?.imageId ? { name: img.imageId } : img?.file || {},
        uploaded: img?.uploaded || false,
        failed: img?.failed || false,
        preview: img?.imageId ? `${baseImageUrl}${img.imageId}` : img?.preview,
      }));

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...imageArray];
        setValue("imageUrls", updatedImages);

        return updatedImages;
      });
    }
  }, [ItemsPrimaryDetails, setValue]);

  useEffect(() => {
    setValue("coloriePoint", calorieInfo);
  }, [calorieInfo]);

  useEffect(() => {
    setValue("portionSize", portionInfo);
  }, [portionInfo]);

  const ingredients = useSelector(
    (state: StateDataTag) => state.productCatalog.ingredients
  );

  const categoriesdata = useSelector(
    (state: StateDataTag2) => state.productCatalog.categoryData
  );
  const { isExpanded } = useContext(Contextpagejs);
  const [dataImages, setDataImages] = useState(imageslist);
  const [dataDietaryType, setDataDietaryType] = useState([]);
  const [taxType, setTaxType] = useState([])
  const [dataCuisine, setDataCuisine] = useState(cuisine);
  const [dataMealType, setDataMealType] = useState(mealType);
  const [dataBestPair, setDataBestPair] = useState();
  const [dataSubcategory, setDataSubcategory] = useState(subcategory);
  const [ingredientsFromAPi, setIngredientsFromAPi] = useState<ImageOptions[]>(
    []
  );

  const dataFromRedux = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxDescriptonLength = 100;
  const maxImages = 7;
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    DietaryType: false,
    cuisine: false,
    mealType: false,
    bestPair: false,
    category: false,
    subCategory: false,
  });

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const length = value.length;
    if (length <= maxDescriptonLength) {
      setDescription(value);
      setCharCount(length);
      setValue(name, value);
    }
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      return {
        DietaryType: false,
        cuisine: false,
        mealType: false,
        bestPair: false,
        category: false,
        subCategory: false,
        [dropdownName]: !prevState[dropdownName],
      };
    });
  };

  const validImages = imageslist.filter(
    (img): img is { name: string; id: string } => img !== undefined
  );

  const handleRadioChange = (radioname: keyof FormData, value: string) => {
    setValue(radioname, value);
  };

  const handleCalorieRadioChange = (
    name: keyof typeof calorieInfo,
    value: string | boolean
  ) => {
    setCalorieInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCalorieInfo((prevState: any) => ({
      ...prevState,
      value: e.target.value,
    }));
  };

  const handlePortionChange = (name: keyof PortionInfo, value: string) => {
    setPortionInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [isImageDeleted, setIsImageDeleted] = useState(false);

  const handleImageDeletion = (index: number) => {
    setImages((prevImages) => {
      const deletedImage = images.filter((_, i) => i !== index);
      const updatedImages = deletedImage;

      const updatedImageUrls = updatedImages.map((image) => image);
      setIsImageDeleted(true);
      setValue("imageUrls", updatedImageUrls);
      return updatedImages;
    });
  };
  const [restrictToAdd, setRestrictToAdd] = useState(true);

  const selectedradiowatch = watch();
  const alcoholValue = selectedradiowatch.alcohol || "no";
  const portionsizeradiovalue =
    selectedradiowatch.portionSize || "Portion(count)";

  const handleAddImage = () => {
    document.getElementById("imgadd")?.click();
  };
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validImageTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 2 * 1024 * 1024;
      const fileArray = Array.from(files)
        .map((file) => {
          if (!validImageTypes.includes(file.type)) {
            showErrorToast(
              `Invalid file type: ${file.name}. Only PNG and JPG are allowed.`
            );
            return null;
          }
          if (file.size > maxSizeInBytes) {
            showErrorToast(
              "Image upload failed: File size exceeds 2 MB. Please upload a smaller file."
            );
            return null;
          }
          return {
            file,
            uploaded: false,
            failed: false,
            preview: URL.createObjectURL(file),
          };
        })
        .filter((file): file is ImageFile => file !== null);
      if (images.length === 5) {
        setRestrictToAdd(false);
      }
      if (fileArray.length + images.length > 6) {
        showErrorToast("You can upload up to 6 images.");
        // setRestrictToAdd(false);
        return;
      } else {
        setRestrictToAdd(true);
      }
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...fileArray];
        const updatedImageUrls = updatedImages.map((image) => image);
        setValue("imageUrls", updatedImageUrls);
        return updatedImages;
      });
      e.target.value = "";
    }
  };

  useEffect(() => {
    setIngredientsFromAPi(ingredients);
    setCategories(categoriesdata);
  }, [requestCompleted]);

  useEffect(() => {
    register("imageUrls");
  }, [register]);

  const dietaryData = useSelector(
    (state: any) => state.productCatalog.dietaryData.data
  );

  const taxData = [
    {
      id: '1',
      name: '10',
      locationId: "",
      type: "tax",
      parentId: "",
      canDelete: true,
    },
  ];

  const editData = useSelector((state: any) => state.productCatalog.editData);

  const cuisineData = useSelector(
    (state: any) => state.productCatalog.cuisineData.data
  );

  const subCategoryData = useSelector(
    (state: any) => state.productCatalog.subCategoryData.data
  );
  const message = useSelector(
    (state: any) => state?.getItemCodeReducer?.itemCode?.data?.message
  );
  const messageLoader = useSelector(
    (state: any) => state?.getItemCodeReducer?.loading
  );

  const categoryData = useSelector(
    (state: any) => state.productCatalog.categoryData.data
  );

  const bestPairData = useSelector(
    (state: any) => state.productCatalog.bestPairData.data
  );
  const ingredientsdata = useSelector(
    (state: any) => state.productCatalog?.ingredients?.data
  );

  const allergensData = useSelector(
    (state: any) => state.productCatalog?.allergens?.data
  );

  // const [parentId, setParentId] = useState("");

  // useEffect(() => {
  const [parentId, setParentId] = useState("");

  const dietPayload = {
    locationId: locationid,
    type: 'DIET',
    parentId: "",
  }

  const cuisinePayload = {
    locationId: locationid,
    type: 'CUISINES',
    parentId: "",
  }


  const categoryPayload = {
    locationId: locationid,
    type: 'CATEGORY',
    parentId: "",
  }


  const bestPairPayload = {
    locationId: locationid,
    type: 'BEST_PAIRED_ITEMS',
    parentId: "",
  }

  const kitchenpayload = {
    locationId: locationid,
    type: 'KITCHEN_STATION',
    parentId: "",
  }

  useEffect(() => {
    if(editData){
      dispatch(fetchDropDownRequest(dietPayload))
      dispatch(fetchDropDownRequest(cuisinePayload))
      dispatch(fetchDropDownRequest(categoryPayload))
      dispatch(fetchDropDownRequest(bestPairPayload))
      dispatch(fetchDropDownRequest(kitchenpayload))
    }
  },[])

  const [itemcodeValid, setItemcodeValid] = useState(true);

  // useEffect(() => {
  //   if (ItemsPrimaryDetails?.popularItem) {
  //     setPopularItem(PopularItemFormApi ?? 0);
  //     setValue("popularItem", true);
  //   } else {
  //     setPopularItem((prevCount: any) => Math.max(prevCount - 1, 0));
  //     setValue("popularItem", false);
  //   }
  // }, [ItemsPrimaryDetails]);

  // console.log({popularItem},{PopularItemFormApi})

  useEffect(() => {
    if (message?.httpStatus == 409 || messageLoader) {
      setItemcodeValid(false);
    } else {
      setItemcodeValid(true);
    }
  }, [message, messageLoader]);

  const [isChecked, setIsChecked] = useState<boolean>(ItemsPrimaryDetails?.popularItem || false);

  useEffect(() => {
    setIsChecked(ItemsPrimaryDetails?.popularItem || false);
  }, [ItemsPrimaryDetails?.popularItem]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCheckedValue = e.target.checked;
  
    setIsChecked(isCheckedValue); 
  
    if (isCheckedValue) {
      setPopularItem((prevCount: number) => prevCount + 1);
      setValue("popularItem", true);
    } else {
      setPopularItem((prevCount: number) => Math.max(prevCount - 1, 0));
      setValue("popularItem", false);
    }
  };

  const handleReset = () => {
    setValue("itemName", "");
    setValue("DietaryType", "");
    setValue("cuisine", "");
    setValue("mealType", "");
    setValue("bestPair", "");
    setValue("description", "");
    setValue("imageUrls", []);
    setValue("alcohol", "no");
    setValue("itemCode", "");
    setValue("barCode", "");
    setValue("category", "");
    setValue("categoryId", "");
    setValue("subCategory", "");
    setValue("Ingredients", []);
    setValue("allergens", []);
    setValue("coloriePoint", "");
    setValue("selectedcolorie", "per100grams");
    setValue("portionSize", "");
    setValue("selectedPortion", "Portion(count)");
    setValue("tax", "");
    setValue("masterCode", "");
    setCalorieInfo(
      ItemsPrimaryDetails?.coloriePoint
        ? ItemsPrimaryDetails?.coloriePoint
        : { type: "per 100 grams", value: "" }
    );
    setPortionInfo(
      ItemsPrimaryDetails?.portionSize
        ? ItemsPrimaryDetails?.portionSize
        : { type: "portion(count)", value: "" }
    );

    if (resetSelectionRef.current) {
      resetSelectionRef.current();
    }
    if(dietRef.current){
      dietRef.current()
    }
    if (BestpairedRef.current) {
      BestpairedRef.current();
    }
    if (cuisineRef.current) {
      cuisineRef.current();
    }
    if (categoryref.current) {
      categoryref.current();
    }
    if (descriptionRef.current) {
      descriptionRef.current();
    }
    if (allergensRef.current) {
      allergensRef.current();
    }
    if (ingredientsRef.current) {
      ingredientsRef.current();
    }
    if (imageClearRef.current) {
      imageClearRef.current();
    }
    if (digitClearRef.current) {
      digitClearRef.current();
    }
    if (subCatagoryRef.current) {
      subCatagoryRef.current();
    }

    setDescription(" ");
    setCharCount(0);
    setImages([]);
    dispatch(PrimaryDataClear());
  };

  const dataforadd = {
    name: "rotti",
    locationId: locationid,
    type: "DIET",
    parentId: "",
  };

  const restaurantDetails = useSelector(
    (state: any) => state.auth.restaurantDetails
  );

  const alcoholconstain = restaurantDetails?.containsAlcohol;

  // const alcoholconstain = false;
  useEffect(() => {
    dispatch(
      fetchDropDownRequest({
        locationId: locationid,
        type: "INGREDIENTS",
        parentId: "",
      })
    );
    dispatch(
      fetchDropDownRequest({
        locationId: locationid,
        type: "ALLERGENS",
        parentId: "",
      })
    );
  }, []);

  const [subcategortError, setsubcategortError] = useState("");

  const [categoryChange, setCategoryChange] = useState(false)

  const valiadtesubCategory = () => {
    const categoryList = getValues("category");
    const subcategoryList = getValues("subCategory");

    if (
      categoryList !== "" &&
      subcategoryList === "" &&
     ( subCategoryData?.length > 0 || subCategoryData === undefined)
    ) {
      setsubcategortError("subcategory is required");

      return false;
    } else {
      setsubcategortError("");
    }
    return true;
  };

  return (
    <div style={{ display: "flex" }}>
      <SidePanel />
      <div
        className={
          isExpanded ? "Main-Primary-Page-Expanded" : "Main-Primary-Page"
        }
      >
        <div>
          {/* <SidePanel /> */}
          <div style={{ marginBottom: "40px" }}>
            <Navigationpage
              getFormData={getValues}
              seletedpage="Primary"
              reset={handleReset}
              triggerValidation={() => trigger()}
              itemcodeValid={itemcodeValid}
              valiadtesubCategory={valiadtesubCategory}
            />
          </div>
          <div className="Primary-page">
            {/* <form> */}
            <div className="Primary-page-container-one">
              <div className="Primary-page-container-pairone">
                <div className="Primary-page-InputFields">
                  {" "}
                  <LableComponent lable="ItemName *" />
                  <Controller
                    name="itemName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Item Name is required" }}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputFieldComponent
                        name="itemName"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                        error={errors.itemName}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields">
                  <LableComponent lable="Dietary Type *" />
                  <Controller
                    name="DietaryType"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
                        placeholder="search for option"
                        register={register}
                        name="DietaryType"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "DietaryType is required" }}
                        error={errors.DietaryType}
                        dropdownopen={DropdownOpen.DietaryType}
                        onToggle={() => handleDropdownToggle("DietaryType")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                        resetSelection={dietRef}
                        parentId={parentId}
                        setParentId={setParentId}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields">
                  <LableComponent lable="Cuisine *" />
                  <Controller
                    name="cuisine"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={cuisineData}
                        type="radio"
                        setOptions={setDataCuisine}
                        placeholder="search for option"
                        register={register}
                        trigger={trigger}
                        setValue={setValue}
                        name="cuisine"
                        validation={{ required: "Cuisine is required" }}
                        error={errors.cuisine}
                        {...field}
                        getValues={getValues}
                        dropdownopen={DropdownOpen.cuisine}
                        onToggle={() => handleDropdownToggle("cuisine")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="CUISINES"
                        resetSelection={cuisineRef}
                        parentId={parentId}
                        setParentId={setParentId}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields">
                  <LableComponent lable="Category*" />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={categoryData}
                        setOptions={setDataSubcategory}
                        placeholder="search for option"
                        type="radio"
                        name="category"
                        id="categoryId"
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                        getValues={getValues}
                        validation={{ required: "Category is required" }}
                        error={errors.category}
                        dropdownopen={DropdownOpen.category}
                        setDropdownOpen={setDropdownOpen}
                        onToggle={() => handleDropdownToggle("category")}
                        addNew={true}
                        editValues={true}
                        dropDownType="CATEGORY"
                        resetSelection={categoryref}
                        parentId={parentId}
                        setParentId={setParentId}
                        categoryChange = {categoryChange}
                        setCategoryChange = {setCategoryChange}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields">
                  <LableComponent lable="Best paired with food items *" />
                  <div className="Primary-Page-inputfiled-and-tooltip">
                    <Controller
                      name="bestPair"
                      control={control}
                      render={({ field }: any) => (
                        <Dropdown
                          options={bestPairData}
                          setOptions={setDataBestPair}
                          placeholder="search for option"
                          type="checkbox"
                          name="bestPair"
                          register={register}
                          trigger={trigger}
                          setValue={setValue}
                          getValues={getValues}
                          error={errors.bestPair}
                          bestpair={true}
                          validation={{ required: "Best Pair is required" }}
                          dropdownopen={DropdownOpen.bestPair}
                          onToggle={() => handleDropdownToggle("bestPair")}
                          setDropdownOpen={setDropdownOpen}
                          addNew={false}
                          editValues={false}
                          dropDownType="BEST_PAIRED_ITEMS"
                          resetSelection={BestpairedRef}
                          parentId={parentId}
                          setParentId={setParentId}
                        />
                      )}
                    />
                    <div className="tool-tip-best-pair">
                      <TooltipMsg
                        message="Select up to 5 food items that pair best with this dish."
                        styles={{
                          marginTop: "1.3rem",
                          marginLeft: "-1rem",
                          backgroundColor: "#67833E",
                          width: "350px",
                          height: "35px",
                          color: "white",
                          textAlign: "center",
                          borderRadius: "5px",
                          zIndex: "1",
                        }}
                        Arrowstyle={{
                          position: "relative",
                          top: "-1rem",
                          marginLeft: "-2rem",
                        }}
                      >
                        <div className="ToolKitchen">
                          <img
                            src={info}
                            alt="info icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </TooltipMsg>
                    </div>
                  </div>
                </div>

                <div className="Primary-Page-description-field">
                  <LableComponent lable="Description" />
                  <div>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }: any) => (
                        <>
                          <textarea
                            className="description"
                            name="description"
                            autoComplete="off"
                            value={description}
                            onChange={(e) => handleDescriptionInputChange(e)}
                            maxLength={maxDescriptonLength}
                          />
                          <p
                            style={{
                              color:
                                charCount === maxDescriptonLength
                                  ? "red"
                                  : "#979797",
                            }}
                            className="Primary-page-description-charcount"
                          >
                            {`${charCount}/${maxDescriptonLength}`}{" "}
                            {/* Display character count */}
                          </p>
                        </>
                      )}
                    />{" "}
                  </div>
                </div>

                <div className="Primary-Page-Foodimages">
                  <h3>Food image</h3>
                  <p>Image size should be under 2MB, in PNG or JPEG format.</p>
                  <div className="imagealignment">
                    <input
                      type="file"
                      name="imageUrls"
                      className="imgfile"
                      id="imgadd"
                      accept="image/png, image/jpeg"
                      multiple
                      onChange={handleImageChange}
                      // name="imageUrls"
                    />

                    {images?.map((img, index) => (
                      <div key={index} className="image-container">
                        <button
                          onClick={() => handleImageDeletion(index)}
                          className="imcrossstyres"
                        >
                          <ImCross
                            style={{ fontSize: "7px", color: "white" }}
                          />
                        </button>
                        <img
                          className="uploaded-image"
                          src={img.preview}
                          alt={`Preview of ${img.file.name}`}
                        />
                      </div>
                    ))}
                    {images.length < 6 && (
                      <img
                        src={ImgaeUploading}
                        alt="Add"
                        className="addingimg"
                        style={{
                          cursor: images.length < 6 ? "pointer" : "not-allowed",
                        }}
                        onClick={() => {
                          if (images.length < 6) {
                            handleAddImage();
                          }
                        }}
                      />
                    )}
                  </div>
                </div>

                {alcoholconstain && (
                  <div className="Primary-page-InputFields alcoholradiobutton">
                    <h3>Contains Alcohol ?</h3>
                    <RadioButtonGroup
                      options={alcoholradio}
                      name="alcohol"
                      selectedValue={selectedradiowatch.alcohol}
                      onChange={(value) => handleRadioChange("alcohol", value)}
                      register={register}
                    />
                  </div>
                )}
              </div>

              <div className="Primary-page-container-pairtwo">
                <div className="Primary-page-InputFields">
                  {" "}
                  <LableComponent lable="Item Code" />
                  <div className="Primary-Page-inputfiled-and-tooltip">
                    <Controller
                      name="itemCode"
                      control={control}
                      defaultValue=""
                      // required: "Item code is required",
                      rules={{
                        validate: (value) => {
                          if (!value) {
                            return true;
                          }
                          return (
                            value.toString().length >= 4 ||
                            "Item code must be at least 4 characters"
                          );
                        },
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <InputFieldComponent
                          name="itemCode"
                          oldValue={ItemsPrimaryDetails?.itemCode}
                          onChange={(newValue) => {
                            onChange(newValue);
                          }}
                          value={value}
                          // onBlur={() => {
                          //   console.log("kkkkk111")

                          // }}
                          onKeyDown={(e: any) => {
                            if (
                              e.key === "e" ||
                              e.key === "-" ||
                              e.key === "+" ||
                              e.key === "."
                            ) {
                              e.preventDefault(); // Block these keys
                            }
                          }}
                          type="number"
                          trigger={trigger}
                          error={errors.itemCode}
                        />
                      )}
                    />{" "}
                    <div className="tool-tip-item-code">
                      <TooltipMsg
                        message="Enter a unique code for this food item, used for identification."
                        styles={{
                          marginTop: "-1rem",
                          marginLeft: "2rem",
                          width: "350px",
                          height: "35px",
                          backgroundColor: "#67833E",
                          color: "white",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                        }}
                        Arrowstyle={{
                          marginTop: "0rem",
                          rotate: "-90deg",
                          position: "relative",
                          left: "-1.6rem",
                        }}
                      >
                        <div className="Tool-item-code">
                          <img
                            src={info}
                            alt="info icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </TooltipMsg>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    message?.length > 10
                      ? "barcode"
                      : "Primary-page-InputFields"
                  }
                >
                  {" "}
                  <LableComponent lable="Upc / Barcode number" />
                  <Controller
                    name="barCode"
                    control={control}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputFieldComponent
                        name="barCode"
                        onChange={(e) => {
                          let newValue = e.target.value;

                          // Prevent space as the first character
                          if (newValue.length === 1 && newValue[0] === " ") {
                            return;
                          }

                          // Remove special characters and prevent space at the beginning
                          newValue = newValue.replace(/[^a-zA-Z0-9]/g, ""); // Remove special characters

                          // Prevent space as the first character
                          if (newValue[0] === " ") {
                            return;
                          }

                          onChange(newValue);
                        }}
                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields PopularItem">
                  <Controller
                    name="popularItem"
                    control={control}
                    defaultValue={false}
                    render={({ field }: any) => (
                      <input
                        type="checkbox"
                        className="input"
                        checked={isChecked}
                        {...field}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                          field?.onChange(e.target.checked);
                        }}
                        disabled={popularItem >= popularItemlimit}
                      />
                    )}
                  />
                  <span>
                    Popular item ( {popularItem}/{popularItemlimit} )
                  </span>
                </div>

                <div className="Primary-Page-categories-field">
                  <div className="Primary-page-InputFields">
                    <LableComponent lable="Sub Category" />
                    <Controller
                      name="subCategory"
                      control={control}
                      render={({ field }: any) => (
                        <Dropdown
                          options={subCategoryData}
                          setOptions={setDataSubcategory}
                          placeholder="search for option"
                          type="radio"
                          name="subCategory"
                          register={register}
                          trigger={trigger}
                          setValue={setValue}
                          getValues={getValues}
                          // validation={{ required: "subCategory is required" }}
                          // error={errors.subCategory}
                          valiadtesubCategory={
                            editData[0]?.length > 0 ? "" : valiadtesubCategory
                          }
                          errormsg={subcategortError}
                          categoryChange = {categoryChange}
                          setCategoryChange = {setCategoryChange}
                          addNew={true}
                          editValues={true}
                          dropdownopen={DropdownOpen.subCategory}
                          setDropdownOpen={setDropdownOpen}
                          onToggle={() => handleDropdownToggle("subCategory")}
                          dropDownType="SUB_CATEGORY"
                          resetSelection={subCatagoryRef}
                          parentId={parentId}
                          setParentId={setParentId}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="Primary-page-Allergens-selection">
                  <div>
                    {" "}
                    <Imagepillsselection
                      heading="Allergens"
                      options={allergensData}
                      setValue={setValue}
                      name="allergens"
                      register={register}
                      resetSelection={allergensRef}
                    />
                  </div>
                </div>

                <div className="tool-tip-Allergen">
                  <TooltipMsg
                    message="Provide information about any allergens present in this food item"
                    styles={{
                      marginTop: "1.5rem",
                      marginLeft: "-19rem",
                      backgroundColor: "#67833E",
                      width: "350px",
                      height: "35px",
                      color: "white",
                      textAlign: "center",
                      borderRadius: "5px",
                      zIndex: "1",
                    }}
                    Arrowstyle={{
                      position: "relative",
                      top: "-1rem",
                      left: "19rem",
                    }}
                  >
                    <div className="ToolKitchen">
                      <img src={info} alt="info icon" width={20} height={20} />
                    </div>
                  </TooltipMsg>
                </div>
              </div>
            </div>
            <div
              className={
                alcoholconstain
                  ? "Primary-page-container-two-heightdynamic"
                  : "Primary-page-container-two"
              }
            >
              <div   className={
                alcoholconstain
                  ? "Primary-page-ingredients-selection1"
                  : "Primary-page-ingredients-selection"
              }>
                <Imagepillsselection
                  heading="Ingredients"
                  options={ingredientsdata}
                  setValue={setValue}
                  name="Ingredients"
                  register={register}
                  resetSelection={ingredientsRef}
                />
              </div>

              <div className="Primary-Page-Other-Details">
                <h3 className="Primary-Page-Other-Details-heading">
                  Other Details
                </h3>
                <div className="Primary-Page-Other-Detail">
                  <div>
                    <Controller
                      name="coloriePoint"
                      control={control}
                      render={({ onChange, onBlur, value }: any) => (
                        <InputFieldComponent
                          name="coloriePoint"
                          type="number"
                          onChange={(e) => {
                            handleInputChange(e);
                            onChange(e);
                          }}
                          onBlur={onBlur}
                          value={calorieInfo?.value}
                          trigger={trigger}
                          onKeyDown={(e: any) => {
                            if (
                              e.key === "e" ||
                              e.key === "-" ||
                              e.key === "+"
                            ) {
                              e.preventDefault(); // Block these keys
                            }
                          }}
                          placeholder="cal"
                        />
                      )}
                    />
                  </div>

                  <div className="Caloriepointradio">
                    <RadioButtonGroup
                      options={calorieponitradio}
                      name="type"
                      selectedValue={calorieInfo?.type}
                      onChange={(value) =>
                        handleCalorieRadioChange("type", value)
                      }
                      register={register}
                    />
                  </div>
                </div>

                <div className="Primary-Page-Other-Detail">
                  <div className="Primary-Page-inputfiled-and-tooltip">
                    <Controller
                      name="portionSize"
                      control={control}
                      render={({ onChange, onBlur, value }: any) => (
                        <InputFieldComponent
                          name="portionSize"
                          type="number"
                          onChange={(e) => {
                            handlePortionChange("value", e.target.value);
                            onChange(e);
                          }}
                          onBlur={onBlur}
                          value={portionInfo?.value}
                          trigger={trigger}
                          onKeyDown={(e: any) => {
                            if (
                              e.key === "e" ||
                              e.key === "-" ||
                              e.key === "+"
                            ) {
                              e.preventDefault(); // Block these keys
                            }
                          }}
                          placeholder={
                            portionInfo?.type || "portion(count) / grams/ml"
                          }
                        />
                      )}
                    />
                    {/* Tooltip component can go here */}
                  </div>

                  <div className="Primary-Page-inputfiled-and-tooltip-portion">
                    <RadioButtonGroup
                      options={portionsizeradio}
                      name="selectedPortion"
                      selectedValue={portionInfo?.type}
                      onChange={(value) => handlePortionChange("type", value)}
                      register={register}
                    />
                    <div className="tool-tip-portion-cont">
                      <TooltipMsg
                        message="Specify the portion size for this item, either by count or weight."
                        styles={{
                          marginTop: "-0.8rem",
                          marginLeft: "2rem",
                          width: "350px",
                          height: "35px",
                          backgroundColor: "#67833E",
                          color: "white",
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                        }}
                        Arrowstyle={{
                          rotate: "-90deg",
                          position: "relative",
                          left: "-1.5rem",
                        }}
                      >
                        <div className="ToolKitchen">
                          <img
                            src={info}
                            alt="info icon"
                            width={20}
                            height={20}
                          />
                        </div>
                      </TooltipMsg>
                    </div>
                  </div>
                </div>

                <div className="Primary-Page-Other-Detail">
                  <div>
                    {" "}
                    <div className="Primary-Page-inputfiled-and-tooltip">
                      {/* <Controller
                        name="tax"
                        control={control}
                        render={({ onChange, onBlur, value }: any) => (
                          <InputFieldComponent
                            name="tax"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            trigger={trigger}
                            placeholder="Tax Class Association"
                            onKeyDown={(e: any) => {
                              if (
                                (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) || // Restrict alphabets
                                e.key === "e" || // Prevent 'e' for scientific notation
                                e.key === "-" || // Prevent negative sign
                                e.key === "+" // Prevent positive sign
                              ) {
                                e.preventDefault();
                              }
                            }}
                          />
                        )}
                      /> */}
                      <Controller
                        name="tax"
                        control={control}
                        render={({ field }: any) => (
                          <Dropdown
                            options={taxData}
                            type="radio"
                            setOptions={setTaxType}
                            placeholder="Tax Class Association"
                            register={register}
                            name="tax"
                            trigger={trigger}
                            setValue={setValue}
                            getValues={getValues}
                            // validation={{ required: "Tax is required" }}
                            // error={errors.tax}
                            dropdownopen={DropdownOpen.tax}
                            onToggle={() => handleDropdownToggle("tax")}
                            setDropdownOpen={setDropdownOpen}
                            addNew={false}
                            editValues={false}
                            dropDownType="TAX"
                            resetSelection={resetSelectionRef}
                            parentId={parentId}
                            setParentId={setParentId}
                            isTaxDropDown = {true}
                          />
                        )}
                      />

                      <div className="tool-tip-tax-class">
                        <TooltipMsg
                          message="Create or select a tax amount to associate with this item"
                          styles={{
                            position: "relative",
                            top: "-0.7rem",
                            left: "1.8rem",
                            width: "350px",
                            height: "35px",
                            backgroundColor: "#67833E",
                            color: "white",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "5px",
                          }}
                          Arrowstyle={{
                            marginTop: "0rem",
                            rotate: "-90deg",
                            position: "relative",
                            left: "-2.25rem",
                          }}
                        >
                          <div className="Tool-tax-class">
                            <img
                              src={info}
                              alt="info icon"
                              width={20}
                              height={20}
                            />
                          </div>
                        </TooltipMsg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SaveAndNext
              getFormData={getValues}
              seletedpage="Primary"
              reset={handleReset}
              itemcodeValid={itemcodeValid}
              triggerValidation={() => trigger()}
              valiadtesubCategory={valiadtesubCategory}
            />
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPage;
