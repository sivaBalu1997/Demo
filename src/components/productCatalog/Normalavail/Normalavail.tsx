import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle/Toggle'
import './Normalavail.scss'
import DaysCheck from '../DayCheck/DaysCheck'
import Dropdown2 from '../DropDown2/DropDown2'
import DropDown3 from '../DropDown3/DropDown3'
import DaysCheckDin from "../DayCheckDinein/DaysCheckDinein"
import { useSelector } from 'react-redux'
import LableComponent from '../LableComponent/LableComponent';
interface NormalForm {
  PickuppriceNormal: string;
  PickupmealtypeNormal: string;
  DeliverypriceNormal: string;
  DeliverymealtypeNormal: string;
  SwiggyorzomatoNormal: string;
  SwiggyNormal: string;
  SwiggymealtypeNormal: string;
  ZomatoNormal: string;
  ZomatomealtypeNormal: string;
}
interface DineInField {
  DineInPrice: string;
  DineInMealType: string[];
  DineInService: string;
  showDay: boolean;
  dayButtonText: string;
}
type DropdownValidationState = {
  [key: string]: { isValid: boolean; errorMessage: string }; // Adjust this as necessary
};

interface NormalavailProps {
  getNormalForm: (form: any) => void;
  validateDropdown: (value: string[], key: keyof DropdownValidationState) => void;

  validationState: { [key: string]: { isValid: boolean; errorMessage: string } };
  dinein: boolean;
  setDineIn: React.Dispatch<React.SetStateAction<boolean>>;
  
}

type MealType1 = string; 
type MealType = string[]; 
type SelectedValueType = string;
type SelectedValuesMealTypeState = MealType[];
type ServiceValueType = string;
interface SelectedValuesState {
  [key: number]: any; // Replace `any` with the actual type of `values`
}
type OptionType = string;
 
