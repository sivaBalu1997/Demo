import React, { useRef, useState, useEffect } from "react";
import "./DropDownList.scss";
import edit from "../../../assets/images/edit copy.png";
import dropdown from "../../../assets/images/dropdown.png";
import { FieldError } from "react-hook-form";
import { render } from "@testing-library/react";

interface Option {
  name: string;
  id: string;
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
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
  placeholder?: string;
  validation?: any;
  error?: FieldError;
  trigger: any;
  getValues: any;
  dropdownopen: boolean;
  onToggle: () => void;
  setDropdownOpen: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}

const DropDownList: React.FC<DropdownProps> = ({
  name,
  options: initialOptions,
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
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [Disablesubcategory, setDisablesubcategory] = useState<boolean>(false);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen]);

  const handleOptionMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

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
  };

  useEffect(() => {
    const initialSelectedValue = getValues(name);
    if (initialSelectedValue) {
      const selectedOptionIds = initialSelectedValue.split(", ").map((value: string) => {
        return initialOptions.find((opt) => opt.name === value);
      });
      const validOptions = selectedOptionIds.filter(Boolean) as Option[];
      setSelectedOptions(validOptions);

  
      setValue(
        name,
        validOptions.map((opt) => opt.name).join(", ")
      );
    }
  }, [getValues(name), setValue, initialOptions]);



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
        setValue(name, updatedOptions.map((opt) => opt.name).join(", "));
      } else {
        const updatedOptions = [...selectedOptions, option];
        setSelectedOptions(updatedOptions);
        setValue(name, updatedOptions.map((opt) => opt.name).join(", "));
      }
    } else if (type === "radio") {
      setSelectedOptions([option]);
      setValue(name, option.name);
    }
    trigger(name);
  };

  const handleNewItemAdd = () => {
    const newItemLabel = NewItemref.current?.value.trim();
    if (newItemLabel) {
      const newItem: Option = {
        id: (initialOptions.length + 1).toString(),
        name: newItemLabel,
      };
      setOptions([...initialOptions, newItem]);
      handleSelect(newItem);
      setSearchTerm("");
      setAddNewButton(false);
    }
  };

  const filteredOptions = initialOptions.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewItemAddition = () => {
    setAddNewButton((prevAddNew) => !prevAddNew);
  };

  const handleedit = () => {
    setEditList((prevEditList) => !prevEditList);
  };

  const handledeletion = (value: string) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt.id !== value));
    setOptions((item) => item.filter((opt) => opt.id !== value));
  };

  // const handleBlur = () => {
  //   trigger(name);
  // };

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div className="dropDownBox">
        <div>
          <input
            type="text"
            {...register(name, validation)}
            value={
              type === "checkbox"
                ? selectedOptions.map((opt) => opt.name).join(", ")
                : selectedOptions[0]?.name || ""
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
                onClick={onToggle}
                alt="dropdown"
                className="dropdownimageclosed"
              />
            ) : (
              <img
                src={dropdown}
                onClick={onToggle}
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
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const isOptionSelected = selectedOptions.some(
                    (opt) => opt.id === option.id
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
                          onChange={() => handleSelect(option)}
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
                            className={`dropdown-option-delete ${
                              isOptionSelected ? "disabled-delete" : ""
                            }`}
                            onClick={() => {
                              if (!isOptionSelected) handledeletion(option.id);
                            }}
                            style={
                              isOptionSelected
                                ? { pointerEvents: "none", opacity: 0.5 }
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
            </ul>
            <div>
              {!editList && editValues && (
                <p
                  className="editiconimage"
                  onMouseDown={handleOptionMouseDown}
                  onClick={() => handleedit()}
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
                  {editList && editValues && (
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
                {addNew && !addNewButton && (
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
