import React from 'react';
import dots from '../../../assets/images/dots.png';

interface ItemHeadingProps {
  objectId: number;
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
}) => {
  if (objectId === 1) {
    return (
      <tr className={`${index === 0 ? "itemheading" : "itemheadingtwo"}`}>
        <td>
        <img
          src={dots}
          alt=""
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          className="headingdrag"
        /> Steamed-Veg(6)
        </td>
      
       
      </tr>
    );
  } else if (objectId === 2) {
    return (
      <tr className={`${index === 1 ? "itemheadingtwo" : "itemheading"}`}>
       <td>
       <img
          src={dots}
          alt=""
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          className="headingdrag"
        />
        Steamed-NonVeg(6)
     
       </td>
      
      
      </tr>
    );
  } else {
    return null;
  }
};

export default RowHeading;
