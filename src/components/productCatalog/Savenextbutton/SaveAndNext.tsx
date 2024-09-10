import React, { useState, useContext } from "react";
import "./Savenextbutton.scss";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { itemCustomizationPost } from "../../../redux/productCatalog/productCatalogActions";
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

interface Base64Image {
  mimeType: string;
  base64String: string;
}
interface FormData {
  itemName?: string;
  dietaryType?: string;
  cuisine?: string;
  mealType?: string;
  bestPair?: string;
  description?: string;
  imageUrls?: Base64Image[];
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
  [key: string]: any; // Define specific types if known, e.g., number | string
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

interface SubmitButtonProps {
  getFormData: () => FormData | Modification;
  seletedpage: string;
  reset: () => void;
  modifications?: Modification[];
  triggerValidation?: (formData: FormData | Modification) => Promise<boolean>;
}

const SaveAndNext: React.FC<SubmitButtonProps> = ({
  getFormData,
  seletedpage,
  reset,
  modifications,
  triggerValidation,
}) => {
  const history = useHistory();
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
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

  const handleclick = async () => {
    const formData = getFormData();

    if (seletedpage === "Primary" && triggerValidation) {
      const isFormValid = await triggerValidation(formData);

      if (!isFormValid) {
        // toast.error("Please correct the errors before proceeding.");

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }
    }
    console.log("submitform", formData);

    if (seletedpage === "Primary") {
      history.push({
        pathname: `/productCatalog/Pricingandkitchendetails`,
        state: { pagename: "Pricing and kitchen details" },
      });

      dispatch(primarypost(formData));
      console.log("uploading", formData);
    } else if (seletedpage === "ItemCustomization") {
      const modificationArray = modifications;
      console.log("ddddddddd", modificationArray);
      const formData = getFormData();
      dispatch(itemCustomizationPost(modificationArray));
      history.push("/productCatalog/Reviewpage");
    }

    // scrollToTop();
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
