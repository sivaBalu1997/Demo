import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux"; // Access Redux for initial data
import "./AvailabilitySlider.scss";
import ToggleSliderAvail from "../ToggleSliderAvail/ToggleSliderAvail";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import AvailabilityChangesUntil from "../BasicChanges/AvailableChangesUntil";

interface SideBarData {
  id: number;
  itemName: string;
  code: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: {
    Dinein1: string[];
    Pickup1: string[];
    Delivery1: string[];
    Dinein2: string[];
    Pickup2: string[];
    Delivery2: string[];
    Inventory1: string[];
    Customize1: string[];
  };
}

interface AvailSliderProps {
  pen?: true;
  SideBarData?: SideBarData[];
}

const PricingSlider: React.FC<AvailSliderProps> = ({ pen }) => {
  const dataFromRedux = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );
  const { patchedData, setPatchedData, selectedDateOption } =
    useContext(Contextpagejs);

  const [selectPeriod,setSelectPeriod]=useState(false);
  const Dinein =dataFromRedux[0]?.orderTypes?.find((orderType:any) => orderType?.typeName === "DineIn")

  const subcategories = Array.isArray(dataFromRedux[0]?.orderTypes)
    ? dataFromRedux[0].orderTypes.map((elem: any) => ({
        subHeading: elem.typeName,
        types: [],
      }))
    : [];


const [parentOrderTypeArray, setParentOrderTypeArray] = useState<any>([]);

const [selectedOrderTypeId,setSelectedOrderTypeId]=useState<string>("");
const [selectedOrderTypeCategory,setSelectedOrderTypeCategory]=useState<string>("");

const [availabilityOrderTypes,setAvailabilityOrderTypes]=useState<any>([]);

useEffect(()=>{
const tempOnPremarray=dataFromRedux[0]?.orderTypes?.filter((data:any,index:number)=> {return data?.typeGroup==="D"} )
const tempOffPremarray=dataFromRedux[0]?.orderTypes?.filter((data:any,index:number)=> {return data?.typeGroup!=="D"} )

const isOnPremEnabledCount=tempOnPremarray?.filter((data:any,index:number)=> {return data?.availabilityEnabled===false} ).length == 0
const isOffPremEnabledCount=tempOffPremarray?.filter((data:any,index:number)=> {return data?.availabilityEnabled===false} ).length == 0


const tempOrderTypeAvailabilityArray=[
  {
    mainHeading: "On-prem",
    types:tempOnPremarray,
    isEnabled:isOnPremEnabledCount
  },
  {
    mainHeading: "Off-prem",
    types:tempOffPremarray,
    isEnabled:isOffPremEnabledCount
  },
  
]
setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
setParentOrderTypeArray([...tempOnPremarray, ...tempOffPremarray])

},[dataFromRedux[0]?.orderTypes])

