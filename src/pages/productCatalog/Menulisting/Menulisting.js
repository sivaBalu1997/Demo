import React, { useEffect, useState, useRef, useContext } from "react";
import "./Menulisting.scss";
import dots from "../../../assets/svg/dots.svg";
import dollar from "../../../assets/svg/dollar.svg";
import removeicon from "../../../assets/svg/removeicon.svg";
import Header from "../../../components/productCatalog/Header/Header";
import closeicon from "../../../assets/svg/closeicon.svg";
import toggleround from "../../../assets/svg/toggleround.svg";
import dollaricon from "../../../assets/svg/dollaricon.svg";
import togglebtns from "../../../assets/svg/togglebtn.svg";
import Slider from "../../../components/productCatalog/Slider/Slider";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { itemsdata,itemsfooddata } from "../../../assets/mockData/Moca_data";
import InsertColumnList from "../../../components/productCatalog/InsertColumnList/InsertColumnList";
import TableFirstHeader from "../../../components/productCatalog/TableFirstHeader/TableFirstHeader";
import TableSecondHeader from "../../../components/productCatalog/TableSecondHeader/TableSecondHeader";
import TableTwoBody from "../../../components/productCatalog/TableTwoBody/TableTwoBody";
import TableOneBody from "../../../components/productCatalog/TableOneBody/TableOneBody";
import RowHeading from "../../../components/productCatalog/RowHeading/RowHeading";

export const Menulisting = () => {
  const { setActive } = useContext(Contextpagejs);
  const [itemsState, setItemsState] = useState(itemsdata);
  const [itemsFoodState, setItemsFoodState] = useState(itemsfooddata);

  const { isExpanded, setIsExpanded } = useContext(Contextpagejs);
  const [toggleState, settogglebtn] = useState(false);
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

  console.log("Hi")

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
      Dinein: "Dine-in",
      Pickup: "Pickup",
      Delivery: "Delivery",
    },
    Available: {
      show: "Available",
      Dinein: "Dine-in",
      Pickup: "Pickup",
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

 


  const [nooftypes, setnooftypes] = useState([
    {
      id: 1,
      name: itemsState,
    },
    {
      id: 2,
      name: itemsFoodState,
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

  const tableBodyRef1 = useRef(null);
  const tableBodyRef2 = useRef(null);

  useEffect(() => {
    const syncScroll = (sourceTable, targetTable) => {
      targetTable.scrollTop = sourceTable.scrollTop;
    };

    const table1 = tableBodyRef1.current;
    const table2 = tableBodyRef2.current;

    const handleTable1Scroll = () => syncScroll(table1, table2);
    const handleTable2Scroll = () => syncScroll(table2, table1);

    table1.addEventListener("scroll", handleTable1Scroll);
    table2.addEventListener("scroll", handleTable2Scroll);

    return () => {
      table1.removeEventListener("scroll", handleTable1Scroll);
      table2.removeEventListener("scroll", handleTable2Scroll);
    };
  }, []);

  const handleDragScroll = (e, tableRef1, tableRef2) => {
    const table1 = tableRef1.current;
    const table2 = tableRef2.current;

    const offset = 80;

    if (e.clientY < 100) {
      table1.scrollTop -= offset;
      table2.scrollTop -= offset;
    }

    if (e.clientY > window.innerHeight - 105) {
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
    <div className={`${isExpanded ? "mainpagemenu1" : "mainpagemenu"}`}>
      <div className="headercomponent">
        <Header />
      </div>
      <div className="mainlistpage">
        <div className="firsttable">
          <table>
            <thead>
              <div className="firsttableheading">
                <tr className="headerrow">
                  <th className="itemimage">Image</th>
                  <th className="itemname">Item name</th>
                  <th className="itemcode">
                    <p>
                      Code
                      <button
                        onClick={() => setshowheadinglist(true)}
                        className="span"
                      >
                        <span> +</span>
                      </button>
                    </p>
                  </th>
                </tr>
              </div>
            </thead>
            <tbody>
              <div ref={tableBodyRef1} className="table-body">
                <tr>
                  {nooftypes.map((object, index) => (
                    <div key={index}>
                      <div className="firsttablebody">
                        <RowHeading
                          objectId={object.id}
                          index={index}
                          onDragStart={handledragvegnonvegdragstart}
                          onDragOver={handledragvegnonvegdropover}
                          onDrop={handledragvegnonvegdropend}
                        />

                        <TableOneBody
                          object={object}
                          draggingOverIndex={draggingOverIndex}
                          draggedRowIndex={draggedRowIndex}
                          handleRowDragStart={handleRowDragStart}
                          handleRowDragOver={handleRowDragOver}
                          handleRowDragEnd={handleRowDragEnd}
                          handleDragScroll={handleDragScroll}
                          handlemodal={handlemodal}
                          tableBodyRef1={tableBodyRef1}
                          tableBodyRef2={tableBodyRef2}
                        />
                      </div>
                    </div>
                  ))}
                </tr>
              
              </div>
            </tbody>
          </table>
        </div>

        <div className={`${isExpanded ? "secondtable1" : "secondtable"}`}>
          <table>
            <thead>
              <div className="headaadbtnclass" ref={Outsideref}>
                <InsertColumnList
                  listingobject={listingobject}
                  setlistingobject={setlistingobject}
                  insertlists={insertlists}
                  showheadinglist={showheadinglist}
                  setshowheadinglist={setshowheadinglist}
                  closeicon={closeicon}
                  dollaricon={dollaricon}
                  toggleround={toggleround}
                  togglebtns={togglebtns}
                  Outsideref={Outsideref}
                />

                <div style={{ marginLeft: "20px" }}>
                  <tr className="headingonesection">
                    {firstRowTable.map((header, index) => (
                      <TableFirstHeader
                        key={index}
                        header={header}
                        index={index}
                        secondRowLength={secondRowTable[index].length}
                        listingobject={listingobject}
                        setlistingobject={setlistingobject}
                        handleColumnwiseDragStart={handleColumnwiseDragStart}
                        handleColumnwiseDragOver={handleColumnwiseDragOver}
                        handleColumnwiseDragEnd={handleColumnwiseDragEnd}
                        dots={dots}
                        dollar={dollar}
                        togglebtns={togglebtns}
                        removeicon={removeicon}
                      />
                    ))}
                  </tr>
                  <tr className="headingtwosection">
                    {secondRowTable.map((subheaders, index) => (
                      <TableSecondHeader
                        key={index}
                        subheaders={subheaders}
                        index={index}
                        className={classNames[index]}
                        listingobject={listingobject}
                        classNames={classNames}
                      />
                    ))}
                  </tr>
                </div>
              </div>
            </thead>
            <tbody ref={tableBodyRef2} className="table-body">
              <tr>
                <div className="tabletwobody">
                  {nooftypes.map((itemobject, indexvalue) => {
                    return (
                      <div key={indexvalue}>
                        {indexvalue === 1 && (
                          <div className="itemheading2"></div>
                        )}

                        <TableTwoBody
                          itemobject={itemobject}
                          indexvalue={indexvalue}
                          classNamesinner={classNamesinner}
                          draggingOverIndex={draggingOverIndex}
                          listingobject={listingobject}
                          settogglebtn={settogglebtn}
                          showsidebar={showsidebar}
                        />
                      </div>
                    );
                  })}
                </div>
              </tr>
            </tbody>
          </table>

          {modal && (
            <Slider onclose={() => setmodal(false)} sidebartext={sidebartext} />
          )}
        </div>
      </div>
    </div>
  );
};
