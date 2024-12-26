import React, { useRef, useState, useEffect } from "react";
import "./Dropdown.scss";
import edit from "../../../assets/images/edit copy.png";
import dropdown from "../../../assets/images/dropdown.png";
import { FieldError } from "react-hook-form";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import {

  fetchDropDownRequest,
  fetchSubDropDownRequest,
} from "redux/offer/offerActions";
import { cuisine } from "assets/mockData/Moca_data";
interface media {
  imageId: string;
  imageType: string;
}
interface Option {
  id: string;
  name: string;
  locationId: string | null;
  type: string | null;
  parentId: string | null;
  canDelete: boolean;
}

interface DropdownProps {
  width?:string;
  setParentId?: any;
  name: string;
  id?: string;
  type?: "checkbox" | "radio";
  addNew: boolean;
  editValues: boolean;
  register: any;
  setValue: any;
  required?: boolean;
  options: Option[];
  setOptions: any;
  placeholder?: string;
  validation?: any;
  error?: FieldError;
  trigger: any;
  getValues: any;
  dropdownopen?: boolean;
  dropDownType?: string;
  actionToDispatch?: any;
  search?: boolean;
  onToggle: () => void;
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  resetSelection?: any;
  parentId?: any;
  bestpair?: boolean;
  setSubCatagoryId?:any
  setSelectedOptions:any
  selectedOptions:any
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  width,
  bestpair,
  options,
  type = "checkbox",
  register,
  setValue,
  error,
  id,
  setOptions,
  validation,
  trigger,
  placeholder,
  dropdownopen,
  onToggle,
  getValues,
  addNew,
  editValues,
  setDropdownOpen,
  dropDownType,
  actionToDispatch,
  resetSelection,
  setParentId,
  parentId,
  search,
  setSubCatagoryId,
  setSelectedOptions,
  selectedOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  //const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropDownLoading,setdropDownLoading] =useState(false)
  const [showselectedOption, setShowselectedOption] = useState<boolean>(true);
  const [hasCleared, setHasCleared] = useState<boolean>(false);
  const [manuallyCleared, setManuallyCleared] = useState(false);
  const [disabled,setDisabled] =useState(false)
  const dropdownLoading = useSelector((state: any) => state.offer.getSubCategoryLoading);
  const dropdownLoadingsuc = useSelector((state: any) => state.offer.getSubCategoryErrorMessage);

  console.log({dropdownLoadingsuc});
  
