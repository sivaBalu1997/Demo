import React, { useEffect, useState, useRef, useContext } from "react";
import "./Menulisting.scss";
import dots from "../../../assets/svg/dots.svg";
import dollar from "../../../assets/svg/dollar.svg";
import removeicon from "../../../assets/svg/removeicon.svg";
import Header from "../../../components/productCatalog/Header/Header";
import closeicon from "../../../assets/svg/closeicon.svg";
// import Loader from "../../../assets/Loader.gif.gif";
import toggleround from "../../../assets/svg/toggleround.svg";
import calendericon from "../../../assets/svg/calendericon.svg";
import dollaricon from "../../../assets/svg/dollaricon.svg";
import Slider from "../../../components/productCatalog/Slider/Slider";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import InsertColumnList from "../../../components/productCatalog/InsertColumnList/InsertColumnList";
import TableFirstHeader from "../../../components/productCatalog/TableFirstHeader/TableFirstHeader";
import TableSecondHeader from "../../../components/productCatalog/TableSecondHeader/TableSecondHeader";
import TableTwoBody from "../../../components/productCatalog/TableTwoBody/TableTwoBody";
import TableOneBody from "../../../components/productCatalog/TableOneBody/TableOneBody";
import RowHeading from "../../../components/productCatalog/RowHeading/RowHeading";
import SidePanel from "pages/SidePanel";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";

import {
  getMenuRequest,
  selectedMockDataRequest,
  storeMockDataRequest,
} from "redux/productCatalog/productCatalogActions";

