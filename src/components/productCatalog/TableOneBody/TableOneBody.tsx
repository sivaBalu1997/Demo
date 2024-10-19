import React, { useEffect, useState } from "react";
import apple from "../../../assets/svg/fish.svg";
import dots from "../../../assets/svg/dots.svg";
import { useDispatch, useSelector } from "react-redux";
import HoverText from "../HoverText/HoverText";
import { RootState } from "redux/rootReducer";

interface Media {
  id: string;
  entityId: string;
}

interface Price {
  orderTypeId: string;
  name: string;
  price: string;
  isEnabled: string;
}

interface Option {
  optionId: string;
  optionName: string;
  price: string;
  isEnabled: number;
}

interface Modifier {
  modifierId: string;
  modifierName: string;
  isEnabled: boolean;
  noFreeCustomization: number;
  minCount: number;
  maxCount: number;
  options: Option[];
}

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


interface Category {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  itemResponseList: Item[];
}
interface DraggedItem {
  categoryId: string;
  item: Item;
}
interface MenuObject {
  categoryId: string;
  categoryName: string;
  subCategoryId: string;
  subCategoryName: string;
  itemResponseList: Item[];
}


interface ItemRowProps {
  object: Category; // Updated to use the Category type from the JSON
  draggingOverIndex: number | null;
  draggedRowIndex: { index: number } | null;
  handleRowDragStart: (categoryId: string, item:Item) => void;
  handleRowDragOver: (e:React.DragEvent<HTMLDivElement>) => void;
  handleRowDragEnd:  (categoryId: string,dropIndex:number) => void;
  handleDragScroll: (
    e: React.DragEvent,
    ref1: React.RefObject<HTMLDivElement>,
    ref2: React.RefObject<HTMLDivElement>
  ) => void;
  handlemodal: (value: string) => void;
  tableBodyRef1: React.RefObject<HTMLDivElement>;
  tableBodyRef2: React.RefObject<HTMLDivElement>;
  handlevegrowstart: (
    e: React.DragEvent<HTMLImageElement>,
    index: number
  ) => void;
  handlevegrowover: (e: React.DragEvent<HTMLDivElement>) => void;
  handlevegrowend: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
}

const TableOneBody: React.FC<ItemRowProps> = ({
  object,
  // typevalue,
  draggingOverIndex,
  draggedRowIndex,
  handleRowDragStart,
  handleRowDragOver,
  handleRowDragEnd,
  handleDragScroll,
  handlemodal,
  tableBodyRef1,
  tableBodyRef2,
}) => {

  const dispatch = useDispatch();

  const baseImageUrl = process.env.REACT_APP_IMAGE_DOMAIN;

  const handleItemnameClick = (value: string) => {
    console.log({value})
    handlemodal(value);

    
  };
 
  const menuData = useSelector((state : RootState) => state.productCatalog?.menuData)
  const [menudatalist,setMenudatalist]=useState(menuData);

  useEffect(()=>{
    setMenudatalist(menuData)

  },[menuData])
  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

  console.log("object",object);
  
  

  return (
    <>


    {
       object?.itemResponseList?.length>0 && object.categoryName!=="" && (
        object?.itemResponseList?.map((item, index) => (
          <tr key={index}>
            {draggingOverIndex === index && (
              <td className="placeholderplace"></td>
            )}
            <td
              draggable
              onDragStart={(e) => {
                handleRowDragStart(object.categoryId,item);
                handleDragScroll(e, tableBodyRef1, tableBodyRef2);
              }}
              onDragOver={(e) => {
                handleRowDragOver(e);
                handleDragScroll(e, tableBodyRef1, tableBodyRef2);
              }}
              onDrop={()=>handleRowDragEnd(object.categoryId,index)}
              className={`itemdetails-row ${
                draggedRowIndex?.index === index ? "selected" : ""
              } ${index === 0 ? "removebottomrowline" : ""}`}
            >
              <span className="itemimage2">
                <img src={dots} alt="" className="draggableimg" />
                <img
                  src={
                    baseImageUrl +
                    "photo/2023/07/12/20/40/ai-generated-8123328_640.png"
                  }
                  alt=""
                  className="foodimage"
                />
              </span>
              <span
                className="itemname2"
                onClick={() => handleItemnameClick(item.itemId)}
              >
                <HoverText text={item.itemName}  lengthvale={14}/>
              </span>
              <span className="itemcode2">{item.itemCode}</span>
            </td>
          </tr>
        ))
       )
    }
     
    </>
  );
};

export default TableOneBody;
