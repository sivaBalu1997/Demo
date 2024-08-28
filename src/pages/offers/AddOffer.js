import React, { useState } from "react";
import Plus from "../../assets/images/add.png";
import Back from "../../assets/images/back.png";
import { Link } from "react-router-dom";

const AddOffer = (props) => {
  let componentState = {
    id: null,
    locationId: null,
    offerName: "",
    offerCode: null,
    offerType: null,
    offerRate: null,
    minOrderAmount: 0,
    maxDiscount: null,
    maxRedeem: 0,
    redeemedSofar: 0,
    order_type_id: null,
    offerTerms: null,
    validityFrom: new Date(),
    validityUntil: new Date(),
    isEnabled: 1,
    offerAttributes: {
      description: null,
      outlets: [],
      validOn: [],
      usageFrequencePerCustomer: null,
      usagePerCustomerPerDay: null,
      maxUsageAcrossAllTranscation: null,
      visibleTo: [],
      currencyType: "INR",
      offerBasedOn: 1,
      itemDetails: {
        itemCode: null,
        itemQuantity: 0,
        discountType: null,
        offersAppliedAt: null,
        scaleLevel: [],
      },
    },
  };
  const [offerData, setOfferState] = useState(componentState);

  const [offerstatus, setofferstatus] = useState(false);

  const [offerDetails, setOfferDetails] = useState([
    {
      value: "Offers with rate% discount",
      id: "1",
      offer: [
        {
          value: "10% off upto Rs.100",
          id: "2",
          offerType: "PERCENT",
          discountType: "R",
          offerRate: 10,
          minOrderAmount: null,
          maxDiscount: 100,
          itemQuantity: null,
        },
        {
          value: "20% off upto Rs.100 on Minimum order of Rs.300",
          id: "3",
          offerType: "PERCENT",
          discountType: "R",
          offerRate: 20,
          minOrderAmount: 300,
          maxDiscount: 100,
          itemQuantity: null,
        },
      ],
    },
    {
      value: "Offers with flat discount",
      id: "4",
      offer: [
        {
          value: "Rs. 25 off on minimum order of Rs.200",
          id: "5",
          offerType: "FLAT",
          discountType: "F",
          offerRate: 25,
          minOrderAmount: 200,
          maxDiscount: null,
          itemQuantity: null,
        },
        {
          value: "Rs. 100 off on minimum order of Rs.500",
          id: "6",
          offerType: "FLAT",
          discountType: "F",
          offerRate: 100,
          minOrderAmount: 500,
          maxDiscount: null,
          itemQuantity: null,
        },
      ],
    },
    {
      value: "Offers with quantity discount",
      id: "7",
      offer: [
        {
          value: "Buy 1 get 1 free",
          id: "8",
          offerType: "QUANTITYDISCOUNT",
          discountType: "D",
          offerRate: null,
          minOrderAmount: null,
          maxDiscount: null,
          itemQuantity: 1,
        },
        {
          value: "Buy 2 get 2 free",
          id: "9",
          offerType: "QUANTITYDISCOUNT",
          discountType: "D",
          offerRate: null,
          minOrderAmount: null,
          maxDiscount: null,
          itemQuantity: 2,
        },
        {
          value: "Buy 1 get 20% off",
          id: "10",
          offerType: "QUANTITYDISCOUNT",
          discountType: "D",
          offerRate: 20,
          minOrderAmount: null,
          maxDiscount: null,
          itemQuantity: 1,
        },
      ],
    },
  ]);

  const handleOfferChange = (event, data) => {
  

    if (event.target.checked) {
      componentState.offerType = data.offerType;
      componentState.offerAttributes.itemDetails.discountType =
        data.discountType;
      componentState.offerRate = data.offerRate;
      componentState.minOrderAmount = data.minOrderAmount;
      componentState.maxDiscount = data.maxDiscount;
      componentState.offerAttributes.itemDetails.itemQuantity =
        data.itemQuantity;
      setOfferState(componentState);
      setofferstatus(!offerstatus);
    } else {
      setofferstatus(offerstatus);
    }
  };
  return (
    <>
      <div className="menu-list offer_list p-3per">
        <div>
          <h3 className="green-txt m-b-15 d-inline-block">
          <Link
              to={{
                pathname: "/management/Offers",
               
              }}
            > <img src={Back} alt="" className="back_arrow" /></Link>  Add Offer
          </h3>

          <button type={"button"} className="offer-btn top_btn float-right">
            <img src={Plus} alt="" className="plus_img" />{" "}
            <Link
              to={{
                pathname: "/management/Offers/CreateOffer",
                state: offerData,
              }}
            >
              Create New Offers
            </Link>
          </button>
        </div>
        <div>
          <p className="m-b-0">Offer Templates</p>
          <small className="small_txt m-b-20">
            Please select an offer template to create offer easily
          </small>

          {offerDetails.map((value, index) => (
            <div className="checkbox-radio m-b-30">
              <label className="label_checkbox">{value.value}</label>
              <div>
                {" "}
                <div>
                  <fieldset className="border_none">
                    {value.offer.map((offervalue, index) => (
                      <div className="m-b-10">
                        <label className="rado_label">
                          <input
                            type="radio"
                            className="radio_btn"
                            // checked={offerstatus === true ? "checked" : ""}
                            name="question"
                            value={offervalue.id}
                            onChange={(e) => handleOfferChange(e, offervalue)}
                            id="1"
                          />
                          {offervalue.value}
                        </label>
                      </div>
                    ))}
                  </fieldset>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddOffer;
