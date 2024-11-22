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
  availabilityEnabled: boolean;
  availabilities: Availability[];
  isNotHide?: any;
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
  itemId: string;
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
  const filteredListing =
    listingobject &&
    Object.fromEntries(
      Object.entries(listingobject).filter(
        ([key, value]) =>
          value === true && key !== "showavail" && key !== "showPricing"
      )
    );
  // const allFalse = Object.values(listingobject).every(value => value === false);
  const [selectedFileds, setselectefields] = useState<Record<string, boolean>>(
    {}
  );
  const menuData = useSelector((state: any) => state.productCatalog?.menuData);

  useEffect(() => {
    const filteredList =
      listingobject &&
      Object.fromEntries(
        Object.entries(filteredListing).filter(([key, value]) => value === true)
      );

    setselectefields(filteredList);
  }, [listingobject]);
  const orderTypesToShow = ["DineIn", "Pickup", "Delivery"];
  const restaurantDetails = useSelector(
    (state: RootState) => state.auth.restaurantDetails
  );
  const getUniqueOrderTypeNames = (menuData: any) => {
    const orderTypeNames = menuData.flatMap((category: any) =>
      category.itemResponseList?.flatMap((item: any) =>
        item.orderTypes.map((orderType: any) => ({
          typeName: orderType?.typeName,
        }))
      )
    );

    const uniqueOrderTypeNames = Array.from(
      new Map(
        orderTypeNames.map((orderType: any) => [orderType?.typeName, orderType])
      ).values()
    );

    return uniqueOrderTypeNames;
  };

  const uniqueOrderTypeNames = getUniqueOrderTypeNames(menuData);

  const orderTypesToShow2 = uniqueOrderTypeNames
    .filter((item: any) => item?.typeName)
    .map((item: any) => item.typeName);

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
            style={{
              width: `${Object.keys(selectedFileds).length * 10 + 100}%`,
            }}
            className="categoryname"
          ></tr>
        )}

      {itemobject.categoryName !== "" &&
        itemobject?.itemResponseList?.length > 0 &&
        itemobject?.itemResponseList?.map((item, index) => (
          <>
            <tr
              key={item.itemId}
              style={{
                display: "flex",
                width: `${Object.keys(selectedFileds).length * 10 + 100}%`,
              }}
              className={`eachobject-rowwise`}
            >
              {orderTypesToShow2?.map((typeName, ordertypeindex) => {
                const shouldDisplayType =
                  listingobject && listingobject[`${typeName}1`];
                // console.log("typeName", typeName, shouldDisplayType);

                if (!shouldDisplayType) return null;

                const orderType = item.orderTypes?.find(
                  (ot: OrderType) => ot.typeName === typeName
                );
                const price = orderType
                  ? orderType.price.toFixed(2).padStart(5, "0")
                  : "";
                const className = typeName?.toLowerCase() + "data";
                const isPriceEnabled =
                  orderType &&
                  orderType.isNotHide == 1 
                    ? true
                    : false;
                const sliderkey =
                  typeName === "DineIn"
                    ? "DineIn1"
                    : typeName === "Pickup"
                    ? "Pickup1"
                    : typeName === "Delivery"
                    ? "Delivery1"
                    : "";
                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    <p
                      style={{ opacity: isPriceEnabled ? "100%" : "50%" }}
                      onClick={() =>
                        handlesidbarhandling(
                          sliderkey,
                          itemobject?.itemResponseList[index].itemId
                        )
                      }
                    >
                      {restaurantDetails?.country === "US" ? "$" : "Rs."}{" "}
                      {price !== "" ? price : "0"}
                    </p>
                  </div>
                );
              })}

              {orderTypesToShow2?.map((typeName) => {
                const shouldDisplayType =
                  listingobject && listingobject[`${typeName}2`];

                if (!shouldDisplayType) return null;

                const orderType = item.orderTypes?.find(
                  (ot: OrderType) => ot.typeName === typeName
                );

                

                const isEnabled = orderType ? orderType.isEnabled : "";
                const className = typeName?.toLowerCase() + "data";
                // console.log("orderType", className);
                const isAvailEnabled =
                  orderType && orderType.availabilityEnabled === true
                    ? true
                    : false;
                const sliderkey =
                  typeName === "DineIn"
                    ? "DineIn2"
                    : typeName === "Pickup"
                    ? "Pickup2"
                    : typeName === "Delivery"
                    ? "Delivery2"
                    : "";

                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    {/* 
                  <p>{isEnabled !== "" ? isEnabled : "0"}</p> */}
                    <p
                      // style={{ opacity: isAvailEnabled ? "100%" : "50%" }}
                      onClick={() =>
                        handlesidbarhandling(
                          sliderkey,
                          itemobject?.itemResponseList[index].itemId
                        )
                      }
                    >
                      {isEnabled !== "" ? (
                        <Toggle toggle={orderType?.isNotHide === 1 && true} />
                      ) : (
                        <Toggle toggle={orderType?.isNotHide !== 1 && false} />
                      )}
                    </p>
                  </div>
                );
              })}
              {item?.modifiers &&
              Array.isArray(item.modifiers) &&
              listingobject &&
              listingobject.Customize1 ? (
                <div
                  className="Customizedata"
                  onClick={() =>
                    handlesidbarhandling(
                      "",
                      itemobject?.itemResponseList[index].itemId
                    )
                  }
                >
                  <span>{item.modifiers.length}</span>
                </div>
              ) : (
                listingobject &&
                listingobject.Customize1 && (
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
