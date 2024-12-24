import React, { useEffect, useState, useRef, useContext } from "react";
import Toggle from "components/productCatalog/Toggle/Toggle";
import HoverText from "../../../components/productCatalog/HoverText/HoverText";
import placeholderimg from "../../../assets/svg/placeholderimg.svg";
import "./MenuPage.scss";
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

export const MenuPage = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.auth.selectedBranch);
  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const loadingRequest = useSelector(
    (state) => state.productCatalog?.addMenuLoading
  );
  const SearchedmenuItem = useSelector(
    (state) => state.searchItem?.SearcheItem
  );

  const { isExpanded } = useContext(Contextpagejs);
  const [draggedIndexsample, setDraggedIndexsample] = useState(null);
  const [menudatalist, setMenudatalist] = useState(menuData);
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
          acc[orderType.typeName] = true;
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
    setuniqueOrderTypeNames(getUniqueOrderTypeNames(menuData));

    setlistingobject(
      initializeListingObject(getUniqueOrderTypeNames(menuData))
    );
  }, [menuData]);

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

  const uniqueOrderTypes = getUniqueOrderTypes(menuData);
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
  }, [menuData]);

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

  // Output result
  // console.log(insertlists2);

  // Log firstRowTable whenever it changes
  // useEffect(() => {
  //   setFirstRowTable((prev)=>[...prev,tablefirstrow])

  // }, [tablefirstrow]);

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
      const filterdItem = {
        name: SearchedmenuItem?.categoryName,
        id: SearchedmenuItem?.categoryId,
        itemResponseList: SearchedmenuItem?.itemResponseList,
      };

      setItemList([filterdItem]);
      setLoading(false);
    }
  }, [menuData, SearchedmenuItem]);

  useEffect(() => {
    if (selectedBranch?.id) {
      dispatch(getMenuRequest(selectedBranch?.id));
    }
  }, [selectedBranch?.id]);

  console.log({locationid},{selectedBranch})


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

  const allFalse =
    listingobject &&
    Object.values(listingobject).every((value) => value === false);

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
    getUniqueOrderTypeNamesfortableprice(menuData);

  const orderTypesToShow2 = uniqueOrderTypeNamesforprice
    .filter((item) => item?.typeName)
    .map((item) => item.typeName);

  useEffect(() => {
    if (deleteMenuItemSuccess && modal) {
      setmodal(false);
    }
  }, [deleteMenuItemSuccess]);

  const [itemList, setItemList] = useState([]);

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

  const baseImageUrl = "https://storage.googleapis.com/mhp-media/img/";

  const handleItemnameClick = (value) => {
    handlemodal(value);
  };

  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (sourceRef, targetRef) => {
    if (isScrolling) return; // Prevent recursive loop

    setIsScrolling(true);

    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollTop = sourceRef.current.scrollTop; // Synchronize scroll position
    }

    setTimeout(() => setIsScrolling(false), 10); // Allow a brief pause before enabling scrolling again
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

  return (
    <>
      <div className="MenuPage-container">
        <SidePanel />
        <div
          className={`${isExpanded ? "MenuPage-Part-expand" : "MenuPage-Part"}`}
        >
          <div className="MenuPage-HeaderComponent">
            {" "}
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

          <div
            className={`${
              isExpanded ? "MenuPage-Listing-expand" : "MenuPage-Listing"
            }`}
          >
            <div>
              <div className="header-container">
                <div className="first-div-header">
                  <p className="image">Image</p>
                  <p className="name-item">ItemName</p>
                  <p className="item-code">
                    <span> Code </span>
                    <button
                      className="addbtn-menupage"
                      onClick={() => {
                        if (
                          itemList.length > 0 &&
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

                <div
                  ref={headerRef}
                  className={`${
                    isExpanded ? "scroll-container-expand" : "scroll-container"
                  }`}
                >
                  <div className="second-div-header">
                    {!menuDataLoading &&
                      !menuDataFailed &&
                      itemList.length > 0 &&
                      firstRowTable.map((header, index) => {
                        const headerName = header.label.substring(
                          0,
                          header.label.length - 1
                        );
                        if (
                          header.label === "Customize1" ||
                          nameOfOrderTypes?.includes(headerName)
                        ) {
                          return (
                            <>
                              {listingobject && listingobject[header.label] && (
                                <p  style={{display:"flex",gap:"20px",height:"1rem"}}>
                                  <span className="borderfor-header" style={{padding:"0",paddingLeft:"20px",paddingRight:"20px",height:"2rem"}}>
                                    {header.label !== "Inventory1" &&
                                      header.label !== "Customize1" && (
                                        <span className="dollar">
                                          {header.label.charAt(
                                            header.label.length - 1
                                          ) === "2" ? (
                                            <img src={calendericon} alt="" />
                                          ) : (
                                            <img src={dollar} alt="" />
                                          )}
                                        </span>
                                      )}
                                    <span className="spanheadertext">
                                      {headerName}
                                    </span>
                                    <span
                                      className="removeicon"
                                      onClick={() =>
                                        setlistingobject({
                                          ...listingobject,
                                          [header.label]: false,
                                        })
                                      }
                                    >
                                      <img
                                        src={removeicon}
                                        className="removeicon-img"
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
                </div>
              </div>
              <div
                className={`${
                  isExpanded && !menuDataLoading && "body-container-expand"
                } ${!isExpanded && !menuDataLoading && "body-container"}`}
                // className={`${isExpanded ? "body-container-expand" : "body-container"
                //   }`}
              >
                <div></div>
                <div className="first-div-body" ref={ref1}>
                  {itemList?.map((data, parentIndex) => (
                    <React.Fragment key={parentIndex}>
                      {data?.itemResponseList?.length > 0 &&
                        data.name !== "" && (
                          <div className="categoryName-data">
                            <p>
                              {data.name}({data?.itemResponseList?.length})
                            </p>
                          </div>
                        )}

                      {data?.itemResponseList?.length > 0 &&
                        data.name !== "" &&
                        data?.itemResponseList.map((item, index) => (
                          <div key={index} className="item-name-code-data">
                            <p>
                              <span className="itemimage2">
                                <img
                                  src={
                                   baseImageUrl +
                                    item?.mediaResponseList[0]?.imageId
                                  }
                                  // src={`${baseImageUrl}${item?.mediaResponseList[0]?.imageId}.${item?.mediaResponseList[0]?.imageType}`}
                                  alt="No Image"
                                  className="foodimage"
                                />
                              </span>
                            </p>
                            <p>
                              <span
                                className="itemname2"
                                onClick={() => {
                                  handlemodal(item.itemId);
                                }}
                              >
                                <HoverText
                                  text={item?.itemName}
                                  lengthvale={14}
                                />
                              </span>
                            </p>
                            <p>
                              <span className="itemcode2">
                                {item?.itemCode}
                              </span>
                            </p>
                          </div>
                        ))}
                    </React.Fragment>
                  ))}
                </div>

                <div className="scroll-container22">
                  <div
                    className={`${
                      isExpanded &&
                      !menuDataLoading &&
                      !menuDataFailed &&
                      !allFalse &&
                      "second-div-body-expand"
                    } ${
                      !isExpanded &&
                      !menuDataLoading &&
                      !menuDataFailed &&
                      !allFalse &&
                      "second-div-body"
                    }`}
                    ref={mergeRefs(ref2, bodyRef)}
                    style={{ height: menuDataLoading ? "39.5rem" : "" }}
                  >
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
                      <div className="NoDataFoundContainer">
                        <img
                          className="columnselected"
                          src={noResultsfound}
                          alt="noResultFound"
                        />
                        <h2 className="columnselectedText">No Results Found</h2>
                      </div>
                    ) : (
                      <>
                        {allFalse ? (
                          <div
                            className={`${
                              isExpanded
                                ? "no-colunms-menu-page-expanded"
                                : "no-colunms-menu-page"
                            }`}
                          >
                            {" "}
                            No columns selected
                          </div>
                        ) : (
                          itemList?.map((data, parentIndex) => (
                            <React.Fragment key={parentIndex}>
                              {data?.itemResponseList?.length > 0 &&
                                data.name !== "" && (
                                  <div className="categoryName-data" >
                                    <p style={{
                                    
                                    width: `${orderTypesToShow2?.length * 10}%` || "0rem", 
                                  }}></p>
                                  </div>
                                )}

                              {data?.itemResponseList?.length > 0 &&
                                data.name !== "" &&
                                data?.itemResponseList.map((item, index) => (
                                  <div key={index} className="table-two-row">
                                    <p>
                                      {orderTypesToShow2?.map(
                                        (typeName, ordertypeindex) => {
                                          // Check if typeName is in nameOfOrderTypes
                                          if (
                                            !nameOfOrderTypes?.includes(
                                              typeName
                                            )
                                          )
                                            return null;

                                          const shouldDisplayType =
                                            listingobject &&
                                            listingobject[`${typeName}1`];

                                          if (!shouldDisplayType) return null;

                                          const orderType =
                                            item.orderTypes?.find(
                                              (ot) => ot.typeName === typeName
                                            );

                                          const price = orderType
                                            ? orderType.price
                                                .toFixed(2)
                                                .padStart(5, "0")
                                            : "";

                                          const className =
                                            typeName?.toLowerCase() + "data";
                                          const isPriceEnabled =
                                            orderType &&
                                            orderType.isNotHide === 1 &&
                                            orderType.availabilityEnabled &&
                                            orderType.isEnabled === 1
                                              ? true
                                              : false;

                                          const sliderkey =
                                            typeName === "DineIn"
                                              ? "DineIn1"
                                              : typeName === "Pickup"
                                              ? "Pickup1"
                                              : typeName === "Delivery"
                                              ? "Delivery1"
                                              : "";
                                              const dynamicWidth = `${typeName.length * 10 + 20}px`;

                                          return (
                                            <span
                                              
                                              key={typeName}
                                              style={{
                                                opacity: isPriceEnabled ? "100%" : "50%",
                                               
                                                width: dynamicWidth, 
                                                padding: "0 22px", 
                                                textAlign: "center",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                              onClick={() =>
                                                handlesidbarhandling(
                                                  sliderkey,
                                                  data?.itemResponseList[index]
                                                    .itemId
                                                )
                                              }
                                            >
                                              {restaurantDetails?.country ===
                                              "US"
                                                ? "$"
                                                : "Rs."}{" "}
                                              {price !== "" ? price : "0"}
                                            </span>
                                          );
                                        }
                                      )}
                                    </p>
                                    <p style={{ display: "flex" }}>
                                      {orderTypesToShow2?.map((typeName) => {
                                        // Check if typeName is in nameOfOrderTypes
                                        if (
                                          !nameOfOrderTypes?.includes(typeName)
                                        )
                                          return null;

                                        const shouldDisplayType =
                                          listingobject &&
                                          listingobject[`${typeName}2`];

                                        if (!shouldDisplayType) return null;

                                        const orderType = item.orderTypes?.find(
                                          (ot) => ot.typeName === typeName
                                        );

                                        const isEnabled = orderType
                                          ? orderType.isEnabled
                                          : "";
                                        const className =
                                          typeName?.toLowerCase() + "data";

                                        const isAvailEnabled =
                                          orderType &&
                                          orderType.availabilityEnabled === true
                                            ? true
                                            : false;

                                        const sliderkey =
                                          typeName === "DineIn"
                                            ? "DineIn2"
                                            : typeName === "Pickup"
                                            ? "Pickup2"
                                            : typeName === "Delivery"
                                            ? "Delivery2"
                                            : "";
                                          const dynamicWidth = `${typeName.length * 10 + 20}px`;
                                        return (
                                          <span
                                            key={typeName}
                                          
                                            style={{
                                              position:"relative",
                                               left:"1rem",
                                             
                                              width: dynamicWidth, 
                                              padding: "0 22px", 
                                              textAlign: "center",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                            onClick={() =>
                                              handlesidbarhandling(
                                                sliderkey,
                                                data?.itemResponseList[index]
                                                  .itemId
                                              )
                                            }
                                          >
                                            {isEnabled !== "" ? (
                                              <Toggle
                                                toggle={
                                                  orderType?.availabilityEnabled ===
                                                    true &&
                                                  orderType?.isNotHide === 1 &&
                                                  orderType?.isEnabled === 1 &&
                                                  true
                                                }
                                              />
                                            ) : (
                                              <Toggle
                                                toggle={
                                                  orderType?.availabilityEnabled ===
                                                    false &&
                                                  orderType?.isNotHide !== 1 &&
                                                  orderType?.isEnabled !== 1 &&
                                                  false
                                                }
                                              />
                                            )}
                                          </span>
                                        );
                                      })}
                                    </p>

                                    <p>
                                      {item?.modifiers &&
                                      Array.isArray(item.modifiers) &&
                                      listingobject &&
                                      listingobject.Customize1 ? (
                                        <span
                                          className="Customizedata"
                                          onClick={() =>
                                            handlesidbarhandling(
                                              "",
                                              data?.itemResponseList[index]
                                                .itemId
                                            )
                                          }
                                        >
                                          <span>{item.modifiers.length}</span>
                                        </span>
                                      ) : (
                                        listingobject &&
                                        listingobject.Customize1 && (
                                          <span className="Customizedata">
                                            <span>No Modifiers Available</span>
                                          </span>
                                        )
                                      )}
                                    </p>
                                  </div>
                                ))}
                            </React.Fragment>
                          ))
                        )}
                      </>
                    )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
