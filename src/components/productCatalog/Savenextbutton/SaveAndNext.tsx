import React, { useState, useContext } from "react";
import "./Savenextbutton.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  itemCustomizationPost,
  PricingDetailRequest,
} from "../../../redux/productCatalog/productCatalogActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { primarypost } from "redux/productCatalog/productCatalogActions";
// import { useNavigate } from "react-router-dom";
export interface Ingredients {
  id: string;
  name: string;
}
export interface Allergens {
  id: string;
  name: string;
}
export interface FormState {
  Inventory1: string;
  Inventory2: string;
}
export interface PricingAndKitchen {
  maxServingAllowed: string;
  threshold: string;
  kitchenstation: string;
  Preparationtime: string;
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
}
export interface Base64Image {
  mimeType: string;
  base64String: string;
}
export interface ImageFile {
  // file: File;
  // uploaded: boolean;
  // failed: boolean;
  preview: string; // To store the image preview URL
}
export interface FormData {
  itemName?: string;
  dietaryType?: string;
  cuisine?: string;
  mealType?: string;
  bestPair?: string;
  description?: string;
  imageUrls?: ImageFile[];
  alcohol?: string;
  itemCode?: string;
  barCode?: string;
  category?: string;
  categoryId?: string;
  subCategory?: string;
  Ingredients?: Ingredients[];
  allergens?: Allergens[];
  coloriePoint?: string;
  selectedcolorie?: string;
  portionSize?: string;
  selectedPortion?: string;
  tax?: string;
  masterCode?: string;
  modifierName?: string;
  options?: Option[];
  minSelection?: number;
  maxSelection?: number;
  freeCustomization?: number;
  selectedValue?: string[];
  endDate?: string;
  startDate?: string;
  selectionType?: string;
  field1?: number;
  field2?: number;
  [key: string]: any;
}
export interface Option {
  item: string;
  price: string;
}
export interface Modification {
  modifierName: string;
  options: Option[];
  minSelection: number;
  maxSelection: number;
  freeCustomization: number;
  selectedValue: string[];
  endDate?: string;
  startDate?: string;
  selectionType?: string;
  field1?: number;
  field2?: number;
  [key: string]: any;
}
export interface MainForm {
  form: FormState;
  kitchenstation: string;
  Preparationtime: {
    hours: string;
    minutes: string;
  };
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
  imageUrls?: any;
}
export interface SubmitButtonProps {
  getFormData: () => FormData | Modification | MainForm;
  seletedpage: string;
  reset: () => void;
  modifications?: Modification[];
  triggerValidation?: (formData: FormData | Modification) => Promise<boolean>;
  mainForm?: MainForm;
  validation?: () => boolean;
  handleValidate?: any;
  itemcodeValid?:boolean;
  errors?:any
  validateModifiers?:any;
  valiadtesubCategory?:any
}