export const Menulisting = () => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.auth.selectedBranch);

  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const loadingRequest = useSelector((state) => state.productCatalog?.addMenuLoading);
  const SearchedmenuItem = useSelector((state) => state.searchItem?.SearcheItem);
  const { isExpanded } = useContext(Contextpagejs);
  const [draggedIndexsample, setDraggedIndexsample] = useState(null);
  const [menudatalist, setMenudatalist] = useState(menuData);
  const FilteredData = useSelector((state) => state.storeMockDataFilteredReducer.data);
  const [modal, setmodal] = useState(false);
  const [showheadinglist, setshowheadinglist] = useState(false);
  const [sidebartext, setSideBarText] = useState(null);
  const tableBodyRef1 = useRef(null);
  const tableBodyRef2 = useRef(null);
  const Outsideref = useRef(null);
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [dragtablefirstHeaderindex, setdragtablefirstHeaderindex] = useState(null);
  const [SideBarData, setSideBar] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [draggedRowIndex, setDraggedRowIndex] = useState({
    objectId: null,
    index: null,
  });
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
    // Inventory1: true,
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
    // { label: "Inventory1" },
    { label: "Customize1" },
  ]);

  const [secondRowTable, setSecondRowTable] = useState([
    ["Ac", "Non Ac"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Ac", "Non Ac"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Inhouse", "Swiggy", "Zomato"],
    ["Total", "Threshold"],
    [""],
  ]);

  const [steamType, setsteamType] = useState([
    {
      id: 1,
      name: [],
      type: "SteamedVeg",
    },
    {
      id: 2,
      name: [],
      type: "SteameNondVeg",
    },
  ]);

 

  const handleDragStart = (categoryId, item) => {
    setDraggedItem({ categoryId, item });
  };
  const handleDragOver = (e,index) => {
    e.preventDefault();
   
  };
  const handleDrop = (categoryId, dropIndex) => {
    if (!draggedItem || draggedItem.categoryId !== categoryId) return;

    const updatedCategories = menudatalist.map((category) => {
      if (category.categoryId === categoryId) {
        const updatedItems = [...category.itemResponseList];
        const draggedIndex = updatedItems.findIndex(
          (item) => item.itemId === draggedItem.item.itemId
        );
        updatedItems.splice(draggedIndex, 1); 
        updatedItems.splice(dropIndex, 0, draggedItem.item);
        return { ...category, itemResponseList: updatedItems };
      }
      return category;
    });

    setMenudatalist(updatedCategories);
    setDraggedItem(null);
   
  };

  const handleColumnwiseDragStart = (index) => {
    setDraggedIndexsample(index);
  };

  const deleteMenuItemSuccess = useSelector((state) => state.productCatalog.deleteMenuItemSuccess )

  const handleColumnwiseDragOver = (index) => {
    if (draggedIndexsample !== index) {
      setdragtablefirstHeaderindex(index);
      const updatedFirstRowTable = [...firstRowTable];
      const updatedSecondRowTable = [...secondRowTable];
      const updatedclassnames = [...classNames];
      const updatedclassinnerdatanames = [...classNamesinner];
      const updatedItems = [...steamType];
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

      const updatedsteamType = updatePricingDetails(item1, index);
      const updatedsteamType1 = updatePricingDetails(item2, index);
      setFirstRowTable(updatedFirstRowTable);
      setSecondRowTable(updatedSecondRowTable);
      setclassNames(updatedclassnames);
      setclassNamesinner(updatedclassinnerdatanames);
      setsteamType([
        { ...updatedItems[0], name: updatedsteamType },
        { ...updatedItems[1], name: updatedsteamType1 },
      ]);
      setDraggedIndexsample(index);
    }
  };

  const handleColumnwiseDragEnd = () => {
    setDraggedIndexsample(null);
    setdragtablefirstHeaderindex(null);
  };

  const handledragvegnonvegdragstart = (e, index) => {
    setDraggedRowIndex(index);
  };
  const handledragvegnonvegdropover = (e) => {
    e.preventDefault();
  };

  const handledragvegnonvegdropend = (e, index) => {
    e.preventDefault();
    const updatedCategories = [...menudatalist];
    const draggedCategory = updatedCategories[draggedRowIndex];
    updatedCategories.splice(draggedRowIndex, 1);
    updatedCategories.splice(index, 0, draggedCategory);
    setMenudatalist(updatedCategories);
    setDraggedRowIndex(null);
  };

  // const handleRowDragStart = (objectId, index) => {
  //   setDraggedRowIndex({ objectId, index });
  // };

  // const handleRowDragOver = (objectId, index) => {
  //   if (draggedRowIndex.objectId === null || draggedRowIndex.index === null) {
  //     return;
  //   }

  //   const draggedObjectId = draggedRowIndex.objectId;
  //   const draggedIndex = draggedRowIndex.index;
  //   if (draggedObjectId === objectId && draggedIndex !== index) {
  //     setDraggingOverIndex(index);
  //     const updatedTypes = [...steamType];
  //     const currentObject = updatedTypes.find((item) => item.id === objectId);
  //     const indexofvalue = steamType.findIndex((item) => item.id === objectId);
  //     if (currentObject) {
  //       const updatedsteamType = [...steamType[indexofvalue].name];
  //       const draggingitme = updatedsteamType[draggedIndex];
  //       updatedsteamType.splice(draggedIndex, 1);
  //       updatedsteamType.splice(index, 0, draggingitme);
  //       updatedTypes[indexofvalue].name = updatedsteamType;
  //       setsteamType(updatedTypes);
  //       setDraggedRowIndex({ objectId, index });
  //     }
  //   }
  // };

  // const handleRowDragEnd = () => {
  //   setDraggedRowIndex({ objectId: null, index: null });
  //   setDraggingOverIndex(null);
  // };
  const [rowindex, setrowindex] = useState({
    categoryId: null,
    itemIndex: null,
  });

  const handlemodal = (value) => {
    setmodal(true);
    const filteredItem = menuData.find((item) =>
      item?.itemResponseList?.some((response) => response?.itemId === value)
    );
      if (filteredItem) {
        const specificResponse = filteredItem.itemResponseList.filter(
          (response) => response?.itemId === value
        );
        if (specificResponse.length > 0) {
          setSideBar(specificResponse);
        }
      }
    
  };

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
    const isObjectEmpty = (obj) => {
      return Object.keys(obj).length === 0;
    };
    if (isObjectEmpty(SearchedmenuItem)) {
      setMenudatalist(menuData);
    } else {
      setMenudatalist([SearchedmenuItem]);
    }
  }, [menuData, SearchedmenuItem]);

  useEffect(() => {
    dispatch(getMenuRequest(location?.id));
  }, []);

  useEffect(() => {
    dispatch(selectedMockDataRequest(SideBarData));
  }, [dispatch]);

  useEffect(() => {
    const syncScroll = (sourceTable, targetTable) => {
      targetTable.scrollTop = sourceTable.scrollTop;
    };

    const table1 = tableBodyRef1.current;
    const table2 = tableBodyRef2.current;

    const handleTable1Scroll = () => syncScroll(table1, table2);
    const handleTable2Scroll = () => syncScroll(table2, table1);

    table1?.addEventListener("scroll", handleTable1Scroll);
    table2?.addEventListener("scroll", handleTable2Scroll);

    return () => {
      table1?.removeEventListener("scroll", handleTable1Scroll);
      table2?.removeEventListener("scroll", handleTable2Scroll);
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

  const allFalse = Object.values(listingobject).every(
    (value) => value === false
  );


  useEffect(() => {
    if (menudatalist.length > 0 && menuData.length>0) {
      setLoading(false);
    }
  }, [menudatalist,menuData]);

  useEffect(()=>{
    if(menuData.length===0)
    {
      setLoading(true);
    }
  },[menuData])

  // useEffect(() => {
  //   dispatch(getMenuRequest(location?.id));
  // }, []);

  return (
    <>
      {
        <div style={{ display: "flex", overflowX: "hidden" }}>
          <SidePanel />
          <div className={`${isExpanded ? "mainpagemenu1" : "mainpagemenu"}`}>
            <div className="headercomponent">
              <Header />
            </div>

            <div className="Menu-Listing-Page-main">
              <div>
                <InsertColumnList
                  listingobject={listingobject}
                  setlistingobject={setlistingobject}
                  insertlists={insertlists}
                  showheadinglist={showheadinglist}
                  setshowheadinglist={setshowheadinglist}
                  closeicon={closeicon}
                  dollaricon={dollaricon}
                  toggleround={toggleround}
                  togglebtns={calendericon}
                  Outsideref={Outsideref}
                />
                <table className="Menu-Listing-TableOne">
                  <thead className="Menu-Listing-TableOneHead">
                    <tr className="headerrow">
                      <th className="itemimage ">Image</th>
                      <th className="itemname">Item name</th>
                      <th className="itemcode">Code</th>
                      <th
                        className="addbtn"
                        onClick={() => setshowheadinglist(true)}
                      >
                        +
                      </th>
                    </tr>
                  </thead>

                  {
                    <tbody
                      className="Menu-Listing-TableOneBody Menu-listing-Body"
                      ref={tableBodyRef1}
                    >
                      { loading ? (
                           <></>
                          ) : menudatalist.map((object, index) => (
                        <React.Fragment key={index}>
                          <RowHeading
                            objectId={object.categoryId}
                            object={object}
                            index={index}
                            onDragStart={handledragvegnonvegdragstart}
                            onDragOver={handledragvegnonvegdropover}
                            onDrop={handledragvegnonvegdropend}
                          />

                          <TableOneBody
                            object={object}
                            typevalue={object.type}
                            index={index}
                            FilteredData={FilteredData}
                            objectLength={FilteredData.length}
                            draggingOverIndex={draggingOverIndex}
                            draggedRowIndex={draggedRowIndex}
                            handleRowDragStart={handleDragStart}
                            handleRowDragOver={handleDragOver}
                            handleRowDragEnd={handleDrop}
                            handleDragScroll={handleDragScroll}
                            handlemodal={handlemodal}
                            tableBodyRef1={tableBodyRef1}
                            tableBodyRef2={tableBodyRef2}
                            handlevegrowstart={handledragvegnonvegdragstart}
                            handlevegrowover={handledragvegnonvegdropover}
                            handlevegrowend={handledragvegnonvegdropend}
                          />
                        </React.Fragment>
                      ))}
                    </tbody>
                  }
                </table>
              </div>
              <div className="table-two-alignment">
                <table
                  className={`${
                    isExpanded
                      ? "Menu-Listing-TableTwo1"
                      : "Menu-Listing-TableTwo"
                  }`}
                >
                  <thead className="Menu-Listing-TableTwoHead">
                    <tr className="headingonesection">
                      {firstRowTable.map((header, index) => (
                        <React.Fragment key={index}>
                          <TableFirstHeader
                            key={index}
                            header={header}
                            index={index}
                            // dragtablefirstHeaderindex={
                            //   dragtablefirstHeaderindex
                            // }
                            secondRowLength={secondRowTable[index].length}
                            listingobject={listingobject}
                            setlistingobject={setlistingobject}
                            // handleColumnwiseDragStart={
                            //   handleColumnwiseDragStart
                            // }
                            // handleColumnwiseDragOver={handleColumnwiseDragOver}
                            // handleColumnwiseDragEnd={handleColumnwiseDragEnd}
                            dots={dots}
                            dollar={dollar}
                            calendericon={calendericon}
                            removeicon={removeicon}
                          />
                        </React.Fragment>
                      ))}
                    </tr>
                    {/* <tr className="headingtwosection">
                  {secondRowTable.map((subheaders, index) => (
                    <React.Fragment key={index}>
                      <TableSecondHeader
                        key={index}
                        subheaders={subheaders}
                        index={index}
                        className={classNames[index]}
                        listingobject={listingobject}
                        classNames={classNames}
                      />
                    </React.Fragment>
                  ))}
                </tr> */}
                  </thead>

                  {
                    <tbody
                      className={`${
                        isExpanded
                          ? "Menu-Listing-TableTwoBody1"
                          : "Menu-Listing-TableTwoBody"
                      } tabletwobody`}
                      ref={tableBodyRef2}
                    >
                      { (
                        <>
                          {loading ? (
                            <div className="Menu-noOptions">
                              <Loader 
                                className="imgLoader2" 
                                height="100px"
                                width="100px" 
                                style={{ filter: 'invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)' }}
                              />
                            </div>
                          ) : (
                            allFalse ? (
                              <>
                                <h1 className="columnselected">No Column Selected</h1>
                              </>
                            ) : 
                            menudatalist.map((itemobject, indexvalue) => {
                              return (
                                <React.Fragment key={indexvalue}>
                                  <tr>
                                    {indexvalue === 1 && (
                                      <tr className="itemheading2row"></tr>
                                    )}
                                  </tr>
                                  {/* //  */}
                                  <TableTwoBody
                                    itemobject={itemobject}
                                    indexvalue={indexvalue}
                                    classNamesinner={classNamesinner}
                                    listingobject={listingobject}
                                    showsidebar={showsidebar}
                                    SideBarData={SideBarData}
                                    setSideBar={setSideBar}
                                    handlemodal={handlemodal}
                                    listingheaders={allFalse}
                                  />
                                </React.Fragment>
                              );
                            })
                          )}
                        </>
                      )}
                    </tbody>
                  }
                </table>
              </div>
              {deleteMenuItemSuccess ? !modal : modal && (
                <Slider
                  sidebartext={sidebartext}
                  SideBarData={SideBarData}
                  onclose={() => setmodal(false)}
                />
              )}
            </div>
          </div>
        </div>
      }
    </>
  );
};

