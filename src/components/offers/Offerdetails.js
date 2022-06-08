import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Plus from "../../assets/images/add.png";
import Gift from "../../assets/images/gift.png";
import { signOut } from "../../redux/actions/authActions";
import {
  changeOfferStatus, deleteOfferRequest, disableOffer,
  getOfferList, resetDeleteData
} from "../../redux/actions/offerActions";

const Offerdetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [offerListNoData, setOfferListNoData] = useState(false);
  const [searchOfferList, setsearchOfferList] = useState([]);
  const [offerListdata, setofferListdata] = useState([]);
  const [completedStatus, setcompletedStatus] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const { credentials, selectedBranch } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (!deleteOffersSuccess && deleteOffersLoading) {
      alert("Item Deleted Successfully");
      dispatch(resetDeleteData());
      dispatch(
        getOfferList({
          locationId: credentials.locationId,
          status: offerStatus,
        })
      );
    }
  }, [deleteOffersLoading, deleteOffersLoading]);
  useEffect(() => {
    if (offerList !== "") {
      setofferListdata(offerList);
    }
  }, [offerList]);

  useEffect(() => {
    if (credentials) {
      dispatch(
        getOfferList({
          locationId: credentials.locationId,
          status: offerStatus,
        })
      );
    }
  }, [offerStatus, selectedBranch]);

  useEffect(() => {
    setLoading(offerListLoading);
  }, [offerListLoading, offerList]);

  const logoutUser = () => {
    localStorage.clear();
    dispatch(signOut());
    history.replace("/");
  };

  const onChangeOfOfferStatus = (status) => {
    setcompletedStatus(!completedStatus);
    dispatch(changeOfferStatus(status));
  };

  const showOrderTypes = (orderTypeIds) => {
    let orderTypes = [];

    if (Object.keys(selectedBranch?.orderTypes).length !== 0) {
      orderTypeIds = JSON.parse(orderTypeIds).typeIds;
      selectedBranch.orderTypes.map((orderType) => {
        if (orderTypeIds?.includes(orderType.id)) {
          orderTypes.push(orderType.typeName);
        }
        return orderTypes.join(",");
      });
    } else {
      return orderTypes;
    }
    return orderTypes;
  };

  const showOfferStatus = (validityFrom, validityUntil) => {
    var today = moment.utc(new Date()).format("YYYY MM DD");
    validityFrom = moment.utc(validityFrom).format("YYYY MM DD");
    validityUntil = moment.utc(validityUntil).format("YYYY MM DD");

    var isTodayBeforeOfferValidity = moment(today).isBefore(
      validityFrom,
      validityUntil
    );

    var isTodayOfferValidity = moment(today).isSame(
      validityFrom,
      validityUntil
    );

    var isTodayInBetweenOfferValidity = moment(today).isBetween(
      validityFrom,
      validityUntil
    );
    var isTodayAfterOfferValidity = moment(today).isAfter(
      validityFrom,
      validityUntil
    );

    if (isTodayBeforeOfferValidity) {
      return "Upcoming";
    } else if (isTodayInBetweenOfferValidity) {
      return "today";
    } else if (isTodayAfterOfferValidity) {
      return "past";
    } else if (isTodayOfferValidity) {
      return "sameday";
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
            <button type={"button"} className="offer-btn">
              <img src={Plus} alt="" className="offer_img" />
              <Link to={"/management/Offers/AddOffer"}>Add New Offers</Link>
            </button>
            <p>Add new offers by using offer template</p>

            <p>Or</p>
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

              <Link to={"/management/Offers/TemplateOffer"}>
                Add New Offers
              </Link>
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
                offerStatus === 0
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
              onClick={() => onChangeOfOfferStatus(0)}
            >
              Completed
            </div>
          </div>

          <table width="100%" className="h-50per">
            <thead>
              <tr>
                <th>Offer Name</th>
                <th>Start &amp; End Date</th>
                <th>Order Type </th>
                {/* <th>Visibility</th> */}
                <th>Amount</th>
                <th>Usage</th>
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
                      offerType={showOrderTypes(row?.order_type_id)}
                      // offerType={row?.order_type_id}
                      // visibileTo={
                      //   row?.offerAttributes?.communicationMedium &&
                      //   row.offerAttributes.communicationMedium.length !== 0 &&
                      //   row.offerAttributes.communicationMedium
                      // }
                      offerData={row}
                      offerRate={`Rs.${row.offerRate}`}
                      usage={row.redeemedSofar}
                      isEnabled={
                        row.isEnabled === 1 &&
                        showOfferStatus(row.validityFrom, row.validityUntil)
                      }
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
                      offerType={showOrderTypes(row?.order_type_id)}
                      //  offerType={row?.order_type_id}
                      // visibileTo={
                      //   row?.offerAttributes?.communicationMedium &&
                      //   row.offerAttributes.communicationMedium.length !== 0 &&
                      //   row.offerAttributes.communicationMedium
                      // }
                      offerData={row}
                      offerRate={row.offerRate}
                      usage={row.redeemedSofar}
                      isEnabled={showOfferStatus(
                        row.validityFrom,
                        row.validityUntil
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
      await dispatch(disableOffer(id));
      setReRender(!reRender);

      dispatch(
        getOfferList({
          locationId: credentials.locationId,
          status: offerStatus,
        })
      );
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

  return (
    <tr id={id}>
      <td>{offerName}</td>
      <td>
        {moment.utc(validityFrom).format("DD MMM ") +
          " - " +
          moment.utc(validityUntil).format("DD MMM YYYY")}
      </td>
      {/* {offerType.map((value,index) =>(<td>{value}</td>))}   */}
      {/* <td>{offerType}</td> */}
      <td>
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
      {/* <td>
        {" "}
        {visibileTo.length !== 0
          ? visibileTo.map((row) => {
              return (
                <span>
                  {row}
                  <br />
                </span>
              );
            })
          : "-"}
      </td> */}
      <td>{offerRate}</td>
      <td>{usage}</td>
      <td>
        {isEnabled === "past" && (
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        )}
        {isEnabled === "today" && (
          <label className="switch">
            <input type="checkbox" checked />
            <span className="slider round"></span>
          </label>
        )}
        {isEnabled === "Upcoming" && <span>{isEnabled}</span>}

        {isEnabled === "sameday" && (
          <label className="switch">
            <input type="checkbox" checked />
            <span className="slider round"></span>
          </label>
        )}
      </td>
      <td tabIndex={0} onFocus={expand} onBlur={close}>
        <BiDotsVerticalRounded onClick={() => setShow(!show)} />
        {expanded ? (
          show && offerStatus === 1 ? (
            <ul>
              <li onClick={() => tableRowOptions(id, "Duplicate")}>
                Duplicate
              </li>
              {isEnabled === "Upcoming" && (
                <li onClick={() => tableRowOptions(id, "Edit")}>Edit</li>
              )}
              <li onClick={() => tableRowOptions(id, "Disable")}>Disable</li>
              <li onClick={() => tableRowOptions(id, "Delete")}>Delete</li>
            </ul>
          ) : show && offerStatus === 0 ? (
            <ul>
              <li onClick={() => tableRowOptions(id, "Duplicate")}>
                Duplicate
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
