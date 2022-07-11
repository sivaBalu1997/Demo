import moment from "moment";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import About from "../../assets/images/que.png";
import { getMenus } from "../../redux/actions/menuAction";
import { getDropdownData } from "../../redux/actions/offerActions";
import CustomDropDown from "../common/custom_dropdown_with_multiselect/CustomDropdown";
import TextInput from "../common/inputTextCustomized";
import DropdownAddItem from "./DropdownAddItem";
import PreviewOffer from "./PreviewOffer";
import "./sample.css";
import ScaleLevelPopup from "./ScaleLevelPopup";
import Calendar from "../../assets/images/cal.png";
import Enable from "../../assets/svg/enable.svg";

import { setSeconds, setMinutes, endOfToday } from "date-fns";
import setHours from "date-fns/setMinutes";
import { isSameDay, startOfToday, endOfDay } from "date-fns";
const CreateOffer = (props) => {
  const calculateMinTime = (date) => {
    let a = isSameDay(date, new Date()) ? new Date() : startOfToday();
    return a;
  };

  const [minTimevalue, setMinTime] = useState(calculateMinTime(new Date()));
  const [previewData, setPreviewState] = useState("");
  const checkingstate = useSelector(
    (state) => state.auth.restaurantDetails.country
  );

  const statevalue = useSelector((state) => state);
  // console.log(statevalue, "checkstate");
  const [scaletext, setscaletext] = useState("");
  const [errorMsg, setErrorMsg] = useState({});

  const dispatch = useDispatch();
  const [scalevalueUpdate, setScalevalueUpdate] = useState(false);

  const credentials = useSelector((state) => state.auth.credentials);

  const DatatermsAndConditions = useSelector(
    (state) => state.offer.dropdownData.termsAndConditions
  );

  const sampleorderTypes = useSelector((state) => state.auth.selectedBranch);

  //console.log(sampleorderTypes,"")
  const branchoutlet = useSelector(
    (state) => state.auth.restaurantDetails.branch
  );

  const selectedBranch = useSelector((state) => state.auth.selectedBranch);

  const menuItem = useSelector((state) => state.menu.menu);
  const [itemMenu, setItemMenu] = useState([]);
  const [FlatMenu, setFlatMenu] = useState([]);
  const [RateMenu, setRateMenu] = useState([]);
  const [storename, setstoremenuname] = useState([]);

  const [termsConditions, settermsconditions] = useState([]);

  const [OrderTypedropdown, setOrderType] = useState([]);

  const [outletbranchvalue, setoutletbranchvalue] = useState([]);

  const [scalePopupData, setScalePopupData] = useState("");

  const [checkingrupeessymbol, setcheckingrupeessymbol] = useState("");
  let componentState = {
    id: null,
    locationId: null,
    offerName: "",
    offerCode: "",
    offerType: null,
    offerRate: null,
    minOrderAmount: "",
    maxDiscount: "",
    maxRedeem: null,
    redeemedSofar: 0,
    order_type_id: "",
    offerTerms: null,
    validityFrom: null,
    validityUntil: null,
    isEnabled: 1,
    offerAttributes: {
      description: "",
      outlets: [],
      validOn: [],
      usageFrequencePerCustomer: null,
      usagePerCustomerPerDay: null,
      maxUsageAcrossAllTranscation: 0,
      visibleTo: [],
      currencyType: checkingstate === "IN" ? "INR" : "USD",
      offerBasedOn: 0,
      itemDetails: {
        itemCode: null,
        itemQuantity: null,
        discountType: null,
        offersAppliedAt: null,
        scaleLevel: "",
      },
    },
  };
  let isSubmitted = false;
  const location = useLocation();

  const [offerData, setOfferState] = useState(
    location.state || componentState || ""
  );

  //console.log("location.state", offerData);
  const header = offerData.id ? "Edit" : "Create";
  let visibleToList = "";
  let selectedDaysList = [];
  let offerTypeIds = [];
  let offerTerms = [];
  let outletsList = [];
  let offerType = "";
  let itemCode = "";
  let offersAppliedAt = "";
  let scaleLevel = "";
  let usageFrequencePerCustomer = "";
  let Discounttype = "";
  let usagePerCustomerPerDay = "";
  let offerBasedOn = null;
  let offerRate = null;
  const [Flatscalevalue, setFlatscalevalue] = useState([
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel && scaleLevel === "2"
          ? checkingstate === "US"
            ? `Scale Level 1: 1 - 2 item at  $${offerData?.offerRate}off`
            : offerData?.offerRate === null &&
              `Scale Level 1: 1 - 2 item at  Rs.0off`
          : checkingstate === "US"
          ? `Scale Level 1: 1 - 2 item at $.0 off`
          : `Scale Level 1: 1 - 2 item at Rs.0 off`,
      id: "1",
      key: "2",
      checked: scaleLevel === "2",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? checkingstate === "US"
            ? `Scale Level 2: 3 - 4  item at $${offerData?.offerRate}off`
            : `Scale Level 2: 3 - 4  item at Rs.${offerData?.offerRate}off`
          : checkingstate === "US"
          ? "Scale Level 2: 3 - 4 item at  $0 off"
          : "Scale Level 2: 3 - 4 item at  Rs.0 off",

      id: "2",
      key: "4",
      checked: scaleLevel == "4",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? checkingstate === "US"
            ? `Scale Level 3: 5 - 6  item at $${offerData.offerRate}off`
            : `Scale Level 3: 5 - 6  item at Rs.${offerData.offerRate}off`
          : checkingstate === "US"
          ? "Scale Level 3: 5 - 6 item at $0 off"
          : "Scale Level 3: 5 - 6 item at Rs.0 off",

      id: "3",
      key: "6",
      checked: scaleLevel === "6",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? checkingstate === "US"
            ? `Scale Level 4: 7 - 8  item at $${offerData.offerRate}off`
            : `Scale Level 4: 7 - 8  item at Rs.${offerData.offerRate}off`
          : checkingstate === "US"
          ? "Scale Level 4: 7 - 8 item at $0 off"
          : "Scale Level 4: 7 - 8 item at Rs.0 off",

      id: "4",
      key: "8",
      checked: scaleLevel === "8",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel
          ? checkingstate === "US"
            ? `Scale Level 5: 9 - 10 item at $${offerData.offerRate}off`
            : `Scale Level 5: 9 - 10 item at Rs.${offerData.offerRate}off`
          : checkingstate === "US"
          ? "Scale Level 5: 9 - 10 item at $0 off"
          : "Scale Level 5: 9 - 10 item at Rs.0 off",

      id: "5",
      key: "10",
      checked: scaleLevel === "10",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
  ]);

  
  // useEffect(() => {
  //   // console.log(offerData.offerRate, scalevalue);
  //   setScalevalue(scalevalue);
  // }, [scalevalue]);
  const [usageFrequency] = useState([
    {
      value: "Once",
      id: 1,
      key: "ONE",
      checked: usageFrequencePerCustomer == "ONE",
    },
    {
      value: "MultipleTimes",
      id: 2,
      key: "MUL",
      checked: usageFrequencePerCustomer == "MUL",
    },
  ]);

  const [usageCustomerPerday, setUsageCustomerPerday] = useState([
    {
      value: "Once",
      id: "1",
      key: "1",
      checked: usagePerCustomerPerDay == "1",
    },
    {
      value: "Twice",
      id: "2",
      key: "2",
      checked: usagePerCustomerPerDay == "2",
    },
    {
      value: "Thrice",
      id: "3",
      key: "3",
      checked: usagePerCustomerPerDay == "3",
    },
    {
      value: "Multiple",
      id: "4",
      key: "4",
      checked: usagePerCustomerPerDay == "4",
    },
  ]);
  const [DiscountType, setDiscountType] = useState([
    {
      value: "Rate%",
      id: "1",
      key: "R",
      checked: Discounttype == "R",
    },
    {
      value: "Flat",
      id: "2",
      key: "F",
      checked: Discounttype == "F",
    },
  ]);

  const [startDate, setStartDate] = useState(
    offerData.validityFrom
      ? setHours(setMinutes(new Date(offerData.validityFrom), 30), 17)
      : null
  );
 
  const [EndDate, setEndDate] = useState(
    offerData.validityUntil ? new Date(offerData.validityUntil) : null
  );
  const [VisibleTo, setVisibleTo] = useState([
    {
      value: "Customers",
      id: 1,
      key: "C",
      checked: visibleToList.includes("C"),
    },
    {
      value: "Employees",
      id: 2,
      key: "S",
      checked: visibleToList.includes("S"),
    },
  ]);
  //console.log(offerData, "check");

  useEffect(() => {}, [scaletext]);
  useEffect(() => {
    if (menuItem.menu !== undefined && menuItem?.menu?.length > 0) {
      setItemMenu(menuItem);
      let menuName = [];
      let selectedItem = "";

      menuItem.menu.map((item, index) => {
        menuName.push({
          value: item.itemName,
          id: item.itemId,
          checked: false,
        });

        if (itemCode == item.itemId) {
          selectedItem = {
            value: item.itemName,
            id: item.itemId,
            checked: true,
          };
        }
      });
      setstoremenuname(menuName);

      if (!selectedItem) {
        return;
      }
      if (offerData.id) {
        let array = [];
        menuName.map((menus) => {
          if (menus.id === offerData.offerAttributes.itemDetails.itemCode) {
            array.push({ value: menus.value, id: menus.id, checked: true });
          }
          setstoremenuname(array);
        });
      }

      if (offerType === "PERCENT") {
        setRateMenu(selectedItem);
      } else if (offerType === "FLATFEE") {
        setFlatMenu(selectedItem);
      }
    }
  }, [menuItem]);

  useEffect(() => {
    if (selectedBranch !== undefined) {
      dispatch(
        getMenus({
          locationId: selectedBranch.id,
          type: "DineIn",
        })
      );
      if (credentials) {
        dispatch(getDropdownData({ locationId: credentials.locationId }));
      }
    }
  }, [selectedBranch]);

  useEffect(() => {
    if (sampleorderTypes !== undefined || sampleorderTypes !== {}) {
      let someArray2 = sampleorderTypes?.orderTypes;
      someArray2 = someArray2?.filter((el) => {
        let typename = el?.typeName.toLowerCase("Instore");
        return typename !== "instore";
      });
      if (sampleorderTypes.orderTypes !== null) {
        let OrderTypeArray = someArray2?.map((ordertype, index) => {
          let result = {
            value: ordertype.typeName,
            id: ordertype.id,
            checked: false,
          };
          if (offerTypeIds.includes(ordertype.id)) {
            result.checked = true;
          }
          return result;
        });

        setOrderType(OrderTypeArray ? OrderTypeArray : []);
      }
    }
  }, [sampleorderTypes]);

  useEffect(() => {
    if (branchoutlet !== undefined) {
      let OutletArray = branchoutlet?.map((branchoutletData, index) => {
        let result = {
          value: `Outlet ${index + 1} -${branchoutletData.locationName}`,
          id: branchoutletData.id,
          checked: false,
        };
        if (outletsList.includes(result.id)) {
          result.checked = true;
        }
        return result;
      });
      setoutletbranchvalue(OutletArray ? OutletArray : []);
    }

    if (offerData.locationId !== null) {
      if (branchoutlet) {
        let outletsvalue = branchoutlet?.map((outlet, index) => {
          let result = {
            value: `Outlet ${index + 1} -${outlet.locationName}`,
            id: outlet.id,
            checked: false,
          };

          if (outlet?.id?.includes(offerData.locationId)) {
            result.checked = true;
            // outletsList.push(outlet?.id);
          }
          return result;
        });
        setoutletbranchvalue(outletsvalue ? outletsvalue : []);
      }
    }
  }, [branchoutlet]);

  useEffect(() => {
    if (DatatermsAndConditions !== undefined) {
      // setcheckedListTermsAndConditions(DatatermsAndConditions);
      let termsList = [];
      let termsandconditions = DatatermsAndConditions.map((value, index) => {
        let result = {
          value: value,
          id: index + 1,
          checked: false,
        };
        if (offerTerms.includes(value)) {
          result.checked = true;
          termsList.push(result);
        }
        return result;
      });
      settermsconditions(termsandconditions);
    }
  }, [DatatermsAndConditions]);

  if (offerData) {
    offerTypeIds =
      offerData.order_type_id &&
      JSON.parse(offerData.order_type_id) &&
      JSON.parse(offerData.order_type_id).typeIds
        ? JSON.parse(offerData.order_type_id).typeIds.map(function (item) {
            return item;
          })
        : [];

    offerTerms = offerData.offerTerms ? offerData.offerTerms.split(",") : [];
    offerType = offerData.offerType ? offerData.offerType : "";

    if (offerData.offerAttributes) {
      visibleToList = offerData.offerAttributes.visibleTo
        ? offerData.offerAttributes.visibleTo
        : [];

      selectedDaysList = offerData.offerAttributes.validOn
        ? offerData.offerAttributes.validOn
        : [];

      outletsList =
        offerData.offerAttributes.outlets &&
        offerData.offerAttributes.outlets.length > 0
          ? offerData.offerAttributes.outlets
          : offerData?.id && offerData.locationId
          ? [offerData.locationId]
          : [];

      itemCode = offerData.offerAttributes.itemDetails.itemCode
        ? offerData.offerAttributes.itemDetails.itemCode
        : "";

      offersAppliedAt = offerData.offerAttributes.itemDetails.offersAppliedAt
        ? offerData.offerAttributes.itemDetails.offersAppliedAt
        : "Q";

      scaleLevel = offerData.offerAttributes.itemDetails.scaleLevel
        ? offerData.offerAttributes.itemDetails.scaleLevel
        : "";
      //console.log(scaleLevel, "scaleLevel");
      usageFrequencePerCustomer = offerData.offerAttributes
        .usageFrequencePerCustomer
        ? offerData.offerAttributes.usageFrequencePerCustomer
        : "";

      usagePerCustomerPerDay = offerData.offerAttributes.usagePerCustomerPerDay
        ? offerData.offerAttributes.usagePerCustomerPerDay
        : "";

      offerBasedOn = offerData.offerAttributes.offerBasedOn
        ? offerData.offerAttributes.offerBasedOn
        : offerData.offerAttributes.offerBasedOn == 0
        ? 0
        : null;

      Discounttype = offerData.offerAttributes.itemDetails.discountType
        ? offerData.offerAttributes.itemDetails.discountType
        : "";
    }
  }
 // console.log(offerData.offerRate, "checking offerDartaa");
 
  const [DaysArray, setDaysArray] = useState([
    {
      day: "Sun",
      value: "S",
      id: 7,
      selected: selectedDaysList.includes(7),
    },
    {
      day: "Mon",
      value: "M",
      id: 1,
      selected: selectedDaysList.includes(1),
    },
    {
      day: "Tue",
      value: "T",
      id: 2,
      selected: selectedDaysList.includes(2),
    },
    {
      day: "Wed",
      value: "W",
      id: 3,
      selected: selectedDaysList.includes(3),
    },
    {
      day: "Thur",
      value: "T",
      id: 4,
      selected: selectedDaysList.includes(4),
    },
    {
      day: "Fri",
      value: "F",
      id: 5,
      selected: selectedDaysList.includes(5),
    },
    {
      day: "Sat",
      value: "S",
      id: 6,
      selected: selectedDaysList.includes(6),
    },
  ]);
  const errorExceptionKeys = [
    "id",
    "locationId",
    "minOrderAmount",
    "redeemedSofar",
    "itemQuantity",
    "scaleLevel",
    "offerRate",
    "maxDiscount",
    "offerBasedOn",
    "isEnabled",
    "itemCode",
    "validityFrom",
    "validityUntil",
    "offersAppliedAt",
    "maxUsageAcrossAllTranscation",
    "description",
    offerData.id ? "outlets" : "",
  ];

  const openScalePopup = (index, data, key) => {
    setScalePopupData({
      index,
      data,
      key,
    });
  };
  const [scalevalue, setScalevalue] = useState([
    {
      value: offerData.offerAttributes.itemDetails.scaleLevel
        ? `Scale Level 1: 1 - 2 item at${offerData.offerRate}%off`
        : `Scale Level 1: 1 - 2 item at 0% off`,
      id: "1",
      key: "2",
      checked: scaleLevel === "2",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? `Scale Level 2: 3 - 4  item at${offerData.offerRate}% off`
          : "Scale Level 2: 3 - 4 item at 0% off",

      id: "2",
      key: "4",
      checked: scaleLevel == "4",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? `Scale Level 3: 5 - 6  item at${offerData.offerRate}% off`
          : "Scale Level 3: 5 - 6 item at 0% off",

      id: "3",
      key: "6",
      checked: scaleLevel === "6",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? `Scale Level 4: 7 - 8 item at${offerData.offerRate}% off`
          : "Scale Level 4: 7 - 8 item at 0% off",

      id: "4",
      key: "8",
      checked: scaleLevel === "8",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
    {
      value:
        offerData.offerAttributes.itemDetails.scaleLevel 
          ? `Scale Level 5: 9 - 10 item at ${offerData.offerRate}% off`
          : "Scale Level 5: 9- 10 item at 0% off",

      id: "5",
      key: "10",
      checked: scaleLevel === "10",
      replace: offerData.offerRate?offerData.offerRate:"0",
    },
  ]);
  const updateScaleLevel = (key, index, text) => {
    // console.log("checking keyon scalevel-->", key, index, text);
    let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));

    let scalevalueList =
      data.offerAttributes.itemDetails.discountType === "R"
        ? scalevalue
        : Flatscalevalue;
    // console.log(
    //   scalevalueList[index].value.replace(
    //     scalevalueList[index].replace,
    //     `${text}`
    //   ),
    //   "checkingg"
    // );
    switch (key) {
      case "select_scale_dropdown":
        const replace =
          index === 4 && scalevalueList[index].replace == 0
            ? new RegExp("(\\b" + 0 + "\\b)(?!.*\\b\\1\\b)", "i")
            : scalevalueList[index].replace;

        scalevalueList[index].replace = `${text}`;
        // console.log(
        //   scalevalueList[index].replace,
        //   scalevalueList[index],
        //   replace,
        //   `${text}`
        // );
        scalevalueList[index].value =
          data.offerAttributes.itemDetails.discountType === "R"
            ? scalevalueList[index].value.replace(replace, `${text}`)
            : scalevalueList[index].value.replace(replace, `${text}`);

        break;

      default:
        break;
    }

    if (data.offerAttributes.itemDetails.discountType === "R") {
      setScalevalue(scalevalueList);
      setScalevalueUpdate(!scalevalueUpdate);
      setScalePopupData("");
      data.offerRate = "";
      setscaletext(text);
    } else if (data.offerAttributes.itemDetails.discountType === "F") {
      //  console.log(scalevalueList, text);
      setFlatscalevalue(scalevalueList);
      setScalevalueUpdate(!scalevalueUpdate);
      setScalePopupData("");
      data.offerRate = "";
      setscaletext(text);
      // setscaletext(prev => ([...prev, ...text]));
    }
  };

  let scalelevelToId = scalevalue.filter(
    (element) => scaleLevel === element.checked
  );

  const submitHandler = () => {
    isSubmitted = true;
    if (!validateForm(errorMsg)) {
      // console.log(errorMsg, "checkerror");

      let error = "";

      if (errorMsg.offerCode) {
        error += `Promocode Should not be empty \n`;
      }
      // if (errorMsg?.description) {
      //   error += `${errorMsg.description} \n`;
      // }
      if (errorMsg?.offerRate) {
        error += `${errorMsg.offerRate} \n`;
      }
      if (errorMsg?.offerName) {
        error += `${errorMsg.offerName} \n`;
      }
      if (errorMsg?.discountType) {
        error += `${errorMsg.discountType} \n`;
      }
      if (errorMsg?.itemCode) {
        error += `${errorMsg.itemCode} \n`;
      }
      // if (errorMsg?.maxUsageAcrossAllTranscation) {
      //   error += `${errorMsg.maxUsageAcrossAllTranscation} \n`;
      // }
      if (errorMsg?.visibleTo) {
        error += `${errorMsg.visibleTo} \n`;
      }
      if (errorMsg?.validOn) {
        error += `${errorMsg.validOn} \n`;
      }
      if (errorMsg?.maxRedeem) {
        error += `Max Person Allowed to use this offer Should not be empty \n`;
      }
      if (errorMsg?.offerType) {
        error += `${errorMsg.offerType} \n`;
      }
      if (errorMsg?.offersAppliedAt) {
        error += `${errorMsg.offersAppliedAt} \n`;
      }
      if (errorMsg?.offerTerms) {
        error += `${errorMsg.offerTerms} \n`;
      }
      if (errorMsg?.usageFrequencePerCustomer) {
        error += `${errorMsg.usageFrequencePerCustomer} \n`;
      }
      if (errorMsg?.usagePerCustomerPerDay) {
        error += `${errorMsg.usagePerCustomerPerDay} \n`;
      }
      if (errorMsg?.outlets) {
        error += `${errorMsg.outlets} \n`;
      }
      if (errorMsg?.order_type_id) {
        error += `Please Select orderType \n`;
      }
      // if (errorMsg?.maxDiscount) {
      //   error += `${errorMsg.maxDiscount} \n`;
      // }

      alert(error);

      return;
    }
    const offerTypeIds =
      offerData.order_type_id &&
      JSON.parse(offerData.order_type_id) &&
      JSON.parse(offerData.order_type_id).typeIds
        ? JSON.parse(offerData.order_type_id).typeIds.map(function (item) {
            return item;
          })
        : [];
    let selectedOrderTypeId = OrderTypedropdown.filter((element) =>
      offerTypeIds.includes(element.id)
    );

    let outletId = outletbranchvalue.filter((element) => element.checked);
    let visibleToId = VisibleTo.filter((element) => element.checked);
    let scalelevelToId = scalevalue.filter(
      (element) => scaleLevel === element.checked
    );

    let itemCodeId = storename.filter((element) => itemCode == element.id);

    let data = {
      locationId: "" || offerData.locationId,
      id: offerData.id || null,
      offerName: offerData.offerName,
      offerCode: offerData.offerCode,
      offerType: offerData.offerType,
      offerRate:
        offerData.offerRate === null
          ? offerData.offerRate || Number(scaletext)
          : offerData.offerRate !== null
          ? Number(scaletext) || offerData.offerRate
          : offerData.offerAttributes.itemDetails.itemQuantity === 0
          ? offerData.offerRate
          : offerData.offerRate === 0 ? Number(offerData.maxDiscount):Number(scaletext),
      minOrderAmount: Number(offerData.minOrderAmount),
      maxDiscount:
        Number(offerData.maxDiscount) ||
        offerData.offerRate ||
        Number(scaletext),
      maxRedeem: Number(offerData.maxRedeem) || 1,
      redeemedSofar: Number(offerData.redeemedSofar),
      order_type_id: selectedOrderTypeId,
      offerTerms: offerTerms.toString(),
      validityFrom: moment.utc(new Date(startDate)).format(),
      validityUntil: moment.utc(new Date(EndDate)).format(),
      validity_options: "{}",
      isEnabled: "1",
      offerAttributes: {
        description: "",
        outlets: outletId,
        validOn: offerData.offerAttributes.validOn,
        maxUsageAcrossAllTranscation: 0,
        // offerData.offerAttributes.maxUsageAcrossAllTranscation, //1
        usageFrequencePerCustomer:
          offerData.offerAttributes.usageFrequencePerCustomer,
        usagePerCustomerPerDay: Number(usagePerCustomerPerDay),
        visibleTo: visibleToId,
        currencyType: checkingstate === "IN" ? "INR" : "USD",
        offerBasedOn: offerData.offerAttributes.offerBasedOn,
        itemDetails: {
          discountType: offerData.offerAttributes.itemDetails.discountType,
          offersAppliedAt:
            offerData.offerAttributes.itemDetails.itemQuantity !== 0 &&
            offerData.offerAttributes.itemDetails.itemQuantity !== null &&
            offerData.offerAttributes.itemDetails.itemQuantity
              ? "Q"
              : offerData.offerAttributes.itemDetails.offersAppliedAt,
          itemCode:
            itemCodeId || offerData.offerAttributes.itemDetails.itemCode,
          itemQuantity: offerData.offerAttributes.itemDetails.itemQuantity || 0,
          scaleLevel: [scaleLevel] || scalelevelToId || 0,
        },
      },
    };
   // console.log(data, "checking the data passed to preview offer");

    if (
      data.offerCode !== null &&
      data.offerCode !== "" &&
      data.validityUntil !== "1970-01-01T00:00:00Z" &&
      data.validityFrom !== "1970-01-01T00:00:00Z" &&
      data.offerRate !== 0
    ) {
      // console.log("dddddd");
      setPreviewState(data);
    } else if (data.offerCode === null) {
      alert("Please Enter Promocode");
    } else if (
      data.validityFrom === "1970-01-01T00:00:00Z" ||
      data.validityFrom === null ||
      data.validityUntil === "1970-01-01T00:00:00Z" ||
      data.validityUntil === null
    ) {
      alert("Please Select validity");
    } else if (data.offerRate === 0 || data.offerRate === null) {
      alert("Please Enter Discount value");
    } else {
      alert("Please fill all details");
    }
    return;
  };

  const isOfferBasedOn = (e, type) => {
    if (e.target.checked && offerBasedOn != type) {
      let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));
      data.offerAttributes.offerBasedOn = type;
      if (type == 1) {
        data.offerAttributes.itemDetails.offersAppliedAt = "Q";
      } else if (type == 0) {
        data.offerAttributes.itemDetails.offersAppliedAt = null;
      }

      setOfferState(data);
      const errorObj = getErrorList(data);
      setErrorMsg(errorObj);
    }
  };

  const daysArrayOnclick = (event) => {
    let selectedDaysList = [];
    let selectedDay = DaysArray.map((days, index) => {
      if (days.id === event.id) {
        days.selected = !days.selected;
      }
      if (days.selected) {
        selectedDaysList.push(Number(days.id));
      }
      return days;
    });
    setDaysArray(selectedDay);
    let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));
    data.offerAttributes.validOn = selectedDaysList;
    setOfferState(data);
    const errorObj = getErrorList(data);
    setErrorMsg(errorObj);
  };

  const handleUserDetails = ({ target }) => {
    let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));

    switch (target.name) {
      // case "description":
      //   data.offerAttributes.description = target.value;
      //   break;

      // case "maxUsageAcrossAllTranscation":
      //   data.offerAttributes.maxUsageAcrossAllTranscation = target.value;
      //   break;maxRedeem
      case "maxRedeem":
        if (Math.sign(target.value) >= 0) {
          data.maxRedeem = target.value;
        } else {
          alert("Accepts only Positive numbers");
        }
        break;
      case "offerRate":
        if (Math.sign(target.value) >= 0) {
          data.offerRate = target.value;
          setscaletext("");
        } else {
          alert("Accepts only Positive numbers");
        }
        break;
      case "minOrderAmount":
        if (Math.sign(target.value) >= 0) {
          data.minOrderAmount = target.value;
        } else {
          alert("Accepts only Positive numbers");
        }
        break;
      case "maxDiscount":
        if (Math.sign(target.value) >= 0) {
          data.maxDiscount = target.value;
        } else {
          alert("Accepts only Positive numbers");
        }
        break;
      case "itemQuantity":
        if (Math.sign(target.value) >= 0) {
          data.offerAttributes.itemDetails.itemQuantity = target.value;
        } else {
          alert("Accepts only Positive numbers");
        }

        break;

      case "offersAppliedAt":
        data.offerAttributes.itemDetails.offersAppliedAt = target.value;
        break;

      default:
        data = { ...data, [target.name]: target.value };
        break;
    }
    setOfferState(data);
    const errorObj = getErrorList(data);
    setErrorMsg(errorObj);
  };

  const getErrorList = (data) => {
    let errorObj = {};
    let list = Object.keys(data);

    for (let i = 0; i < list.length; i++) {
      const value = list[i];

      if (!errorExceptionKeys.includes(value)) {
        let error = {};
        switch (typeof data[value]) {
          case "object":
            if (!data[value]) {
              error = {
                [value]: `${convertCamelCase(value)} Should not be empty.`,
              };
            } else if (Array.isArray(data[value])) {
              if (!data[value] || !data[value].length) {
                error = {
                  [value]: `${convertCamelCase(value)} Should not be empty.`,
                };
              }
            } else {
              error = getErrorList(data[value]);
            }
            break;

          case "number":
          case "boolean":
          case "string":
            if (!data[value]) {
              // console.log(data[value], "DDDDDDD");
              error = {
                [value]: `${convertCamelCase(value)} Should not be empty.`,
              };
            }
            break;

          case "undefined":
            error = {
              [value]: `${convertCamelCase(value)} Should not be empty.`,
            };
            break;

          default:
            break;
        }
        if (error) {
          errorObj = { ...errorObj, ...error };
        }
      }
    }
    return errorObj;
  };

  const convertCamelCase = (string) => {
    return string
      .replace(/([A-Z])/g, " $1") // insert a space before all caps
      .replace(/^./, function (str) {
        return str.toUpperCase();
      }); // uppercase the first character
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const onSelect = (type, selectedList, list) => {
    let data = Object.assign({}, JSON.parse(JSON.stringify(offerData)));
    //console.log("selectedList",selectedList,type)
    switch (type) {
      case "order_type_dropdown":
        const orderTypeId = JSON.stringify({ typeIds: selectedList });
        data.order_type_id = selectedList.length > 0 ? orderTypeId : "";
        break;

      case "outlet_dropdown":
        data.offerAttributes.outlets = selectedList;
        break;

      case "visible_to_dropdown":
        data.offerAttributes.visibleTo = selectedList;
        break;

      case "usage_frequency_per_day_dropdown":
        data.offerAttributes.usageFrequencePerCustomer = selectedList;
        if (selectedList === "ONE") {
          data.offerAttributes.usagePerCustomerPerDay = "1";
        } else {
          data.offerAttributes.usagePerCustomerPerDay = "";
        }
        break;
      case "Discount_Type":
        data.offerAttributes.itemDetails.discountType = selectedList;
        if (selectedList == "R") {
          data.offerType = "PERCENT";
        } else if (selectedList == "F") {
          data.offerType = "FLATFEE";

          if (checkingstate && checkingstate === "IN") {
            setcheckingrupeessymbol("$");
          } else if (checkingstate && checkingstate !== "IN") {
            setcheckingrupeessymbol("Rs.");
          }
        }
        setScalevalueUpdate(!scalevalueUpdate);
        break;
      case "menu_category_dropdown":
        data.offerAttributes.itemDetails.itemCode = selectedList;
        break;
      case "select_scale_dropdown":
        data.offerAttributes.itemDetails.scaleLevel = selectedList;
        if (selectedList != null) {
          data.offerAttributes.itemDetails.offersAppliedAt = "S";
        } else if (selectedList === null) {
          data.offerAttributes.itemDetails.offersAppliedAt = "Q";
        }

        break;

      case "usage_customer_per_day_dropdown":
        data.offerAttributes.usagePerCustomerPerDay = selectedList;
        break;

      case "terms_conditions_dropdown":
        data.offerTerms = selectedList.toString();
        break;

      default:
        break;
    }

    setOfferState(data);
    const errorObj = getErrorList(data);
    setErrorMsg(errorObj);
  };

  const addDropdownItem = (type, value) => {
    if (!value) {
      return;
    }

    switch (type) {
      case "terms_condition_dropdown_add":
        let addvalueArray = termsConditions;
        let add = {
          value: value,
          id: String(addvalueArray.length + 1),
        };
        addvalueArray = [...addvalueArray, add];
        settermsconditions(addvalueArray);
        break;

      default:
        break;
    }
  };

  const checkandSetStartDate = (date) => {
    let today = new Date();
    let isTodayBeforeOfferValidity = moment(today).isBefore(date);
    let EndDate = new Date();
    if (isTodayBeforeOfferValidity) {
      setStartDate(date);
    } else if (!isTodayBeforeOfferValidity) setStartDate(new Date());

    if (date && EndDate) {
      // console.log(date,EndDate,"check end date")
      const dateEpoch = new Date(date).valueOf();

      const endDateEpoch = new Date(EndDate).valueOf();

      //console.log(dateEpoch,endDateEpoch,"-->endDateEpoch")
      if (dateEpoch > endDateEpoch) {
        setEndDate(date);
      }
    }
  };

  const checkandEndDate = (date) => {
    // console.log(date<startDate,"checkandEndDate")
    let today = new Date();
    let isTodayBeforeOfferValidity = moment(today).isBefore(date);

    if (isTodayBeforeOfferValidity) {
      // if(date<startDate){

      // }

      date < startDate ? setEndDate(startDate) : setEndDate(date);
    } else if (!isTodayBeforeOfferValidity) setEndDate(startDate);
  };

  const checkmindate = (startDate) => {
    if (new Date() && new Date(startDate)) {
      return new Date(startDate);
    } else {
      return new Date(startDate);
    }
  };

  //   const  calculateMinTime = date => {
  //     console.log("first",date)
  //     let isToday = moment(date).isSame(moment(), 'day');
  //     if (isToday) {
  //         let nowAddOneHour = moment(new Date()).add({hours: 1}).toDate();
  //         return nowAddOneHour;
  //     }
  //     console.log(moment().startOf('day').toDate())
  //     return moment().startOf('day').toDate();
  // }

  return previewData ? (
    <PreviewOffer state={previewData} onBack={() => setPreviewState("")} />
  ) : (
    <>
      {scalePopupData && (
        <ScaleLevelPopup
          setScalePopupData={setScalePopupData}
          updateScaleLevel={updateScaleLevel}
          data={scalePopupData}
        />
      )}

      <div className="menu-list offer_list">
        <div className="mainpage_boxshade">
          <div>
            <h2 className="green-txt m-b-15 d-inline-block">
              {header} Offer Details
            </h2>
            <div className="tab_border"></div>
            <div className="m-b-15">
              <h3>Primary Details</h3>
            </div>
          </div>
          <div className="row m-0">
            <div className="primary_details">
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    <TextInput
                      type="text"
                      onKeyDown={(evt) =>
                        offerData.offerName === "" &&
                        evt.key === " " &&
                        evt.preventDefault()
                      }
                      placeholder="Offer Name (max 12 characters)"
                      name="offerName"
                      maxLength={12}
                      value={offerData.offerName ? offerData.offerName : ""}
                      onChange={(e) => handleUserDetails(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomDropDown
                      selected_list={offerTypeIds}
                      select_key="id"
                      list={OrderTypedropdown}
                      dropdown_key="order_type_dropdown"
                      placeholder="Select Order Type"
                      onSelect={(type, selectedList) =>
                        onSelect(type, selectedList)
                      }
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextInput
                      type="text"
                      onKeyDown={(evt) =>
                        offerData.offerCode === "" &&
                        evt.key === " " &&
                        evt.preventDefault()
                      }
                      name="offerCode"
                      placeholder="Promocode (max 10 characters)"
                      maxLength={10}
                      value={offerData.offerCode ? offerData.offerCode : ""}
                      onChange={(e) => handleUserDetails(e)}
                    />
                  </div>
                  <div className="col-md-6">
                    <CustomDropDown
                      selected_list={outletsList}
                      select_key="id"
                      list={outletbranchvalue}
                      show_all={true}
                      //disable={offerData?.id ? true : false}
                      disable={offerData?.id ? true : false}
                      dropdown_key="outlet_dropdown"
                      placeholder="Select Outlet"
                      onSelect={(type, selectedList, list) =>
                        onSelect(type, selectedList, list)
                      }
                    />
                  </div>
                </div>
                <div className="row m-b-15">
                  <div className="col-md-6">
                    <CustomDropDown
                      selected_list={offerTerms}
                      select_key="value"
                      list={termsConditions}
                      show_all={true}
                      disable={false}
                      dropdown_key="terms_conditions_dropdown"
                      placeholder="Select Terms and conditions"
                      onSelect={(type, selectedList, list) =>
                        onSelect(type, selectedList, list)
                      }
                    >
                      <DropdownAddItem
                        dropdown_key="terms_condition_dropdown_add"
                        addDropdownItem={(type, value) =>
                          addDropdownItem(type, value)
                        }
                      />
                    </CustomDropDown>
                  </div>
                  <div className="col-md-6">
                    <CustomDropDown
                      selected_list={visibleToList}
                      select_key="key"
                      list={VisibleTo}
                      show_all={true}
                      dropdown_key="visible_to_dropdown"
                      placeholder="Select Visible To"
                      onSelect={(type, selectedList, list) =>
                        onSelect(type, selectedList, list)
                      }
                    />
                  </div>
                </div>
                <div className="row m-t-20">
                  <div className="col-md-6">
                    {/* <textarea
                      type="text"
                      name="description"
                      onKeyDown={(evt) =>
                        offerData.offerAttributes?.description === "" &&
                        evt.key === " " &&
                        evt.preventDefault()
                      }
                      placeholder="Offer Description"
                      rows="4"
                      value={
                        offerData.offerAttributes?.description
                          ? offerData.offerAttributes?.description
                          : ""
                      }
                      cols="50"
                      className="discription"
                      onChange={(e) => handleUserDetails(e)}
                    ></textarea> */}
                  </div>
                  <div className="col-md-6">
                    {/* <TextInput
                      type="number"
                      onKeyDown={(evt) =>
                        evt.key === "e" && evt.preventDefault()
                      }
                      name="maxRedeem"
                      placeholder="Max person allowed to use this offer"
                      value={offerData.maxRedeem ? offerData.maxRedeem : ""}
                      onChange={(e) => handleUserDetails(e)}
                    /> */}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="row m-0">
                  <div className="col-md-12 w-100">
                    <h3 className="tooltip m-b-15 subheadingsize position-relative">
                      Offer Type{" "}
                      <span className="tooltipalign">
                        <img src={About} alt="" className="plus_img" />

                        <p className="hover_tab tooltiptext">
                          Discount Value based on number of items or total
                          amount
                        </p>
                      </span>
                    </h3>

                    <small className="dis_value">Discount value based on</small>
                    <div className="d-flex">
                      <div className="radiotypeitems mb-3 me-3">
                        <label className="checkbox-custom">
                          Invoice
                          <input
                            type="radio"
                            className="radio_btn"
                            checked={offerBasedOn == 0 ? "checked" : ""}
                            name="radio"
                            onChange={(e) => isOfferBasedOn(e, 0)}
                          />
                          <span className="checkbox-labels"></span>
                        </label>
                      </div>
                      <div className="radiotypeitems mb-3">
                        <label className="checkbox-custom">
                          Quantity
                          <input
                            type="radio"
                            className="radio_btn"
                            checked={offerBasedOn == 1 ? "checked" : ""}
                            name="radio"
                            value="R"
                            onChange={(e) => isOfferBasedOn(e, 1)}
                          />
                          <span className="checkbox-labels"></span>
                        </label>
                      </div>
                    </div>
                    <div className="quantity_invoice m-t-20">
                      <div className="row m-0 ml-8">
                        {offerBasedOn == 1 ? (
                          <div className="col-md-6">
                            <CustomDropDown
                              selected_id={itemCode}
                              select_key="id"
                              hide_check_box={true}
                              list={storename}
                              is_single={true}
                              dropdown_key="menu_category_dropdown"
                              placeholder="Menu Category"
                              disable={false}
                              onSelect={(type, selectedList, list) =>
                                onSelect(type, selectedList, list)
                              }
                            />

                            <CustomDropDown
                              selected_id={Discounttype}
                              select_key="key"
                              type="radio"
                              list={DiscountType}
                              is_single={true}
                              dropdown_key="Discount_Type"
                              placeholder="Discount Type"
                              onSelect={(type, selectedList, list) =>
                                onSelect(type, selectedList, list)
                              }
                            />

                            {!scaleLevel ? (
                              <>
                                {" "}
                                <div>
                                  <TextInput
                                    type="number"
                                    // step={1}
                                    // pattern="\d+"
                                    // min={1}
                                    placeholder="Item's Quantity"
                                    name="itemQuantity"
                                    onKeyDown={(evt) =>
                                      evt.key === "e" && evt.preventDefault()
                                    }
                                    value={
                                      offerData.offerAttributes?.itemDetails
                                        .itemQuantity
                                        ? offerData.offerAttributes?.itemDetails
                                            .itemQuantity
                                        : ""
                                    }
                                    onChange={(e) => handleUserDetails(e)}
                                  />
                                </div>
                                {offerData.offerAttributes?.itemDetails
                                  ?.discountType === "R" && (
                                  <div>
                                    <TextInput
                                      type="number"
                                      placeholder="Discount %"
                                      onKeyDown={(evt) =>
                                        evt.key === "e" && evt.preventDefault()
                                      }
                                      name="offerRate"
                                      value={
                                        offerData.offerRate
                                          ? offerData.offerRate
                                          : ""
                                      }
                                      onChange={(e) => handleUserDetails(e)}
                                    />
                                  </div>
                                )}
                                {offerData.offerAttributes?.itemDetails
                                  ?.discountType === "R" ? (
                                  <div>
                                    {/* // <div className="position-relative m-t-30"> */}
                                    {/* <small className="option_txt">
                                      Optional
                                    </small> */}

                                    <TextInput
                                      type="number"
                                      placeholder="Max.discount amount(in Rs/$)"
                                      onKeyDown={(evt) =>
                                        evt.key === "e" && evt.preventDefault()
                                      }
                                      name="maxDiscount"
                                      value={
                                        offerData.maxDiscount
                                          ? offerData.maxDiscount
                                          : ""
                                      }
                                      onChange={(e) => handleUserDetails(e)}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    {" "}
                                    <TextInput
                                      type="number"
                                      placeholder="Flat discount Amount"
                                      onKeyDown={(evt) =>
                                        evt.key === "e" && evt.preventDefault()
                                      }
                                      name="offerRate"
                                      value={
                                       offerData.offerRate
                                          ? offerData.offerRate
                                          : ""
                                      }
                                      onChange={(e) => handleUserDetails(e)}
                                    />
                                  </div>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : offerBasedOn == 0 ? (
                          <div className="col-md-6">
                            <CustomDropDown
                              selected_id={Discounttype}
                              select_key="key"
                              type="radio"
                              list={DiscountType}
                              is_single={true}
                              dropdown_key="Discount_Type"
                              placeholder="Discount Type"
                              onSelect={(type, selectedList, list) =>
                                onSelect(type, selectedList, list)
                              }
                            />

                            <div>
                              <TextInput
                                type="number"
                                placeholder="Min Order Amount"
                                name="minOrderAmount"
                                onKeyDown={(evt) =>
                                  evt.key === "e" && evt.preventDefault()
                                }
                                value={
                                  offerData.minOrderAmount
                                    ? offerData.minOrderAmount
                                    : ""
                                }
                                onChange={(e) => handleUserDetails(e)}
                              />
                            </div>
                            {offerData.offerAttributes?.itemDetails
                              ?.discountType === "R" && (
                              <div>
                                <TextInput
                                  type="number"
                                  placeholder="Discount %"
                                  name="offerRate"
                                  onKeyDown={(evt) =>
                                    evt.key === "e" && evt.preventDefault()
                                  }
                                  value={
                                    offerData.offerRate
                                      ? offerData.offerRate
                                      : ""
                                  }
                                  onChange={(e) => handleUserDetails(e)}
                                />
                              </div>
                            )}

                            {offerData.offerAttributes?.itemDetails
                              ?.discountType === "R" ? (
                              <div>
                                <TextInput
                                  type="number"
                                  placeholder="Max. Discount  Amount"
                                  name="maxDiscount"
                                  onKeyDown={(evt) =>
                                    evt.key === "e" && evt.preventDefault()
                                  }
                                  value={
                                    offerData.maxDiscount
                                      ? offerData.maxDiscount
                                      : ""
                                  }
                                  onChange={(e) => handleUserDetails(e)}
                                />
                              </div>
                            ) : (
                              <div>
                                {" "}
                                <TextInput
                                  type="number"
                                  placeholder="Flat discount Amount"
                                  onKeyDown={(evt) =>
                                    evt.key === "e" && evt.preventDefault()
                                  }
                                  name="offerRate"
                                  value={
                                   offerData.offerRate
                                      ? offerData.offerRate
                                      : ""
                                  }
                                  onChange={(e) => handleUserDetails(e)}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                        {(offerBasedOn === 1 &&
                          offerBasedOn !== 0 &&
                          scalelevelToId.length > 0) ||
                        (offerBasedOn !== 0 &&
                          offerData.offerAttributes?.itemDetails
                            .itemQuantity === null) ||
                        (offerData.offerAttributes?.itemDetails.itemQuantity ===
                          0 &&
                          offerBasedOn !== 0) ||
                        (offerData.offerAttributes.itemDetails.itemQuantity ===
                          "" &&
                          offerBasedOn !== 0) ||
                        (offerBasedOn !== 0 &&
                          offerData.offerAttributes?.itemDetails
                            .offersAppliedAt === "S") ||
                        (offerData.offerAttributes?.itemDetails.itemQuantity ===
                          undefined &&
                          offerBasedOn !== 0) ? (
                          <div className="col-md-6">
                            <div>
                              <small className="tooltip tooltip_txt m-b-15 subheadingsize d-inline-block">
                                Offer Applied at{" "}
                                <span className="tooltipalign">
                                  <img
                                    src={About}
                                    alt=""
                                    className="plus_img"
                                  />

                                  <p className="hover_tab tooltiptext">
                                    Discount Value applied on scale Level
                                  </p>
                                </span>
                                <small
                                  className="hover_tab"
                                  style={{ display: "none" }}
                                >
                                  Discount Value applied on
                                </small>
                              </small>
                            </div>
                            <label className="m-b-10 d-inline-block">
                              Scale Level{" "}
                              <span className="small_txt d-inline-block">
                                (optional)
                              </span>
                            </label>
                            <CustomDropDown
                              onChange={(e) => isOfferBasedOn(e, 1)}
                              selected_id={scaleLevel}
                              select_key="key"
                              type="radio"
                              list={
                                offerData.offerAttributes.itemDetails
                                  .discountType == "R"
                                  ? scalevalue
                                  : offerData.offerAttributes.itemDetails
                                      .discountType == "F"
                                  ? Flatscalevalue
                                  : ""
                              }
                              is_single={true}
                              openScalePopup={(index, data, key) =>
                                openScalePopup(index, data, key)
                              }
                              list_update={scalevalueUpdate}
                              dropdown_key="select_scale_dropdown"
                              placeholder="Select Scale"
                              onSelect={(type, selectedList, list) =>
                                onSelect(type, selectedList, list)
                              }
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="m-t-20 m-b-20">
                <h3 className="subheadingsize">Validity</h3>
                <small className="small_txt m-b-20">Date &amp; Time</small>
                <div className="row">
                  <div className="col-md-6 position-relative">
                    <label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => checkandSetStartDate(date)}
                        minDate={new Date()}
                        timeInputLabel="Time:"
                        dateFormat="dd/MM/yyyy h:mm aa"
                        showTimeInput
                        placeholderText={"Start"}
                        minTime={minTimevalue}
                        disabledKeyboardNavigation
                        maxTime={moment().endOf("day").toDate()}
                      />
                      <img
                        className="cal_icon"
                        alt=""
                        src={Calendar}
                        width="15"
                      />
                    </label>
                  </div>
                  <div className="col-md-6 position-relative">
                    <CustomDropDown
                      selected_id={usageFrequencePerCustomer}
                      select_key="key"
                      type="radio"
                      list={usageFrequency}
                      is_single={true}
                      dropdown_key="usage_frequency_per_day_dropdown"
                      placeholder="Select Usage Frequency per customer"
                      onSelect={(type, selectedList, list) =>
                        onSelect(type, selectedList, list)
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 position-relative">
                    <div className="react-datepicker-wrapper">
                      <label>
                        <DatePicker
                          selected={EndDate ? EndDate : ""}
                          onChange={(date) => checkandEndDate(date)}
                          timeInputLabel="Time:"
                          dateFormat="dd/MM/yyyy h:mm aa"
                          showTimeInput
                          //minDate ={checkmindate(startDate)}
                          minDate={
                            location.state !== undefined
                              ? checkmindate(startDate)
                              : new Date(startDate)
                          }
                          // minDate={moment(startDate).toDate()}
                          disabledKeyboardNavigation
                          placeholderText={"End "}
                        />
                        <img
                          className="cal_icon"
                          alt=""
                          src={Calendar}
                          width="15"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      type="number"
                      onKeyDown={(evt) =>
                        evt.key === "e" && evt.preventDefault()
                      }
                      name="maxRedeem"
                      placeholder="Max person allowed to use this offer"
                      value={offerData.maxRedeem ? offerData.maxRedeem : ""}
                      onChange={(e) => handleUserDetails(e)}
                    />
                    {/* <TextInput
                      type="number"
                      placeholder="Max usage across all transactions"
                      name="maxUsageAcrossAllTranscation"
                      onKeyDown={(evt) =>
                        evt.key === "e" && evt.preventDefault()
                      }
                      value={
                        offerData.offerAttributes?.maxUsageAcrossAllTranscation
                          ? offerData.offerAttributes
                              .maxUsageAcrossAllTranscation
                          : ""
                      }
                      onChange={(e) => handleUserDetails(e)}
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <small className="small_txt m-b-20">Valid On</small>
                    <div className={"day_select"}>
                      {DaysArray.map((value, index) => (
                        <div
                          key={index}
                          className={value.selected ? "selected_weekday" : ""}
                          onClick={() => {
                            daysArrayOnclick(value);
                          }}
                        >
                          {value.value}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6"></div>
                </div>
                <div className="row m-t-20">
                  <div className="col-md-6">
                    <CustomDropDown
                      selected_id={usagePerCustomerPerDay}
                      select_key="key"
                      type="radio"
                      list={usageCustomerPerday}
                      disable={
                        offerData?.offerAttributes
                          ?.usageFrequencePerCustomer === "ONE"
                          ? true
                          : false
                      }
                      is_single={true}
                      dropdown_key="usage_customer_per_day_dropdown"
                      placeholder="Select Usage per customer per day"
                      onSelect={(type, selectedList, list) =>
                        onSelect(type, selectedList, list)
                      }
                    />
                  </div>
                  <div className="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>

          {/* </div> */}
        </div>
        {/* <div className="footer"> */}
        <div className="float-right buttons_Section">
          <Link to={"/management/Offers"} className="offer-btn cancel-btn">
            Cancel
          </Link>
          <button type={"button"} onClick={submitHandler} className="offer-btn">
            Next Step
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateOffer;
