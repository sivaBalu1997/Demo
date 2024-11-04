import React, { useEffect, useState } from "react";
import Toggle from "../Toggle/Toggle";
import { log } from "console";
import { tr } from "date-fns/locale";
import { RootState } from "redux/rootReducer";
import { useSelector } from "react-redux";

interface ModifierOption {
  optionId: string;
  name: string | null;
  price: string | null;
  isEnabled: number;
}

interface Modifier {
  id: string;
  modifierName: string;
  isEnabled: number;
  minCount: number;
  maxCount: number;
  noFreeCustomization: number;
  options: ModifierOption[];
}
interface Availability {
  availabilityDays: string[];
  sessions: string[];
}

interface OrderType {
  typeName: string;
  typeId: string;
  price: number;
  isEnabled: number;
  // isHidden:number;
  availabilityEnabled:boolean
  availabilities: Availability[];
  isHidden?: any;
}

interface ItemResponse {
  itemId: any;
  itemName: string;
  orderTypes: OrderType[];
  modifiers: Modifier[];
  dietTypes: string[];
  ingredients: string[];
  taxClassAssociation: string[];
  cuisine: string[];
  pairedItems: string[];
  description: string;
  containsAlcohol: boolean;
  ignoreMasterKotPrint: boolean;
  popularItem: boolean;
}

interface ItemObject {
  itemId:string
  categoryId: string; 
  categoryName: string; 
  itemResponseList: ItemResponse[]; 
}

interface TableRowsProps {
  itemobject: ItemObject; 
  indexvalue: number;
  classNamesinner: string[];
  handlemodal: (value: number) => void;
  listingobject: Record<string, any>; 
  setSideBar: () => void;
  SideBarData: any[]; 
  showsidebar: (key: string) => void;
  listingheaders: boolean;
}

