import React, { useContext, useEffect, useState } from "react";
import "./Menu.scss";
import HeaderV2 from "components/productCatalog/Header-V2/HeaderV2";
import SidePanel from "pages/SidePanel";
import itemArrow from "../../../assets/svg/item-dropDown.svg";
import channelIcon from "../../../assets/svg/channelIcon.svg";
import notAllChannel from "../../../assets/svg/notAllChannel.svg";
import noneAvail from "../../../assets/svg/noneAvail.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/rootReducer";
import {
  PricingDetailRequest,
  getMenuRequest,
  itemCustomizationPost,
  primarypost,
  removeDataRequest,
  selectedCategory,
  selectedMockDataRequest,
} from "redux/productCatalog/productCatalogActions";
import Slider from "components/productCatalog/Slider/SliderUpdated";
import ToolTips from "components/toolTips/toolTips";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import { Contextpagejs } from "../contextpage";
import NotFound from "../../../assets/svg/NotFound copy.svg";

const Menu = () => {
  const dispatch = useDispatch();

  const menuData = useSelector(
    (state: RootState) => state.productCatalog?.menuData
  );
  const menuDataLoading = useSelector(
    (state: RootState) => state.productCatalog.menuDataLoading
  );
  const menuDataSuccess = useSelector(
    (state: RootState) => state.productCatalog.menuDataSuccess
  );
  const menuDataFailed = useSelector(
    (state: RootState) => state.productCatalog.menuDataFailed
  );
  const selectedBranch = useSelector(
    (state: RootState) => state.auth.selectedBranch || null
  );
  const location = useSelector(
    (state: RootState) => state.auth?.restaurantDetails?.country
  );
  const SearchedmenuItem = useSelector(
    (state: RootState) => state.searchItem?.SearcheItem
  );
  const deleteMenuItemSuccess = useSelector(
    (state: RootState) => state.productCatalog.deleteMenuItemSuccess
  );
  const locationid = useSelector(
    (state: RootState) => state.auth.selectedBranch?.id
  );
  const editData = useSelector(
    (state: RootState) => state.productCatalog.editData || []
  ) as any[];

  const [closedItems, setClosedItems] = useState<string[]>([]);
  const [openSubItems, setOpenSubItems] = useState<string[]>([]);

  //Search component useState
  const [itemList, setItemList] = useState<any>([]);
  const [menudatalist, setMenudatalist] = useState<any>(menuData);
  const [loading, setLoading] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);

  const [searchSubArrow, setShowSubArrow] = useState(false)

  //SidePanel component useState
  const [modal, setmodal] = useState(false);
  const [sidebartext, setSideBarText] = useState<any>(null);
  const [SideBarData, setSideBar] = useState([]);
  const [categoryData, setCategoryData] = useState<any>({});

  //Tool tip useState
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  //loader state

  useEffect(() => {
    if (selectedBranch?.id) {
      dispatch(getMenuRequest(selectedBranch?.id));
      dispatch(itemCustomizationPost([]));
    }
    dispatch(removeDataRequest());
    dispatch(selectedMockDataRequest(SideBarData));
  }, [selectedBranch?.id]);

  // useEffect(() => {
  //   dispatch(getMenuRequest(locationid));
  // }, []);

  useEffect(() => {
    const isObjectEmpty = (obj: any) => {
      return Object?.keys(obj)?.length === 0;
    };

    if (isObjectEmpty(SearchedmenuItem)) {
      const allItemResponseLists = menuData
        ?.flatMap((category: any) =>
          category?.subCategoryResponseList?.map((subCategory: any) => ({
            categoryId: category.categoryId,
            categoryName: category?.categoryName,
            subCategoryId: subCategory?.subCategoryId,
            subCategoryName: subCategory?.subCategoryName,
            itemResponseList: subCategory?.itemResponseList,
          }))
        )
        ?.filter(
          (item: any) =>
            item?.itemResponseList !== null &&
            item?.itemResponseList?.length > 0
        );

      const allItemResponseLists2 = menuData?.flatMap(
        (category: any) => category
      );

      const mergedarray = [...allItemResponseLists, ...allItemResponseLists2];
      const transformedList: any = mergedarray?.map((entry) => ({
        id: entry?.categoryId,
        name: entry?.categoryName,
        itemResponseList: entry?.itemResponseList || [],
      }));

      setItemList(transformedList);
      setMenudatalist(menuData);
      setClosedItems([])
    } else {
      if (SearchedmenuItem?.subCategoryResponseList) {
        const filterdItem: any = {
          categoryName: SearchedmenuItem?.categoryName,
          categoryId: SearchedmenuItem?.categoryId,
          subCategoryResponseList: SearchedmenuItem?.subCategoryResponseList,
          itemResponseList: null,
        };
        setItemList([filterdItem]);
        setMenudatalist([filterdItem]);
        setClosedItems([])
      } else {
        const filterdItem = {
          categoryName: SearchedmenuItem?.categoryName,
          categoryId: SearchedmenuItem?.categoryId,
          itemResponseList: SearchedmenuItem?.itemResponseList,
        };
        setItemList([filterdItem]);
        setMenudatalist([filterdItem]);
        setClosedItems([])
      }
      // setLoading(false);
    }
  }, [menuData, SearchedmenuItem]);

  useEffect(() => {
    if (deleteMenuItemSuccess && modal) {
      setmodal(false);
    }
  }, [deleteMenuItemSuccess]);

  useEffect(() => {
    if((menuDataSuccess || menuDataFailed) && !menuDataLoading){
      setLoading(false)
    }
  },[menudatalist])

  useEffect(() => {
    if (Array.isArray(editData) && editData?.length > 0) {
      const primaryPageData = {
        itemName: editData[0]?.itemName ?? "",
        itemId: editData[0]?.itemId ?? "",
        description: editData[0]?.description ?? "",
        imageUrls: editData[0]?.mediaResponseList ?? [],
        alcohol: editData[0]?.containsAlcohol ?? false,
        itemCode: editData[0]?.itemCode ?? "",
        barCode: editData[0]?.barCode ?? "",
        Ingredients:
          editData[0]?.ingredients?.map(
            (ingredient: any) => ingredient?.id ?? ""
          ) ?? [],
        allergens:
          editData[0]?.allergens?.map((allergen: any) => allergen?.id ?? "") ??
          [],
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
        exclusiveItem: editData[0]?.exclusiveItem ?? false,
      };

      const pricingPageData = {
        kitchenstation: editData[0]?.kitchenStation?.name ?? "",
        ignoreMasterKotPrint: editData[0]?.ignoreMasterKotPrint ?? false,
        normalForm: {
          deliveryDetails: null,
          dineInDetails: null,
          pickupDetails: null,
          thirdpartyDetails: [] as any[],
          availableDaysnew : editData[0]?.availabilities?.length > 0 && editData[0]?.availabilities[0]?.weekDays,
        },
        Preparationtime: {
          hours: editData[0]?.preparationTimeInHours || "",
          minutes: editData[0]?.preparationTimeInMinutes || "",
        },
        isSeasonalItem: editData[0]?.isSeasonalItem,
        startDate: editData[0]?.startDate,
        endDate: editData[0]?.endDate,
        availabilities: editData[0]?.availabilities,
        isStandardAvailability: editData[0]?.isStandardAvailability
      };

      editData[0]?.orderTypes?.forEach((orderType: any) => {
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
            pricingPageData?.normalForm?.thirdpartyDetails?.push(orderType);
            break;
          default:
            break;
        }
      });

      const modifierData = editData[0]?.modifiers?.map((item: any) => ({
        id: item?.id ?? "",
        isEnabled: item?.isEnabled,
        modifierName: item?.modifierName ?? "",
        maxCount: item?.maxCount ?? 0,
        minCount: item?.minCount ?? 0,
        noFreeCustomization: item?.noFreeCustomization ?? false,
        selectedValue: item?.orderTypeIds ?? [],
        options:
          item?.options?.map((option: any) => ({
            optionId: option?.optionId ?? "",
            // isEnabled: option?.isEnabled,
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

  // Open/close the category on clicking the arrow
  const toggleItem = (categoryId: string) => {
    setClosedItems((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Open/close the subcategory on clicking the arrow
  const toggleSubCategory = (subCategoryId: string) => {
    setOpenSubItems((prev) =>
      prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };


  useEffect(() => {
    if(SearchedmenuItem?.subCategoryResponseList){
      setOpenSubItems([])
    }
    setOpenSubItems([])
  },[SearchedmenuItem, menuData])

  const handlemodal = (value?: any) => {
    const filteredItem: any = menuData.find((item: any) =>
      item?.itemResponseList?.some(
        (response: any) => response?.itemId === value
      )
    );

    const allItemResponseLists = menuData
      ?.flatMap((category: any) =>
        category?.subCategoryResponseList?.map((subCategory: any) => ({
          categoryId: category.categoryId,
          categoryName: category?.categoryName,
          subCategoryId: subCategory?.subCategoryId,
          subCategoryName: subCategory?.subCategoryName,
          itemResponseList: subCategory?.itemResponseList,
        }))
      )
      .filter((item) =>
        item?.itemResponseList?.map((data: any) => data.itemId === value)
      );
    const filtesubItems = allItemResponseLists.find((item) =>
      item?.itemResponseList?.some(
        (response: any) => response?.itemId === value
      )
    );

    if (filteredItem) {
      setCategoryData({
        name: filteredItem?.categoryName,
        id: filteredItem?.categoryId,
      });

      const specificResponse = filteredItem.itemResponseList?.filter(
        (response: any) => response?.itemId === value
      );

      if (specificResponse.length > 0) {
        setSideBar(specificResponse);
        dispatch(
          selectedCategory({
            name: filteredItem?.categoryName,
            id: filteredItem?.categoryId,
          })
        );
        dispatch(selectedMockDataRequest(specificResponse));
        setmodal(true);
      }
    } else {
      setCategoryData({
        name: filtesubItems?.categoryName,
        id: filtesubItems?.categoryId,
      });

      const specificResponse = filtesubItems?.itemResponseList
        ?.filter((response: any) => response?.itemId === value)
        ?.map((response: any) => ({
          ...response,
          subCategoryName: filtesubItems?.subCategoryName,
          subCategoryId: filtesubItems?.subCategoryId,
        }));

      if (specificResponse?.length > 0) {
        setSideBar(specificResponse);
        dispatch(
          selectedCategory({
            name: filteredItem?.categoryName,
            id: filteredItem?.categoryId,
          })
        );
        dispatch(selectedMockDataRequest(specificResponse));
        setmodal(true);
      }
    }
  };

  const showsidebar = (key: any) => {
    if (key.endsWith("1")) {
      setSideBarText("Pricing");
      handlemodal();
    } else if (key.endsWith("2")) {
      setSideBarText("Availability");
      handlemodal();
    } else if (key === "Customize") {
      setSideBarText("Customize");
      handlemodal();
    }
  };

  const handlesidbarhandling = (key: any, value: any) => {
    showsidebar(key);
    handlemodal(value);
  };

  return (
    <div className="menuV2-container">
      <SidePanel />

      <div className="v2-menu">
        <HeaderV2 />

        <div className="v2-menuList-header">
          <p>Item Name</p>

          <div className="menuRight">
            <p>Availability Channels</p>
            <p>Base Price</p>
          </div>
        </div>

        {!menuDataLoading && !loading ? (
          menudatalist?.length > 0 ? 
          (<div className="v2-menuContainer">
            {menudatalist?.map((category: any) => (
              <>
                {(category?.itemResponseList?.length > 0 ||
                  category?.subCategoryResponseList?.length > 0) && (
                  <div 
                    className="v2-itemHeader"
                    onClick={() => toggleItem(category?.categoryId)}
                  >
                    <p>{`${category?.categoryName} ${
                      category?.itemResponseList?.length > 0
                        ? `- ${category?.itemResponseList?.length}`
                        : ""
                    }`}</p>
                    <img
                      src={itemArrow}
                      alt="item-arrowHeader"
                      className={`subCategory-arrow ${
                        closedItems.includes(category?.categoryId) ? "open" : ""
                      }`}
                    />
                  </div>
                )}

                <div
                  className={`v2-item-container ${
                    closedItems.includes(category?.categoryId) ? "" : "open"
                  }`}
                >
                  {category?.itemResponseList?.length > 0 &&
                    category?.itemResponseList?.map((item: any) => {
                      const dineInPrice = item?.orderTypes?.find(
                        (order: any) => order?.typeGroup === "D"
                      )?.price;

                      const formattedPrice = dineInPrice
                        ? `${String(Math.floor(dineInPrice)).padStart(
                            2,
                            "0"
                          )}.${(dineInPrice % 1).toFixed(2).slice(2)}`
                        : "00.00";

                      const activeOrderTypes = item?.orderTypes
                        .map((typeName: any) => {
                          return (
                            typeName?.typeGroup !== "I" &&
                            typeName?.isEnabled == 1 &&
                            typeName?.availabilityEnabled &&
                            typeName?.typeName
                          );
                        })
                        .filter(Boolean);

                      // const filteredOrderTypes = item?.orderTypes?.filter(
                      //   (type: any) => type.typeGroup !== "I"
                      // );
                      const filteredOrderTypes =
                        selectedBranch?.orderTypes?.filter(
                          (type: any) =>
                            type?.typeGroup !== "I" && type?.isEnabled == 1
                        );
                      const allChannels =
                        activeOrderTypes?.length === filteredOrderTypes?.length;

                      return (
                        <div
                          className="v2-itemData"
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handlemodal(item?.itemId)
                            handlesidbarhandling('1', item?.itemId)
                          }
                        }
                        >
                          <p>{item?.itemName}</p>
                          <div className="itemRight">
                            <img
                              src={
                                allChannels
                                  ? channelIcon
                                  : activeOrderTypes?.length < 1
                                  ? noneAvail
                                  : notAllChannel
                              }
                              onClick={(e) => {
                                e.stopPropagation()
                                handlesidbarhandling('2', item?.itemId)
                              }}  
                              alt="channelIcon"
                              className="channelIcon"
                              onMouseEnter={() => setHoveredItem(item?.itemId)}
                              onMouseLeave={() => setHoveredItem(null)}
                            />
                            <p className="v2-item-price">{`${
                              location === "US" ? "$" : "Rs."
                            }${formattedPrice}`}</p>
                            {hoveredItem === item?.itemId && (
                              <ToolTips
                                activeOrderTypes={activeOrderTypes}
                                allChannels={allChannels}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}

                  {category?.subCategoryResponseList?.map(
                    (item: any, subIndex: number) => (
                      <div key={subIndex}>
                        {item?.itemResponseList?.length > 0 && (
                          <div 
                            className="v2-sub-item"
                            onClick={() =>
                              toggleSubCategory(item?.subCategoryId)
                            }
                          >
                            <p>{`${item?.subCategoryName} - ${
                              item?.itemResponseList?.length > 0
                                ? item?.itemResponseList?.length
                                : ""
                            }`}</p>
                            <img
                              src={itemArrow}
                              alt="subCategory-arrow"
                              className={`subCategory-arrow ${
                                (openSubItems.includes(item?.subCategoryId))
                                  ? "open"
                                  : ""
                              }`}
                            />
                          </div>
                        )}

                        {!(openSubItems.includes(item?.subCategoryId)) &&
                          item?.itemResponseList?.map(
                            (subItem: any, itemIndex: number) => {
                              const dineInPrice = subItem?.orderTypes?.find(
                                (order: any) => order?.typeGroup === "D"
                              )?.price;

                              const formattedPrice = dineInPrice
                                ? `${String(Math.floor(dineInPrice)).padStart(
                                    2,
                                    "0"
                                  )}.${(dineInPrice % 1).toFixed(2).slice(2)}`
                                : "00.00";

                              const activeOrderTypes = subItem?.orderTypes
                                .map((typeName: any) => {
                                  return (
                                    typeName?.typeGroup !== "I" &&
                                    typeName?.isEnabled == 1 &&
                                    typeName?.availabilityEnabled &&
                                    typeName?.typeName
                                  );
                                })
                                .filter(Boolean);

                              const filteredOrderTypes =
                                selectedBranch?.orderTypes?.filter(
                                  (type: any) =>
                                    type?.typeGroup !== "I" &&
                                    type?.isEnabled == 1
                                );
                              const allChannels =
                                activeOrderTypes?.length ===
                                filteredOrderTypes?.length;
                              
                              return (
                                
                                <div
                                  className="v2-itemData"
                                  key={itemIndex}
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    handlemodal(subItem?.itemId)
                                    handlesidbarhandling('1', subItem?.itemId)}
                                  }
                                >
                                  <p className="v2-itemName">
                                    {subItem?.itemName}
                                  </p>
                                  <div className="itemRight">
                                    <img
                                      src={
                                        allChannels
                                          ? channelIcon
                                          : activeOrderTypes?.length < 1
                                          ? noneAvail
                                          : notAllChannel
                                      }
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handlesidbarhandling('2', subItem?.itemId)
                                      }}
                                      alt="channelIcon"
                                      className="channelIcon"
                                      onMouseEnter={() =>
                                        setHoveredItem(subItem?.itemId)
                                      }
                                      onMouseLeave={() => setHoveredItem(null)}
                                    />
                                    <p className="v2-item-price">{`${
                                      location === "US" ? "$" : "Rs."
                                    }${formattedPrice}`}</p>
                                    {hoveredItem === subItem?.itemId && (
                                      <ToolTips
                                        activeOrderTypes={activeOrderTypes}
                                        allChannels={allChannels}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          )}
                      </div>
                    )
                  )}
                </div>
              </>
            ))}
          </div>) 
          : 
          (<div className="no-results-found">
            <img 
              src={NotFound} 
              alt="noResult" 
              style={{width:'400px', height:'400px'}}
            />
            <p>No Results Found</p>
          </div>)
        ) : (
          <div className="loader-conatainer">
            <Loader
              className="v2-imgLoader2"
              style={{
                filter:
                  "invert(18%) sepia(93%) saturate(7494%) hue-rotate(357deg) brightness(92%) contrast(88%)",
              }}
            />
          </div>
        )}
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

export default Menu;
