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

import plusicon from "../../../assets/svg/plusIcon.svg";
import minus from "../../../assets/svg/minusIcon.svg";
import Polygon2 from "../../../assets/images/Polygon 2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteModifierRequest,
  getModifierRequest,
  itemCustomizationClear,
  itemCustomizationPost,
  removeDataRequest,
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
  isEnabled: boolean;
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

    setModifierList(filtered);
  }, [ListOfmodifier, searchQuery]);

  const initialModificationValue = [
    {
      modifierId: "",
      modifierName: "",
      isModifierChanged: false,
      isEnabled: true,
      modifierOptions: [
        {
          modifierOptionId: "",
          modifierOptionName: "",
          cost: 0,
          isEnabled: true,
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
    (state: any) => state?.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  useEffect(() => {
    if (itemCustomizationData?.length > 0) {
      setShowModifiers(!showModifiers);

      const mappedModifications = itemCustomizationData.map((item: any) => {
        const selectedTypeNames = (item?.selectedValue || []).map(
          (selectedId: string) => {
            const orderType = orderTypes?.find(
              (type: any) => type.id === selectedId
            );
            return orderType?.typeName || selectedId;
          }
        );
        if (item?.options) {
          return {
            modifierId: item?.id || "",
            modifierName: item?.modifierName || item?.name || "",
            isModifierChanged: false,
            isEnabled: item.isEnabled,
            selectionType: "Mandatory",

            modifierOptions:
              item?.options?.length > 0
                ? item.options.map((option: any) => ({
                    modifierOptionId:
                      option?.optionId || option?.modifierOptionId || null,
                    modifierOptionName:
                      option?.name || option?.modifierOptionName || "",
                    cost: option?.price || 0,
                    isModifierOptionChanged: false,
                    isEnabled: option?.isEnabled,
                  }))
                : [{ modifierOptionName: "", cost: 0 }],
            minSelection: item.minSelection || 0,
            maxSelection: item.maxSelection || 0,
            freeCustomization: item?.freeCustomization || 0,
            selectedValue: selectedTypeNames,
            // selectionType: item?.selectionType || "Mandatory",
          };
        } else if (item?.modifierOptions) {
          return {
            modifierId: item?.id || "",
            modifierName: item?.modifierName || item?.name || "",
            isModifierChanged: false,
            isEnabled: item.isEnabled,
            modifierOptions:
              item?.modifierOptions?.length > 0
                ? item.modifierOptions.map((option: any) => ({
                    modifierOptionId:
                      option?.optionId || option?.modifierOptionId || null,
                    modifierOptionName:
                      option?.name || option?.modifierOptionName || "",
                    cost: option?.cost || 0,
                    isModifierOptionChanged: false,
                    isEnabled: option?.isEnabled,
                  }))
                : [{ modifierOptionName: "", cost: 0 }],
            minSelection: item.minSelection || 0,
            maxSelection: item.maxSelection || 0,
            freeCustomization: item?.freeCustomization || 0,
            selectedValue: selectedTypeNames,
            selectionType: item?.selectionType || "Mandatory",
            // selectionType:  "Mandatory",
          };
        }
      });

      setModifications([...mappedModifications]);
    }
  }, [itemCustomizationData]);

  const addModifier = () => {
    setModifications([
      ...modifications,
      {
        modifierId: "",
        modifierName: "",
        isEnabled: true,
        isModifierChanged: false,
        modifierOptions: [
          {
            modifierOptionName: "",
            cost: 0,
            isModifierOptionChanged: false,
            isEnabled: true,
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

  const handleModifierChangeforradio = (
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
        selectionType: selectionType ? selectionType : "Mandatory",
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
      const deletedId = updated[modIndex].modifierId;

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

  const addOption = (index: number) => {
    setModifications((prevModifications: any) => {
      const newModifications = prevModifications.map(
        (mod: any, modIndex: number) => {
          if (modIndex === index) {
            const newOption = {
              modifierOptionName: "",
              isEnabled: true,
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
    setModifications((prevModifications: any) => {
      const newModifier = prevModifications.map((mod: any, index: number) => {
        if (index === modIndex) {
          const updatedModifierOptions = mod.modifierOptions.map(
            (opt: any, optIdx: number) => {
              if (optIdx === optIndex) {
                const currentValue = opt[e.target.name];
                const newValue =
                  e.target.name === "cost"
                    ? parseFloat(
                        e.target.value.replace(/^(\d+)(\.\d{0,2})?.*$/, "$1$2")
                      ) ||
                      0 ||
                      0 ||
                      0
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
  useEffect(() => {
    if (modifications.length > 0) {
      setShowModifiers(true);
    }
  }, [modifications]);

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

  const incrementSpinner = (
    index: number,
    field: keyof Modification,
    EnableOrnot: boolean,
    selectionType: "Mandatory" | "Optional"
  ) => {
    const newModifier = JSON.parse(JSON.stringify(modifications));

    if (newModifier[index] && EnableOrnot) {
      const baseValue = selectionType === "Mandatory" ? 1 : 0;

      newModifier[index][field] =
        (parseInt(
          newModifier[index][field]?.toString() || baseValue.toString(),
          10
        ) || baseValue) + 1;
    }

    setModifications(newModifier);
  };

  const decrementSpinner = (
    index: number,
    field: keyof Modification,
    EnableOrnot: boolean
  ) => {
    const newModifier = JSON.parse(JSON.stringify(modifications));

    if (newModifier[index] && EnableOrnot) {
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
        maxSelection: "", // Clear maxSelection field
        freeCustomization: "", // Clear maxCustomizations field
        modifierOptions: modification.modifierOptions.map((option: any) => ({
          ...option,
          modifierOptionName: "", // Clear option item
          cost: 0,
        })),
        selectedValue: [],
        selectionType: "Optional",
      }))
    );

    dispatch(itemCustomizationClear());
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

  const handleSelect3 = (
    values: string[],
    index: number,
    enableorNot: boolean
  ): void => {
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
  // console.log({ordertypesdetails})

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
      freeCustomization: Modifiers?.noFreeCustomization,
      maxSelection: Modifiers?.maxAllowed,
      minSelection: Modifiers?.minRequired,
      isEnabled: true,
      modifierOptions:
        Modifiers.modifierOptions.length > 0
          ? Modifiers?.modifierOptions.map((option: any) => ({
              modifierOptionId:
                option?.optionId || option?.modifierOptionId || null,
              modifierOptionName:
                option?.name || option?.modifierOptionName || "",
              cost: option?.cost || 0,
              isModifierOptionChanged: false,
              isEnabled: true,
            }))
          : [
              {
                modifierOptionId: "",
                modifierOptionName: "",
                cost: 0,
                isModifierOptionChanged: false,
                isEnabled: true,
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

  const [atleastOnestream, setAtleastOnestream] = useState(false);

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

    if (streams.length > 0) {
      setAtleastOnestream(true);
    }
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
    const errors = [...customizationerrors];
    const inputValue = e.target.value.trim();

    const modifierErrors = errors[parentIndex] || {
      modifierNameError: "",
      id: modifications[parentIndex]?.modifierId || "",
      errormsgforselectedvalues: "",
      options: [],
    };

    modifierErrors.options = modifierErrors.options || [];

    const optionErrors = modifierErrors.options[optionIndex] || {
      optionName:
        modifications[parentIndex]?.modifierOptions[optionIndex]
          ?.modifierOptionName || "",
      optionId:
        modifications[parentIndex]?.modifierOptions[optionIndex]
          ?.modifierOptionId || "",
      optionNameError: "",
      optionPrice:
        modifications[parentIndex]?.modifierOptions[optionIndex]?.cost || 0,
      optionPriceError: "",
    };

    const nameRegex = /^[a-zA-Z0-9\s]+$/;
    if (!inputValue) {
      optionErrors.optionNameError = `Option Name is required`;
    } else if (!nameRegex.test(inputValue)) {
      optionErrors.optionNameError = `Option Name must not contain special characters`;
    } else {
      optionErrors.optionNameError = "";
    }

    modifierErrors.options[optionIndex] = optionErrors;

    errors[parentIndex] = modifierErrors;

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
      optionName:
        modifications[parentIndex]?.modifierOptions[optionIndex]
          ?.modifierOptionName || "",
      optionId:
        modifications[parentIndex]?.modifierOptions[optionIndex]
          ?.modifierOptionId || "",
      optionNameError: "",
      optionPrice:
        modifications[parentIndex]?.modifierOptions[optionIndex]?.cost || 0,
      optionPriceError: "",
    };

    if (inputValue <= 0) {
      optionErrors.optionPriceError = `Price field is required`;
    } else {
      optionErrors.optionPriceError = "";
    }

    modifierErrors.options[optionIndex] = optionErrors;

    errors[parentIndex] = modifierErrors;

    setcustomizationerrors(errors);
  };

  const validateModifiers = (modifications: any[]) => {
    const errors = [...customizationerrors];

    modifications?.forEach((modifier, index) => {
      const {
        modifierName,
        modifierId,
        modifierOptions,
        selectedValue,
        selectionType,
      } = modifier;

      let modifierErrors: any = {
        modifierNameError: modifierName.trim() ? "" : ``,
        id: modifierId || "",
        errormsgforselectedvalues: "",
        options: [],
      };

      if (!modifierName.trim()) {
        modifierErrors.modifierNameError = `Modifier Name is required`;
      }
      if (atleastOnestream && selectedValue?.length === 0) {
        modifierErrors.errormsgforselectedvalues =
          "Available service streams required";
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

          const nameRegex = /^[a-zA-Z0-9\s]+$/;
          if (!option.modifierOptionName.trim()) {
            optionErrors.optionNameError = `Option Name is required`;
          }
          // else if (!nameRegex.test(option.modifierOptionName && modifierName!=="")) {
          //   optionErrors.optionNameError = `Option Name must not contain special characters`;
          // }

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

      if (
        modifierErrors.modifierNameError ||
        modifierErrors.errormsgforselectedvalues ||
        modifierErrors.options.some(
          (opt: any) => opt.optionNameError || opt.optionPriceError
        )
      ) {
        errors[index] = modifierErrors;
      } else {
        errors[index] = null;
      }
    });

    setcustomizationerrors(errors);

    const validateCustomizationErrors = () => {
      return errors.every((error) => {
        if (!error) return true;
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
    validateModifiers(modifications);
  };

  // const editData = useSelector((state: any) => state.productCatalog.editData);

  const searched = ModifierList?.map((item, index) => item?.modifierName);

  return (
    <div
      style={{
        display: "flex",
        height: "99vh",
        overflowY: "hidden",
        overflowX: "hidden",
      }}
    >
      <SidePanel />
      <div
        className={
          isExpanded
            ? "ItemCustomization-container-level-one-expanded"
            : "ItemCustomization-container-level-one"
        }
      >
        <Navigationpage
          seletedpage="ItemCustomization"
          getFormData={getFormData}
          reset={clearAll}
          modifications={showModifiers ? modifications : []}
          validateModifiers={validateModifiers}
          handleValidate={validateModifiers}
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
                  <img src={plusicon} alt="" /> Add Modification
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
                        // draggable
                        // onDragStart={(e) => onDragStart(e, modIndex)}
                        // onDragOver={(e) => e.preventDefault()}
                        // onDrop={(e) => onDrop(e, modIndex)}
                        style={{
                          opacity: modifications[modIndex]?.isEnabled
                            ? "100%"
                            : "50%",
                        }}
                      >
                        {showModifiers && (
                          <div className="AddModifiersMainInputSection">
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
                                  style={{
                                    opacity: modifications[modIndex]?.isEnabled
                                      ? "100%"
                                      : "50%",
                                  }}
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  onInput={(e) => {
                                    const input = e.target as HTMLInputElement;
                                    const regex = /^[a-zA-Z\s]*$/;
                                    if (!regex.test(input.value)) {
                                      input.value = input.value.replace(
                                        /[^a-zA-Z\s]/g,
                                        ""
                                      );
                                    }
                                  }}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    if (!/\d/.test(inputValue)) {
                                      handleModifierChange(
                                        modIndex,
                                        e,
                                        modifier.selectionType
                                      );
                                    }
                                    valiadteModifierName(modIndex, e);
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
                                  <span className="SpanDelete"><img src={minus} alt="" /></span>Delete
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
                                    handleModifierChangeforradio(
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
                                    handleModifierChangeforradio(
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

                                      // style={{
                                      //   height:customizationerrors[modIndex]?.options[
                                      //     optIndex
                                      //   ]?.optionNameError !== "" ||customizationerrors[modIndex]?.options[
                                      //     optIndex
                                      //   ]?.optionPriceError !== "" ?"5.2rem":"3rem"
                                      // }}
                                    >
                                      <div className="option-name-errormsg">
                                        <input
                                          placeholder="Option (Item)*"
                                          className="input-option-name-field"
                                          name="modifierOptionName"
                                          type="text"
                                          style={{
                                            opacity: modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.isEnabled
                                              ? "100%"
                                              : "50%",
                                          }}
                                          onInput={(e) => {
                                            const input =
                                              e.target as HTMLInputElement;
                                            const regex = /^[a-zA-Z\s]*$/;
                                            if (!regex.test(input.value)) {
                                              input.value = input.value.replace(
                                                /[^a-zA-Z\s]/g,
                                                ""
                                              );
                                            }
                                          }}
                                          disabled={
                                            !modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.isEnabled ||
                                            !modifications[modIndex]?.isEnabled
                                          }
                                          value={
                                            modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.modifierOptionName ||
                                            modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.modifierName ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            const value = e.target.value;

                                            addOptionChange(
                                              modIndex,
                                              optIndex,
                                              e
                                            );
                                            valiadteModifierOptions(
                                              modIndex,
                                              optIndex,
                                              e
                                            );
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
                                          style={{
                                            opacity: modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.isEnabled
                                              ? "100%"
                                              : "50%",
                                          }}
                                          disabled={
                                            !modifications[modIndex]
                                              ?.modifierOptions[optIndex]
                                              ?.isEnabled ||
                                            !modifications[modIndex]?.isEnabled
                                          }
                                          value={
                                            modifier.modifierOptions[optIndex]
                                              .cost ||
                                            modifier.modifierOptions[optIndex]
                                              .sellPrice ||
                                            ""
                                          }
                                          onChange={(e) => {
                                            const value = e.target.value;

                                            // Restrict to 4 digits
                                            if (value.length <= 4) {
                                              addOptionChange(
                                                modIndex,
                                                optIndex,
                                                e
                                              );
                                              valiadteModifieroptionsprice(
                                                modIndex,
                                                optIndex,
                                                e
                                              );
                                            }
                                          }}
                                          onKeyDown={(
                                            e: React.KeyboardEvent<HTMLInputElement>
                                          ) => {
                                            const input =
                                              e.target as HTMLInputElement;
                                            if (
                                              ["e", "E", "+", "-"].includes(
                                                e.key
                                              ) ||
                                              (e.key === "." &&
                                                input.value.includes("."))
                                            ) {
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
                                             <img src={plusicon} alt="" />
                                              <span className="spanadd" >
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
                                            <img src={minus} alt="" /> Delete
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  )
                                )}
                            </div>

                            <div
                              className={`Spinner-input-ItemCustomizations ${modifications.length - 1 === modIndex?"Spinner-input-ItemCustomization-height":""}`}
                             
                            >
                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                                  className={
                                    modifications[modIndex]?.selectionType ===
                                    "Optional"
                                      ? "labelItemCustomizations-disable"
                                      : "labelItemCustomizations"
                                  }
                                  htmlFor=""
                                >
                                  Minimum selection
                                </label>
                                <input
                                  type="number"
                                  placeholder=""
                                  className={
                                    modifications[modIndex]?.selectionType ===
                                    "Optional"
                                      ? "input3ItemCustomizations-disable"
                                      : "input3ItemCustomizations"
                                  }
                                  value={
                                    modifications[modIndex]?.minSelection
                                      ? modifications[modIndex]?.minSelection
                                      : modifications[modIndex]
                                          ?.selectionType === "Optional"
                                      ? 0
                                      : 1
                                  }
                                  name="minSelection"
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    handleModifierChange(modIndex, e);
                                  }}
                                  onKeyDown={(
                                    e: React.KeyboardEvent<HTMLInputElement>
                                  ) => {
                                    const input = e.target as HTMLInputElement;
                                    if (
                                      ["e", "E", "+", "-"].includes(e.key) ||
                                      (e.key === "." &&
                                        input.value.includes("."))
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                  disabled={
                                    modifications[modIndex]?.selectionType ===
                                      "Optional" ||
                                    !modifications[modIndex]?.isEnabled
                                  }
                                />
                                
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                    className={
                                      modifications[modIndex]?.selectionType ===
                                      "Optional"
                                        ? "polyimg-ItemCustomizations-disable"
                                        : "polyimg-ItemCustomizations"
                                    }
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
                                          modifications[modIndex]?.isEnabled,
                                          modifications[modIndex]?.selectionType
                                        );
                                      }
                                    }}
                                  />
                                  <img
                                    className={
                                      modifications[modIndex]?.selectionType ===
                                      "Optional"
                                        ? "polyimg-ItemCustomizations-disable"
                                        : "polyimg-ItemCustomizations"
                                    }
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
                                  type="number"
                                  placeholder=""
                                  className="input3ItemCustomizations"
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  value={
                                    modifications[modIndex]?.maxSelection
                                      ? modifications[modIndex]?.maxSelection
                                      : modifications[modIndex]
                                          ?.selectionType === "Optional"
                                      ? 0
                                      : 1
                                  }
                                  name="maxSelection"
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                  onKeyDown={(
                                    e: React.KeyboardEvent<HTMLInputElement>
                                  ) => {
                                    const input = e.target as HTMLInputElement;
                                    if (
                                      ["e", "E", "+", "-"].includes(e.key) ||
                                      (e.key === "." &&
                                        input.value.includes("."))
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                                <div className="polydiv-ItemCustomizations">
                                  <img
                                    className="polyimg-ItemCustomizations"
                                    src={Polygon1}
                                    alt=""
                                    onClick={() =>
                                      incrementSpinner(
                                        modIndex,
                                        "maxSelection",
                                        modifications[modIndex]?.isEnabled,
                                        modifications[modIndex]?.selectionType
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
                                        "maxSelection",
                                        modifications[modIndex]?.isEnabled
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="Spinner-inputlabel-ItemCustomizations">
                                <label
                                  className="label1ItemCustomizations"
                                  htmlFor=""
                                >
                                  No.of Free customization
                                </label>
                                <input
                                  placeholder=""
                                  type="number"
                                  className="input3ItemCustomizations"
                                  name="freeCustomization"
                                  disabled={!modifications[modIndex]?.isEnabled}
                                  value={
                                    modifications[modIndex]
                                      ?.freeCustomization !== undefined
                                      ? modifications[modIndex]
                                          ?.freeCustomization
                                      : 0
                                  }
                                  onChange={(e) =>
                                    handleModifierChange(modIndex, e)
                                  }
                                  onKeyDown={(
                                    e: React.KeyboardEvent<HTMLInputElement>
                                  ) => {
                                    const input = e.target as HTMLInputElement;
                                    if (
                                      ["e", "E", "+", "-"].includes(e.key) ||
                                      (e.key === "." &&
                                        input.value.includes("."))
                                    ) {
                                      e.preventDefault();
                                    }
                                  }}
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
                                        modifications[modIndex]?.isEnabled,
                                        "Optional"
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
                                  EnabledOrNot={true}
                                  onSelect={(value) =>
                                    handleSelect3(
                                      value,
                                      modIndex,
                                      modifications[modIndex]?.isEnabled
                                    )
                                  }
                                  options={listOfStreams}
                                  width="Drop1"
                                  validation={validationState.items}
                                  label={`Available Service Stream${
                                    atleastOnestream ? "*" : ""
                                  }`}
                                />
                                {customizationerrors[modIndex]
                                  ?.errormsgforselectedvalues && (
                                  <span className="nameErrormsg  availbleservicestreams">
                                    {
                                      customizationerrors[modIndex]
                                        ?.errormsgforselectedvalues
                                    }
                                  </span>
                                )}
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
