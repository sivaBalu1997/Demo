import React, { useRef, useState, useEffect } from "react";
import "./DropDownList.scss";
import edit from "../../../assets/images/edit copy.png";
import dropdown from "../../../assets/images/dropdown.png";
import { FieldError } from "react-hook-form";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDropDowRequest,
  deleteDropDowRequest,
  fetchDropDownRequest,
} from "redux/productCatalog/productCatalogActions";
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
  onToggle: () => void;
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  resetSelection?: any;
}

const DropDownList: React.FC<DropdownProps> = ({
  name,
  options,
  type = "checkbox",
  register,
  setValue,
  error,
  id,
  setOptions,
  validation,
  trigger,
  dropdownopen,
  onToggle,
  getValues,
  addNew,
  editValues,
  setDropdownOpen,
  dropDownType,
  actionToDispatch,
  resetSelection,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [Disablesubcategory, setDisablesubcategory] = useState<boolean>(false);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showselectedOption, setShowselectedOption] = useState<boolean>(true);

  const dispatch = useDispatch();

  const locationid = useSelector(
    (state: any) => state.auth.credentials.locationId
  );

  const subsectiondata = useSelector(
    (state: any) => state.productCatalog.cuisineData.data
  );

  const deleteApicall = useSelector(
    (state: any) => state.productCatalog.deletesubsectionsuccess
  );

  //  console.log("subsectiondata",subsectiondata);
  // console.log("deleteApicall",deleteApicall);

  const getdatafrosaga = () => {
    dispatch(fetchDropDownRequest(payload));
  };

  const clearSelection = () => {
    setSelectedOptions([]);
  };

  useEffect(() => {
    if (resetSelection) {
      resetSelection.current = clearSelection;
    }
  }, [resetSelection]);

  const initialOptions = Array.isArray(options)
    ? options.map((elem: any) => elem.name)
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen({
          dietaryType: false,
          cuisine: false,
          mealType: false,
          bestPair: false,
          category: false,
          subCategory: false,
        });
        setAddNewButton(false);
        setEditList(false);
        setShowselectedOption(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen]);

  useEffect(() => {
    if(dropDownType!=="SUB_CATEGORY")
    {
      dispatch(fetchDropDownRequest(payload));


    }
  }, [dropDownType]);

  const handleOptionMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (dropDownType) {
      // getdatafrosaga();
    }
  };

  const [SubcategoryId, setSubCategoryId]=useState<string>("")

  useEffect(() => {
    const categoryValue = getValues("category");
    if (!categoryValue) {
      setDisablesubcategory(true);
    } else {
      setDisablesubcategory(false);
    }
  }, [getValues]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // If there is text in the search term, ensure the dropdown is open
    if (e.target.value !== "") {
      if (!dropdownopen) {
        onToggle(); // Open the dropdown
      }
      setShowselectedOption(false);
    } else {
      setShowselectedOption(true);
      // Optionally close the dropdown if the search term is empty
      if (dropdownopen) {
        onToggle(); // Close the dropdown
      }
    }
  };

  // useEffect(() => {
  //   const initialSelectedValue = getValues(name);
  //   if (initialSelectedValue) {
  //     const selectedOptionIds = initialSelectedValue
  //       .split(", ")
  //       .map((value: string) => {
  //         if (Array.isArray(initialOptions)) {
  //           return initialOptions.find((opt) => opt.name === value);
  //         }
  //       });
  //     const validOptions = selectedOptionIds.filter(Boolean) as Option[];
  //     setSelectedOptions(validOptions);

  //     setValue(name, validOptions.map((opt) => opt.name).join(", "));
  //   }
  // }, [getValues(name), setValue, initialOptions]);

  const handleSelect = (option: Option) => {
    if (type === "checkbox") {
      const isAlreadySelected = selectedOptions.some(
        (opt) => opt.id === option.id
      );

      if (isAlreadySelected) {
        const updatedOptions = selectedOptions.filter(
          (opt) => opt.id !== option.id
        );
        setSelectedOptions(updatedOptions);
        setValue(
          name,
          updatedOptions.map((opt) => opt.name)
        );
      } else {
        const updatedOptions = [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
        setValue(
          name,
          updatedOptions.map((opt) => opt.name)
        );
        trigger(name);
      }
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
      trigger(name);
    }

    if(dropDownType==="CATEGORY")
    {
      const viewdata={
        locationId: locationid,
        type: "SUB_CATEGORY",
        parentId: option.id,
        }
        console.log("SubcategoryId",SubcategoryId);
        
    
        if(SubcategoryId )
        {
          dispatch(fetchDropDownRequest(viewdata));
        }
       
    }

   
    

    setSearchTerm("");
  };

  const payload = {
    locationId: locationid,
    type: dropDownType,
    parentId: "",
  };

  const filteredOptions = Array.isArray(initialOptions)
    ? initialOptions.filter((option) =>
        option?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      )
    : [];
  const handleNewItemAddition = () => {
    setAddNewButton((prevAddNew) => !prevAddNew);
  };

  const handleedit = () => {
    setEditList((prevEditList) => !prevEditList);
  };

  const handledeletion = (value: string) => {
    // setSelectedOptions((prev) => prev.filter((opt) => opt.id !== value));
    setOptions((item: any) => item.filter((opt: any) => opt.id !== value));
    const deletedItem = {
      id: value,
      type: dropDownType,
    };

    const viewdata = {
      locationId: locationid,
      type: dropDownType,
      parentId: SubcategoryId && SubcategoryId,
    };

    if (deletedItem) {
      dispatch(deleteDropDowRequest(deletedItem));

      if (deleteApicall === "success") {
        dispatch(fetchDropDownRequest(viewdata));
      }
    }
  };

  // const handleBlur = () => {
  //   trigger(name);
  // };
  // value={type === "checkbox"
  //   ? selectedOptions.map((opt) => opt.name).join(", ")
  //   : selectedOptions[0]?.name || ""}

  const handleCheckboxChange = (option: Option) => {
    if (type == "checkbox") {
      setSelectedOptions((prevSelected) => {
        if (prevSelected.some((opt) => opt.id === option.id)) {
          setValue(name, selectedOptions.map((opt) => opt.name).join(", "));

          return prevSelected.filter((opt) => opt.id !== option.id);
        } else {
          // If not selected, add it
          return [...prevSelected, option];
        }
      });
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
      trigger(name);
    }
    if(dropDownType==="CATEGORY")
    {
      
      setSubCategoryId(option.id);
    }
  };

  const handleNewItemAdd = () => {
    const newValue = NewItemref?.current?.value;

    const newItem = {
      locationId: locationid,
      name: newValue,
      type: dropDownType,
      parentId: SubcategoryId && SubcategoryId,
    };
    setOptions([
      ...(Array.isArray(initialOptions) ? initialOptions : []),
      newItem,
    ]);

    // handleSelect(newItem);
    setSearchTerm("");
    setAddNewButton(false);
    const viewdata = {
      locationId: locationid,
      type: dropDownType,
      parentId: SubcategoryId && SubcategoryId,
    };
    if (addNewButton && newItem) {
      dispatch(addDropDowRequest(newItem));
      dispatch(fetchDropDownRequest(viewdata));
    }
  };

  const [Loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (!options) {
      setLoading(true);
    } else {
      setLoading(false);
    }

  },[options])
 
  const handleAboveArrowdropdown=()=>{
    onToggle();
    setShowselectedOption(true);
    if(dropDownType!=="SUB_CATEGORY")
      {
        dispatch(fetchDropDownRequest(payload));
      }

  }
 const handleBelowArrowdropdown=()=>{
  onToggle();
  setShowselectedOption(false);
  if(dropDownType!=="SUB_CATEGORY")
  {
    dispatch(fetchDropDownRequest(payload));
  }
}
  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div className="dropDownBox">
        <div>
          <input
            type="text"
            {...register(name, validation)}
            value={
              searchTerm === "" && showselectedOption
                ? type === "checkbox"
                  ? selectedOptions.map((opt) => opt.name).join(", ")
                  : selectedOptions[0]?.name || ""
                : searchTerm
            }
            onChange={handleSearch}
            name={name}
            // onBlur={handleBlur}
            autoComplete="off"
            className={`dropdown-search ${
              Disablesubcategory && name === "subCategory"
                ? "subCategorysearch disabled"
                : ""
            }`}
            disabled={Disablesubcategory && name === "subCategory"}
          />
          <span className="dropdown-arrow" onMouseDown={handleOptionMouseDown}>
            {dropdownopen ? (
              <img
                src={dropdown}
                onClick={() => {
                  handleAboveArrowdropdown()

                }}
                alt="dropdown"
                className="dropdownimageclosed"
              />
            ) : (
              <img
                src={dropdown}
                onClick={() => {
                  handleBelowArrowdropdown()
                 
                }}
                alt="dropdown"
                className="dropdownimageopen"
              />
            )}
          </span>
        </div>

        <div>
          {error && <p className="Dropdown-Error-message">{error.message}</p>}
        </div>
      </div>

      {dropdownopen && (
        <div className="dropdown-body">
          <div className="Dropdown-lists-and-edit">
            <ul
              className="dropdown-options"
              onMouseDown={handleOptionMouseDown}
            >
              {Loading ? (
                <div className="dropdown-no-options">Loading</div>
              ) : (
                <div>
                  {!Loading && options?.length > 0 ? (
                    options?.map((option, index) => {
                      const isOptionSelected = options.some(
                        (opt) => opt?.id === option?.id
                      );

                      return (
                        <div className="dropdown-option-list" key={index}>
                          <li className="dropdown-option">
                            <input
                              type={type}
                              checked={selectedOptions.some(
                                (opt) => opt.id === option.id
                              )}
                              className="dropdon-option-inputfield"
                              onChange={() => handleCheckboxChange(option)}
                            />
                            <span
                              className="dropdon-option-label"
                              onClick={() => handleSelect(option)}
                            >
                              {option.name}
                            </span>
                          </li>
                          <div>
                            {editList && (
                              <span
                                className={`dropdown-option-delete `}
                                // ${
                                //   isOptionSelected ? "disabled-delete" : ""
                                // }
                                onClick={() => handledeletion(option.id)}
                                // style={
                                //   isOptionSelected
                                //     ? { pointerEvents: "none" }
                                //     : {}
                                // }
                              >
                                -Delete
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <li className="dropdown-no-options">No options found</li>
                  )}
                </div>
              )}
            </ul>
            <div className="edititem">
              {options?.length > 0 && !editList && editValues && (
                <p
                  className="editiconimage"
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
              className="dropdown-Addbutton"
              onMouseDown={handleOptionMouseDown}
            >
              {addNew && addNewButton && (
                <div className="dropdown-addnew">
                  <div className="dropdown-addnew-input-and-button">
                    <input
                      type="text"
                      ref={NewItemref}
                      className="dropdown-addnew-input-filed"
                    />
                    <button
                      type="button"
                      onClick={handleNewItemAdd}
                      className="dropdown-addnew-button"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="Addnew-edit-fields">
                <div className="dropdown-edit-button">
                  {editList && editValues && !addNewButton && (
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        handleedit();
                      }}
                      className="dropdown-edit-done"
                    >
                      Done
                    </p>
                  )}
                </div>
                {!Loading && addNew && !addNewButton && (
                  <button
                    className="dropdown-addbutton"
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
      )}
    </div>
  );
};

export default DropDownList;
