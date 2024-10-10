import React, { useState, useContext } from "react";
import "./Savenextbutton.scss";
import { useDispatch } from "react-redux";
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
interface Ingredients {
  id: string;
  name: string;
}
interface Allergens {
  id: string;
  name: string;
}
interface FormState {
  Inventory1: string;
  Inventory2: string;
}
interface PricingAndKitchen {
  maxServingAllowed: string;
  threshold: string;
  kitchenstation: string;
  Preparationtime: string;
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
}
interface Base64Image {
  mimeType: string;
  base64String: string;
}
interface ImageFile {
  // file: File;
  // uploaded: boolean;
  // failed: boolean;
  preview: string; // To store the image preview URL
}
interface FormData {
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
interface Option {
  item: string;
  price: string;
}
interface Modification {
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
interface MainForm {
  form: FormState;
  kitchenstation: string;
  Preparationtime: {
    hours: string;
    minutes: string;
  };
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
}
interface SubmitButtonProps {
  getFormData: () => FormData | Modification | MainForm;
  seletedpage: string;
  reset: () => void;
  modifications?: Modification[];
  triggerValidation?: (formData: FormData | Modification) => Promise<boolean>;
  mainForm?: MainForm;
  validation?: () => boolean;
  handleValidate?: any;
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
}) => {
  const history = useHistory();
  const { isExpanded } = useContext(Contextpagejs);
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
    if (seletedpage === "Primary" && triggerValidation) {
      const isFormValid = await triggerValidation(formData);
      if (!isFormValid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {
        history.push({
          pathname: `/productCatalog/Pricingandkitchendetails`,
          state: { pagename: "Pricing and kitchen details" },
        });
        dispatch(primarypost(formData));
      }
    } else if (seletedpage === "Pricing" && triggerValidation) {
      const isValid = handleValidate();

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

      if (formData.form && formData.form?.Inventory1) {
        PricingDetails = {
          ...PricingDetails,
          form: {
            ...mainForm?.form, // Ensure form exists by spreading PricingDetails.form or defaulting to an empty object
            Inventory1: formData.form.Inventory1 || "", // Update or set Inventory1
            Inventory2: formData.form.Inventory2 || "", // Update or set Inventory2
          },
        };
      }
      console.log("hi", formData.Preparationtime.hours);
      if (
        formData.Preparationtime?.hours ||
        formData.Preparationtime?.minutes
      ) {
        PricingDetails = {
          ...PricingDetails,
          Preparationtime: {
            // No need to fallback, because it's defined
            hours: formData.Preparationtime.hours, // Update hours
            minutes: formData.Preparationtime.minutes, // Update minutes
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
          state: { pagename: "Itemcustomizations" },
        });
      }
    } else if (seletedpage === "ItemCustomization") {
      const modificationArray = modifications;
      const formData = getFormData();
      dispatch(itemCustomizationPost(modificationArray));
      history.push("/productCatalog/Reviewpage");
    }
  };

  const handleclear = () => {
    reset();
  };

  return (
    <div>
      <div className={isExpanded ? " saveandnextExpanded" : "saveandnext"}>
        <button className="clearall" onClick={handleclear}>
          Clear All
        </button>
        <button className="link saveall" onClick={handleclick}>
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
