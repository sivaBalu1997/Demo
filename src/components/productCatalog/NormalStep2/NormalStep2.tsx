import React, { useState } from "react";
import "./NormalStep2.scss";
import DaysOfWeek from "../DaysOfWeek/DaysOfWeek";
import { useSelector } from "react-redux";
import { useEffect } from "react";

interface NormalForm {
  PickuppriceNormal: any;
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
    dineInDetails?: any;
    dineinfields: DineInField[];
    Normaldays:number[];
    DineIn: any;
    Pickup: number[];
    Delivery: number[];
    thirdParty: number[];
    DeliveryMealType: string[];
    PicupMealType: number[];
    pickupDetails: {
      price: any;
      availabilities: [
        {
          sessions: [];
        }
      ];
    };
    deliveryDetails: {
      price: any;
      availabilities: [
        {
          sessions: [];
        }
      ];
    };
    thirdpartyDetails: [
      {
        typeName: string;
        price: number;
        availabilities: [
          {
            sessions: [];
          }
        ];
      }
    ];

    formNormal: {
      PickuppriceNormal: number;
      PicupMealType: string;
      DeliverypriceNormal: number;
      SwiggyNormal: number;
      ZomatoNormal: number;
    };
    thirdPartyOrder: {
      SwiggyNormal: number;
      ZomatoNormal: number;
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
  console.log("prizingDetail", prizingDetail);
  

  const thirdPartyDetails = useSelector(
    (state: any) =>
      state.PricingDetailReducer.prizingData?.normalForm?.thirdpartyDetails ||
      []
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
      prizingDetail?.normalForm?.DineIn?.map((elem:any, index:number) => {
        return elem;
      })
    );
  }, []);

  const restaurantDetails = useSelector(
    (state: any) => state?.auth?.restaurantDetails
  );

  // const pd = prizingDetail?.normalForm?.dineinfields;
  // const meals = pd?.map((meal) => meal?.DineInMealType);
  // console.log({ meals });
  // const formattedMeals = meals?.[0]?.join(", "); // Join the first array with commas
  // console.log({ formattedMeals });

  const onlinePickup =
    prizingDetail?.normalForm?.pickupDetails?.availabilities &&
    prizingDetail?.normalForm?.pickupDetails?.availabilities[0] &&
    prizingDetail?.normalForm?.pickupDetails?.availabilities[0]?.sessions &&
    prizingDetail?.normalForm?.pickupDetails?.availabilities[0]?.sessions?.map(
      (elem) => elem
    );

  const onlinePickupFormatted = onlinePickup?.join(", ");
  // console.log("O", online?.join(", "));

  const onlineDelivery =
    prizingDetail?.normalForm?.deliveryDetails?.availabilities &&
    prizingDetail?.normalForm?.deliveryDetails?.availabilities[0]?.sessions &&
    prizingDetail?.normalForm?.deliveryDetails?.availabilities[0]?.sessions?.map(
      (elem) => elem
    );
  const onlineDeliveryFormatted = onlineDelivery?.join(", ");
  // console.log({ onlinePickupFormatted });


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
            prizingDetail?.normalForm &&
            prizingDetail?.normalForm?.dineinfields?.map((elem, index) => {
              return (
                <>
                  <div key={index}>
                    <h1 className="Step2DineInPricevalue">
                      {elem?.DineInPrice
                        ? `${
                            restaurantDetails?.country === "US" ? "$" : "Rs."
                          } ${parseFloat(elem.DineInPrice).toFixed(2)}`
                        : ` N/A`}
                    </h1>
                  </div>
                </>
              );
            })}
        </div>

        {/* <div>
          <h1 className="Step2DineInServiceheading">Service Time</h1>

          {prizingDetail &&
            prizingDetail?.normalForm &&
            prizingDetail?.normalForm?.dineinfields?.map((elem, index) => {
              return (
                <>
                  <div className="Step2DineInServiceTime">
                    <div>
                      {" "}
                      <h1 className="Step2DineInPricevalue">
                        {elem?.DineInMealType?.join(", ") || "N/A"}
                      </h1>
                    </div>
                  </div>
                </>
              );
            })}
        </div> */}
      </div>
      {/* <h1 className="AvailDaysheading">Available Days</h1>
      {prizingDetail &&
  prizingDetail?.normalForm &&
  (prizingDetail?.normalForm?.DineIn && prizingDetail?.normalForm?.DineIn[0]?.length > 0
    ? prizingDetail?.normalForm?.DineIn?.map((elem:any, index:number) => (
        <div key={index} className="dayacheckedavail">
          <DaysOfWeek days={elem} setDays={setDinein} Marginpresent={false}/>
        </div>
      ))
    : 
    prizingDetail?.normalForm?.dineinfields && Number(prizingDetail?.normalForm?.dineinfields[0]?.DineInPrice) >0 ?

    <DaysOfWeek days={prizingDetail?.normalForm?.Normaldays} setDays={setDinein} Marginpresent={false}/>:
    prizingDetail?.normalForm?.DineIn && prizingDetail?.normalForm?.DineIn?.map((elem:any, index:number) => (
        <div key={index} className="dayacheckedavail">
          <DaysOfWeek days={elem} setDays={setDinein} Marginpresent={false}/>
        </div>
      ))

    
    // prizingDetail?.normalForm?.Normaldays?.map((elem:any, index:any) => (
    //     <div key={index} className="dayacheckedavail">
    //     </div>
    //   ))
    
    
    
    )
      
      
      } */}

      <h1 className="Step2Onlineheading">Online</h1>
      <h1 className="Step2Pickupheading">Pickup</h1>
      <div className="Step2Pickup">
        <div className="Step2SellingPrize">
          <div>
            <h1 className="Step2SellingPrizeheading">
              Selling Price
            </h1>
          </div>
          <div>
            {prizingDetail &&
            prizingDetail.normalForm &&
            prizingDetail.normalForm.pickupDetails &&
            prizingDetail.normalForm.pickupDetails.price ? (
              <h1 className="Step2SellingPrizevalue">
                {restaurantDetails?.country === "US" ? "$" : "Rs."}

                {parseFloat(
                  prizingDetail.normalForm?.pickupDetails.price
                ).toFixed(2)}
              </h1>
            ) : (
              <>
                <h1 className="Step2SellingPrizevalue">N/A</h1>
              </>
            )}
          </div>
        </div>
        {/* <div className="Step2SellingPrize2">
          <div>
            <h1 className="Step2SellingPrizeheading2">Service Time</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {prizingDetail &&
              prizingDetail.normalForm &&
              prizingDetail.normalForm.pickupDetails &&
              prizingDetail.normalForm.pickupDetails.availabilities &&
              prizingDetail.normalForm.pickupDetails.availabilities.length >
                0 &&
              prizingDetail.normalForm.pickupDetails.availabilities[0]
                .sessions &&
              onlinePickupFormatted?.length > 0
                ? //  prizingDetail.normalForm.pickupDetails.availabilities[0].sessions.map(
                  //     (elem) => elem
                  //   )
                  onlinePickupFormatted
                : "N/A"}
            </h1>
          </div>
        </div> */}
      </div>
      {/* <h1 className="AvailDaysheadingPickup">Available Days</h1>
      <div className="DaysPickUp">
       


          {
            Pickup?.length > 0 ? ( <DaysOfWeek days={Pickup1} setDays={setPickup1} Marginpresent={true} />):

            prizingDetail.normalForm?.pickupDetails?.price>=0 &&  onlinePickupFormatted?.length > 0?<DaysOfWeek days={prizingDetail?.normalForm?.Normaldays} setDays={setPickup1} Marginpresent={true} />:
            <DaysOfWeek days={Pickup1} setDays={setPickup1} Marginpresent={true} />
          }
       
      
      </div> */}
      <h1 className="Step2Deliveryheading">Delivery</h1>
      <div className="Step2Delivery">
        <div className="Step2SellingPrize">
          <div>
            <h1 className="Step2SellingPrizeheading">
              Selling Price
            </h1>
          </div>
          <div>
            {prizingDetail &&
            prizingDetail.normalForm &&
            prizingDetail.normalForm.deliveryDetails &&
            prizingDetail.normalForm.deliveryDetails.price ? (
              <h1 className="Step2SellingPrizevalue">
                {restaurantDetails?.country === "US" ? "$" : "Rs."}

                {parseFloat(
                  prizingDetail?.normalForm.deliveryDetails.price
                ).toFixed(2)}
              </h1>
            ) : (
              <>
                <h1 className="Step2SellingPrizevalue">N/A</h1>
              </>
            )}
          </div>
        </div>
        {/* <div className="Step2SellingPrize2">
          <div>
            <h1 className="Step2SellingPrizeheading2">Service Time</h1>
          </div>
          <div>
            <h1 className="Step2SellingPrizevalue">
              {prizingDetail?.normalForm?.deliveryDetails?.availabilities
                ?.length > 0 && onlineDeliveryFormatted?.length > 0
                ? onlineDeliveryFormatted
                : // prizingDetail.normalForm.deliveryDetails.availabilities[0].sessions?.map(
                  //     (elem) => elem
                  //   )
                  "N/A"}
            </h1>
          </div>
        </div> */}
      </div>
      {/* <h1 className="AvailDaysheadingdelivery">Available Days</h1>
      <div className="DaysDelivery">
      

        {
            Delivery?.length  ? ( <DaysOfWeek days={delivery1} setDays={setDelivery1} Marginpresent={true} />):

            prizingDetail?.normalForm?.deliveryDetails?.price >=0  &&  onlineDeliveryFormatted?.length> 0 ? <DaysOfWeek days={prizingDetail?.normalForm?.Normaldays} setDays={setDelivery1} Marginpresent={true}/>:
            <DaysOfWeek days={delivery1} setDays={setDelivery1} Marginpresent={true}/>
          }
      </div> */}
      {thirdPartyDetails?.length > 0 && (
        <>
          <h1 className="Step2ThirdPartyDeliveryheading">
            Third Party Delivery
          </h1>

          <div className="Step2ThirdPartyDelivery">
            <div className="Step2SellingPrize">
              {thirdPartyDetails.map((detail: any) => (
                <div key={detail.typeId} className="Step2SellingPrize">
                  <div>
                    <h1 className="Step2SellingPrizeheading">
                      {detail.typeName} Price Listed
                    </h1>
                  </div>
                  <div>
                    <h1 className="Step2SellingPrizevalue">
                    {restaurantDetails?.country === "US" ? "$" : "Rs."}  {(prizingDetail &&
                        prizingDetail?.normalForm &&
                        prizingDetail?.normalForm?.thirdpartyDetails &&
                        prizingDetail?.normalForm?.thirdpartyDetails.map(
                          (elem: any) =>  Number(elem?.price)?.toFixed(2)
                        )) ||
                        "N/A"}


                        
                      {/* {detail.price || "N/A"} */}
                    </h1>
                  </div>
                </div>
              ))}

              {/* <div className="thirdPartyContainers">
                <h1 className="AvailDaysheadingthirparty">Available Days</h1>
                <div className="DaysThirdDelivery">
                 

                      {
             thirdParty?.length > 0 ? ( <DaysOfWeek days={thirdParty1} setDays={setThirdParty1} Marginpresent={true} />):
            <DaysOfWeek days={prizingDetail?.normalForm?.Normaldays} setDays={setThirdParty1} Marginpresent={true} />
          }
                </div>
                 
              </div> */}
              {/* {prizingDetail?.normalForm &&
                    prizingDetail?.normalForm?.thirdpartyDetails && (
                      <DaysOfWeek days={thirdParty1} setDays={setThirdParty1} />
                    )} */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NormalStep2;
