import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux"; // Access Redux for initial data
import "./AvailabilitySlider.scss";
import ToggleSliderAvail from "../ToggleSliderAvail/ToggleSliderAvail";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import AvailabilityChangesUntil from "../BasicChanges/AvailableChangesUntil";
import { _elementsEqual } from "chart.js/dist/helpers/helpers.core";

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
  const { patchedData, setPatchedData, selectedDateOption, setPartialData,partialData } =
    useContext(Contextpagejs);

  const [selectPeriod, setSelectPeriod] = useState(false);

  const Dinein = dataFromRedux[0]?.orderTypes?.find(
    (orderType: any) => orderType?.typeName === "DineIn"
  );

 

  const [parentOrderTypeArray, setParentOrderTypeArray] = useState<any>([]);

  const [selectedOrderTypeId, setSelectedOrderTypeId] = useState<string>("");
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");

 const [selectedTypeGroup, setSelectedTypeGroup] = useState<string>("");
  const [selectedOrderTypeCategory, setSelectedOrderTypeCategory] =
    useState<string>("");

  const [availabilityOrderTypes, setAvailabilityOrderTypes] = useState<any>([]);

  useEffect(() => {
    const orderTypes = dataFromRedux[0]?.orderTypes || [];
  
    const tempOnPremarray = orderTypes.filter((data: any) => {
      return data?.typeGroup === "D"&&data?.typeGroup !== "I";
    });
  
    const tempOffPremarray = orderTypes.filter((data: any) => {
      return data?.typeGroup !== "D" &&data?.typeGroup !== "I";
    });
  
    const isOnPremEnabledCount =
      tempOnPremarray.filter((data: any) => data?.availabilityEnabled === false).length === 0;
  
    const isOffPremEnabledCount =
      tempOffPremarray.filter((data: any) => data?.availabilityEnabled === false).length === 0;
  
    const allChildrenonEnabled = tempOnPremarray.some(
      (child: any) => 
        // child.isEnabled === 1 &&
       child.isNotHide === 1
    );
  
    const allChildrenoffEnabled = tempOffPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 1
    );

    const hiddenCheck= tempOnPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
    const hiddenCheckOff= tempOffPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
  
    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: tempOnPremarray,
        isEnabled: isOnPremEnabledCount,
        isAble: allChildrenonEnabled,
        allChildrenonEnabled:allChildrenonEnabled,

        isHidden:hiddenCheck
      },
      {
        mainHeading: "Off-prem",
        types: tempOffPremarray,
        isEnabled: isOffPremEnabledCount,
        isAble: allChildrenoffEnabled,
        allChildrenonEnabled:allChildrenonEnabled,
        isHidden:hiddenCheckOff
      },
    ];
  
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
    setParentOrderTypeArray([...tempOnPremarray, ...tempOffPremarray]);
  }, [dataFromRedux[0]?.orderTypes]);
  

  const handleToggleDisable = (orderId: any) => {
    
    const pushData = {
      orderTypeId: orderId,
      unAvailableUntilTime: "",
    };

    setPartialData((prev: any) => {
      const existingInfo = prev.itemAvailabilityInfo || [];
      const existingIndex = existingInfo.findIndex(
        (item: any) => item.orderTypeId === orderId
      );

      const updatedInfo =
        existingIndex > -1
          ? existingInfo.map((item: any, index: number) =>
              index === existingIndex
                ? { ...item, unAvailableUntilTime: "" }
                : item
            )
          : [...existingInfo, pushData];

      return {
        ...prev,
        itemId: dataFromRedux[0].itemId,
        itemAvailabilityInfo: updatedInfo,
      };
    });
    setPatchedData((prevState: any) => ({
      ...prevState,
      itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
        (availabilityInfo: any) =>
          availabilityInfo.orderTypeId === selectedOrderTypeId
            ? {
                ...availabilityInfo,
                unAvailableUntilTime: "",
              }
            : availabilityInfo
      ),
    }));
  };

  const [canceledChanges, setcanceledChanges] = useState(true);

  const handleOrderTypesAvail = (
    OrderTypeId: string,
    Enabled: number,
    hidden: number
  ) => {
    if ( hidden) {
      const tempOderTypes = parentOrderTypeArray?.map(
        (data: any, index: number) => {
          return data?.typeId === OrderTypeId
            ? { ...data, availabilityEnabled: !data?.availabilityEnabled }
            : data;
        }
      );

      const tempOnPremarray = tempOderTypes?.filter(
        (data: any, index: number) => {
          return data?.typeGroup === "D" &&data?.typeGroup !== "I";
        }
      );
      const tempOffPremarray = tempOderTypes?.filter(
        (data: any, index: number) => {
          return data?.typeGroup !== "D" &&data?.typeGroup !== "I";
        }
      );

      setParentOrderTypeArray([...tempOnPremarray, ...tempOffPremarray]);

      const isOnPremEnabledCount =
        tempOnPremarray?.filter((data: any, index: number) => {
          return data?.availabilityEnabled === false;
        }).length == 0;
      const isOffPremEnabledCount =
        tempOffPremarray?.filter((data: any, index: number) => {
          return data?.availabilityEnabled === false;
        }).length == 0;
      const allChildrenonEnabled = tempOnPremarray?.some(
        (child: any) =>
          //  child.isEnabled === 1 && 
        child.isNotHide === 1
      );
      const hiddenCheck= tempOnPremarray.some(
        (child: any) =>
          //  child.isEnabled === 1 && 
        child.isNotHide === 0
      );
      const hiddenCheckOff= tempOffPremarray.some(
        (child: any) =>
          //  child.isEnabled === 1 && 
        child.isNotHide === 0
      );
      const allChildrenoffEnabled = tempOffPremarray?.some(
        (child: any) => 
          // child.isEnabled === 1 && 
        
        
        child.isNotHide === 1
      );

      const tempOrderTypeAvailabilityArray = [
        {
          mainHeading: "On-prem",
          types: tempOnPremarray,
          isEnabled: isOnPremEnabledCount,
          isAble: allChildrenonEnabled,
          isHidden:hiddenCheck
        },
        {
          mainHeading: "Off-prem",
          types: tempOffPremarray,
          isEnabled: isOffPremEnabledCount,
          isAble: allChildrenoffEnabled,
          isHidden:hiddenCheckOff
        },
      ];
      setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
      setSelectedOrderTypeId("");
    }
  };

  const handleOrderTypesAvailCancel = (OrderTypeId: string) => {
    const tempOderTypes = parentOrderTypeArray?.map(
      (data: any, index: number) => {
        return data?.typeId === OrderTypeId
          ? { ...data, availabilityEnabled: !data?.availabilityEnabled }
          : data;
      }
    );

    const tempOnPremarray = tempOderTypes?.filter(
      (data: any, index: number) => {
        return data?.typeGroup === "D"&&data?.typeGroup !== "I";
      }
    );
    const tempOffPremarray = tempOderTypes?.filter(
      (data: any, index: number) => {
        return data?.typeGroup !== "D" &&data?.typeGroup !== "I";
      }
    );

    setParentOrderTypeArray([...tempOnPremarray, ...tempOffPremarray]);

    const isOnPremEnabledCount =
      tempOnPremarray?.filter((data: any, index: number) => {
        return (
          data?.availabilityEnabled === false ||
          data?.isEnabled === 0 
          // data?.isNotHide === 0
        );
      }).length == 0;
    const isOffPremEnabledCount =
      tempOffPremarray?.filter((data: any, index: number) => {
        return (
          data?.availabilityEnabled === false 
          // data?.isEnabled === 0 ||
         // data?.isNotHide === 0
        );
      }).length == 0;
    const allChildrenonEnabled = tempOnPremarray?.some(
      (child: any) => 
        
        
        // child.isEnabled === 1 && 
        child.isNotHide === 1
    );
    const hiddenCheck= tempOnPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
    const hiddenCheckOff= tempOffPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
    const allChildrenoffEnabled = tempOffPremarray?.some(
      (child: any) => 
        // child.isEnabled === 1 &&
       child.isNotHide === 1
    );

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: tempOnPremarray,
        isEnabled: isOnPremEnabledCount,
        isAble: allChildrenonEnabled,
        isHidden:hiddenCheck
      },
      {
        mainHeading: "Off-prem",
        types: tempOffPremarray,
        isEnabled: isOffPremEnabledCount,
        isAble: allChildrenoffEnabled,
        isHidden:hiddenCheckOff
      },
    ];
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
    setSelectedOrderTypeId("");
  };
  const handleOrderCategoryAvailability = (categoryHeading: string) => {


    const tempOnPremarray = parentOrderTypeArray?.filter(
      (data: any, index: number) => {
        return data?.typeGroup === "D"&&data?.typeGroup !== "I";
      }
    );
    const tempOffPremarray = parentOrderTypeArray?.filter(
      (data: any, index: number) => {
        return data?.typeGroup !== "D"&&data?.typeGroup !== "I";
      }
    );

    const isOnPremEnabledCount =
      tempOnPremarray?.filter((data: any, index: number) => {
        return data?.availabilityEnabled === false;
      }).length == 0;
    const isOffPremEnabledCount =
      tempOffPremarray?.filter((data: any, index: number) => {
        return data?.availabilityEnabled === false;
      }).length == 0;
    const allChildrenonEnabled = tempOnPremarray?.some(
      (child: any) => 
        
        // child.isEnabled === 1 && 
        child.isNotHide === 1
    );
    const hiddenCheck= tempOnPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
    const hiddenCheckOff= tempOffPremarray.some(
      (child: any) =>
        //  child.isEnabled === 1 && 
      child.isNotHide === 0
    );
    const allChildrenoffEnabled = tempOffPremarray?.some(
      (child: any) => 
        // child.isEnabled === 1 && 
      child.isNotHide === 1
    );

    const updatedTempOnPremarray = tempOnPremarray?.map(
      (data: any, index: number) => {
        return { ...data, availabilityEnabled: !isOnPremEnabledCount };
      }
    );

    const updatedTempOffPremarray = tempOffPremarray?.map(
      (data: any, index: number) => {
        return { ...data, availabilityEnabled: !isOffPremEnabledCount };

        // if (data.isEnabled === 1) {

        // } else {

        //   return { ...data };
        // }
      }
    );

    setParentOrderTypeArray(
      categoryHeading == "On-prem"
        ? [...updatedTempOnPremarray, ...tempOffPremarray]
        : [...tempOnPremarray, ...updatedTempOffPremarray]
    );

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types:
          categoryHeading == "On-prem"
            ? updatedTempOnPremarray
            : tempOnPremarray,
        isEnabled:
          categoryHeading == "On-prem"
            ? !isOnPremEnabledCount
            : isOnPremEnabledCount,
        isAble: allChildrenonEnabled,
        isHidden:hiddenCheck
      },
      {
        mainHeading: "Off-prem",
        types:
          categoryHeading == "Off-prem"
            ? updatedTempOffPremarray
            : tempOffPremarray,
        isEnabled:
          categoryHeading == "Off-prem"
            ? !isOffPremEnabledCount
            : isOffPremEnabledCount,
        isAble: allChildrenoffEnabled,
        isHidden:hiddenCheckOff
      },
    ];
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
    setSelectedOrderTypeCategory("");
  };

 

  
  

  

 
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

 

  

 

  

  const [parentToggle, setParrentToggle] = useState("");

  const [ParentToggles, setParentToggles] = useState<any>([]);

  const handleParentTogglesstae = (headingName: string) => {
    if (headingName === "On-prem") {
      const tempOnPremarray = dataFromRedux[0]?.orderTypes?.filter(
        (data: any, index: number) => {
          return data?.typeGroup === "D"&&data?.typeGroup !== "I";
        }
      );
      setParentToggles(tempOnPremarray);
    } else {
      const tempOffPremarray = dataFromRedux[0]?.orderTypes?.filter(
        (data: any, index: number) => {
          return data?.typeGroup !== "D"&&data?.typeGroup !== "I";
        }
      );

      setParentToggles(tempOffPremarray);
    }
  };
  const handleToggleDisableParent = (heading:string) => {

    // const filteredArrayToParent = availabilityOrderTypes.filter((item:any) => item.mainHeading ===heading );


    // setPartialData((prevState: any) => ({
    //   ...prevState,
    //   itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
    //     (availabilityInfo: any) => {
    //       const matchingType = ParentToggles.find(
    //         (toggle: any) => toggle.typeId === availabilityInfo.orderTypeId
    //       );

    //       return matchingType
    //         ? {
    //             ...availabilityInfo,
    //             unAvailableUntilTime: "",
    //           }
    //         : availabilityInfo;
    //     }
    //   ),
    // }));
   
    setPatchedData((prevState: any) => ({
      ...prevState,
      itemAvailabilityInfo: prevState.itemAvailabilityInfo.map(
        (availabilityInfo: any) => {
          const matchingType = ParentToggles.find(
            (toggle: any) => toggle.typeId === availabilityInfo.orderTypeId
          );

          return matchingType
            ? {
                ...availabilityInfo,
                unAvailableUntilTime: "",
              }
            : availabilityInfo;
        }
      ),
    }));
  };

  

  const handleSetPartialData = (parentName: string) => {


    
    let filteredArray:any = [];
    if (parentName === "On-prem") {
      filteredArray = dataFromRedux[0]?.orderTypes?.filter(
        (data: any) => data?.typeGroup === "D"&&data?.typeGroup !== "I"
      );
    } else {
      filteredArray = dataFromRedux[0]?.orderTypes?.filter(
        (data: any) => data?.typeGroup !== "D"&&data?.typeGroup !== "I"
      );
    }
    setParentToggles(filteredArray);
    setPartialData((prev:any) => {
    
      const existedArray=prev.itemAvailabilityInfo||[];

      
      const dataToAdd:any=[];
      filteredArray.map((item:any,index:number)=>{
       
          const existeingindex=existedArray.findIndex((id:any)=>id.orderTypeId===item.typeId)
          if(existeingindex>-1)
          {
           existedArray[existeingindex].unAvailableUntilTime=""
            
          }
          else{
            dataToAdd.push({
              orderTypeId: item.typeId,
            unAvailableUntilTime: "",

            })
          }

        })


      // })




    //   const dataToAdd = ParentToggles.filter(
    //     (item) => item.isEnabled === 1
    //   ).map((item) => {
        
        
    //     const existingIndex=existedArray.findIndex((item1)=>item1.orderTypeId===item.typeId)
    //     if(existingIndex>-1)
    //     {
    //       return{
    //         orderTypeId: item.typeId,
    //         unAvailableUntilTime: timeToSet,

    //       }
       
    //   }
    //   // else{
    //   //   return existedArray
    //   // }
    
    // });

   
    

      return {
        ...prev,
        itemId: dataFromRedux[0].itemId,
        itemAvailabilityInfo: [...existedArray,...dataToAdd],
      };
    });
    // const dataToAdd = filteredArray
    //   // .filter((item: any) => item.isEnabled === 1)
    //   .map((item: any) => ({
    //     orderTypeId: item.typeId,
    //     unAvailableUntilTime: "",
    //   }));

    // setPartialData((prev: any) => {
      
    //   return {
    //     ...prev,
    //     itemId: dataFromRedux[0]?.itemId,
    //     itemAvailabilityInfo: [...prev.itemAvailabilityInfo,...dataToAdd],
    //   };
    // });
   
    
  };


  
 

  return (
    <div className="AvailSlider-Container">
      <h3 className="AvailSlider-Heading">Availability</h3>
      <div className="AvailOnprem-Ofprem">
        {}
        {availabilityOrderTypes?.map((elem: any, index: number) => (
          <div key={index} className="Avail-SectionAB">
            <div className="AvailHeading-Section">
              <h2 className="sub-head">{elem.mainHeading}</h2>

              <div className="toggle-btnfor-subhead">
                
                <ToggleSliderAvail
                  toggle={elem.isEnabled}
                  Enable={elem.isEnabled}
                  hidden ={elem.isHidden==true?0:1}
                  setToggle={() => {
                    //handleParentToggle(index)

                    if (elem.isEnabled) {
                      handleOrderCategoryAvailability(elem.mainHeading);
                      setSelectedOrderTypeCategory(elem.mainHeading);
                      setParrentToggle(elem.mainHeading);
                      setSelectPeriod(true);
                      handleParentTogglesstae(elem.mainHeading);
                    } else {
                      if (elem.isAble) {
                        handleOrderCategoryAvailability(elem.mainHeading);
                        setSelectedOrderTypeCategory(elem.mainHeading);
                        setParrentToggle(elem.mainHeading);

                        handleParentTogglesstae(elem.mainHeading);
                        handleToggleDisableParent(elem.mainHeading);
                        handleSetPartialData(elem.mainHeading);

                      }
                      
                     
                    }
                  }}
                  pen={pen}
                />
              </div>
            </div>
            {elem.types && (
              <div className="SectionASectionBSection">
                {elem.types.map((type: any, typeIndex: number) => {
                  const Enabledtoedit =
                  //  type?.isEnabled && 
                  type?.isNotHide;

                  return (
                    <div key={typeIndex} className="TypeHeading1">
                      <h3
                        className="SectionASectionBSectionHeading"
                        style={{ opacity: Enabledtoedit ? "100%" : "50%" }}
                      >
                        {type?.typeName}:
                      </h3>
                      <div
                        className=""
                        style={{ marginLeft: "20px", marginTop: "3px" }}
                      >
                        <ToggleSliderAvail
                          toggle={
                            type?.availabilityEnabled 
                          }
                          Enable={ type?.availabilityEnabled }
                          hidden ={type?.isNotHide}
                          setToggle={() => {
                            if (type?.availabilityEnabled) {
                              setSelectedOrderTypeId(type?.typeId);
                              setSelectPeriod(true);
                              setParrentToggle("");

                              setSelectedTypeId(type?.typeId);
                              setSelectedTypeGroup(type?.typeGroup)
                              handleOrderTypesAvail(
                                type?.typeId,
                                type?.isEnabled,
                                type?.isNotHide
                              );
                            } else {
                              setSelectedOrderTypeId(type?.typeId);
                              handleOrderTypesAvail(
                                type?.typeId,
                                type?.isEnabled,
                                type?.isNotHide
                              );
                              handleToggleDisable(type?.typeId);
                              setSelectedTypeId(type?.typeId);
                              setSelectedTypeGroup(type?.typeGroup)
                              setParrentToggle("");
                            }
                          }}
                          pen={pen}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
          </div>
        ))}
        {selectPeriod && (
          <AvailabilityChangesUntil
            setSelectPeriod={setSelectPeriod}
            selectedTypeGroup={selectedTypeGroup}
            selectedtypeid={selectedTypeId}
            parentToggle={parentToggle}
            ParentToggles={ParentToggles}
            setcanceledChanges={setcanceledChanges}
            handleOrderTypesAvail={handleOrderTypesAvailCancel}
            handleOrderCategoryAvailability={handleOrderCategoryAvailability}
          />
        )}
      </div>
    </div>
  );
};

export default PricingSlider;
