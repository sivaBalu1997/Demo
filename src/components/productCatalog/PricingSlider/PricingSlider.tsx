import React, { useState, useEffect, useContext } from "react";
import "./PricingSlider.scss";
import Weigh from "../../../assets/images/weigh.png";
import { useSelector } from "react-redux";
import { Contextpagejs } from "pages/productCatalog/contextpage";
import { RootState } from "redux/rootReducer";
import weightCompare from "../../../assets/svg/weightCompare.svg";
import TooltipMsg from "../Tooltip/TooltipMsg";
import { log } from "console";
import tooltiparrow from "../../../assets/svg/ArrowHover.svg";

type PricingKey = "Dinein1" | "Pickup1" | "Delivery1";

// Define the structure for price comparison
interface PriceComparison {
  typeId: string;
  price: number;
  percentage: string;
  increaseOrDecrease: "increase" | "decrease";
}

const PricingSlider: any = ({}) => {
  const restaurantDetails = useSelector(
    (state: any) => state?.auth.restaurantDetails
  );

  const { patchedData, setPatchedData, partialData, setPartialData } =
    useContext(Contextpagejs);
  const data = useSelector(
    (state: any) => state?.selectedMockDataReducer?.data
  );

  const [availabilityOrderTypes, setAvailabilityOrderTypes] = useState<any>([]);

  useEffect(() => {
    const tempOnPremarray = data[0]?.orderTypes
      ?.filter((data: any) => data?.typeGroup === "D" ||data?.typeGroup === "I" )
      ?.map((item: any) => ({
        ...item,
        price: item.price !== undefined && Number(item.price).toFixed(2), // Ensure 2 decimal places
      }));
    console.log({ tempOnPremarray });

    const tempOffPremarray = data[0]?.orderTypes
      ?.filter((data: any) => data?.typeGroup !== "D"&&data?.typeGroup !== "I")
      ?.map((item: any) => ({
        ...item,
        price: item.price !== undefined && Number(item.price).toFixed(2), // Ensure 2 decimal places
      }));

    const isOnPremEnabledCount =
      tempOnPremarray?.filter((data: any, index: number) => {
        return data?.availabilityEnabled === false;
      }).length == 0;
    const isOffPremEnabledCount =
      tempOffPremarray?.filter((data: any, index: number) => {
        return data?.availabilityEnabled === false;
      }).length == 0;

    const tempOrderTypeAvailabilityArray = [
      {
        mainHeading: "On-prem",
        types: tempOnPremarray,
        isEnabled: isOnPremEnabledCount,
      },
      {
        mainHeading: "Off-prem",
        types: tempOffPremarray,
        isEnabled: isOffPremEnabledCount,
      },
    ];
    setAvailabilityOrderTypes([...tempOrderTypeAvailabilityArray]);
  }, [data[0]?.orderTypes]);





  const [showCompare, setShowCompare] = useState(false);
  const [filteredpricelist, setFilteredPriceList] = useState<PriceComparison[]>(
    []
  );

  const handleComparision = (baseprice: number, id: string, index: number) => {
    if (baseprice !== 0) {
      setShowCompare(!showCompare);

      const pricelist = availabilityOrderTypes[1].types
        .filter((elem: any) => id !== elem.typeId)
        .map((elem: any) => {
          const percentageDifference =
            ((elem.price - baseprice) / baseprice) * 100;
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
    }
  };

 

 

  const handlepriceinputchange = (
    typeId: string,
    mainHeading: string,
    newPrice: number,
    Enabled: number,
    hidden: number
  ) => {
    if (hidden) {
      const updatedArray = availabilityOrderTypes.map((item: any) => {
        if (item.mainHeading === mainHeading) {
          return {
            ...item,
            types: item.types.map((type: any) => {
              if (type.typeId === typeId) {
                return { ...type, price: newPrice };
              }
              return type;
            }),
          };
        }
        return item;
      });

      setAvailabilityOrderTypes(updatedArray);

      const datamatched = patchedData?.itemAvailabilityInfo.filter(
        (data: any) => data.orderTypeId === typeId
      );

      setPartialData((prev: any) => {
        const existingIndex = prev.pricing?.findIndex(
          (item: any) => item.orderTypeId === typeId
        );

        const updatedPricing =
          existingIndex > -1
            ? prev.pricing.map((item: any, index: number) =>
                index === existingIndex ? { ...item, price: newPrice } : item
              )
            : [...prev.pricing, { orderTypeId: typeId, price: newPrice }];

        return {
          ...prev,
          itemId: data[0].itemId,
          pricing: updatedPricing,
        };
      });

      setPatchedData((prevState: any) => ({
        ...prevState,
        pricing: prevState.pricing.map((PricingInfo: any) =>
          PricingInfo.orderTypeId === typeId
            ? {
                ...PricingInfo,
                price: newPrice,
              }
            : PricingInfo
        ),
      }));
    }
  };
  // const restaurantDetails = useSelector(
  //   (state: RootState) => state.auth.restaurantDetails
  // );
  const truncateToTwoDecimals = (value: string | number) => {
    const stringValue = String(value);
    if (stringValue.includes(".")) {
      const [integerPart, decimalPart] = stringValue.split(".");
      return `${integerPart}.${decimalPart.slice(0, 2)}`; // Limit to 2 decimal places
    }
    return stringValue; // No decimals, return as is
  };

  return (
    <div className="PricingSlider-Container">
      <h3 className="PricingSlider-Heading">Pricing </h3>
      {availabilityOrderTypes.map((item: any, index: number) => (
        <div key={index} className="Onprem-Ofprem">
          <div className="Onprem-Heading">{item.mainHeading}</div>

          <div className="Onprem-Sections">
            {item.types &&
              item.types.map((price: any, idx: number) => {
                const enableOrNot =
                  // price.isEnabled &&
                  price.isNotHide && price.availabilityEnabled;

                const Pricesymbol = `${
                  restaurantDetails?.country === "US" ? "$" : "Rs."
                }`;

                const pricewithtwodigit = price
                  ? truncateToTwoDecimals(price.price)
                  : "";

                return (
                  <div className="ordertypes-price">
                    <h3
                      className="OrderType-Name"
                      style={{ opacity: enableOrNot ? "100%" : "50%" }}
                    >
                      {price.typeName}:
                    </h3>
                    <div
                      className="SectionA-Input"
                      style={{
                        border: enableOrNot
                          ? "1px solid black"
                          : "1px solid #5F5F5F",
                        opacity: enableOrNot ? "100%" : "50%",
                      }}
                    >
                      {price.price !== 0 && (
                        <span className="priceSymbol">{Pricesymbol}</span>
                      )}

                      {/* <input
                        type="number"
                        className="Priceing-input-field"
                        placeholder="0"
                        disabled={!enableOrNot}
                        onChange={(e) =>
                          handlepriceinputchange(
                            price.typeId,
                            item.mainHeading,
                            Number(e.target.value),
                            price.isEnabled,
                            price.isNotHide
                          )
                        }
                        value={pricewithtwodigit || ""}
                      /> */}
                      <input
                        type="number"
                        className="Priceing-input-field"
                        placeholder="$0.00"
                        disabled={!enableOrNot}
                        onChange={(e) => {
                          const value = e.target.value;

                          // Regex to allow up to 4 digits in total and 2 digits after the decimal point
                          const regex = /^\d{0,4}(\.\d{0,2})?$/;

                          // If the value matches the regex, update the price
                          if (regex.test(value)) {
                            handlepriceinputchange(
                              price.typeId,
                              item.mainHeading,
                              Number(value),
                              price.isEnabled,
                              price.isNotHide
                            );
                          }
                        }}
                        value={price.price || ""}
                      />
                    </div>
                    {price.typeGroup === "D" &&
                    item.mainHeading === "On-prem" ? (
                      <div
                        className="compare-Image"
                        onClick={() =>
                          handleComparision(price.price, price.tyepeId, index)
                        }
                      >
                        <div className="comparision">
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
                        <div className="tooltip-texts">
                          Compare prices with the base price to see differences
                          <img
                            src={tooltiparrow}
                            alt=""
                            style={{ width: "100px", height: "10px" }}
                            className="arraow-image"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="percentage-diff">
                        {showCompare && (
                          <p
                            className="percentage"
                            style={{
                              color: `${
                                filteredpricelist[idx]?.increaseOrDecrease ===
                                "increase"
                                  ? "#00B71D"
                                  : "#E52333"
                              }`,
                            }}
                          >
                            {filteredpricelist[idx]?.percentage}
                          </p>
                        )}
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
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default PricingSlider;
