import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Plus from "../../assets/images/add.png";
import Gift from "../../assets/images/gift.png";
import { signOut } from "../../redux/actions/authActions";

import Tick from "../../assets/images/tick.png";
import Delete from "../../assets/images/delete.png";
import Edit from "../../assets/images/edit.png";
import {
  changeOfferStatus,
  deleteOfferRequest,
  disableOfferRequest,
  getOfferList,
  resetDeleteData,
  resetDisableData,
} from "../../redux/actions/offerActions";
import Enable from "../../assets/svg/enable.svg";
import Disable from "../../assets/svg/Disable.svg";
import Duplicate from "../../assets/svg/Duplicate.svg";
const Offerdetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [offerListNoData, setOfferListNoData] = useState(false);
  const [searchOfferList, setsearchOfferList] = useState([]);
  const [offerListdata, setofferListdata] = useState([]);
  const [completedStatus, setcompletedStatus] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { credentials, selectedBranch, restaurantDetails } = useSelector(
    (state) => state.auth
  );

//   const checkstate = useSelector((state)=>state);
// console.log(checkstate,"Chckstateee")
  const offerListLoading = useSelector((state) => state.offer.offerListLoading);

  const offerListFailure = useSelector((state) => state.offer.offerListFailure);

  const offerStatus = useSelector((state) => state.offer.offerStatus);

  const offerList = useSelector((state) => state.offer.offerList);

  // const isSelectedOfferDeleted = useSelector((state) => state.offer.isSelectedOfferDeleted);

  // const isSelectedOfferDisabled = useSelector((state) => state.offer.isSelectedOfferDisabled);
  const deleteOffersSuccess = useSelector(
    (state) => state.offer.deleteOfferSuccess
  );

  const deleteOffersLoading = useSelector(
    (state) => state.offer.deleteOfferLoading
  );
  const disableOffersSuccess = useSelector(
    (state) => state.offer.disableOfferSuccess
  );

  const disableOffersLoading = useSelector(
    (state) => state.offer.disableOfferLoading
  );

  useEffect(() => {
    if (!deleteOffersSuccess && deleteOffersLoading) {
      alert("Item Deleted Successfully");
      dispatch(resetDeleteData());
      dispatch(
        getOfferList({
          locationId: selectedBranch.id,
          status: offerStatus,
        })
      );
    }
  }, [deleteOffersSuccess, deleteOffersLoading]);

  useEffect(() => {
    if (!disableOffersSuccess && disableOffersLoading) {
      alert(" Item Status changed Successfully");
      dispatch(resetDisableData());
      dispatch(
        getOfferList({
          // locationId: credentials.locationId,
          locationId: selectedBranch.id,
          status: offerStatus,
        })
      );
    }
  }, [disableOffersSuccess, disableOffersLoading]);

  useEffect(() => {
    if (offerList !== "") {
      setofferListdata(offerList);
      setsearchOfferList(offerList);
    }
  }, [offerList]);

  useEffect(() => {
    if (credentials) {
      dispatch(
        getOfferList({
         // locationId: credentials.locationId,
         locationId: selectedBranch.id,
          status: offerStatus,
        })
      );
    }
  }, [offerStatus, selectedBranch]);

  useEffect(() => {
    setLoading(offerListLoading);
  }, [offerListLoading, offerList]);

  const onChangeOfOfferStatus = (status) => {
    setOfferListNoData(false);
    setcompletedStatus(!completedStatus);
    dispatch(changeOfferStatus(status));
  };

  const showOrderTypes = (orderTypeIds) => {
   
    let orderTypes = [];
    if (Object.keys(selectedBranch?.orderTypes).length !== 0) {
      orderTypeIds = JSON.parse(orderTypeIds).typeIds;
      selectedBranch.orderTypes.map((orderType) => {
       // console.log(orderType.id,orderTypeIds,"OOOO")
        if (orderTypeIds?.includes(orderType.id)) {
         // console.log(orderType.typeName,"checkk")
          orderTypes.push(orderType.typeName);
        }
        return orderTypes.join(",");
      });
    } else {
      return orderTypes;
    }
    return orderTypes;
  };

  const showOfferStatus = (validityFrom, validityUntil, isEnabled) => {
    var today = new Date();
    validityFrom = new Date(validityFrom);
    validityUntil = new Date(validityUntil);

    var isTodayBeforeOfferValidity = moment(today).isBefore(
      validityFrom,
      validityUntil
    );

    var isEnabledActive = isEnabled === 1 ? true : false;
    var isEnabledPast = isEnabled === 0 ? true : false;

    if (isTodayBeforeOfferValidity && isEnabled === 1) {
      return "Upcoming";
    } else if (isEnabledActive) {
      return "Active";
    } else if (isEnabledPast) {
      return "Disabled";
    }
  };

  const handleSearch = async (e) => {
    let searchdata = e.target.value;
    let list = offerList;
    let result;
    let search = (list, text) =>
      list.filter((i) =>
        i.offerName.toLowerCase().includes(text.toLowerCase())
      );

    if (searchdata !== "") {
      result = search(list, searchdata);

      if (result.length > 0) {
        await setOfferListNoData(true);
        await setsearchOfferList(result);
      } else {
        await setsearchOfferList([]);
        await setOfferListNoData(true);
       
      }
    } else {
      await setOfferListNoData(false);
      await setsearchOfferList(offerList);
     
    }
  };

  return (
    <>
      {loading ? (
        <div className="menu-items load_div">Loading, Please wait!!</div>
      ) : offerList?.length === 0 && offerListFailure === "" ? (
        <div className="p-3per">
          <img src={Gift} alt="" className="gift-img" />

          <div className="text-center m-t-30">
            {/* <button type={"button"} className="offer-btn">
              <img src={Plus} alt="" className="offer_img" />
              <Link to={"/management/Offers/AddOffer"}>Add New Offers</Link>
            </button>
            <p>Add new offers by using offer template</p>

            <p>Or</p> */}
            <button type={"button"} className="offer-btn">
              <img src={Plus} alt="" className="offer_img" />{" "}
              <Link to={"/management/Offers/CreateOffer"}>
                Create New Offers
              </Link>
            </button>
            <p>Create new offers by using offer form</p>
          </div>
        </div>
      ) : (
        <div className="menu-list offer_list p-3per">
          <div>
            <h3 className="green-txt m-b-15 d-inline-block">
              Offers ({offerList.length})
            </h3>

            <button type={"button"} className="offer-btn top_btn float-right">
              <img src={Plus} alt="" className="plus_img" />
              <Link to={"/management/Offers/CreateOffer"}> Add New Offers</Link>
            </button>
            <input
              className="srch_inpt"
              type="text"
              name="businessName"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
          <div className="tab_border">
            <div
              className={
                offerStatus === 2
                  ? "  d-inline-block "
                  : "  d-inline-block selected"
              }
              onClick={() => onChangeOfOfferStatus(1)}
            >
              Active
            </div>
            <div
              className={
                offerStatus === 1
                  ? " tab  d-inline-block m-l-25"
                  : " tab  d-inline-block selected m-l-25"
              }
              onClick={() => onChangeOfOfferStatus(2)}
            >
              Completed
            </div>
          </div>

          <table width="100%" className="h-50per">
            <thead>
              <tr>
                <th>Offer Name</th>
                <th>Offer Duration</th>
                <th>Order Type </th>
                {/* <th>Visibility</th> */}
                <th>Disount</th>
                <th>Offer Used </th>
                {offerStatus === 1 ? <th>Status</th> : ""}
                <th></th>
              </tr>
            </thead>
            {offerListNoData === false ? (
              <tbody>
                {offerListdata.map((row, index) => {
               
                  return (
                    <OffersRow
                      key={row.id}
                      id={row.id}
                      offerName={row.offerName}
                      validityFrom={row.validityFrom}
                      validityUntil={row.validityUntil}
                      offerType={
                        row?.order_type_id
                          ? showOrderTypes(row?.order_type_id)
                          : ""
                      }
                      offerData={row}
                      offerRate={row.offerType ==="FLATFEE"?
                       ( restaurantDetails.country === "US"
                          ? `$${
                              row.offerRate === 0.0
                                ? row.maxDiscount
                                : row.offerRate
                            }`
                          : `Rs.${
                              row.offerRate}`): restaurantDetails.country === "US"
                              ? `${
                                  row.offerRate === 0.0
                                    ? row.maxDiscount
                                    : row.offerRate
                                }%`
                              : `${
                                  row.offerRate}%`
                      }
                      usage={row.offerUsageCount}
                      isEnabled={showOfferStatus(
                        row.validityFrom,
                        row.validityUntil,
                        row.isEnabled
                      )}
                      index={index}
                    />
                  );
                })}
              </tbody>
            ) : (
              <tbody>
                {searchOfferList.map((row, index) => {
                  return (
                    <OffersRow
                      key={row.id}
                      id={row.id}
                      offerName={row.offerName}
                      validityFrom={row.validityFrom}
                      validityUntil={row.validityUntil}
                      offerType={
                        row?.order_type_id
                          ? showOrderTypes(row?.order_type_id)
                          : ""
                      }
                      offerData={row}
                      offerRate={row.offerType ==="FLATFEE"?
                       ( restaurantDetails.country === "US"
                          ? `$${
                              row.offerRate === 0.0
                                ? row.maxDiscount
                                : row.offerRate
                            }`
                          : `Rs.${
                              row.offerRate}`): restaurantDetails.country === "US"
                              ? `${
                                  row.offerRate === 0.0
                                    ? row.maxDiscount
                                    : row.offerRate
                                }%`
                              : `${
                                  row.offerRate}%`
                      }
                      usage={row.offerUsageCount}
                      isEnabled={showOfferStatus(
                        row.validityFrom,
                        row.validityUntil,
                        row.isEnabled
                      )}
                      index={index}
                    />
                  );
                })}
              </tbody>
            )}
          </table>
        </div>
      )}
    </>
  );
};

