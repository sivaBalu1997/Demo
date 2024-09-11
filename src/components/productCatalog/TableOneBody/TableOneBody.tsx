import React, { useEffect } from 'react';
import apple from "../../../assets/svg/fish.svg";
import dots from "../../../assets/svg/dots.svg";
import { useDispatch } from 'react-redux';
import { Get_Image } from 'redux/productCatalog/productCatalogActions';

interface Item {
  name: string;
  code: string;
  id:number;
}

interface ItemRowProps {
  object:
   { name: Item[]; id: number };
  draggingOverIndex: number | null;
  draggedRowIndex: { index: number } | null;
  handleRowDragStart: (id: number, index: number) => void;
  handleRowDragOver: (id: number, index: number) => void;
  handleRowDragEnd: () => void;
  handleDragScroll: (e: React.DragEvent, ref1: React.RefObject<HTMLDivElement>, ref2: React.RefObject<HTMLDivElement>) => void;
  handlemodal: (value: number) => void;
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

  const dispatch=useDispatch()

  // useEffect(()=>{
  //   dispatch(Get_Image())
  // }
  // ,[])
  const baseImageUrl=process.env.REACT_APP_IMAGE_DOMAIN;
  // console.log(baseImageUrl)

  const handleItemnameClick=(value:number)=>{
    // console.log(value);
    handlemodal(value);

  }

  return (
    <>
      {object.name.map((item, index) => (
        <tr key={index}>
          {draggingOverIndex === index && <td className="placeholderplace"></td>}
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
              draggedRowIndex?.index === index ? 'selected' : ''
            }`}
          >
            <span className="itemimage2">
              <img src={dots} alt="" className="draggableimg" />
              <img src={baseImageUrl+"https://cdn.pixabay.com//photo/2023/07/12/20/40/ai-generated-8123328_640.png"} alt="" className="foodimage" />
            </span>
            <span className="itemname2" onClick={()=>handleItemnameClick(item.id)}>
              {item.name}
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