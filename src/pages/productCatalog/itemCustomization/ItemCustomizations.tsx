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
  isEnabled:boolean
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

const ItemCustomizations: React.FC<any> = () => {
  
  const dispatch = useDispatch();
  const itemCustomizationData = useSelector(
    (state: State) => state.itemCustomizationsReducer1.itemData
  );
  console.log({itemCustomizationData});
  

  const availableService = useSelector(
    (state: RootState) => state.auth.selectedBranch?.orderTypes
  );

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [validationState, setValidationState] = useState({
    items: { isValid: true, errorMessage: "" },
  });
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showModifiers, setShowModifiers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    console.log({filtered});
    
    setModifierList(filtered);
  }, [ListOfmodifier, searchQuery]);

  const initialModificationValue = [
    {
      modifierId: "",
      modifierName: "",
      isModifierChanged: false,
      isEnabled:true,
      modifierOptions: [
        {
          modifierOptionId: "",
          modifierOptionName: "",
          cost: 0,
          isEnabled:true,
          isModifierOptionChanged: false,
        },
      ],
      minSelection: 0,
      maxSelection: 0,
      freeCustomization: 0,
      selectedValue: selectedValue,
      selectionType: "Mandatory",
    },
  ];

  const [modifications, setModifications] = useState<any>(
    initialModificationValue
  );

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

  const orderTypes = useSelector(
    (state: any) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  useEffect(() => {
    if (itemCustomizationData?.length > 0) {
      setShowModifiers(!showModifiers);
      console.log({itemCustomizationData});
      

      const mappedModifications = itemCustomizationData.map((item: any) => {
        const selectedTypeNames = (item?.selectedValue || []).map(
          (selectedId: string) => {
            const orderType = orderTypes.find(
              (type: any) => type.id === selectedId
            );
            return orderType?.typeName || selectedId;
          }
        );
           if(item?.options)
           {
            return {
              modifierId: item?.id || "",
              modifierName: item?.modifierName || item?.name || "",
              isModifierChanged: false,
              isEnabled:item.isEnabled,
              modifierOptions:
                item?.options?.length > 0
                  ? item.options.map((option: any) => ({
                      modifierOptionId:
                        option?.optionId || option?.modifierOptionId || null,
                      modifierOptionName:
                        option?.name || option?.modifierOptionName || "",
                      cost: option?.price || 0,
                      isModifierOptionChanged: false,
                      isEnabled:option?.isEnabled,
                    }))
                  : [{ modifierOptionName: "", cost: 0 }],
              minSelection: item.minSelection || 0,
              maxSelection: item.maxSelection || 0,
              freeCustomization: item?.freeCustomization || 0,
              selectedValue: selectedTypeNames,
              selectionType: item?.selectionType || "",
            };
           }
           else if(item?.modifierOptions)
           {
            return {
              modifierId: item?.id || "",
              modifierName: item?.modifierName || item?.name || "",
              isModifierChanged: false,
              isEnabled:item.isEnabled,
              modifierOptions:
                item?.modifierOptions?.length > 0
                  ? item.modifierOptions.map((option: any) => ({
                      modifierOptionId:
                        option?.optionId || option?.modifierOptionId || null,
                      modifierOptionName:
                        option?.name || option?.modifierOptionName || "",
                      cost: option?.cost || 0,
                      isModifierOptionChanged: false,
                      isEnabled:option?.isEnabled,
                    }))
                  : [{ modifierOptionName: "", cost: 0 }],
              minSelection: item.minSelection || 0,
              maxSelection: item.maxSelection || 0,
              freeCustomization: item?.freeCustomization || 0,
              selectedValue: selectedTypeNames,
              selectionType: item?.selectionType || "",
            };
           }
       
      });

      setModifications([...mappedModifications]);
    }
  }, [itemCustomizationData, ]);

  const addModifier = () => {
    setModifications([
      ...modifications,
      {
        modifierId: "",
        modifierName: "",
        isEnabled:true,
        isModifierChanged: false,
        modifierOptions: [
          {
            modifierOptionName: "",
            cost: 0,
            isModifierOptionChanged: false,
            isEnabled:true
          },
        ],
        minSelection: 0,
        maxSelection: 0,
        freeCustomization: 0,
        selectedValue: selectedValue,
        selectionType: "Mandatory",
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
    e: React.ChangeEvent<HTMLInputElement>,
    selectionType?: string
  ) => {
    const { name, value } = e.target;
    setModifications((prev: any) => {
      const updated = [...prev];
      const currentModifier = updated[modIndex];
      const isCurrentValueEmpty = currentModifier[name] === "";

      updated[modIndex] = {
        ...currentModifier,
        selectionType: selectionType ? selectionType : "Optional",
        [name]: value,
        ["isModifierChanged"]:
          isCurrentValueEmpty && value !== "" ? false : true,
      };

      setUpdatedModifierIds((prevIds) => {
        const updatedModifierId = updated[modIndex].modifierId;
        if (updatedModifierId && !prevIds?.includes(updatedModifierId)) {
          return [...prevIds, updatedModifierId].filter((id) => id !== "");
        }

        return prevIds.filter((id) => id !== "");
      });

      return updated;
    });
  };

  const handleDeleteModifier = (modIndex: number) => {
    setModifications((prev: any) => {
      const updated = [...prev];
      const deletedId = updated[modIndex].modifierId; // Retrieve the modifier ID
      console.log({ deletedId });
      console.log({ modIndex });
  
      // Remove the modifier from the array
      updated.splice(modIndex, 1);
  
      // Handle the deleted ID logic
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
  
    // Remove the error for the modifier at the given index
    setcustomizationerrors((prevErrors: any) => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(modIndex, 1); // Remove the corresponding error
      return updatedErrors;
    });
  };
  

  console.log(modifications);
  
  const addOption = (index: number) => {
    setModifications((prevModifications: any) => {
      const newModifications = prevModifications.map(
        (mod: any, modIndex: number) => {
          if (modIndex === index) {
            const newOption = {
              modifierOptionName: "",
              isEnabled:true,
              cost: 0,
              modifierOptionId: "",
              isModifierOptionChanged: false,
            };

            const newModifierOptions = [...mod.modifierOptions, newOption];

            return {
              ...mod,
              modifierOptions: newModifierOptions,
              isModifierChanged: mod.modifierId !== "",
            };
          }
          return mod;
        }
      );
      return newModifications;
    });
  };

  const addOptionChange = (
    modIndex: number,
    optIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    console.log("Updating:", { modIndex, optIndex, fieldName: e.target.name, newValue: e.target.value });
    
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
            updatedModifierOptions.some(
              (opt: any) => opt.isModifierOptionChanged
            );
  
          return {
            ...mod,
            modifierOptions: updatedModifierOptions,
            isModifierChanged,
          };
        }
        return mod;
      });
  
      console.log("Updated Modifier:", newModifier);
  
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

  const incrementSpinner = (index: number, field: keyof Modification,EnableOrnot:boolean) => {
    const newModifier = JSON.parse(JSON.stringify(modifications));

    if (newModifier[index] &&EnableOrnot) {
      newModifier[index][field] =
        (parseInt(newModifier[index][field]?.toString() || "0", 10) || 0) + 1;
    }

    setModifications(newModifier);
  };

  const decrementSpinner = (index: number, field: keyof Modification,EnableOrnot:boolean) => {
    const newModifier = JSON.parse(JSON.stringify(modifications));

    if (newModifier[index] &&EnableOrnot) {
      const currentValue =
        parseInt(newModifier[index][field]?.toString() || "0", 10) || 0;

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

        const isModifierChanged =
          mod.modifierId !== "" &&
          mod.modifierOptions.length !== updatedModifierOptions.length;

        return {
          ...mod,
          modifierOptions: updatedModifierOptions,
          isModifierChanged: isModifierChanged,
        };
      }
      return mod;
    });

    const deletedOptionId =
      modifications[modIndex]?.modifierOptions?.[optIndex]?.modifierOptionId;

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

  const validateSelectedValue = (index: number, values: string[]): void => {
    const errors = [...customizationerrors]; // Clone the existing errors
  
    // Retrieve or initialize the errors for the specific modifier
    const modifierErrors = errors[index] || {
      modifierNameError: "",
      id: modifications[index]?.modifierId || "",
      errormsgforselectedvalues: "",
      options: errors[index]?.options || [], // Preserve existing options errors
    };
  
    // Validate the provided `values` directly
    if (!values.length) {
      modifierErrors.errormsgforselectedvalues = `At least one option must be selected.`;
    } else {
      modifierErrors.errormsgforselectedvalues = ""; // Clear the error if valid
    }
  
    // Update the errors for the specific modifier
    errors[index] = modifierErrors;
  
    // Update the state with the updated errors
    setcustomizationerrors(errors);
  };
  

  const handleSelect3 = (values: string[], index: number, enableorNot: boolean): void => {
    if (enableorNot) {
      setModifications((prevModifications: any) => {
        const newModifications = [...prevModifications];
        newModifications[index] = {
          ...newModifications[index],
          selectedValue: values,
        };
        return newModifications;
      });
    }
  
    // Use `values` for validation immediately
    validateSelectedValue(index, values);
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
    console.log("Modifiers123",Modifiers);
    

    const updatedModifiers = {
      ...Modifiers,
      isEnabled:true,
      modifierOptions:
        Modifiers.modifierOptions.length > 0
          ? 

          Modifiers?.modifierOptions.map((option: any) => ({
            modifierOptionId:
              option?.optionId || option?.modifierOptionId || null,
            modifierOptionName:
              option?.name || option?.modifierOptionName || "",
            cost: option?.cost || 0,
            isModifierOptionChanged: false,
            isEnabled:true,
          }))




          : [
              {
                modifierOptionId: "",
                modifierOptionName: "",
                cost: 0,
                isModifierOptionChanged: false,
                isEnabled:true
              },
            ],
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

    if (ordertypesdetails?.normalForm?.deliveryDetails?.price) {
      streams.push(ordertypesdetails?.normalForm.deliveryDetails?.typeName);
    }

    if (ordertypesdetails?.normalForm?.thirdpartyDetails?.price) {
      streams.push(ordertypesdetails?.normalForm.thirdpartyDetails.typeName);
    }
    setListOfStreams(streams);
  }, [ordertypesdetails]);

  const [customizationerrors, setcustomizationerrors] = useState<any>([]);


  const valiadteModifierName = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errors = [...customizationerrors]; // Clone the existing errors
    const inputValue = e.target.value.trim(); // Get the trimmed input value
  
    // Retrieve or initialize the errors for the specific modifier
    const modifierErrors = errors[index] || {
      modifierNameError: "",
      id: modifications[index]?.modifierId || "",
      errormsgforselectedvalues: "",
      options: errors[index]?.options || [], // Preserve existing options errors
    };
  
    // Validate the modifier name
    if (!inputValue) {
      modifierErrors.modifierNameError = `Modifier Name is required`;
    } else {
      modifierErrors.modifierNameError = ""; // Clear the error if valid
    }
  
    // Update the errors for the specific modifier
    errors[index] = modifierErrors;
  
    // Update the state with the updated errors
    setcustomizationerrors(errors);
  };
  
  
  const valiadteModifierOptions = (
    parentIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errors = [...customizationerrors]; // Clone the existing errors
    const inputValue = e.target.value.trim(); // Get the trimmed input value
  
    // Retrieve existing modifier error or initialize a new one
    const modifierErrors = errors[parentIndex] || {
      modifierNameError: "",
      id: modifications[parentIndex]?.modifierId || "",
      errormsgforselectedvalues: "",
      options: [],
    };
  
    // Ensure the options array exists within modifierErrors
    modifierErrors.options = modifierErrors.options || [];
  
    // Retrieve the existing error for the specific option or initialize a new one
    const optionErrors = modifierErrors.options[optionIndex] || {
      optionName: modifications[parentIndex]?.modifierOptions[optionIndex]?.modifierOptionName || "",
      optionId: modifications[parentIndex]?.modifierOptions[optionIndex]?.modifierOptionId || "",
      optionNameError: "",
      optionPrice: modifications[parentIndex]?.modifierOptions[optionIndex]?.cost || 0,
      optionPriceError: "",
    };
  
    // Validate the option name
    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!inputValue) {
      optionErrors.optionNameError = `Option Name is required`;
    } else if (!nameRegex.test(inputValue)) {
      optionErrors.optionNameError = `Option Name must not contain special characters`;
    } else {
      optionErrors.optionNameError = ""; // Clear error if valid
    }
  
    // Update the specific option error
    modifierErrors.options[optionIndex] = optionErrors;
  
    // Update the errors for the current modifier
    errors[parentIndex] = modifierErrors;
  
    // Update the state with the modified errors
    setcustomizationerrors(errors);
  };
  


  const valiadteModifieroptionsprice = (
    parentIndex: number,
    optionIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const errors = [...customizationerrors]; // Clone existing errors
    const inputValue = parseFloat(e.target.value) || 0; // Parse the input value as a number
  
    // Retrieve or initialize errors for the specified modifier
    const modifierErrors = errors[parentIndex] || {
      modifierNameError: "",
      id: modifications[parentIndex]?.modifierId || "",
      errormsgforselectedvalues: "",
      options: [],
    };
  
   
    modifierErrors.options = modifierErrors.options || [];
  
   
    const optionErrors = modifierErrors.options[optionIndex] || {
      optionName: modifications[parentIndex]?.modifierOptions[optionIndex]?.modifierOptionName || "",
      optionId: modifications[parentIndex]?.modifierOptions[optionIndex]?.modifierOptionId || "",
      optionNameError: "",
      optionPrice: modifications[parentIndex]?.modifierOptions[optionIndex]?.cost || 0,
      optionPriceError: "",
    };
  
    // Validate the option price
    if (inputValue <= 0) {
      optionErrors.optionPriceError = `Price field is required`;
    } else {
      optionErrors.optionPriceError = ""; // Clear the error if the price is valid
    }
  
    // Update the specific option errors
    modifierErrors.options[optionIndex] = optionErrors;
  
    // Update the errors for the current modifier
    errors[parentIndex] = modifierErrors;
  
    // Update the state with the modified errors
    setcustomizationerrors(errors);
  };
  
  const validateModifiers = (modifications: any[]) => {
    const errors = [...customizationerrors];
    console.log({ modifications });

    modifications?.forEach((modifier, index) => {
      const {
        modifierName,
        modifierId,
        modifierOptions,
        selectedValue,
        selectionType,
      } = modifier;

      // Initialize error object for the current modifier
      let modifierErrors: any = {
        modifierNameError: modifierName.trim()
          ? ""
          : `Modifier Name is required`,
        id: modifierId || "",
        errormsgforselectedvalues: "",
        options: [],
      };

      if (!modifierName.trim()) {
        modifierErrors.modifierNameError = `Modifier Name is required`;
      }
      if (selectedValue.length === 0) {
        modifierErrors.errormsgforselectedvalues = "Available service streams required";
      }

      if (Array.isArray(modifierOptions)) {
        modifierOptions.forEach((option: any, optIndex: number) => {
          let optionErrors: any = {
            optionName: option.modifierOptionName || "",
            optionId: option.modifierOptionId || "",
            optionNameError: "",
            optionPrice: option.cost || 0,
            optionPriceError: "",
          };

          // Validate Option Name
          const nameRegex = /^[a-zA-Z0-9\s]+$/; // Allow alphanumeric and spaces
          if (!option.modifierOptionName.trim()) {
            optionErrors.optionNameError = `Option Name is required`;
          } else if (!nameRegex.test(option.modifierOptionName)) {
            optionErrors.optionNameError = `Option Name must not contain special characters`;
          }

          // Validate Option Price
          if (isNaN(option.cost) || option.cost <= 0) {
            optionErrors.optionPriceError = `Price field is required`;
          }

          modifierErrors.options.push(optionErrors);
        });
      } else {
        modifierErrors.options.push({
          optionNameError: `Options must be an array`,
        });
      }

      // Push errors for the current modifier if any exist
      if (
        modifierErrors.modifierNameError ||
        modifierErrors.errormsgforselectedvalues ||
        modifierErrors.options.some(
          (opt: any) => opt.optionNameError || opt.optionPriceError
        )
      ) {
        errors[index] = modifierErrors;
      } else {
        errors[index] = null; // No errors for this modifier
      }
    });

    // Update customization errors in state
    setcustomizationerrors(errors);

    // Check if all modifiers are valid
    const validateCustomizationErrors = () => {
      return errors.every((error) => {
        if (!error) return true; // No errors for this modifier
        const hasNoTopLevelErrors =
          error.modifierNameError === "" &&
          error.errormsgforselectedvalues === "";
        const hasNoOptionErrors = error.options.every(
          (option: any) =>
            option.optionNameError === "" && option.optionPriceError === ""
        );

        return hasNoTopLevelErrors && hasNoOptionErrors;
      });
    };

    return validateCustomizationErrors();
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
    validateModifiers(modifications)
  
    
  };

 


  
