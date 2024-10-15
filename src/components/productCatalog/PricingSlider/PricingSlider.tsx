import React, { useState, useEffect, useContext } from "react";
import "./PricingSlider.scss";
import Weigh from "../../../assets/images/weigh.png";
import { useSelector } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";

type PricingKey = "Dinein1" | "Pickup1" | "Delivery1";

const PricingSlider: any = ({  }) => {
  const {  patchedData,setPatchedData } = useContext(Contextpagejs);

  const data=useSelector((state:any)=>state?.selectedMockDataReducer?.data)
  console.log("Data from Redux ",data)


  
  const { pen, setPen } = useContext(Contextpagejs);
  const [inputs, setInputs] = useState({
    Dinein1: data[0]?.orderTypes[0]?.price  || [],
    Pickup1:  data[0]?.orderTypes[0]?.price || [],
    Delivery1:data[0]?.orderTypes[0]?.price  || [],
  });
  const [sectionAValue, setSectionAValue] = useState<string>("");
  const [showCompare, setShowCompare] = useState(false);

  const PrizingSliderData = [
    {
      heading: "On-Prem",
      Sections: ["SectionA", "SectionB"],
      inputTypes: ["text", "text"],
    },
    {
      heading: "Of-Prem",
      labels: data[0]?.orderTypes?.length > 0
      ? [data[0]?.orderTypes[0].typeName]
      : [],
       InputLabels: ["In-House", "Zomato", "Swiggy"],
      inputTypes: ["text", "text", "text"],
    },
  ];
  useEffect(() => {
    if (data && data[0]?.pricingdetails) {
      setInputs({
        Dinein1:data[0]?.orderTypes[0]?.price  || [],
        Pickup1: data[0]?.orderTypes[0]?.price || [],
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
    index: number
  ) => {
    const value = e.target.value;
  
    setInputs((prev) => ({
      ...prev,
      [section]: Array.isArray(prev[section]) // Ensure it's an array
        ? prev[section].map((item: number, idx: number) =>
            idx === index ? Number(value) : item // Convert value to number if needed
          )
        : [], // Default to an empty array if prev[section] is not an array
    }));
  }

  const handleComparision = () => {
    setShowCompare(!showCompare);
  };

  console.log(inputs.Pickup1)
  useEffect(() => {
    if (data && data[0]?.orderTypes) {
      setPatchedData((prevState: any) => ({
        ...prevState,
        pricing: [
       
          {
            orderTypeId: data[0]?.orderTypes[0]?.typeId ,
            price: inputs.Pickup1 
          },
        
        ],
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
              {elem.Sections?.map((section, seInd) => (
                <div key={seInd} className="SectionA">
                  <div className="SectionInput">
                    <h3 className="SectionA-Heading">{section}</h3>
                    <input
                      type={elem.inputTypes[seInd] || "number"}
                      className="SectionA-Input"
                      onChange={(e) => handleInputChange1(e, "Dinein1", seInd)}
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
                    <h3 className="OnSectionLabelInput-Heading">{label}</h3>
                    <div className="OnPremZomatoInhouseSwiggy">
                      {elem.InputLabels?.map((inputlabels, idx) => (
                        <div
                          key={inputlabels}
                          className="OnPremZomatoInhouseSwiggyInput"
                        >
                          <h3 className="OnPremZomatoInhouseSwiggyInput-Heading">
                            {inputlabels}
                          </h3>
                          <input
                            type={elem.inputTypes[idx] || "number"}
                            className="OnPremZomatoInhouseSwiggyInputOrg"
                            value={inputs.Pickup1[idx]|| data[0]?.orderTypes[0]?.price }
                            onChange={(e) =>
                              handleInputChange1(
                                e,
                                sub === 0 ? "Pickup1" : "Delivery1",
                                idx
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
