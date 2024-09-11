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
  handlemodal: (value: number) => void;
  listingobject: any;
  setSideBar:()=>void
  SideBarData:[]
  showsidebar: (key: string) => void;
}

const TableTwoBody: React.FC<TableRowsProps> = ({
  itemobject,
  indexvalue,
  classNamesinner,
  handlemodal,
  listingobject,

  showsidebar,
}) => {

  const handlesidbarhandling=(key:string,value:number)=>{
    showsidebar(key)
    handlemodal(value);

  }
  return (
    <>
      {itemobject.name.map((item, index) => (
        <tr key={index}  className={`tabletwobodyrows ${indexvalue===1 && index===0 && 'secondrow'}`} >
          <td   className={`eachobject-rowwise `} >

            {Object.entries(item.pricingdetails || {}).map(
              ([key, cellData], cellIndex) =>     
              {
                const className = classNamesinner[cellIndex];
                const items = listingobject[className];

                if (items && Array.isArray(cellData)) {
                  return (
                    <div className={className} key={cellIndex}>
                      {cellData.map((item, itemIndex) => (
                        <React.Fragment key={`${cellIndex}-${itemIndex}`}>
                          {item === 'Enabled' || item === 'Disabled' ? (
                            <div  onClick={() => handlesidbarhandling(key,item.id)} >
                              <Toggle
                                toggle={item === 'Enabled'}
                               
                              />
                            </div>
                          ) : (
                            <div
                              // className={`${className}${itemIndex}`}
                              onClick={() => handlesidbarhandling(key,item.id)}
                            >
                              {item}
                            </div>
                          )}
                        </React.Fragment>
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
