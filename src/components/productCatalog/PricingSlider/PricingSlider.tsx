import React from 'react';
import "./PricingSlider.scss";
import Weigh from '../../../assets/images/weigh.png';
import { useSelector } from 'react-redux';

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

const PricingSlider: React.FC<PricingSliderProps> = ({ pen, SideBarData }) => {
  const data = useSelector((state: RootState) => state.storeMockDataReducer.data);

  const PrizingSliderData = [
    {
      heading: "On-Prem",
      Sections: ["SectionA", "SectionB"],
    },
    {
      heading: "Of-Prem",
      labels: ["Pickup", "Delivery"],
      InputLabels: ["In-House", "Zomato", "Swiggy"],
    },
  ];

  return (
    <div className="PricingSlider-Container">
      <h3 className="PricingSlider-Heading">Pricing</h3>

      {PrizingSliderData.map((elem, index) => (
        <div key={index} className="Onprem-Ofprem">
          <div className="Onprem-Heading">
            {elem.heading}
            <div className="SectionA">
              {elem.Sections?.map((section, seInd) => (
                <div key={seInd} className="SectionA">
                  <div className="SectionInput">
                    <h3 className="SectionA-Heading">{section}</h3>
                    <input
                      type="text"
                      className="SectionA-Input"
                      // Corrected optional chaining and null checks
                      value={
                        seInd === 1
                          ? SideBarData?.[0]?.pricingdetails?.Dinein1?.[1] || ''
                          : SideBarData?.[0]?.pricingdetails?.Dinein1?.[0] || ''
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
                        <div key={inputlabels} className="OnPremZomatoInhouseSwiggyInput">
                          <h3 className="OnPremZomatoInhouseSwiggyInput-Heading">{inputlabels}</h3>
                          <input
                            type="text"
                            className="OnPremZomatoInhouseSwiggyInputOrg"
                            value={
                              sub < 1
                                ? SideBarData?.[0]?.pricingdetails?.Pickup1?.[idx] || ''
                                : SideBarData?.[0]?.pricingdetails?.Delivery1?.[1] || ''
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
