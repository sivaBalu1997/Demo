import React, { useEffect, useState, useRef, useContext } from "react";
import "./Menulisting.scss";
import dots from "../../../assets/svg/dots.svg";
import dollar from "../../../assets/svg/dollar.svg";
import removeicon from "../../../assets/svg/removeicon.svg";
import Header from "../../../components/productCatalog/Header/Header";
import closeicon from "../../../assets/svg/closeicon.svg";
import Loader from "../../../assets/Loader.gif.gif";
import toggleround from "../../../assets/svg/toggleround.svg";
import calendericon from "../../../assets/svg/calendericon.svg";
import dollaricon from "../../../assets/svg/dollaricon.svg";
// import togglebtns from "../../../assets/svg/togglebtn.svg";
import Slider from "../../../components/productCatalog/Slider/Slider";
import { Contextpagejs } from "../../../pages/productCatalog/contextpage";
import { itemsdata, itemsfooddata } from "../../../assets/mockData/Moca_data";
import InsertColumnList from "../../../components/productCatalog/InsertColumnList/InsertColumnList";
import TableFirstHeader from "../../../components/productCatalog/TableFirstHeader/TableFirstHeader";
import TableSecondHeader from "../../../components/productCatalog/TableSecondHeader/TableSecondHeader";
import TableTwoBody from "../../../components/productCatalog/TableTwoBody/TableTwoBody";
import TableOneBody from "../../../components/productCatalog/TableOneBody/TableOneBody";
import RowHeading from "../../../components/productCatalog/RowHeading/RowHeading";
import SidePanel from "pages/SidePanel";
import { useSelector, useDispatch } from "react-redux";
import {
  getMenuRequest,
  selectedMockDataRequest,
  storeMockDataRequest,
} from "redux/productCatalog/productCatalogActions";
import { combinedItemsData } from "assets/mockData/Moca_data";

