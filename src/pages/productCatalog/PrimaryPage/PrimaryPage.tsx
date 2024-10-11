import React, { useState, useEffect, useContext, useRef } from "react";
import LableComponent from "../../../components/productCatalog/LableComponent/LableComponent";
import InputFieldComponent from "../../../components/productCatalog/InputFieldComponent/InputFieldComponent";
import Dropdown from "../../../components/productCatalog/DropDownList/DropDownList";
import DigitInput from "../../../components/productCatalog/DigitInput/DigitInput";
import RadioButtonGroup from "../../../components/productCatalog/RadioButton/RadioButton";
import "./PrimaryPage.scss";
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
  subCategoryDataRequest,
} from "redux/productCatalog/productCatalogActions";
import SidePanel from "pages/SidePanel";
import { Contextpagejs } from "../contextpage";
import { RootState } from "redux/rootReducer";

import { stat } from "fs";
import TooltipMsg from "components/productCatalog/Tooltip/TooltipMsg";
import { useLocation } from "react-router-dom";

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
  dietaryType: string;
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
  preview: string; // To store the image preview URL
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
  const resetSelectionRef = useRef<(() => void) | null>(null);
  const cuisineRef  = useRef<(() => void) | null>(null);
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
      dietaryType: "",
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

  const[popularItem,setPopularItem]=useState<any> ("")


  const location = useLocation<LocationState | undefined>();
  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );
  const addedData = useSelector(
    (state: ListingData) => state.addMockDataReducer.data
  );

  const Mockdata = useSelector(
    (state: ListingData) => state.storeMockDataReducer.data
  );
  const PopularItemFormApi=useSelector((state:any)=>state?.getPopularItemReducer?.popularItems?.data?.popularItemCount)
  const mergedMockData = [...Mockdata, ...addedData];
  const [SelectedFooditemtoedit, setSelectedFooditemtoedit] =
    useState<Item[]>();
    
  useEffect(() => {
      setPopularItem(PopularItemFormApi); // Update state
    
  }, [PopularItemFormApi]); 
  useEffect(()=>{
    dispatch(getPopularItemRequest(locationid))

  },[])


  useEffect(() => {
    const SelectedFooditemtoedit = mergedMockData.filter(
      (item) => item.id === location.state?.id
    );

    if (SelectedFooditemtoedit && SelectedFooditemtoedit[0]) {
      const selectedItem = SelectedFooditemtoedit[0];

      setValue("itemName", selectedItem?.itemName);
      setValue("dietaryType", selectedItem?.dietary);
      setValue("cuisine", selectedItem?.cusine);
      setValue("mealType", selectedItem?.mealType);
      setValue("itemCode", selectedItem?.itemCode);
    }
  }, [mergedMockData, location.state?.id, setValue]);

  const requestCompleted = useSelector(
    (state: RootState) => state.productCatalog.requestCompleted
  );

  const ItemsPrimaryDetails = useSelector(
    (state: primarypage) => state.primarypage.data
  );
 

  useEffect(() => {
    if (ItemsPrimaryDetails) {
      // setValue("itemName", ItemsPrimaryDetails.itemName);
      setValue("dietaryType", ItemsPrimaryDetails.dietaryType);
      setValue("cuisine", ItemsPrimaryDetails.cuisine);
      setValue("mealType", ItemsPrimaryDetails.mealType);
      setValue("bestPair", ItemsPrimaryDetails.bestPair);
      setValue("description", ItemsPrimaryDetails.description);
      setValue("imageUrls", ItemsPrimaryDetails.imageUrls);
      setValue("alcohol", ItemsPrimaryDetails.alcohol);
      setValue("itemCode", ItemsPrimaryDetails.itemCode);
      setValue("barCode", ItemsPrimaryDetails.barCode);
      setValue("category", ItemsPrimaryDetails.category);
      setValue("categoryId", ItemsPrimaryDetails.categoryId);
      setValue("subCategory", ItemsPrimaryDetails.subCategory);
      setValue("Ingredients", ItemsPrimaryDetails.Ingredients);
      setValue("allergens", ItemsPrimaryDetails.allergens);
      setValue("coloriePoint", ItemsPrimaryDetails.coloriePoint);
      setValue("selectedcolorie", ItemsPrimaryDetails.selectedcolorie);
      setValue("portionSize", ItemsPrimaryDetails.portionSize);
      setValue("selectedPortion", ItemsPrimaryDetails.selectedPortion);
      setValue("tax", ItemsPrimaryDetails.tax);
      setValue("masterCode", ItemsPrimaryDetails.masterCode);
    }
  }, [ItemsPrimaryDetails, setValue]);

  const ingredients = useSelector(
    (state: StateDataTag) => state.productCatalog.ingredients
  );

  const categoriesdata = useSelector(
    (state: StateDataTag2) => state.productCatalog.categoryData
  );

  const { isExpanded } = useContext(Contextpagejs);
  const [dataImages, setDataImages] = useState(imageslist);
  const [dataDietaryType, setDataDietaryType] = useState([]);
  const [dataCuisine, setDataCuisine] = useState(cuisine);
  const [dataMealType, setDataMealType] = useState(mealType);
  const [dataBestPair, setDataBestPair] = useState();
  const [dataSubcategory, setDataSubcategory] = useState(subcategory);
  const [ingredientsFromAPi, setIngredientsFromAPi] = useState<ImageOptions[]>(
    []
  );


  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxDescriptonLength = 100;
  const maxImages = 7;
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    dietaryType: false,
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
      setValue(name, description);
    }
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      return {
        dietaryType: false,
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

  const handleImageDeletion = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const selectedradiowatch = watch();

  const handleAddImage = () => {
    document.getElementById("imgadd")?.click();
  };
  const [uploading, setUploading] = useState(false);

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(event.target.files || []);
  //   const validFiles = files.filter((file) => {
  //     const validTypes = ["image/jpeg", "image/png"];
  //     const maxSizeInBytes = 2 * 1024 * 1024;
  //     if (!validTypes.includes(file.type)) {
  //       alert(`Invalid file type: ${file.name}. Only PNG and JPG are allowed.`);
  //       return false;
  //     }

  //     if (file.size > maxSizeInBytes) {
  //       alert(`File too large: ${file.name}. Maximum size is 2MB.`);
  //       return false;
  //     }

  //     return true;
  //   });

  //   if (validFiles.length + images.length > maxImages) {
  //     alert(`You can only upload up to ${maxImages} images.`);
  //     return;
  //   }

  //   const readFileAsDataURL = (file: File): Promise<Base64Image> => {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const dataURL = reader.result as string;
  //         const mimeType = dataURL.split(";")[0].split(":")[1];
  //         const base64String = dataURL.split(",")[1];
  //         resolve({ mimeType, base64String });
  //       };
  //       reader.onerror = reject;
  //       reader.readAsDataURL(file);
  //     });
  //   };

  //   Promise.all(validFiles.map(readFileAsDataURL))
  //     .then((base64Images) => {
  //       setImages((prevImages) => {
  //         const updatedImages = [...prevImages, ...base64Images];
  //         console.log("testing", setValue, typeof setValue);
  //         return updatedImages;
  //       });

  //       setValue("imageUrls", base64Images);
  //     })
  //     .catch((error) => {
  //       console.error("Error converting files to Base64", error);
  //     });
  // };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validImageTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 2 * 1024 * 1024;
      const fileArray = Array.from(files)
        .map((file) => {
          if (!validImageTypes.includes(file.type)) {
            alert(
              `Invalid file type: ${file.name}. Only PNG and JPG are allowed.`
            );
            return null;
          }
          if (file.size > maxSizeInBytes) {
            alert(`File too large: ${file.name}. Maximum size is 2MB.`);
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
      if (fileArray.length + images.length > 7) {
        alert("You can upload a maximum of 7 images.");
        return;
      }
      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...fileArray];

        const updatedImageUrls = updatedImages.map((image) => image);
        setValue("imageUrls", updatedImageUrls);
        return updatedImages;
      });
    }
  };

  // const newarray = getValues("imageUrls");
  // console.log("newarray", newarray);

  useEffect(() => {
    // dispatch(getIngredientsRequest(locationid));
    // dispatch(getMenuCategoryRequest(locationid));
  }, []);

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
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if(isChecked){
      setPopularItem(popularItem+1)
    }
    else if(!isChecked){
      setPopularItem(popularItem-1)


    }

  }


  const handleReset=()=>{
    setValue("itemName", "");
    setValue("dietaryType", "");
    setValue("cuisine", "");
    setValue("mealType", "");
    setValue("bestPair", "");
    setValue("description", "");
    setValue("imageUrls", []); // Assuming this should be an empty array
    setValue("alcohol", "no"); // If you want to keep a default value
    setValue("itemCode", "");
    setValue("barCode", "");
    setValue("category", "");
    setValue("categoryId", "");
    setValue("subCategory", "");
    setValue("Ingredients", []); // Assuming this should be an empty array
    setValue("allergens", []); // Assuming this should be an empty array
    setValue("coloriePoint", "");
    setValue("selectedcolorie", "per100grams"); // If you want to keep a default value
    setValue("portionSize", "");
    setValue("selectedPortion", "Portion(count)"); // If you want to keep a default value
    setValue("tax", "");
    setValue("masterCode", "");
      if (resetSelectionRef.current) {
      resetSelectionRef.current(); 
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

    setDescription(" ")
    setCharCount(0);
    setImages([])
  }

  const dataforadd={
    name: "rotti",
    locationId: locationid,
    type: "DIET",
    parentId: ""
  }

  // console.log(getValues())
  const hansleshwadd=()=>{
    dispatch(addDropDowRequest(dataforadd))
  }

  console.log(dataDietaryType)

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
            <Navigationpage />
          </div>
          <div className="Primary-page">
            {/* <form> */}
            <div className="Primary-page-container-one">
              <div className="Primary-page-container-pairone">
                <div className="Primary-page-InputFields">
                  {/* <button onClick={hansleshwadd}>show add</button> */}
                  {" "}
                  <LableComponent lable="ItemName *" />
                  <Controller
                    name="itemName"
                    control={control}
                    // rules={{ required: "ItemName is required" }}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputFieldComponent
                        name="itemName"
                        onChange={onChange}
                        // onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                        error={errors.itemName}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields">
                  <LableComponent lable="DietaryType *" />
                  <Controller
                    name="dietaryType"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                      options={dietaryData}
                      type="checkbox"
                        setOptions={setDataDietaryType}
                        placeholder="search for option"
                        register={register}
                        name="dietaryType"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "dietaryType is required" }}
                        error={errors.dietaryType}
                        dropdownopen={DropdownOpen.dietaryType}
                        onToggle={() => handleDropdownToggle("dietaryType")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                        resetSelection={resetSelectionRef} 
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
                        validation={{ required: "cuisine is required" }}
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
                        // validation={{ required: "category is required" }}
                        error={errors.category}
                        dropdownopen={DropdownOpen.category}
                        setDropdownOpen={setDropdownOpen}
                        onToggle={() => handleDropdownToggle("category")}
                        addNew={true}
                        editValues={true}
                        dropDownType="CATEGORY"
                        resetSelection={categoryref} 

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
                          validation={{ required: "This field is required" }}
                          dropdownopen={DropdownOpen.bestPair}
                          onToggle={() => handleDropdownToggle("bestPair")}
                          setDropdownOpen={setDropdownOpen}
                          addNew={false}
                          editValues={false}
                          dropDownType="BEST_PAIRED_ITEMS"
                          resetSelection={BestpairedRef} 
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

                    {/* {images.map((image, index) => (
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
                            src={`data:${image.mimeType};base64,${image.base64String}`}
                            alt={`uploaded ${index}`}
                            className="uploaded-image"
                          />
                        </div>
                      ))} */}

                    {images.map((img, index) => (
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
                        {/* <div>
                          {img.file.name} -{" "}
                          {img.uploaded
                            ? "Uploaded"
                            : img.failed
                            ? "Failed"
                            : "Pending Upload"}
                        </div> */}
                      </div>
                    ))}

                    <img
                      src={ImgaeUploading}
                      alt="Add"
                      className="addingimg"
                      onClick={handleAddImage}
                    />
                  </div>
                </div>

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
              </div>

              <div className="Primary-page-container-pairtwo">
                <div className="Primary-page-InputFields">
                  {" "}
                  <LableComponent lable="ItemCode" />
                  <div className="Primary-Page-inputfiled-and-tooltip">
                    <Controller
                      name="itemCode"
                      control={control}
                      rules={{
                        required: "Item code is required",
                        validate: (value) =>
                          (value.toString().length >= 4 ) ||
                          "Item code must be between 4 and 5 characters",
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <InputFieldComponent
                          name="itemCode"
                          onChange={(newValue) => {
                            onChange(newValue); // Update form state
                          }}
                          value={value} // Ensure value is defined
                          onBlur={() => {
                            if (value) {
                              dispatch(getItemCodeRequest(locationid, value));
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
                          left: "-1.7rem",
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

                <div className="Primary-page-InputFields">
                  {" "}
                  <LableComponent lable="Upc / Barcode number" />
                  <Controller
                    name="barCode"
                    control={control}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputFieldComponent
                        name="barCode"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                      />
                    )}
                  />
                </div>

                <div className="Primary-page-InputFields PopularItem">
                  <input type="checkbox" onChange={handleCheckboxChange} />
                  <span>Popular item ( {popularItem}/10 )</span>
                </div>

                <div className="Primary-Page-categories-field">
                  <div className="Primary-page-InputFields">
                    <LableComponent lable="SubCategory" />
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
                          addNew={true}
                          editValues={true}
                          dropdownopen={DropdownOpen.subCategory}
                          setDropdownOpen={setDropdownOpen}
                          onToggle={() => handleDropdownToggle("subCategory")}
                          dropDownType="SUB_CATEGORY"
                          resetSelection={subCatagoryRef} 
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="Primary-page-Allergens-selection">
                  <div>
                    {" "}
                    <Imagepillsselection
                      heading="Allergens*"
                      options={validImages}
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
            <div className="Primary-page-container-two">
              <div className="Primary-page-ingredients-selection">
                <Imagepillsselection
                  heading="Ingredients*"
                  options={ingredientsFromAPi}
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
                <div className="Primary-Page-Other-Detail ">
                  <div>
                    <Controller
                      name="coloriePoint"
                      control={control}
                      render={({ onChange, onBlur, value }: any) => (
                        <InputFieldComponent
                          name="coloriePoint"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          trigger={trigger}
                          placeholder="cal"
                        />
                      )}
                    />
                  </div>
                  <div className="Caloriepointradio">
                    <RadioButtonGroup
                      options={calorieponitradio}
                      name="selectedcolorie"
                      selectedValue={selectedradiowatch.selectedcolorie}
                      onChange={(value) =>
                        handleRadioChange("selectedcolorie", value)
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
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                          trigger={trigger}
                          placeholder={getValues("selectedPortion")}
                          // placeholder={getValues("selectedPortion")}
                        />
                      )}
                    />
                    {/* <div className="tool-tip-portion-size">
                    
                    </div> */}
                  </div>

                  <div className="Primary-Page-inputfiled-and-tooltip portionSize-Radio">
                    <RadioButtonGroup
                      options={portionsizeradio}
                      name="selectedPortion"
                      selectedValue={selectedradiowatch.selectedPortion}
                      onChange={(value) =>
                        handleRadioChange("selectedPortion", value)
                      }
                      register={register}
                    />
                    <div className="portionsizeTooltip">
                      <TooltipMsg
                        message="Specify the portion size for this item, either by count or weight."
                        styles={{
                          marginTop: "-2rem",
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
                      <Controller
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
                          />
                        )}
                      />
                      <div className="tool-tip-tax-class">
                        <TooltipMsg
                          message="Create or select a tax amount to associate with this item"
                          styles={{
                            position: "relative",
                            top: "-2.5rem",
                            left: "1.5rem",
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
                  <div className="Primary-page-Other-Detail-mastercode">
                    <LableComponent lable="Master Item Code" />

                    <div className="Primary-Page-inputfiled-and-tooltip">
                      <Controller
                        name="masterCode"
                        control={control}
                        render={({ field }: any) => (
                          <DigitInput
                            {...field}
                            setValue={setValue}
                            name="masterCode"
                            register={register}
                            inputCount={4}
                            error={errors.masterCode}
                            validation={{ required: "Master code is required" }}
                             resetSelection={digitClearRef} 
                          />
                        )}
                      />
                      <div className="Mastedcode-Tooltip">
                        <TooltipMsg
                          message="Enter a unique code for this food item, used for identification."
                          styles={{
                            position: "relative",
                            top: "-2rem",
                            left: "1.5rem",
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
                            left: "-1.7rem",
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
                </div>
              </div>
            </div>

            <SaveAndNext
              getFormData={getValues}
              seletedpage="Primary"
              reset={handleReset}
              triggerValidation={() => trigger()}
            />
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPage;
