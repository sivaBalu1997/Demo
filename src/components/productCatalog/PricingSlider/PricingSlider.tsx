import React from 'react'
import "./PricingSlider.scss"
import { Controller, useForm } from 'react-hook-form'
import BigArrow from '../../../assets/svg/BigArrow.svg'
import Weigh from '../../../assets/images/weigh.png'
import InputFieldComponent from '../InputFieldComponent/InputFieldComponent'
import { useSelector } from 'react-redux'


interface PricingSliderProps {
  pen?: boolean
}
interface StoreMockDataReducer {
  data: any; 
}
interface RootState {
  storeMockDataReducer: StoreMockDataReducer;
}

const PricingSlider: React.FC<PricingSliderProps> = ({ pen }) => {
  const { control, register,
    formState: { errors },
    trigger,
    reset } = useForm();
    const data = useSelector((state: RootState) => state.storeMockDataReducer.data);
  const PrizingSliderData = [

    {
      heading: "On-Prem",
      Sections: ["SectionA", "SectionB", "SectionC"]
    },
    {
      heading: "Of-Prem",
      labels: ["Pickup", "Delivery"],
      InputLabels: ["In-House", "Zomato", "Swiggy"]
    }
  ];


  return (
    <div className='PricingSlider-Container'>
      <h3 className='PricingSlider-Heading'>Pricing</h3>

      {
        PrizingSliderData.map((elem) => {
          return (
            <div className='Onprem-Ofprem'>
              <div className='Onprem-Heading'>
                {elem.heading}
                <div className='SectionA'>
                  {elem.Sections?.map((section) => (
                    <>
                      <div className='SectionA'>
                        <div className='SectionInput'>
                          <h3 className='SectionA-Heading' key={section}>{section}</h3>
                          <input type="text" className='SectionA-Input'  />
                          <img src={Weigh} className='SectionA-Image' />
                        </div>
                      </div>
                    </>
                  ))}
                  <div className='Section-Label'>
                    {elem.labels?.map((label,sub) => (
                      <div key={sub} className='OnSectionLabelInput' >
                        <h3 className='OnSectionLabelInput-Heading'>{label}</h3>
                        <div className='OnPremZomatoInhouseSwiggy'>
                          {elem.InputLabels?.map((inputlabels,index) => (
                            <div key={inputlabels} className='OnPremZomatoInhouseSwiggyInput' >
                              <h3 className='OnPremZomatoInhouseSwiggyInput-Heading'>{inputlabels}</h3>
                              <input type="text" className='OnPremZomatoInhouseSwiggyInputOrg' value={sub<1?data[0]?.pricingdetails?.Pickup1?.[index] :data[0]?.pricingdetails?.Delivery1?.[index]} ></input>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          );
        })
      }

    </div>
  )
}

export default PricingSlider