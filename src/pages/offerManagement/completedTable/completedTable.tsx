import SidePanel from "pages/SidePanel";
import React, { useContext, useEffect, useRef, useState } from "react";
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { SPOfferListRequest,SPOfferListDelete,SPOfferListDisable, } from "redux/offer/offerActions";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import noResultsfound from "../../../assets/images/NoResultsFound.png";

const CompletedTable = () => {
 

  const { isExpanded } = useContext(Contextpagejs);
  const locationId = "969c059b-6597-47a8-b175-08658e9bf41c";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SPOfferListRequest(locationId));
  }, []);

  const offerlistdata = useSelector(
    (state: any) => state.offer.SpofferListSuccessResponse
  );
  const offerlistdataloading=useSelector((state:any)=>state.offer.SpOfferListLoading)

const offerlistdatafailed=useSelector((state:any)=>state.offer.SpofferListFailureResponse)
  // console.log({ offerlistdata });

  const [offerListDataArray, setOfferListDataArray] = useState([]);
  useEffect(() => {
    setOfferListDataArray(offerlistdata);
  }, [offerlistdata]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleOfferDropdown = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const restaurantDetails = useSelector(
    (state: any) => state.auth.restaurantDetails
  );
  // console.log(restaurantDetails.orderTypes);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      setActiveIndex(null);
    }
  };
  const convertTo12HourFormat = (time24: any) => {
    if (!time24) {
      return ''; 
    }
  
    const [hours, minutes] = time24.split(':'); 
    
    if (hours === undefined || minutes === undefined) {
      return ''; 
    }
  
    let hours12 = parseInt(hours);
    const ampm = hours12 >= 12 ? 'PM' : 'AM';
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12; 
  
    return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const isChannelAvailable = (channel: string[]) => {
    // console.log({ channel });

    const orderTypeNames = restaurantDetails?.orderTypes
      ?.filter((orderType: any) => channel && channel?.includes(orderType.id))
      .map((orderType: any) => orderType?.typeName);

    return orderTypeNames.join(", ");
  };

  const renderItems = (items: { itemId: string; itemName: string }[]) => {
    const maxVisibleItems = 5;

    const itemNames = items?.map((item) => item?.itemName);

    return (
      <>
        {itemNames?.slice(0, maxVisibleItems).join(", ")}
        {items?.length > maxVisibleItems && (
          <span className="extra-items">
            +{items?.length - maxVisibleItems} Items
          </span>
        )}
      </>
    );
  };
  const [expandedRows, setExpandedRows] = useState<boolean[]>([]);
  const handleShowRemainingItems = (index: number) => {
    setExpandedRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = !updatedRows[index];
      return updatedRows;
    });
  };
  // const renderItems = (items: { itemId: string; itemName: string }[], index: number) => {
  //   const maxVisibleItems = 5;
  //   const itemNames = items?.map((item) => item?.itemName);

  //   const displayedItems = expandedRows[index]
  //     ? itemNames
  //     : itemNames?.slice(0, maxVisibleItems);

  //   return (
  //     <>
  //       {displayedItems?.join(", ")}
  //       {items?.length > maxVisibleItems && !expandedRows[index] && (
  //         <span
  //           className="extra-items"
  //           onClick={() => handleShowRemainingItems(index)} // Toggle show remaining items
  //         >
  //           +{items?.length - maxVisibleItems} Items
  //         </span>
  //       )}
  //     </>
  //   );
  // };


  const countryC = restaurantDetails?.country;
const handledeleteoffer=(offerid:string,EnabledorNot:number)=>{


  const disableOffer={
    offerId:offerid,
    toEnable:EnabledorNot===1||EnabledorNot===2?false:true

  }
  // dispatch(SPOfferListDelete(offerid))
  

  dispatch(SPOfferListDisable(disableOffer))
}
  return (
    <div className={isExpanded ? "completedTable" : "completedTable1"}>
      <SidePanel />
      <div className="completedTableBody">
        <OfferHeader />
        <div
          className={
            isExpanded
              ? "completedtable-container"
              : "completedtable-container1"
          }
        >
          <table
            className={isExpanded ? "completedTablee" : "completedTablee1"}
          >
            <thead>
              <tr className="completedtsTabletr">
                <th className="completedtsTableth">Name</th>
                <th className="completedtsTableth">Duration</th>
                <th className="completedtsTableth">Channel</th>
                <th className="completedtsTableth">Items</th>
                <th className="completedtsTableth"  >Total Items</th>
                <th className="completedtsTableth">Special Price</th>
                <th className="completedtsTableth"></th>
              </tr>
            </thead>
          
            <tbody>{
            offerlistdataloading ? <div className="Menu-noOptions-offer">
  <Loader
    className="imgLoader2-offer"
    height="100px"
    width="100px"
    style={{
      filter:
        "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
    }}
  />
</div>:offerlistdatafailed? <div className="NoDataFoundContainer-offer">
<img
  className="columnselected"
  src={noResultsfound}
  alt="noResultFound"
/>
<h2 className="columnselectedText">
  No Results Found
</h2>
</div>:
              offerListDataArray.map((row: any, index) => (


                row.isEnabled!==1&& (
                  <tr key={index} className="completedtsTabletr">
                  <td className="completedtsTabletd" style={{opacity:row.isEnabled===0?"50%":"100%"}}>{row.offerName}</td>
                  <td className="completedtsTabletd" style={{opacity:row.isEnabled===0?"50%":"100%"}}>
                    <p className="duration">
                      <span>
                      {convertTo12HourFormat(row?.effectivePeriod?.startTime)} - {convertTo12HourFormat(row?.effectivePeriod?.endTime)}

                      </span>
                      {row.date}
                    </p>
                    <DaysWeekOffer highlightedDays={row?.effectivePeriod?.validDays} />
                  </td>
                  <td className="completedtsTabletd" style={{opacity:row.isEnabled===0?"50%":"100%"}}>
                    {isChannelAvailable(row.channel)}
                  </td>
                  <td className="completedtsTabletd" style={{opacity:row.isEnabled===0?"50%":"100%"}}>
                    {renderItems(row.items)}
                  </td>
                  <td className="completedtsTabletd totalitem" style={{opacity:row.isEnabled===0?"50%":"100%"}}>{row?.totalItems}</td>

                  <td className="completedtsTabletd" style={{opacity:row.isEnabled===0?"50%":"100%"}}>
                    {row.type === "PERCENT" ? `${row?.value}%` : null}
                    {row.type === "FLATFEE"
                      ? `${countryC === "US" ? "$" : "RS"}${row.value}`
                      : null}
                  </td>
                  <td className="OffrtsTabletd">
                    <div className="action-container" ref={componentRef}>
                      <img
                        src={ThreeDotsImage}
                        width="5"
                        height="20"
                        // ref={componentRef}
                        onClick={() => handleOfferDropdown(index)}
                        alt="Actions"
                      />
                      {activeIndex === index && (
                        <div className="OffersDropDownTable">
                          <OfferDropDown EnableorNot={row.isEnabled} offerData={row}/>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                )


               
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompletedTable;
