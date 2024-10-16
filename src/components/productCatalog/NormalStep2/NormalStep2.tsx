import React, { useState } from "react";
import "./NormalStep2.scss";
import DaysOfWeek from "../DaysOfWeek/DaysOfWeek";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface NormalForm {
  PickuppriceNormal: string;
  PickupmealtypeNormal: string;
  DeliverypriceNormal: string;
  DeliverymealtypeNormal: string;
  SwiggyorzomatoNormal: string;
  SwiggyNormal: string;
  SwiggymealtypeNormal: string;
  ZomatoNormal: string;
  ZomatomealtypeNormal: string;
  DeliveryMealType: string;
}

interface DineInField {
  DineInPrice: string;
  DineInMealType: string[];
  DineInService: string;
  showDay: boolean;
  dayButtonText: string;
}

interface NormalFormData {
  normalForm: {
    dineinfields: DineInField[];
    DineIn: number[];
    Pickup: number[];
    Delivery: number[];
    thirdParty: number[];
    DeliveryMealType: string[];
    PicupMealType: string[];

    formNormal: {
      PickuppriceNormal: string;
      PicupMealType: string;
      DeliverypriceNormal: string;
      SwiggyNormal: string;
      ZomatoNormal: string;
    };
    thirdPartyOrder: {
      SwiggyNormal: string;
      ZomatoNormal: string;
    };
  };
}

interface RootState {
  PricingDetailReducer: {
    prizingData: NormalFormData;
  };
}

const NormalStep2 = () => {
  const prizingDetail = useSelector(
    (state: RootState) => state?.PricingDetailReducer?.prizingData || {}
  );
  const thirdParty =
    prizingDetail &&
    prizingDetail.normalForm &&
    prizingDetail?.normalForm.thirdParty;
  const [thirdParty1, setThirdParty1] = useState<number[]>(thirdParty);

  const Pickup =
    prizingDetail &&
    prizingDetail.normalForm &&
    prizingDetail?.normalForm.Pickup;
  const [Pickup1, setPickup1] = useState<number[]>(Pickup);

  const Delivery =
    prizingDetail &&
    prizingDetail.normalForm &&
    prizingDetail?.normalForm.Delivery;
  const [delivery1, setDelivery1] = useState<number[]>(Delivery);

  const Dinein =
    prizingDetail &&
    prizingDetail.normalForm &&
    prizingDetail?.normalForm.DineIn;
  const [Dinein1, setDinein] = useState<number[]>(Dinein);

  useEffect(() => {
    setDinein(
      prizingDetail?.normalForm?.DineIn.map((elem, index) => {
        return elem; // or apply any transformation to elem if needed
      })
    );
  }, []);

  return (
    <div>
      <div className="Step2Avaliable">
        <h1 className="Step2Avaliable-heading">
          Available Service Streams(Normal)
        </h1>
      </div>
      <h1 className="Step2Dinein-heading">Dine in</h1>
      <div className="Step2DineIn">
        <div className="Step2DineInPrice">
          <div>
            <h1 className="Step2DineInPriceheading">Price</h1>
          </div>
          {prizingDetail &&
            prizingDetail.normalForm &&
            prizingDetail.normalForm.dineinfields.map((elem, index) => {
              return (
                <>
                  <div key={index}>
                    <h1 className="Step2DineInPricevalue">
                      {elem.DineInPrice || "-"}
                    </h1>
                  </div>
                </>
              );
            })}
        </div>

        <div>
          <h1 className="Step2DineInServiceheading">Service Time</h1>

          {prizingDetail &&
            prizingDetail.normalForm &&
            prizingDetail.normalForm.dineinfields.map((elem, index) => {
              return (
                <>
                  <div className="Step2DineInServiceTime">
                    <div>
                      {" "}
                      <h1 className="Step2DineInPricevalue">
                        {elem.DineInMealType || "-"}
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
        </div>

        <div className="Step2DineInServiceArea">
          <div>
            <h1 className="Step2DineInServiceAreaheading">Service Area</h1>
          </div>

          {prizingDetail &&
            prizingDetail.normalForm &&
            prizingDetail.normalForm.dineinfields.map((elem, index) => {
              return (
                <>
                  <div>
                    <h1 className="Step2DineInPricevalue">
                      {elem.DineInService || "-"}
                    </h1>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <h1 className="AvailDaysheading">Available Days</h1>
      {prizingDetail &&
        prizingDetail?.normalForm &&
        prizingDetail?.normalForm.DineIn.map((elem, index) => {
          return (
            <>
              <div className="dayacheckedavail">
                <DaysOfWeek days={elem} setDays={setDinein} />
              </div>
            </>
          );
        })}

      <h1 className="Step2Onlineheading">Online</h1>
      <h1 className="Step2Pickupheading">Pickup</h1>
      <div className="Step2Pickup">
        <div className="Step2SellingPrize">
          <div>
            <h1 className="Step2SellingPrizeheading">
              Selling Price for Pickup
            </h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.formNormal &&
                prizingDetail.normalForm.formNormal.PickuppriceNormal) ||
                "-"}
            </h1>
          </div>
        </div>
        <div className="Step2SellingPrize2">
          <div>
            <h1 className="Step2SellingPrizeheading2">Service Time</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.PicupMealType) ||
                "-"}
            </h1>
          </div>
        </div>
      </div>
      <h1 className="AvailDaysheadingPickup">Available Days</h1>
      <div className="DaysPickUp">
        <DaysOfWeek days={Pickup1} setDays={setPickup1} />
      </div>
      <h1 className="Step2Deliveryheading">Delivery</h1>
      <div className="Step2Delivery">
        <div className="Step2SellingPrize">
          <div>
            <h1 className="Step2SellingPrizeheading">
              Selling Price for Delivery
            </h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.formNormal &&
                prizingDetail.normalForm.formNormal.DeliverypriceNormal) ||
                "-"}
            </h1>
          </div>
        </div>
        <div className="Step2SellingPrize2">
          <div>
            <h1 className="Step2SellingPrizeheading2">Service Time</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.DeliveryMealType) ||
                "-"}
            </h1>
          </div>
        </div>
      </div>
      <h1 className="AvailDaysheadingdelivery">Available Days</h1>
      <div className="DaysDelivery">
        <DaysOfWeek days={delivery1} setDays={setDelivery1} />
      </div>
      <h1 className="Step2ThirdPartyDeliveryheading">Third Party Delivery</h1>
      <div className="Step2ThirdPartyDelivery">
        <div className="Step2SellingPrize">
          <div>
            <h1 className="Step2SellingPrizeheading">Swiggy Prize Listed</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.formNormal &&
                prizingDetail.normalForm.formNormal.SwiggyNormal) ||
                "-"}
            </h1>
          </div>
        </div>
        <div className="Step2SellingPrize2">
          <div>
            <h1 className="Step2SellingPrizeheading2">Zomato Price Listed</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {(prizingDetail &&
                prizingDetail.normalForm &&
                prizingDetail.normalForm.formNormal &&
                prizingDetail.normalForm.formNormal.ZomatoNormal) ||
                "-"}
            </h1>
          </div>
        </div>
      </div>
      <h1 className="AvailDaysheadingthirparty">Available Days</h1>
      <div className="DaysThirdDelivery">
        <DaysOfWeek days={thirdParty1} setDays={setThirdParty1} />
      </div>
    </div>
  );
};

export default NormalStep2;
