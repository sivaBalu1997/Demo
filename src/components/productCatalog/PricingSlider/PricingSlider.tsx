import React, { useState, useEffect, useContext } from "react";
import "./PricingSlider.scss";
import Weigh from "../../../assets/images/weigh.png";
import { useSelector } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { RootState } from "redux/rootReducer";

type PricingKey = "Dinein1" | "Pickup1" | "Delivery1";

// Define the structure for price comparison
interface PriceComparison {
  typeId: string;
  price: number;
  percentage: string;
  increaseOrDecrease: "increase" | "decrease";
}

const PricingSlider: any = ({}) => {
  const { patchedData, setPatchedData } = useContext(Contextpagejs);
  const data = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );
  const { pen, setPen } = useContext(Contextpagejs);
  const Dinein = data[0]?.orderTypes?.find(
    (orderType: any) => orderType?.typeName === "DineIn"
  );
  const [inputs, setInputs] = useState({
    Dinein1: Array.isArray(data[0]?.orderTypes)
      ? data[0].orderTypes
          .filter((elem: any) => elem.typeName === "DineIn")
          .map((elem: any) => elem.price)
      : [],
    Pickup1: Array.isArray(data[0]?.orderTypes)
      ? data[0].orderTypes
          .filter((elem: any) => elem.typeName !== "DineIn")
          .map((elem: any) => elem.price)
      : [],
    Delivery1: data[0]?.orderTypes[0]?.price || [],
  });

  const [sectionAValue, setSectionAValue] = useState<string>("");
  const [showCompare, setShowCompare] = useState(false);
  const [filteredpricelist, setFilteredPriceList] = useState<PriceComparison[]>(
    []
  );

  const PrizingSliderData = [
    {
      heading: "On-Prem",
      Sections: [Dinein?.typeName],
      inputTypes: ["text", "text"],
      isEnabled: Dinein
        ? [
            {
              name: Dinein.typeName,
              enabled: Dinein.isEnabled,
            },
          ]
        : [],
      isHidden: Dinein?.isHidden,
      tyepeId: Dinein?.typeId,
    },
    {
      heading: "Off-Prem",
      labels:
        data[0]?.orderTypes?.length > 0
          ? [data[0]?.orderTypes[0].typeName]
          : [],
      InputLabels:
        data[0]?.orderTypes?.length > 0
          ? data[0]?.orderTypes.map((elem: any) => elem.typeName)
          : [],
      isEnabled:
        data[0]?.orderTypes?.length > 0
          ? data[0]?.orderTypes.map((elem: any) => {
              return {
                name: elem.typeName,
                enabled: elem.isEnabled,
              };
            })
          : [],
      tyepeId:
        data[0]?.orderTypes?.length > 0
          ? data[0]?.orderTypes.map((elem: any) => elem.tyepeId)
          : [],
      isHidden: data[0]?.orderTypes[0].isHidden,
      inputTypes: ["text", "text", "text"],
    },
  ];

  useEffect(() => {
    if (data && data[0]?.pricingdetails) {
      setInputs({
        Dinein1: data[0]?.orderTypes[0]?.price || [],
        Pickup1: Array.isArray(data[0]?.orderTypes)
          ? data[0].orderTypes.map((elem: any) => elem.price)
          : [],

        Delivery1: data[0]?.orderTypes[0]?.price || [],
      });
    }
  }, []);

  useEffect(() => {
    const updatedValue = data?.[0]?.pricingdetails?.Dinein1?.[0] || "";
    setSectionAValue(updatedValue);
  }, [data]);
  // console.log("PrizingSliderData",PrizingSliderData[1].isEnabled);

  const handleInputChange1 = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: PricingKey,
    index: number,
    enable: any,
    name: string
  ) => {
    const value = e.target.value;
    // console.log("name",name,"enable",enable);
    const filter = PrizingSliderData[enable].isEnabled.filter(
      (item: any) => item.name === name
    );

    if (filter[0].enabled) {
      setInputs((prev) => ({
        ...prev,
        [section]: Array.isArray(prev[section])
          ? prev[section].map((item: number, idx: number) =>
              idx === index ? Number(value) : item
            )
          : [],
      }));
    }
  };

  const handleComparision = (baseprice: number, id: string) => {
    setShowCompare(!showCompare);

    const pricelist = data[0].orderTypes
      .filter((elem: any) => id !== elem.typeId)
      .map((elem: any) => {
        const percentageDifference = (elem.price * 100) / baseprice;
        const increaseOrDecrease =
          elem.price > baseprice ? "increase" : "decrease";

        return {
          typeId: elem.typeId,
          price: elem.price,
          percentage: `${Math.abs(percentageDifference).toFixed(2)}%`,
          increaseOrDecrease,
        };
      });

    setFilteredPriceList(pricelist);
  };

  useEffect(() => {
    if (data && data[0]?.orderTypes) {
      const oofpremprice = data[0].orderTypes
        .filter((elem: any) => elem.typeName !== "DineIn")
        .map((elem: any, index: number) => ({
          orderTypeId: elem.typeId,
          price: String(inputs.Pickup1?.[index] || elem.price),
        }));
      const onprem = data[0].orderTypes
        .filter((elem: any) => elem.typeName === "DineIn")
        .map((elem: any, index: number) => ({
          orderTypeId: elem.typeId,
          price: String(inputs.Dinein1?.[index] || elem.price),
        }));

      const offpremandonprem = [...oofpremprice, ...onprem];

      setPatchedData((prevState: any) => ({
        ...prevState,
        pricing: Array.isArray(offpremandonprem)
          ? offpremandonprem?.map((elem: any, index: number) => ({
              orderTypeId: elem.orderTypeId,
              price: elem.price,
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
              {elem.Sections?.map((section: any, seInd: any) => (
                <div key={seInd} className="SectionA">
                  <div className="SectionInput">
                    <h3
                      className="SectionA-Heading"
                      style={{
                        color: PrizingSliderData[index]?.isEnabled.filter(
                          (item: any) => item.name === section
                        )[0]?.enabled
                          ? "black"
                          : "#5F5F5F",
                      }}
                    >
                      {section}
                    </h3>
                    <input
                      type={elem.inputTypes[seInd] || "number"}
                      style={{
                        opacity: PrizingSliderData[index]?.isEnabled.filter(
                          (item: any) => item.name === section
                        )[0]?.enabled
                          ? "100%"
                          : "50%",
                      }}
                      className="SectionA-Input"
                      onChange={(e) =>
                        handleInputChange1(e, "Dinein1", seInd, index, section)
                      }
                      value={inputs.Dinein1[seInd] || ""}
                    />
                    <div
                      className="SectionA-Image"
                      onClick={() =>
                        handleComparision(inputs.Dinein1[seInd], elem.tyepeId)
                      }
                    >
                      <svg
                        width="30"
                        height="23"
                        viewBox="0 0 30 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.9515 13.7109L25.6877 5.91004C25.1677 4.95746 24.0802 4.23104 22.779 3.96558L15.6252 2.50508V0.479167C15.6252 0.214667 15.3452 0 15.0002 0C14.6552 0 14.3752 0.214667 14.3752 0.479167V2.24921L7.57397 0.859625C6.95397 0.733125 6.31772 0.788708 5.76022 0.9775C5.72147 0.98325 5.68272 0.98325 5.64647 0.99475C5.56147 1.02254 5.49147 1.06375 5.43272 1.11167C4.95647 1.33592 4.56022 1.66271 4.33147 2.07958L0.0502148 9.87562V9.87754C0.0164648 9.93888 0.00146484 11.0218 0.00146484 11.0218C0.00146484 12.2274 0.673965 13.385 1.83396 14.2006C2.88397 14.9395 4.21522 15.3343 5.62647 15.3343C5.79522 15.3343 5.96522 15.3285 6.13522 15.317C9.00772 15.1254 11.2515 13.1522 11.2515 10.8234C11.2515 10.8234 11.2352 9.93696 11.2027 9.8785L6.74147 1.75567C6.91022 1.74417 7.08272 1.75087 7.25272 1.78633L14.3752 3.24108V22.0417H5.62522C5.28022 22.0417 5.00022 22.2563 5.00022 22.5208C5.00022 22.7853 5.28022 23 5.62522 23H24.3752C24.7202 23 25.0002 22.7853 25.0002 22.5208C25.0002 22.2563 24.7202 22.0417 24.3752 22.0417H15.6252V3.496L22.4577 4.89133C22.894 4.98046 23.2965 5.14242 23.6402 5.359L18.804 13.7013C18.769 13.7626 18.7502 14.8542 18.7502 14.8542C18.7502 16.0597 19.4227 17.2174 20.5827 18.033C21.6327 18.7718 22.964 19.1667 24.3752 19.1667C24.544 19.1667 24.714 19.1609 24.884 19.1494C27.7565 18.9578 30.0002 16.9845 30.0002 14.6558C30.0002 14.6558 29.984 13.7703 29.9515 13.7109ZM5.48272 2.45237C5.52522 2.37571 5.59522 2.31629 5.65647 2.25017L9.68397 9.58333H1.56647L5.48272 2.45237ZM10.0002 10.8225C10.0002 12.6586 8.25147 14.214 6.01772 14.3625C4.77022 14.4478 3.58397 14.1373 2.66897 13.4943C1.76647 12.8599 1.24897 11.959 1.24897 11.0208V10.5417H9.99897V10.8215L10.0002 10.8225ZM24.5052 6.22725L24.5352 6.28092L28.4352 13.4176H20.3365L24.5052 6.22725ZM28.7502 14.6558C28.7502 16.492 27.0015 18.0473 24.7677 18.1959C23.519 18.2783 22.334 17.9707 21.419 17.3276C20.5165 16.6932 19.999 15.7924 19.999 14.8542V14.375H28.749V14.6548L28.7502 14.6558Z"
                          fill={`${showCompare ? "#67833E" : "#B3B3B3"}`}
                        />
                      </svg>
                    </div>
                    {/* <img
                      src={Weigh}
                      className="SectionA-Image"
                      alt="Weigh"
                      onClick={() => handleComparision(inputs.Dinein1[seInd], elem.tyepeId)}
                    /> */}
                  </div>
                </div>
              ))}
              <div className="Section-Label">
                {Array.isArray(elem.labels) &&
                  elem.labels.map((label: any, sub: any) => (
                    <div key={sub} className="OnSectionLabelInput">
                      <h3 className="OnSectionLabelInput-Heading"></h3>
                      <div className="OnPremZomatoInhouseSwiggy">
                        {elem.InputLabels.filter(
                          (label: any) => label !== "DineIn"
                        )?.map((inputlabels: any, idx: any) => (
                          <div
                            key={inputlabels}
                            className="OnPremZomatoInhouseSwiggyInput"
                          >
                            <h3
                              className="OnPremZomatoInhouseSwiggyInput-Heading"
                              style={{
                                color: PrizingSliderData[
                                  index
                                ]?.isEnabled.filter(
                                  (item: any) => item.name === inputlabels
                                )[0]?.enabled
                                  ? "black"
                                  : "#5F5F5F",
                              }}
                            >
                              {inputlabels}
                            </h3>
                            <div className="input-price">
                              <input
                                type={elem.inputTypes[idx] || "number"}
                                className="OnPremZomatoInhouseSwiggyInputOrg"
                                style={{
                                  opacity: PrizingSliderData[
                                    index
                                  ]?.isEnabled.filter(
                                    (item: any) => item.name === inputlabels
                                  )[0]?.enabled
                                    ? "100%"
                                    : "50%",
                                }}
                                value={inputs.Pickup1[idx]}
                                onChange={(e) =>
                                  handleInputChange1(
                                    e,
                                    sub === 0 ? "Pickup1" : "Delivery1",
                                    idx,
                                    index,
                                    inputlabels
                                  )
                                }
                              />
                              {showCompare && (
                                <p
                                  className="percentage"
                                  style={{
                                    color: `${
                                      filteredpricelist[idx]
                                        ?.increaseOrDecrease === "increase"
                                        ? "#00B71D"
                                        : "#E52333"
                                    }`,
                                  }}
                                >
                                  {filteredpricelist[idx]?.percentage}
                                </p>
                              )}
                            </div>
                            {showCompare && (
                              <div
                                className={`${
                                  filteredpricelist[idx]?.increaseOrDecrease ===
                                  "increase"
                                    ? "triangle"
                                    : "rev-triangle"
                                }`}
                              ></div>
                            )}

                            {/* {showCompare && <p className="Compare">{sectionAValue}</p>} */}
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
