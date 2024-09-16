import React, { useState } from "react";
import "./PricingSlider.scss";
import Weigh from "../../../assets/images/weigh.png";
import { useSelector } from "react-redux";

interface SideBarData {
  id: number;
  name: string;
  code: string;
  type: string;
  mealType: string;
  dietary: string;
  cusine: string;
  pricingdetails: {
    Dinein1: string[];
    Pickup1: string[];
    Delivery1: string[];
    Dinein2: string[];
    Pickup2: string[];
    Delivery2: string[];
    Inventory1: string[];
    Customize1: string[];
  };
}

interface PricingSliderProps {
  pen?: boolean;
  SideBarData?: SideBarData[];
}

interface StoreMockDataReducer {
  data: any;
}

interface RootState {
  storeMockDataReducer: StoreMockDataReducer;
}

// Define a union of valid keys
type PricingKey = "Dinein1" | "Pickup1" | "Delivery1";

const PricingSlider: React.FC<PricingSliderProps> = ({ pen, SideBarData }) => {
  const data = useSelector(
    (state: RootState) => state.storeMockDataReducer.data
  );

  const [inputs, setInputs] = useState({
    Dinein1: SideBarData?.[0]?.pricingdetails?.Dinein1 || [],
    Pickup1: SideBarData?.[0]?.pricingdetails?.Pickup1 || [],
    Delivery1: SideBarData?.[0]?.pricingdetails?.Delivery1 || [],
  });

  const handleInputChange = (
    section: PricingKey,
    index: number,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [section]: prev[section].map((item, idx) =>
        idx === index ? value : item
      ),
    }));
  };

  console.log(inputs)

  const PrizingSliderData = [
    {
      heading: "On-Prem",
      Sections: ["SectionA", "SectionB"],
      inputTypes: ["text", "number"],
    },
    {
      heading: "Of-Prem",
      labels: ["Pickup", "Delivery"],
      InputLabels: ["In-House", "Zomato", "Swiggy"],
      inputTypes: ["text", "email"],
    },
  ];

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
                      type={elem.inputTypes[seInd] || "text"}
                      className="SectionA-Input"
                      value={inputs.Dinein1[seInd] || ""}
                      onChange={(e) =>
                        handleInputChange("Dinein1", seInd, e.target.value)
                      }
                    />
                    <img src={Weigh} className="SectionA-Image" alt="Weigh" />
                  </div>
                </div>
              ))}
              <div className="Section-Label">
                {elem.labels?.map((label, sub) => (
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
                            type={elem.inputTypes[idx] || "text"}
                            className="OnPremZomatoInhouseSwiggyInputOrg"
                            value={
                              sub === 0
                                ? inputs.Pickup1[idx] || ""
                                : inputs.Delivery1[idx] || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                sub === 0 ? "Pickup1" : "Delivery1",
                                idx,
                                e.target.value
                              )
                            }
                          />
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
