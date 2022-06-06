import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import edit from "../../assets/images/edit.png";
import {
  cleanOfferSuccessMsg, createOffer,
  EditOffer
} from "../../redux/actions/offerActions";
const PreviewOffer = (props) => {
  let offerData = props && props.state ? props.state : "";

  const dispatch = useDispatch();
  const history = useHistory();

  const createOfferLoading = useSelector(
    (state) => state.offer.createOfferLoading
  );
  const EditOfferLoading = useSelector((state) => state.offer.EditOfferLoading);

  const addOfferSuccess = useSelector((state) => state.offer.addOfferSuccess);

  const updateOfferSuccess = useSelector(
    (state) => state.offer.updateOfferSuccess
  );

  useEffect(() => {
    if (addOfferSuccess && !createOfferLoading) {
      alert("Added SUccessfully");
      history.push("/management/Offers");
      dispatch(cleanOfferSuccessMsg());
    }
  }, [addOfferSuccess, createOfferLoading]);

  useEffect(() => {
    if (updateOfferSuccess && !EditOfferLoading) {
      console.log(updateOfferSuccess, !EditOfferLoading, "!EditOfferLoading");
      alert("Offer edited Successfully");
      history.push("/management/Offers");
      dispatch(cleanOfferSuccessMsg());
    }
  }, [updateOfferSuccess, EditOfferLoading]);

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

    scaleLevel =
      offerData.offerAttributes.itemDetails &&
      offerData.offerAttributes.itemDetails.scaleLevel
        ? offerData.offerAttributes.itemDetails.scaleLevel.map(
            (result) => result.key
          )
        : 0;

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
    ? usageFrequencePerCustomer == 0
      ? "MultipleTimes"
      : "Once"
    : "";

  let usagePerCustomerPerDayValue = "";
  switch (usagePerCustomerPerDay) {
    case "4":
      usagePerCustomerPerDayValue = "Multiple";
      break;

    case "1":
      usagePerCustomerPerDayValue = "Once";
      break;

    case "2":
      usagePerCustomerPerDayValue = "Twice";
      break;

    case "3":
      usagePerCustomerPerDayValue = "Thrice";
      break;

    default:
      break;
  }

  const daysList = [
    {
      day: "Sun",
      value: "S",
      id: "1",
      selected: selectedDaysList.includes(Number(1)),
    },
    {
      day: "Mon",
      value: "M",
      id: "2",
      selected: selectedDaysList.includes(Number(2)),
    },
    {
      day: "Tue",
      value: "T",
      id: "3",
      selected: selectedDaysList.includes(Number(3)),
    },
    {
      day: "Wed",
      value: "W",
      id: "4",
      selected: selectedDaysList.includes(Number(4)),
    },
    {
      day: "Thur",
      value: "T",
      id: "5",
      selected: selectedDaysList.includes(Number(5)),
    },
    {
      day: "Fri",
      value: "F",
      id: "6",
      selected: selectedDaysList.includes(Number(6)),
    },
    {
      day: "Sat",
      value: "S",
      id: "7",
      selected: selectedDaysList.includes(Number(7)),
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
      console.log(data.locationId, offerData.locationId, data);

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
            <div
              className="menu-items"
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "25%",
              }}
            >
              Loading, Please wait!!
            </div>
          ) : (
            <div
              className="menu-list offer_list"
              style={{
                padding: "3%",
              }}
            >
              <div>
                <h2 className="green-txt m-b-15 d-inline-block">
                  Preview Offer
                </h2>
                <div className="tab_border"></div>
              </div>
              <div className="">
                <div className="">
                  <h3 style={{ marginBottom: "20px", display: "inline-block" }}>
                    Primary Details
                  </h3>
                  <a
                    className="green-txt"
                    style={{ float: "right", display: "inline-block" }}
                    onClick={() => props.onBack()}
                  >
                    <img src={edit} alt="edit" style={{ width: "12px" }} /> Edit
                  </a>

                  <div className="row">
                    <div className="col-md-6">
                      <p className="preview_hdng">Offer Name</p>
                      <p style={{ marginTop: "5px" }}>{offerData.offerName}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Order Type</p>
                      <p style={{ marginTop: "5px" }}>{offerTypeStr}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <p className="preview_hdng">Promo Code</p>
                      <p style={{ marginTop: "5px" }}>{offerData.offerCode}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Selected Outlet</p>
                      <p style={{ marginTop: "5px" }}>{outletStr}</p>
                    </div>
                  </div>
                  <div className="row m-b-15">
                    <div className="col-md-6">
                      <p className="preview_hdng">Terms &amp; Conditions</p>
                      <p style={{ marginTop: "5px" }}>{offerData.offerTerms}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">Visible to</p>
                      <p style={{ marginTop: "5px" }}>{visibleToStr}</p>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-6">
                      <p className="preview_hdng">Offer Description</p>
                      <p style={{ marginTop: "5px" }}>
                        {offerData.offerAttributes.description}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p className="preview_hdng">
                        Max person allowed to use this offer
                      </p>
                      <p style={{ marginTop: "5px" }}>{offerData.maxRedeem}</p>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <div className="col-md-6">
                      <h3>Offer Type</h3>
                      <p className="preview_hdng">Discount Type</p>
                      <p style={{ marginTop: "5px" }}>
                        {offerData.offerAttributes.itemDetails.discountType ===
                        "R"
                          ? "Rate"
                          : "Flat"}
                      </p>

                      <p className="preview_hdng">
                        Max. Discount amount(in Rs/$)
                      </p>
                      <p style={{ marginTop: "5px" }}>
                        {offerData.maxDiscount}
                      </p>
                      <p className="preview_hdng">Discount %</p>
                      <p style={{ marginTop: "5px" }}>{offerData.offerRate}</p>
                    </div>
                    <div className="col-md-6">
                      <h3>Discount value based on</h3>
                      <p className="preview_hdng">Item Name</p>
                      <p style={{ marginTop: "5px" }}>
                        {itemCodeObj && itemCodeObj[0]?.value
                          ? itemCodeObj[0].value
                          : ""}
                      </p>
                      <p className="preview_hdng">Item Quantity</p>
                      <p style={{ marginTop: "5px" }}>
                        {offerData.offerAttributes.itemDetails.itemQuantity}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                  <h3>Validity</h3>
                  <p className="preview_hdng"> Date &amp; Time</p>

                  <div className="row">
                    <div className="col-md-6">
                      <small style={{ color: "#ccc", display: "block" }}>
                        Start
                      </small>
                      <p style={{ marginTop: "5px" }}>
                        {moment(offerData.validityFrom).format(
                          "MM/DD/yyyy h:mm a"
                        )}
                      </p>
                      <small style={{ color: "#ccc", display: "block" }}>
                        End
                      </small>
                      <p style={{ marginTop: "5px" }}>
                        {moment(offerData.validityUntil).format(
                          "MM/DD/yyyy h:mm a"
                        )}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <small style={{ color: "#ccc", display: "block" }}>
                        Usage Frequency per Customer
                      </small>
                      <p style={{ marginTop: "5px" }}>
                        {usageFrequencePerCustomerValue}
                      </p>
                      <small style={{ color: "#ccc", display: "block" }}>
                        Max. Usage across all transactions
                      </small>
                      <p style={{ marginTop: "5px" }}>
                        {offerData.offerAttributes.maxUsageAcrossAllTranscation}
                      </p>
                    </div>
                  </div>

                  <div>
                    <small
                      style={{
                        color: "#ccc",

                        display: "block",
                      }}
                    >
                      Valid On
                    </small>
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
                      <small style={{ color: "#ccc", display: "block" }}>
                        Usage per Customer per day
                      </small>
                      <p style={{ marginTop: "5px" }}>
                        {usagePerCustomerPerDayValue}
                      </p>
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
            Save &amp; Publish
          </button>
        </div>
      </div>
    </>
  );
};

export default PreviewOffer;
