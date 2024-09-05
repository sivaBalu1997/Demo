import React, { useRef, useState, useEffect } from 'react';
import AOS from 'aos';
import './ImageSlider.scss';
import EyeModal from '../EyeModal/EyeModal';
import Trash from './Trash';
import apple from '../../assets/images/Rectangle 942.png';
import AddImage from '../../assets/images/AddImage.svg';
import Pen from "../../assets/images/edit 1.png"
import Eye from "../../assets/images/eye-off.png"
import Bin from "../../assets/images/Frame 3466811.png"
import ArrowHover from '../../assets/images/ArrowHover.svg'
import BasicChanges from './BasicChanges'



const ImageSlider = ({ onclose }) => {
  const fileInputRefs = useRef([]); 
  const [files, setFiles] = useState([null, null, null, null]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eye, setEye] = useState(false);
  const [trash, setTrash] = useState(false);
  const modelref = useRef();
  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = (e) => {
    if (modelref.current === e.target) onclose();
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);
  const handleEyeClick = () => {
    setEye(true)
  }
  const handleBinClick = () => {
    setTrash(true)
  }

  const handleImageClick = (index) => {
    if (files[index]) {
      setSelectedImage(URL.createObjectURL(files[index]));
    } else {
      fileInputRefs.current[index].click();
    }
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFiles = [...files];
      updatedFiles[index] = file;
      setFiles(updatedFiles);

      if (index < files.length - 1) {
        setCurrentIndex(index + 1);
      }
    }
  };

  return (
    <div ref={modelref} className='Slider-Container'>
      <div className={"Slider-Window"} data-aos="fade-left">
        <div className='Slider-Mainform'>
          <div className='Slider-First-Row'>
            <h1 className='Slider-Heading1'>Veg Burger Pizza - 12345</h1>

            <div className='Slider-icons'>


              <div className='PenImage-Section'>
                <img src={Pen} className={"PenImage"} />
                <div className='PenTool'>
                  <img src={ArrowHover} className='ArrowHoverPen' alt="hello" />
                  <div className='PenTool-box'>Edit</div>
                </div>
              </div>


              <img src={Eye} alt='hello' className='PenImage' onClick={handleEyeClick} />
              <div className='BinImageSection'>

                <img src={Bin} alt='hello' onClick={handleBinClick} className='BinImage' />
                <div className='DelTool'>
                  <img src={ArrowHover} className='ArrowHoverDel' alt="hello" />
                  <div className='DelTool-box'>Delete</div>
                </div>
              </div>
            </div>

          </div>
          {eye && <EyeModal onEyeclose={() => setEye(false)} />}
          {trash && <Trash onTrashclose={() => setTrash(false)} />}
        </div>
        <div className='ImageSliderContainer'>
          <h3 className='ImageSliderContainerHeading'>Item Image</h3>
        </div>
        <div className='TypeImageDiv'></div>
        <div className='ImageSliderMain'>
          {selectedImage?<div><img src={selectedImage} width={260} height={230} className='SliderImageMain' alt="Main Item" /></div>:
          <div><img src={apple} width={260} height={230} className='SliderImageMain' alt="Main Item" /></div>}
        
        
        {/* Container for the filediv elements */}
        <div className='FileDivContainer'>
          {files.map((file, index) => (
            <div key={index}>
              {index <= currentIndex && (
                <>
                  <input
                    type='file'
                    accept='image/*'
                    onChange={(event) => handleFileChange(index, event)}
                    style={{ display: 'none' }}
                    ref={(ref) => (fileInputRefs.current[index] = ref)}
                  />
                  <div
                    onClick={() => handleImageClick(index)}
                    style={{ cursor: 'pointer' }}
                    className='filediv'
                  >
                    {file ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview of ${file.name}`}
                        style={{ width: '100px', height: '100px', objectFit: 'cover',marginTop:"20px",marginLeft:"20px", borderRadius:"99px" }}
                      />
                    ) : (
                      <img
                        src={AddImage}
                        alt='Placeholder'
                        style={{ width: '93px', height: '93px', objectFit: 'cover',marginTop:"20px",marginLeft:"20px" }}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          </div>
        </div>
        <BasicChanges/>
      </div>
      
    </div>
  );
};

export default ImageSlider;
