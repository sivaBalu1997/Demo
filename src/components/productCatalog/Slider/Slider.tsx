import React, { useRef, useState } from 'react';
import "./Slider.scss";

import Pen from "../../../assets/images/edit 1.png";
import Eye from "../../../assets/images/eye-off.png";
import Bin from "../../../assets/images/Frame 3466811.png";
import EyeModal from '../EyeModal/EyeModal';
import Trash from '../Trash/Trash';
import NavSlider from '../NavSlider/NavSlider';
import ArrowHover from '../../../assets/svg/ArrowHover.svg';
import BasicChanges from '../BasicChanges/BasicChanges';
import { useSelector } from 'react-redux'


interface SliderProps {
  onclose: () => void;
  sidebartext: string;
}
interface StoreMockDataReducer {
  data: any; 
}
interface RootState {
  storeMockDataReducer: StoreMockDataReducer;
}
const Slider: React.FC<SliderProps> = ({ onclose, sidebartext }) => {
  const [eye, setEye] = useState(false);
  const [trash, setTrash] = useState(false);
  const [active, setActive] = useState("Pricing");
  const modelref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null); // Create a ref for the scrollable container
  const data = useSelector((state: RootState) => state.storeMockDataReducer.data);
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modelref.current === e.target) 
      onclose();
  };

  const handleItemClick = (item: string) => {
    setActive(item);
  };

  const handleEyeClick = () => {
    setEye(true);
  };

  const handleBinClick = () => {
    setTrash(true);
  };

  const scrollToComponent = (componentName: string) => {
    if (scrollRef.current) {
      const element = document.querySelector(`.${componentName}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={modelref} className='Slider-Container' onClick={closeModal}>
      <div className="Slider-Window">
        <div className='Slider-Mainform'>
          <div className='Slider-First-Row'>
            <h1 className='Slider-Heading1'>{data[0].name}</h1>

            <div className='Slider-icons'>
              <div className='PenImage-Section'>
                <img src={Pen} className="PenImage" alt="Edit" />
                <div className='PenTool'>
                  <img src={ArrowHover} className='ArrowHoverPen' alt="Edit Tool" />
                  <div className='PenTool-box'>Edit</div>
                </div>
              </div>

              <img src={Eye} alt='View' className='PenImage' onClick={handleEyeClick} />
              <div className='BinImageSection'>
                <img src={Bin} alt='Delete' onClick={handleBinClick} className='BinImage' />
                <div className='DelTool'>
                  <img src={ArrowHover} className='ArrowHoverDel' alt="Delete Tool" />
                  <div className='DelTool-box'>Delete</div>
                </div>
              </div>
            </div>
          </div>
          {eye && <EyeModal onEyeclose={() => setEye(false)} />}
          {trash && <Trash onTrashclose={() => setTrash(false)} />}
        </div>

        <div className='NavSlider-Component'>
          <NavSlider eye={eye} trash={trash} sidebartext={sidebartext} />
        </div>
        <div className='Basic-Component'>
          <BasicChanges />
        </div>
      </div>
    </div>
  );
};

export default Slider;
