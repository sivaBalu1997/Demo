import React from "react";
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
  availabilities: Availability[];
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
  categoryId: string; 
  categoryName: string; // Assuming categoryName is included
  itemResponseList: ItemResponse[]; // List of items
}

interface TableRowsProps {
  itemobject: ItemObject; // Update to match new structure
  indexvalue: number;
  classNamesinner: string[];
  handlemodal: (value: number) => void;
  listingobject: Record<string, any>; // More specific typing can be applied based on usage
  setSideBar: () => void;
  SideBarData: any[]; // Specify if you have a specific structure
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
  // const allFalse = Object.values(listingobject).every(value => value === false);
  const orderTypesToShow = ["DineIn", "Pickup", "Delivery"];
  const restaurantDetails = useSelector(
    (state: RootState) => state.auth.restaurantDetails
  );

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
            className="categoryname"
          ></tr>
        )}

      {itemobject.categoryName !== "" &&
        itemobject?.itemResponseList?.length > 0 &&
        itemobject?.itemResponseList?.map((item) => (
          <>
            <tr
              key={item.itemId}
              style={{ display: "flex" }}
              className={`eachobject-rowwise`}
            >
              {orderTypesToShow?.map((typeName) => {

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

                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    <p>
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

                return (
                  <div
                    key={typeName}
                    style={{ display: "flex" }}
                    className={className}
                  >
                    {/* 
                  <p>{isEnabled !== "" ? isEnabled : "0"}</p> */}
                    <p>
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