const handleToggleDisable=()=>{
  setPatchedData((prevState:any) => ({
    ...prevState,
    itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
      (availabilityInfo:any) =>
        availabilityInfo.orderTypeId === selectedOrderTypeId
          ? {
              ...availabilityInfo,
              unAvailableUntilTime: "",
            }
          : availabilityInfo
    ),
  }));
}


  const handleOrderTypesAvail = (OrderTypeId:string)=>{
  const tempOderTypes=parentOrderTypeArray?.map((data:any,index:number)=> {
    return data?.typeId === OrderTypeId ? {...data,availabilityEnabled:!data?.availabilityEnabled}:data 
  } )

  const tempOnPremarray=tempOderTypes?.filter((data:any,index:number)=> {return data?.typeGroup==="D"} )
  const tempOffPremarray=tempOderTypes?.filter((data:any,index:number)=> {return data?.typeGroup!=="D"} )

  setParentOrderTypeArray([...tempOnPremarray, ...tempOffPremarray])
  
  const isOnPremEnabledCount=tempOnPremarray?.filter((data:any,index:number)=> {return data?.availabilityEnabled===false} ).length == 0
  const isOffPremEnabledCount=tempOffPremarray?.filter((data:any,index:number)=> {return data?.availabilityEnabled===false} ).length == 0
  
  
  const tempOrderTypeAvailabilityArray=[
    {
      mainHeading: "On-prem",
      types:tempOnPremarray,
      isEnabled:isOnPremEnabledCount
    },
    {
      mainHeading: "Off-prem",
      types:tempOffPremarray,
      isEnabled:isOffPremEnabledCount
    },
    
  ]
  setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
  setSelectedOrderTypeId("");
  
  }

  const handleOrderCategoryAvailability = (categoryHeading: string) => {

    const tempOnPremarray = parentOrderTypeArray?.filter((data: any, index: number) => { return data?.typeGroup === "D" })
    const tempOffPremarray = parentOrderTypeArray?.filter((data: any, index: number) => { return data?.typeGroup !== "D" })

    const isOnPremEnabledCount = tempOnPremarray?.filter((data: any, index: number) => { return data?.availabilityEnabled === false }).length == 0
    const isOffPremEnabledCount = tempOffPremarray?.filter((data: any, index: number) => { return data?.availabilityEnabled === false }).length == 0

    const updatedTempOnPremarray = tempOnPremarray?.map((data: any, index: number) => {
      return { ...data, availabilityEnabled: !isOnPremEnabledCount }
    })

    const updatedTempOffPremarray = tempOffPremarray?.map((data: any, index: number) => {
      return { ...data, availabilityEnabled: !isOffPremEnabledCount }
    })

    setParentOrderTypeArray(categoryHeading == "On-prem" ? [...updatedTempOnPremarray, ...tempOffPremarray] : [...tempOnPremarray, ...updatedTempOffPremarray])

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: categoryHeading == "On-prem" ? updatedTempOnPremarray : tempOnPremarray,
        isEnabled: categoryHeading == "On-prem" ? !isOnPremEnabledCount : isOnPremEnabledCount
      },
      {
        mainHeading: "Off-prem",
        types: categoryHeading == "Off-prem" ? updatedTempOffPremarray : tempOffPremarray,
        isEnabled: categoryHeading == "Off-prem" ? !isOffPremEnabledCount : isOffPremEnabledCount
      },

    ]
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
    setSelectedOrderTypeCategory("");

  }
  
  const data = [
    {
      mainHeading: "On-prem",
      types: [Dinein?.typeName],
      isEnabled:Dinein?.availabilityEnabled
    },
    {
      mainHeading: "Off-prem",
      subcategories: [
        {
          subHeading: ["Order Types "],
          types: Array.isArray(dataFromRedux[0]?.orderTypes)
            ? dataFromRedux[0].orderTypes.filter((elem: any) => elem.typeName !== "DineIn").map((elem: any) => ({
              name:elem.typeName,
              isEnabled:elem.availabilityEnabled,
              orderTypeId:elem.typeId
            }))
            : [],

          isEnabled: Array.isArray(dataFromRedux[0]?.orderTypes)
            ? dataFromRedux[0].orderTypes.map(
                (elem: any) => elem.availabilityEnabled
              )
            : [],
        },
      ],
    },
  ];

  // const filteredData = data
  // .flatMap((category) =>
  //   category.subcategories
  //     ? category.subcategories.flatMap((subcat) =>
  //         subcat.types.filter((type: any) => type.isEnabled === true)
  //       )
  //     : []
  // )
  // .map((type) => ({
  //   name: type.name,
  //   orderTypeId: type.orderTypeId,
  //   isEnabled: type.isEnabled,
  // }));

  // const getEnabledValues = () => {
  //   let enabledArray: boolean[] = [];

  //   data.forEach((item) => {
  //     if (item.subcategories) {
  //       item.subcategories.forEach((subcategory) => {
  //         if (Array.isArray(subcategory.isEnabled)) {
  //           enabledArray = enabledArray.concat(subcategory.isEnabled);
  //         }
  //       });
  //     }
  //   });

  //   return enabledArray;
  // };

 // const enabledValuesArray = getEnabledValues();
  // console.log(enabledValuesArray);

  const [toggleStates, setToggleStates] = useState<any[]>([]);

  // itemAvailabilityInfo: [
  //   {
  //     orderTypeId: "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
  //     unAvailableUntilTime: "2025-03-21T08:04:52"
  //   }
  // ]
  useEffect(() => {
    if (dataFromRedux && dataFromRedux[0]?.orderTypes) {
      setPatchedData((prevState: any) => ({
        ...prevState,
        itemAvailabilityInfo: Array.isArray(dataFromRedux[0]?.orderTypes)
          ? dataFromRedux[0].orderTypes.map((elem: any, index: number) => ({
              orderTypeId: elem.typeId,
              unAvailableUntilTime: selectedDateOption,
            }))
          : [],
      }));
    }
  }, [dataFromRedux, setPatchedData, selectedDateOption]);

  // useEffect(() => {
  //   const initialToggleStates = data.map((item, index) => {
  //     if (item.subcategories) {
  //       return {
  //         parentToggle: false,
  //         subcategoryToggles: item.subcategories.map((_, subIndex) => ({
  //           subParentToggle: false,
  //           childToggles: Array(3)
  //             .fill(false)
  //             .map((_, childIndex) =>
  //               mapInitialToggleState(index, subIndex, childIndex)
  //             ),
  //         })),
  //       };
  //     } else if (item.types) {
  //       return {
  //         parentToggle: false,
  //         childToggles: item.types.map((_, typeIndex) =>
  //           mapInitialToggleState(index, 0, typeIndex)
  //         ),
  //       };
  //     }
  //     return null;
  //   });

  //   setToggleStates(initialToggleStates);
  // }, [dataFromRedux]);

  // const mapInitialToggleState = (
  //   parentIndex: number,
  //   subcategoryIndex: number,
  //   childIndex: number
  // ) => {
  //   const orderTypes = dataFromRedux?.[0]?.orderTypes;
  //   const pricingDetails = dataFromRedux?.[0]?.pricingdetails;

  //   console.log("orderTypes",orderTypes);
    

  //   if (parentIndex === 0) {
  //     return orderTypes?.[0]?.isEnabled === "Enabled";
  //   } else if (parentIndex === 1 && subcategoryIndex === 0) {
  //     return orderTypes?.[0]?.isEnabled === "Enabled";
  //   } else if (parentIndex === 1 && subcategoryIndex === 1) {
  //     return pricingDetails?.Delivery2?.[childIndex] === "Enabled";
  //   }

  //   return false;
  // };

  const handleParentToggle = (parentIndex: number) => {
    const newToggleStates = [...toggleStates];
    const currentParentToggle = newToggleStates[parentIndex].parentToggle;
    newToggleStates[parentIndex].parentToggle = !currentParentToggle;

    if (newToggleStates[parentIndex].childToggles) {
      newToggleStates[parentIndex].childToggles.forEach(
        (_: any, childIndex: number) => {
          newToggleStates[parentIndex].childToggles[childIndex] =
            !currentParentToggle;
        }
      );
    } else if (newToggleStates[parentIndex].subcategoryToggles) {
      newToggleStates[parentIndex].subcategoryToggles.forEach(
        (subcategory: any, subIndex: number) => {
          subcategory.subParentToggle = !currentParentToggle;

          subcategory.childToggles.forEach((_: any, childIndex: number) => {
            subcategory.childToggles[childIndex] = !currentParentToggle;
          });
        }
      );
    }

    setToggleStates(newToggleStates);
  };

  // const handleSubcategoryToggle = (
  //   parentIndex: number,
  //   subcategoryIndex: number
  // ) => {
  //   const newToggleStates = [...toggleStates];
  //   const subcategoryToggle =
  //     newToggleStates[parentIndex].subcategoryToggles[subcategoryIndex]
  //       .subParentToggle;

  //   newToggleStates[parentIndex].subcategoryToggles[
  //     subcategoryIndex
  //   ].subParentToggle = !subcategoryToggle;

  //   if (!subcategoryToggle) {
  //     newToggleStates[parentIndex].subcategoryToggles[
  //       subcategoryIndex
  //     ].childToggles.forEach((_: any, childIndex: number) => {
  //       newToggleStates[parentIndex].subcategoryToggles[
  //         subcategoryIndex
  //       ].childToggles[childIndex] = true;
  //     });
  //   } else {
  //     newToggleStates[parentIndex].subcategoryToggles[
  //       subcategoryIndex
  //     ].childToggles.forEach((_: any, childIndex: number) => {
  //       newToggleStates[parentIndex].subcategoryToggles[
  //         subcategoryIndex
  //       ].childToggles[childIndex] = false;
  //     });
  //   }

  //   setToggleStates(newToggleStates);
  // };
  // const handleChildToggle = (
  //   parentIndex: number,
  //   subcategoryIndex: number | null,
  //   childIndex: number
  // ) => {
    
    
  //   const newToggleStates = [...toggleStates];

  //   if (subcategoryIndex !== null) {
  //     const subcategoryToggles =
  //       newToggleStates[parentIndex]?.subcategoryToggles;

  //     if (subcategoryToggles && subcategoryToggles[subcategoryIndex]) {
  //       const childToggles = subcategoryToggles[subcategoryIndex]?.childToggles;

  //       if (childToggles) {
  //         childToggles[childIndex] = !childToggles[childIndex];

  //         const areAllChildrenDisabled = childToggles.every(
  //           (toggle: boolean) => !toggle
  //         );

  //         subcategoryToggles[subcategoryIndex].subParentToggle =
  //           !areAllChildrenDisabled;
  //       }
  //     }
  //   } else {
  //     const childToggles = newToggleStates[parentIndex]?.childToggles;

  //     if (childToggles) {
  //       childToggles[childIndex] = !childToggles[childIndex];

  //       const areAllChildrenDisabled = childToggles.every(
  //         (toggle: boolean) => !toggle
  //       );

  //       newToggleStates[parentIndex].parentToggle = !areAllChildrenDisabled;
  //     }
  //   }

  //   setToggleStates(newToggleStates);
  // };

  const [selectedtypeid, setSelectedtypeid] = useState<string>();

  // const handleselectchangePeriod = (id: string, enable: boolean) => {
  //   console.log("enable", enable);
   
  //     setSelectPeriod(true);
  //     setSelectedtypeid(id);
    
  // };
  // const handleheadingtoggle = () => {
  //   setSelectPeriod(true);
  // };

  return (
    <div className="AvailSlider-Container">
      <h3 className="AvailSlider-Heading">Availability</h3>
      <div className="AvailOnprem-Ofprem">
        {availabilityOrderTypes?.map((elem:any, index:number) => (
          <div key={index} className="Avail-SectionAB">
            <div className="AvailHeading-Section">
              <h2 className="sub-head">{elem.mainHeading}</h2>

              <div
                className="toggle-btnfor-subhead"
               
              >
                <ToggleSliderAvail
                  toggle={elem.isEnabled}
                  setToggle={() => {
                    //handleParentToggle(index)
                    handleOrderCategoryAvailability(elem.mainHeading)
                    setSelectedOrderTypeCategory(elem.mainHeading)
                  }}
                  pen={pen}
                />
              </div>
            </div>
            {elem.types && (
              <div className="SectionASectionBSection">
                {elem.types.map((type:any, typeIndex:number) => (
                  <div key={typeIndex} className="TypeHeading1">
                    <h3 className="SectionASectionBSectionHeading">{type.typeName}</h3>
                    <div className="" style={{marginLeft:"55px"}}>
                      <ToggleSliderAvail
                        toggle={type.availabilityEnabled}
                        setToggle={() => 
                        {
                          if(!type.availabilityEnabled)
                          {
                            setSelectedOrderTypeId(type.typeId)
                            setSelectPeriod(true);
                          }
                          else{
                            setSelectedOrderTypeId(type.typeId)
                            handleOrderTypesAvail(type.typeId)
                            handleToggleDisable()
                          }
                        }
                          
                          
                         }
                        pen={pen}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* {elem.subcategories && (
              <div className="PickupDeliveryAvail">
                {elem.subcategories.map((subcategory:any, subIndex:number) => (
                  <div key={subIndex} className="subcategorySection">
                   
                    <div className="TypesSection">
                      {subcategory.types.map((type: any, typeIndex: any) => (
                        <>
                          <div key={typeIndex} className="TypeHeading">
                            <h4
                              className="SectionASectionBSectionHeading"
                              style={{
                                opacity: enabledValuesArray[typeIndex]
                                  ? "100%"
                                  : "50%",
                              }}
                            >
                              {type.name}
                            </h4>
                            <div
                              className=""
                              onClick={() => {
                                const isToggleOpen =
                                  toggleStates[index]?.subcategoryToggles?.[
                                    subIndex
                                  ]?.childToggles?.[typeIndex];
                                if (isToggleOpen) {
                                  handleselectchangePeriod(
                                    type?.orderTypeId,
                                    enabledValuesArray[typeIndex]
                                  );
                                }
                              }}
                            >
                              <ToggleSliderAvail
                                toggle={type.isEnabled}
                    
                                setToggle={() => {
                                  handleChildToggle(
                                    index,
                                    subIndex,
                                    typeIndex
                                  )
                                }}
                                pen={pen}
                              />
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        ))}
        {selectPeriod && (
          <AvailabilityChangesUntil
            setSelectPeriod={setSelectPeriod}
            selectedtypeid={selectedOrderTypeId}
          />
        )}
      </div>
    </div>
  );
};

export default PricingSlider;
