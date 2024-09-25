import React, { useState, useContext, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import "./PricingDetails.scss";
import Toggle from "../../../components/productCatalog/Toggle/Toggle";
import Specialavail from "../../../components/productCatalog/SpecialAvail/Specialavail";
import Normalavail from "../../../components/productCatalog/Normalavail/Normalavail";
import { useDispatch, useSelector } from "react-redux";
import {
  getTagClassRequest,
  PricingDetailRequest,
} from "../../../redux/productCatalog/productCatalogActions";
import Dropdown from "../../../components/productCatalog/DropDownList/DropDownList";
import { useHistory } from "react-router-dom";
import { Contextpagejs } from "../contextpage";
import info from "../../assets/png/info.png";
import Navigationpage from "components/productCatalog/Navigation/NavigationPage";
import SidePanel from "pages/SidePanel";
import SaveAndNext from "components/productCatalog/Savenextbutton/SaveAndNext";
import Inventory from "components/productCatalog/Inventory/Inventory";

interface SelectedValuesState {
  [key: number]: any; // Replace `any` with the actual type of `values`
}

type MainFormType = {
  availabilityid: string[];
  formNormal: {
    PickuppriceNormal: string;
    PickupmealtypeNormal: string;
    DeliverypriceNormal: string;
    DeliverymealtypeNormal: string;
    SwiggyorzomatoNormal: string;
    SwiggyNormal: string;
    SwiggymealtypeNormal: string;
    ZomatoNormal: string;
    ZomatomealtypeNormal: string;
  };
  dineinfields: any;
  Normaldays: number[];
  DeliveryMealType: string[];
  PicupMealType: string[];
  Pickup: number[];
  DineInServiceArea: SelectedValuesState[];
  Delivery: number[];
  thirdParty: number[];
  WeekDays: number[][];
  DineIn: number[][];
  Swiggy: string[];
  Zomato: string[];
};

type DineInField = {
  DineInPrice: string | string[];
  DineInMealType: string | string[];
  DineInServiceArea?: string | string[];
  DineInService:string
  showDay: boolean
  dayButtonText: string
};

interface FormState {
  Pickupprice?: string;
  Pickupmealtype?: string;
  Deliveryprice?: string;
  Deliverymealtype?: string;
  Swiggyorzomato?: string;
  Swiggy?: string;
  Swiggymealtype?: string;
  Zomato?: string;
  Zomatomealtype?: string;
  Inventory1: string;
  Inventory2: string;
}

type MainFormSpecial = {
  form: FormState;
  dineinfields: DineInField[];
  specialcheck: number[]; // Single number, not an array
  fromDate: string | Date | undefined; // Allow undefined if needed; // Should be Date, not string
  toDate: string | Date | undefined; // Allow undefined if needed; // Should be Date, not string
  selectedValuespickup: string[];
  selectedValuesdelivery: string[];
  Swiggy: string[];
  Zomato: string[];
  Availabilityid: string[];
};

interface ValidationState {
  isValid: boolean;
  errorMessage: string;
}
interface DropdownValidationState {
  kitchen: ValidationState;
  preparationTime: ValidationState;
  DineinMeal: ValidationState;
  Pickup: ValidationState;
  Delivery: ValidationState;
  ThirdDelivery1: ValidationState;
  ThirdDelivery2: ValidationState;
  Pickupspecial: ValidationState;
  Deliveryspecial: ValidationState;
  Deliveryspecial1: ValidationState;
  Deliveryspecial2: ValidationState;
  tagName: never;
}
interface FormState1 {
  Inventory1: string;
  Inventory2: string;
}
interface Option {
  name: string;
  id: string;
}

interface MainForm {
  form: FormState1;
  kitchenstation: string;
  Preparationtime: string;
  KitchenStationId: string;
  normalForm?: any;
  specialForm?: any;
}

interface PricingDetailsFormData {
  kitchen: string[];
}
interface option {
  name: string;
}

interface State {
  auth: {
    credentials: {
      locationId: string;
    };
  };
}
interface StateData {
  productCatalog: {
    availability: [];
  };
}

const PricingDetails = () => {
  const [mainFormState, setMainFormState] = useState<MainFormType>({
    availabilityid: [],
    formNormal: {
      PickuppriceNormal: "",
      PickupmealtypeNormal: "",
      DeliverypriceNormal: "",
      DeliverymealtypeNormal: "",
      SwiggyorzomatoNormal: "",
      SwiggyNormal: "",
      SwiggymealtypeNormal: "",
      ZomatoNormal: "",
      ZomatomealtypeNormal: "",
    },
    dineinfields: [],
    Normaldays: [],
    DeliveryMealType: [],
    PicupMealType: [],
    Pickup: [],
    DineInServiceArea: [],
    Delivery: [],
    thirdParty: [],
    WeekDays: [],
    DineIn: [],
    Swiggy: [],
    Zomato: [],
  });

  const {
    control,
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<MainForm>({
    defaultValues: {
      form: {
        Inventory1: "",
        Inventory2: "",
      },
      kitchenstation: "",
      Preparationtime: "",
      normalForm: mainFormState,
      specialForm: [],
    },
  });

  const locationid = useSelector(
    (state: State) => state.auth.credentials.locationId
  );
  const data = useSelector(
    (state: StateData) => state.productCatalog.availability
  );

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);

  const prizingDetail = useSelector(
    (state: any) => state.PricingDetailReducer.prizingData?.mainForm || {}
  );
  const [options, setOptions] = useState<option[]>([]);
  const [options1, setOptions1] = useState<Option[]>([]);
  const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
    Kitchen: false,
  });
  const history = useHistory();
  const [selectedValues2, setSelectedValues2] = useState<string[]>([]);


  const [mainFormSpecial, setMainFormSpecial] = useState<MainFormSpecial>({
    form: {
      Pickupprice: "",
      Pickupmealtype: "",
      Deliveryprice: "",
      Deliverymealtype: "",
      Swiggyorzomato: "",
      Swiggy: "",
      Swiggymealtype: "",
      Zomato: "",
      Zomatomealtype: "",
      Inventory1: "", // Add default value
      Inventory2: "", // Add default value
    },
    dineinfields: [],
    specialcheck: [],
    fromDate: new Date(),
    toDate: new Date(),
    selectedValuespickup: [],
    selectedValuesdelivery: [],
    Swiggy: [],
    Zomato: [],
    Availabilityid: [],
  });
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const [selectedValue1, setSelectedValue1] = useState<string[]>([]);
  const [id, setId] = useState([]);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    Inventory1: "",
    Inventory2: "",
  });
  const [formerrors, setFormErrors] = useState({
    Inventory1: "",
    Inventory2: "",
  });
  const [dinein, setDineIn] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [isOptionTrue, setIsOptionTrue] = useState(true);
  const [validationState, setValidationState] = useState({
    kitchen: { isValid: true, errorMessage: "" },
    preparationTime: { isValid: true, errorMessage: "" },
    DineinMeal: { isValid: true, errorMessage: "" },
    Pickup: { isValid: true, errorMessage: "" },
    Delivery: { isValid: true, errorMessage: "" },
    ThirdDelivery1: { isValid: true, errorMessage: "" },
    ThirdDelivery2: { isValid: true, errorMessage: "" },
    Pickupspecial: { isValid: true, errorMessage: "" },
    Deliveryspecial: { isValid: true, errorMessage: "" },
    Deliveryspecial1: { isValid: true, errorMessage: "" },
    Deliveryspecial2: { isValid: true, errorMessage: "" },
    NormalMealtype: { isValid: true, errorMessage: "" },
    NormalServiceArea: { isValid: true, errorMessage: "" },
    PickupSwiggy:{ isValid: true, errorMessage: "" },
  });

  const validateDropdown = (value: string[], field: string | number) => {
    let isValid = true;
    let errorMessage = "";
  
    if (value.length === 0) {
      isValid = false;
      errorMessage = "This field is required";
    }
  
    // Handle both string and index (number) based fields
    setValidationState((prevState) => ({
      ...prevState,
      [field]: { isValid, errorMessage },
    }));
  };

  const validateForm = (): boolean => {
    validateDropdown(selectedValues, "kitchen");
    validateDropdown(selectedValue1, "preparationTime");
    return (
      validationState.kitchen.isValid && validationState.preparationTime.isValid
    );
  };

  const handleDropdownToggle = (dropdownName: string) => {
    setDropdownOpen((prevState) => {
      return {
        kitchen: false,
        [dropdownName]: !prevState[dropdownName],
      };
    });
  };

  let mainForm: MainForm = {
    form: {
      Inventory1: "",
      Inventory2: "",
    },
    kitchenstation: "",
    Preparationtime: "",
    KitchenStationId: "",
    normalForm: isOptionTrue ? mainFormState : undefined, // Conditionally set normalForm

    specialForm: isOptionTrue ? undefined : mainFormSpecial,
  };

  // const formData={
  // getValues();
  // }

  useEffect(() => {
    if (prizingDetail?.form) {
      setSelectedValues(prizingDetail?.kitchenstation || []);
    }

    if (prizingDetail?.normalForm) {
      setSelectedValue1(prizingDetail?.Preparationtime || []);
    }

    if (prizingDetail?.form) {
      setForm({
        Inventory1: prizingDetail?.form.Inventory1 || "",
        Inventory2: prizingDetail?.form.Inventory2 || "",
      });
      setInventory(true);
    }
  }, []);

  
  // const dispatchEvent = () => {
  //   dispatch(PricingDetailRequest({ mainForm }));
  //   history.push(`/productCatalog/Itemcustomizations`, {
  //     state: { pagename: "Item customizations" },
  //   });
  // };

  useEffect(() => {
    setOptions(data);
    getApi();
  }, [data]);

  const getApi = async () => {
    dispatch(getTagClassRequest(locationid));
  };
  

  // const onSubmit: SubmitHandler<any> = (data: any) => {
  //   dispatchEvent();
  // };
  const handleBlur = (fieldValue: string[], fieldName: string) => {
    validateDropdown(fieldValue, fieldName); // Validate the dropdown on blur
  };

  const [dineinfields, setDineInFields] = useState<DineInField[]>([
    {
      DineInPrice: "",
      DineInMealType: [],
      DineInService: "", // Change this from DineInService to DineInServiceArea
      showDay: false,
      dayButtonText: "Add Day",
    },
  ]);
  type DropdownValidationState = {
    [key: string]: { isValid: boolean; errorMessage: string };
  };
  const validateDineInFields = (dineinfields: DineInField[]) => {
    const errors: DropdownValidationState = {};
 
    dineinfields.forEach((field, index) => {
      const mealTypeKey = `DineInMealType_${index}`;
      const priceKey = `DineInPrice_${index}`;
      const DineInService=`DineInService_${index}`
 
      // Validate DineInMealType
      if (!field.DineInMealType || field.DineInMealType.length === 0) {
        errors[mealTypeKey] = {
          isValid: false,
          errorMessage: "Meal type should not be empty.",
        };
      } else {
        errors[mealTypeKey] = { isValid: true, errorMessage: "" };
      }
 
      if(!field.DineInService||field.DineInService.length === 0)
      {
        errors[DineInService] = {
          isValid: false,
          errorMessage: "Service area should not be empty.",
        };
      }
      else {
        errors[DineInService] = { isValid: true, errorMessage: "" };
      }
 
     
      if (!field.DineInPrice || isNaN(Number(field.DineInPrice))) {
        errors[priceKey] = {
          isValid: false,
          errorMessage: "Price",
        };
      } else {
        errors[priceKey] = { isValid: true, errorMessage: "" };
      }
    });
 
    return errors;
  };
  const handleValidateDropdown = ( ) => {
   
    const dropErrors: DropdownValidationState = {};
   
  
    if (mainFormState.PicupMealType.length === 0) {
      dropErrors.Pickup = {
        isValid: false,
        errorMessage: "Please fill this field",
      };
    }
    if(!mainFormState.formNormal.PickuppriceNormal)
    {
      dropErrors.PickupPrice={isValid:false,errorMessage:"Price"}
    }
    if(mainFormState.DeliveryMealType.length==0)
    {
      dropErrors.Delivery={
        isValid:false,
        errorMessage:"Please Fill this field"
      }
      if(!mainFormState.formNormal.DeliverypriceNormal)
        {
          dropErrors.DeliveryPrice={isValid:false,errorMessage:"Price"}
        }  
      
    }
    else{
      dropErrors.Delivery={isValid:true,errorMessage:""}
      dropErrors.Pickup = { isValid: true, errorMessage: "" };
      dropErrors.PickupPrice={ isValid: true, errorMessage: "" };
      dropErrors.DeliveryPrice={ isValid: true, errorMessage: "" };
    }
    return dropErrors;
  };
  
  const [validationStateerr, setValidationStateerr] = useState<DropdownValidationState>({}); 
  const handleValidate = (): boolean => {
    
  
    // Get the dropdown validation errors
    const dropdownErrors = handleValidateDropdown();
  
    // Get the dine-in fields validation errors
    const dineInErrors = validateDineInFields(dineinfields);
  
    // Combine both error objects
    const combinedErrors = {
      ...dropdownErrors,
      ...dineInErrors,
    };
  
    console.log("Combined validation errors:", combinedErrors); // Log errors
    console.log(getValues())
  
    // Set the validation state for displaying errors in the UI
    setValidationStateerr(combinedErrors);
  
    // Check if any of the fields are invalid
    const isValid = Object.values(combinedErrors).every((error) => error.isValid === true);
  
    // Return true if all fields are valid, otherwise false
    return isValid;
  };
  console.log("hello",mainForm.form.Inventory1)
 console.log(mainFormState)
  return (
    <div style={{ display: "flex" }}>
      <SidePanel />
      <div style={{ width: "98%" }}>
        <Navigationpage />
        <div
          className={
            isExpanded
              ? "pricingdetails-containerExpanded"
              : "pricingdetails-container"
          }
        >
          <div className="pricing-form">
            <div className="Tool">
              <p className="KitchenRelatedHeading">Kitchen Related</p>
              {/* <Tooltip message="Kitchen Related">
                      <div className="ToolKitchen">
                        <img src={info} alt="" width={20} height={20} />
                      </div>
                    </Tooltip> */}
            </div>

            <div className="KitchenRelated">
              <div className="D1kitchen">
                <Dropdown
                  name="kitchenstation"
                  options={[]}
                  type="checkbox"
                  setOptions={setOptions1}
                  placeholder="Search for option"
                  register={register}
                  setValue={setValue}
                  error={errors.kitchenstation}
                  trigger={trigger}
                  getValues={getValues}
                  validation={{ required: "dietaryType is required" }}
                  addNew={true}
                  editValues={true}
                  setDropdownOpen={setDropdownOpen}
                  dropdownopen={DropdownOpen.Kitchen}
                  onToggle={() => handleDropdownToggle("Kitchen")}
                />
              </div>

              <div className="D2kitchen">
                <div className="Prepartiontime">
                  <label htmlFor="" className="heading">Preparation time</label>
                  <div className="Prepartiontime-input-fileds">
                    <input type="text" className="Prepartiontime-input-hours" />
                    <span>Hours</span>
                    <span>:</span>
                    <input type="text" className="Prepartiontime-input-mins" />
                    <span>Minutes</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="Kitchen-checkbox">
              <input type="checkbox" className="checkbox1-Kitchen" />
              <label className="Inventorycheck">
                Don't print the item in Master KOT
              </label>
            </div>

            <div className="InventoryToggle">
              <div>
                <p className="IHeading">Inventory</p>
              </div>
              <div className="toggleI">
                <Toggle toggle={inventory} setToggle={setInventory} />
              </div>
            </div>

            <div className="InventorySection">
              {inventory && (
                <div>
                  <div className="InventoryHeading">
                    <p>Max No. of servings per day*</p>
                    <p className="threshold">Threshold*</p>
                  </div>
                  <div className="InventoryInput">
                    <Controller
                      name="form.Inventory1"
                      control={control}
                      defaultValue=""
                      render={({ field,trigger }: any) => (
                        <input
                          className="I1"
                          type="text"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            setValue("form.Inventory1", value);
                            trigger(trigger);                          }}
                          style={{
                            borderColor: formerrors.Inventory1
                              ? "red"
                              : "rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      )}
                      rules={{ required: "This field is required" }}
                    />

                    <Controller
                      name="form.Inventory2"
                      control={control}
                      defaultValue=""
                      render={({ field }: any) => (
                        <input
                          className="I1"
                          type="text"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;

                          
                            setValue("form.Inventory2", value); 

                        
                            trigger(form.Inventory2);
                          }}
                          style={{
                            borderColor: formerrors.Inventory2
                              ? "red"
                              : "rgba(0, 0, 0, 0.3)",
                          }}
                        />
                      )}
                    />
                  </div>

                  {formerrors.Inventory1 && (
                    <p className="ErrorsForm">{formerrors.Inventory1}</p>
                  )}
                  {formerrors.Inventory2 && (
                    <p className="ErrorsFormi2">{formerrors.Inventory2}</p>
                  )}
                  <div className="Inventcheckbox">
                    <div className="checkboxI">
                      <input type="checkbox" className="checkbox1-color" />
                      <label className="InventoryHeadingII">
                        Reset inventory everyday
                      </label>
                    </div>

                    <div className="checkbox2">
                      <input type="checkbox" className="checkbox1-color" />
                      <label className="InventoryHeadingII">
                        Show next available time when maximum count is reached
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="services-Heading"><p> Service availability </p></div>

            <div className="NormalSpecial">
              <div className="Normal">
                <input
                  type="radio"
                  value="true"
                  checked={isOptionTrue === true}
                  onChange={() => setIsOptionTrue(true)}
                  className="N1radio"
                />
                <label className="N1">Normal Availability</label>
              </div>
              <div className="Special">
                <input
                  type="radio"
                  value="false"
                  checked={isOptionTrue === false}
                  onChange={() => setIsOptionTrue(false)}
                  className="S1radio"
                />
                <label className="S1">Special Availability</label>
              </div>
            </div>


            {isOptionTrue ? (
              <Normalavail
                validateDropdown={validateDropdown}
                dinein={dinein}
                setDineIn={setDineIn}
                validationState={validationState}
                setMainFormState={setMainFormState}
                mainFormState={mainFormState}
                selectedValues2={selectedValues2}
                setSelectedValues2={setSelectedValues2}
                dineinfields={dineinfields}
                handleValidate={handleValidate}
                setDineInFields={setDineInFields}
                setValidationStateerr={setValidationStateerr}
                ValidationStateerr={validationStateerr}
                
                
              />
            ) : (
              <Specialavail
                validateDropdown={validateDropdown}
                validationState={validationState}
                setMainFormSpecial={setMainFormSpecial}
                mainFormSpecial={mainFormSpecial}
              />
            )}

            {/* <div
                className={
                  isExpanded
                    ? "saveandnextPricingExpanded"
                    : "saveandnextPricing"
                }
              >
                <button className="clearallPricing">Clear All</button>
                <button className="link saveall" onClick={dispatchEvent}>
                  Save & next
                </button>
              </div> */}
            <SaveAndNext
              getFormData={getValues}
              seletedpage="Pricing"
              reset={reset}
              triggerValidation={() => trigger()}
              mainForm={mainForm}
              handleValidate={handleValidate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingDetails;