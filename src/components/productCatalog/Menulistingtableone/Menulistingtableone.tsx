import React,{forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import dots from "../../../assets/svg/dots.svg";
import apple from "../../../assets/svg/fish.svg";


interface PricingDetails {
    Dinein1: string[];
    Pickup1: string[];
    Delivery1: string[];
    Dinein2: string[];
    Pickup2: string[];
    Delivery2: string[];
    Inventory1: string[];
    Customize1: string[];
  }
  
  interface Item {
    id: number;
    name: string;
    code: string;
    pricingdetails: PricingDetails;
  }
  
  interface NoOfTypes {
    id: number;
    name: Item[];
  }
  interface rowdrag{
    objectId: number|null,
    index: number|null,

  }

const Menulistingtableone =forwardRef(( ref: React.Ref<{ tableBodyRef1: HTMLInputElement | null, tableBodyRef2: HTMLDivElement | null }>)  => {
    const localRef1 = useRef<HTMLInputElement>(null);
    const localRef2 = useRef<HTMLDivElement>(null);
    // useImperativeHandle(ref, () => ({
    //     tableBodyRef1: localRef1.current,
    //     tableBodyRef2: localRef2.current,
    //   }));
  const truncateString = (str:string, length:number) => {
    return str.length > length ? str.substring(0, length) : str;
  };

    const [items, setitems] = useState<Item[]>([
        {
          id: 1,
          name: truncateString("dosa", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$100.00", "$100.00"],
            Pickup1: ["$200.00", "$200.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Disabled", "Enabled"],
            Pickup2: ["Enabled", "Disabled", "Disabled"],
            Delivery2: ["Enabled", "Enabled", "Disabled"],
            Inventory1: ["$100", "$10"],
            Customize1: ["5"],
          },
        },
    
        {
          id: 3,
          name: truncateString(" Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400.00", "$600.00"],
            Pickup1: ["$700.00", "$700.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 4,
          name: truncateString("Creamy", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400..00", "$600.00"],
            Pickup1: ["$700.00", "$700.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 5,
          name: truncateString("idly Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400.00", "$600.00"],
            Pickup1: ["$700.00", "$700.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 2,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500.00", "$900.00"],
            Pickup1: ["$200.00", "$400.00", "$200.00"],
            Delivery1: ["$300.00", "$300.00", "$300.00"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        
        
      ]);
      const [itemsfood, setitemsfood] = useState<Item[]>([
        {
          id: 11,
          name: truncateString("Chicken", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$900", "$100"],
            Pickup1: ["$200", "$200", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$100", "$10"],
            Customize1: ["5"],
          },
        },
    
        {
          id: 31,
          name: truncateString("Fish", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400", "$600"],
            Pickup1: ["$700", "$700", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 41,
          name: truncateString("Mutton", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400", "$600"],
            Pickup1: ["$700", "$700", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 51,
          name: truncateString("Chicken 65", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$400", "$600"],
            Pickup1: ["$700", "$700", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1000", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 21,
          name: truncateString("Chicken roll", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500", "$900"],
            Pickup1: ["$200", "$400", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
        {
          id: 21,
          name: truncateString("Creamy Mushroo", 14),
          code: "12345",
          pricingdetails: {
            Dinein1: ["$1500", "$900"],
            Pickup1: ["$200", "$400", "$200"],
            Delivery1: ["$300", "$300", "$300"],
            Dinein2: ["Enabled", "Enabled"],
            Pickup2: ["Enabled", "Enabled", "Enabled"],
            Delivery2: ["Enabled", "Enabled", "Enabled"],
            Inventory1: ["$1200", "$10"],
            Customize1: ["5"],
          },
        },
      ]);
    
    
      const [nooftypes, setnooftypes] = useState<NoOfTypes[]>([
        {
          id: 1,
          name: items,
        },
        {
          id: 2,
          name: itemsfood,
        }
      ]);
      const [draggingOverIndex, setDraggingOverIndex] = useState<number | null>(null);


      const [Drgavegnonveg, setDrgavegnonveg] = useState<number | null>(null);
      const [draggedRowIndex, setDraggedRowIndex] = useState<rowdrag|null>({
        objectId: null,
        index: null,
      });
      const handledragvegnonvegdragstart = ( index:number) => {
        setDrgavegnonveg(index);
      };
      const handledragvegnonvegdropover = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
      };
    
      const handledragvegnonvegdropend = (e:React.DragEvent<HTMLImageElement>, index:number) => {
        e.preventDefault();
        if (Drgavegnonveg !== null) {
            const updatedRows = [...nooftypes];
            const draggedRow = updatedRows[Drgavegnonveg];
            updatedRows.splice(Drgavegnonveg, 1);
            updatedRows.splice(index, 0, draggedRow);
            setnooftypes(updatedRows);
          }
        
          setDrgavegnonveg(null); 
      };
      
  const handleRowDragStart = (objectId:number, index:number) => {
    setDraggedRowIndex({ objectId, index });
   

  };
 
 
  const handleRowDragOver = (objectId:number, index:number) => {
    
   
    if (!draggedRowIndex || draggedRowIndex.objectId === null || draggedRowIndex.index === null) {
        return;
      }
    const draggedObjectId = draggedRowIndex.objectId;
    const draggedIndex = draggedRowIndex.index;
    if (draggedObjectId === objectId && draggedIndex !== index) {
      setDraggingOverIndex(index);
      const updatedTypes = [...nooftypes];
      const currentObject = updatedTypes.find((item) => item.id === objectId);
      const indexofvalue = nooftypes.findIndex(item => item.id === objectId);
      if (currentObject) {
        const updatednooftypes=[...nooftypes[indexofvalue].name]
        const draggingitme=updatednooftypes[draggedIndex];
        updatednooftypes.splice(draggedIndex,1);
        updatednooftypes.splice(index,0,draggingitme)
        updatedTypes[indexofvalue].name=updatednooftypes;
        setnooftypes(updatedTypes);
        setDraggedRowIndex({ objectId, index });
      }
    }
  };
  const handleRowDragEnd = () => {
    setDraggedRowIndex({ objectId: null, index: null });
    setDraggingOverIndex(null);
  };
//   const handleDragScroll = (
//     e: DragEvent, 
//     tableRef1: React.RefObject<HTMLDivElement>, 
//     tableRef2: React.RefObject<HTMLDivElement>
//   ) => {
//     const table1 = tableRef1.current;
//     const table2 = tableRef2.current;
  
//     const offset = 80; // Amount to scroll
  
//     if (table1 && table2) {
//       const clientY = e.clientY;
  
//       if (clientY < 100) { // Near the top of the screen
//         table1.scrollTop -= offset;
//         table2.scrollTop -= offset;
//       }
    
//       if (clientY > window.innerHeight - 105) { // Near the bottom of the screen
//         table1.scrollTop += offset;
//         table2.scrollTop += offset;
//       }
//     }
//   };
  useEffect(() => {
    const handleDrag = (e: DragEvent) => {
      handleDragScroll(e, localRef1, localRef2);
    };
  
    const table1 = localRef1.current;
    const table2 = localRef2.current;
  
    if (table1) table1.addEventListener('drag', handleDrag);
    if (table2) table2.addEventListener('drag', handleDrag);
  
    return () => {
      if (table1) table1.removeEventListener('drag', handleDrag);
      if (table2) table2.removeEventListener('drag', handleDrag);
    };
  }, []);
  const handleDragScroll = (
    e: DragEvent, 
    tableRef1: React.RefObject<HTMLDivElement>, 
    tableRef2: React.RefObject<HTMLDivElement>
  ) => {
    const table1 = tableRef1.current;
    const table2 = tableRef2.current;
    
    if (!table1 || !table2) return;
    
    const offset = 80; // Amount to scroll
    const clientY = e.clientY;
    
  
    if (clientY < 100) { // Near the top of the screen
      table1.scrollTop -= offset;
      table2.scrollTop -= offset;
    } else if (clientY > window.innerHeight - 105) { // Near the bottom of the screen
      table1.scrollTop += offset;
      table2.scrollTop += offset;
    }
  };
  
     
    
  return (
    <div>
        <table>
            <tbody>
            <tr>
                  {nooftypes.map((object, index) => (
                    <div key={index}>
                      <div className="firsttablebody" >
                        {object.id === 1 && (
                          <div className={`${  index === 0 ? "itemheading" : "itemheadingtwo"   }`} >
                            <img
                              src={dots}
                              alt=""
                              draggable
                              onDragStart={(e) => handledragvegnonvegdragstart( index)} 
                              onDragOver={()=>handledragvegnonvegdropover}
                              onDrop={(e) =>  handledragvegnonvegdropend(e, index)}
                              className="headingdrag"
                               
                              
                            />
                            Steamed-Veg(6)
                          </div>
                        )}
                        {object.id === 2 && (
                          <div
                            className={`${
                              index === 1 ? "itemheadingtwo":" itemheading " 
                            }`}
                          >
                            <img
                              src={dots}
                              alt=""
                               className="headingdrag"
                              draggable
                              onDragStart={(e) => handledragvegnonvegdragstart( index)} 
                              onDragOver={()=>handledragvegnonvegdropover}
                              onDrop={(e) =>  handledragvegnonvegdropend(e, index)}
                            />
                            Steamed-NonVeg(6)
                          </div>
                        )}

                        {object.name.map((item, index) => (
                          <React.Fragment >
                            <div key={index}>
                            {draggingOverIndex === index && (
                              <tr className="placeholderplace"></tr>
                            )}
                            <tr
                              draggable
                              onDragStart={(e) =>{
                                handleRowDragStart(object.id, index)
                                // handleDragScroll(e , tableBodyRef1, tableBodyRef2);
                              }
                              }
                              onDragOver={(e) =>{
                                handleRowDragOver(object.id, index)
                                // handleDragScroll(e , tableBodyRef1, tableBodyRef2);
                              }
                              }
                              onDragEnd={handleRowDragEnd}
                              className={`itemdetails ${
                                draggedRowIndex?.index === index
                               
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              <td className="itemimage2">
                                <img
                                  src={dots}
                                  alt=""
                                  className="draggableimg"
                                />
                                <img src={apple} alt="" className="foodimage" />
                              </td>
                              <td className="itemname2" >{item.name}</td>
                              <td className="itemcode2">{item.code}</td>
                            </tr>
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </tr>
            </tbody>
        </table>
    </div>
  )
})

export default Menulistingtableone