import React, { useContext, useRef, useState } from "react";
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
import { addMockDataHiddenRequest, storeMockDataRequest } from "redux/productCatalog/productCatalogActions";
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
  id: number;
  name: string;
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

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Your modal close logic here
  };

  const handleItemClick = (item: string) => {
    setActive(item);
  };

  const handleEyeClick = () => {
    setEye(true);
    const UpdatedeleteItem = data.filter((item: SideBarData) => item.id !== SideBarData[0].id);
    dispatch(storeMockDataRequest(UpdatedeleteItem));
    dispatch(addMockDataHiddenRequest(SideBarData))
    
  };

  const handleBinClick = () => {
    const UpdatedeleteItem = data.filter(
      (item: SideBarData) => item.id !== SideBarData[0].id
    );
    dispatch(storeMockDataRequest(UpdatedeleteItem));
    onclose()
  };

  const handleOnclose = () => {
    // Logic for on close
  };

  const handlePen = () => {
    history.push("/productCatalog/PrimaryDetails",{id:SideBarData[0].id});


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
  console.log(SideBarData)

  return (
    <div ref={modelref} className="Slider-Container" onClick={closeModal}>
      <div className="Slider-Window">
        <div className='Slider-Mainform'>
          <div className='Slider-First-Row'>
            <h1 className='Slider-Heading1'>{SideBarData?.[0]?.name}</h1>

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
                  onClick={() => setTrash(true)}
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

          {eye && <EyeModal onEyeclose={() => setEye(false)} />}

          {trash && (
            <Trash
              onTrashclose={() => setTrash(false)}
              handleDeleteItem={handleBinClick}
              handleOnClose={handleOnclose}
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