const SaveAndNext: React.FC<SubmitButtonProps> = ({
  getFormData,
  seletedpage,
  reset,
  modifications,
  triggerValidation,
  validation,
  mainForm,
  handleValidate,
  itemcodeValid,
  errors,
  validateModifiers,
  valiadtesubCategory
}) => {
  const history = useHistory();
  const { isExpanded ,setValiadtePriceFields} = useContext(Contextpagejs);

  // Safely invoking validation

  // const extractFields = (formData: FormData) => {
  //   return {
  //     locationId: "9c485244-afd4-11eb-b6c7-42010a010026",
  //     altName: "alt name",
  //     price: "12",
  //     subCategoryId: "",
  //     kitchenStations: ["3bdfa61-0e4f-48e6-b2bb-b4bd1d103950"],
  //     taxFeeId: "",
  //     ingredients: formData.Ingredients,
  //     modifiers: [],
  //     availabilityId: ["b1492143-2c4c-4a4f-bc49-a3b99cbb1349"],
  //     subCategory:formData?.subCategory && formData?.subCategory ||"",
  //     itemId: null,
  //     itemName: formData.itemName,
  //     category: formData.category,
  //     itemCode: formData.itemCode,
  //     categoryId: formData?.categoryId,
  //     description: formData?.description,
  //     dietaryType: "",
  //     cuisine: "",
  //     mealType: "",
  //     bestPair: "",
  //     alcohol: "",
  //     barCode: "",
  //     coloriePoint: "",
  //     selectedcolorie: "per100grams",
  //     portionSize: "",
  //     selectedPortion: "Portion(count)",
  //     tax: "",
  //     masterCode: "",
  //   };
  // };

  const dispatch = useDispatch();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formData = getFormData();
  const editData = useSelector((state: any) => state.productCatalog.editData)

  const handleclick = async () => {
    // if (seletedpage === "Primary" && triggerValidation) {
    //   const isFormValid = await triggerValidation(formData);
    //   if (!isFormValid) {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: "smooth",
    //     });
    //     return;
    //   }
    // }
    if (seletedpage === "Primary" && triggerValidation && itemcodeValid && valiadtesubCategory) {
    
      
      const isFormValid = await triggerValidation(formData) 
     const valiadtesubcategorynn= valiadtesubCategory()
       
            

      const formImageIds = formData?.imageUrls?.map((image: any) => image.file.name);
      const editImageIds = editData[0]?.mediaResponseList?.map((media: any) => media.imageId);

      const isImageDeleted = editImageIds?.some((imageId: any) => !formImageIds?.includes(imageId));
     
      if (!isFormValid ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {

        if(valiadtesubcategorynn)
        {
          history.push({
            pathname: `/productCatalog/Pricingandkitchendetails`,
            state: { pagename: "Pricing and kitchen details" },
          });        
          dispatch(primarypost(
            { 
              ...formData, 
              isImageDeleted 
            }));
        }
        
      }
    } else if (seletedpage === "Pricing" && triggerValidation) {
      const isValid = handleValidate && handleValidate();
      const valid=setValiadtePriceFields

      let PricingDetails = { ...mainForm };
      const formData = getFormData();

      
     
      const isinValid = await triggerValidation(formData);

    

      if (formData.kitchenstation) {
        PricingDetails = {
          ...PricingDetails,
          kitchenstation: formData.kitchenstation,
        };
      } else {
        console.error("formData.kitchenstation is undefined");
      }

      if (formData?.form && formData?.form?.Inventory1) {
        PricingDetails = {
          ...PricingDetails,
          form: {
            ...mainForm?.form, 
            Inventory1: formData.form.Inventory1 || "", 
            Inventory2: formData.form.Inventory2 || "", 
          },
        };
      }
      if (
        formData.Preparationtime?.hours ||
        formData.Preparationtime?.minutes
      ) {
        PricingDetails = {
          ...PricingDetails,
          Preparationtime: {
            hours: formData.Preparationtime.hours, 
            minutes: formData.Preparationtime.minutes, 
          },
        };
      } else {
        console.error("formData.Preparationtime is undefined");
      }

      // Add further logic to proceed after validation passes
      if (isValid) {
        dispatch(PricingDetailRequest(PricingDetails));
        history.push({
          pathname: `/productCatalog/Itemcustomizations`,
          state: { pagename: "Item customizations" },
        });
      }
    } else if (seletedpage === "ItemCustomization") {
      const isValid = validateModifiers && validateModifiers(modifications);
      // const modificationArray = modifications;
      const modificationArray = modifications?.map((modifier) => {
        if (
          modifier.selectionType === "Mandatory" &&
          modifier.minSelection === 0 &&
          modifier.maxSelection === 0
        ) {
          return { ...modifier, minSelection: 1, maxSelection: 1 };
        }
        return modifier;
      });


      console.log("from review page modificationArray",{modificationArray})
      const formData = getFormData();
     
      if(isValid)
      {
        dispatch(itemCustomizationPost(modificationArray));
        history.push("/productCatalog/Reviewpage");
      }
     
    }
  };

  const handleclear = () => {
    reset();
  };
 
  return (
    <div className="saveAndNextComponent">
      <div className={isExpanded ? " saveandnextFooterExpanded" : "saveandnextfooter"}>
        <button className="clearall" onClick={handleclear}>
          Clear All
        </button>
        <button className="link saveall" onClick={handleclick} >
          Save & next
        </button>
      </div>
      {/* <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        /> */}
    </div>
  );
};
export default SaveAndNext;
