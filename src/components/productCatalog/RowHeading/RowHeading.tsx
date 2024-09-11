import React from 'react';
import dots from '../../../assets/images/dots.png';

interface ItemHeadingProps {
  objectId: number;
  index: number;
  onDragStart: (e: React.DragEvent<HTMLImageElement>, index: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, index: number) => void;
  Typename?:string
}

const RowHeading: React.FC<ItemHeadingProps> = ({
  objectId,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  Typename
}) => {
  // console.log("list tye",Typename)
  
  if (objectId === 1) {
    return (
      <tr >
        <td className={`${index === 0 ? "itemheading" : "itemheadingtwo"}`}>
        <img
          src={dots}
          alt=""
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={onDragOver}
          onDrop={(e) => onDrop(e, index)}
          className="headingdrag"
        /> {Typename?.length? <span>{Typename}</span>: <span> Steamed-Veg(6)</span>
        } 
        </td>
      
       
      </tr>
    );
  } else if (objectId === 2) {
    return (
      <tr >
        {
          !Typename?.length &&
          <td className={`${index === 1 ? "itemheadingtwo" : "itemheading"}`}>
          <img
             src={dots}
             alt=""
             draggable
             onDragStart={(e) => onDragStart(e, index)}
             onDragOver={onDragOver}
             onDrop={(e) => onDrop(e, index)}
             className="headingdrag"
           />
            <span> Steamed-NonVeg(6)</span>
        
          </td>
        }
      
      
      
      </tr>
    );
  } else {
    return null;
  }
};

export default RowHeading;
