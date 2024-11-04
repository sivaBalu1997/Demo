import React, {
  useState,
  useEffect,
  ChangeEvent,
  useContext,
  useRef,
} from "react";
import "./ItemCustomizations.scss";
import dotted from "../../../assets/images/dotted.png";
import Toggle from "../../../components/productCatalog/Toggle/Toggle";
import Polygon1 from "../../../assets/images/Polygon 1.png";
import NotFound from "../../../assets/svg/NotFound copy.svg";

import Polygon2 from "../../../assets/images/Polygon 2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteModifierRequest,
  getModifierRequest,
  itemCustomizationPost,
  updateModifierData,
} from "../../../redux/productCatalog/productCatalogActions";
import Serachicon from "../../../assets/images/searchicon.png";
import DropDown3 from "../../../components/productCatalog/DropDownItem/DropDownItem";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import SaveAndNext from "components/productCatalog/Savenextbutton/SaveAndNext";
import SidePanel from "pages/SidePanel";
import { Contextpagejs } from "../contextpage";
import Dropdown from "components/productCatalog/DropDown/Dropdown";
import { RootState } from "redux/rootReducer";
import { stat } from "fs";
import { tr } from "date-fns/locale";

// Define types
interface Option {
  modifierOptionName: string;
  modifierName?: any;
  cost: number;
  item?: string;
  sellPrice?: any;
}

interface Modifier {
  field1: number;
  field2: number;
  // Other fields...
}
interface ModificationError {
  options?: Option[];
  modifierName?: number;
}

const index = 0;

const modificationError: ModificationError[] = [];

const modIndex = 0;
const optIndex = 0;

