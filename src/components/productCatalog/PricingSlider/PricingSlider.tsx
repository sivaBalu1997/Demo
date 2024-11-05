import React, { useState, useEffect, useContext } from "react";
import "./PricingSlider.scss";
import Weigh from "../../../assets/images/weigh.png";
import { useSelector } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { RootState } from "redux/rootReducer";

type PricingKey = "Dinein1" | "Pickup1" | "Delivery1";

const PricingSlider: any = ({  }) => {
  const {  patchedData,setPatchedData } = useContext(Contextpagejs);

  const data=useSelector((state:any)=>state?.selectedMockDataReducer?.data)  
  const { pen, setPen } = useContext(Contextpagejs);
  const Dinein =data[0]?.orderTypes?.find((orderType:any) => orderType?.typeName === "DineIn")

// console.log(data.map((data:any)=>data.orderTypes));

  const [inputs, setInputs] = useState({
    Dinein1: data[0]?.orderTypes[0]?.price || [],
    Pickup1: Array.isArray(data[0]?.orderTypes) 
    ? data[0].orderTypes.map((elem: any) => elem.price) 
    : [],
    Delivery1:data[0]?.orderTypes[0]?.price  || [],
  });

  const [sectionAValue, setSectionAValue] = useState<string>("");
  const [showCompare, setShowCompare] = useState(false);

  const PrizingSliderData = [
    {
      heading: "On-Prem",
      Sections: [Dinein?.typeName],
      inputTypes: ["text", "text"],
      isEnabled:Dinein?.isEnabled,
      isHidden:Dinein?.isHidden,
    },
    {
      heading: "Of-Prem",
      labels: data[0]?.orderTypes?.length > 0
      ? [data[0]?.orderTypes[0].typeName]
      : [],
      InputLabels: data[0]?.orderTypes?.length > 0
      ? data[0]?.orderTypes.map((elem: any) => elem.typeName)  
      : [],
      isEnabled:data[0]?.orderTypes?.length > 0
      ? data[0]?.orderTypes.map((elem: any) => elem.isEnabled)  
      : [],
      isHidden:data[0]?.orderTypes[0].isHidden,
      inputTypes: ["text", "text", "text"],
    },
  ];
  
  useEffect(() => {
    if (data && data[0]?.pricingdetails) {
      setInputs({
        Dinein1:data[0]?.orderTypes[0]?.price  || [],
        Pickup1: data[0]?.orderTypes?.length > 0 
        ? data[0].orderTypes.map((elem: any) => elem.price) 
        : [],
      
        Delivery1: data[0]?.orderTypes[0]?.price  || [],
      });
    }
  }, [data]);
  
  useEffect(() => {
    const updatedValue = data?.[0]?.pricingdetails?.Dinein1?.[0] || "";
    setSectionAValue(updatedValue);
  }, [data]);

  const handleInputChange1 = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: PricingKey,
    index: number,
    enable:any
  ) => {
    const value = e.target.value;
    console.log("enable",enable[index]);
    if(enable[index])
    {
      console.log("enable",enable[index]);
      setInputs((prev) => ({
        ...prev,
        [section]: Array.isArray(prev[section]) 
          ? prev[section].map((item: number, idx: number) =>
              idx === index ? Number(value) : item 
            )
          : [], 
      }));
    
    }

   
    
  }

  const handleComparision = () => {
    setShowCompare(!showCompare);
  };

  useEffect(() => {
    if (data && data[0]?.orderTypes) {
      setPatchedData((prevState: any) => ({
        ...prevState,
        pricing: Array.isArray(data[0]?.orderTypes)
          ? data[0].orderTypes.map((elem: any, index: number) => ({
              orderTypeId: elem.typeId, 
              price: String(inputs.Pickup1?.[index] || elem.price), 
            }))
          : [],
      }));
    }
  }, [data, inputs, setPatchedData]);

  
  

  return (
    <div className="PricingSlider-Container">
      <h3 className="PricingSlider-Heading">Pricing</h3>
      {PrizingSliderData.map((elem, index) => (
        <div key={index} className="Onprem-Ofprem">
          <div className="Onprem-Heading">
            {elem.heading}
            <div className="Onprem-Sections">

              {elem.Sections?.map((section:any, seInd:any) => (
                <div key={seInd} className="SectionA">
                  <div className="SectionInput">
                    <h3 className="SectionA-Heading">{section}</h3>
                    <input
                      type={elem.inputTypes[seInd] || "number"}
                      className="SectionA-Input"
                      onChange={(e) => handleInputChange1(e, "Dinein1", seInd,elem.isEnabled)}
                      value={inputs.Dinein1[seInd] || ""}
                    />
                    <img
                      src={Weigh}
                      className="SectionA-Image"
                      alt="Weigh"
                      onClick={handleComparision}
                    />
                  </div>
                </div>
              ))}
              <div className="Section-Label">
               {Array.isArray(elem.labels) && elem.labels.map((label: any, sub: any) => (
                  <div key={sub} className="OnSectionLabelInput">
                    <h3 className="OnSectionLabelInput-Heading"></h3>
                    <div className="OnPremZomatoInhouseSwiggy">
                      {elem.InputLabels?.map((inputlabels:any, idx:any) => (
                        <div
                          key={inputlabels}
                          className="OnPremZomatoInhouseSwiggyInput"
                        >
                          <h3 className="OnPremZomatoInhouseSwiggyInput-Heading" style={{color:elem.isEnabled[idx]?"black" :"#5F5F5F"}}>
                            {inputlabels}
                          </h3>
                          <input
                            type={elem.inputTypes[idx] || "number"}
                            className="OnPremZomatoInhouseSwiggyInputOrg"
                            style={{border:elem.isEnabled[idx]?"1px solid black" :"1px solid #5F5F5F"}}
                            value={inputs.Pickup1[idx] }
                            onChange={(e) =>
                              handleInputChange1(
                                e,
                                sub === 0 ? "Pickup1" : "Delivery1",
                                idx,elem.isEnabled
                              )
                            }
                            // disabled={!pen}
                          />
                          {showCompare && (
                            <p className="Compare">{sectionAValue}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PricingSlider;
