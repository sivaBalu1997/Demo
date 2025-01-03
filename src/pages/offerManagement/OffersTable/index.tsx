import React, { useContext, useEffect, useRef, useState } from "react";
import "./style.scss";
import OfferHeader from "../../../components/offerManagement/OffersHeader";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import ThreeDotsImage from "../../../../src/assets/images/ThreeDots.png";
import DaysWeekOffer from "../../../components/offerManagement/DaysOfweekOffers";
import OfferDropDown from "../../../components/offerManagement/OfferDropdown";
import SidePanel from "pages/SidePanel";
import { SPOfferListRequest } from "redux/offer/offerActions";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Loader } from "../../../assets/svg/loader.svg";
import noResultsfound from "../../../assets/images/NoResultsFound.png";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

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

  const offerdata = [
    {
      offerId: "OFFER123",
      offerName: "Summer Sale",
      isEnabled: true,
      channel: [
        "02feb858-c58d-48c5-8dd4-9a173390b4eb",
        "cd5996ed-7201-4faf-b996-5757aa684ad8",
        "bc534a3f-4080-4014-83b5-aeb5cee93d95",
      ],
      effectivePeriod: {
        isDateEnabled: true,
        StartDate: "2024-12-01",
        endDate: "2024-12-31",
      },
      startTime: "10:00:00",
      endTime: "20:00:00",
      validDays: [1, 2, 3, 4, 5, 6, 7],
      items: [
        { itemId: "ITEM001", itemName: "Laptop" },
        { itemId: "ITEM002", itemName: "Smartphone" },
        { itemId: "ITEM003", itemName: "Headphones" },
        { itemId: "ITEM004", itemName: "Smartwatch" },
        { itemId: "ITEM005", itemName: "Tablet" },
      ],
      totalItems: 5,

      type: "PERCENT",
      value: 10.0,
    },
    {
      offerId: "OFFER124",
      offerName: "Winter Bonanza",
      isEnabled: true,
      channel: ["bc534a3f-4080-4014-83b5-aeb5cee93d95"],
      effectivePeriod: {
        isDateEnabled: true,
        StartDate: "2024-01-01",
        endDate: "2024-01-15",
      },
      startTime: "09:00:00",
      endTime: "18:00:00",
      validDays: [1, 2, 3, 4, 5],
      items: [
        { itemId: "ITEM006", itemName: "TV" },
        { itemId: "ITEM007", itemName: "Refrigerator" },
        { itemId: "ITEM008", itemName: "Microwave" },
        { itemId: "ITEM009", itemName: "Washing Machine" },
        { itemId: "ITEM010", itemName: "Air Conditioner" },
      ],
      totalItems: 5,
      type: "FLATFEE",
      value: 500.0,
    },
    {
      offerId: "OFFER125",
      offerName: "Flash Sale",
      isEnabled: false,
      channel: [
        "02feb858-c58d-48c5-8dd4-9a173390b4eb",
        "cd5996ed-7201-4faf-b996-5757aa684ad8",
        "bc534a3f-4080-4014-83b5-aeb5cee93d95",
      ],
      effectivePeriod: {
        isDateEnabled: false,
        StartDate: null,
        endDate: null,
      },
      startTime: "12:00:00",
      endTime: "15:00:00",
      validDays: [6, 7],
      items: [
        { itemId: "ITEM011", itemName: "Gaming Console" },
        { itemId: "ITEM012", itemName: "Gaming Chair" },
        { itemId: "ITEM013", itemName: "Monitor" },
        { itemId: "ITEM014", itemName: "Keyboard" },
        { itemId: "ITEM015", itemName: "Mouse" },
      ],
      totalItems: 5,
      type: "PERCENT",
      value: 15.0,
    },
    {
      offerId: "OFFER126",
      offerName: "Festive Deals",
      isEnabled: true,
      channel: ["23864e56-e70d-4838-b5b4-eebe07e2bb63"],
      effectivePeriod: {
        isDateEnabled: true,
        StartDate: "2024-12-15",
        endDate: "2025-01-15",
      },
      startTime: "08:00:00",
      endTime: "22:00:00",
      validDays: [1, 2, 3, 4, 5, 6, 7],
      items: [
        { itemId: "ITEM016", itemName: "Sofa" },
        { itemId: "ITEM017", itemName: "Bed" },
        { itemId: "ITEM018", itemName: "Dining Table" },
        { itemId: "ITEM019", itemName: "Chair" },
        { itemId: "ITEM020", itemName: "Wardrobe" },
        { itemId: "ITEM016", itemName: "Sofa" },
        { itemId: "ITEM017", itemName: "Bed" },
        { itemId: "ITEM018", itemName: "Dining Table" },
        { itemId: "ITEM019", itemName: "Chair" },
        { itemId: "ITEM020", itemName: "Wardrobe" },
      ],
      totalItems: 5,
      type: "FLATFEE",
      value: 1000.0,
    },
    {
      offerId: "OFFER127",
      offerName: "Back to School",
      isEnabled: true,
      channel: ["23864e56-e70d-4838-b5b4-eebe07e2bb63"],
      effectivePeriod: {
        isDateEnabled: true,
        StartDate: "2024-06-01",
        endDate: "2024-06-30",
      },
      startTime: "09:00:00",
      endTime: "19:00:00",
      validDays: [1, 2, 3, 4, 5],
      items: [
        { itemId: "ITEM021", itemName: "Backpack" },
        { itemId: "ITEM022", itemName: "Stationery Kit" },
        { itemId: "ITEM023", itemName: "Notebook" },
        { itemId: "ITEM024", itemName: "Lunchbox" },
        { itemId: "ITEM025", itemName: "Water Bottle" },
      ],
      totalItems: 5,
      type: "PERCENT",
      value: 5.0,
    },
  ];

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
                        "invert(45%) sepia(31%) saturate(435%) hue-rotate(72deg) brightness(91%) contrast(88%)",
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
                          }}
                        >
                          {row.type === "PERCENT" && (
                            <>
                              {`${row?.value}%`}
                              {row.specialType === "HAPPY HOUR" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              )}
                            </>
                          )}
                          {row.type === "FLATFEE" && (
                            <>
                              {countryC === "US" ? "$" : "RS"}
                              {row.value}
                              {row.specialType === "HAPPY HOUR" ? (
                                <FaArrowUp />
                              ) : (
                                <FaArrowDown />
                              )}
                            </>
                          )}
                        </td>
                        <td className="OffrtsTabletd">
                          <div className="action-container" ref={componentRef}>
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
