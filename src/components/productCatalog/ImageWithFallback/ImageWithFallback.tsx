import React from 'react'
import { useState } from "react";
import placeholder from '../../../assets/images/noImage.png'

interface image{
    src:any;
    alt:any;
    classname:any;
}
const ImageWithFallback:React.FC<image> = ({ src, alt ,classname}) => {

  
    const [imgSrc, setImgSrc] = useState(src);
    const handleLoad = (event:any) => {  
           if (event.target.naturalWidth === 0 || event.target.naturalHeight === 0) {     
              console.log("Broken image detected (blank response)");   
            
            setImgSrc(placeholder); } 
        
        };
  
    return (
      <img 
        src={imgSrc} 
        alt={placeholder} 
        className={classname}
        onLoad={handleLoad}
        style={{borderRadius:"50px"}}
        onError={() => setImgSrc(placeholder)} 
        
        // style={{ width: 150, height: 150 }} 
      />
    );
}

export default ImageWithFallback