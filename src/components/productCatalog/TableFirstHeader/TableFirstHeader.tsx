import React from 'react';

interface TableHeaderProps {
  header: { label: string };
  index: number;
  secondRowLength: number;
  listingobject: any;
  setlistingobject: (value: any) => void;
  handleColumnwiseDragStart: (index: number) => void;
  handleColumnwiseDragOver: (index: number) => void;
  handleColumnwiseDragEnd: () => void;
  dots: string;
  dollar: string;
  togglebtns: string;
  removeicon: string;
}

const TableFirstHeader: React.FC<TableHeaderProps> = ({
  header,
  index,
  secondRowLength,
  listingobject,
  setlistingobject,
  handleColumnwiseDragStart,
  handleColumnwiseDragOver,
  handleColumnwiseDragEnd,
  dots,
  dollar,
  togglebtns,
  removeicon,
}) => {
  return (
    <>
      {listingobject[header.label] && (
        <th
          key={index}
          colSpan={secondRowLength}
          className={header.label.substring(0, header.label.length - 1)}
          draggable
          onDragStart={() => handleColumnwiseDragStart(index)}
          onDragOver={() => handleColumnwiseDragOver(index)}
          onDragEnd={handleColumnwiseDragEnd}
        >
          <span className="dots">
            <img src={dots} alt="" />
          </span>
          {header.label !== 'Inventory1' && header.label !== 'Customize1' && (
            <span className="dollar">
              {header.label.charAt(header.label.length - 1) === '2' ? (
                <img src={togglebtns} alt="" />
              ) : (
                <img src={dollar} alt="" />
              )}
            </span>
          )}
          <span className="spanheadertext">
            {header.label.substring(0, header.label.length - 1)}
          </span>
          <span className="removeicon">
            <img
              src={removeicon}
              alt=""
              onClick={() =>
                setlistingobject({
                  ...listingobject,
                  [header.label]: false,
                })
              }
            />
          </span>
        </th>
      )}
    </>
  );
};

export default TableFirstHeader;