const TableTwoBody: React.FC<TableRowsProps> = ({
  itemobject,
  indexvalue,
  classNamesinner,
  handlemodal,
  listingobject,
  listingheaders,
  showsidebar,
}) => {
  const handlesidbarhandling = (key: string, value: number) => {
    showsidebar(key);
    handlemodal(value);
  };
  const filteredListing = Object.fromEntries(
    Object.entries(listingobject).filter(
      ([key, value]) => value === true && key !== "showavail" && key !== "showPricing"
    )
  );
  // const allFalse = Object.values(listingobject).every(value => value === false);
  const [selectedFileds, setselectefields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const filteredList = Object.fromEntries(
      Object.entries(filteredListing).filter(([key, value]) => value === true)
    );
  
    // console.log("Filtered Listing:", filteredList);
    setselectefields(filteredList);
  }, [listingobject]);
  const orderTypesToShow = ["DineIn", "Pickup", "Delivery"];
  const restaurantDetails = useSelector(
    (state: RootState) => state.auth.restaurantDetails
  );
  // console.log("listingobject",Object.keys(selectedFileds).length);
  

  return (
    <>
      {
        // itemobject.itemResponseList.map((item)=>(
        //   <div>{item.flatMap(item => item.orderTypes)
        //     .map(item => item.itemName)}</div>
        // ))
      }

      {itemobject.categoryName !== "" &&
        itemobject?.itemResponseList?.length > 0 && (
          <tr
          style={{width:`${(Object.keys(selectedFileds).length)*10+26}%`}}
            className="categoryname"
          ></tr>
        )}

      {itemobject.categoryName !== "" &&
        itemobject?.itemResponseList?.length > 0 &&
        itemobject?.itemResponseList?.map((item) => (
          <>
         
            <tr
              key={item.itemId}
              style={{ display: "flex",width:`${(Object.keys(selectedFileds).length)*10+25.9}%` }}

              className={`eachobject-rowwise`}
            >
              {orderTypesToShow?.map((typeName,ordertypeindex) => {

                const shouldDisplayType =
                (typeName === "DineIn" && listingobject.Dinein1) ||
                (typeName === "Pickup" && listingobject.Pickup1) ||
                (typeName === "Delivery" && listingobject.Delivery1);

                if (!shouldDisplayType) return null;

                const orderType = item.orderTypes?.find(
                  (ot: OrderType) => ot.typeName === typeName
                );
                const price = orderType
                  ? orderType.price.toFixed(2).padStart(5, "0")
                  : "";
                const className = typeName.toLowerCase() + "data";
                const isPriceEnabled=orderType && orderType.isHidden==0
                ? true
                : false;             

                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    <p style={{opacity:isPriceEnabled?"100%":"50%"}}>
                      {restaurantDetails?.country === "US" ? "$" : "Rs."}{" "}
                      {price !== "" ? price : "0"}
                    </p>
                  </div>
                );
              })}

              {orderTypesToShow?.map((typeName) => {

                const shouldDisplayType =
                (typeName === "DineIn" && listingobject.Dinein2) ||
                (typeName === "Pickup" && listingobject.Pickup2) ||
                (typeName === "Delivery" && listingobject.Delivery2);

                if (!shouldDisplayType) return null;

                const orderType = item.orderTypes?.find(
                  (ot: OrderType) => ot.typeName === typeName
                );

                const isEnabled = orderType ? orderType.isEnabled : "";
                const className = typeName.toLowerCase() + "data";
                const isAvailEnabled=orderType && orderType.availabilityEnabled===true
                ? true
                : false;

                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    {/* 
                  <p>{isEnabled !== "" ? isEnabled : "0"}</p> */}
                    <p style={{opacity:isAvailEnabled?"100%":"50%"}}>
                      {isEnabled !== "" ? (
                        <Toggle toggle={true} />
                      ) : (
                        <Toggle toggle={false} />
                      )}
                    </p>
                  </div>
                );
              })}
              {item?.modifiers && Array.isArray(item.modifiers) && listingobject.Customize1 ? (
                <div className="Customizedata">
                  <span>{item.modifiers.length}</span>
                </div>
              ) : (
                listingobject.Customize1 &&  (
                  <div className="Customizedata">
                    <span>No Modifiers Available</span>
                  </div>
                )
              )}
            </tr>
          </>
        ))}
      {/* {
        <>
          {itemobject?.itemResponseList?.map((itemdata, index) => (
            <tr
              key={itemdata.itemId}
              className={`tabletwobodyrows ${
                indexvalue === 1 && index === 0 && "secondrow"
              }`}
            >
              <td
                className={`eachobject-rowwise  ${
                  listingheaders ?  "givepadding":"nopadding" 
                } ${index === 0 && indexvalue == 0 ? "border-important" : ""}`}
              >
                {itemdata.orderTypes?.length > 0 && Object.entries(itemdata?.orderTypes)?.map(
                  ([key, cellData], cellIndex) => {
                    const className = classNamesinner[cellIndex];
                    const items = listingobject[className];

                    if (items && Array.isArray(cellData)) {
                      return (
                        <div className={className} key={cellIndex}>
                          {cellData?.map((item, itemIndex) => (
                            <React.Fragment key={`${cellIndex}-${itemIndex}`}>
                              {item?.isEnabled || !item?.isEnabled ? (
                                <div
                                  onClick={() =>
                                    handlesidbarhandling(key, itemdata?.itemId)
                                  }
                                >
                                  <Toggle toggle={item?.isEnabled} />
                                </div>
                              ) : (
                                <div
                                  // className={`${className}${itemIndex}`}
                                  onClick={() =>
                                    handlesidbarhandling(key, itemdata?.itemId)
                                  }
                                >
                                  {item.price} 20
                                </div>
                              )}


                              {
                                item.price
                              }
                            </React.Fragment>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }
                )}
              </td>
            </tr>
          ))}
        </>
      } */}
    </>
  );
};

export default TableTwoBody;
