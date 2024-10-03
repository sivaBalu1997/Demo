





import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import "./ItemCustomizations.scss";
import dotted from "../../../assets/images/dotted.png";
import Toggle from "../../../components/productCatalog/Toggle/Toggle";
import Polygon1 from "../../../assets/images/Polygon 1.png";
import Polygon2 from "../../../assets/images/Polygon 2.png";
import { useDispatch, useSelector } from "react-redux";
import { itemCustomizationPost } from "../../../redux/productCatalog/productCatalogActions";
import Serachicon from "../../../assets/images/searchicon.png";
import DropDown3 from "../../../components/productCatalog/DropDownItem/DropDownItem";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import SaveAndNext from "components/productCatalog/Savenextbutton/SaveAndNext";
import SidePanel from "pages/SidePanel";
import { Contextpagejs } from "../contextpage";
import Dropdown from "components/productCatalog/DropDown/Dropdown";

// Define types
interface Option {
  item: string;
  price: string;
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

const modIndex = 0; // Example index, ensure these are within array bounds
const optIndex = 0;

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
  [key: string]: any; // Define specific types if known, e.g., number | string
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
  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const [validationState, setValidationState] = useState({
    items: { isValid: true, errorMessage: "" },
  });

  const [showModifiers, setShowModifiers] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [options, setOptions] = useState<string[]>([
    "Option2",
    "Option2",
    "Option 3",
  ]);
  const [selectedValue, setSelectedValue] = useState<string[]>([]);
  // const [customItemavailability, setCustomItemavailability] = useState<boolean>(false);
  const [isvalid, setIsValid] = useState<boolean>(false);

  const [modifications, setModifications] = useState<Modification[]>([
    {
      modifierName: "",
      options: [
        {
          item: "",
          price: "",
        },
      ],
      minSelection: 1,
      maxSelection: 1,
      freeCustomization: 1,
      selectedValue: selectedValue,
      selectionType:"Optional",

    },
  ]);

  const [filteredModifications, setFilteredModifications] = useState<Modification[]>([]);

  useEffect(() => {
    if (showModifiers === false) {
      setIsValid(true);
    }

    if (itemCustomizationData.length > 0) {
      const mappedModifications = itemCustomizationData.map((item) => ({
        modifierName: item.modifierName || "",
        options: item.options
          ? item.options.map((option) => ({
              item: option.item || "",
              price: option.price || "",
            }))
          : [{ item: "", price: "" }],
        minSelection: item.minSelection || 1,
        maxSelection: item.maxSelection || 1,
        freeCustomization: item.freeCustomization || 1,
        selectedValue: item.selectedValue.map((elem) => elem) || "",
        endDate: item.endDate || "",
        startDate: item.startDate || "",
        selectionType: item.selectionType || "",
      }));
      setModifications(mappedModifications);
    }
  }, [itemCustomizationData, showModifiers]);

  const addModifier = () => {
    setModifications([
      ...modifications,
      {
        modifierName: "",
        options: [
          {
            item: "",
            price: "",
          },
        ],
        minSelection: 1,
        maxSelection: 1,
        freeCustomization: 1,
        selectedValue: selectedValue,
              selectionType:"Optional",

      },
    ]);
  };

  const getFormData = (): FormData => {
    const formData = new FormData();
    modifications.forEach((modification, index) => {
      formData.append(`modification_${index}`, JSON.stringify(modification));
    });
    return formData;
  };

  const handleModifierChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newModifications = [...modifications];
    const property = name.split("-")[0];

