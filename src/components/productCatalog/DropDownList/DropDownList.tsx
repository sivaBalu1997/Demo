import React, { useRef, useState, useEffect, useCallback } from "react";
import "./DropDownList.scss";
import edit from "../../../assets/images/edit copy.png";
import dropdown from "../../../assets/images/dropdown.png";
import { FieldError } from "react-hook-form";

interface Option {
  name: string;
  id: string;
}

interface DropdownProps {
  name: string;
  id?:string;
  type?: string;
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
}

const DropDownList: React.FC<DropdownProps> = ({
  name,
  options: initialOptions,
  type = "text",
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
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [addNewButton, setAddNewButton] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [Disablesubcategory, setDisablesubcategory] = useState<boolean>(false);
  const [editList, setEditList] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };
  useEffect(() => {
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onToggle]);


  useEffect(() => {
    const categoryValue = getValues("category");
    if (!categoryValue) {
      setDisablesubcategory(true);
    } else {
      setDisablesubcategory(false);
    }
  }, [getValues("category")]);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (selectedOption && e.target.value !== selectedOption.name) {
      setSelectedOption(null);
      setValue(name, null);
    }
  };


  const handleSelect = (option: Option) => {
    
    setSelectedOption(option); 
    setValue(name, option.name);
    setAddNewButton(false);
    closeDropdown()
   
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
    if(value==selectedOption?.name)
      {
        setSelectedOption(null);
      }


    setOptions((item) => item.filter((opt) => opt.id !== value));

    
  };

  const handleBlur = () => {
    trigger(name);
  };

  const closeDropdown = () => {
    if (dropdownopen) {
      onToggle();
    }
  };

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div className="dropDownBox">
        <div>
          <input
            type={type}
            {...register(name, validation)}
            value={selectedOption?.name || searchTerm}
            onChange={handleSearch}
            name={name}
            onBlur={handleBlur}
            autoComplete="off"
            className={`dropdown-search ${
              Disablesubcategory && name === "subCategory"
                ? "subCategorysearch disabled"
                : ""
            }`}
            disabled={Disablesubcategory && name === "subCategory"}
          />
          <span className="dropdown-arrow" onClick={onToggle}>
            
            <img src={dropdown} alt="" className={`${dropdownopen?"dropdownimageopen":"dropdownimageclosed" }`} />
          </span>
        </div>

        <div>
          {error && <p className="Dropdown-Error-message">{error.message}</p>}
        </div>
      </div>

      {dropdownopen && (
        <div className="dropdown-body">
          <ul className="dropdown-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  className="dropdown-option-list"
                  
                >
                  <li key={index} className="dropdown-option">
                    <input
                      type="radio"
                      checked={selectedOption?.id === option?.id}
                      className="dropdon-option-inputfield"
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
                        className="dropdon-option-delete"
                        onClick={() => handledeletion(option.id)}
                      >
                        delete
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <li className="dropdown-no-options">No options found</li>
            )}
          </ul>
          <div className="dropdown-Addbutton">
            {addNewButton ? (
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
            ) : (
              <div className="Addnew-edit-fields">
                <div className="dropdown-edit-button">
                  {editList ? (
                    <p
                      onClick={(e) => {
                        e.stopPropagation();
                        handleedit();
                      }}
                    >
                      Done
                    </p>
                  ) : (
                    <img
                      src={edit}
                      alt=""
                      className="editiconimage"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleedit();
                      }}
                    />
                  )}
                </div>

                <button
                  className="dropdown-addbutton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNewItemAddition();
                  }}
                >
                  Add new
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownList;
