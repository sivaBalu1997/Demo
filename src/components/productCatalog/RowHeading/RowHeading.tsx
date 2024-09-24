import React from "react";
import dots from "../../../assets/images/dots.png";

interface Item {
  name: string;
  code: string;
  id: number;
  type: string;
}
interface ItemHeadingProps {
  objectId: number;
  object: { name: Item[]; id: number; type: string };

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
  if (
    objectId === 1 &&
    object.name.length >= 1 &&
    object.name.some((item) => item.type === "steamedVeg")
  ) {
    return (
      <tr>
        <td className={`${index === 0 ? "itemheading" : "itemheadingtwo"}`}>
          <img
            src={dots}
            alt=""
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            className="headingdrag"
          />{" "}
          {<span> SteamedVeg</span>}
        </td>
      </tr>
    );
  } else if (
    objectId === 2 &&
    object.name.length >= 1 &&
    object.name.some((item) => item.type === "steamedNonVeg")
  ) {
    return (
      <tr>
        {
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
            <span>{<span> </span>}SteamedNonVeg</span>
          </td>
        }
      </tr>
    );
  } else {
    return null;
  }
};

export default RowHeading;
