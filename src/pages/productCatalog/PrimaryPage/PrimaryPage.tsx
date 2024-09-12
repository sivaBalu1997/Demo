import React, { useState, useEffect, useContext } from "react";
import LableComponent from "../../../components/productCatalog/LableComponent/LableComponent";
import InputFieldComponent from "../../../components/productCatalog/InputFieldComponent/InputFieldComponent";
import Dropdown from "../../../components/productCatalog/DropDownList/DropDownList";
import DigitInput from "../../../components/productCatalog/DigitInput/DigitInput";
import RadioButtonGroup from "../../../components/productCatalog/RadioButton/RadioButton";
import "./PrimaryPage.scss";
import { ImCross } from "react-icons/im";
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
  bestPair,
  subcategory,
  alcoholradio,
  calorieponitradio,
  portionsizeradio,
} from "../../../assets/mockData/Moca_data";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";

import {
  getIngredientsRequest,
  getMenuCategoryRequest,
} from "redux/productCatalog/productCatalogActions";
import SidePanel from "pages/SidePanel";
import { Contextpagejs } from "../contextpage";
import { RootState } from "redux/rootReducer";

interface Ingredients {
  id: string;
  name: string;
}
interface Allergens {
  id: string;
  name: string;
}

interface FormData {
  itemNameData: string;
  dietaryType: string;
  cuisine: string;
  mealType: string;
  bestPair: string;
  description: string;
  imageUrls: Base64Image[];
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

interface option {
  name: string[];
}
interface ImageOptions {
  name: string;
  id: string;
  imageId?: string;
  imageType?: string;
}

const PrimaryPage = () => {
  const [dataImages, setDataImages] = useState(imageslist);
  const [dataDietaryType, setDataDietaryType] = useState(dietarytype);
  const [dataCuisine, setDataCuisine] = useState(cuisine);
  const [dataMealType, setDataMealType] = useState(mealType);
  const [dataBestPair, setDataBestPair] = useState(bestPair);
  const [dataSubcategory, setDataSubcategory] = useState(subcategory);
  const [dataAlcoholRadio, setDataAlcoholRadio] = useState(alcoholradio);
  const [dataCaloriePointRadio, setDataCaloriePointRadio] =
    useState(calorieponitradio);
  const [dataPortionSizeRadio, setDataPortionSizeRadio] =
    useState(portionsizeradio);
  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );

  const requestCompleted = useSelector(
    (state: RootState) => state.productCatalog.requestCompleted
  );
  const ingredients = useSelector(
    (state: StateDataTag) => state.productCatalog.ingredients
  );
  const categoriesdata = useSelector(
    (state: StateDataTag2) => state.productCatalog.categoryData
  );
  const { isExpanded } = useContext(Contextpagejs);

  const [ingredientsFromAPi, setIngredientsFromAPi] = useState<ImageOptions[]>(
    []
  );
  const [description, setDescription] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxLength = 100;

  console.log(isExpanded)

