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
  const { patchedData, setPatchedData,partialData,setPartialData} = useContext(Contextpagejs);
  const partaldatasending = useSelector(
    (state: any) => state.productCatalog.partialDataSendingLoading
  );
  const partaldatasendingsuccessmsg = useSelector(
    (state: any) => state.productCatalog?.partialDataSendingsuccess
  );

 

  const data = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const ordertypesdata = data[0].orderTypes;

  const dispatch = useDispatch();

  const handleCancelButton = () => {
    dispatch(removeDataRequest());
    setPartialData((prev:any)=>({

    
       ...prev,
      pricing:[],
      modifierInfo:[],
      itemAvailabilityInfo:[]
   } ))
    onclose();
  };
  useEffect(() => {}, [partaldatasending, dispatch]);
  const [hasTrue, setHasTrue] = useState(false);
  const isPartialDataValid = () => {
    const { itemId, pricing, modifierInfo, itemAvailabilityInfo } = partialData;
  
  
    if ( pricing.length || modifierInfo.length || itemAvailabilityInfo.length) {
      return true;
    }
  
    return false;
  };
  const handledispatchforpartilChange = () => {
 

    setHasTrue(true);

   




    if(isPartialDataValid())
    {
      dispatch(partialUpdateMenuRequest(partialData, locationid));
      setPartialData((prev:any)=>({

    
        ...prev,
       pricing:[],
       modifierInfo:[],
       itemAvailabilityInfo:[]
    } ))

    }
   

    // if(partaldatasendingsuccessmsg!=="")
    // {
    //   onclose();
    // }
  };

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
          <button className="ChangeBtn"style={{
         
          opacity: isPartialDataValid() ? '100%' : '60%',
          
        }} onClick={handledispatchforpartilChange} disabled={!isPartialDataValid()}>
            Change
          </button>
        </div>
      </div>
      {/* {showModalAvailable && <AvailabilityChangesUntil  />} */}
    </>
  );
};

export default BasicChanges;
