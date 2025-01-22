import React, { useRef, useState, useEffect } from "react";
import "./DropDownList.scss";
import edit from "../../../assets/images/edit copy.png";
import dropdown from "../../../assets/images/dropdown.png";
import { FieldError } from "react-hook-form";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import {
  addDropDowRequest,
  deleteDropDowRequest,
  fetchDropDownRequest,
} from "redux/productCatalog/productCatalogActions";
import { cuisine } from "assets/mockData/Moca_data";
import { iteratorSymbol } from "immer/dist/internal";
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
  onToggle: () => void;
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  resetSelection?: any;
  parentId?: any;
  bestpair?: boolean;
  errormsg?: string;
  valiadtesubCategory?: any;
  isTaxDropDown?: boolean;
  categoryChange?: any;
  setCategoryChange?: any;
  kitchenError?: boolean;
  height?: string;
  inputType?:string

}

const DropDownList: React.FC<DropdownProps> = ({
  name,
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
  errormsg,
  valiadtesubCategory,
  placeholder,
  isTaxDropDown,
  categoryChange,
  setCategoryChange,
  kitchenError,
  height,
  inputType
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [Disablesubcategory, setDisablesubcategory] = useState<boolean>(false);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showselectedOption, setShowselectedOption] = useState<boolean>(true);
  const [hasCleared, setHasCleared] = useState<boolean>(false);
  const [manuallyCleared, setManuallyCleared] = useState(false);
  const [manuallySelected, setManuallySelected] = useState(false);

  const dispatch = useDispatch();

  const editData = useSelector((state: any) => state.productCatalog.editData);

  const locationid = useSelector((state: any) => state.auth.selectedBranch?.id);

  const subsectiondata = useSelector(
    (state: any) => state.productCatalog?.cuisineData?.data
  );

  const deleteApicall = useSelector(
    (state: any) => state.productCatalog?.deletesubsectionsuccess
  );

  const ItemsPrimaryDetails = useSelector(
    (state: any) => state.primarypage.data
  );

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


    let subcategorydataforApi = {
      locationId: locationid,
      type: "SUB_CATEGORY",
      parentId: parentId,
    };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains("dropdown-search")
      ) {
        setDropdownOpen({
          DietaryType: false,
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
      
    // if (
    //   dropDownType === "CATEGORY" &&
    //   subcategorydataforApi.parentId !== ""
    // ) {
    //   dispatch(fetchDropDownRequest(subcategorydataforApi));
    // }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen]);

  const dropDownLoading = useSelector(
    (state: any) => state.productCatalog.dropDownLoading
  );

  const dropDownSuccess = useSelector(
    (state: any) => state.productCatalog.dropDownSuccess
  );

  useEffect(() => {
    if (ItemsPrimaryDetails && dropDownType === "SUB_CATEGORY") {
      setParentId(ItemsPrimaryDetails?.categoryId);
    }
  }, [ItemsPrimaryDetails]);

  const handleOptionMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (dropDownType) {
      // getdatafrosaga();
    }
  };

  const [SubcategoryParentId, setSubcategoryParentId] = useState<string>("");

  const filteredOptions = Array.isArray(options)
    ? options.filter((option) =>
        option?.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
      )
    : [];

  const categoryValue = getValues("category");

  useEffect(() => {
    if (categoryValue !== "") {
      setDisablesubcategory(true);
    } else {
      setDisablesubcategory(false);
    }
  }, [categoryValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setManuallyCleared(true);
      setShowselectedOption(true);

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

  

  const prizingDetail = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData || {}
  );

  useEffect(() => {
    if (
      !manuallySelected &&
      ItemsPrimaryDetails?.DietaryType &&
      name === "DietaryType"
    ) {
      const dietName = ItemsPrimaryDetails?.DietaryType;

      const normalizedDietName = Array.isArray(dietName)
        ? dietName.map((d) =>
            typeof d === "string" ? { name: d } : { name: d.name }
          )
        : dietName.split(",").map((d: any) => ({ name: d.trim() }));

      const dropdownName = (options || normalizedDietName)?.filter((opt) => {
        return normalizedDietName.some((d: any) => d.name === opt?.name);
      });

      const dropDown1 =
        dropdownName?.length === 0 ? normalizedDietName : dropdownName;

      setSelectedOptions(dropDown1);
      setValue(
        "DietaryType",
        dropDown1?.map((opt: any) => opt?.name)
      );
    }
  }, [ItemsPrimaryDetails, options, name, setValue]);

  useEffect(() => {
    if (!manuallySelected && ItemsPrimaryDetails?.bestPair && name === "bestPair") {
      const bestPairName = ItemsPrimaryDetails?.bestPair;

      const normalizedBestPair = Array.isArray(bestPairName)
        ? bestPairName.map((b) =>
            typeof b === "string" ? { name: b } : { name: b.name }
          )
        : bestPairName.split(",").map((b: any) => ({ name: b.trim() }));

      const dropdownOptions = options || normalizedBestPair;

      const dropdownName = dropdownOptions?.filter((opt) => {
        return normalizedBestPair.some((b: any) => b.name === opt?.name);
      });

      // Update state and form values
      setSelectedOptions(dropdownName);
      setValue(
        "bestPair",
        dropdownName?.map((opt) => opt?.name)
      );
    }
  }, [ItemsPrimaryDetails, options, name, setValue]);

  useEffect(() => {
    if (name === "tax" && filteredOptions?.length === 1) {
      const option = filteredOptions[0];
      setSelectedOptions([option]);
      setValue("tax", option.name);
      getValues("2111", "tax");
      trigger(name);
    }
  }, [ItemsPrimaryDetails, isTaxDropDown]);

  const categoryData = useSelector(
    (state: any) => state.productCatalog.categoryData.data
  );

  useEffect(() => {
    if (prizingDetail && name === "kitchenstation") {
      const kitchenStationName = prizingDetail?.kitchenstation;

      const dropDownName: any =
        Array.isArray(options) &&
        options?.find(
          (item) =>
            item.name?.toLowerCase() === kitchenStationName?.toLowerCase()
        );
      const dropDown1 =
        dropDownName === undefined || dropDownName === false
          ? { name: prizingDetail?.kitchenstation, id: "1" }
          : dropDownName;

      setSelectedOptions(() => {
        // setValue(
        //   "kitchenstation",
        //   dropDownName === undefined || dropDownName === false
        //     ? dropDown1?.name
        //     : dropDownName?.name
        // );

        // typeof(kitchenStationName) === 'string' && setValue("kitchenstation", kitchenStationName)

        return dropDownName === undefined || dropDownName === false
          ? [dropDown1]
          : [dropDownName];
      });
    }
  }, [prizingDetail]);

  useEffect(() => {
    if (ItemsPrimaryDetails?.cuisine && name === "cuisine") {
      const cusineName = ItemsPrimaryDetails?.cuisine;
      const dropDownName: any = options?.find(
        (item) => item.name === cusineName
      );
      const dropDown1 =
        dropDownName === undefined
          ? { name: ItemsPrimaryDetails?.cuisine, id: "1" }
          : dropDownName;

      setSelectedOptions(
        dropDownName === undefined ? [dropDown1] : [dropDownName]
      );
      setValue(
        "cuisine",
        dropDownName === undefined ? dropDown1?.name : dropDownName?.name
      );
    }
  }, [ItemsPrimaryDetails]);

  useEffect(() => {
    if (ItemsPrimaryDetails?.category && name === "category") {
      const categoryName = ItemsPrimaryDetails?.category;
      const dropDownName: any = options?.find(
        (item) => item?.name === categoryName
      );
      const dropDown1 =
        dropDownName === undefined
          ? { name: ItemsPrimaryDetails?.category, id: "1" }
          : dropDownName;
      setSelectedOptions(
        dropDownName === undefined ? [dropDown1] : [dropDownName]
      );
      setValue(
        "category",
        dropDownName === undefined ? dropDown1?.name : dropDownName?.name
      );
      setParentId(ItemsPrimaryDetails?.categoryId);
    }
  }, [ItemsPrimaryDetails]);

  useEffect(() => {
    if (ItemsPrimaryDetails?.subCategory && name === "subCategory") {
      const subCategoryName = ItemsPrimaryDetails?.subCategory;

      const dropDownName: any = options?.find(
        (item) => item.name === subCategoryName
      );
      const dropDown1 =
        dropDownName === undefined
          ? { name: ItemsPrimaryDetails?.subCategory, id: "1" }
          : dropDownName;

      setSelectedOptions(
        dropDownName === undefined ? [dropDown1] : [dropDownName]
      );
      setValue(
        "subCategory",
        dropDownName === undefined ? dropDown1?.name : dropDownName?.name
      );
    }
  }, [ItemsPrimaryDetails]);

  const handleSelect = (option: Option) => {
    const currentSelectedOptions = Array.isArray(selectedOptions)
      ? selectedOptions
      : [];

    setManuallySelected(true);


   

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
        trigger(name);
      } else {
        if (currentSelectedOptions.length >= 5) {
          return;
        }

        const updatedOptions = [...currentSelectedOptions, option];

        setSelectedOptions(updatedOptions);
        setValue(
          name,
          updatedOptions.map((opt) => opt?.name)
        );
        trigger(name);
      }
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
      trigger(name);
      subcategorydataforApi.parentId=option?.id

      // if (dropDownType === "CATEGORY") {
      //   setParentId(option?.id);
      //   setValue("subCategory", "");
      // }
      if (dropDownType === "CATEGORY") {
        let subcategorydatapayload = {
          locationId: locationid,
          type: "SUB_CATEGORY",
          parentId: option?.id,
        };

        // dispatch(fetchDropDownRequest(subcategorydataforApi));
        if (parentId === option?.id) {
          setCategoryChange(false);
        } else {
          setParentId(option?.id);
          setCategoryChange(true);
        }
        setValue("subCategory", "");
      }
    }

    if (dropDownType === "SUB_CATEGORY") {
      valiadtesubCategory();
    }

    setSearchTerm("");
    setManuallyCleared(false);
  };

  const handleCheckboxChange = (option: Option) => {
    if (type === "checkbox") {
      setSelectedOptions((prevSelected) => {
        const isAlreadySelected = prevSelected?.findIndex(
          (opt) => opt.id === option.id
        );

        let updatedSelected;
        setManuallySelected(true);

        if (isAlreadySelected !== -1) {
          updatedSelected = prevSelected?.filter(
            (_, index) => index !== isAlreadySelected
          );
        } else {
          if (bestpair && prevSelected.length >= 5) {
            return prevSelected;
          }
          updatedSelected = [...prevSelected, option];
        }

        setValue(name, updatedSelected?.map((opt) => opt.name).join(", "));
        trigger(name);

        return updatedSelected;
      });
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
      trigger(name);
      if (dropDownType === "CATEGORY") {
        if (parentId === option?.id) {
          setCategoryChange(false);
        } else {
          setParentId(option?.id);
          setCategoryChange(true);
        }
        setValue("subCategory", "");
      }
    }
  };

  useEffect(() => {
    if (!dropdownopen) {
      setSearchTerm("");
      searchTerm === "" && setShowselectedOption(true);
    }
  }, [dropdownopen]);

  useEffect(() => {
    if (dropDownType === "SUB_CATEGORY" && categoryChange) {
      setCategoryChange(false);
      setSelectedOptions([]);
    }
  }, [parentId, categoryChange]);

  const payload = {
    locationId: locationid,
    type: dropDownType,
    parentId: "",
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

    const deletedItem = {
      id: value,
      type: dropDownType,
      locationid: locationid,
    };

    const viewdata = {
      locationId: locationid,
      type: dropDownType,
      parentId: SubcategoryParentId && SubcategoryParentId,
    };

    const deletedSubCategory = {
      id: value,
      type: dropDownType,
      locationid: locationid,
      parentId: parentId && parentId,
    };

    if (deletedItem) {
      if (dropDownType !== "SUB_CATEGORY") {
        dispatch(deleteDropDowRequest(deletedItem));
      } else {
        dispatch(deleteDropDowRequest(deletedSubCategory));
      }

      const data = selectedOptions.filter((item) => item.id != value);
      setSelectedOptions([...data]);
    }
  };

  const handleNewItemAdd = () => {
    const newValue = NewItemref?.current?.value;

    const newItem = {
      locationId: locationid,
      name: newValue,
      type: dropDownType,
      parentId: dropDownType === "SUB_CATEGORY" ? parentId : "",
    };

    setOptions([
      ...(Array.isArray(initialOptions) ? initialOptions : []),
      newItem,
    ]);

    setSearchTerm("");
    setAddNewButton(false);
    const viewdata = {
      locationId: locationid,
      type: dropDownType,
      parentId: SubcategoryParentId && SubcategoryParentId,
    };
    if (addNewButton && newItem) {
      dispatch(addDropDowRequest(newItem));
      // dispatch(fetchDropDownRequest(viewdata));
    }
  };

  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (options?.length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [options]);

  const handleAboveArrowdropdown = () => {
    onToggle();
   
    // if (
    //   dropDownType === "CATEGORY" &&
    //   subcategorydataforApi.parentId !== ""
    // ) {
    //   dispatch(fetchDropDownRequest(subcategorydataforApi));
    // }
    setShowselectedOption(true);
    // if (dropDownType !== "SUB_CATEGORY") {
    //   dispatch(fetchDropDownRequest(payload));
    // }

    // if (subcategorydataforApi.parentId !== "" ) {
    //   console.log('Sub called')
    //   dispatch(fetchDropDownRequest(subcategorydataforApi));
    // }
  };

  const handleBelowArrowdropdown = () => {
    onToggle();
    setShowselectedOption(false);
    setManuallyCleared(false);

    if (dropDownType !== "SUB_CATEGORY" && name !== "subCategory") {
      dispatch(fetchDropDownRequest(payload));
    }

    if (
      dropDownType === "SUB_CATEGORY" &&name === "subCategory"&&
      subcategorydataforApi.parentId !== ""
    ) {
      dispatch(fetchDropDownRequest(subcategorydataforApi));
    }
  };
  const handleOpenDropdown=()=>{

    if(!dropdownopen)
    {
      onToggle();
    }

    

  }

  console.log("kk", kitchenError);
  

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div className="dropDownBox">
        <div>
          <input
            placeholder={
              (name === "kitchenstation" ? "Kitchen station*" : "") ||
              (name === "tax" ? placeholder : "")
            }
            type="text"
            {...register(name, validation)}
            value={
              searchTerm !== ""
                ? searchTerm
                : showselectedOption
                ? type === "checkbox"
                  ? selectedOptions?.map((opt) => opt?.name)?.join(", ")
                  : selectedOptions[0]?.name || ""
                : ""
            }
            maxLength={inputType==="Number"&&4}
            onChange={(e) => {
              if (dropdownopen) {
                handleSearch(e);
              }
            }}
            onClick={()=>handleOpenDropdown()}
            name={name}
            // onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !dropdownopen) {
                e.preventDefault();
              }
            }}
            autoComplete="off"
            className={`dropdown-search ${
              !Disablesubcategory && name === "subCategory"
                ? "subCategorysearch disabled"
                : ""
            }`}
            disabled={!Disablesubcategory && name === "subCategory"}
          />
          <span className="dropdown-arrow" onMouseDown={handleOptionMouseDown}>
            {dropdownopen ? (
              <img
                src={dropdown}
                onClick={() => {
                  handleAboveArrowdropdown();
                }}
                alt="dropdown"
                className="dropdownimageclosed"
              />
            ) : (
              <img
                src={dropdown}
                onClick={() => {
                  if (
                    (name !== "subCategory" && !Disablesubcategory) ||
                    ((name === "category" ||
                      name === "subCategory" ||
                      name === "cuisine" ||
                      name === "bestPair" ||
                      name === "DietaryType" ||
                      name === "tax" ||
                      name === "kitchenstation") &&
                      Disablesubcategory)
                  ) {
                    handleBelowArrowdropdown();
                  }
                }}
                alt="dropdown"
                className="dropdownimageopen"
              />
            )}
          </span>
        </div>

        <div style={{ margin: 0 }}>
          {errormsg ? (
            <p className="Dropdown-Error-message">{errormsg}</p>
          ) : (
            error && <p className="Dropdown-Error-message">{error.message}</p>
          )}
        </div>

        <div style={{ margin: 0 }}>
          {dropDownType === "KITCHEN_STATION" &&
            (selectedOptions[0]?.name === undefined||selectedOptions[0]?.name === '' ) &&
            (kitchenError) && (
              <p className="Dropdown-Error-message">
                Kitchen Station is required
              </p>
            )}
        </div>
      </div>

      {dropdownopen && (
        <div
          className="dropdown-body"
          style={{ height: height ? height : "10.8rem" }}
        >
          <div className="dropdown-lists-edit">
            <div
              className="Dropdown-lists-and-edit"
              style={{overflowY:filteredOptions?.length>=3?"scroll":"hidden"}}
              onMouseDown={handleOptionMouseDown}
            >
              <ul
                className="dropdown-options"
                onMouseDown={handleOptionMouseDown}
              >
                {dropDownLoading ? (
                  <div className="dropdown-no-options">
                    <Loader
                      className="imgLoader1"
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
                    {filteredOptions?.length > 0 ? (
                      filteredOptions?.map((option, index) => {
                        return (
                          <div className="dropdown-option-list" key={index}>
                            <li className="dropdown-option">
                              <input
                                type={type}
                                checked={selectedOptions?.some(
                                  (opt) => opt?.id === option?.id
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
                                  className={`dropdown-option-delete`}
                                  onClick={() =>
                                    option?.canDelete
                                      ? handledeletion(option.id)
                                      : null
                                  }
                                  style={
                                    !option?.canDelete
                                      ? {
                                          pointerEvents: "none",
                                          opacity: "50%",
                                        }
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
                        searchTerm == ""
                          ? name === "kitchenstation"
                            ? false
                            : Loading
                          : true
                      ) ? (
                      <div className="dropdown-no-options">
                        No options available
                      </div>
                    ) : (
                      <div className="dropdown-no-options">
                        <Loader
                          className="imgLoader1"
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
                    )}
                  </div>
                )}
              </ul>
            </div>
            <div className="edititem" onMouseDown={handleOptionMouseDown}>
              {!dropDownLoading &&
                options?.length > 0 &&
                !editList &&
                editValues && (
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
              className="dropdown-Addbutton-add"
              onMouseDown={handleOptionMouseDown}
            >
              <div className="">
                {addNew && addNewButton && (
                  <div className="dropdown-input-and-addnewbtn">
                    <div className="addnew-open-dropdown">
                      <div>
                        <input
                          type="text"
                          ref={NewItemref}
                          maxLength={128}
                          className="dropdown-addnew-open-input"
                        />
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleNewItemAdd}
                          className="dropdown-addnew-button"
                          style={{ cursor: "pointer" }}
                        >
                          +Add
                        </button>
                      </div>
                    </div>
                  </div>

                  //   <div className="dropdown-addnew">
                  //     <div className="dropdown-addnew-input-and-button">
                  //   <input
                  //   type="text"
                  //   ref={NewItemref}
                  //   maxLength={128}
                  //   className="dropdown-addnew-open-input"
                  // />
                  //     <button

                  //       type="button"
                  //         onClick={handleNewItemAdd}
                  //         className="dropdown-addnew-button"

                  //        style={{cursor:"pointer"}}
                  //      >
                  //         +Add
                  //   </button>
                  //   </div>
                  //   </div>
                )}
              </div>

              <div className="Addnew-edit-fields dropdown-input-and-addnewbtn">
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
                <div>
                  {(!Loading || filteredOptions?.length === 0) &&
                    addNew &&
                    !addNewButton && (
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
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default DropDownList;
