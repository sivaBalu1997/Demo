import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";
import SidePanel from "pages/SidePanel/indexOld";
import { SPOfferListRequest } from "redux/offer/offerActions";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import noResultsfound from "../../../assets/images/NoResultsFound.png";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import arrow from "../../../assets/svg/arrow-down.svg";

const Table = () => {
  const { isExpanded } = useContext(Contextpagejs);
  const locationId = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SPOfferListRequest(locationId));
  }, []);

  const offerlistdata = useSelector(
    (state: any) => state.offer.SpofferListSuccessResponse
  );

  const offerlistdataloading = useSelector(
    (state: any) => state.offer.SpOfferListLoading
  );
  const SpOfferlistSuccess = useSelector(
    (state: any) => state.offer.SpOfferlistSuccess
  );

  const offerlistdatafailed = useSelector(
    (state: any) => state.offer.SpofferListFailureResponse
  );

  console.log({ offerlistdata });
  const [loading, setLoding] = useState(false);
  const [offerListDataArray, setOfferListDataArray] = useState([]);
  useEffect(() => {
    setOfferListDataArray(
      offerlistdata.filter((item: any) => item?.isEnabled !== 2)
    );
    setActiveIndex(null);
  }, [offerlistdata]);
  useEffect(() => {
    if (SpOfferlistSuccess) {
      const data = offerlistdata?.filter((item: any) => item.isEnabled !== 2);
      setOfferListDataArray(data);
      if (data.length > 0) {
        setLoding(false);
      } else {
        setLoding(true);
      }
    }
    setActiveIndex(null);
  }, [offerlistdata]);

  const [showFullitems, setShowFullItems] = useState(false);
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

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const isChannelAvailable = (channel: string[]) => {
    // console.log({channel});

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
        {showFullitems
          ? itemNames?.join(", ")
          : itemNames?.slice(0, maxVisibleItems).join(", ")}

        {items?.length > maxVisibleItems && (
          <span
            className="extra-items"
            onClick={() => setShowFullItems(!showFullitems)}
          >
            {!showFullitems ? (
              <> +{items?.length - maxVisibleItems} Items</>
            ) : (
              <>show less</>
            )}
          </span>
        )}
      </>
    );

    // return(
    //   <>
    //   {
    //     itemNames?.map((items,index)=>(
    //       <span className="extra-items">{items}</span>
    //     ))
    //   }
    //   </>
    // )
  };
  const countryC = restaurantDetails?.country;

  const convertTo12HourFormat = (time24: any) => {
    if (!time24) {
      return "";
    }

    const [hours, minutes] = time24.split(":");

    if (hours === undefined || minutes === undefined) {
      return "";
    }

    let hours12 = parseInt(hours);
    const ampm = hours12 >= 12 ? "PM" : "AM";
    hours12 = hours12 % 12;
    hours12 = hours12 ? hours12 : 12;

    return `${hours12.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  return (
    <div className={isExpanded ? " offerTable" : "offerTable1"}>
      <SidePanel />
      <div className="offerTableBody">
        <OfferHeader />
        <div className={isExpanded ? "table-container" : "table-container1"}>
          <table className={isExpanded ? "OffersTableo" : "OffersTable1o"}>
            <thead className="OfferTableHeadingo">
              <tr className="">
                <th className="OffrtsTabletho">Name</th>
                <th className="OffrtsTabletho">Duration</th>
                <th className="OffrtsTabletho">Channel</th>
                <th className="OffrtsTabletho">Items</th>
                <th className="OffrtsTabletho">Total Items</th>
                <th className="OffrtsTabletho">Special Price</th>
                <th className="OffrtsTabletho"></th>
              </tr>
            </thead>
            <tbody className={offerlistdataloading && "table-body-data-offer"}>
              {offerlistdataloading ? (
                <div className="Menu-noOptions-offertable">
                  <Loader
                    className="imgLoader2-offer"
                    height="100px"
                    width="100px"
                    style={{
                      filter:
                        "invert(18%) sepia(93%) saturate(7494%) hue-rotate(357deg) brightness(92%) contrast(88%)",
                    }}
                  />
                </div>
              ) : offerlistdatafailed ||
                (offerListDataArray.length === 0 &&
                  SpOfferlistSuccess &&
                  loading) ? (
                <div className="NoDataFoundContainer-offer">
                  <img
                    className="columnselected"
                    src={noResultsfound}
                    alt="noResultFound"
                  />
                  <h2 className="columnselectedText">No Results Found</h2>
                </div>
              ) : (
                offerlistdataloading === false &&
                offerListDataArray?.map(
                  (row: any, index: number) =>
                    row.isEnabled !== 2 && (
                      <tr key={index} className="OffrtsTabletr">
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                          }}
                        >
                          {row?.offerName}
                        </td>
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                          }}
                        >
                          <p className="duration">
                            {convertTo12HourFormat(
                              row?.effectivePeriod?.startTime
                            )}{" "}
                            -{" "}
                            {convertTo12HourFormat(
                              row?.effectivePeriod?.endTime
                            )}
                          </p>
                          <DaysWeekOffer
                            highlightedDays={row?.effectivePeriod?.validDays}
                          />
                        </td>
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                          }}
                        >
                          {isChannelAvailable(row.channel)}
                        </td>
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                          }}
                        >
                          {renderItems(row?.items)}
                        </td>
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                          }}
                        >
                          {row?.totalItems}
                        </td>
                        <td
                          className="OffrtsTabletd"
                          style={{
                            opacity: row.isEnabled === 0 ? "50%" : "100%",
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "center",
                            position: "absolute",
                            marginTop: "10px",
                            gap: "0.5rem",
                          }}
                        >
                          {row.type === "PERCENT" && (
                            <>
                              {`${row?.value}%`}
                              {row.specialType === "HAPPY HOUR" ? (
                                <img
                                  src={arrow}
                                  alt=""
                                  className="down-arrow-price"
                                />
                              ) : (
                                <img src={arrow} alt="" />
                              )}
                            </>
                          )}
                          {row.type === "FLATFEE" && (
                            <>
                              {countryC === "US" ? "$" : "RS"}
                              {row.value}
                              {row.specialType === "HAPPY HOUR" ? (
                                <img
                                  src={arrow}
                                  alt=""
                                  className="down-arrow-price"
                                />
                              ) : (
                                <img src={arrow} alt="" />
                              )}
                            </>
                          )}
                        </td>
                        <td className="OffrtsTabletd">
                          <div
                            className={
                              isExpanded
                                ? "spaction-container1"
                                : "spaction-container"
                            }
                            ref={componentRef}
                          >
                            <div
                              className="action-icon-container"
                              onClick={() => handleOfferDropdown(index)}
                            >
                              <img
                                src={ThreeDotsImage}
                                width="5"
                                height="20"
                                alt="Actions"
                              />
                            </div>

                            {activeIndex === index && (
                              <div className="OffersDropDownTable">
                                <OfferDropDown
                                  EnableorNot={row.isEnabled}
                                  offerData={row}
                                />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