  const dispatch = useDispatch();

  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );


  const clearSelection = () => {
    setSelectedOptions([]);
  };
  useEffect(()=>{
    if(name=='subCategory' && parentId==''){
      setDisabled(true)
    }
    else{
      setDisabled(false)
    }
  },[parentId,name])

  useEffect(() => {
    if (resetSelection) {
      resetSelection.current = clearSelection;
    }
  }, [resetSelection]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen({
          channel: false,
         ordertype: false,
          terms: false,
         category: false,
         subCategory: false,
         fooditems: false,
        });
        setAddNewButton(false);
        setEditList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen])


  const handleOptionMouseDown = (event: React.MouseEvent) => {
    if(!disabled)
      {
    event.stopPropagation();
      }
  };

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
        option?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      )
    : [];

    const handleSelect = (option: Option) => {
      const currentSelectedOptions = Array.isArray(selectedOptions)
        ? selectedOptions
        : [];
    
      if (type === "checkbox") {
        const isAlreadySelected = currentSelectedOptions.some(
          (opt) => opt?.id === option?.id
        );
    
        if (isAlreadySelected) {
          const updatedOptions = currentSelectedOptions.filter(
            (opt) => opt.id !== option?.id
          );
          setSelectedOptions(updatedOptions);
          setValue(
            name,
            updatedOptions.map((opt) => opt?.name)
          );
          if(dropDownType === "SUB_CATEGORY")
            {
             setSubCatagoryId(updatedOptions.map((opt) => opt?.id));
            }
          trigger(name);
        } else {
         
          const updatedOptions = [...currentSelectedOptions, option];
          setSelectedOptions(updatedOptions);
          setValue(
            name,
            updatedOptions.map((opt) => opt?.name)
          );
          if(dropDownType === "SUB_CATEGORY")
            {
             setSubCatagoryId(updatedOptions.map((opt) => opt?.id));
            }
          trigger(name);
        }
        // setSearchTerm(
        //   [...currentSelectedOptions, option]
        //     .map((opt) => opt?.name)
        //     .join(", ")
        // );
      } else if (type === "radio") {
        setSelectedOptions([option]);
        setValue(name, option.name);
        trigger(name);
        if(dropDownType === "CATEGORY")
        {
          if(parentId!=option?.id){
            setParentId(option?.id);
            setSubCatagoryId([])
          }
         
        }
       // setSearchTerm(option.name); 
      }
    };
    

  const payload = {
    locationId: locationid,
    type: dropDownType,
    parentId: dropDownType === "CATEGORY"?null:parentId?parentId:null,
  };

  const handleNewItemAddition = () => {
    setAddNewButton((prevAddNew) => !prevAddNew);
  };

  const handleedit = () => {
    setEditList((prevEditList) => !prevEditList);
  };

  const handledeletion = (value: string) => {
    setOptions(
      (item: any) => item && item?.filter((opt: any) => opt.id !== value)
    );
  };

  const handleCheckboxChange = (option: Option) => {
    if (type === "checkbox") {
      setSelectedOptions((prevSelected:any) => {
        const isAlreadySelected = prevSelected?.findIndex(
          (opt:any) => opt.id === option.id
        );

        let updatedSelected;

        if (isAlreadySelected !== -1) {
          updatedSelected = prevSelected.filter(
            (_:any, index:any) => index !== isAlreadySelected
          );
        } else {
          if (bestpair && prevSelected.length >= 5) {
            return prevSelected;
          }
          updatedSelected = [...prevSelected, option];
        }

        setValue(name, updatedSelected.map((opt:any) => opt.name).join(", "));
        trigger(name);

        return updatedSelected;
      });
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
      trigger(name);
    }
  };

  const handleNewItemAdd = () => {
    const newValue:any = NewItemref?.current?.value;
  if(newValue === "" || newValue[0] !== " "){
    const newItem = {
      id:options?.length,
      locationId: '',
      name: newValue,
      type: dropDownType,
      parentId: parentId && parentId,
      canDelete: true,
    };

    setOptions((prev:any)=>([...prev,newItem]));
    setSearchTerm("");
    setAddNewButton(false);
  }
  
  };

  const [Loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (dropdownLoading &&(!options || options.length < 1)) {
      setLoading(true);
    } else {
      setLoading(false);
    }


    
  }, [options,dropdownLoading]);

  const handleAboveArrowdropdown = () => {
    if(!disabled)
    {
    onToggle();
    }
  };

  const handleBelowArrowdropdown = () => {
    if(!disabled)
      {
    if(name=="category" ){
      dispatch(fetchDropDownRequest(payload));
    }
    if(name=='subCategory')
    {
      dispatch(fetchSubDropDownRequest(payload));
    }
    onToggle();
  }
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value === "") {
      setManuallyCleared(true);
      setShowselectedOption(false);
  
      if (type === "checkbox") {
        setSelectedOptions([]);
        setValue(name, []);
        trigger(name);
      } else if (type === "radio") {
        setSelectedOptions([]);
        setValue(name, "");
        trigger(name);
      }
  
      if (dropdownopen) {
        onToggle();
      }
    } else {
      setManuallyCleared(false);
      if (!dropdownopen) {
        onToggle();
      }
      setShowselectedOption(false);
    }
  
    setOptions(filteredOptions);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !searchTerm) {
      setShowselectedOption(false);
      setSelectedOptions([]);
  
      if (type === "checkbox") {
        setValue(name, []);
      } else if (type === "radio") {
        setValue(name, "");
      }
  
      trigger(name);
    }
  };
  














  const editOfferData = useSelector(
    (state: any) => state.offer.editSpData
  );

  useEffect(() => {
    if (
      editOfferData?.channel?.length > 0 &&
      name === "offerChannel"
    ) {
      const dietName = editOfferData?.channel;

     

     
      setSelectedOptions(dietName);
      setValue(
        "offerChannel",
        dietName
      );
    }
  }, [editOfferData]);


  return (
    <div className="sPdropdown-component" ref={dropdownRef}>
      <div className="sPdropDownBox">
        <div>
          <input
            style={{ width: width, height: "44px" }}
            placeholder={placeholder}
            type="text"
            {...register(name, validation)}
            value={
              dropdownopen
                ? searchTerm
                : type === "checkbox"
                ? selectedOptions?.map((opt:any) => opt?.name)?.join(", ")
                : selectedOptions[0]?.name || ""
            }
            onChange={search ? handleSearch : undefined}
            onKeyDown={handleKeyDown}
            name={name}
            autoComplete="off"
            className={`cPdropdown-search`}
            disabled={disabled}
          />

          <span className="cPdropdown-arrow"  onMouseDown={handleOptionMouseDown}>
            {dropdownopen ? (
              <img
                src={dropdown}
                onClick={() => {
                  handleAboveArrowdropdown();
                }}
                alt="dropdown"
                className="cPdropdownimageclosed"
              />
            ) : (
              <img
                src={dropdown}
                onClick={() => {
                  handleBelowArrowdropdown();
                  setSearchTerm('')
                }}
                alt="dropdown"
                className="cPdropdownimageopen"
              />
            )}
          </span>
        </div>

        <div className="errorContainer">
          {error && <p className="cPDropdown-Error-message">{error.message}</p>}
        </div>
      </div>

      {dropdownopen && (
        <div className="cPdropdownBodyContainer">
          <div className="cPdropdownbody">
            <div className="cPDropdown-lists-and-edit">
              <ul
                className="cPdropdown-options"
                onMouseDown={handleOptionMouseDown}
              >
                {Loading&&dropDownType!=="termsAndConditions" ? (
                  <div className="cPdropdown-no-options">
                    <Loader
                      className="cPimgLoader1"
                      height="300px"
                      width="300px"
                      style={{
                        filter:
                          "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
                        height: "70px",
                        width: "70px",
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    {!Loading && filteredOptions?.length > 0 ? (
                      filteredOptions?.map((option, index) => {
                        return (
                          <div className="cPdropdown-option-list" key={index}>
                            <li className="cPdropdown-option">
                              <input
                                type={type}
                                checked={selectedOptions?.some(
                                  (opt:any) => opt?.id === option?.id
                                )}
                                className="cPdropdon-option-inputfield"
                                onChange={() => handleSelect(option)}
                              />
                              <span
                                className="cPdropdon-option-label"
                                onClick={() => handleSelect(option)}
                              >
                                {option.name}
                              </span>
                            </li>
                            <div>
                              {editList && (
                                <span
                                  className={`cPdropdown-option-delete `}
                                  onClick={() =>
                                    option?.canDelete
                                      ? handledeletion(option.id)
                                      : null
                                  }
                                  style={
                                    !option?.canDelete
                                      ? { pointerEvents: "none", opacity: "50%" }
                                      : {}
                                  }
                                >
                                  -Delete
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <li className="cPdropdown-no-options-msg">No options found</li>
                    )}
                  </div>
                )}
              </ul>
              <div className="cPedititem">
                {!dropDownLoading &&
                  options?.length > 0 &&
                  !editList &&
                  editValues && (
                    <p
                      className="cPediticonimage"
                      onMouseDown={handleOptionMouseDown}
                      onClick={() => handleedit()}
                      // style={{position:'relative',left:'-2rem'}}
                    >
                      Edit
                    </p>
                  )}
              </div>
            </div>

            {
              <div
                className="cPdropdown-Addbutton"
                onMouseDown={handleOptionMouseDown}
              >
                {addNew && addNewButton && (
                  <div className="cPdropdown-addnew">
                    <div className="cPdropdown-addnew-input-and-button">
                      <input
                        type="text"
                        ref={NewItemref}
                        className="cPdropdown-addnew-input-filed"
                      />
                      <button
                        type="button"
                        onClick={handleNewItemAdd}
                        className="cPdropdown-addnew-button"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                <div className="cPAddnew-edit-fields">
                  <div className="cPdropdown-edit-button">
                    {editList && editValues && !addNewButton && (
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          handleedit();
                        }}
                        className="cPdropdown-edit-done"
                      >
                        Done
                      </p>
                    )}
                  </div>
                  {(!Loading || filteredOptions?.length === 0) &&
                    addNew &&
                    !addNewButton && (
                      <button
                        className="cPdropdown-addbutton"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNewItemAddition();
                        }}
                      >
                        Add new
                      </button>
                    )}
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;