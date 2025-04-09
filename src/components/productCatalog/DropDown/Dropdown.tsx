import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import "./Dropdown.scss";
import UpArrow from "../../../assets/images/dropdown.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchDropDownRequest } from "redux/productCatalog/productCatalogActions";

interface DropdownProps {
  selectedValues?: string[];
  onSelect: (values: string[]) => void;
  options?: any;
  label: string;
  validation?: {
    isValid: boolean;
    errorMessage?: string;
  };
  onBlur?: () => void;
  isopened?: React.Dispatch<React.SetStateAction<boolean>>;
  width: string;
  index?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleValidate?: () => void;
  placeHolder?: string;
  validatedineMealType?: any;
  toggleOnorOff?: boolean;
  EnabledOrNot?: boolean;
  validatepickupdelivery?: any;
  color?:string;
  streams?:boolean;
  zIndex?:boolean;
  ValiadteMealType?:any;
  setSelectedMealType?:any;
  errorarray?:any;
  Errorname?:any;
  setErrorArray?:any
  isOptionTrue?: any
  itemcustomization?:any;
  thirdParty?: any
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedValues = [],
  onSelect,
  options = [],
  label,
  validation,
  width,
  streams=false,
  onBlur,
  color,
  EnabledOrNot ,
  handleValidate,
  placeHolder,
  validatedineMealType,
  toggleOnorOff,
  validatepickupdelivery,
  zIndex,
  ValiadteMealType,
  setSelectedMealType,
  errorarray,
  Errorname,
  setErrorArray,
  isOptionTrue,
  itemcustomization,
  thirdParty
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rotateImg, setRotateImg] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [touched, setTouched] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setIsOpen(false);
          setRotateImg(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, selectedValues]);

  const handleDropdownClick = () => {
    if(EnabledOrNot){
      setIsOpen(!isOpen);
      setRotateImg(!rotateImg);
      setTouched(true);
     }
  
  };

  const handleOptionClick = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
 
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value)
      : [...selectedValues, value];
    onSelect(newSelectedValues);
    setSelectedMealType && setSelectedMealType(newSelectedValues)
    
    // ValiadteMealType && ValiadteMealType();
    
    if(newSelectedValues.length>0)
    {
      const validationErrors = { ...errorarray};
      delete validationErrors[`${Errorname}`];
      setErrorArray?.(validationErrors);
    }
   
    // validatedineMealType && validatedineMealType();
    // validatepickupdelivery &&
    //   validatepickupdelivery(toggleOnorOff, newSelectedValues);
  };

  const validateDropdown = (values: string[]) => {
    if (values.length === 0 && touched) {
      onBlur && onBlur();
    }
  };

 const locationid = useSelector((state: any) => state?.auth?.credentials);

  // const payload = {
  //   locationId: locationid,
  //   type: "MEAL_TYPE",
  //   parentId: "",
  // };
  
  // useEffect(()=>{
  //   if(rotateImg)
  //   dispatch(fetchDropDownRequest(payload))
  // },[rotateImg])


  const allDay: any = []

  const allDayMealType = [
    ...new Set(
      options?.flatMap((option: any) =>
        option?.availabilities?.filter((a: any) => {
          if(a?.weekDay === 'All'){
            a?.sessions?.map((session: any) => {
              allDay?.push(session?.mealType)
            })
          }
        })
      )
    ),
  ];

  const mealTypes = (itemcustomization || thirdParty)
  ? options
  : isOptionTrue
    ? [...new Set(allDay)]
    : [
        ...new Set(
          options?.flatMap((option: any) =>
            option?.availabilities?.flatMap((availability: any) =>
              availability?.sessions?.map((session: any) => session?.mealType) || []
            ) || []
          ) || []
        ),
      ];

  return (
    <div className="dropdown-containerPricing" ref={dropdownRef} style={{opacity:EnabledOrNot ? "100%" : "60%"}}>
      <label className="droplabelPricing" style={{color:color?`${color}`:"#666666"}}>{label}</label>
      <div
        className="dropdownPricingList"
        style={{ width: width === "Drop1" ? "300px" : "100px" }}
        onClick={handleDropdownClick}
        tabIndex={0}
      >
        {Array.isArray(selectedValues) && selectedValues.length > 0 ? (
          <div className="valuePricing">
            {selectedValues.slice(0, 3).join(", ")}
          </div>
        ) : (
          <div className="valuePlaceholder">
            {placeHolder === "Third Party" ? "Third Party" : ""}
          </div>
        )}

        <div>
          <img
            src={UpArrow}
            className={rotateImg ? "arrowrotatePricing" : "arrowdropPricing"}
            alt="arrow"
          />
        </div>
      </div>

      {isOpen && (
        <div className = {zIndex ? "optionsPricingz" : "optionsPricing"}>
          {mealTypes?.length > 0 ? (
            mealTypes?.map((option: any, index: any) => (
              <label key={index} 
                style={
                  {
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    gap:"10px",
                    cursor:"pointer"
                  }
                }>
                 <input
                    type="checkbox"
                    name={option}
                    className="checkboxPricing"
                    value={option}
                    checked={selectedValues.includes(option)}
                    onBlur={onBlur}
                    onChange={handleOptionClick}
                    style={{ marginBottom: streams ? "0.3rem" : "" }}
                  />

                <p style={
                    {
                      marginTop:streams ? "-0.5rem" : "", 
                      marginBottom:streams ? "0.3rem" : ""
                    }
                  }>
                    {option}
                  </p>
              </label>
            ))
          ) : (
            <div className="No-Option-Availble-dropdown" style={{zIndex:"2"}}>
              No options available
            </div>
          )}
        </div>
      )}

      {!validation?.isValid && (
        <p style={{ color: "red", fontSize: "0.75rem", fontWeight: "500" }}>
          {validation?.errorMessage}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