console.log({modifications});





  return (
    <div style={{ display: "flex", height: "99vh", overflowY: "hidden", overflowX: "hidden" }}>
      <SidePanel />
      <div className={isExpanded ? "ItemCustomization-container-level-one-expanded" : "ItemCustomization-container-level-one"}>
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
            <div className="AddModifiersSection ">
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
            {showModifiers && (
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
            )}
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
                              onClick={() => handleSelecteModifiers(item)}
                            >
                              {item.modifierName}{" "}
                              {/* {index === highlightedIndex && (
                              <button
                                onClick={() => handleSelecteModifiers(item)}
                                className="Addmodificationfromsearch"
                              >
                                Add
                              </button>
                            )} */}
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
                        className="modifier-and-options"
                        key={modIndex}
                        draggable
                        onDragStart={(e) => onDragStart(e, modIndex)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, modIndex)}
                        style={{opacity:modifications[modIndex]?.isEnabled?"100%":"50%"}}
                      >
                        {showModifiers && (
                          <div className="AddModifiersMainInputSection" >
                            <div className="AddModifiersInputSection">
                              {/* <img
                                className="dotedimageItemCustomizations"
                                src={dotted}
                                alt="dotted"
                              /> */}
                              <h3 className="paraItemCustomizations">
                                {modIndex + 1}.
                              </h3>
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <input
                                  placeholder="Modifier Name"
                                  className={
                                    !modificationError[modIndex]?.modifierName
                                      ? "inputItemCustomizations"
                                      : "inputItemCustomizationserror"
                                  }
                                  autoComplete="off"
                                  name="modifierName"
                                  value={modifications[modIndex]?.modifierName}
                                  style={{opacity:modifications[modIndex]?.isEnabled?"100%":"50%"}}
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    console.log({ modIndex });

                                   
                                    if (!/\d/.test(inputValue)) {
                                      handleModifierChange(
                                        modIndex,
                                        e,
                                        modifier.selectionType
                                      );
                                    }
                                    valiadteModifierName(modIndex,e);
                                  }}
                                  // onBlur={(e) => handleBlur(e, modIndex)}
                                />
                                {customizationerrors[modIndex]
                                  ?.modifierNameError && (
                                  <span className="nameErrormsg modifiernameerror">
                                    {
                                      customizationerrors[modIndex]
                                        ?.modifierNameError
                                    }
                                  </span>
                                )}
                              </div>

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
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  checked={
                                    modifier.selectionType === "Mandatory"
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(
                                      modIndex,
                                      e,
                                      "Mandatory"
                                    )
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
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  name={`selectionType-${modIndex}`}
                                  value="Optional"
                                  checked={
                                    modifier.selectionType === "Optional"
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(
                                      modIndex,
                                      e,
                                      "Optional"
                                    )
                                  }
                                />
                                <label className="labelItemCustomizations">
                                  Optional
                                </label>
                              </div>
                            </div>

                            <div className="modifiers-to-select">
                              {modifier?.modifierOptions &&
                                modifier?.modifierOptions.map(
                                  (option, optIndex) => (
                                    <div
                                      key={optIndex}
                                      className="modifieroptions-div"
                                     

                                     
                                    >
                                      <div className="option-name-errormsg">
                                        <input
                                          placeholder="Option (Item)*"
                                         className="input-option-name-field"
                                          name="modifierOptionName"
                                          type="text"
                                          style={{opacity:modifications[modIndex]?.modifierOptions[optIndex]?.isEnabled?"100%":"50%"}}
                                          disabled={
                                            !modifications[modIndex]?.modifierOptions[optIndex]?.isEnabled || 
                                            !modifications[modIndex]?.isEnabled
                                          }
                                          value={
                                            modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.modifierOptionName ||
                                            modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.modifierName
                                          }
                                          onChange={(e) => {
                                            const value = e.target.value;

                                           
                                            addOptionChange(
                                              modIndex,
                                              optIndex,
                                              e
                                            );
                                            valiadteModifierOptions( modIndex,
                                              optIndex,
                                              e)
                                          }}
                                          // onBlur={(e) => {
                                          //   handleBlur(e, modIndex, optIndex);
                                          //   validateModifiers(modifications);
                                          // }}
                                        />
                                        {customizationerrors[modIndex]?.options[
                                          optIndex
                                        ]?.optionNameError !== "" && (
                                          <span className="nameErrormsg">
                                            {
                                              customizationerrors[modIndex]
                                                ?.options[optIndex]
                                                ?.optionNameError
                                            }
                                          </span>
                                        )}

                                        {/* {modificationError[modIndex]?.options?.[optIndex]?.modifierOptionName && (
                                          <div className="error-message1">
                                            {
                                              modificationError[modIndex]
                                                ?.options?.[optIndex]
                                                ?.modifierOptionName
                                            }
                                          </div>
                                        )} */}
                                      </div>

                                      <div className="option-price-errormsg">
                                        <input
                                          placeholder="Price*"
                                         className="input-option-price-field"
                                          name="cost"
                                          type="number"
                                         
                                          style={{opacity:modifications[modIndex]?.modifierOptions[optIndex]?.isEnabled?"100%":"50%"}}

                                          disabled={
                                            !modifications[modIndex]?.modifierOptions[optIndex]?.isEnabled || 
                                            !modifications[modIndex]?.isEnabled
                                          }

                                          value={
                                            modifier.modifierOptions[optIndex]
                                              .cost ||
                                            modifier.modifierOptions[optIndex]
                                              .sellPrice
                                          }
                                          onChange={(e) => {
                                           
                                            addOptionChange(
                                              modIndex,
                                              optIndex,
                                              e
                                            );
                                            valiadteModifieroptionsprice( modIndex,
                                              optIndex,
                                              e)
                                          }}
                                          onKeyDown={(e) => {
                                            if (e.key === "-") {
                                              e.preventDefault();
                                            }
                                          }}
                                          // onBlur={(e) => {
                                          //   handleBlur(e, modIndex, optIndex);
                                          //   validateModifiers(modifications);
                                          // }}
                                        />

                                        {customizationerrors[modIndex]?.options[
                                          optIndex
                                        ]?.optionPriceError !== "" && (
                                          <span className="nameErrormsg">
                                            {
                                              customizationerrors[modIndex]
                                                ?.options[optIndex]
                                                ?.optionPriceError
                                            }
                                          </span>
                                        )}
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
                                                Add 
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
                                            - Delete           
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>

                            <div className="Spinner-input-ItemCustomizations" style={{height:modifications.length-1===modIndex?"35vh":"auto"}}>
                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                            className={modifications[modIndex]?.selectionType === "Optional" ? "labelItemCustomizations-disable" : "labelItemCustomizations"}

                                  htmlFor=""
                                >
                                  Minimum selection
                                </label>
                                <input
                                  placeholder=""
                                  className={modifications[modIndex]?.selectionType === "Optional" ? "input3ItemCustomizations-disable" : "input3ItemCustomizations"}
                                
                                  value={
                                    modifications[modIndex]?.selectionType ===
                                      "Optional" &&
                                    modifications[modIndex].minSelection != 0
                                      ? 0
                                      : modifications[modIndex].minSelection
                                  }
                                  name="minSelection"
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                  disabled={
                                    modifications[modIndex]?.selectionType ===
                                    "Optional" ||!modifications[modIndex]?.isEnabled
                                  }
                                />
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                 className={modifications[modIndex]?.selectionType === "Optional" ? "polyimg-ItemCustomizations-disable" : "polyimg-ItemCustomizations"}

                                    src={Polygon1}
                                    alt=""
                                  
                                    onClick={() => {
                                      if (
                                        modifications[modIndex]
                                          ?.selectionType !== "Optional"
                                      ) {
                                        incrementSpinner(
                                          modIndex,
                                          "minSelection",
                                          modifications[modIndex]?.isEnabled
                                        );
                                      }
                                    }}
                                  />
                                  <img
                                 className={modifications[modIndex]?.selectionType === "Optional" ? "polyimg-ItemCustomizations-disable" : "polyimg-ItemCustomizations"}
                                
                                    src={Polygon2}
                                    alt=""
                                    onClick={() => {
                                      if (
                                        modifications[modIndex]
                                          ?.selectionType !== "Optional"
                                      ) {
                                        decrementSpinner(
                                          modIndex,
                                          "minSelection",
                                          modifications[modIndex]?.isEnabled
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
                                  disabled={
                                    !modifications[modIndex]?.isEnabled
                                  }
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
                                      incrementSpinner(modIndex, "maxSelection",modifications[modIndex]?.isEnabled)
                                    }
                                  />
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon2}
                                    alt=""
                                    onClick={() =>
                                      decrementSpinner(modIndex, "maxSelection",modifications[modIndex]?.isEnabled)
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
                                  disabled={
                                    !modifications[modIndex]?.isEnabled
                                  }
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
                                        "freeCustomization",
                                        modifications[modIndex]?.isEnabled
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
                                        "freeCustomization",
                                        modifications[modIndex]?.isEnabled
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
                                    handleSelect3(value, modIndex,modifications[modIndex]?.isEnabled)
                                  }
                                  options={listOfStreams}
                                  width="Drop1"
                                  validation={validationState.items}
                                  label="Available Service Stream*"
                                />
                                {   customizationerrors[modIndex]?.errormsgforselectedvalues &&   <span className="nameErrormsg  availbleservicestreams">{customizationerrors[modIndex]?.errormsgforselectedvalues}</span>
                              }
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
                    validateModifiers={validateModifiers}
                    handleValidate={validateModifiers}
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