    newModifications[index][property] = value as Modification[typeof property];
    setModifications(newModifications);
  };

  const addOption = (index: number) => {
    const newOption = [...modifications];
    newOption[index].options.push({
      item: "",
      price: "",
    });
    setModifications(newOption);
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
    const newModifier = [...modifications];
    newModifier[modIndex].options[optIndex][e.target.name as keyof Option] =
      e.target.value;
    setModifications(newModifier);
  };

  const incrementSpinner = (index: number, field: keyof Modification) => {
    const newModifier = [...modifications];
    if (newModifier[index]) {
      newModifier[index][field as keyof Modifier] =
        (parseInt(
          newModifier[index][field as keyof Modifier]?.toString() || "0",
          10
        ) || 0) + 1;
    }
    setModifications(newModifier);
  };

  const getModifierClassName = (length:any) => {
    if (length ==1) {
      return "modifier-div-margin";
    } else if (length == 2) {
      return "modifier-div-margin2";
    } else if(length==3) {
      return "modifier-div-margin3";
    }
    else if(length==4) {
      return "modifier-div-margin4";
    }
    
  };

  const decrementSpinner = (index: number, field: keyof Modification) => {
    const newModifier = [...modifications];
    if (newModifier[index]) {
      newModifier[index][field as keyof Modifier] =
        (parseInt(
          newModifier[index][field as keyof Modifier]?.toString() || "0",
          10
        ) || 0) - 1;
    }
    setModifications(newModifier);
  };

  const deleteOption = (modIndex: number, optIndex: number) => {
    const newModifications = [...modifications];
    newModifications[modIndex].options.splice(optIndex, 1);
    setModifications(newModifications);
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

  const clerall = () => {
    console.log("item cleared");
  };

  const handleSelect3 = (values: string[], index: number): void => {
    // Update selectedValue state
    setSelectedValue(values);

    // Update modifications state
    setModifications((prevModifications) => {
      const newModifications = [...prevModifications];
      newModifications[index] = {
        ...newModifications[index],
        selectedValue: values,
      };
      return newModifications;
    });
  };

  useEffect(() => {
    const filtered = modifications.filter((modifier) =>
      modifier.modifierName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredModifications(filtered);
  }, [searchQuery, modifications]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteModifier = (index: number) => {
    const newmodification = [...modifications];
    newmodification.splice(index, 1);
    setModifications(newmodification);
  };

  return (
    <div style={{ display: "flex" }}>
      <SidePanel />
      <div style={{ width: "80%" }}>
        <Navigationpage />
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
                onChange={handleSearchChange}
              ></input>
              <img src={Serachicon} alt="" className="searchIcon" />
            </div>

            <div className="modifiersitem">
              <div className="modifiers">
                {filteredModifications.length === 0 ? (
                  <div className="modifier-no-content">No modifiers found</div>
                ) : (
                  filteredModifications.map((modifier, modIndex) => (
                    <div
                    className={getModifierClassName(modifier.options.length)}

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
                              value={
                                filteredModifications[modIndex].modifierName
                              }
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
                                checked={modifier.selectionType === "Mandatory"} // Bind the checked property to the state
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
                                checked={modifier.selectionType === "Optional"} 
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
                            {modifier.options &&
                              modifier.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={
                                    modifier.options.length - 1 >= 1
                                      ? "option-input-flex-column1-ItemCustomizations"
                                      : "option-input-flex-column-ItemCustomizations"
                                  }
                                >
                                  <div>
                                    <input
                                      placeholder="Option (Item)*"
                                      className="input2ItemCustomizations"
                                      name="item"
                                      type="text"
                                      value={modifier.options[optIndex].item}
                                      onChange={(e) =>
                                        addOptionChange(modIndex, optIndex, e)
                                      }
                                      onBlur={(e) =>
                                        handleBlur(e, modIndex, optIndex)
                                      }
                                    />
                                    {modificationError[modIndex]?.options?.[
                                      optIndex
                                    ]?.item && (
                                      <div className="error-message1">
                                        {
                                          modificationError[modIndex]
                                            ?.options?.[optIndex]?.item
                                        }
                                      </div>
                                    )}
                                  </div>

                                  <div>
                                    <input
                                      placeholder="Price*"
                                      className="input2ItemCustomizations"
                                      name="price"
                                      type="number"
                                      value={modifier.options[optIndex].price}
                                      onChange={(e) =>
                                        addOptionChange(modIndex, optIndex, e)
                                      }
                                      onBlur={(e) =>
                                        handleBlur(e, modIndex, optIndex)
                                      }
                                    />
                                  </div>

                                  <div
                                    className={
                                      modifier.options.length - 1 >= 1
                                        ? "btn1"
                                        : "btn2"
                                    }
                                  >
                                    {optIndex === 0 && (
                                      <a
                                        className={
                                          modifier.options.length - 1 >= 1
                                            ? "btn-ItemCustomizations"
                                            : "btn-ItemCustomizations2"
                                        }
                                        onClick={() => addOption(modIndex)}
                                      >
                                        <span
                                          className={
                                            modifier.options.length - 1 >= 1
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
                              ))}
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
                                  filteredModifications[modIndex].minSelection
                                }
                                name="minSelection"
                                onChange={(e) =>
                                  handleModifierChange(modIndex, e)
                                }
                                disabled={
                                  filteredModifications[modIndex]
                                    .selectionType === "Mandatory"
                                }
                              />
                              <div className="polydiv-ItemCustomizations">
                                <img
                                  className="polyimg-ItemCustomizations"
                                  src={Polygon1}
                                  alt=""
                                  onClick={() => {
                                    if (
                                      filteredModifications[modIndex]
                                        .selectionType !== "Mandatory"
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
                                      filteredModifications[modIndex]
                                        .selectionType !== "Mandatory"
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
                                value={
                                  filteredModifications[modIndex].maxSelection
                                }
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
                                No. Free customization
                              </label>
                              <input
                                placeholder=""
                                className="input3ItemCustomizations"
                                name="freeCustomization"
                                value={
                                  filteredModifications[modIndex]
                                    .freeCustomization
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
                                options={options}
                                width="Drop1"
                                validation={validationState.items}
                                label="Meal Type*"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="dropdown-container">
                <div className="footer-save-next">
                  <SaveAndNext
                    seletedpage="ItemCustomization"
                    getFormData={getFormData}
                    reset={clerall}
                    modifications={modifications}
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
