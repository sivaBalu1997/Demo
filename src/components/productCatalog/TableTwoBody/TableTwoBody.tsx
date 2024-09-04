import React from 'react';
import Toggle from '../Toggle/Toggle';

interface PricingDetails {
  [key: string]: any[];
}

interface ItemObject {
  name: { pricingdetails: PricingDetails }[];
  id: number;
}

interface TableRowsProps {
  itemobject: ItemObject;
  indexvalue: number;
  classNamesinner: string[];
  draggingOverIndex: number;
  listingobject: any;
  settogglebtn: (value: boolean) => void;
  showsidebar: (key: string) => void;
}

const TableTwoBody: React.FC<TableRowsProps> = ({
  itemobject,
  indexvalue,
  classNamesinner,
  draggingOverIndex,
  listingobject,
  settogglebtn,
  showsidebar,
}) => {
  return (
    <>
      {itemobject.name.map((item, index) => (
        <tr
          key={index}
          className={`tabletwobodyrow ${
            itemobject.id === 1 &&
            indexvalue === 0 &&
            index === 0 &&
            'borderforrow1'
          } ${draggingOverIndex === index ? 'selected' : ''} ${
            itemobject.id === 2 &&
            indexvalue === 0 &&
            index === 0 &&
            'secondpartborder'
          } ${
            itemobject.id === 1 && index === 1
              ? 'firstpartborder'
              : 'firstpartborder1'
          }`}
        >
          <td className="eachobject">
            {Object.entries(item.pricingdetails || {}).map(
              ([key, cellData], cellIndex) => {
                const className = classNamesinner[cellIndex];
                const items = listingobject[className];
                if (items && Array.isArray(cellData)) {
                  return (
                    <div className={className} key={cellIndex}>
                      {cellData.map((item, itemIndex) => (
                        <td key={`${cellIndex}-${itemIndex}`}>
                          {item === 'Enabled' || item === 'Disabled' ? (
                            <div onClick={() => showsidebar(key)}>
                              <Toggle
                                toggle={item === 'Enabled'}
                               
                              />
                            </div>
                          ) : (
                            <span
                              className="price"
                              onClick={() => showsidebar(key)}
                            >
                              {item}
                            </span>
                          )}
                        </td>
                      ))}
                    </div>
                  );
                }
                return null;
              }
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableTwoBody;
