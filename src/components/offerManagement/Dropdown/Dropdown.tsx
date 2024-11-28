import React, { useRef, useState, useEffect } from "react";
import "./Dropdown.scss";
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
  onToggle: () => void;
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  resetSelection?: any;
  parentId?: any;
  bestpair?: boolean;
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
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [manuallyCleared, setManuallyCleared] = useState(false);
  const [dropDownLoading,setdropDownLoading] =useState(false)

  const dispatch = useDispatch();

  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );

  const deleteApicall = useSelector(
    (state: any) => state.productCatalog?.deletesubsectionsuccess
  );

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
    event.stopPropagation();
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
        trigger(name);
      } else {
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
      dropDownType ==='CATEGORY' && setParentId(option?.id)
    }

    setSearchTerm("");
  };

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
    //console.log("kkkk",selectedOptions,value)

    setOptions(
      (item: any) => item && item?.filter((opt: any) => opt.id !== value)
    );
  };
  const handleCheckboxChange = (option: Option) => {
    if (type === "checkbox") {
      setSelectedOptions((prevSelected) => {
        const isAlreadySelected = prevSelected?.findIndex(
          (opt) => opt.id === option.id
        );

        let updatedSelected;

        if (isAlreadySelected !== -1) {
          updatedSelected = prevSelected.filter(
            (_, index) => index !== isAlreadySelected
          );
        } else {
          if (bestpair && prevSelected.length >= 5) {
            return prevSelected;
          }
          updatedSelected = [...prevSelected, option];
        }

        setValue(name, updatedSelected.map((opt) => opt.name).join(", "));
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
    const newValue = NewItemref?.current?.value;

    const newItem = {
      locationId: '',
      name: newValue,
      type: dropDownType,
      parentId: parentId && parentId,
    };

    setOptions([
      ...(Array.isArray(initialOptions) ? initialOptions : []),
      newItem,
    ]);

    // handleSelect(newItem);
    setSearchTerm("");
    setAddNewButton(false);
  };

  const [Loading, setLoading] = useState<boolean>();

  useEffect(() => {
    if (!options || options.length < 1) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [options]);

  const handleAboveArrowdropdown = () => {
    onToggle();
  };

  const handleBelowArrowdropdown = () => {
    onToggle();
  };

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div className="dropDownBox">
        <div>
          <input
          style={{width:width,height:"44px"}}
            placeholder={placeholder}
            type="text"
            {...register(name, validation)}
            value={
                type === "checkbox"
                  ? selectedOptions?.map((opt) => opt?.name)?.join(", ")
                  : selectedOptions[0]?.name || ""
            }
           // onChange={handleSearch}
            name={name}
            // onBlur={handleBlur}
            autoComplete="off"
            className={`dropdown-search`}
            // disabled={Disablesubcategory && name === "subCategory"}
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
                  handleBelowArrowdropdown();
                }}
                alt="dropdown"
                className="dropdownimageopen"
              />
            )}
          </span>
        </div>

        <div style={{ margin: 0 }}>
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
                  {!Loading && filteredOptions?.length > 0 ? (
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
                                className={`dropdown-option-delete `}
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
                    <li className="dropdown-no-options">No options found</li>
                  )}
                </div>
              )}
            </ul>
            <div className="edititem">
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
          }
        </div>
      )}
    </div>
  );
};

export default Dropdown;