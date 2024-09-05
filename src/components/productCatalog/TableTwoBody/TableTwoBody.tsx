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
        <tr key={index}  className={`tabletwobodyrows `}>
          <td   className={`eachobject-rowwise `} >

            {Object.entries(item.pricingdetails || {}).map(
              ([key, cellData], cellIndex) =>     
              {
                const className = classNamesinner[cellIndex];
                const items = listingobject[className];

                if (items && Array.isArray(cellData)) {
                  return (
                    <td className={className} key={cellIndex}>
                      {cellData.map((item, itemIndex) => (
                        <td key={`${cellIndex}-${itemIndex}`}>
                          {item === 'Enabled' || item === 'Disabled' ? (
                            <td onClick={() => showsidebar(key)} >
                              <Toggle
                                toggle={item === 'Enabled'}
                               
                              />
                            </td>
                          ) : (
                            <td
                              className={`${className}${itemIndex}`}
                              onClick={() => showsidebar(key)}
                            >
                              {item}
                            </td>
                          )}
                        </td>
                      ))}
                    </td>
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
