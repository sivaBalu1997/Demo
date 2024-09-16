import React, { useEffect } from "react";
import apple from "../../../assets/svg/fish.svg";
import dots from "../../../assets/svg/dots.svg";
import { useDispatch } from "react-redux";
import StringDisplay from "../StringDisplay/StringDisplay";

interface Item {
  name: string;
  code: string;
  id: number;
}

interface ItemRowProps {
  object: { name: Item[]; id: number; type: string };

  draggingOverIndex: number | null;
  draggedRowIndex: { index: number } | null;
  handleRowDragStart: (id: number, index: number) => void;
  handleRowDragOver: (id: number, index: number) => void;
  handleRowDragEnd: () => void;
  handleDragScroll: (
    e: React.DragEvent,
    ref1: React.RefObject<HTMLDivElement>,
    ref2: React.RefObject<HTMLDivElement>
  ) => void;
  handlemodal: (value: number) => void;
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
  handlevegrowstart,
  handlevegrowover,
  handlevegrowend,

  handleDragScroll,
  handlemodal,
  tableBodyRef1,
  tableBodyRef2,
}) => {
  const dispatch = useDispatch();

  const baseImageUrl = process.env.REACT_APP_IMAGE_DOMAIN;
  // console.log(baseImageUrl)

  const handleItemnameClick = (value: number) => {
    // console.log(value);
    handlemodal(value);
  };

  return (
    <>
      {/* {
        <tr>
          <td className={`${index === 0 ? "itemheading" : "itemheadingtwo"}`}>
            <img
              src={dots}
              alt=""
              draggable
              onDragStart={(e) => handlevegrowstart(e, index)}
              onDragOver={handlevegrowover}
              onDrop={(e) => handlevegrowend(e, index)}
              className="headingdrag"
            />{" "}
            {"Steamed veg"}
          </td>
        </tr>
      } */}

      {object.name.map((item, index) => (
        <tr key={index}>
          {draggingOverIndex === index && (
            <td className="placeholderplace"></td>
          )}
          <td
            draggable
            onDragStart={(e) => {
              handleRowDragStart(object.id, index);
              handleDragScroll(e, tableBodyRef1, tableBodyRef2);
            }}
            onDragOver={(e) => {
              handleRowDragOver(object.id, index);
              handleDragScroll(e, tableBodyRef1, tableBodyRef2);
            }}
            onDragEnd={handleRowDragEnd}
            className={`itemdetails-row ${
              draggedRowIndex?.index === index ? "selected" : ""
            } ${index===0 ?"removebottomrowline":""}`}
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
              onClick={() => handleItemnameClick(item.id)}
            >
              <StringDisplay text={item.name} length={14} />
            </span>
            <span className="itemcode2">{item.code}</span>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableOneBody;
//https://cdn.pixabay.com/photo/2023/07/12/20/40/ai-generated-8123328_640.png
