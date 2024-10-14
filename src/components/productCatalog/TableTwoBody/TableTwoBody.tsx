import React from "react";
import Toggle from "../Toggle/Toggle";

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

interface ItemResponse {
  itemId: any;
  itemName: string;
  orderTypes: string[]; // Assuming orderTypes is an array of strings based on your new data
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
  categoryId: string; // Assuming categoryId is included
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

  return (
    <>
      {
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
                  listingheaders ? "nopadding" : "givepadding"
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
                                  {item.price}
                                </div>
                              )}
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
      }
    </>
  );
};

export default TableTwoBody;
