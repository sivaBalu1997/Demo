import React, { useContext, useEffect, useRef, useState } from "react";
import "./Slider.scss";

import Pen from "../../../assets/images/edit 1.png";
import Eye from "../../../assets/images/eye-off.png";
import Bin from "../../../assets/images/Frame 3466811.png";
import EyeModal from "../EyeModal/EyeModal";
import Trash from "../Trash/Trash";
import NavSlider from "../NavSlider/NavSlider";
import ArrowHover from "../../../assets/svg/ArrowHover.svg";
import BasicChanges from "../BasicChanges/BasicChanges";
import { useSelector, useDispatch } from "react-redux";
import {
  addMockDataHiddenRequest,
  selectedMockDataRequest,
  storeMockDataRequest,
} from "redux/productCatalog/productCatalogActions";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { useHistory } from "react-router-dom";

interface PricingDetails {
  Dinein1: string[];
  Pickup1: string[];
  Delivery1: string[];
  Dinein2: string[];
  Pickup2: string[];
  Delivery2: string[];
  Inventory1: string[];
  Customize1: string[];
}

interface SideBarData {
  itemId: string;
  itemName: string;
  code: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: PricingDetails;
}

interface SliderProps {
  sidebartext: string;
  SideBarData: SideBarData[];
  onclose: any;
}

interface StoreMockDataReducer {
  data: any;
}

interface RootState {
  storeMockDataReducer: StoreMockDataReducer;
}

const Slider: React.FC<SliderProps> = ({
  onclose,
  sidebartext,
  SideBarData,
}) => {
  
  const dataFromRedux = useSelector(
    (state: any) => state?.storeDataReducer?.data
  );
  const data1=useSelector((state:any)=>state?.selectedMockDataReducer?.data)

  console.log("aaadta",data1)
  const {   setApiPayload,ApiPayload } = useContext(Contextpagejs);


console.log("sidbar",SideBarData);


  const history = useHistory();
  const { pen, setPen } = useContext(Contextpagejs);
  const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const [trash, setTrash] = useState(false);
  const [active, setActive] = useState("Pricing");
  const modelref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const data = useSelector(
    (state: RootState) => state.storeMockDataReducer.data
  );
  const menuData = useSelector((state:any) => state.productCatalog?.menuData)


  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Your modal close logic here
  };

  const handleItemClick = (item: string) => {
    const UpdatedeleteItem = data.filter(
      (item: SideBarData) => item.itemId !== dataFromRedux[0].id
    );
    setActive(item);
    dispatch(storeMockDataRequest(UpdatedeleteItem));
  };

  const handleEyeClick = () => {
    // const UpdatedeleteItem = menuData.filter(
    //   (item: SideBarData) => item.ca !== dataFromRedux[0].id
    // );
    const removedItem = menuData.find(
      (item: any) => item?.categoryId === dataFromRedux?.categoryId
    );
    
    
    // Ensure removedItem exists and has itemResponseList
    if (removedItem && Array.isArray(removedItem?.itemResponseList)) {
      // Find the final sub-item inside the itemResponseList array
      const finalSubItem = removedItem.itemResponseList.find(
        (subItem: any) => subItem?.itemId === data1[0].itemId
      );
      setApiPayload({
        itemId:finalSubItem.itemId

      })

    
      console.log("finalidtobe", finalSubItem);
    } else {
      console.log("No valid itemResponseList or removedItem found");
    }

    setEye(true);
    // dispatch(storeMockDataRequest(UpdatedeleteItem));
    // dispatch(addMockDataHiddenRequest(removedItem));
  };

  const handleBinClick = () => {
    // const UpdatedeleteItem = data.filter(
    //   (item: SideBarData) => item.id !== dataFromRedux[0].id
    // );
    // dispatch(storeMockDataRequest(UpdatedeleteItem));


      const removedItem = menuData.find(
      (item: any) => item?.categoryId === dataFromRedux?.categoryId
    );
    
    
    // Ensure removedItem exists and has itemResponseList
    if (removedItem && Array.isArray(removedItem?.itemResponseList)) {
      // Find the final sub-item inside the itemResponseList array
      const finalSubItem = removedItem.itemResponseList.find(
        (subItem: any) => subItem?.itemId === data1[0].itemId
      );
      setApiPayload({
        itemId:finalSubItem.itemId
      })}
    
      setTrash(true)
  };

  const handleOnclose = () => {
    // Logic for on close
  };

  const handlePen = () => {
    history.push("/productCatalog/PrimaryDetails", { id: dataFromRedux[0].id });
    setPen(!pen);
  };

  const scrollToComponent = (componentName: string) => {
    if (scrollRef.current) {
      const element = document.querySelector(`.${componentName}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    // Dispatch action when ParentComponent mounts and the Slider is rendered
    dispatch(selectedMockDataRequest(SideBarData));
  }, [dispatch]);
  console.log(dataFromRedux)

  return (
    <div ref={modelref} className="Slider-Container" onClick={closeModal}>
      <div className="Slider-Window">
        <div className="Slider-Mainform">
          <div className="Slider-First-Row">
          <h1 className="Slider-Heading1">
          {data1?.length > 0 ? data1[0]?.itemName : "No Item Available"}
          </h1>
            <div className="Slider-icons">
              <div className="PenImage-Section">
                <img
                  src={Pen}
                  className="PenImage"
                  onClick={handlePen}
                  alt="Edit"
                />
                <div className="PenTool">
                  <img
                    src={ArrowHover}
                    className="ArrowHoverPen"
                    alt="Edit Tool"
                  />
                  <div className="PenTool-box">Edit</div>
                </div>
              </div>

              <img
                src={Eye}
                alt="View"
                className="PenImage"
                onClick={handleEyeClick}
              />

              <div className="BinImageSection">
                <img
                  src={Bin}
                  alt="Delete"
                  onClick={ handleBinClick}
                  className="BinImage"
                />
                <div className="DelTool">
                  <img
                    src={ArrowHover}
                    className="ArrowHoverDel"
                    alt="Delete Tool"
                  />
                  <div className="DelTool-box">Delete</div>
                </div>
              </div>
            </div>
          </div>

          {eye && <EyeModal onEyeclose={() => setEye(false)}  />}

          {trash && (
            <Trash
              onTrashclose={() => setTrash(false)}
              ItemId={SideBarData[0].itemId}
            
            />
          )}
        </div>

        <div className="NavSlider-Component">
          <NavSlider
            eye={eye}
            trash={trash}
            sidebartext={sidebartext}
            SideBarData={SideBarData}
          />
        </div>
        <div className="Basic-Component">
          <BasicChanges onclose={onclose} />
        </div>
      </div>
    </div>
  );
};

export default Slider;