const OffersRow = ({
  id,
  offerName,
  validityFrom,
  validityUntil,
  offerType,
  visibileTo,
  offerRate,
  usage,
  isEnabled,
  offerData,
  index,
}) => {
  const { credentials, selectedBranch } = useSelector((state) => state.auth);
  const offerStatus = useSelector((state) => state.offer.offerStatus);
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const [expanded, setExpanded] = useState(false);
  const offerList = useSelector((state) => state.offer.offerList);

  const getOpacity = (data) => {
    if (data === 1) {
      return 1;
    } else if (data === 2) {
      return 1;
    } else {
      return 0.4;
    }
  };
  const expand = () => {
    setExpanded(!expanded);
  };

  const close = () => {
    setExpanded(false);
  };

  const tableRowOptions = async (id, operation) => {
    if (operation === "Delete") {
      await dispatch(deleteOfferRequest(id));
      setReRender(!reRender);
    } else if (operation === "Disable") {
      await dispatch(disableOfferRequest({ id: id, status: 0 }));
      setReRender(!reRender);
    } else if (operation === "Enable") {
      await dispatch(disableOfferRequest({ id: id, status: 1 }));
      setReRender(!reRender);
    } else if (operation === "Edit") {
      history.push("/management/Offers/CreateOffer", offerData);
      return;
    } else if (operation === "Duplicate") {
      let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));
      data.id = null;
      data.offerCode = null;
      const validityUntil = data.validityUntil
        ? new Date(data.validityUntil).valueOf()
        : "";
      if (validityUntil && new Date().valueOf() > validityUntil) {
        data.validityFrom = null;
        data.validityUntil = null;
      }
      history.push("/management/Offers/CreateOffer", data);
      return;
    }
    setShow(!show);
  };
  const handleBlur = () => setIsOpen(isOpen);
  let date = moment.utc(validityFrom).format("YYYY-MM-DD HH:mm:ss");
  let stillUtc = moment.utc(date).toDate();
  let validityfrom = moment(stillUtc).local().format("YYYY-MM-DD HH:mm:ss");

  let offerEnd = moment.utc(validityUntil).format("YYYY-MM-DD HH:mm:ss");
  let stillUtcofferEnd = moment.utc(offerEnd).toDate();
  let validityuntil = moment(stillUtcofferEnd)
    .local()
    .format("YYYY-MM-DD HH:mm:ss");
  return (
    <tr id={id}>
      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>{offerName}</td>
      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>
        {moment(validityfrom).format("DD MMM ") +
          " - " +
          moment(validityuntil).format("DD MMM YYYY")}
      </td>
      {/* {offerType.map((value,index) =>(<td>{value}</td>))}   */}
      {/* <td>{offerType}</td> */}
      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>
        {offerType
          ? offerType.map((row) => {
              return (
                <span>
                  {row}
                  <br />
                </span>
              );
            })
          : "-"}
      </td>

      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>{offerRate}</td>
      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>{usage}</td>
      <td style={{ opacity: getOpacity(offerData.isEnabled) }}>
        {isEnabled === "Active" && <span>{isEnabled}</span>}
        {isEnabled === "Disabled" && <span>{isEnabled}</span>}
        {isEnabled === "Upcoming" && <span>{isEnabled}</span>}
      </td>

      <td tabIndex={0} onBlur={close} onFocus={expand}>
        {/* <td tabIndex={0} onFocus={expand} > */}
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {expanded ? (
          show && offerStatus === 1 && isEnabled !== "Disabled" ? (
            <ul className="ul_list">
              <li onClick={() => tableRowOptions(id, "Duplicate")}>
                <img src={Duplicate} alt="" className="plus_img m-r-20" />
                Duplicate
              </li>
              {isEnabled === "Upcoming" && (
                <li onClick={() => tableRowOptions(id, "Edit")}>
                  <img src={Edit} alt="" className="plus_img m-r-20" />
                  Edit
                </li>
              )}
              <li onClick={() => tableRowOptions(id, "Disable")}>
                <img src={Disable} alt="" className="plus_img m-r-20" />
                Disable
              </li>
              <li onClick={() => tableRowOptions(id, "Delete")}>
                <img src={Delete} alt="" className="plus_img m-r-20" />
                Delete
              </li>
            </ul>
          ) : show && offerStatus === 2 ? (
            <ul className="ul_list">
              <li onClick={() => tableRowOptions(id, "Duplicate")}>
                <img src={Duplicate} alt="" className="plus_img m-r-20" />
                Duplicate
              </li>
            </ul>
          ) : show && offerStatus === 1 && isEnabled === "Disabled" ? (
            <ul className="ul_list">
              <li onClick={() => tableRowOptions(id, "Enable")}>
                <img src={Enable} alt="" className="plus_img m-r-20" />
                Enable
              </li>
              <li onClick={() => tableRowOptions(id, "Duplicate")}>
                <img src={Duplicate} alt="" className="plus_img m-r-20" />
                Duplicate
              </li>
              <li onClick={() => tableRowOptions(id, "Delete")}>
                <img src={Delete} alt="" className="plus_img m-r-20" />
                Delete
              </li>
            </ul>
          ) : null
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default Offerdetails;
