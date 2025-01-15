import React, { useEffect, useState, useRef, useContext } from "react";
import Toggle from "components/productCatalog/Toggle/Toggle";
import HoverText from "../../../components/productCatalog/HoverText/HoverText";
import placeholderimg from "../../../assets/svg/placeholderimg.svg";
import "./MenulistingPage.scss";
import dots from "../../../assets/svg/dots.svg";
import dollar from "../../../assets/svg/dollar.svg";
import removeicon from "../../../assets/svg/removeicon.svg";
import Header from "../../../components/productCatalog/Header/Header";
import closeicon from "../../../assets/svg/closeicon.svg";
// import Loader from "../../../assets/Loader.gif.gif";
import toggleround from "../../../assets/svg/toggleround.svg";
import calendericon from "../../../assets/svg/availableTickFigMenu.svg";
import dollaricon from "../../../assets/svg/dollarFigMenu.svg";
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
import noResultsfound from "../../../assets/images/NoResultsFound.png";

import {
  PricingDetailRequest,
  fetchDropDownRequest,
  getMenuRequest,
  itemCustomizationPost,
  primarypost,
  removeDataRequest,
  selectedCategory,
  selectedMockDataRequest,
  storeMockDataRequest,
} from "redux/productCatalog/productCatalogActions";
import { listenerCount } from "process";
import { th } from "date-fns/locale";

