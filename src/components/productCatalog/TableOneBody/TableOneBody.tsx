import React, { useCallback, useEffect, useState } from "react";
import apple from "../../../assets/svg/fish.svg";
import dots from "../../../assets/svg/dots.svg";
import { useDispatch, useSelector } from "react-redux";
import HoverText from "../HoverText/HoverText";
import { RootState } from "redux/rootReducer";
import { STORAGE_BUCKET_URL } from "shared/constants";
import { selectedCategory } from "redux/productCatalog/productCatalogActions";
import placeholderimg from "../../../assets/svg/placeholderimg.svg";

interface Media {
  id: string;
  entityId: string;
}
interface Availability {
  id: string;
  availabilityDays: string;
  sessions: string;
  startTime: string;
  endTime: string;
  isEnabled: number;
}

interface OrderType {
  typeName: string;
  typeId: string;
  typeGroup: string;
  price: number;
  isEnabled: number;
  isNotHide: number;
  availabilityEnabled: boolean;
  availabilities?: Availability[];
}

interface ModifierOption {
  optionId: string;
  name: string;
  price: number;
  isEnabled: number;
}

interface Modifiers {
  id: string;
  modifierName: string;
  isEnabled: number;
  minCount: number;
  maxCount: number;
  noFreeCustomization: number;
  orderTypeIds: string[];
  options: ModifierOption[];
}

interface MediaDto {
  imageId: string;
  imageType: string;
}

interface Ingredient {
  id: string;
  name: string;
  mediaDto: MediaDto;
}

interface ItemResponse {
  itemId: string;
  itemName: string;
  mediaResponseList: any[]; // Adjust this type based on actual structure
  orderTypes: OrderType[];
  modifiers: Modifiers[];
  dietTypes: any[]; // Adjust this type based on actual structure
  ingredients: Ingredient[];
  taxClassAssociation: any[]; // Adjust this type based on actual structure
  cuisine: any[]; // Adjust this type based on actual structure
  pairedItems: any[]; // Adjust this type based on actual structure
  allergens: any[]; // Adjust this type based on actual structure
  kitchenStation: any; // Adjust this type based on actual structure
  description: string;
  containsAlcohol: boolean;
  preparationTimeInHours: string;
  preparationTimeInMinutes: string;
  ignoreMasterKotPrint: boolean;
  popularItem: boolean;
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

interface ItemRowProps {
  object: any; // Updated to use the Category type from the JSON
  draggingOverIndex: number | null;
  draggedRowIndex: { index: number } | null;
  handleRowDragStart: (categoryId: string, item: Item) => void;
  handleRowDragOver: (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => void;
  handleRowDragEnd: (categoryId: string, dropIndex: number) => void;
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

  const baseImageUrl = "https://storage.googleapis.com/mhd-media/img/testing/";
  const baseImageUrl2 = process.env.REACT_APP_IMAGE_DOMAIN;

  const menuData = useSelector(
    (state: RootState) => state.productCatalog?.menuData
  );

  const handleItemnameClick = (value: string) => {
    handlemodal(value);
  };

  const [menudatalist, setMenudatalist] = useState(menuData);

  useEffect(() => {
    setMenudatalist(menuData);
  }, [menuData]);

  const [draggedItem, setDraggedItem] = useState<DraggedItem | null>(null);

  const getImageURL = useCallback((data) => {
    return (
      STORAGE_BUCKET_URL +
      "img/testing/" +
      data?.imageId +
      "/" +
      data?.imageType
    );
  }, []);

  // const subcatagoryItems=menuData.map((item:any)=>item?.subCategoryResponseList)
  // const subcatagoryItem=subcatagoryItems?.map((item:any)=> item?.map((items:any)=>items?.itemResponseList))
  // const subcatagory=subcatagoryItem?.filter((item:any)=> item?.filter((items:any)=>items?.length>0))

  // const subcatagory2=subcatagory?.map((item:any)=> item?.filter((items:any)=>items?.length>0))
  // const subcatagory3=subcatagory2?.filter((item:any)=> item?.length>0)

  const subcatagoryItems = menuData.map(
    (item: any) => item?.subCategoryResponseList
  );
  const subcatagoryItem = subcatagoryItems?.map((item: any) =>
    item?.map((items: any) => items?.itemResponseList)
  );
  const subcatagory = subcatagoryItem?.filter((item: any) =>
    item?.filter((items: any) => items?.length > 0)
  );

  const subcatagory2 = subcatagory?.map((item: any) =>
    item?.filter((items: any) => items?.length > 0)
  );
  const subcatagory3 = subcatagory2?.filter((item: any) => item?.length > 0);


  return (
    <>
      {object?.itemResponseList?.length > 0 &&
        object.name !== "" &&
        object?.itemResponseList?.map((item: any, index: any) => (
          <tr key={index}>
            {draggingOverIndex === index && (
              <td className="placeholderplace"></td>
            )}
            <td
              draggable
              onDragStart={(e) => {
                handleRowDragStart(object.categoryId, item);
                handleDragScroll(e, tableBodyRef1, tableBodyRef2);
              }}
              onDragOver={(e) => {
                handleRowDragOver(e, index);
                handleDragScroll(e, tableBodyRef1, tableBodyRef2);
              }}
              onDrop={() => handleRowDragEnd(object.categoryId, index)}
              className={`itemdetails-row ${
                draggedRowIndex?.index === index ? "selected" : ""
              } ${index === 0 ? "removebottomrowline" : ""}`}
            >
              <span className="itemimage2">
                {/* <img src={dots} alt="" className="draggableimg" /> */}
                <img
                  src={
                    item?.mediaResponseList[0]?.imageId
                      ? baseImageUrl + item?.mediaResponseList[0]?.imageId
                      : placeholderimg
                  }
                  alt=""
                  className="foodimage"
                />
              </span>
              <span
                className="itemname2"
                onClick={() => handleItemnameClick(item.itemId)}
              >
                <HoverText text={item.itemName} lengthvale={14} />
              </span>
              <span className="itemcode2">{item.itemCode}</span>
            </td>
          </tr>
        ))}
    </>
  );
};

export default TableOneBody;