const Normalavail: React.FC<NormalavailProps>= ({getNormalForm,validateDropdown,validationState,dinein,setDineIn}) => {
 
  const [online, setOnline] = useState(false)
  const [pickup, setPickup] = useState(false)
  const [delivery, setDelivery] = useState(false)
  const [dineinfields, setDineInFields] = useState<DineInField[]>([
    { DineInPrice: '', DineInMealType: [], DineInService: '', showDay: false, dayButtonText: 'Add Day' }
  ]);
const [dineinentry, setDineInEntry] = useState<string[]>([]);
const [Normaldays, setNormalDays] = useState<number[]>([]);
 const [options2, setOptions2] = useState(['Breakfast', 'Lunch', 'Dinner']);;

 const [options3, setOptions3] = useState(['Breakfast', 'Lunch', 'Dinner']);
 const [options4, setOptions4] = useState(['Breakfast', 'Lunch', 'Dinner']);
 const [options5, setOptions5] = useState(['Breakfast', 'Lunch', 'Dinner']);
 const [options6, setOptions6] = useState(['Breakfast', 'Lunch', 'Dinner']);
 const [availabilityid, setAvailabilityid] = useState<string[]>([]); 
 const [selectedValues, setSelectedValues] = React.useState<SelectedValuesState>({});


 const [selectedValues2, setSelectedValues2] = useState<string[]>([]);
 const [selectedValues3, setSelectedValues3] = useState<string[]>([]);
 const [selectedValues4, setSelectedValues4] = useState<string[]>([]);
 const [selectedValues5, setSelectedValues5] = useState<string[]>([])
 
 
 
 const [selectedValuesmealtype, setSelectedValuesMealType] = React.useState<SelectedValuesMealTypeState>([]);
 const [optionsmealtype, setOptionsMealType] = useState(['Breakfast', 'Lunch', 'Dinner']);;
//   {_-------------------Array for Day Check---------------------------------}
const[dineInDates,setDineInDates]=useState([])
  const[DayPickup,setDayPickup]=useState<number[]>([]);
  const[DayDelivery,setDayDelivery]=useState<number[]>([])
  const[DayThird,setDayThird]=useState<number[]>([])
  const [dineInDates1, setDineInDates1] = useState<number[][]>([[]]);

 
 
//   {_-------------------Use State  for Showing Day checck ---------------------------------}
const[showDay,setShowDay]=useState(false)
const[showDayPickup,setShowDayPickup]=useState(false)
 
const[showDayDelivery,setShowDayDelivery]=useState(false)
const[showDayThird,setShowDayThird]=useState(false)
const prizingDetail = useSelector((state: any) => state.PricingDetailReducer.prizingData.mainForm);

 
 
 
 
 
 
 
 
 
    const[formNormal,setformNormal]=useState({
 
 
        PickuppriceNormal:"",
        PickupmealtypeNormal:"",
        DeliverypriceNormal:"",
        DeliverymealtypeNormal:"",
        SwiggyorzomatoNormal:"",
        SwiggyNormal:"",
        SwiggymealtypeNormal:"",
        ZomatoNormal:"",
        ZomatomealtypeNormal:"",
       
   
      })
 
     
 
      const [buttonText, setButtonText] = useState( [{ChooseDay: 'Choose Day'}]);
      const [Text, setText] = useState(dineinfields.map(() => 'Set up for Specific Day'));
 
      const mainForm=
        {
          availabilityid:availabilityid,
        formNormal,
        dineinfields,
       Normaldays:Normaldays,
       DeliveryMealType:selectedValues3,
       PicupMealType:selectedValues2,
      Pickup:DayPickup,
   
       DineInServiceArea:[selectedValues],
        Delivery:DayDelivery,
   
        thirdParty:DayThird,
      WeekDays:dineInDates1,
  
      DineIn:dineInDates1,
      Swiggy:selectedValues4,
      Zomato:selectedValues5
        }
        useEffect(() => {
          if (prizingDetail?.normalForm?.formNormal) {
            setformNormal({
              PickuppriceNormal: prizingDetail.normalForm.formNormal.PickuppriceNormal || "",
              PickupmealtypeNormal: prizingDetail.normalForm.formNormal.PickupmealtypeNormal || "",
              DeliverypriceNormal: prizingDetail.normalForm.formNormal.DeliverypriceNormal || "",
              DeliverymealtypeNormal: prizingDetail.normalForm.formNormal.DeliverymealtypeNormal || "",
              SwiggyorzomatoNormal: prizingDetail.normalForm.formNormal.SwiggyorzomatoNormal || "",
              SwiggyNormal: prizingDetail.normalForm.formNormal.SwiggyNormal || "",
              SwiggymealtypeNormal: prizingDetail.normalForm.formNormal.SwiggymealtypeNormal || "",
              ZomatoNormal: prizingDetail.normalForm.formNormal.ZomatoNormal || "",
              ZomatomealtypeNormal: prizingDetail.normalForm.formNormal.ZomatomealtypeNormal || "",
            });
      
            const updatedFields = prizingDetail?.normalForm?.dineinfields.map((item: any) => ({
              DineInPrice: item?.DineInPrice || "",
              DineInMealType: item.DineInMealType || [], // Ensure it's an array for dropdowns
              DineInService: item?.DineInService || "",
              showDay: false,
              dayButtonText: "Choose Day",
            }))
       
            setDineInFields(updatedFields);
       
            // Initialize selected values
            const initialSelectedValues = updatedFields.map((item: any) => item.DineInMealType);
            setSelectedValuesMealType(initialSelectedValues);
 
            const initialSelectedValues2 = updatedFields.map((item: any) => item.DineInService);
      setSelectedValues(initialSelectedValues2);
      setDineIn(true);
 
      const WeekDays = prizingDetail?.normalForm?.WeekDays;

      
       
           
     
           
         
          }
 
         
      const mainForm=
      {
        availabilityid,
      formNormal,
      dineinfields,
     Normaldays:Normaldays,
     DeliveryMealType:selectedValues3,
     PicupMealType:prizingDetail?.normalForm?.PicupMealType||selectedValues2,
    Pickup:DayPickup,
 
     DineInServiceArea:[selectedValues],
      Delivery:DayDelivery,
 
      thirdParty:DayThird,
    WeekDays:dineInDates1,
  
    DineIn:dineInDates1,
   
      }
 
          if (prizingDetail?.normalForm) {
            setSelectedValues2(prizingDetail.normalForm.PicupMealType  || selectedValues2);
            // Other state initializations...
          }
     
      if (prizingDetail?.normalForm) {
        setSelectedValues3(prizingDetail.normalForm.DeliveryMealType  || selectedValues3);
        // Other state initializations...
      }
      if (prizingDetail?.normalForm) {
        setSelectedValues4(prizingDetail.normalForm.Swiggy  || selectedValues4);
        // Other state initializations...
      }
      if (prizingDetail?.normalForm) {
        setSelectedValues5(prizingDetail.normalForm.Zomato  || selectedValues5);
        // Other state initializations...
      }
 
      if (prizingDetail?.normalForm) {
     
        setDayPickup(prizingDetail.normalForm.Pickup || []);
       
        setShowDayPickup(true     )
    }
 
    if (prizingDetail?.normalForm) {
     
      setDayDelivery(prizingDetail.normalForm.Delivery || []);
     
      setShowDayDelivery(true)
  }
 
 
  if (prizingDetail?.normalForm) {
     
    setDayThird(prizingDetail.normalForm.thirdParty || []);
 
    setShowDayThird(true)
}
 
if (prizingDetail?.normalForm) {
     
  setNormalDays(prizingDetail.normalForm.Normaldays || []);
 
}
 
   
     
 
 
 
 
        }, []);
        const handleDelete = (index: number): void => {
          // Filter out the entry at the given index
          const newEntries = dineinfields.filter((_, i) => i !== index);
          setDineInFields(newEntries);
        
          // Handle selected values
          const newSelectedValues1 = { ...selectedValues };
          delete newSelectedValues1[index];
          setSelectedValues(newSelectedValues1);
        
          // Handle selected meal type values
          const newSelectedValuesMealtype = { ...selectedValuesmealtype };
          delete newSelectedValuesMealtype[index];
          setSelectedValuesMealType(newSelectedValuesMealtype);
        
          // Handle dine-in dates
          const newArray = [...dineInDates1];
          newArray.splice(index, 1);
          setDineInDates1(newArray);
        };
   
       
   
        const AddDineInEntry = () => {
          setDineInEntry([...dineinentry, ""]);
          setDineInFields([...dineinfields, { DineInPrice: '', DineInMealType: [], DineInService: '', showDay: false, dayButtonText: "Choose Day" }]);
        };
        const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>): void => {
          // Create a copy of the current state
          const newEntries = [...dineinfields];
          
          // Update the specific field in the copied state
          newEntries[index] = {
            ...newEntries[index],
            [e.target.name as keyof DineInField]: e.target.value
          };
          
          // Set the updated state
          setDineInFields(newEntries);
        };
 
        const addDay = (index: number): void => {
  const newText = [...Text];
  const tempArray = [...dineInDates1];
  const newDineInFields = [...dineinfields];
  
  if (Text[index] === 'Set up for Specific Day') {
    newText[index] = 'Set up for All Days';
    tempArray[index] = []; // Clears the dates for the specific index
    newDineInFields[index].showDay = false;
  } else {
    newText[index] = 'Set up for Specific Day';
    newDineInFields[index].showDay = true;
    // tempArray[index] remains unchanged, so it keeps the current dates
  }

  setText(newText);
  setDineInDates1(tempArray);
  setDineInFields(newDineInFields);
};
      const addDayPickup=()=>{
        setShowDayPickup(true)
 
      }
     
      const addDayPickupfalse=()=>{
        setShowDayPickup(false)
 
      }
 
      const addDayDelivery=()=>{
        setShowDayDelivery(true)
 
      }
      const addDayDeliveryfalse=()=>{
        setShowDayDelivery(false)
 
      }
 
      const addDayThird=()=>{
        setShowDayThird(true)
      }
     
      const addDayThirdfalse=()=>{
        setShowDayThird(false)
      }
      const handleGetNormalForm = (normalForm: any) => {
        const updatedForm = { ...mainForm, normalForm };
        getNormalForm(updatedForm);
      };
      useEffect(() => {
        handleGetNormalForm(mainForm);
      }, [mainForm]); // Add any dependencies if needed
    
      
      const handleSelect2 = (values: any, index: number): void => {
        // Update selected values state
        setSelectedValues((prevState: SelectedValuesState) => ({
          ...prevState,
          [index]: values,
        }));
      
        // Update dineinfields state
        const newDineInFields = [...dineinfields];
        newDineInFields[index] = {
          ...newDineInFields[index],
          DineInService: values
        };
        setDineInFields(newDineInFields);
      };
     
      const addOption2 = (newOption: OptionType): void => {
        setOptions2(prevOptions => [...prevOptions, newOption]);
      };
      const handleSelect3 = (values: string[]): void => {
        setSelectedValues2(values);
        validateDropdown(values, 'Pickup');
      };
      const addOption3 = (newOption: OptionType): void => {
        setOptions3(prevOptions => [...prevOptions, newOption]);
      };
      const handleSelect4 = (values: string[]): void => {
        setSelectedValues3(values);
        validateDropdown(values, 'Pickup');
      };
