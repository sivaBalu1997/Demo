import React from 'react';
import apple from "../../../assets/svg/fish.svg";
import dots from "../../../assets/svg/dots.svg";

interface Item {
  name: string;
  code: string;
}

interface ItemRowProps {
  object: { name: Item[]; id: number };
  draggingOverIndex: number | null;
  draggedRowIndex: { index: number } | null;
  handleRowDragStart: (id: number, index: number) => void;
  handleRowDragOver: (id: number, index: number) => void;
  handleRowDragEnd: () => void;
  handleDragScroll: (e: React.DragEvent, ref1: React.RefObject<HTMLDivElement>, ref2: React.RefObject<HTMLDivElement>) => void;
  handlemodal: () => void;
  tableBodyRef1: React.RefObject<HTMLDivElement>;
  tableBodyRef2: React.RefObject<HTMLDivElement>;
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
  return (
    <>
      {object.name.map((item, index) => (
        <div key={index}>
          {draggingOverIndex === index && <tr className="placeholderplace"></tr>}
          <tr
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
            className={`itemdetails ${
              draggedRowIndex?.index === index ? 'selected' : ''
            }`}
          >
            <td className="itemimage2">
              <img src={dots} alt="" className="draggableimg" />
              <img src={apple} alt="" className="foodimage" />
            </td>
            <td className="itemname2" onClick={handlemodal}>
              {item.name}
            </td>
            <td className="itemcode2">{item.code}</td>
          </tr>
        </div>
      ))}
    </>
  );
};

export default TableOneBody;
