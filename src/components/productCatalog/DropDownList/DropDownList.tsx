import React, { useRef, useState ,useEffect} from 'react';
import './DropDownList.scss';
import edit from '../../../assets/svg/edit.svg'
import dropdown from '../../../assets/images/dropdown.png';
import { FieldError } from 'react-hook-form';

interface Option {
  name: string;
  id: string;
 
}

interface DropdownProps {
  name: string;
  type?: string;
  register: any;
  setValue: any;
  required?: boolean;
  options: Option[];
  placeholder?: string;
  validation?: any; 
  error?: FieldError; 
  trigger:any;
  getValues:any;
  isOpen: boolean;
  onToggle: () => void; 

 
}

const DropDownList: React.FC<DropdownProps> = ({
  name,
  options: initialOptions,
  type = 'text',
  register,
  setValue,
  error,
  validation,
  trigger,
  isOpen,
  onToggle,
  getValues,
  required = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [options, setOptions] = useState<Option[]>([]);
  const [addNew, setAddNew] = useState<boolean>(false);
  const NewItemref = useRef<HTMLInputElement>(null);
  const [editList,setEditList]=useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setOptions(initialOptions);
  }, [initialOptions]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle();
    setSearchTerm(e.target.value);
    if (selectedOption && e.target.value !== selectedOption.name) {
      setSelectedOption(null);
      setValue(name, null);
    }
  };
  const closeDropdown = () => {
    if (isOpen) {
      onToggle(); 
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const [Disablesubcategory,setDisablesubcategory]=useState<boolean>(false);

  useEffect(() => {
    const categoryValue = getValues('category');
    if (!categoryValue) {
      setDisablesubcategory(true);
    } else {
      setDisablesubcategory(false);
    }
  }, [getValues('category')]);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onToggle();
    setValue(name, option.name);
    if(name==="category")
    {
      setValue('categoryId',option.id);
      console.log(option.id);
    }


    setAddNew(false); 

  };

  const handleNewItemAdd = () => {
      const newItemLabel = NewItemref.current?.value.trim();
      if (newItemLabel) {
        const newItem: Option = {
          id:(options.length+1).toString(),
          name: newItemLabel,
        };
        setOptions([...options, newItem]); 
        handleSelect(newItem); 
        setSearchTerm(''); 
        setAddNew(false);  
    }
  };



  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewItemAddition = () => {
    setAddNew(!addNew);
  };
  const handleedit=()=>{
    setEditList(!editList);

  }
  const handledeletion=(value:string)=>{

    const updatedList=options.filter((item)=> item.id !==value)
    setOptions(updatedList);

  }
  const handleBlur=()=>{
    trigger(name);

  }

  return (
    <div className="dropdown-component" ref={dropdownRef}>
      <div>
        <input
          type={type}
          {...register(name,validation)}
          value={selectedOption?.name || searchTerm}
          onChange={handleSearch}
          name={name}
          onBlur={handleBlur}
         autoComplete='off'
         className={`dropdown-search ${Disablesubcategory && name === "subCategory" ? "subCategorysearch disabled" : ""}`} 
         disabled={Disablesubcategory && name === "subCategory"} 
        />
        <span
          className="dropdown-arrow"
         onClick={onToggle}
         
        >
          <img src={dropdown} alt="" className="dropdownimage" />
        </span>
        {error  && <p className='Dropdown-Error-message'>{error.message}</p>}

      </div>
     

      {isOpen && (
        <div className="dropdown-body"  >
          <ul className="dropdown-options" >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option,index) => (
                <div className='dropdown-option-list'>
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className="dropdown-option"
                >
                  <input
                    type="radio"
                    checked={selectedOption?.id === option?.id}
                    className="dropdon-option-inputfield"
                  />
                  <span className="dropdon-option-label">{option.name}</span>
                 
                  
                </li>
                <div>
                   {
                    editList && <span className='dropdon-option-delete' onClick={()=>handledeletion(option.id)}>delete</span>
                  }
                </div></div>
              ))
            ) : (
              <li className="dropdown-no-options">No options found</li>
            )}
          </ul>
          <div className='dropdown-Addbutton'>
            {addNew ? (
              <div className='dropdown-addnew'>
                <div className='dropdown-addnew-input-and-button'>
                  <input
                    type="text"
                    ref={NewItemref}
                    className='dropdown-addnew-input-filed'
                  />
                  <button
                    type='button'
                    onClick={handleNewItemAdd}
                    className='dropdown-addnew-button'
                   
                    
                  >

                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div className='Addnew-edit-fields'>
                <div className='dropdown-edit-button'>
                {
                   editList ? <p onClick={handleedit}>Done</p>:<img src={edit} alt="" onClick={handleedit}/>
                } 
                </div>
                
                
                <button
                onClick={handleNewItemAddition}
                className='dropdown-addbutton'
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
