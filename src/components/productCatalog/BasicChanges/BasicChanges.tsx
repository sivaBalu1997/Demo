import React, { useContext, useEffect, useState } from "react";
import "./BasicChanges.scss";
import ToggleSlider from "../ToggleSlider/ToggleSlider";
import Basic from "../../../assets/svg/BasicChangesImg.svg";
import { useDispatch, useSelector } from "react-redux";
import AvailCalender from "../AvailCalender/AvailCalender";
import AvailabilityChangesUntil from "./AvailableChangesUntil";
import {
  getMenuRequest,
  partialUpdateMenuRequest,
  removeDataRequest,
} from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";

interface BasiChangesProps {
  onclose: any;
}

const BasicChanges: React.FC<BasiChangesProps> = ({ onclose }) => {
  const locationid = useSelector(
    (state: any) => state.auth.credentials?.locationId
  );

  const [showModalAvailable, setShowModalAvailable] = useState(false);
  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  const partaldatasending = useSelector(
    (state: any) => state.productCatalog.partialDataSendingLoading
  );
  const partaldatasendingsuccessmsg = useSelector(
    (state: any) => state.productCatalog?.partialDataSendingsuccess
  );

  const comparePrices = (patchedData: any, orderTypes: any[]) => {
    const matchingTypes = patchedData.pricing.map((price: any) => {
      // Filter ordertypesdata to find matches
      const matchedPrice = ordertypesdata.filter(
        (item: any) => item.price != price.price
      );

      // Log the matched items

      if (matchedPrice.length > 0) {
        console.log({ matchedPrice });
      }

      return matchedPrice;
    });
  };

  const data = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );
  console.log("data", data);

  const ordertypesdata = data[0].orderTypes;
  console.log("ordertypesdata", ordertypesdata);

  const dispatch = useDispatch();

  const handleCancelButton = () => {
    dispatch(removeDataRequest());
    onclose();
  };
  useEffect(() => {}, [partaldatasending, dispatch]);
  const [hasTrue, setHasTrue] = useState(false);

  const handledispatchforpartilChange = () => {
    const hasPriceChanged = comparePrices(patchedData, ordertypesdata);
    console.log("hasPriceChanged", hasPriceChanged);

    setHasTrue(true);
    dispatch(partialUpdateMenuRequest(patchedData, locationid));

    // if(partaldatasendingsuccessmsg!=="")
    // {
    //   onclose();
    // }
  };
  console.log("patchedData55", patchedData);

  return (
    <>
      <div className="BasicChangesContainer">
        <div className="BasicChanges">
          <img src={Basic} className="BasicChangesImage" alt="Basic" />
          <p className="BasicChangesText">
          Edit basic settings here. Click the edit icon to see all options.
          </p>
        </div>
        <div className="CancelChange">
          <button className="CancelBtn" onClick={handleCancelButton}>
            Cancel
          </button>
          <button className="ChangeBtn" onClick={handledispatchforpartilChange}>
            Change
          </button>
        </div>
      </div>
      {/* {showModalAvailable && <AvailabilityChangesUntil  />} */}
    </>
  );
};

export default BasicChanges;
