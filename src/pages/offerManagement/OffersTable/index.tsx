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

const Table = () => {
  const { isExpanded } = useContext(Contextpagejs);
const locationId="969c059b-6597-47a8-b175-08658e9bf41c"
const dispatch=useDispatch();
  useEffect(()=>{

    dispatch(SPOfferListRequest(locationId));
  },[])

const offerlistdata=useSelector((state:any)=>state.offer.SpofferListSuccessResponse)
// console.log({offerlistdata});

const [offerListDataArray,setOfferListDataArray]=useState([])
useEffect(()=>{
  setOfferListDataArray(offerlistdata);


},[offerlistdata])

 const offerdata= [
    {
      "offerId": "OFFER123",
      "offerName": "Summer Sale",
      "isEnabled": true,
     "channel": [
            "02feb858-c58d-48c5-8dd4-9a173390b4eb",
            "cd5996ed-7201-4faf-b996-5757aa684ad8",
            "bc534a3f-4080-4014-83b5-aeb5cee93d95"
        ],
      "effectivePeriod": {
        "isDateEnabled": true,
        "StartDate": "2024-12-01",
        "endDate": "2024-12-31"
      },
      "startTime": "10:00:00",
      "endTime": "20:00:00",
      "validDays": [1, 2, 3, 4, 5, 6, 7],
      "items": [
        { "itemId": "ITEM001", "itemName": "Laptop" },
        { "itemId": "ITEM002", "itemName": "Smartphone" },
        { "itemId": "ITEM003", "itemName": "Headphones" },
        { "itemId": "ITEM004", "itemName": "Smartwatch" },
        { "itemId": "ITEM005", "itemName": "Tablet" }
      ],
      "totalItems": 5,

       "type": "PERCENT",
        "value": 10.0 
    },
    {
      "offerId": "OFFER124",
      "offerName": "Winter Bonanza",
      "isEnabled": true,
     "channel": [
            "bc534a3f-4080-4014-83b5-aeb5cee93d95"
        ],
      "effectivePeriod": {
        "isDateEnabled": true,
        "StartDate": "2024-01-01",
        "endDate": "2024-01-15"
      },
      "startTime": "09:00:00",
      "endTime": "18:00:00",
      "validDays": [1, 2, 3, 4, 5],
      "items": [
        { "itemId": "ITEM006", "itemName": "TV" },
        { "itemId": "ITEM007", "itemName": "Refrigerator" },
        { "itemId": "ITEM008", "itemName": "Microwave" },
        { "itemId": "ITEM009", "itemName": "Washing Machine" },
        { "itemId": "ITEM010", "itemName": "Air Conditioner" }
      ],
      "totalItems": 5,
       "type": "FLATFEE", 
       "value": 500.0 

    },
    {
      "offerId": "OFFER125",
      "offerName": "Flash Sale",
      "isEnabled": false,
      "channel": [
            "02feb858-c58d-48c5-8dd4-9a173390b4eb",
            "cd5996ed-7201-4faf-b996-5757aa684ad8",
            "bc534a3f-4080-4014-83b5-aeb5cee93d95"
        ],
      "effectivePeriod": {
        "isDateEnabled": false,
        "StartDate": null,
        "endDate": null
      },
      "startTime": "12:00:00",
      "endTime": "15:00:00",
      "validDays": [6, 7],
      "items": [
        { "itemId": "ITEM011", "itemName": "Gaming Console" },
        { "itemId": "ITEM012", "itemName": "Gaming Chair" },
        { "itemId": "ITEM013", "itemName": "Monitor" },
        { "itemId": "ITEM014", "itemName": "Keyboard" },
        { "itemId": "ITEM015", "itemName": "Mouse" }
      ],
      "totalItems": 5,
      "type": "PERCENT", "value": 15.0 
    },
    {
      "offerId": "OFFER126",
      "offerName": "Festive Deals",
      "isEnabled": true,
      "channel": [
        "23864e56-e70d-4838-b5b4-eebe07e2bb63"
    ],
      "effectivePeriod": {
        "isDateEnabled": true,
        "StartDate": "2024-12-15",
        "endDate": "2025-01-15"
      },
      "startTime": "08:00:00",
      "endTime": "22:00:00",
      "validDays": [1, 2, 3, 4, 5, 6, 7],
      "items": [
        { "itemId": "ITEM016", "itemName": "Sofa" },
        { "itemId": "ITEM017", "itemName": "Bed" },
        { "itemId": "ITEM018", "itemName": "Dining Table" },
        { "itemId": "ITEM019", "itemName": "Chair" },
        { "itemId": "ITEM020", "itemName": "Wardrobe" },
        { "itemId": "ITEM016", "itemName": "Sofa" },
        { "itemId": "ITEM017", "itemName": "Bed" },
        { "itemId": "ITEM018", "itemName": "Dining Table" },
        { "itemId": "ITEM019", "itemName": "Chair" },
        { "itemId": "ITEM020", "itemName": "Wardrobe" }
      ],
      "totalItems": 5,
     "type": "FLATFEE", "value": 1000.0 
    },
    {
      "offerId": "OFFER127",
      "offerName": "Back to School",
      "isEnabled": true,
      "channel": [
        "23864e56-e70d-4838-b5b4-eebe07e2bb63"
    ],
      "effectivePeriod": {
        "isDateEnabled": true,
        "StartDate": "2024-06-01",
        "endDate": "2024-06-30"
      },
      "startTime": "09:00:00",
      "endTime": "19:00:00",
      "validDays": [1, 2, 3, 4, 5],
      "items": [
        { "itemId": "ITEM021", "itemName": "Backpack" },
        { "itemId": "ITEM022", "itemName": "Stationery Kit" },
        { "itemId": "ITEM023", "itemName": "Notebook" },
        { "itemId": "ITEM024", "itemName": "Lunchbox" },
        { "itemId": "ITEM025", "itemName": "Water Bottle" }
      ],
      "totalItems": 5,
      "type": "PERCENT", "value": 5.0 
    }
  ]
  

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleOfferDropdown = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const restaurantDetails = useSelector(
    (state:any) => state.auth.restaurantDetails
  );
  // console.log(restaurantDetails.orderTypes);
  

  const handleClickOutside = (event: MouseEvent) => {
    if (componentRef.current && !componentRef.current.contains(event.target as Node)) {
      setActiveIndex(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 
 

        const isChannelAvailable = (channel: string[]) => {
          // console.log({channel});
          
          const orderTypeNames = restaurantDetails?.orderTypes
            ?.filter((orderType:any) =>channel && channel?.includes(orderType.id))
            .map((orderType:any) => orderType?.typeName);
        
          return orderTypeNames.join(', ');
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
  const countryC = restaurantDetails?.country;
  return (
    <div className={isExpanded ? " offerTable" : "offerTable1"}>
      <SidePanel />
      <div className="offerTableBody">
        <OfferHeader />
        <div className={isExpanded ? "table-container" : "table-container1"}>
          <table className={isExpanded ? "OffersTable" : "OffersTable1"}>
            <thead className="OfferTableHeading">
              <tr className="">
                <th className="OffrtsTableth">Name</th>
                <th className="OffrtsTableth">Duration</th>
                <th className="OffrtsTableth">Channel</th>
                <th className="OffrtsTableth">Items</th>
                <th className="OffrtsTableth">Total Items</th>
                <th className="OffrtsTableth">Special Price</th>
                <th className="OffrtsTableth"></th>
              </tr>
            </thead>
            <tbody>
  {offerListDataArray?.map((row: any, index: number) => (
    row.isEnabled !==2&& (
      <tr key={index} className="OffrtsTabletr">
        <td className="OffrtsTabletd">{row?.offerName}</td>
        <td className="OffrtsTabletd">
          <p className="duration">
            {row?.effectivePeriod?.startTime} - {row?.effectivePeriod?.endTime}
          </p>
          <DaysWeekOffer highlightedDays={row?.effectivePeriod?.validDays} />
        </td>
        <td className="OffrtsTabletd">{isChannelAvailable(row.channel)}</td>
        <td className="OffrtsTabletd">{renderItems(row?.items)}</td>
        <td className="OffrtsTabletd">{row?.totalItems}</td>
        <td className="OffrtsTabletd">
          {row.type === "PERCENT" ? `${row?.value}%` : null}
          {row.type === "FLATFEE" ? `${countryC === "US" ? "$" : "RS"}${row.value}` : null}
        </td>
        <td className="OffrtsTabletd">
          <div className="action-container" ref={componentRef}>
            <img
              src={ThreeDotsImage}
              width="5"
              height="20"
              onClick={() => handleOfferDropdown(index)}
              alt="Actions"
            />
            {activeIndex === index && (
              <div className="OffersDropDownTable">
                <OfferDropDown />
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

export default Table;