export const MenulistingPage = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.auth.selectedBranch);
  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const loadingRequest = useSelector(
    (state) => state.productCatalog?.addMenuLoading
  );
  const SearchedmenuItem = useSelector(
    (state) => state.searchItem?.SearcheItem
  );

  const [itemList, setItemList] = useState([]);
  // console.log("SearchedmenuItem", SearchedmenuItem);

  console.log({itemList})

  const { isExpanded } = useContext(Contextpagejs);
  const [draggedIndexsample, setDraggedIndexsample] = useState(null);
  const [menudatalist, setMenudatalist] = useState(menuData);

  useEffect(() => {
    setMenudatalist(menuData);
  }, [menuData]);

  const FilteredData = useSelector(
    (state) => state.storeMockDataFilteredReducer.data
  );
  const [modal, setmodal] = useState(false);
  const [showheadinglist, setshowheadinglist] = useState(false);
  const [sidebartext, setSideBarText] = useState(null);
  const tableBodyRef1 = useRef(null);
  const tableBodyRef2 = useRef(null);
  const Outsideref = useRef(null);
  const [draggingOverIndex, setDraggingOverIndex] = useState(null);
  const [dragtablefirstHeaderindex, setdragtablefirstHeaderindex] =
    useState(null);
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
  const getUniqueOrderTypeNames = (data) => {
    return data.reduce((acc, category) => {
      category?.itemResponseList?.forEach((item) => {
        item.orderTypes?.forEach((orderType) => {
          if (orderType.typeGroup !== "I") {
            acc[orderType.typeName] = true;
          }
        });
      });
      return acc;
    }, {});
  };



  const initializeListingObject = (uniqueNames) => {
    const pricingKeys = Object.keys(uniqueNames).reduce((acc, typeName) => {
      acc[`${typeName}1`] = true;
      return acc;
    }, {});

    const availabilityKeys = Object.keys(uniqueNames).reduce(
      (acc, typeName) => {
        acc[`${typeName}2`] = true;
        return acc;
      },
      {}
    );

    return {
      showPricing: true,
      showAvail: true,
      Customize1: true,
      ...pricingKeys,
      ...availabilityKeys,
    };
  };

  const [listingobject, setlistingobject] = useState();
  const [uniqueOrderTypeNames, setuniqueOrderTypeNames] = useState();

  useEffect(() => {
    setuniqueOrderTypeNames(getUniqueOrderTypeNames(itemList));

    setlistingobject(
      initializeListingObject(getUniqueOrderTypeNames(itemList))
    );
  }, [itemList, menuData]);

  const getUniqueOrderTypes = (menuData) => {
    const orderTypeNames = menuData.flatMap((category) =>
      category.itemResponseList?.flatMap((item) =>
        item.orderTypes.map((orderType) => ({ typeName: orderType?.typeName }))
      )
    );
    // console.log("orderTypeNames",orderTypeNames);

    const uniqueOrderTypeNames = Array.from(
      new Map(
        orderTypeNames.map((orderType) => [orderType?.typeName, orderType])
      ).values()
    );

    return uniqueOrderTypeNames;
  };

  const uniqueOrderTypes = getUniqueOrderTypes(itemList);
  const orderTypess = useSelector(
    (state) => state.auth?.restaurantDetails?.branch[0]?.orderTypes
  );

  const nameOfOrderTypes = orderTypess
    ?.filter((item) => item.isEnabled)
    .map((item) => item.typeName);

  const modifiedTypes = [
    ...uniqueOrderTypes
      .filter((type) => type?.typeName)
      .map((type) => `${type.typeName}1`),
    ...uniqueOrderTypes
      .filter((type) => type?.typeName)
      .map((type) => `${type.typeName}2`),
  ];

  //  console.log("uniqueOrderTypes",modifiedTypes);

  // console.log({modifiedTypes})

  const tablefirstrow = modifiedTypes.map((item) => {
    return {
      label: item,
    };
  });

  const insertlists = {
    Pricing: {
      show: "Pricing",
      DineIn: "Dine-in",
      Pickup: "Pickup",
      Delivery: "Delivery",
    },
    Available: {
      show: "Available",
      DineIn: "Dine-in",
      Pickup: "Pickup",
      Delivery: "Delivery",
    },
    // Inventory: "Inventory",
    Customization: "Customization",
  };

  const [firstRowTable, setFirstRowTable] = useState([
    ...tablefirstrow,
    { label: "Customize1" },
  ]);

  useEffect(() => {
    setFirstRowTable([...tablefirstrow, { label: "Customize1" }]);
  }, [menuData, itemList]);

  const insertlists2 = {
    Pricing: {
      show: listingobject?.showPricing ? "Pricing" : "",
      ...(listingobject &&
        Object.keys(listingobject && listingobject)
          .filter((key) => key.endsWith("1") && key !== "Customize1")
          .reduce((acc, key) => {
            acc[key.replace("1", "")] = key.replace("1", "");
            return acc;
          }, {})),
    },
    Available: {
      show: listingobject?.showAvail ? "Available" : "",
      ...(listingobject &&
        Object.keys(listingobject)
          .filter((key) => key.endsWith("2") && key !== "Customize1")
          .reduce((acc, key) => {
            acc[key.replace("2", "")] = key.replace("2", "");
            return acc;
          }, {})),
    },

    Customization: "Customization",
  };

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
  const handleDragOver = (e, index) => {
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

  const editData = useSelector((state) => state.productCatalog.editData || []);

  useEffect(() => {
    dispatch(removeDataRequest());
  }, []);

  const selectedBranch = useSelector(
    (state) => state.auth.selectedBranch || null
  );

  const locationid = useSelector((state) => state.auth.selectedBranch?.id);

  const deleteMenuItemSuccess = useSelector(
    (state) => state.productCatalog.deleteMenuItemSuccess
  );

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

  const [categoryData, setCategoryData] = useState({});

  const handlemodal = (value) => {
  
    const filteredItem = menuData.find((item) =>
      item?.itemResponseList?.some((response) => response?.itemId === value)
    );

    const allItemResponseLists = menuData
      ?.flatMap((category) =>
        category?.subCategoryResponseList?.map((subCategory) => ({
          categoryId: category.categoryId,
          categoryName: category?.categoryName,
          subCategoryId: subCategory?.subCategoryId,
          subCategoryName: subCategory?.subCategoryName,
          itemResponseList: subCategory?.itemResponseList,
        }))
      )
      .filter((item) =>
        item?.itemResponseList?.map((data) => data.itemId === value)
      );
    const filtesubItems = allItemResponseLists.find((item) =>
      item?.itemResponseList?.some((response) => response?.itemId === value)
    );

    //   function findIdInSubCategories(data, idToFind) {
    //     for (const category of data || []) { // Ensure `data` is iterable
    //         for (const subCategory of category?.subCategoryResponseList || []) { // Check if `subCategoryResponseList` exists
    //             for (const item of subCategory?.itemResponseList || []) { // Check if `itemResponseList` exists
    //                 if (item.itemId === idToFind) {
    //                     return {
    //                         categoryName: category.categoryName,
    //                         subCategoryName: subCategory.subCategoryName,
    //                         item: item
    //                     };
    //                 }
    //             }
    //         }
    //     }
    //     return null; // Return null if the ID is not found
    // }

    if (filteredItem) {
      setCategoryData({
        name: filteredItem?.categoryName,
        id: filteredItem?.categoryId,
      });

      const specificResponse = filteredItem.itemResponseList.filter(
        (response) => response?.itemId === value
      );

      if (specificResponse.length > 0) {
        setSideBar(specificResponse);
        dispatch(selectedCategory(categoryData));
        dispatch(selectedMockDataRequest(specificResponse));
        setmodal(true);
      }
    } else {
      setCategoryData({
        name: filtesubItems?.categoryName,
        id: filtesubItems?.categoryId,
      });

      const specificResponse = filtesubItems?.itemResponseList
        ?.filter((response) => response?.itemId === value)
        ?.map((response) => ({
          ...response,
          subCategoryName: filtesubItems?.subCategoryName,
          subCategoryId: filtesubItems?.subCategoryId,
        }));

      if (specificResponse?.length > 0) {
        setSideBar(specificResponse);
        dispatch(selectedCategory(categoryData));
        dispatch(selectedMockDataRequest(specificResponse));
        setmodal(true);
      }
    }
  };

  const showsidebar = (key) => {
    if (key === "DineIn1" || key === "Pickup1" || key === "Delivery1") {
      handlemodal();
      setSideBarText("Pricing");
    } else if (key === "DineIn2" || key === "Pickup2" || key === "Delivery2") {
      handlemodal();
      setSideBarText("Availability");
    } else if (key === "Customize1") {
      handlemodal();

      setSideBarText("Customize");
    }
  };

  useEffect(() => {
    const isObjectEmpty = (obj) => {
      return Object?.keys(obj)?.length === 0;
    };

    if (isObjectEmpty(SearchedmenuItem)) {
      const allItemResponseLists = menuData
        ?.flatMap((category) =>
          category?.subCategoryResponseList?.map((subCategory) => ({
            categoryId: category.categoryId,
            categoryName: category?.categoryName,
            subCategoryId: subCategory?.subCategoryId,
            subCategoryName: subCategory?.subCategoryName,
            itemResponseList: subCategory?.itemResponseList,
          }))
        )
        .filter(
          (item) =>
            item?.itemResponseList !== null &&
            item?.itemResponseList?.length > 0
        );

      const allItemResponseLists2 = menuData.flatMap((category) => category);

      const mergedarray = [...allItemResponseLists, ...allItemResponseLists2];

      const transformedList = mergedarray.map((entry) => ({
        id: entry.categoryId,
        name: entry.categoryName,
        itemResponseList: entry.itemResponseList || [],
      }));

      setItemList(transformedList);
      setLoading(false);
    } else {
      if (SearchedmenuItem.subCategoryResponseList) {
        const filterdItem = {
          categoryName: SearchedmenuItem?.categoryName,
          categoryId: SearchedmenuItem?.categoryId,
          subCategoryResponseList: SearchedmenuItem.subCategoryResponseList,
          itemResponseList: null,
        };

        setItemList([filterdItem]);
        setMenudatalist([filterdItem]);
      } else {
        const filterdItem = {
          categoryName: SearchedmenuItem?.categoryName,
          categoryId: SearchedmenuItem?.categoryId,
          itemResponseList: SearchedmenuItem?.itemResponseList,
        };

        setItemList([filterdItem]);
        setMenudatalist([filterdItem]);
      }
      setLoading(false);
    }
  }, [menuData, SearchedmenuItem]);

  useEffect(() => {
    if (selectedBranch?.id) {
      dispatch(getMenuRequest(selectedBranch?.id));
    }
  }, [selectedBranch?.id]);

  useEffect(() => {
    dispatch(getMenuRequest(locationid));
  }, []);

  useEffect(() => {
    if (deleteMenuItemSuccess) {
      dispatch(getMenuRequest(selectedBranch?.id));
    }
  }, [deleteMenuItemSuccess]);

  useEffect(() => {
    dispatch(selectedMockDataRequest(SideBarData));
  }, []);

  const primarypage = useSelector((state) => state.primarypage);
  const prizingDetail = useSelector(
    (state) => state?.PricingDetailReducer?.prizingData
  );

  const itemCustomizationData = useSelector(
    (state) => state?.itemCustomizationsReducer1?.itemData || []
  );

  useEffect(() => {
    if (Array.isArray(editData) && editData.length > 0) {
      const primaryPageData = {
        itemName: editData[0]?.itemName ?? "",
        description: editData[0]?.description ?? "",
        imageUrls: editData[0]?.mediaResponseList ?? [],
        alcohol: editData[0]?.containsAlcohol ?? false,
        itemCode: editData[0]?.itemCode ?? "",
        barCode: editData[0]?.barCode ?? "",
        Ingredients:
          editData[0]?.ingredients?.map((ingredient) => ingredient?.id ?? "") ??
          [],
        allergens:
          editData[0]?.allergens?.map((allergen) => allergen?.id ?? "") ?? [],
        coloriePoint: editData[0]?.calorieInfo ?? {},
        portionSize: editData[0]?.portionInfo ?? "",
        tax: editData[0]?.taxClassAssociation ?? [],
        DietaryType: editData[0]?.dietTypes ?? [],
        cuisine: editData[0]?.cuisine?.[0]?.name ?? "",
        bestPair: editData[0]?.pairedItems ?? "",
        category: categoryData?.name ?? "",
        categoryId: categoryData?.id,
        subCategory: editData[0]?.subCategoryName ?? "",
        subCategoryId: editData[0]?.subCategoryId ?? "",
        popularItem: editData[0]?.popularItem ?? false,
      };

      const pricingPageData = {
        kitchenstation: editData[0]?.kitchenStation?.name ?? "",
        ignoreMasterKotPrint: editData[0]?.ignoreMasterKotPrint ?? false,
        normalForm: {
          deliveryDetails: null,
          dineInDetails: null,
          pickupDetails: null,
          thirdpartyDetails: [],
        },
        Preparationtime: {
          hours: editData[0]?.preparationTimeInHours || "",
          minutes: editData[0]?.preparationTimeInMinutes || "",
        },
      };

      editData[0]?.orderTypes?.forEach((orderType) => {
        const { typeGroup } = orderType;

        switch (typeGroup) {
          case "S":
            pricingPageData.normalForm.deliveryDetails = orderType;
            break;
          case "D":
            pricingPageData.normalForm.dineInDetails = orderType;
            break;
          case "P":
            pricingPageData.normalForm.pickupDetails = orderType;
            break;
          case "T":
            pricingPageData.normalForm.thirdpartyDetails.push(orderType);
            break;
          default:
            break;
        }
      });

      const modifierData = editData[0]?.modifiers?.map((item) => ({
        id: item?.id ?? "",
        isEnabled: item?.isEnabled,
        modifierName: item?.modifierName ?? "",
        maxCount: item?.maxCount ?? 0,
        minCount: item?.minCount ?? 0,
        noFreeCustomization: item?.noFreeCustomization ?? false,
        selectedValue: item?.orderTypeIds ?? [],
        options:
          item?.options?.map((option) => ({
            optionId: option?.optionId ?? "",
            isEnabled: option?.isEnabled,
            name: option?.name ?? "",
            price: option?.price ?? 0,
            isEnabled: option?.isEnabled ?? false,
          })) || [],
      }));

      dispatch(primarypost(primaryPageData));
      dispatch(PricingDetailRequest(pricingPageData));
      dispatch(itemCustomizationPost(modifierData));
    }
  }, [editData]);

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

  const [showColumns, setShowColumns] = useState(false);




  useEffect(() => {
    const allFalse =
      listingobject &&
      Object.entries(listingobject)
        .filter(([key]) => key !== 'showAvail' && key !== 'showPricing')
        .every(([, value]) => value === false);

    setShowColumns(allFalse);
  }, [listingobject]);

  useEffect(() => {
    if (menudatalist.length > 0 && menuData.length > 0) {
      setLoading(false);
    }
  }, [menudatalist, menuData]);

  const menuDataLoading = useSelector(
    (state) => state.productCatalog?.menuDataLoading
  );
  const menuDataFailed = useSelector(
    (state) => state.productCatalog?.menuDataFailed
  );

  // useEffect(()=>{
  //   if(menuData.length === 0)
  //   {
  //     setLoading(true);
  //   }
  // },[menuData])

  const handlesidbarhandling = (key, value) => {
    showsidebar(key);

    handlemodal(value);
  };
  const filteredListing =
    listingobject &&
    Object.fromEntries(
      Object.entries(listingobject).filter(
        ([key, value]) =>
          value === true && key !== "showavail" && key !== "showPricing"
      )
    );
  // const allFalse = Object.values(listingobject).every(value => value === false);
  // const [selectedFileds, setselectefields] = useState({});

  // const style = isExpanded ? { width: `100%` } : selectedFileds && { width: `${Object?.keys(selectedFileds)?.length * 2}%` };

  // useEffect(() => {
  //   const filteredList =
  //     listingobject &&
  //     Object.fromEntries(
  //       Object.entries(filteredListing).filter(([key, value]) => value === true)
  //     );

  //   setselectefields(filteredList);
  // }, [listingobject]);

  const orderTypesToShow = ["DineIn", "Pickup", "Delivery"];
  const restaurantDetails = useSelector(
    (state) => state.auth.restaurantDetails
  );
  const getUniqueOrderTypeNamesfortableprice = (menuData) => {
    const orderTypeNames = menuData.flatMap((category) =>
      category.itemResponseList?.flatMap((item) =>
        item.orderTypes.map((orderType) => ({
          typeName: orderType?.typeName,
        }))
      )
    );

    const uniqueOrderTypeNames = Array.from(
      new Map(
        orderTypeNames.map((orderType) => [orderType?.typeName, orderType])
      ).values()
    );

    return uniqueOrderTypeNames;
  };

  const uniqueOrderTypeNamesforprice =
    getUniqueOrderTypeNamesfortableprice(itemList);

  const orderTypesToShow2 = uniqueOrderTypeNamesforprice
    .filter((item) => item?.typeName)
    .map((item) => item.typeName);

  useEffect(() => {
    if (deleteMenuItemSuccess && modal) {
      setmodal(false);
    }
  }, [deleteMenuItemSuccess]);

  useEffect(() => {
    const allItemResponseLists = menuData
      ?.flatMap((category) =>
        category?.subCategoryResponseList?.map((subCategory) => ({
          categoryId: category.categoryId,
          categoryName: category?.categoryName,
          subCategoryId: subCategory?.subCategoryId,
          subCategoryName: subCategory?.subCategoryName,
          itemResponseList: subCategory?.itemResponseList,
        }))
      )
      .filter(
        (item) =>
          item?.itemResponseList !== null && item?.itemResponseList?.length > 0
      );

    const allItemResponseLists2 = menuData.flatMap((category) => category);

    const mergedarray = [...allItemResponseLists, ...allItemResponseLists2];
    // console.log({ mergedarray });

    const transformedList = mergedarray.map((entry) => ({
      id: entry.categoryId,
      name: entry.categoryName,
      itemResponseList: entry.itemResponseList || [],
    }));

    setItemList(transformedList);
    setLoading(false);
  }, [menuData]);

  const baseImageUrl = "https://storage.googleapis.com/mhd-media/img/";

  // const baseImageUrl = "https://storage.googleapis.com/mhd-media/img/testing";

  const handleItemnameClick = (value) => {
    handlemodal(value);
  };

  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (sourceRef, targetRef) => {
    if (isScrolling) return;

    setIsScrolling(true);

    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop;
    }

    setTimeout(() => setIsScrolling(false), 10);
  };

  const headerRef = useRef(null);
  const bodyRef = useRef(null);

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useEffect(() => {
    const syncScroll = (source, target) => {
      target.scrollLeft = source.scrollLeft;
    };

    const handleHeaderScroll = () =>
      syncScroll(headerRef.current, bodyRef.current);
    const handleBodyScroll = () =>
      syncScroll(bodyRef.current, headerRef.current);

    const headerElement = headerRef.current;
    const bodyElement = bodyRef.current;

    headerElement.addEventListener("scroll", handleHeaderScroll);
    bodyElement.addEventListener("scroll", handleBodyScroll);

    return () => {
      headerElement.removeEventListener("scroll", handleHeaderScroll);
      bodyElement.removeEventListener("scroll", handleBodyScroll);
    };
  }, []);

  useEffect(() => {
    const syncScroll = (source, target) => {
      if (target) target.scrollTop = source.scrollTop;
    };

    const handleHeaderScroll = () => {
      if (ref1.current && ref2.current) {
        syncScroll(ref1.current, ref2.current);
      }
    };
    const handleBodyScroll = () => {
      if (ref1.current && ref2.current) {
        syncScroll(ref2.current, ref1.current);
      }
    };

    const headerElement = ref1.current;
    const bodyElement = ref2.current;

    if (headerElement && bodyElement) {
      headerElement.addEventListener("scroll", handleHeaderScroll);
      bodyElement.addEventListener("scroll", handleBodyScroll);

      return () => {
        headerElement.removeEventListener("scroll", handleHeaderScroll);
        bodyElement.removeEventListener("scroll", handleBodyScroll);
      };
    }
  }, []);

  const mergeRefs =
    (...refs) =>
      (element) => {
        refs.forEach((ref) => {
          if (typeof ref === "function") {
            ref(element);
          } else if (ref && typeof ref === "object") {
            ref.current = element;
          }
        });
      };


  const [widthForCategoryBorder, setWidthForCategoryBorder] = useState();

  const [removeiconclciked,setRemoveiconclciked]=useState();
 

  useEffect(() => {
    const updateWidth = () => {
      const element = document.querySelector(".second-part-data-row");
      if (element) {
        const { width } = element.getBoundingClientRect();
        setWidthForCategoryBorder(width);
        console.log({ width });
      }
    };
  
    // Call it initially to set the width
    updateWidth();
  
    // Add the event listener for window resize
    window.addEventListener("resize", updateWidth);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [listingobject, menuData, menudatalist, showColumns, removeiconclciked]);
  
 

const handleRemoveIcon = (value) => {
    const allFalse =
      listingobject &&
      Object.values(listingobject).every((value) => value === false);
    if (allFalse) {
      setShowColumns(allFalse);
    }
    setRemoveiconclciked(value)
  };
   const [widthForEachRow, setWidthForEachRow] = useState();

  useEffect(() => {
  
      const element = document.querySelector(".orderTypes");
  
      if (element) {
        const { width } = element.getBoundingClientRect();
        setWidthForEachRow(width);
      }
    }, [listingobject, menuData,menudatalist]);

  return (
   <div   className="MenuPage-new-container">

   
          <SidePanel />
    
    <div  className={`${isExpanded ? "MenuPage-new-container-body-expand" : "MenuPage-new-container-body"}`}>
        <div className="MenuPage-new-container-header">
        <Header />
        </div>
        <InsertColumnList
            listingobject={listingobject}
            setlistingobject={setlistingobject}
            insertlists={insertlists2}
            showheadinglist={showheadinglist}
            setshowheadinglist={setshowheadinglist}
            closeicon={closeicon}
            dollaricon={dollaricon}
            toggleround={toggleround}
            togglebtns={calendericon}
            Outsideref={Outsideref}
            uniqueOrderTypeNames={uniqueOrderTypeNames}
          />
        <div  className={`${isExpanded ? "MenuPage-new-container-menuBody-expand" : "MenuPage-new-container-menuBody"}`}>
            <div className="first-part-data">
                <div className="first-part-header">
                <p className="image-style">Image</p>
                  <p className="name-item-style">ItemName</p>
                  <p className="item-code-style">
                    <span> Code </span>
                    <button
                      className="addbtn-menupage"
                      onClick={() => {
                        if (
                          itemList?.length > 0 &&
                          itemList?.some(
                            (item) => item?.itemResponseList?.length > 0
                          ) &&
                          !menuDataLoading &&
                          !menuDataFailed
                        ) {
                          setshowheadinglist(true);
                        }
                      }}
                    >
                      <span className="Menupage-insert-column-span">+</span>
                    </button>
                  </p>




                </div>
                <div className="first-part-body" ref={ref1}>
                    <div>

                    {menudatalist?.map((data, parentIndex) => (
                    <React.Fragment key={parentIndex}>
                      {data?.subCategoryResponseList &&
                        data?.subCategoryResponseList?.length > 0 ? (
                        data?.subCategoryResponseList?.length > 0 &&
                        data.categoryName !== "" && (
                          <>
                            {data?.subCategoryResponseList?.map(
                              (subCategory, index) => (
                                <>
                                  {subCategory?.itemResponseList?.length >
                                    0 && (
                                      <div 
                                      className="categoryName-data-bg"
                                      >
                                        <p>
                                          {data.categoryName}-{" "}
                                          <span>
                                            {subCategory.subCategoryName}
                                          </span>{" "}
                                          ({subCategory?.itemResponseList?.length}
                                          )
                                        </p>
                                      </div>
                                    )}

                                  {data?.subCategoryResponseList?.length > 0 &&
                                    subCategory?.itemResponseList?.length > 0 &&
                                    subCategory?.itemResponseList.map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className="fist-part-data-itemname-code"
                                        >
                                          <p>
                                            <span className="imgae-styel2">
                                              <img
                                                src={`${baseImageUrl}${item?.mediaResponseList[0]
                                                    ?.imageId
                                                  }.${item?.mediaResponseList[0]?.imageType.split(
                                                    "/"
                                                  )[1]
                                                  }`}
                                                alt="No Image"
                                                className="foodimage"
                                              />
                                            </span>
                                          </p>
                                          <p>
                                            <span
                                              className="name-style2"
                                              onClick={() =>
                                                handlemodal(item.itemId)
                                              }
                                            >
                                              <HoverText
                                                text={item?.itemName}
                                                lengthvale={14}
                                              />
                                            </span>
                                          </p>
                                          <p>
                                            <span className="code-style2">
                                              {item?.itemCode}
                                            </span>
                                          </p>
                                        </div>
                                      )
                                    )}
                                </>
                              )
                            )}
                          </>
                        )
                      ) : (
                        <>
                          {data?.itemResponseList &&
                            data?.itemResponseList?.length > 0
                            ? data?.itemResponseList?.length > 0 &&
                            data.categoryName !== "" && (
                              <>
                                <div className="categoryName-data-bg">
                                  <p>
                                    {data.categoryName} (
                                    {data?.itemResponseList?.length})
                                  </p>
                                </div>
                                {data?.itemResponseList.map((item, index) => (
                                  <div
                                    key={index}
                                    className={isExpanded ? "fist-part-data-itemname-code" : "fist-part-data-itemname-code"}
                                  >
                                    <p>
                                      <span className="imgae-styel2">
                                        <img
                                          src={`${baseImageUrl}${item?.mediaResponseList[0]
                                              ?.imageId
                                            }.${item?.mediaResponseList[0]?.imageType.split(
                                              "/"
                                            )[1]
                                            }`}
                                          alt="No Image"
                                          className="foodimage"
                                        />
                                      </span>
                                    </p>
                                    <p>
                                      <span
                                        className={`${isExpanded ? "name-style2-expand" : "name-style2"
                                          }`}

                                        onClick={() =>
                                          handlemodal(item.itemId)
                                        }
                                      >
                                        <HoverText
                                          text={item?.itemName}
                                          lengthvale={14}
                                        />
                                      </span>
                                    </p>
                                    <p>
                                      <span className="code-style2">
                                        {item?.itemCode}
                                      </span>
                                    </p>
                                  </div>
                                ))}
                              </>
                            )
                            : null}
                        </>
                      )}
                    </React.Fragment>
                  ))}
                    </div>

               
                </div>

                
            </div>


            <div className="second-part-data">
                <div  ref={headerRef} className={`${isExpanded ? "second-part-header-expand" : "second-part-header"}`}>
                {!menuDataLoading &&
                      !menuDataFailed &&
                      itemList?.length > 0 &&
                      itemList?.some(
                        (item) => item?.itemResponseList?.length > 0
                      ) &&
                      firstRowTable.map((header, index) => {
                        const headerName = header.label.substring(
                          0,
                          header.label.length - 1
                        );

                        if (
                          (header.label === "Customize1" ||
                            nameOfOrderTypes?.includes(headerName)) &&
                          header.label !== "Instore1" &&
                          header.label !== "Instore2"
                        ) {

                            const dynamicWidth = `${headerName.length * 1.3
                            }vw`;
                          return (
                            <>
                              {listingobject && listingobject[header.label] && (
                                <p
                                  style={{
                                    display: "flex",
                                    gap: "20px",
                                    height: "1rem",
                                  }}
                                >
                                  <span
                                    className="orderTypes"
                                    style={{
                                        width:dynamicWidth,
                                      padding: "0",
                                      

                                      height: "1.6rem",
                                    }}
                                  >
                                    {header.label !== "Inventory1" &&
                                      header.label !== "Customize1" && (
                                        <span className="dollar">
                                          {header.label.charAt(
                                            header.label.length - 1
                                          ) === "2" ? (
                                            <img src={calendericon} alt="" className="header-img"/>
                                          ) : (
                                            <img src={dollar} alt="" className="header-img"/>
                                          )}
                                        </span>
                                      )}
                                    <span
                                     className="spanheadertext"
                                     >
                                      {headerName}
                                    </span>
                                    <span
                                      className="removeicon"
                                      onClick={() => {
                                        setlistingobject({
                                          ...listingobject,
                                          [header.label]: false,
                                        });
                                        handleRemoveIcon(headerName);
                                      }}
                                    >
                                      <img
                                        src={removeicon}
                                        // className="removeicon-img"
                                        alt=""
                                        onClick={() =>
                                          setlistingobject({
                                            ...listingobject,
                                            [header.label]: false,
                                          })
                                        }
                                      />
                                    </span>
                                  </span>
                                </p>
                              )}
                            </>
                          );
                        }
                        return null;
                      })}
                </div>
                <div  className={`${isExpanded ? "second-part-body-expand" : "second-part-body"}  
                ${menuDataLoading||menuDataFailed||menudatalist.length===0 ? "second-part-body-overflow-none" : ""}
                `  } ref={mergeRefs(ref2, bodyRef)}>
                <div >
                    {menuDataLoading ? (
                      <div className="Menu-noOptions">
                        <Loader
                          className="imgLoader2"
                          height="100px"
                          width="100px"
                          style={{
                            filter:
                              "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
                          }}
                        />
                      </div>
                    ) : menuDataFailed ? (
                      <div className="NoDataFoundContainer-menupage">
                        <img
                          className="columnselected-menupage"
                          src={noResultsfound}
                          alt="noResultFound"
                        />
                        <h2 className="columnselectedText">No Results Found</h2>
                      </div>
                    ) : (
                      <>
                        {showColumns ? (
                          <div
                            className={`${isExpanded
                                ? "no-colunms-menu-page-expanded"
                                : "no-colunms-menu-page"
                              }`}
                          >
                            {" "}
                            No columns  Selected
                          </div>
                        ) : (
                          menudatalist?.map((data, parentIndex) => (
                            <React.Fragment key={parentIndex}>
                              {data?.subCategoryResponseList &&
                                data?.subCategoryResponseList?.length > 0 ? (
                                <>
                                  {data?.subCategoryResponseList?.map(
                                    (subCategory, index) => (
                                      <React.Fragment key={index}>
                                        {subCategory?.itemResponseList?.length >
                                          0 &&
                                          data.categoryName !== "" && (
                                            <>
                                              <style>{`.categoryName-data-bg-forsecondpart { width: ${widthForCategoryBorder}px !important; }`}</style>
                                              <div
                                                // className="categoryName-data"
             

                                                className="categoryName-data-bg-forsecondpart"

                                              >
                                                <p></p>
                                              </div>
                                            </>
                                          )}

                                        {subCategory?.itemResponseList?.length >
                                          0 &&
                                          data.categoryName !== "" &&
                                          subCategory?.itemResponseList.map(
                                            (item, index) => (
                                              <div

                                                key={index}
                                                className="second-part-data-row"
                                              >
                                                <p 
                                    
                                    
                                style={{display:"flex",gap:"1rem"}}
                                       >
                                                  {orderTypesToShow2?.map(
                                                    (
                                                      typeName,
                                                      ordertypeindex
                                                    ) => {
                                                      if (
                                                        !nameOfOrderTypes?.includes(
                                                          typeName
                                                        )
                                                      )
                                                        return null;

                                                      const shouldDisplayType =
                                                        listingobject &&
                                                        listingobject[
                                                        `${typeName}1`
                                                        ];

                                                      if (!shouldDisplayType)
                                                        return null;

                                                      const orderType =
                                                        item.orderTypes?.find(
                                                          (ot) =>
                                                            ot.typeName ===
                                                            typeName
                                                        );
                                                        

                                                      const price = orderType
                                                        ? orderType.price
                                                          .toFixed(2)
                                                          .padStart(5, "0")
                                                        : "";

                                                        const dynamicWidth = `${typeName.length * 1.3
                                                        }vw`;

                                                      if (
                                                        orderType.typeGroup !==
                                                        "I"
                                                      ) {
                                                        return (
                                                          <span
                                                            key={typeName}
                                                           
                                                            className="orderTypes-price"
     
                                                            style={{
                                                             cursor: "pointer",
                                                             width:dynamicWidth,
                                                             display:"flex",
                                                             gap:"1rem",
                                                                padding: "0",
                                                                //    paddingLeft: "20px",
                                                                //    paddingRight: "20px",
                                                                 
                                                             // marginLeft:"1rem"
                                                            
                                                             // paddingLeft:"20px",
                                                             // paddingRight:"20px"
     
     
                                                            }}
                                                            onClick={() =>
                                                              handlesidbarhandling(
                                                                `${typeName}1`,
                                                                item.itemId
                                                              )
                                                            }
                                                          >
                                                            {restaurantDetails?.country ===
                                                              "US"
                                                              ? "$"
                                                              : "Rs."}{" "}
                                                            {price !== ""
                                                              ? price
                                                              : "0"}
                                                          </span>
                                                        );
                                                      }
                                                    }
                                                  )}
                                                </p>

                                                <p       style={{display:"flex",gap:"1rem"}}>
                                                  {orderTypesToShow2?.map(
                                                    (typeName) => {
                                                      if (
                                                        !nameOfOrderTypes?.includes(
                                                          typeName
                                                        )
                                                      )
                                                        return null;

                                                      const shouldDisplayType =
                                                        listingobject &&
                                                        listingobject[
                                                        `${typeName}2`
                                                        ];

                                                      if (!shouldDisplayType)
                                                        return null;

                                                      const orderType =
                                                        item.orderTypes?.find(
                                                          (ot) =>
                                                            ot.typeName ===
                                                            typeName
                                                        );

                                                        const dynamicWidth = `${typeName.length * 1.3
                                                        }vw`;
                                                      if (
                                                        orderType.typeGroup !==
                                                        "I"
                                                      ) {
                                                        return (
                                                          <span
                                                          key={typeName}
                                                          className="orderTypes-price"
   
                                                          style={{
                                                           cursor: "pointer",
                                                           width:dynamicWidth,
                                                           opacity:orderType && orderType.availabilityEnabled ===true && orderType.isNotHide ===1?"100%":"50%",

                                                           display:"flex",
                                                           // gap:"1rem",
                                                              padding: "0",
                                                                //  paddingLeft: "20px",
                                                                //  paddingRight: "20px",
                                                           // marginLeft:"1rem"
                                                          
                                                           // paddingLeft:"20px",
                                                           // paddingRight:"20px"
   
   
                                                          }}
                                                            onClick={() =>
                                                              handlesidbarhandling(
                                                                `${typeName}2`,
                                                                item.itemId
                                                              )
                                                            }
                                                          >
                                                            <Toggle
                                                              toggle={
                                                                orderType &&
                                                                orderType.availabilityEnabled ===
                                                                true &&
                                                                orderType.isNotHide ===
                                                                1
                                                                //    &&
                                                                // orderType.isEnabled ===
                                                                //   1
                                                              }
                                                            />
                                                          </span>
                                                        );
                                                      }
                                                    }
                                                  )}
                                                </p>

                                                <p  style={{display:"flex",gap:"1rem"}}>
                                                  {item?.modifiers &&
                                                    Array.isArray(
                                                      item.modifiers
                                                    ) &&
                                                    listingobject &&
                                                    listingobject.Customize1 ? (
                                                    <span
                                                    //   className="Customizedata"
                                                      onClick={() =>
                                                        handlesidbarhandling(
                                                          "Customize1",
                                                          item.itemId
                                                        )
                                                      }
                                                    >
                                                      <span  
                                                   
                                                     className="orderTypes-price"

                                                     style={{
                                                      cursor: "pointer",
                                                      width:"12vw",
                                                      display:"flex",
                                                      // gap:"1rem",
                                                         padding: "0",
                                                            // paddingLeft: "20px",
                                                            // paddingRight: "20px",
                                                      // marginLeft:"1rem"
                                                     
                                                      // paddingLeft:"20px",
                                                      // paddingRight:"20px"


                                                     }}
                                                              >
                                                        {item.modifiers.length}
                                                      </span>
                                                    </span>
                                                  ) : (
                                                    listingobject &&
                                                    listingobject.Customize1 && (
                                                      <span 
                                                  
                                                     className="orderTypes-price"

                                                     style={{
                                                      cursor: "pointer",
                                                      width:"12vw",
                                                      display:"flex",
                                                      // gap:"1rem",
                                                         padding: "0",
                                                            // paddingLeft: "20px",
                                                            // paddingRight: "20px",
                                                      // marginLeft:"1rem"
                                                     
                                                      // paddingLeft:"20px",
                                                      // paddingRight:"20px"


                                                     }}
                                                    //   className="Customizedata"
                                                      >
                                                        <span>
                                                          No Modifiers Available
                                                        </span>
                                                      </span>
                                                    )
                                                  )}
                                                </p>
                                              </div>
                                            )
                                          )}
                                      </React.Fragment>
                                    )
                                  )}
                                </>
                              ) : (
                                <>
                                  {data?.itemResponseList?.length > 0 &&
                                    data.categoryName !== "" && (
                                      <>
                                         <style>{`.categoryName-data-bg-forsecondpart { width: ${widthForCategoryBorder}px !important; }`}</style>
                                              <div
                                                // className="categoryName-data"


                                                className="categoryName-data-bg-forsecondpart"
                                         >
                                          <p></p>
                                        </div>
                                      </>
                                    )}

                                  {data?.itemResponseList?.length > 0 &&
                                    data.categoryName !== "" &&
                                    data?.itemResponseList.map(
                                      (item, index) => (
                                        <div
                                          key={index}
                                          className="second-part-data-row"
                                        >
                                          <p  style={{display:"flex",gap:"1rem"}}>
                                            {orderTypesToShow2?.map(
                                              (typeName, ordertypeindex) => {
                                                if (
                                                  !nameOfOrderTypes?.includes(
                                                    typeName
                                                  )
                                                )
                                                  return null;

                                                const shouldDisplayType =
                                                  listingobject &&
                                                  listingobject[`${typeName}1`];

                                                if (!shouldDisplayType)
                                                  return null;

                                                const orderType =
                                                  item.orderTypes?.find(
                                                    (ot) =>
                                                      ot.typeName === typeName
                                                  );

                                                const price = orderType
                                                  ? orderType.price
                                                    .toFixed(2)
                                                    .padStart(5, "0")
                                                  : "";

                                                  const dynamicWidth = `${typeName.length * 1.3
                                                  }vw`;
                                                if (
                                                  orderType.typeGroup !== "I"
                                                ) {
                                                  return (<>
                                                  {/* <style>{`.orderTypes-price { width: ${widthForEachRow}px !important; }`}</style> */}
                                                  <span
                                                      key={typeName}
                                                       className="orderTypes-price"

                                                       style={{
                                                        cursor: "pointer",
                                                        width:dynamicWidth,
                                                        opacity:orderType && orderType.availabilityEnabled ===true && orderType.isNotHide ===1?"100%":"50%",
                                                          
                                                        display:"flex",
                                                        // gap:"1rem",
                                                           padding: "0",
                                                            //   paddingLeft: "20px",
                                                            //   paddingRight: "20px",
                                                        // marginLeft:"1rem"
                                                       
                                                        // paddingLeft:"20px",
                                                        // paddingRight:"20px"


                                                       }}
                                                            // style={{
                                                            //   padding: "0",
                                                            //   paddingLeft: "20px",
                                                            //   paddingRight: "20px",
                        
                                                            //   height: "1.6rem",}}
                                                    //   style={{
                                                    //     cursor: "pointer",
                                                    //     opacity:
                                                    //       orderType &&
                                                    //         orderType.availabilityEnabled ===
                                                    //         true &&
                                                    //         orderType.isNotHide ===
                                                    //         1
                                                    //         ? "100%"
                                                    //         : "50%",
                                                        //  &&
                                                        // orderType.isEnabled ===
                                                        //   1

                                                    //     width: dynamicWidth,
                                                    //     padding: "0 22px",
                                                    //     textAlign: "center",
                                                    //     display: "flex",
                                                    //     justifyContent:
                                                    //       "center",
                                                    //     alignItems: "center",
                                                    //   }}
                                                      onClick={() =>
                                                        handlesidbarhandling(
                                                          `${typeName}1`,
                                                          item.itemId
                                                        )
                                                      }
                                                    >
                                                      {restaurantDetails?.country ===
                                                        "US"
                                                        ? "$"
                                                        : "Rs."}{" "}
                                                      {price !== ""
                                                        ? price
                                                        : "0"}
                                                    </span>
                                                  
                                                  </>
                                                   
                                                  );
                                                }
                                              }
                                            )}
                                          </p>

                                          <p  style={{display:"flex",gap:"1rem"}}>
                                            {orderTypesToShow2?.map(
                                              (typeName) => {
                                                if (
                                                  !nameOfOrderTypes?.includes(
                                                    typeName
                                                  )
                                                )
                                                  return null;

                                                const shouldDisplayType =
                                                  listingobject &&
                                                  listingobject[`${typeName}2`];

                                                if (!shouldDisplayType)
                                                  return null;

                                                const orderType =
                                                  item.orderTypes?.find(
                                                    (ot) =>
                                                      ot.typeName === typeName
                                                  );

                                                const dynamicWidth = `${typeName.length * 1.3
                                                  }vw`;
                                                if (
                                                  orderType.typeGroup !== "I"
                                                ) {
                                                  return (
                                                    <span
                                                    key={typeName}
                                                    className="orderTypes-price"

                                                    style={{
                                                     cursor: "pointer",
                                                     width:dynamicWidth,
                                                     display:"flex",
                                                     
                                                     // gap:"1rem",
                                                        padding: "0",
                                                        //    paddingLeft: "20px",
                                                        //    paddingRight: "20px",
                                                     // marginLeft:"1rem"
                                                    
                                                     // paddingLeft:"20px",
                                                     // paddingRight:"20px"


                                                    }}
                                                      onClick={() =>
                                                        handlesidbarhandling(
                                                          `${typeName}2`,
                                                          item.itemId
                                                        )
                                                      }
                                                    >
                                                      <Toggle
                                                        toggle={
                                                          orderType &&
                                                          orderType.availabilityEnabled ===
                                                          true &&
                                                          orderType.isNotHide ===
                                                          1
                                                          //   &&
                                                          // orderType.isEnabled ===
                                                          //   1
                                                        }
                                                      />
                                                    </span>
                                                  );
                                                }
                                              }
                                            )}
                                          </p>

                                          <p  style={{display:"flex",gap:"1rem"}}>
                                            {item?.modifiers &&
                                              Array.isArray(item.modifiers) &&
                                              listingobject &&
                                              listingobject.Customize1 ? (
                                              <span
                                             
                                              className="orderTypes-price"

                                              style={{
                                               cursor: "pointer",
                                               width:"12vw",
                                               display:"flex",
                                               // gap:"1rem",
                                                  padding: "0",
                                                  //  border:"1px solid red",
                                                    //  paddingLeft: "20px",
                                                    //  paddingRight: "20px",
                                               // marginLeft:"1rem"
                                              
                                               // paddingLeft:"20px",
                                               // paddingRight:"20px"


                                              }}
                                                onClick={() =>
                                                  handlesidbarhandling(
                                                    "Customize1",
                                                    item.itemId
                                                  )
                                                }
                                              >
                                                <span>
                                                  {item.modifiers.length}
                                                </span>
                                              </span>
                                            ) : (
                                              listingobject &&
                                              listingobject.Customize1 && (
                                                <span 
                                              
                                                className="orderTypes-price"

                                                style={{
                                                 cursor: "pointer",
                                                 width:"12vw",
                                                 display:"flex",
                                                //  border:"1px solid red",
                                                 // gap:"1rem",
                                                    padding: "0",
                                                      //  paddingLeft: "20px",
                                                      //  paddingRight: "20px",
                                                 // marginLeft:"1rem"
                                                
                                                 // paddingLeft:"20px",
                                                 // paddingRight:"20px"


                                                }}
                                                >
                                                  <span>
                                                    No Modifiers Available
                                                  </span>
                                                </span>
                                              )
                                            )}
                                          </p>
                                        </div>
                                      )
                                    )}
                                </>
                              )}
                            </React.Fragment>
                          ))
                        )
                        
                        }
                      </>
                    )}
                  </div>
                </div>
            </div>

        </div>

    </div>

    {modal && (
                  <Slider
                    sidebartext={sidebartext}
                    SideBarData={SideBarData}
                    onclose={() => setmodal(false)}
                  />
                )}

   </div>
  );
};