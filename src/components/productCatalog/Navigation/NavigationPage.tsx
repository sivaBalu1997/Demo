import { useState, useEffect, useContext } from "react";
import React from "react";
import "./Navigation.scss";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useLocation, useHistory } from "react-router-dom";


interface LocationState {
  pagename: string;

}
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
interface validation{
  triggerValidation?: (formData: FormData | Modification) => Promise<boolean>;
  getFormData?: () => FormData | Modification | MainForm;
  handleValidate?: any;
  seletedpage?:string



}

const Navigationpage:React.FC<validation> = ({seletedpage, getFormData, triggerValidation,handleValidate}) => {
  const { isExpanded } = useContext(Contextpagejs);
  const formData = getFormData && getFormData();
  console.log("triggerValidation", triggerValidation);

  

  const categories = [
    "Primary Details",
    "Pricing and kitchen details",
    "Itemcustomizations",
  ];

  const history = useHistory();
  const location = useLocation<LocationState | undefined>(); 

    const getPath = (pathName: string) => {
    const matchedPath = categories.find((category) =>
      pathName.includes(category.replace(/\s+/g, ""))
    );
    return matchedPath || categories[0]; 
  };

  const [currentPage, setCurrentPage] = useState<string>(getPath(location.pathname));

  useEffect(() => {
    if (location.state?.pagename) {
      setCurrentPage(location.state.pagename);
    }
  }, [location.state?.pagename]);

  const handleCategoryClick = async (category: string) => {
   

    if (seletedpage === "Primary" && triggerValidation) {
    const  isFormValid =  formData && triggerValidation ? await triggerValidation(formData):true ;
    setCurrentPage(category);
    const path = category.replace(/\s+/g, "");
    history.push(`/productCatalog/${path}`, { pagename: category });
     
      if (!isFormValid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {
       
      }
    } else if (seletedpage === "Pricing" && triggerValidation) {
      const isValid = handleValidate();
      setCurrentPage(category);
      const path = category.replace(/\s+/g, "");
      history.push(`/productCatalog/${path}`, { pagename: category });
  
      if (isValid) {
       
        
      }
    } else if (seletedpage === "ItemCustomization") {
      
    
      setCurrentPage(category);
      const path = category.replace(/\s+/g, "");
      history.push(`/productCatalog/${path}`, { pagename: category });
      }
    }

   


    
  

  // console.log("Use Paras",location.state?.pagename)

  return (
    <>
      <div className={"navigation"}>
        <h1 className="Mainheading">Creating new menu item</h1>
        <nav className="nav">
          <ul className={isExpanded ? "listofnavigationExpanded" : "listofnavigation"}>
            {categories.map((category, index) => (
              <li
                key={category}
                className={isExpanded ? "listsExpanded" : "lists"}
                // onClick={() => handleCategoryClick(category)}
              >
                <h1
                  className={`list-text ${category === currentPage ? "activetext" : ""}`}
                >
                  {`Step ${index + 1}: ${category}`}
                </h1>
                <div
                  className={`${isExpanded ? "navbar" : "navbarExpanded"} ${
                    category === currentPage ? "active" : ""
                  }`}
                ></div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navigationpage;
