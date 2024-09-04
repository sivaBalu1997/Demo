import React, { useEffect, useState, useRef, useContext } from "react";
import "./Menulistingtabletwo.scss";
import dots from "../../assets/svg/dots.svg";
import dollar from "../../assets/svg/dollar.svg";
import removeicon from "../../assets/svg/removeicon.svg";
import apple from "../../assets/svg/fish.svg";
import Toggle from "../Toggle/Toggle";
import Header from "../Header/Header";
import closeicon from "../../assets/svg/closeicon.svg";
import toggleround from "../../assets/svg/toggleround.svg";
import dollaricon from "../../assets/svg/dollaricon.svg";
import togglebtns from "../../assets/svg/togglebtn.svg";
import Slider from "../Slider/Slider";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import Menulistingtableone from "../Menulistingtableone/Menulistingtableone";

import StringDisplay from "../StringDisplay/StringDisplay";

export const Menulistingtabletwo = () => {
  const { setActive } = useContext(Contextpagejs);

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [togglebtn, settogglebtn] = useState(false);
  const [draggedIndexsample, setDraggedIndexsample] = useState(null);

  const firstTableBodyRef = useRef(null);
  const secondTableBodyRef = useRef(null);
  const [draggedRowIndex, setDraggedRowIndex] = useState({
    objectId: null,
    index: null,
  });
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [columndraggingindex, setcolumndraggingindex] = useState(null);
  const [modal, setmodal] = useState(false);

  const [showheadinglist, setshowheadinglist] = useState(false);
  const [classNames, setclassNames] = useState([
    "Dinein1-class",
    "Pickup1-class",
    "Delivery1-class",
    "Dinein2-class",
    "Pickup2-class",
    "Delivery2-class",
    "Inventory1-class",
    "Customize1-class",
  ]);
  const [classNamesinner, setclassNamesinner] = useState([
    "Dinein1",
    "Pickup1",
    "Delivery1",
    "Dinein2",
    "Pickup2",
    "Delivery2",
    "Inventory1",
    "Customize1",
  ]);
  const [listingobject, setlistingobject] = useState({
    showPricing: true,
    Dinein1: true,
    Pickup1: true,
    Delivery1: true,
    showavail: true,
    Dinein2: true,
    Pickup2: true,
    Delivery2: true,
    Inventory1: true,
    Customize1: true,
  });

  const insertlists = {
    Pricing: {
      show: "Pricing",
      dinein: "Dine-in",
      pickup: "Pickup",
      Delivery: "Delivery",
    },
    Available: {
      show: "Available",
      dinein: "Dine-in",
      pickup: "Pickup",
      Delivery: "Delivery",
    },
    Inventory: "Inventory",
    Customization: "Customization",
  };

  const [firstRowTable, setFirstRowTable] = useState([
    { label: "Dinein1" },
    { label: "Pickup1" },
    { label: "Delivery1" },
    { label: "Dinein2" },
    { label: "Pickup2" },
    { label: "Delivery2" },
    { label: "Inventory1" },
    { label: "Customize1" },
  ]);

  const [secondRowTable, setSecondRowTable] = useState([
    ["Ac", "Nonac"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Ac", "Nonac"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Total", "Threshold"],
    [""],
  ]);

  const truncateString = (str, length) => {
    return str.length > length ? str.substring(0, length) : str;
  };

  const [items, setitems] = useState([
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
  const [itemsfood, setitemsfood] = useState([
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

  const [nooftypes, setnooftypes] = useState([
    {
      id: 1,
      name: items,
    },
    {
      id: 2,
      name: items,
    },
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const tableBodyRef = useRef(null);
  const handleScrollWhileDragging = (e) => {
    if (!isDragging) return;

    const container = tableBodyRef.current;
    const containerRect = container.getBoundingClientRect();

    const mouseY = e.clientY;
    const scrollSpeed = 10;

    if (mouseY < containerRect.top + 50) {
      container.scrollTop -= scrollSpeed;
    } else if (mouseY > containerRect.bottom - 50) {
      container.scrollTop += scrollSpeed;
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleScrollWhileDragging);
    } else {
      window.removeEventListener("mousemove", handleScrollWhileDragging);
    }

    return () => {
      window.removeEventListener("mousemove", handleScrollWhileDragging);
    };
  }, [isDragging]);

  const handleScroll = (source) => {
    const firstTableBody = firstTableBodyRef.current;
    const secondTableBody = secondTableBodyRef.current;

    if (source === "first") {
      secondTableBody.scrollTop = firstTableBody.scrollTop;
    } else if (source === "second") {
      firstTableBody.scrollTop = secondTableBody.scrollTop;
    }
  };

  const handleColumnwiseDragStart = (index) => {
    setDraggedIndexsample(index);
  };
  const handleColumnwiseDragOver = (index) => {
    if (draggedIndexsample !== index) {
      setcolumndraggingindex(index);
      const updatedFirstRowTable = [...firstRowTable];
      const updatedSecondRowTable = [...secondRowTable];
      const updatedclassnames = [...classNames];
      const updatedclassinnerdatanames = [...classNamesinner];
      const updatedItems = [...nooftypes];
      const item1 = updatedItems[0].name || [];
      const item2 = updatedItems[1].name || [];
      const draggedItem = updatedFirstRowTable[draggedIndexsample];
      const draggedSubheader = updatedSecondRowTable[draggedIndexsample];
      const draggedclassname = updatedclassnames[draggedIndexsample];
      const draggedclassinnerdata =
        updatedclassinnerdatanames[draggedIndexsample];
      updatedFirstRowTable.splice(draggedIndexsample, 1);
      updatedFirstRowTable.splice(index, 0, draggedItem);
      updatedSecondRowTable.splice(draggedIndexsample, 1);
      updatedSecondRowTable.splice(index, 0, draggedSubheader);
      updatedclassnames.splice(draggedIndexsample, 1);
      updatedclassnames.splice(index, 0, draggedclassname);
      updatedclassinnerdatanames.splice(draggedIndexsample, 1);
      updatedclassinnerdatanames.splice(index, 0, draggedclassinnerdata);
      const updatePricingDetails = (itemsArray, index) => {
        return itemsArray.map((item) => {
          if (item && item.pricingdetails) {
            const reorderedPricingDetails = { ...item.pricingdetails };
            const reorderedKeys = Object.keys(reorderedPricingDetails);

            const draggedKey = reorderedKeys.splice(draggedIndexsample, 1)[0];
            reorderedKeys.splice(index, 0, draggedKey);

            const updatedPricingDetails = {};
            reorderedKeys.forEach((key) => {
              updatedPricingDetails[key] = reorderedPricingDetails[key];
            });

            return {
              ...item,
              pricingdetails: updatedPricingDetails,
            };
          }
          return { ...item };
        });
      };
      const updatednooftypes = updatePricingDetails(item1, index);
      const updatednooftypes1 = updatePricingDetails(item2, index);
      setFirstRowTable(updatedFirstRowTable);
      setSecondRowTable(updatedSecondRowTable);
      setclassNames(updatedclassnames);
      setclassNamesinner(updatedclassinnerdatanames);
      setnooftypes([
        { ...updatedItems[0], name: updatednooftypes },
        { ...updatedItems[1], name: updatednooftypes1 },
      ]);
      setDraggedIndexsample(index);
    }
  };
  const handleColumnwiseDragEnd = () => {
    setcolumndraggingindex(null);
    setDraggedIndexsample(null);
  };

  const handledragvegnonvegdragstart = (e, index) => {
    setDraggedRowIndex(index);
  };
  const handledragvegnonvegdropover = (e) => {
    e.preventDefault();
  };

  const handledragvegnonvegdropend = (e, index) => {
    e.preventDefault();
    const updatedRows = [...nooftypes];
    const draggedRow = updatedRows[draggedRowIndex];
    updatedRows.splice(draggedRowIndex, 1);
    updatedRows.splice(index, 0, draggedRow);
    setnooftypes(updatedRows);
    console.log("nooftypes", nooftypes);
    setDraggedRowIndex(null);
  };

  const handleRowDragStart = (objectId, index) => {
    setDraggedRowIndex({ objectId, index });
  };

  const handleRowDragOver = (objectId, index) => {
    if (draggedRowIndex.objectId === null || draggedRowIndex.index === null) {
      return;
    }
    const draggedObjectId = draggedRowIndex.objectId;
    const draggedIndex = draggedRowIndex.index;
    if (draggedObjectId === objectId && draggedIndex !== index) {
      setDraggingOverIndex(index);
      const updatedTypes = [...nooftypes];
      const currentObject = updatedTypes.find((item) => item.id === objectId);
      const indexofvalue = nooftypes.findIndex((item) => item.id === objectId);
      if (currentObject) {
        const updatednooftypes = [...nooftypes[indexofvalue].name];
        const draggingitme = updatednooftypes[draggedIndex];
        updatednooftypes.splice(draggedIndex, 1);
        updatednooftypes.splice(index, 0, draggingitme);
        console.log("indexofvalue", updatednooftypes);
        updatedTypes[indexofvalue].name = updatednooftypes;
        setnooftypes(updatedTypes);
        setDraggedRowIndex({ objectId, index });
      }
    }
  };
  const handleRowDragEnd = () => {
    setDraggedRowIndex({ objectId: null, index: null });
    setDraggingOverIndex(null);
  };

  const handlemodal = () => {
    setmodal(true);
  };
  const [sidebartext, setSideBarText] = useState(null);
  const showsidebar = (key) => {
    if (key === "Dinein1" || key === "Pickup1" || key === "Delivery1") {
      handlemodal();
      setSideBarText("Pricing");
    } else if (key === "Dinein2" || key === "Pickup2" || key === "Delivery2") {
      handlemodal();
      setSideBarText("Availability");
    } else if (key === "Inventory1") {
      handlemodal();
      setSideBarText("Inventory");
    } else if (key === "Customize1") {
      handlemodal();
      setSideBarText("Customize");
    }
  };

  useEffect(() => {
    if (
      !listingobject.Dinein1 &&
      !listingobject.Pickup1 &&
      !listingobject.Delivery1
    ) {
      setlistingobject({ ...listingobject, showPricing: false });
    }
    if (
      listingobject.Dinein1 ||
      listingobject.Pickup1 ||
      listingobject.Delivery1
    ) {
      setlistingobject({ ...listingobject, showPricing: true });
    }
  }, [listingobject.Dinein1, listingobject.Pickup1, listingobject.Delivery1]);

  useEffect(() => {
    if (
      !listingobject.Dinein2 &&
      !listingobject.Pickup2 &&
      !listingobject.Delivery2
    ) {
      setlistingobject({ ...listingobject, showavail: false });
    }
    if (
      listingobject.Dinein2 ||
      listingobject.Pickup2 ||
      listingobject.Delivery2
    ) {
      setlistingobject({ ...listingobject, showavail: true });
    }
  }, [listingobject.Dinein2, listingobject.Pickup2, listingobject.Delivery2]);

  const tableBodyRef1 = useRef(null);
  const tableBodyRef2 = useRef(null);

  // useEffect(() => {
  //   const syncScroll = (sourceTable, targetTable) => {
  //     targetTable.scrollTop = sourceTable.scrollTop;
  //   };

  //   const table1 = tableBodyRef1.current;
  //   const table2 = tableBodyRef2.current;

  //   const handleTable1Scroll = () => syncScroll(table1, table2);
  //   const handleTable2Scroll = () => syncScroll(table2, table1);

  //   table1.addEventListener('scroll', handleTable1Scroll);
  //   table2.addEventListener('scroll', handleTable2Scroll);

  //   return () => {
  //     table1.removeEventListener('scroll', handleTable1Scroll);
  //     table2.removeEventListener('scroll', handleTable2Scroll);
  //   };
  // }, []);

  const handleDragScroll = (e, tableRef1, tableRef2) => {
    const table1 = tableRef1.current;
    const table2 = tableRef2.current;

    const offset = 80; // Amount to scroll

    if (e.clientY < 100) {
      // Near the top of the screen
      table1.scrollTop -= offset;
      table2.scrollTop -= offset;
    }

    if (e.clientY > window.innerHeight - 105) {
      // Near the bottom of the screen
      table1.scrollTop += offset;
      table2.scrollTop += offset;
    }
  };
  const Outsideref = useRef(null);
  const Outsideclicking = (event) => {
    if (Outsideref.current && !Outsideref.current.contains(event.target)) {
      setshowheadinglist(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", Outsideclicking, true);
    return () => {
      document.removeEventListener("click", Outsideclicking, true);
    };
  }, [showheadinglist]);

  return (
    <div>
      <div className="menulist">
        <div className="divisions">
          <div className="divone">
          <div className="firsttableheading">
                <tr className="headerrow">
                  <th className="itemimage">Image</th>
                  <th className="itemname">Item name</th>
                  <th className="itemcode">
                    <p>Code   
                      <button
                        onClick={() => setshowheadinglist(true)}
                        className="span">
                        <span> +</span>
                      </button>
                    </p>
                  </th>
                </tr>
              </div>
              
          {nooftypes.map((item,index) => (
            
          <div>



            {
              <>
                <div className="bodydata1">
                {item.id === 1 && (
                          <div className={`${  index === 0 ? "itemheading" : "itemheadingtwo"   }`} >
                            <img
                              src={dots}
                              alt=""
                              draggable
                              onDragStart={(e) => handledragvegnonvegdragstart(e, index)} 
                              onDragOver={handledragvegnonvegdropover}
                              onDrop={(e) =>  handledragvegnonvegdropend(e, index)}
                              className="headingdrag"
                               
                              
                            />
                            Steamed-Veg(6)
                          </div>
                        )}
                        {item.id === 2 && (
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
                              onDragStart={(e) =>
                                handledragvegnonvegdragstart(e, index)
                              }
                              onDragOver={handledragvegnonvegdropover}
                              onDrop={(e) =>
                                handledragvegnonvegdropend(e, index)
                              }
                            />
                            Steamed-NonVeg(6)
                          </div>
                        )}



                  {item.name.map((data) => (
                    <div className="data">
                      <div className="boda-datas">
                        <p>{data.id}</p>
                        <p>{data.name}</p>
                        <p>{data.code}</p>
                      </div>
                     
                    </div>
                  ))}
                </div>
              </>
            }
          </div>
        ))}
          </div>
      
      <div  className="divtwo">
        <div className="headingonesection">
     
                    {firstRowTable.map(
                      (header, index) =>
                        listingobject[header.label] && (
                          <> 
                         
                          <th
                            key={index}
                            colSpan={secondRowTable[index].length}
                            className={header.label.substring(
                              0,
                              header.label.length - 1
                            )}
                            draggable
                            onDragStart={() => handleColumnwiseDragStart(index)}
                            onDragOver={() => handleColumnwiseDragOver(index)}
                            onDragEnd={handleColumnwiseDragEnd}
                          >
                            <span className="dots">
                              <img
                                src={dots}
                                alt=""
                              
                              />
                            </span>{" "}
                            {header.label !== "Inventory1" &&
                              header.label !== "Customize1" && (
                                <span className="dollar">
                                  {header.label.charAt(
                                    header.label.length - 1
                                  ) === "2" ? (
                                    <img src={togglebtns} alt="" />
                                  ) : (
                                    <img src={dollar} alt="" />
                                  )}
                                </span>
                              )}
                            <span className="spanheadertext">
                              {header.label.substring(
                                0,
                                header.label.length - 1
                              )}
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
                          {/* {columndraggingindex ===index &&
                           <th className="columnspace" style={{width:'100px',height:"60px"}}></th>
                          } */}
                          </>
                        )
                    )}
                
        </div>
        <div  className="headingtwosection"> 
          {secondRowTable.map(
                      (subheaders, index) =>
                        listingobject[
                          classNames[index].replace(/-class/g, "")
                        ] && (

                          <div key={index} className={classNames[index]}>
                            {subheaders.map((subheader, subIndex) => (
                              <p key={subIndex} className={subheader}  >
                                <StringDisplay text={subheader}/>
                              </p>
                            ))}
                          </div>
                        )
                    )}</div>
      {nooftypes.map((item,index) => (
          
          <div className="bodydata2">
            {index === 1 && (
                          <div className="itemheading2">
                           
                          </div>
                        )}
            {item.name.map((data) => (
                <div className="body-datas2">
                <p className="para">
                  
                  {Object.entries(data.pricingdetails || {}).map(
                  ([key, cellData], cellIndex) => {


                    const className = classNamesinner[cellIndex];
                    const items = listingobject[className];
                   
                    if (items && Array.isArray(cellData)) {
                      return (
                        <div className={className} key={cellIndex}>
                          {cellData.map((item, itemIndex) => {
                            return (
                              <p
                                key={`${cellIndex}-${itemIndex}`}
                               
                              >
                                {item === "Enabled" ||
                                item === "Disabled" ? (
                                  <div onClick={() => showsidebar(key)}>
                                    {" "}
                                    <Toggle
                                      toggle={
                                        item === "Enabled"
                                          ? true
                                          : false
                                      }
                                      setToggle={settogglebtn}
                                      togglevalue={
                                        item === "Enabled" ? 1 : 0
                                      }
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
                              </p>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  }
                )}</p>
                
              </div>
          
            ))}
          </div>
       
  ))}
      </div>



        </div>
      </div>

      














    </div>
  );
};