interface Modification {
  id?: string;
  modifierName: string;
  modifierOptions: Option[];
  modifierOptionName: any;
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

interface State {
  itemCustomizationsReducer1: {
    itemData: Modification[];
  };
}

const ItemCustomizations: React.FC = () => {
  const dispatch = useDispatch();
  const itemCustomizationData = useSelector(
    (state: State) => state.itemCustomizationsReducer1.itemData
  );

  const availableService = useSelector(
    (state: RootState) => state.auth.selectedBranch?.orderTypes
  );

  const deleteModifier = useSelector(
    (state: any) => state.productCatalog?.deletedId
  );

  const availableServiceNames =
    availableService?.map((service) => service?.typeName) || [];

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [validationState, setValidationState] = useState({
    items: { isValid: true, errorMessage: "" },
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [filteredOptionsDispatch, setFilteredOptionsDispatch] = useState([]);
  const [showModifiers, setShowModifiers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [options, setOptions] = useState<string[]>([
    "Option2",
    "Option2",
    "Option 3",
  ]);

  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  const [isvalid, setIsValid] = useState<boolean>(false);

  const locationId = useSelector(
    (state: RootState) => state.auth.selectedBranch?.id
  );

  const ListOfmodifier = useSelector(
    (state: RootState) => state.productCatalog.modifier as Modification[]
  );

  const [ModifierList, setModifierList] = useState<Modification[]>([]);

  useEffect(() => {
    const filtered = ListOfmodifier?.filter((modifier: any) =>
      modifier?.modifierName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setModifierList(filtered);
  }, [ListOfmodifier, searchQuery]);

  const initialModificationValue = [
    {
      modifierId: "",
      modifierName: "",
      isModifierChanged: false,
      modifierOptions: [
        {
          modifierOptionId: "",
          modifierOptionName: "",
          cost: 0,
          isModifierOptionChanged: false,
        },
      ],
      minSelection: 1,
      maxSelection: 1,
      freeCustomization: 1,
      selectedValue: selectedValue,
      selectionType: "Optional",
    },
  ];

  const [modifications, setModifications] = useState<any>(
    initialModificationValue
  );

  console.log({modifications})

  const editData = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const [filteredModifications, setFilteredModifications] = useState<
    Modification[]
  >([]);

  // useEffect(() => {
  //   if(editData.length > 0){
  //     setFilteredModifications(editData[0]?.modifiers);
  //   }
  // }, [editData]);

  console.log({itemCustomizationData})

  const orderTypes = useSelector(
    (state: any) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  useEffect(() => {
    if (showModifiers === false) {
      setIsValid(true);
      setShowModifiers(true);
    }
  
    if (itemCustomizationData?.length > 0) {
      const mappedModifications = itemCustomizationData.map((item: any) => {
        const selectedTypeNames = (item?.selectedValue || []).map((selectedId: string) => {
          const orderType = orderTypes.find((type: any) => type.id === selectedId);
          return orderType?.typeName || selectedId; 
        });
  
        return {
          modifierId: item?.id || "",
          modifierName: item?.modifierName || item?.name || "",
          isModifierChanged: false,
          modifierOptions: item?.modifierOptions?.length>0 
            ? item.modifierOptions.map((option: any) => ({
                modifierOptionId: option?.optionId || option?.modifierOptionId || null,
                modifierOptionName: option?.name || option?.modifierOptionName|| "",  
                cost: option?.cost || 0,  
                isModifierOptionChanged: false,
              }))
            : [{ modifierOptionName: "", cost: 0 }],
          minSelection: item.minSelection || 1,
          maxSelection: item.maxSelection || 1,
          freeCustomization: item?.freeCustomization || 1,
          selectedValue: selectedTypeNames,
          selectionType: item?.selectionType || "",
        };
      });
  
      console.log({ mappedModifications });
      setModifications([...mappedModifications]);
    }
  }, [itemCustomizationData, showModifiers]);
  

  const addModifier = () => {
    setModifications([
      ...modifications,
      {
        modifierId: '',
        modifierName: "",
        isModifierChanged: false,
        modifierOptions: [
          {
            modifierOptionName: "",
            cost: 0,
            isModifierOptionChanged: false,
          },
        ],
        minSelection: 1,
        maxSelection: 1,
        freeCustomization: 1,
        selectedValue: selectedValue,
        selectionType: "Optional",
      },
    ]);
  };

  const getFormData = (): FormData => {
    const formData = new FormData();
    modifications.forEach((modification: any, index: any) => {
      formData.append(`modification_${index}`, JSON.stringify(modification));
    });
    return formData;
  };


  const [initialModifierIds, setInitialModifierIds] = useState<any[]>([]);
  const [deletedModifierIds, setDeletedModifierIds] = useState<any[]>([]);
  const [updatedModifierIds, setUpdatedModifierIds] = useState<any[]>([]);

  useEffect(() => {
    if (deletedModifierIds.length > 0) {
      dispatch(deleteModifierRequest(deletedModifierIds));
    }
  }, [deletedModifierIds]);

  useEffect(() => {
    if (updatedModifierIds.length > 0) {
      dispatch(updateModifierData(updatedModifierIds));
    }
  }, [updatedModifierIds]);

  const handleModifierChange = (
    modIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
  
    setModifications((prev: any) => {
      const updated = [...prev];
      const currentModifier = updated[modIndex];
      const isCurrentValueEmpty = currentModifier[name] === "";
  
      updated[modIndex] = {
        ...currentModifier,
        [name]: value,
        ["isModifierChanged"]: isCurrentValueEmpty && value !== "" ? false : true,
      };
  
      setUpdatedModifierIds((prevIds) => {
        const updatedModifierId = updated[modIndex].modifierId;  
        if (updatedModifierId && !prevIds?.includes(updatedModifierId)) {
          return [...prevIds, updatedModifierId].filter(id => id !== "");
        }
  
        return prevIds.filter(id => id !== ""); 
      });

      return updated;
    });
  };
  
    
  const handleDeleteModifier = (modIndex: number) => {
    setModifications((prev: any) => {
      const updated = [...prev];
      const deletedId = updated[modIndex].modifierId; 
  
      updated.splice(modIndex, 1); 
      if (deletedId) {
        setDeletedModifierIds((prevIds) => {
          if (!prevIds.includes(deletedId)) {
            return [...prevIds, deletedId]; 
          }
          return prevIds; 
        });
      }
  
      return updated; 
    });
  };

  const addOption = (index: number) => {
    setModifications((prevModifications: any) => {
      const newModifications = prevModifications.map((mod: any, modIndex: number) => {
        if (modIndex === index) {
          const newOption = {
            modifierOptionName: "",
            cost: 0,
            modifierOptionId: "", 
            isModifierOptionChanged: false
          };
  
          const newModifierOptions = [...mod.modifierOptions, newOption];
          
          return {
            ...mod,
            modifierOptions: newModifierOptions,
            isModifierChanged: mod.modifierId !== ""
          };
        }
        return mod;
      });
      return newModifications;
    });
  };
  

  const addOption1 = (newOption: string) => {
    setOptions([...options, newOption]);
  };

  const handleBlur = (
    e: ChangeEvent<HTMLInputElement>,
    modIndex: number,
    optIndex?: number
  ) => {
    const { name, value } = e.target;
    let error = "";

    if (!value.trim()) {
      error = `Please Enter ${name.charAt(0).toUpperCase() + name.slice(1)}`;
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const addOptionChange = (
    modIndex: number,
    optIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setModifications((prevModifications: any) => {
      const newModifier = prevModifications.map((mod: any, index: number) => {
        if (index === modIndex) {
          const updatedModifierOptions = mod.modifierOptions.map(
            (opt: any, optIdx: number) => {
              if (optIdx === optIndex) {
                const currentValue = opt[e.target.name];
                const newValue =
                  e.target.name === "cost"
                    ? parseFloat(e.target.value) || 0
                    : e.target.value;
  
                const isOptionChanged =
                  mod.modifierId !== "" && 
                  currentValue !== undefined &&
                  currentValue !== null &&
                  currentValue !== "" &&
                  currentValue !== newValue;
  
                return {
                  ...opt,
                  [e.target.name]: newValue,
                  isModifierOptionChanged: isOptionChanged,
                };
              }
              return opt;
            }
          );
  
          const isModifierChanged =
            mod.modifierId !== "" &&
            updatedModifierOptions.some((opt: any) => opt.isModifierOptionChanged);
  
          return {
            ...mod,
            modifierOptions: updatedModifierOptions,
            isModifierChanged, 
          };
        }
        return mod;
      });
  
      const updatedModifierId = newModifier[modIndex]?.modifierId;
      if (updatedModifierId) {
        setUpdatedModifierIds((prevIds) => {
          if (!prevIds.includes(updatedModifierId)) {
            return [...prevIds, updatedModifierId];
          }
          return prevIds;
        });
      }
  
      return newModifier; 
    });
  };
  

  // const incrementSpinner = (index: number, field: keyof Modification) => {
  //   const newModifier = [...modifications];
  //   if (newModifier[index]) {
  //     newModifier[index][field as keyof Modifier] =
  //       (parseInt(
  //         newModifier[index][field as keyof Modifier]?.toString() || 0,
  //         10
  //       ) || 0) + 1;
  //   }
  //   setModifications(newModifier);
  // };

  const getModifierClassName = (length: any) => {
    if (length == 1) {
      return "modifier-div-margin";
    } else if (length == 2) {
      return "modifier-div-margin2";
    } else if (length == 3) {
      return "modifier-div-margin3";
    } else if (length == 4) {
      return "modifier-div-margin4";
    } else if (length == 5) {
      return "modifier-div-margin5";
    } else if (length == 6) {
      return "modifier-div-margin6";
    } else if (length == 7) {
      return "modifier-div-margin7";
    } else if (length == 8) {
      return "modifier-div-margin8";
    } else if (length == 9) {
      return "modifier-div-margin9";
    } else if (length == 10) {
      return "modifier-div-margin10";
    }
  };

  const incrementSpinner = (index: number, field: keyof Modification) => {
    const newModifier = JSON.parse(JSON.stringify(modifications)); 
    
    if (newModifier[index]) {
      newModifier[index][field] = (parseInt(newModifier[index][field]?.toString() || "0", 10) || 0) + 1;
    }
  
    setModifications(newModifier);
  };
  
  const decrementSpinner = (index: number, field: keyof Modification) => {
    const newModifier = JSON.parse(JSON.stringify(modifications)); 
    
    if (newModifier[index]) {
      const currentValue = parseInt(newModifier[index][field]?.toString() || "0", 10) || 0;
  
      if (currentValue > 0) {
        newModifier[index][field] = currentValue - 1;
      }
    }
  
    setModifications(newModifier);
  };

  const deleteOption = (modIndex: number, optIndex: number) => {
    const newModifications = modifications.map((mod: any, index: any) => {
      if (index === modIndex) {
        const updatedModifierOptions = mod.modifierOptions.filter(
          (opt: any, optIdx: any) => optIdx !== optIndex
        );
  
        const isModifierChanged = mod.modifierId !== "" && 
          mod.modifierOptions.length !== updatedModifierOptions.length;
  
        return {
          ...mod,
          modifierOptions: updatedModifierOptions,
          isModifierChanged: isModifierChanged, 
        };
      }
      return mod;
    });
  
    const deletedOptionId = modifications[modIndex]?.modifierOptions?.[optIndex]?.modifierOptionId; 
  
    setModifications(newModifications);
  
    // if (deletedOptionId) {
    //   setDeletedModifierIds((prevIds) => {
    //     if (!prevIds.includes(deletedOptionId)) {
    //       return [...prevIds, deletedOptionId];
    //     }
    //     return prevIds;
    //   });
    // }
  };
  
  
  const dispatch1 = () => {
    dispatch(itemCustomizationPost(modifications));
  };

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggedIndex = parseInt(e.dataTransfer.getData("index"), 10);
    if (draggedIndex !== index) {
      const newModifications = [...modifications];
      const [draggedItem] = newModifications.splice(draggedIndex, 1);
      newModifications.splice(index, 0, draggedItem);
      setModifications(newModifications);
    }
  };

  const validationforitemcustom = (): boolean => {
    return isvalid;
  };

  const clearAll = () => {
    setModifications((prevModifications: any) =>
      prevModifications.map((modification: any) => ({
        ...modification,
        modifierName: "",
        modifierOptions: modification.modifierOptions.map((option: any) => ({
          ...option,
          modifierOptionName: "",
          cost: 0,
        })),
        selectedValue: [],
        selectionType: "Optional",
      }))
    );
  };

  const handleSelect3 = (values: string[], index: number): void => {
    setSelectedValue(values);

    setModifications((prevModifications: any) => {
      const newModifications = [...prevModifications];
      newModifications[index] = {
        ...newModifications[index],
        selectedValue: values,
      };
      return newModifications;
    });
  };

  const ordertypesdetails = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData
  );

  useEffect(() => {
    const filtered = modifications?.filter((modifier: any) =>
      modifier?.modifierName?.toLowerCase().includes(searchQuery?.toLowerCase())
    );
    setFilteredModifications(filtered);
  }, [searchQuery, modifications]);

  const [selectedModifiers, setSelectedModifiers] = useState<Modification>();

  const handleSelecteModifiers = (Modifiers: Modification) => {
    setSelectedModifiers(Modifiers);
    setSearchQuery("");
    
    const updatedModifiers = {
      ...Modifiers,
      modifierOptions: Modifiers.modifierOptions.length > 0
        ? Modifiers.modifierOptions
        : [{
            modifierOptionId: "",
            modifierOptionName: "",
            cost: 0,
            isModifierOptionChanged: false,
          }],
    };
  
    setModifications((prevModifications: Modification[]) => [
      ...prevModifications,
      updatedModifiers,
    ]);
  };

  const handleSearchChange = () => {
    if (searchQuery.length > 1) {
      setShowSearchList(true);
      dispatch(getModifierRequest({ name: searchQuery, locationId }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.min(ModifierList?.length - 1, prevIndex + 1);
        setSearchQuery(ModifierList[newIndex]?.modifierName);
        return newIndex;
      });
    }

    if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => {
        const newIndex = Math.max(0, prevIndex - 1);
        setSearchQuery(ModifierList[newIndex]?.modifierName);
        return newIndex;
      });
    }
  };

  const handleMouseEnter = (index: number) => {
    setHighlightedIndex(index);
  };

  const [ShowSearchList, setShowSearchList] = useState(false);

  const Outsideref = useRef<HTMLDivElement | null>(null);
  const Outsideclicking = (event: MouseEvent) => {
    if (
      Outsideref.current &&
      !Outsideref.current.contains(event.target as Node)
    ) {
      setShowSearchList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", Outsideclicking, true);
    return () => {
      document.removeEventListener("click", Outsideclicking, true);
    };
  }, [ShowSearchList]);
  const [listOfStreams, setListOfStreams] = useState<string[]>([]);

  useEffect(() => {
    const streams: string[] = [];

    if (ordertypesdetails?.normalForm?.dineInDetails?.price) {
      streams.push(ordertypesdetails?.normalForm.dineInDetails?.typeName);
    }

    if (ordertypesdetails?.normalForm?.pickupDetails?.price) {
      streams.push(ordertypesdetails?.normalForm.pickupDetails?.typeName);
    }

    if(ordertypesdetails?.normalForm?.deliveryDetails?.price){
      streams.push(ordertypesdetails?.normalForm.deliveryDetails?.typeName)
    }

    if (ordertypesdetails?.normalForm?.thirdpartyDetails?.price) {
      streams.push(ordertypesdetails?.normalForm.thirdpartyDetails.typeName);
    }
    setListOfStreams(streams);
  }, [ordertypesdetails]);

  return (
    <div style={{ display: "flex" }}>
      <SidePanel />
      <div style={{ width: "84%" }}>
        <Navigationpage 
          seletedpage="ItemCustomization"
          getFormData={getFormData}
          reset={clearAll}
          modifications={showModifiers ? modifications : []}
        />
        <div
          className={
            isExpanded
              ? "mainItemCustomizations-Expanded"
              : "mainItemCustomizations"
          }
        >
          <div className="itemcustomizationpage">
            <div className="AddModifiersSection">
              <div>
                <h3 className="headingItemCustomizations">Add Modifiers</h3>
              </div>
              <div>
                <Toggle toggle={showModifiers} setToggle={setShowModifiers} />
              </div>
              {showModifiers && (
                <a
                  className="Add-Modification-btn-ItemCustomizations"
                  onClick={addModifier}
                >
                  + Add Modification
                </a>
              )}
            </div>

            <div className="searchbox">
              <input
                placeholder="Search"
                className="searchBox-input"
                type="text"
                value={searchQuery}
                onKeyDown={handleKeyDown}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value === "") {
                    setSelectedModifiers(undefined);
                  } else {
                    setShowSearchList(true);
                  }
                }}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleSearchChange();
                //   }
                // }}
              ></input>
              <img
                src={Serachicon}
                alt=""
                className="searchIcon"
                onClick={() => handleSearchChange()}
              />
            </div>
            {searchQuery && (
              <div
                className={
                  isExpanded
                    ? "Search-Container-options1-modifiers"
                    : "Search-Container-options-modifiers"
                }
                ref={Outsideref}
              >
                {ShowSearchList && searchQuery && (
                  <ul>
                    {ModifierList?.length !== 0 ? (
                      ModifierList?.map((item, index) => (
                        <div className="modiferSearchContainer">
                          <li
                          key={index}
                          className={
                            index === highlightedIndex
                              ? "highlighted-modifiers"
                              : ""
                          }
                          onMouseEnter={() => handleMouseEnter(index)}
                        >
                          <div
                            className={
                              isExpanded
                                ? "Search-Container-options1-items-modifiers"
                                : "Search-Container-options-items-modifiers"
                            }
                          >
                            {item.modifierName}{" "}
                            {index === highlightedIndex && (
                              <button
                                onClick={() => handleSelecteModifiers(item)}
                                className="Addmodificationfromsearch"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </li>
                        </div>
                      ))
                    ) : (
                      <div
                        className={
                          isExpanded
                            ? "Search-Container-options1-none-modifiers"
                            : "Search-Container-options-none-modifiers"
                        }
                      >
                        <div className="Search-Container-options-none-flex-direction-modifiers">
                          <img
                            className="NotFoundImage-modifiers"
                            src={NotFound}
                            alt="No Results Found"
                          />
                          <h3 className="heading-none-modifiers">
                            No Results Found
                          </h3>
                        </div>
                      </div>
                    )}
                  </ul>
                )}
              </div>
            )}

            <div className="modifiersitem">
              <div className="modifiers">
                {modifications?.length === 0 ? (
                  <div className="modifier-no-content"></div>
                ) : (
                  modifications?.map(
                    (modifier: Modification, modIndex: number) => (
                      <div
                        className={getModifierClassName(
                          modifier?.modifierOptions?.length
                        )}
                        key={modIndex}
                        draggable
                        onDragStart={(e) => onDragStart(e, modIndex)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, modIndex)}
                        style={{}}
                      >
                        {showModifiers && (
                          <div className="AddModifiersMainInputSection">
                            <div className="AddModifiersInputSection">
                              <img
                                className="dotedimageItemCustomizations"
                                src={dotted}
                                alt="dotted"
                              />
                              <h3 className="paraItemCustomizations">
                                {modIndex + 1}.
                              </h3>
                              <input
                                placeholder="Modifier Name"
                                className={
                                  !modificationError[modIndex]?.modifierName
                                    ? "inputItemCustomizations"
                                    : "inputItemCustomizationserror"
                                }
                                name="modifierName"
                                value={modifications[modIndex]?.modifierName}
                                onChange={(e) =>
                                  handleModifierChange(modIndex, e)
                                }
                                onBlur={(e) => handleBlur(e, modIndex)}
                              />
                              <div
                                className="deleteModiferContainer"
                                onClick={() => handleDeleteModifier(modIndex)}
                              >
                                <a className="Delete-text">
                                  <span className="SpanDelete">-</span>Delete
                                </a>
                              </div>
                            </div>

                            <div className="flexofradio">
                              <div className="radiobtnMargin">
                                <input
                                  type="radio"
                                  className="radioItemCustomizations"
                                  name={`selectionType-${modIndex}`}
                                  value="Mandatory"
                                  checked={
                                    modifier.selectionType === "Mandatory"
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                />
                                <label className="labelItemCustomizations">
                                  Mandatory
                                </label>
                              </div>
                              <div className="radiobtnMargin">
                                <input
                                  type="radio"
                                  className="radioItemCustomizations"
                                  name={`selectionType-${modIndex}`}
                                  value="Optional"
                                  checked={
                                    modifier.selectionType === "Optional"
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                />
                                <label className="labelItemCustomizations">
                                  Optional
                                </label>
                              </div>
                            </div>

                            <div className="option-input-ItemCustomizations">
                              {modifier?.modifierOptions &&
                                modifier?.modifierOptions.map(
                                  (option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className={
                                        modifier?.modifierOptions.length - 1 >=
                                        1
                                          ? "option-input-flex-column1-ItemCustomizations"
                                          : "option-input-flex-column-ItemCustomizations"
                                      }
                                    >
                                      <div>
                                        <input
                                          placeholder="Option (Item)*"
                                          className="input2ItemCustomizations"
                                          name="modifierOptionName"
                                          type="text"
                                          value={
                                            modifications[modIndex]?.modifierOptions[optIndex]?.modifierOptionName ||
                                            modifications[modIndex]?.modifierOptions[optIndex]?.modifierName
                                          }
                                          onChange={(e) =>
                                            addOptionChange(
                                              modIndex,
                                              optIndex,
                                              e
                                            )
                                          }
                                          onBlur={(e) =>
                                            handleBlur(e, modIndex, optIndex)
                                          }
                                        />
                                        {modificationError[modIndex]?.options?.[optIndex]?.modifierOptionName && (
                                          <div className="error-message1">
                                            {
                                              modificationError[modIndex]
                                                ?.options?.[optIndex]
                                                ?.modifierOptionName
                                            }
                                          </div>
                                        )}
                                      </div>

                                      <div>
                                        <input
                                          placeholder="Price*"
                                          className="input2ItemCustomizations"
                                          name="cost"
                                          type="number"
                                          value={
                                            modifier.modifierOptions[optIndex].cost || modifier.modifierOptions[optIndex].sellPrice
                                          }
                                          onChange={(e) =>
                                            addOptionChange(
                                              modIndex,
                                              optIndex,
                                              e
                                            )
                                          }
                                          onBlur={(e) =>
                                            handleBlur(e, modIndex, optIndex)
                                          }
                                        />
                                      </div>

                                      <div
                                        className={
                                          modifier?.modifierOptions.length -
                                            1 >=
                                          1
                                            ? "btn1"
                                            : "btn2"
                                        }
                                      >
                                        {optIndex === 0 && (
                                          <a
                                            className={
                                              modifier?.modifierOptions.length -
                                                1 >=
                                              1
                                                ? "btn-ItemCustomizations"
                                                : "btn-ItemCustomizations2"
                                            }
                                            onClick={() => addOption(modIndex)}
                                          >
                                            <span
                                              className={
                                                modifier?.modifierOptions
                                                  .length -
                                                  1 >=
                                                1
                                                  ? "spanOption-button2"
                                                  : "spanOption-button"
                                              }
                                            >
                                              +
                                              <span className="spanadd">
                                                Add option
                                              </span>{" "}
                                            </span>
                                          </a>
                                        )}
                                        {optIndex > 0 && (
                                          <a
                                            className="btn-ItemCustomizations-del"
                                            onClick={() =>
                                              deleteOption(modIndex, optIndex)
                                            }
                                          >
                                            - Delete option
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>

                            <div className="Spinner-input-ItemCustomizations">
                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                                  className="labelItemCustomizations"
                                  htmlFor=""
                                >
                                  Minimum selection
                                </label>
                                <input
                                  placeholder=""
                                  className="input3ItemCustomizations"
                                  value={
                                    modifications[modIndex]?.selectionType ===
                                      "Mandatory" &&
                                    modifications[modIndex].minSelection != 1
                                      ? 1
                                      : modifications[modIndex].minSelection
                                  }
                                  name="minSelection"
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                  // disabled={
                                  //   modifications[modIndex]?.selectionType ===
                                  //   "Mandatory"
                                  // }
                                />
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon1}
                                    alt=""
                                    onClick={() => {
                                      if (
                                        modifications[modIndex]
                                          ?.selectionType !== "Mandatory"
                                      ) {
                                        incrementSpinner(
                                          modIndex,
                                          "minSelection"
                                        );
                                      }
                                    }}
                                  />
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon2}
                                    alt=""
                                    onClick={() => {
                                      if (
                                        modifications[modIndex]
                                          ?.selectionType !== "Mandatory"
                                      ) {
                                        decrementSpinner(
                                          modIndex,
                                          "minSelection"
                                        );
                                      }
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                                  className="labelItemCustomizations"
                                  htmlFor=""
                                >
                                  Maximum selection
                                </label>
                                <input
                                  placeholder=""
                                  className="input3ItemCustomizations"
                                  value={modifications[modIndex]?.maxSelection}
                                  name="maxSelection"
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                />
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon1}
                                    alt=""
                                    onClick={() =>
                                      incrementSpinner(modIndex, "maxSelection")
                                    }
                                  />
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon2}
                                    alt=""
                                    onClick={() =>
                                      decrementSpinner(modIndex, "maxSelection")
                                    }
                                  />
                                </div>
                              </div>
                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                                  className="label1ItemCustomizations"
                                  htmlFor=""
                                >
                                  No Free customization
                                </label>
                                <input
                                  placeholder=""
                                  className="input3ItemCustomizations"
                                  name="freeCustomization"
                                  value={
                                    modifications[modIndex]?.freeCustomization
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                />
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon1}
                                    alt=""
                                    onClick={() =>
                                      incrementSpinner(
                                        modIndex,
                                        "freeCustomization"
                                      )
                                    }
                                  />
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon2}
                                    alt=""
                                    onClick={() =>
                                      decrementSpinner(
                                        modIndex,
                                        "freeCustomization"
                                      )
                                    }
                                  />
                                </div>
                              </div>
                              <div className="dropDown-item">
                                <Dropdown
                                  selectedValues={
                                    modifications[modIndex]?.selectedValue || []
                                  }
                                  onSelect={(value) =>
                                    handleSelect3(value, modIndex)
                                  }
                                  options={listOfStreams}
                                  width="Drop1"
                                  validation={validationState.items}
                                  label="Available Service Stream*"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  )
                )}
              </div>

              <div className="dropdown-container">
                <div className="footer-save-next">
                  <SaveAndNext
                    seletedpage="ItemCustomization"
                    getFormData={getFormData}
                    reset={clearAll}
                    modifications={showModifiers ? modifications : []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCustomizations;

