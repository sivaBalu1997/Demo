import React from "react";
import "./Menu120.scss";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Menu120 = () => {

  const menuData = useSelector((state) => state.productCatalog?.menuData);
  const outletName = useSelector((state) => state.auth?.restaurantDetails?.branchName);

 
  const data = [
    {
      OutletName: outletName,
      Live: "Live(100)",
      Unavailable: "Unavailable(10)",
      Hidden: "Hidden(10)",
    },

    // {
    //   OutletName: "Outlet2",
    //   Live: "Live(100)",
    //   Unavailable: "Unavailable(10)",
    //   Hidden: "Hidden(10)",
    // },
  ];

  const itemIds = menuData?.flatMap(category =>
    category.itemResponseList ? category?.itemResponseList?.map(item => item?.itemId) : []
  );

  // const subCategoryArray = menuData?.flatMap(category => category.subCategoryResponseList ? category?.itemResponseList?.map(item => item?.itemid) : [])
  // console.log({ subCategoryArray })

 

  // Function to extract and combine all itemResponseLists (outer and inner)
  const getCombinedItems = () => {
    const combinedItems = [];

    // Loop through the menuData and extract the necessary itemResponseList
    menuData.forEach(category => {
      // Add the outer itemResponseList (optional chaining used here)
      category?.itemResponseList?.forEach(item => combinedItems.push(item));

      // Loop through each subcategory (using optional chaining here as well)
      category?.subCategoryResponseList?.forEach(subCategory => {
        subCategory?.itemResponseList?.forEach(item => combinedItems.push(item));
      });
    });

    return combinedItems || [];
  };

  // Get the combined items (without deduplication)
  const combinedItems = getCombinedItems();

  // Get the length of the combined items array
  const itemCount = combinedItems?.length || 0;

 

  // const combinedItemList = [
  //   ...menuData?.itemResponseList,
  //   ...menuData?.subCategoryResponseList?.flatMap(subCategory => subCategory?.itemResponseList)
  // ];

  // // Log the length of the combined array
  // console.log(combinedItemList?.length);
  // console.log({ combinedItemList })

  return (
    <>
      <div className="Header-Heading">
        Menu({itemCount})
        {/* <div className="Menu120-Tooltip-container">
          {data.map((elem, index) => (
            <div className="Menu120-Tooltip-container-heading" key={index}>
              <div className="Menu120-Heading"> {elem?.OutletName?.split(",")[0]}</div>
              <div className="Menu120-sub-Heading">{elem.Live}</div>
              <div className="Menu120-sub-Heading">{elem.Unavailable}</div>
              <div className="Menu120-sub-Heading">{elem.Hidden}</div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default Menu120;
