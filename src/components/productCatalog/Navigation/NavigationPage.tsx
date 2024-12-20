import { useState, useEffect, useContext } from "react";
import React from "react";
import "./Navigation.scss";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { useLocation, useHistory } from "react-router-dom";
import { MainForm, Modification } from "../Savenextbutton/SaveAndNext";
import {
  PricingDetailRequest,
  itemCustomizationPost,
  primarypost,
} from "redux/productCatalog/productCatalogActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface LocationState {
  pagename: string;
}

interface NavButtonProps {
  getFormData?: any;
  seletedpage?: string;
  reset?: () => void;
  modifications?: Modification[];
  triggerValidation?: (formData: any) => Promise<boolean>;
  mainForm?: MainForm;
  validation?: () => boolean;
  handleValidate?: any;
  validateModifiers?: any;
  itemcodeValid?: any;
  valiadtesubCategory?: any;
}

const Navigationpage: React.FC<NavButtonProps> = ({
  getFormData,
  seletedpage,
  reset,
  modifications,
  triggerValidation,
  validation,
  mainForm,
  validateModifiers,
  handleValidate,
  itemcodeValid,
  valiadtesubCategory,
}) => {
  const { isExpanded } = useContext(Contextpagejs);
  const formData = getFormData();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<LocationState | undefined>();
  const [navigate, setNavigate] = useState(false);
  const itemCustomizationData = useSelector(
    (state: any) => state.itemCustomizationsReducer1.itemData
  );
  const ItemsPrimaryDetails = useSelector(
    (state: any) => state.primarypage?.data
  );
  const prizingDetail = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData || {}
  );
  const editData = useSelector((state: any) => state.productCatalog.editData);
  const { setValiadtePriceFields } = useContext(Contextpagejs);

  const categories = [
    "Primary Details",
    "Pricing and kitchen details",
    "Item customizations",
  ];

  const getPath = (pathName: string) => {
    const matchedPath = categories.find((category) =>
      pathName.includes(category.replace(/\s+/g, ""))
    );
    return matchedPath || categories[0];
  };

  const [currentPage, setCurrentPage] = useState<string>(
    getPath(location.pathname)
  );

  const datafromRedux = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );


  const handleclick = async (category: any) => {
    const path = category.replace(/\s+/g, "");

    if (currentPage === "Primary Details" && triggerValidation) {
      const isFormValid = await triggerValidation(formData);
      if (!isFormValid) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {
        setNavigate(true)
        dispatch(primarypost(formData));
        isFormValid && setCurrentPage(category);
        history.push(`/productCatalog/${path}`, { pagename: category });
      }
    } 
    
    else if (
      currentPage === "Pricing and kitchen details" &&
      triggerValidation
    ) {
      const isValid = handleValidate && handleValidate();
      setNavigate(true)
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

      if (isValid) {
        dispatch(PricingDetailRequest(PricingDetails));
        setNavigate(true)
        setCurrentPage(category);
        history.push(`/productCatalog/${path}`, { pagename: category });
      }
    }
    
    else if (currentPage === "Item customizations") {
      const isValid = validateModifiers && validateModifiers(modifications);
      setNavigate(true)
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

      if(isValid){
        dispatch(itemCustomizationPost(modificationArray));
        history.push(`/productCatalog/${path}`, { pagename: category });
      }
      const formData = getFormData(); 
      setCurrentPage(category);
    }
  };


  useEffect(() => {
    if (location.state?.pagename) {
      navigate && setCurrentPage(location.state.pagename);
    }
  }, [location.state?.pagename]);

  const handleCategoryClick = (category: string) => {
    const path = category.replace(/\s+/g, "");
    // handleclick(category);
    // navigate && setCurrentPage(category);
     history.push(`/productCatalog/${path}`, { pagename: category });
  };

  return (
    <>
      <div className={"navigation"}>
        <h1 className="Mainheading">
          {editData?.length >= 1 ? "Edit Item" : "Creating new menu item"}
        </h1>
        <nav className="nav">
          <ul
            className={
              isExpanded ? "listofnavigationExpanded" : "listofnavigation"
            }
          >
            {categories.map((category, index) => (
              <li
                key={category}
                className={isExpanded ? "listsExpanded" : "lists"}
                onClick={() => handleCategoryClick(category)}
              >
                <h1
                  className={`list-text ${
                    category === currentPage ? "activetext" : ""
                  }`}
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
