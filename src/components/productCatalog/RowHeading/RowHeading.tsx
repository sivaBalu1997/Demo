import React from "react";
import dots from "../../../assets/images/dots.png";
import { useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";

interface Item {
  itemId: string;
  itemName: string;
  itemCode: string;
  media: {
    id: string;
    entityId: string;
  };
  description: string;
  prices: {
    orderTypeId: string;
    name: string;
    price: string;
    isEnabled: string;
  }[];
  modifiers: {
    modifierId: string;
    modifierName: string;
    isEnabled: boolean;
    noFreeCustomization: number;
    minCount: number;
    maxCount: number;
    options: {
      optionId: string;
      optionName: string;
      price: string;
      isEnabled: number;
    }[];
  }[];
}

interface MenuObject {
  categoryId: string;
  categoryName: string;
  name:string;
  subCategoryId: string;
  subCategoryName: string;
  itemResponseList: Item[];
}

interface ItemHeadingProps {
  objectId: string;
  object: MenuObject;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLImageElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}


const RowHeading: React.FC<ItemHeadingProps> = ({
  objectId,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  object,
}) => {


  const menuData = useSelector((state : RootState) => state.productCatalog?.menuData)
  
  return (
    <tr className="table-one-row-data">

      { object?.itemResponseList?.length>0 && object.name!==""&&
            <td className={`${index === 0 ? "itemheading" : "itemheadingtwo"}`}>
            {/* <img
              src={dots}
              alt=""
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
              className="headingdrag"
            />{" "} */}
            {<span> {object.name!=="" && object.name} <span className="count-Of-ItemList">({object.itemResponseList?.length})</span> </span>}
          </td>
      }
     
    </tr>
  );
};

export default RowHeading;