  // Handle input change for description and character count
  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const length = value.length;
    if (length <= maxLength) {
      setDescription(value);
      setCharCount(length);
      setValue(name, description);
    }
  };

  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    dietaryType: false,
    cuisine: false,
    mealType: false,
    bestPair: false,
    category: false,
    subCategory: false,
  });

  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      // Close all other dropdowns and open only the clicked one
      return {
        dietaryType: false,
        cuisine: false,
        mealType: false,
        bestPair: false,
        category: false,
        subCategory: false,
        [dropdownName]: !prevState[dropdownName], // Toggle the clicked dropdown
      };
    });
  };
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // const handleDropdownToggle = (name: string) => {
  //   setOpenDropdown((prev) => (prev === name ? null : name));
  // };

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getApi();
    Category();
  }, []);

  useEffect(() => {
    setIngredientsFromAPi(ingredients);
    setCategories(categoriesdata);
  }, [requestCompleted]);

  const getApi = () => {
    dispatch(getIngredientsRequest(locationid));
  };

  const Category = () => {
    dispatch(getMenuCategoryRequest(locationid));
  };
  const [masterCode, setMasterCode] = useState<string>("");
  const [selectedValues, setSelectedValues] = useState({
    alcohol: "",
    selectedcolorie: "",
    selectedPortion: "",
  });
  const [selectedOption, setSelectedOption] = useState<string>("apple");

  const validImages = dataImages.filter(
    (img): img is { name: string; id: string } => img !== undefined
  );

  const handleRadioChange = (radioname: keyof FormData, value: string) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [radioname]: value,
    }));
    setValue(radioname, value);
  };
  const handleimageselection = (option: { id: string; name: string }) => {
    console.log("Selected option:", option);
  };
  const [images, setImages] = useState<Base64Image[]>([]);
  const maxImages = 7;

  const handleAddImage = () => {
    document.getElementById("imgadd")?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (!validTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Only PNG and JPG are allowed.`);
        return false;
      }

      if (file.size > maxSizeInBytes) {
        alert(`File too large: ${file.name}. Maximum size is 2MB.`);
        return false;
      }

      return true;
    });

    if (validFiles.length + images.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    const readFileAsDataURL = (file: File): Promise<Base64Image> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result as string;
          const mimeType = dataURL.split(";")[0].split(":")[1];
          const base64String = dataURL.split(",")[1];
          resolve({ mimeType, base64String });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    Promise.all(validFiles.map(readFileAsDataURL))
      .then((base64Images) => {
        console.log("basestr", base64Images);
        setImages([...images, ...base64Images]);

        setValue("imageUrls", base64Images);
        const imagess = getValues("imageUrls");
        console.log("selecd Images from browser", imagess);
      })
      .catch((error) => {
        console.error("Error converting files to Base64", error);
      });
  };

  const handleImageDeletion = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };
  const handleOnblur = (value: string) => {
    return value;
  };

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
      itemNameData: "",
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
  const selectedradiowatch = watch();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("formData", data);
    // const dataToDispatch = extractFields(data);
    // dispatch(ApiPost(dataToDispatch));
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
            <Navigationpage />
          </div>
          <div className="Primary-page">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="Primary-page-container-one">
                <div className="Primary-page-container-pairone">
                  <div className="Primary-page-InputFields">
                    {" "}
                    <LableComponent lable="ItemName *" />
                    <Controller
                      name="itemNameData"
                      control={control}
                      render={({ field }: any) => (
                        <InputFieldComponent
                          {...field}
                          register={register}
                          trigger={trigger}
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
                          options={dataDietaryType}
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
                          options={dataCuisine}
                          setOptions={setDataCuisine}
                          placeholder="search for option"
                          register={register}
                          trigger={trigger}
                          setValue={setValue}
                          name="cuisine"
                          // validation={{ required: "cuisine is required" }}
                          error={errors.cuisine}
                          {...field}
                          getValues={getValues}
                          dropdownopen={DropdownOpen.cuisine}
                          onToggle={() => handleDropdownToggle("cuisine")}
                          setDropdownOpen={setDropdownOpen}
                        />
                      )}
                    />
                  </div>

                  <div className="Primary-page-InputFields">
                    <LableComponent lable="MealType *" />
                    <Controller
                      name="mealType"
                      control={control}
                      render={({ field }: any) => (
                        <Dropdown
                          options={dataMealType}
                          setOptions={setDataMealType}
                          placeholder="search for option"
                          {...field}
                          register={register}
                          name="mealType"
                          trigger={trigger}
                          setValue={setValue}
                          getValues={getValues}
                          // validation={{ required: "Mealtype is required" }}
                          error={errors.mealType}
                          dropdownopen={DropdownOpen.mealType}
                          onToggle={() => handleDropdownToggle("mealType")}
                          setDropdownOpen={setDropdownOpen}
                        />
                      )}
                    />
                  </div>

                  <div className="Primary-page-InputFields">
                    <LableComponent lable="Best paired with food items *" />
                    <Controller
                      name="bestPair"
                      control={control}
                      render={({ field }: any) => (
                        <Dropdown
                          options={dataBestPair}
                          setOptions={setDataBestPair}
                          placeholder="search for option"
                          name="bestPair"
                          register={register}
                          trigger={trigger}
                          setValue={setValue}
                          getValues={getValues}
                          dropdownopen={DropdownOpen.bestPair}
                          onToggle={() => handleDropdownToggle("bestPair")}
                          setDropdownOpen={setDropdownOpen}
                        />
                      )}
                    />
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
                              value={description} // Controlled input with useState
                              onChange={(e) => handleDescriptionInputChange(e)}
                              maxLength={maxLength}
                              style={{
                                borderColor:
                                  charCount === maxLength ? "red" : "#979797",
                              }}
                            />
                            <p
                              style={{
                                color:
                                  charCount === maxLength ? "red" : "#979797",
                              }}
                              className="Primary-page-description-charcount"
                            >
                              {`${charCount}/${maxLength}`}{" "}
                              {/* Display character count */}
                            </p>
                          </>
                        )}
                      />{" "}
                    </div>
                  </div>

                  <div className="Primary-Page-Foodimages">
                    <h3>Food image</h3>
                    <p>
                      Image size should be under 2MB, in PNG or JPEG format.
                    </p>
                    <div className="imagealignment">
                      <input
                        type="file"
                        className="imgfile"
                        id="imgadd"
                        accept="image/png, image/jpeg"
                        multiple
                        onChange={handleImageUpload}
                      />

                      {images.map((image, index) => (
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
                      options={dataAlcoholRadio}
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
                    <Controller
                      name="itemCode"
                      control={control}
                      render={({ field }: any) => (
                        <InputFieldComponent
                          {...field}
                          register={register}
                          trigger={trigger}
                          type="number"
                        />
                      )}
                    />
                  </div>

                  <div className="Primary-page-InputFields">
                    {" "}
                    <LableComponent lable="Upc / Barcode number" />
                    <Controller
                      name="barCode"
                      control={control}
                      render={({ field }: any) => (
                        <InputFieldComponent
                          {...field}
                          register={register}
                          trigger={trigger}
                        />
                      )}
                    />
                  </div>

                  <div className="Primary-page-InputFields PopularItem">
                    <input type="checkbox" />
                    <span>Popular item ( 3/10 )</span>
                  </div>

                  <div className="Primary-Page-categories-field">
                    <div className="Primary-page-InputFields">
                      <LableComponent lable="Category*" />
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }: any) => (
                          <Dropdown
                            options={categories}
                            setOptions={setCategories}
                            placeholder="search for option"
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
                          />
                        )}
                      />
                    </div>
                    <div className="Primary-page-InputFields">
                      <LableComponent lable="SubCategory" />
                      <Controller
                        name="subCategory"
                        control={control}
                        render={({ field }: any) => (
                          <Dropdown
                            options={dataSubcategory}
                            setOptions={setDataSubcategory}
                            placeholder="search for option"
                            name="subCategory"
                            register={register}
                            trigger={trigger}
                            setValue={setValue}
                            getValues={getValues}
                            dropdownopen={DropdownOpen.subCategory}
                            setDropdownOpen={setDropdownOpen}
                            onToggle={() => handleDropdownToggle("subCategory")}
                          />
                        )}
                      />
                    </div>
                  </div>

                  <div className="Primary-page-Allergens-selection">
                    <Imagepillsselection
                      heading="Allergens*"
                      options={validImages}
                      setValue={setValue}
                      name="allergens"
                    />
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
                        render={({ field }: any) => (
                          <InputFieldComponent
                            {...field}
                            trigger={trigger}
                            register={register}
                            placeholder="Cal"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <RadioButtonGroup
                        options={dataCaloriePointRadio}
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
                    <div>
                      <Controller
                        name="portionSize"
                        control={control}
                        render={({ field }: any) => (
                          <InputFieldComponent
                            {...field}
                            trigger={trigger}
                            register={register}
                            placeholder={getValues("selectedPortion")}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <RadioButtonGroup
                        options={dataPortionSizeRadio}
                        name="selectedPortion"
                        selectedValue={selectedradiowatch.selectedPortion}
                        onChange={(value) =>
                          handleRadioChange("selectedPortion", value)
                        }
                        register={register}
                      />
                    </div>
                  </div>

                  <div className="Primary-Page-Other-Detail">
                    <div>
                      {" "}
                      <Controller
                        name="tax"
                        control={control}
                        render={({ field }: any) => (
                          <InputFieldComponent
                            {...field}
                            trigger={trigger}
                            register={register}
                            placeholder="Tax Class Association"
                          />
                        )}
                      />
                    </div>
                    <div className="Primary-page-Other-Detail-mastercode">
                      <LableComponent lable="Master Item Code" />
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
                            // validation={{ required: "Master code is required" }}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <button type="submit" className="Primary-Page-Formsubmitbutton">Submit</button> */}
              <SaveAndNext
                getFormData={getValues}
                seletedpage="Primary"
                reset={reset}
                triggerValidation={() => trigger()}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPage;
