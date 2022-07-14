import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import edit from "../../assets/images/edit.png";
import {
  updateOfferClear,
  createOfferClear,
  createOffer,
  EditOffer,
} from "../../redux/actions/offerActions";
import { ReactComponent as Loader } from "../../assets/svg/loaderWhite.svg";
const PreviewOffer = (props) => {
  let offerData = props && props.state ? props.state : "";
  console.log(offerData, "preview offer");
  const dispatch = useDispatch();
  const history = useHistory();

  const createOfferLoading = useSelector(
    (state) => state.offer.createOfferLoading
  );
  const EditOfferLoading = useSelector((state) => state.offer.EditOfferLoading);

  const addOfferSuccess = useSelector((state) => state.offer.addOfferSuccess);
  const addOfferFailedMessage = useSelector(
    (state) => state.offer.addOfferFailedMessage
  );
  const editOfferFailedMessage = useSelector(
    (state) => state.offer.updateOfferFailureMessage
  );

  const updateOfferSuccess = useSelector(
    (state) => state.offer.updateOfferSuccess
  );

  useEffect(() => {
    if (addOfferSuccess && !createOfferLoading && !updateOfferSuccess) {
      alert("Offer Added Sccessfully");
      history.push("/management/Offers");
      dispatch(createOfferClear());
    } else if (addOfferFailedMessage !== "") {
      alert(addOfferFailedMessage);
      dispatch(createOfferClear());
    }
  }, [addOfferSuccess, createOfferLoading, updateOfferSuccess]);

  useEffect(() => {
    if (updateOfferSuccess && !EditOfferLoading && updateOfferSuccess) {
      alert("Offer Edited Successfully");
      history.push("/management/Offers");
      dispatch(updateOfferClear());
    } else if (editOfferFailedMessage !== "") {
      alert(editOfferFailedMessage);
      dispatch(createOfferClear());
    }
  }, [updateOfferSuccess, EditOfferLoading, updateOfferSuccess]);

  const selectedDaysList =
    offerData.offerAttributes && offerData.offerAttributes.validOn
      ? offerData.offerAttributes.validOn
      : [];

  const offerTypeStr = offerData.order_type_id
    ? offerData.order_type_id.map((result) => result.value).toString()
    : "";

  const offerTypeId = offerData.order_type_id
    ? offerData.order_type_id.map((result) => result.id)
    : [];

  let outletStr = "";
  let outletId = [];
  let visibleToStr = "";
  let visibleToId = [];
  let itemCodeObj = "";
  let scaleLevel = "";
  let usageFrequencePerCustomer = "";
  let usagePerCustomerPerDay = "";
  let scaleLevelvalue = "";
  if (offerData.offerAttributes) {
    outletStr = offerData.offerAttributes.outlets
      ? offerData.offerAttributes.outlets
          .map((result) => result.value)
          .toString()
      : "";

    outletId = offerData.offerAttributes.outlets
      ? offerData.offerAttributes.outlets.map((result) => result.id)
      : [];

    visibleToStr = offerData.offerAttributes.visibleTo
      ? offerData.offerAttributes.visibleTo
          .map((result) => result.value)
          .toString()
      : "";

    visibleToId = offerData.offerAttributes.visibleTo
      ? offerData.offerAttributes.visibleTo.map((result) => result.key)
      : [];

    itemCodeObj =
      offerData.offerAttributes.itemDetails &&
      offerData.offerAttributes.itemDetails.itemCode
        ? offerData.offerAttributes.itemDetails.itemCode
        : "";

    // scaleLevel =
    //   offerData.offerAttributes.itemDetails &&
    //   offerData.offerAttributes.itemDetails.scaleLevel
    //     ? offerData.offerAttributes.itemDetails.scaleLevel.map(
    //         (result) => result.key
    //       )
    //     : 0;

    scaleLevel =
      offerData.offerAttributes.itemDetails &&
      offerData.offerAttributes.itemDetails.scaleLevel
        ? offerData.offerAttributes.itemDetails.scaleLevel
        : "";
    scaleLevelvalue = Object.assign({}, scaleLevel) || 0;

    usageFrequencePerCustomer = offerData.offerAttributes
      .usageFrequencePerCustomer
      ? offerData.offerAttributes.usageFrequencePerCustomer
      : "";

    usagePerCustomerPerDay = offerData.offerAttributes.usagePerCustomerPerDay
      ? offerData.offerAttributes.usagePerCustomerPerDay
      : "";
  }

  const usageFrequencePerCustomerValue = usageFrequencePerCustomer
    ? usageFrequencePerCustomer == "MUL"
      ? "MultipleTimes"
      : "Once"
    : "";
  //console.log(typeof usagePerCustomerPerDay,"usagePerCustomerPerDay")
  let usagePerCustomerPerDayValue = "";
  switch (usagePerCustomerPerDay) {
    case 4:
      usagePerCustomerPerDayValue = "Multiple";
      break;

    case 1:
      usagePerCustomerPerDayValue = "Once";
      break;

    case 2:
      usagePerCustomerPerDayValue = "Twice";
      break;

    case 3:
      usagePerCustomerPerDayValue = "Thrice";
      break;

    default:
      // console.log("$$$$$$")
      break;
  }

  const daysList = [
    {
      day: "Sun",
      value: "S",
      id: "7",
      selected: selectedDaysList.includes(Number(7)),
    },
    {
      day: "Mon",
      value: "M",
      id: "1",
      selected: selectedDaysList.includes(Number(1)),
    },
    {
      day: "Tue",
      value: "T",
      id: "2",
      selected: selectedDaysList.includes(Number(2)),
    },
    {
      day: "Wed",
      value: "W",
      id: "3",
      selected: selectedDaysList.includes(Number(3)),
    },
    {
      day: "Thur",
      value: "T",
      id: "4",
      selected: selectedDaysList.includes(Number(4)),
    },
    {
      day: "Fri",
      value: "F",
      id: "5",
      selected: selectedDaysList.includes(Number(5)),
    },
    {
      day: "Sat",
      value: "S",
      id: "6",
      selected: selectedDaysList.includes(Number(6)),
    },
  ];

  const saveAndPublish = () => {
    let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));

    data.order_type_id = JSON.stringify({ typeIds: offerTypeId });
    data.offerAttributes.outlets = outletId;
    data.offerAttributes.visibleTo = visibleToId;
    data.offerAttributes.itemDetails.itemCode =
      itemCodeObj && itemCodeObj[0]?.id ? itemCodeObj[0]?.id : "";
    data.offerAttributes.itemDetails.scaleLevel =
      scaleLevelvalue && scaleLevelvalue[0] ? scaleLevelvalue[0] : 0;

    data.attributes = JSON.stringify(data.offerAttributes);
    delete data.offerAttributes;

    if (data.id) {
      //edit
      data.locationId = offerData.locationId;
      //   console.log(data, EditOfferLoading, EditOffersw, "dat5aa");
      dispatch(
        EditOffer({
          data: data,
          id: data.id,
        })
      );
    } else {
      //create
      dispatch(createOffer(data));
    }
  };

  return (
    // <>{createOfferLoading ? (
    <>
      <div className="menu-list offer_list">
        <div className="mainpage_boxshade">
          {false ? (
            <div className="menu-items load_div">Loading, Please wait!!</div>
          ) : (
            <div className="menu-list offer_list p-3per">
              <div>
                <h2 className="green-txt m-b-15 d-inline-block">
                  Preview Offer
                </h2>
                <div className="tab_border"></div>
              </div>
              <div className="">
                <div className="">
                  <h3 className="d-inline-block m-t-20">Primary Details</h3>
                  <a
                    className="green-txt d-inline-block float-right"
                    onClick={() => props.onBack()}
                  >
                    <img src={edit} alt="edit" className="w-12" /> Edit
                  </a>

                  <div className="row">
                    <div className="col-md-6">
                      <p className="preview_hdng">Offer Name</p>
                      <p className="m-t-5">{offerData.offerName}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Order Type</p>
                      <p className="m-t-5">{offerTypeStr}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <p className="preview_hdng">Promo Code</p>
                      <p className="m-t-5">{offerData.offerCode}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Selected Outlet</p>
                      <p className="m-t-5">{outletStr}</p>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-6">
                      <p className="preview_hdng">Terms &amp; Conditions</p>
                      <p className="m-t-5">{offerData.offerTerms}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Visible to</p>
                      <p className="m-t-5">{visibleToStr}</p>
                    </div>
                  </div>
                  <div className="row m-t-20">
                    <div className="col-md-6">
                      {/* <p className="preview_hdng">Offer Description</p>
                      <p className="m-t-5">
                        {offerData.offerAttributes.description}
                      </p> */}
                    </div>
                    <div className="col-md-6">
                      {/* <p className="preview_hdng">
                        Max person allowed to use this offer
                      </p>
                      <p className="m-t-5">{offerData.maxRedeem}</p> */}
                    </div>
                  </div>
                </div>

                <div className="">
                <div className="col-md-12">
                    <p className="m-t-5 m-b-0">{`Offer Type : ${
                        offerData.offerAttributes.offerBasedOn === 0
                          ? "Invoice"
                          : "Quantity"
                      }`}</p>
                      </div>
                  <div className="row">
                    
                    <div className="col-md-6">
                      
                      <p className="preview_hdng">Discount Type</p>
                      <p className="m-t-5">
                        {offerData.offerAttributes.itemDetails.discountType ===
                        "R"
                          ? "Rate"
                          : "Flat"}
                      </p>

                      {offerData.offerAttributes.itemDetails.offersAppliedAt !==
                      "S" ?offerData.offerType !== "FLATFEE"&& (
                        <>
                          {" "}
                          <p className="preview_hdng">
                            Max. Discount amount(in Rs/$)
                          </p>
                          <p className="m-t-5">{offerData.maxDiscount}</p>
                        </>
                      ) : (
                        ""
                      )}
                      {offerData.minOrderAmount !== 0 ? (
                        <>
                          {" "}
                          <p className="preview_hdng">Min.Order Amount</p>
                          <p className="m-t-5">{offerData.minOrderAmount}</p>
                        </>
                      ) : (
                        ""
                      )}
                      {offerData.offerType !== "FLATFEE" && (
                        <>
                          {" "}
                          <p className="preview_hdng">Discount %</p>
                          <p className="m-t-5">{offerData.offerRate}</p>
                        </>
                      )}
                      {offerData.offerType === "FLATFEE" && (
                        <>
                          {" "}
                          <p className="preview_hdng">Discount Amount</p>
                          <p className="m-t-5">{offerData.offerRate}</p>
                        </>
                      )}
                    </div>
                    {offerData.offerAttributes.offerBasedOn ? (
                      <div className="col-md-6 m-t-2">
                        {/* <h3></h3> */}
                        <p className="preview_hdng">Item Name</p>
                        <p className="m-t-5">
                          {itemCodeObj && itemCodeObj[0]?.value
                            ? itemCodeObj[0].value
                            : ""}
                        </p>
                        {offerData.offerAttributes.itemDetails
                          .offersAppliedAt !== "S" ? (
                          <>
                            {" "}
                            <p className="preview_hdng">Item Quantity</p>
                            <p className="m-t-5">
                              {
                                offerData.offerAttributes.itemDetails
                                  .itemQuantity
                              }
                            </p>{" "}
                          </>
                        ) : (
                          <>
                            {" "}
                            <p className="preview_hdng">Item Quantity</p>
                            <p className="m-t-5">
                              {`${
                                offerData.offerAttributes.itemDetails
                                  .scaleLevel - 1
                              }-${
                                offerData.offerAttributes.itemDetails.scaleLevel
                              }`}
                            </p>{" "}
                          </>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="m-t-20 m-b-20">
                  <p className="m-t-5">Validity</p>
                  <p className="preview_hdng"> Date &amp; Time</p>

                  <div className="row">
                    <div className="col-md-6">
                      <small className="small_txt">Start</small>
                      <p className="m-t-5">
                        {moment(offerData.validityFrom).format(
                          "MM/DD/yyyy h:mm a"
                        )}
                      </p>
                      <small className="small_txt">End</small>
                      <p className="m-t-5">
                        {moment(offerData.validityUntil).format(
                          "MM/DD/yyyy h:mm a"
                        )}
                      </p>
                    </div>
                    <div className="col-md-6">
                   {offerData.offerAttributes.usageFrequencePerCustomer !==null?  <> <small className="small_txt">
                        Usage Frequency per Customer
                      </small>
                     
                      <p className="m-t-5">{usageFrequencePerCustomerValue}</p></>:""}
                      <small className="small_txt">
                        Max person allowed to use this offer
                      </small>

                      <p className="m-t-5">{offerData.maxRedeem}</p>
                    </div>
                  </div>

                  <div>
                    <small className="small_txt">Valid On</small>
                    <div className="day_select">
                      {daysList.map((value, index) => (
                        <span
                          key={value.id}
                          className={value.selected === true ? "select" : ""}
                        >
                          {value.value}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="row m-t-20">
                    <div className="col-md-6">
                   { offerData.offerAttributes.usagePerCustomerPerDay !==0?<>  <small className="small_txt">
                        Usage per Customer per day
                      </small>
                      <p className="m-t-5">{usagePerCustomerPerDayValue}</p></>:""}
                    </div>
                    <div className="col-md-6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="float-right buttons_Section">
          <Link to={"/management/Offers"} className="offer-btn cancel-btn">
            Cancel
          </Link>

          <button
            type={"button"}
            className="offer-btn  float-right"
            onClick={() => saveAndPublish()}
          >
            {EditOfferLoading || createOfferLoading ? (
              <Loader height="15px" width="15px" />
            ) : (
              " Save & Publish"
            )}{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default PreviewOffer;
