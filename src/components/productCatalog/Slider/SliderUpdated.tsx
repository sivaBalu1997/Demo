import React, { useContext, useEffect, useRef, useState } from "react";
import "./SliderUpdated.scss";
import Pen from "../../../assets/images/edit 1.png";
import Eye from "../../../assets/images/eye-off.png";
import Bin from "../../../assets/images/trash-2.png";
import EyeModal from "../EyeModal/EyeModal";
import Trash from "../Trash/Trash";
import NavSlider from "../NavSlider/NavSlider";
import ArrowHover from "../../../assets/svg/ArrowHover.svg";
import BasicChanges from "../BasicChanges/BasicChanges";
import { useSelector, useDispatch } from "react-redux";
import Basic from "../../../assets/svg/BasicChangesImg.svg";
import CustomizeSlider from "../CustomizeSlider/CustomizeSlider";
import PricingSlider from "../PricingSlider/PricingSlider";
import AvailabilitySlider from "../AvailibilitySlider/AvailabilitySlider";
// import eyeOpenimg from '../../../assets/svg/eyeopenIcon.svg';
import eyeOpenimg from '../../../assets/svg/eyeopenIcon2.svg'; 

import {
  addMockDataHiddenRequest,
  resetSuccessMessage,
  selectedMockDataRequest,
  storeMockDataRequest,
  partialUpdateMenuRequest,
  removeDataRequest,
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

const SliderUpdated: React.FC<SliderProps> = ({
  onclose,
  sidebartext,
  SideBarData,
}) => {
  const dataFromRedux = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const data1 = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );
  const deleteMenuItemLoading = useSelector(
    (state: any) => state.productCatalog?.deleteMenuItemLoading
  );

  useEffect(() => {
    const tempOnPremarray = data1[0]?.orderTypes?.filter((data:any, index:number) => {
      return data?.typeGroup === "D" || data?.typeGroup ==="I";
    });
    const tempOffPremarray = data1[0]?.orderTypes?.filter((data:any, index:number) => {
      return data?.typeGroup !== "D"&& data?.typeGroup !=="I";
    });

    const allIsNotHideOnPrem = tempOnPremarray?.every(
      (item:any) => item?.isNotHide === 0
    );
    const allIsNotHideOffPrem = tempOnPremarray?.every(
      (item:any) => item?.isNotHide === 0
    );

    // const isOnPremEnabledCount =
    //   tempOnPremarray?.filter((data, index) => {
    //     return data?.isNotHide === 1;
    //   }).length == 0;
    // const isOffPremEnabledCount =
    //   tempOffPremarray?.filter((data, index) => {
    //     return data?.isNotHide === 1;
    //   }).length == 0;

    const allChildrenonEnabled = tempOnPremarray?.some(
      (child: any) => child.isEnabled === 1
    );
    const allChildrenoffEnabled = tempOnPremarray?.some(
      (child: any) => child.isEnabled === 1
    );

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: tempOnPremarray,
        isEnabled: allChildrenonEnabled,
        isNotHide: allIsNotHideOnPrem,
      },
      {
        mainHeading: "Off-prem",
        types: tempOffPremarray,
        isEnabled: allChildrenoffEnabled,
        isNotHide: allIsNotHideOffPrem,
      },
    ];

    const allTrue = tempOrderTypeAvailabilityArray?.every(
      (item) => item.isNotHide
    );

    const allTypesHidden = tempOrderTypeAvailabilityArray?.every(
      (orderType: any) =>
        orderType.types?.every((type: any) => type.isNotHide === 0)
    );
    setEyeIconOpenClose(allTypesHidden);
  }, [data1[0]?.orderTypes]);
  const { setApiPayload, ApiPayload } = useContext(Contextpagejs);

  const history = useHistory();
  const { pen, setPen } = useContext(Contextpagejs);
  // const dispatch = useDispatch();
  const [eye, setEye] = useState(false);
  const [trash, setTrash] = useState(false);
  const [active, setActive] = useState("Pricing");
  const modelref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // const data = useSelector(
  //   (state: RootState) => state.storeMockDataReducer.data
  // );
  const menuData = useSelector((state: any) => state.productCatalog?.menuData);
  const dispatch = useDispatch();
  const [eyeIconOpenClose, setEyeIconOpenClose] = useState<boolean>();

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {};

  const handleItemClick = (item: string) => {
    const UpdatedeleteItem = data.filter(
      (item: SideBarData) => item.itemId !== dataFromRedux[0].id
    );
    setActive(item);
    dispatch(storeMockDataRequest(UpdatedeleteItem));
  };

  const handleEyeClick = () => {
    const removedItem = menuData.find(
      (item: any) => item?.categoryId === dataFromRedux?.categoryId
    );
    if (removedItem && Array.isArray(removedItem?.itemResponseList)) {
      const finalSubItem = removedItem.itemResponseList.find(
        (subItem: any) => subItem?.itemId === data1[0].itemId
      );
      setApiPayload({
        itemId: finalSubItem.itemId,
      });
    }
    setEye(true);
  };

  const handleBinClick = () => {
    const removedItem = menuData.find(
      (item: any) => item?.categoryId === dataFromRedux?.categoryId
    );

    if (removedItem && Array.isArray(removedItem?.itemResponseList)) {
      const finalSubItem = removedItem.itemResponseList.find(
        (subItem: any) => subItem?.itemId === data1[0].itemId
      );

      setApiPayload({
        itemId: finalSubItem.itemId,
      });
    }
    setTrash(true);
  };

  const handleOnclose = () => {
    // Logic for on close
  };

  const editData = useSelector((state: any) => state.productCatalog.editData);

  const handlePen = () => {
    history.push("/productCatalog/PrimaryDetails", { id: editData?.id });
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
    dispatch(resetSuccessMessage());
  }, [dispatch]);
  const locationid = useSelector(
      (state: any) => state.auth.credentials?.locationId
    );
  
    const [showModal, setShowModal] = useState(false);
    const { patchedData, setPatchedData, partialData, setPartialData } =
      useContext(Contextpagejs);
    const partaldatasending = useSelector(
      (state: any) => state.productCatalog.partialDataSendingLoading
    );
    const partaldatasendingsuccessmsg = useSelector(
      (state: any) => state.productCatalog?.partialDataSendingsuccess
    );
    const partaldatasendingfailuremsg= useSelector(
      (state: any) => state.productCatalog?.partialDataSendingfaliure
    );
    
    useEffect(() => {
      // console.log({partaldatasending});
  
      if (!partaldatasending && showModal) {
        onclose();
        setShowModal(false);
      }
    }, [partaldatasending]);
  
    const data = useSelector(
      (state: any) => state?.selectedMockDataReducer?.data
    );
  
    const ordertypesdata = data &&data[0]?.orderTypes;
  
   
  
    const handleCancelButton = () => {
      dispatch(removeDataRequest());
      setPartialData((prev: any) => ({
        ...prev,
        pricing: [],
        modifierInfo: [],
        itemAvailabilityInfo: [],
      }));
      if (!partaldatasending) {
        onclose();
      }
    };
  
    useEffect(() => {}, [partaldatasending, dispatch]);
  
    const [hasTrue, setHasTrue] = useState(false);
  
    const isPartialDataValid = () => {
      const { itemId, pricing, modifierInfo, itemAvailabilityInfo } = partialData;
  
      if (pricing.length || modifierInfo.length || itemAvailabilityInfo.length) {
        return true;
      }
  
      return false;
    };
  
    const handledispatchforpartilChange = () => {
      setHasTrue(true);
  
      if (isPartialDataValid()) {
        dispatch(partialUpdateMenuRequest(partialData, locationid));
        setShowModal(true);
        setPartialData((prev: any) => ({
          ...prev,
          pricing: [],
          modifierInfo: [],
          itemAvailabilityInfo: [],
        }));
      }
  
      //  onclose();
    };

    const [activeSection, setActiveSection] = useState<string | null>("Pricing");
    const sections = ["Pricing", "Availability", "Customize"];
  const containerRef:any = useRef(null);
  const sectionRefs:any = {
    Pricing: useRef(null),
    Availability: useRef(null),
    Customize: useRef(null),
  };
  const sectionComponents:any = {
    Pricing: <PricingSlider />,
    Availability: <AvailabilitySlider />,
    Customize: <CustomizeSlider />,
  };
  const handleScrollTo = (section: string) => {
    
    const sectionElement = sectionRefs[section].current;
    const containerElement = containerRef.current;
  
    if (sectionElement && containerElement) {
      const containerTop = containerElement.getBoundingClientRect().top;
      const sectionTop = sectionElement.getBoundingClientRect().top;
      const offset = sectionTop - containerTop; 
  
      containerElement.scrollTo({
        top: containerElement.scrollTop + offset,
        behavior: "smooth",
      });
  
      setActiveSection(section);
    }
  };
  
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      let maxVisibleHeight = 0;
      let currentSection = activeSection;

      sections.forEach((section:any) => {
        const sectionElement = sectionRefs[section].current;
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect();
          const containerRect = container?.getBoundingClientRect();

         
          const visibleHeight = Math.min(containerRect.bottom, rect.bottom) - Math.max(containerRect.top, rect.top);

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  const [activeSectionFromData, setActiveSectionFromData] = useState<string | null>("Pricing");

   useEffect(() => {
      if (sidebartext) {
        handleScrollTo(sidebartext);
        setActiveSection(sidebartext);
        setActiveSectionFromData(sidebartext)
       
      }
    }, [sidebartext,activeSectionFromData]);
    console.log({sidebartext});
    

  return (
    <div ref={modelref} className="Slider-Container-Updated" onClick={closeModal}>
      <div className="Slider-Window-Updated">
       

      <div className="slider-heading-optins">

        <div className="name-of-item-slider">
            <h1  className="name-of-item-slider-heading">
                <span>{data1?.length > 0 ? data1[0]?.itemName : "No Item Available"}</span>
                <span>{data1[0]?.itemCode ?`-${data1[0]?.itemCode}`:""}</span>
            </h1>
        

        </div>
        <div className="Slider-options-icons">
              <div className="PenImage-icon">
                <img
                  src={Pen}
                  className="Pen-image"
                  onClick={handlePen}
                  alt="Edit"
                />
                <div className="PenTool-updated">
                  <img
                    src={ArrowHover}
                    className="ArrowHoverPen-updated"
                    alt="Edit Tool"
                  />
                  <div className="PenTool-box-updated">Edit</div>
                </div>
              </div>

              <div className="EyeImage-icon">
                <img
                  src={eyeIconOpenClose ? eyeOpenimg : Eye}
                  alt="View"
                  className="EyeImage-updated"
                  onClick={handleEyeClick}
                />
                <div className="EyeTool-updated">
                  <img
                    src={ArrowHover}
                    className="ArrowHoverEye-updated"
                    alt="View Tool"
                  />
                  <div className="EyeTool-box-updated">Hide/unhide</div>
                </div>
              </div>

              <div className="BinImage-icon">
                <img
                  src={Bin}
                  alt="Delete"
                  onClick={handleBinClick}
                  className="BinImage-updated"
                />
                <div className="DelTool-updated">
                  <img
                    src={ArrowHover}
                    className="ArrowHoverDel-updated"
                    alt="Delete Tool"
                  />
                  <div className="DelTool-box-updated">Delete</div>
                </div>
              </div>
            </div>

            {eye && (
            <EyeModal
              onEyeclose={() => setEye(false)}
              onclose={onclose}
              setEyeIconOpenClose={setEyeIconOpenClose}
            />
          )}

          {trash && (
            <Trash
              onTrashclose={() => setTrash(false)}
              ItemId={SideBarData[0].itemId}
            />
          )}

      </div>



      <div className="scroll-headeing-and-scroll">
      {/* Navbar */}
      <nav className="nav-for-headings">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => handleScrollTo(section)}
            className="texts"
            style={{ color: activeSection === section ? "#67833E" : "#000000",}}
          >
            {section}
          </button>
        ))}
      </nav>

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        className="scrollable-container"
        style={{
          width: "100%",
          height: "auto",
          overflowY: "auto",
         
          overflowX: "hidden",
          position: "relative",
        }}
      >
        {sections.map((section) => (
          <div
            key={section}
            ref={sectionRefs[section]}
            id={section}
           
          >
           {sectionComponents[section]}
          </div>
        ))}
      </div>
    </div>

    <div className="change-and-cancel">
      <div className="BasicChangesImage-editText" >
          <img src={Basic} className="BasicChangesImage" alt="Basic" />
          <p className="BasicChangesText">
            Edit basic settings here.Click the edit icon to view all options
          </p>
        </div>
        <div className="CancelChange">
          <button 
            className="CancelBtn" 
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className="ChangeBtn"
            style={{
              opacity: isPartialDataValid() ? "100%" : "60%",
            }}
            onClick={handledispatchforpartilChange}
            disabled={!isPartialDataValid()}
          >
            {!partaldatasending  ? (
              "Update"
            ) : (
              <div className="reviewLoaders"></div>
            )}
          </button>
          {/* <button className="ChangeBtn"style={{
         
          opacity: isPartialDataValid() ? '100%' : '60%',
          
        }} onClick={handledispatchforpartilChange} disabled={!isPartialDataValid()}>
            Change
          </button> */}
        </div>
     </div>
        
     
        
      </div>
      
        {/* <div className="Basic-Component">
          <BasicChanges onclose={onclose} />
        </div> */}
      </div>
   
  );
};

export default SliderUpdated;
