import React, { useState } from 'react'
import './specialPriceDetails.scss'
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import SidePanel from 'pages/SidePanel';
import InputComponent from 'components/offerManagement/InputComponent/InputComponent';
import Dropdown from 'components/offerManagement/Dropdown/Dropdown';
import { useSelector } from 'react-redux';


interface specialPriceForm{
    offerName:string;
    offerChannel:string[];
    offerToVisible:string[];
    termsAndConditions:string[];
    specialTypeName:string;
    specialType:string;
    specialTypeValue:string;
    category:string;
    subCategory:string;
    selectedFooditems:string[];
    DatePicked:boolean;
    fromTime:string;
    toTime:string;
    AvailabileDays:string[];




}

const SpecialPriceDetails = () => {
    const dietaryData = useSelector(
        (state: any) => state.productCatalog.dietaryData.data
      );
      const [dataDietaryType, setDataDietaryType] = useState([]);
      const [DropdownOpen, setDropdownOpen] = useState<Record<string, boolean>>({
        DietaryType: false,
        cuisine: false,
        mealType: false,
        bestPair: false,
        category: false,
        subCategory: false,
      });
    const [loading, setLoading] = useState(true);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors },
        trigger,
        reset,
        watch,
      } = useForm<specialPriceForm>({
        defaultValues: {
            offerName:"",
            offerChannel:[],
            offerToVisible:[],
            termsAndConditions:[],
            specialTypeName:"",
            specialType:"",
            specialTypeValue:"",
            category:"",
            subCategory:"",
            selectedFooditems:[],
            DatePicked:true,
            fromTime:"",
            toTime:"",
            AvailabileDays:[],
        },
      });
      const handleDropdownToggle = (dropdownName: string) => {
        setDropdownOpen((prevState) => {
          return {
            DietaryType: false,
            cuisine: false,
            mealType: false,
            bestPair: false,
            category: false,
            subCategory: false,
            [dropdownName]: !prevState[dropdownName],
          };
        });
      };
    return (
        <div style={{display:'flex', flexDirection:'row'}}>
          <SidePanel/>
          <>
          <div>
            <div>
            <h1>Special offers</h1>
            </div>
            <div className='offer-primary-part1'>
                <div>
                <Controller
                    name="offerName"
                    control={control}
                    rules={{ required: "offer is required" }}
                    render={({ onChange, onBlur, value }: any) => (
                      <InputComponent
                        name="offerName"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        trigger={trigger}
                        error={errors.offerName}
                      />
                    )}
                  />
                </div>
                <div>
                <Controller
                    name="DietaryType"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
                        placeholder="search for option"
                        register={register}
                        name="DietaryType"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "DietaryType is required" }}
                        error={errors.offerName}
                        dropdownopen={DropdownOpen.DietaryType}
                        onToggle={() => handleDropdownToggle("DietaryType")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                      
                      />
                    )}
                  />
                </div>
                <div>
                <Controller
                    name="DietaryType"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
                        placeholder="search for option"
                        register={register}
                        name="DietaryType"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "DietaryType is required" }}
                        error={errors.offerName}
                        dropdownopen={DropdownOpen.DietaryType}
                        onToggle={() => handleDropdownToggle("DietaryType")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                        
                      />
                    )}
                  />
                </div>
                <div>
                <Controller
                    name="DietaryType"
                    control={control}
                    render={({ field }: any) => (
                      <Dropdown
                        options={dietaryData}
                        type="checkbox"
                        setOptions={setDataDietaryType}
                        placeholder="search for option"
                        register={register}
                        name="DietaryType"
                        trigger={trigger}
                        setValue={setValue}
                        getValues={getValues}
                        validation={{ required: "DietaryType is required" }}
                        error={errors.offerName}
                        dropdownopen={DropdownOpen.DietaryType}
                        onToggle={() => handleDropdownToggle("DietaryType")}
                        setDropdownOpen={setDropdownOpen}
                        addNew={true}
                        editValues={true}
                        dropDownType="DIET"
                        
                      />
                    )}
                  />
                </div>

           

            </div>

             
          </div>
        </>
        </div>
      );
}

export default SpecialPriceDetails;






