const addOption4=(newOption: OptionType): void => {
  setOptions4([...options4, newOption]);
};
const handleSelect5 = (value:string[]): void => {
  setSelectedValues4(value);
  validateDropdown(value, 'ThirdDelivery1');
 
};
const addOption5=(newOption: OptionType): void => {
  setOptions5([...options5, newOption]);
};
const handleSelect6 = (value:string[]): void => {
  setSelectedValues5(value);
  validateDropdown(value, 'ThirdDelivery2');
};
const addOption6 =(newOption: OptionType): void => {
  setOptions6([...options6, newOption]);
};
 
const handleSelectMealtype = (value: MealType, index: number): void => {
  // Update selected values state
  const newSelectedValues = [...selectedValuesmealtype];
  newSelectedValues[index] = value;
  setSelectedValuesMealType(newSelectedValues);

  // Update dineinfields state
  const newDineInFields = [...dineinfields];
  newDineInFields[index].DineInMealType = value;
  setDineInFields(newDineInFields);

  // Validate dropdown if 'dinein' is truthy
  if (dinein) {
    validateDropdown(value, index);

  }
};
const addOptionMealType =(newOption: OptionType): void => {
  setOptionsMealType([...optionsmealtype, newOption]);
};
const handleServiceSelect2 = (index: number, value: ServiceValueType): void => {
  // Update selected values state
  setSelectedValues(value);

  // Update dineinfields state
  const newDineInFields = [...dineinfields];
  newDineInFields[index].DineInService = value;
  setDineInFields(newDineInFields);
};
const handleMealSelect2 = (index: number, value: MealType): void => {
  // Ensure index is within the bounds of the array
  if (index < 0 || index >= dineinfields.length) {
    console.error("Index out of bounds");
    return;
  }

  // Update selected values state
 
  // Update dineinfields state
  const newDineInFields = [...dineinfields];
  newDineInFields[index].DineInMealType = value;
  setDineInFields(newDineInFields);
};
  
 
 
  return (
    <div>
      <div className='AvailDaycheck'>
        <h1 className='AvailableDaysHeadingNormal'>Available days</h1>
        <div className='dayschecking'>
        <DaysCheck checkedItems={Normaldays} setCheckedItems={setNormalDays} id={availabilityid} setId={setAvailabilityid}></DaysCheck>
 
        </div>
        </div>
        <h1 className='AvailableServiceHeading'>Avaliable Service Streams</h1>
        {/* DineIn Related */}
        <div className='DineInRelated'>
          <h1 className='DineInRelatedHeadingNormalAvail'>Dine In</h1>
          <div className='toggleII'><Toggle toggle={dinein} setToggle={setDineIn} /></div>
        </div>
        {dinein ? (
          <>
          
           
            {dineinfields.map((entry,index) => {
              return (
                <>
                <div className='LabelPrice'>
                 <LableComponent lable="Price*"/>
                 </div>
                   <div className='DineInInput11Normal' key={index} style={{ zIndex: dineinfields.length - index }}>
          <input
            type="text"
           
            name='DineInPrice'
            value={entry.DineInPrice}
            className='DineInInput1Normal'
            onChange={(e) => handleChange(index, e)}
           
          />
          <div className='Mealz'>
          <DropDown3
                    selectedValues={selectedValuesmealtype[index] || ''}
                    onSelect={(values)=>handleSelectMealtype(values,index)}
                    options={optionsmealtype}
                    addOption={addOptionMealType}
                    placeholder="Meal Type*"
                    index={index}
                    label="Meal Type*"
                    onBlur={() => validateDropdown(selectedValuesmealtype[index] || [], index)}
                    validation={validationState[index] || { isValid: true, errorMessage: '' }}
                    
                  />
 
</div>
         
       <div className='Service'>
          <Dropdown2
                    selectedValues={selectedValues[index] || ''}
                    onSelect={(values) => handleSelect2(values, index)}
                    options={options2}
                    label="Service Area*"
                    index={index}
                    onChange={(e)=>handleServiceSelect2(index,e.target.value)}
                  />
       
       </div>
       <h1 onClick={() => handleDelete(index)} className='DeleteButtonDine'>- Delete</h1>
        </div>
        <div className='dineInChooseDayContainer'>
             
                 
                  <h3 className='dineInChooseDayContainerHeading'>Choose for Specific day</h3>
                  <h3 className='dineInChooseDayContainer-chooseheading' onClick={() => addDay(index)}>
                 {entry.dayButtonText}
                </h3>
               
              </div>
        <div className='dayspickup'>
        {entry.showDay && (
            <DaysCheckDin checkedItems={dineInDates1} setCheckedItems={setDineInDates1} index={index} {...(availabilityid ? { id: availabilityid, setId: setAvailabilityid } : {})}
/>
        )}
        </div>
       
       
                </>
              )
            })
            }
 
            <h1 className='AddentryNormal' onClick={AddDineInEntry}> + Add entry</h1>
 
 
          </>
        ) : ""
        }
        {/* OnlineRelated */}
        <div className='OnlineRelatedNormal'>
          <h1 className='OnlineRelatedHeadingNormal'>Online</h1>
          <div className='toggleIII'><Toggle toggle={online} setToggle={setOnline} /></div>
        </div>
        <div className='OnlineSectionNormal'>
          {online ?
            <div className='onlineselected'>
              {/* PickupRelated */}
              <div className='PickupRelatedNormal'>
                <h1 className='PickupRelatedHeadingNormal'>Pick Up</h1>
                <div className='toggleIV'><Toggle toggle={pickup} setToggle={setPickup} /></div>
                </div>
                <div className='PickupSectionNormal'>
                {pickup ?
                 <div>
                    <div className='LabelPricePickup'>
                 <LableComponent lable="Price*"/>
                 </div>
                   <div className='PickupInput11Normal'>
                    <input type="text" className='DineInInput1Normal'  value={formNormal.PickuppriceNormal}  onChange={(e) => setformNormal({ ...formNormal,"PickuppriceNormal":e.target.value })} ></input>
                <div className='PrizeD'>
                <DropDown3
      selectedValues={selectedValues2}
      onSelect={handleSelect3}
      options={options3}
      addOption={addOption3}
      onBlur={() => validateDropdown(selectedValues2, 'Pickup')}
      validation={validationState.Pickup}
      label="Meal Type*"
      placeholder='MealType'
    />
        </div>
     
                    </div>
                    <div>
             
            <div className='dineInChooseDayContainer'>
            {showDayPickup?<h3 className='dineInChooseDayContainerHeading'>Back for default days</h3>:<h3 className='dineInChooseDayContainerHeading'>Setup for specific days?</h3>}
            {showDayPickup?<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayPickupfalse}>Default days</h3>:<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayPickup}>Choose Day</h3>}
          </div>
 
        <div className='dayspickup'>
        {showDayPickup?<DaysCheck
          checkedItems={DayPickup}
          setCheckedItems={setDayPickup}
          {...(availabilityid.length > 0
            ? { id: availabilityid, setId: setAvailabilityid }
            : { id: [], setId: () => {} } // Provide default empty values if `availabilityid` is empty
          )}
        />:""}
 
        </div>
                   
 
        </div>
                    </div>
 
                   
                   : ""}
                   </div>
                   
          {/* DeliveryRelated    */}
              <div className='DeliveryRelatedNormal'>
              <h1 className='DeliveryRelatedHeadingNormal'>Delivery</h1>
                <div className='toggleV'><Toggle toggle={delivery} setToggle={setDelivery} /></div>
                </div>
                <div className='DeliverySectionNormal'>
                {delivery ?
                 <div>
                   <p className='LabelPrice'> Price*</p>
                   <div className='DineInInput11Normal delivery'>
                    <input type="text" className='DineInInput1Normal' value={formNormal.DeliverypriceNormal} onChange={(e) => setformNormal({ ...formNormal,"DeliverypriceNormal":e.target.value })} ></input>
                    <div className='DeliveryD'>
                    <DropDown3
          selectedValues={ selectedValues3}
          onSelect={handleSelect4}
          options={options4}
          addOption={addOption4}
          label="Meal Type*"
          onBlur={() => validateDropdown(selectedValues3, 'Delivery')}
              validation={validationState.Delivery}
              placeholder='Height'
        />
        </div>          
                    </div>
                    <div className='dineInChooseDayContainer'>
            {showDayDelivery?<h3 className='dineInChooseDayContainerHeading'>Back for default days</h3>:<h3 className='dineInChooseDayContainerHeading'>Setup for specific days?</h3>}
            {showDayDelivery?<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayDeliveryfalse}>Default days</h3>:<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayDelivery}>Choose Day</h3>}
          </div>
 
        <div className='dayspickup'>
        {showDayDelivery?<DaysCheck
          checkedItems={DayDelivery}
          setCheckedItems={setDayDelivery}
          {...(availabilityid.length > 0
            ? { id: availabilityid, setId: setAvailabilityid }
            : { id: [], setId: () => {} } // Provide default empty values if `availabilityid` is empty
          )}
        />:""}
 
        </div>
                    </div>
                   
                   : ""}
                   </div>
 
                   
                 
                   <h1 className='ThirdDeliveryRelatedHeadingNormal'>Third Party delivery</h1>
                   <div>
                   <p className='LabelPrice1'> Swiggy,Zomato*</p>
                   <div className='Delivery11'>
                   <input type="text" className='DeliveryInput2Normal'     onChange={(e)=>setformNormal({ ...formNormal,"SwiggyorzomatoNormal":e.target.value })} ></input>
                   </div>
                   <p className='LabelPrice2'> Swiggy Price*</p>
                   <div className='Delivery12'>
                    <input type="text" className='DineInInput1Normal' value={formNormal.SwiggyNormal}   onChange={(e)=>setformNormal({ ...formNormal,"SwiggyNormal":e.target.value })} ></input>
                    <div className='Third1'>
                    <DropDown3
          selectedValues={selectedValues4}
          onSelect={handleSelect5}
          options={options5}
          addOption={addOption5}
          placeholder="Meal Type*"
          label="Meal Type*"
          onBlur={() => validateDropdown(selectedValues4, 'ThirdDelivery1')}
              validation={validationState.ThirdDelivery1}
        />
        </div>
                 
                    </div>
                    <p className='LabelPrice2'> Zomato Price*</p>
                    <div className='Delivery13'>
                    <input type="text" className='DineInInput1Normal' value={formNormal.ZomatoNormal} onChange={(e)=>setformNormal({ ...formNormal,"ZomatoNormal":e.target.value })} ></input>
                    <div className='Third2'>
                    <DropDown3
          selectedValues={selectedValues5}
          onSelect={handleSelect6}
          options={options6}
          addOption={addOption6}
          placeholder="Meal Type*"
          label="Meal Type*"
          onBlur={() => validateDropdown(selectedValues5, 'ThirdDelivery2')}
              validation={validationState.ThirdDelivery2}
        />
        </div>
                 
                    </div>
                    </div>
                    <div className='dineInChooseDayContainer'>
            {showDayThird?<h3 className='dineInChooseDayContainerHeading'>Back to Default days</h3>:<h3 className='dineInChooseDayContainerHeading'>Setup for specific days?</h3>}
            {showDayThird?<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayThirdfalse}>Default Days</h3>:<h3 className='dineInChooseDayContainer-chooseheading' onClick={addDayThird}>Choose Day</h3>}
 
           
 
 
        </div>
        {showDayThird? <DaysCheck
          checkedItems={DayThird}
          setCheckedItems={setDayThird}
          {...(availabilityid.length > 0
            ? { id: availabilityid, setId: setAvailabilityid }
            : { id: [], setId: () => {} } // Provide default empty values if `availabilityid` is empty
          )}
        />:""}
            </div>
             
           
            : ""}
        </div>
 
    </div>
  )
}
 
export default Normalavail
 