export const Menulisting = () => {
  const dispatch = useDispatch();

  const location = useSelector((state) => state.auth.selectedBranch);

  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const SearchedmenuItem = useSelector(
    (state) => state.searchItem?.SearcheItem
  );
  // console.log("SearchedmenuItem",SearchedmenuItem);

  const { isExpanded } = useContext(Contextpagejs);
  const [draggedIndexsample, setDraggedIndexsample] = useState(null);
  const [menudatalist, setMenudatalist] = useState(menuData);

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
    // dispatch(storeMockDataRequest(combinedItemsData));
    dispatch(getMenuRequest(location?.id));
  }, []);

  // console.log({menuData})

  useEffect(() => {
    dispatch(selectedMockDataRequest(SideBarData));
  }, [dispatch]);

  const addedData = useSelector((state) => state.addMockDataReducer.data);

  const Mockdata = useSelector((state) => state.storeMockDataReducer.data);

  const FilteredData = useSelector(
    (state) => state.storeMockDataFilteredReducer.data
  );

  const hiddenData = useSelector(
    (state) => state.addMockDataHiddenReducer?.data || []
  );

  const [FilteredObject, setFilteredObject] = useState([]);

  useEffect(() => {
    setFilteredObject(FilteredData);
  }, [FilteredData]);

  const [draggedRowIndex, setDraggedRowIndex] = useState({
    objectId: null,
    index: null,
  });

  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [dragtablefirstHeaderindex, setdragtablefirstHeaderindex] =
    useState(null);
  const [modal, setmodal] = useState(false);
  const [showheadinglist, setshowheadinglist] = useState(false);
  const [sidebartext, setSideBarText] = useState(null);
  const tableBodyRef1 = useRef(null);
  const tableBodyRef2 = useRef(null);
  const Outsideref = useRef(null);
  const [SteamedVeg, setSteamedVeg] = useState([]);
  const [SteamedNonVeg, setSteamedNonVeg] = useState([]);

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

  const [SideBarData, setSideBar] = useState([]);
  const mergedMockData = [...Mockdata, ...addedData];

  useEffect(() => {
    const tempArray1 = [];
    const tempArray2 = [];

    if (FilteredData.length === 0) {
      mergedMockData.forEach((item) => {
        if (item.type === "steamedVeg") {
          tempArray1.push(item);
        } else {
          tempArray2.push(item);
        }
      });
    } else {
      FilteredData.forEach((item) => {
        if (item.type === "steamedVeg") {
          tempArray1.push(item);
        } else {
          tempArray2.push(item);
        }
      });
    }
    setSteamedVeg(tempArray1);
    setSteamedNonVeg(tempArray2);
  }, [Mockdata, FilteredData]);

  useEffect(() => {
    setsteamType([
      { id: 1, name: SteamedVeg, type: "SteamedVeg" },
      { id: 2, name: SteamedNonVeg, type: "SteameNondVeg" },
    ]);
  }, [SteamedVeg, SteamedNonVeg]);

  const [draggedItem, setDraggedItem] = useState(null);

  // Handle the drag start
  const handleDragStart = (categoryId, item) => {
    setDraggedItem({ categoryId, item });
  };

  // Allow dropping
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle the drop
  const handleDrop = (categoryId, dropIndex) => {
    if (!draggedItem || draggedItem.categoryId !== categoryId) return;

    const updatedCategories = menudatalist.map((category) => {
      if (category.categoryId === categoryId) {
        const updatedItems = [...category.itemResponseList];
        const draggedIndex = updatedItems.findIndex(
          (item) => item.itemId === draggedItem.item.itemId
        );
        updatedItems.splice(draggedIndex, 1); // Remove dragged item
        updatedItems.splice(dropIndex, 0, draggedItem.item); // Insert dragged item at new position
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
    // const updatedRows = [...steamType];
    // const draggedRow = updatedRows[draggedRowIndex];
    // updatedRows.splice(draggedRowIndex, 1);
    // updatedRows.splice(index, 0, draggedRow);
    // setsteamType(updatedRows);
    // setDraggedRowIndex(null);
    const updatedCategories = [...menudatalist];

    // Get the dragged category
    const draggedCategory = updatedCategories[draggedRowIndex];

    // Remove the dragged category from its original position
    updatedCategories.splice(draggedRowIndex, 1);

    // Insert the dragged category into its new position
    updatedCategories.splice(index, 0, draggedCategory);

    // Update the state with the new category order
    setMenudatalist(updatedCategories);

    // Reset draggedCategoryIndex
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

  const handleRowDragStart = (categoryId, itemIndex) => {
    setrowindex({ categoryId, itemIndex });
  };

  const handleRowDragOver = (categoryId, targetItemIndex) => {
    if (rowindex.categoryId === null || rowindex.itemIndex === null) {
      return;
    }

    const { categoryId: draggedCategoryId, itemIndex: draggedItemIndex } =
      rowindex;

    const updatedCategories = [...menudatalist];

    const draggedCategoryIndex = updatedCategories.findIndex(
      (category) => category.categoryId === draggedCategoryId
    );
    const draggedCategory = updatedCategories[draggedCategoryIndex];

    if (draggedCategory && draggedCategory.itemResponseList) {
      const updatedItemList = [...draggedCategory.itemResponseList];

      const draggedItem = updatedItemList[draggedItemIndex];

      updatedItemList.splice(draggedItemIndex, 1);

      updatedItemList.splice(targetItemIndex, 0, draggedItem);

      const updatedCategory = {
        ...draggedCategory,
        itemResponseList: updatedItemList,
      };
      updatedCategories[draggedCategoryIndex] = updatedCategory;

      setMenudatalist(updatedCategories);

      setDraggedRowIndex({ categoryId, itemIndex: targetItemIndex });
    }
  };

  const handleRowDragEnd = (categoryId, targetItemIndex) => {
    if (rowindex.categoryId === null || rowindex.itemIndex === null) {
      return;
    }

    const { categoryId: draggedCategoryId, itemIndex: draggedItemIndex } =
      rowindex;

    const updatedCategories = [...menudatalist];
    const draggedCategoryIndex = updatedCategories.findIndex(
      (category) => category.categoryId === draggedCategoryId
    );
    const draggedCategory = updatedCategories[draggedCategoryIndex];

    if (draggedCategory && draggedCategory.itemResponseList) {
      const updatedItemList = [...draggedCategory.itemResponseList];
      const draggedItem = updatedItemList[draggedItemIndex];
      updatedItemList.splice(draggedItemIndex, 1);
      updatedItemList.splice(targetItemIndex, 0, draggedItem);
      const updatedCategory = {
        ...draggedCategory,
        itemResponseList: updatedItemList,
      };
      updatedCategories[draggedCategoryIndex] = updatedCategory;

      setMenudatalist(updatedCategories);

      setDraggedRowIndex({ categoryId, itemIndex: targetItemIndex });
    }
    setrowindex({ categoryId: null, itemIndex: null });
  };

  const handlemodal = (value) => {
    setmodal(true);
    const filteredItem = menuData.find((item) =>
      item?.itemResponseList?.some((response) => response?.itemId === value)
    );

    if (filteredItem) {
      const specificResponse = filteredItem.itemResponseList.filter(
        (response) => response?.itemId === value
      );

      if (filteredItem) {
        const specificResponse = filteredItem.itemResponseList.filter(
          (response) => response?.itemId === value
        );
        if (specificResponse.length > 0) {
          setSideBar(specificResponse);
        }
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

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (menudatalist.length > 0) {
      setLoading(false);
    }
  }, [menudatalist]);

  useEffect(() => {
    dispatch(getMenuRequest(location?.id));
  }, []);

  // if(loading)
  // {
  //   return(
  //     <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
  //    Loading
  //   </div>
  //   );
  // }

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
                            <div className="Menu-noOptions">
                              {/* <img
                                className="imgLoader2"
                                src={Loader}
                                alt="Loading..."
                              /> */}
                            </div>
                          ) :menudatalist.map((object, index) => (
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
                            dragtablefirstHeaderindex={
                              dragtablefirstHeaderindex
                            }
                            secondRowLength={secondRowTable[index].length}
                            listingobject={listingobject}
                            setlistingobject={setlistingobject}
                            handleColumnwiseDragStart={
                              handleColumnwiseDragStart
                            }
                            handleColumnwiseDragOver={handleColumnwiseDragOver}
                            handleColumnwiseDragEnd={handleColumnwiseDragEnd}
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
                      {allFalse ? (
                        <>
                          <h1 className="columnselected">No Column Selected</h1>
                        </>
                      ) : (
                        <>
                          {loading ? (
                            <div className="Menu-noOptions">
                              <img
                                className="imgLoader2"
                                src={Loader}
                                alt="Loading..."
                              />
                            </div>
                          ) : (
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
              {modal && (
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

// [
//   {
//     "categoryId": "119cd4b7-f44a-45d6-8c21-c8d4559d52ab",
//     "categoryName": "",
//     "subCategoryResponseList": null,
//     "itemResponseList": [
//         {
//             "itemId": "9be15fd4-43fe-497a-b857-42d89bffb8be",
//             "itemName": "Rasam",
//             "mediaResponseList": [],
//             "orderTypes": [
//                 {
//                     "typeName": "DineIn",
//                     "typeId": "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
//                     "price": 17.0,
//                     "isEnabled": 1,
//                     "availabilities": [
//                         {
//                             "availabilityDays": [
//                                 "0",
//                                 "0"
//                             ],
//                             "sessions": [
//                                 "One",
//                                 "Two"
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "typeName": "Pickup",
//                     "typeId": "b1eddc4e-710e-437c-871c-609b84af43cd",
//                     "price": 17.0,
//                     "isEnabled": 1,
//                     "availabilities": [
//                         {
//                             "availabilityDays": [
//                                 "0",
//                                 "0"
//                             ],
//                             "sessions": [
//                                 "One",
//                                 "Two"
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "typeName": "Delivery",
//                     "typeId": "df8eb2dc-6789-4b2a-bdc9-46df7c19add9",
//                     "price": 17.0,
//                     "isEnabled": 1,
//                     "availabilities": [
//                         {
//                             "availabilityDays": [
//                                 "0",
//                                 "0"
//                             ],
//                             "sessions": [
//                                 "One",
//                                 "Two"
//                             ]
//                         }
//                     ]
//                 }
//             ],
//             "modifiers": [
//                 {
//                     "id": "7929429d-b45e-40f0-ba86-2f96457cf3f9",
//                     "modifierName": "Vegan",
//                     "isEnabled": 1,
//                     "minCount": 0,
//                     "maxCount": 0,
//                     "noFreeCustomization": 0,
//                     "options": [
//                         {
//                             "optionId": "71485264-ecee-41f1-a36f-9e0cd8d21229",
//                             "name": "Vegan",
//                             "price": 0.0,
//                             "isEnabled": 1
//                         },
//                         {
//                             "optionId": "71485264-ecee-41f1-a36f-9e0cd8d21230",
//                             "name": "Vegan One",
//                             "price": 10.0,
//                             "isEnabled": 1
//                         }
//                     ]
//                 }
//             ],
//             "dietTypes": [],
//             "ingredients": [
//                 {
//                     "id": "066d8eaf-c70a-42b5-a9b3-956b43cf6e3e",
//                     "name": "Gluten Free"
//                 }
//             ],
//             "taxClassAssociation": [],
//             "cuisine": [],
//             "pairedItems": [],
//             "description": "Spicy Tamarind based delicacy with south Indian spices",
//             "containsAlcohol": false,
//             "ignoreMasterKotPrint": true,
//             "popularItem": false
//         }
//     ]
// },
// {
//     "categoryId": "12110e90-6897-448a-9afb-da855dc42191",
//     "categoryName": "Sandwich",
//     "subCategoryResponseList": null,
//     "itemResponseList": [
//         {
//             "itemId": "011ae68f-b878-4b79-98b2-6eedfba59b10",
//             "itemName": "Roasted Turkey on Sourdough",
//             "mediaResponseList": [],
//             "orderTypes": [
//                 {
//                     "typeName": "GloriaFood",
//                     "typeId": "b1eddc4e-710e-437c-871c-609b84af43c1",
//                     "price": 25.0,
//                     "isEnabled": 0,
//                     "availabilities": null
//                 }
//             ],
//             "modifiers": [
//                 {
//                     "id": "3ce5e745-2b9d-4ffa-ada1-363bbe3b9848",
//                     "modifierName": "Size",
//                     "isEnabled": 1,
//                     "minCount": 0,
//                     "maxCount": 0,
//                     "noFreeCustomization": 0,
//                     "options": [
//                         {
//                             "optionId": "0f51dc6a-faea-4e2f-a074-42dacac53d6d",
//                             "name": "Regular",
//                             "price": 13.0,
//                             "isEnabled": 1
//                         }
//                     ]
//                 }
//             ],
//             "dietTypes": [],
//             "ingredients": [],
//             "taxClassAssociation": [],
//             "cuisine": [],
//             "pairedItems": [],
//             "description": "",
//             "containsAlcohol": false,
//             "ignoreMasterKotPrint": false,
//             "popularItem": false
//         }
//     ]
// },
// {
//     "categoryId": "12b453c3-1d34-4472-83b4-0479933db3d5",
//     "categoryName": "",
//     "subCategoryResponseList": null,
//     "itemResponseList": [
//         {
//             "itemId": "8a50b689-5c0e-469c-91f3-5b24a40fdd0b",
//             "itemName": "Sambar Vadai",
//             "mediaResponseList": [],
//             "orderTypes": [
//                 {
//                     "typeName": "DineIn",
//                     "typeId": "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
//                     "price": 9.49,
//                     "isEnabled": 1,
//                     "availabilities": null
//                 },
//                 {
//                     "typeName": "Pickup",
//                     "typeId": "b1eddc4e-710e-437c-871c-609b84af43cd",
//                     "price": 9.49,
//                     "isEnabled": 1,
//                     "availabilities": null
//                 },
//                 {
//                     "typeName": "Delivery",
//                     "typeId": "df8eb2dc-6789-4b2a-bdc9-46df7c19add9",
//                     "price": 9.49,
//                     "isEnabled": 1,
//                     "availabilities": null
//                 }
//             ],
//             "modifiers": [
//                 {
//                     "id": "27cef7a0-6696-43e5-840e-aa66ea5a7ec2",
//                     "modifierName": "Jain",
//                     "isEnabled": 1,
//                     "minCount": 0,
//                     "maxCount": 0,
//                     "noFreeCustomization": 0,
//                     "options": [
//                         {
//                             "optionId": "051555f9-1312-4761-b1ca-9019fd5a73b3",
//                             "name": "Regular",
//                             "price": 0.0,
//                             "isEnabled": 1
//                         },
//                         {
//                             "optionId": "d4ecf3c4-0400-4cf9-9e39-5828568ab530",
//                             "name": "Jain",
//                             "price": 0.0,
//                             "isEnabled": 1
//                         }
//                     ]
//                 }
//             ],
//             "dietTypes": [],
//             "ingredients": [
//                 {
//                     "id": "066d8eaf-c70a-42b5-a9b3-956b43cf6e3e",
//                     "name": "Gluten Free"
//                 }
//             ],
//             "taxClassAssociation": [],
//             "cuisine": [],
//             "pairedItems": [],
//             "description": "South Indian lentil doughnut soaked in sambar and garnished with chopped onions & cilantro",
//             "containsAlcohol": false,
//             "ignoreMasterKotPrint": false,
//             "popularItem": false
//         }
//     ]
// },

// ]
