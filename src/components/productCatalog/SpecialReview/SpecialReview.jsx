import React from "react";
import "./SpecialReview.scss";
import DaysOfWeek from "../DaysOfWeek/DaysOfWeek";
import { useState } from "react";
import { useSelector } from "react-redux";

const SpecialReview = () => {

  const prizingDetail=useSelector((state)=> state?.PricingDetailReducer?.prizingData )

  const specialcheck= prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.specialcheck ;
  const [specialcheck1, setspecialcheck1] = useState(specialcheck);
  // console.log(specialcheck)


  return (
    <div className="Special-Review-Container">
      <div className="Available-Service-Streams-container ">
        {/* {-----------------Heading-----------------------------------------------------} */}
        <h3 className=" Available-Service-Streams-heading">
          Available Service Streams(Special){" "}
        </h3>
      </div>

      {/* {--------------From to container----------------------------------------------------------------} */}

      <div className="from-to-container-Special">
        <div className="from-to-container-Special-column">
          <h3 className="Available-Service-Streams-label-heading">From</h3>
          <h3 className="Available-Service-Streams-date-heading">{ prizingDetail &&  prizingDetail.specialForm &&  prizingDetail.specialForm.fromDate|| "-"}</h3>
        </div>

        <div className="from-to-container-Special-column">
          <h3 className="Available-Service-Streams-label-heading">To</h3>
          <h3 className="Available-Service-Streams-date-heading">{ prizingDetail &&  prizingDetail.specialForm &&  prizingDetail.specialForm.toDate|| "-"}</h3>
        </div>
      </div>

      {/* {--------------Available Days----------------------------------------------------------------} */}

      <div className="Available-Days-Heading-Container">
        <h1 className="Available-days-heading">Available days</h1>

        <DaysOfWeek days={specialcheck1} setDays={setspecialcheck1}  />
      </div>

      {/* ----------------------------{/Dine In/}------------------------------------ */}

      <div className="dinein-review-container">
        <h3 className="Dine-in-Heading">Dine In</h3>

        <div className="dine-in-items-container">
          <div className="dine-in-items-container-column">
            <h3 className="dine-in-items-container-heading">Price</h3>

            { prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.dineinfields.map((elem,index)=>{
              return(

                <>
                 <h3 className="dine-in-items-label">{elem.DineInPrice}</h3>
                
                </>
              )
            })}

           
          </div>

          <div className="dine-in-items-container-column">
            <h3 className="dine-in-items-container-heading">Service Time</h3>
            { prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.dineinfields.map((elem,index)=>{
              return(

                <>
                 <h3 className="dine-in-items-label">{elem.DineInMealType}</h3>
                
                </>
              )
            })}
          </div>

          <div className="dine-in-items-container-column">
            <h3 className="dine-in-items-container-heading">Service Area</h3>
            {prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.dineinfields.map((elem,index)=>{
              return(

                <>
                 <h3 className="dine-in-items-label">{elem.DineInServiceArea}</h3>
                
                </>
              )
            })}
          </div>
        </div>
      </div>

      {/* ----------------------------Online------------------------------------ */}

      <div className="Online-review-container">
        <h3 className="online-heading-special">Online</h3>

        <h3 className="Pickup-Heading">Pick Up </h3>
        <div className="pickup-items-container">
          <div className="pick-up-container-column">
            <h3 className="pick-up-container-heading pickupselling">
              Selling Price For Pick up
            </h3>

            <h3 className="pick-up-items-label">{ prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.form && prizingDetail.specialForm.form.Pickupprice || "-"}</h3>
          </div>

          <div className="pick-up-container-column">
            <h3 className="pick-up-container-heading pickupservicetime">Service Time</h3>
            <h3 className="pick-up-items-label pickupservicetime"> { prizingDetail && prizingDetail.specialForm  && prizingDetail.specialForm.selectedValuespickup || "-"} </h3>
          </div>
        </div>

        {/* {----------------------------------Delivery--------------------------------------------} */}

        <div>
          <h3 className="Special-Heading">Delivery </h3>

          <div className="special-container">
            <div className="special-container-column">
              <h3 className="Special-container-heading deliveryselling">
              Selling Price For Delivery
              </h3>

              <h3 className="special-items-label">{prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.form && prizingDetail.specialForm.form.Deliveryprice || "-"}</h3>
            </div>

            <div className="special-container-column">
              <h3 className="Special-container-heading deliveryservice">Service Time</h3>
              <h3 className="special-items-label">   { prizingDetail && prizingDetail.specialForm  && prizingDetail.specialForm.selectedValuesdelivery || "-"} </h3>
            </div>

          </div>

        </div>

        {/* {-------------------Third Party----------------------------------------------------} */}
        <div>
          <h3 className="Special-Heading1">Third Party Delivery </h3>

          <div className="special-container-thirdparty">
            <div className="special-container-column-thirdparty">
              <h3 className="Special-container-heading-thirdparty thirdpartyselling">
              Selling Price For Third Party
              </h3>

              <h3 className="special-items-label">{ prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.form && prizingDetail.specialForm.form.Swiggy || "-"}</h3>
            </div>

            <div className="special-container-column-thirdparty">
              <h3 className="Special-container-heading-thirdparty thirdpartyprice">Zomato Price </h3>
              <h3 className="special-items-label-thirdparty"> {prizingDetail && prizingDetail.specialForm && prizingDetail.specialForm.form && prizingDetail.specialForm.form.Zomato || "-"} </h3>
            </div>

          </div>

        </div>



      </div>
    </div>
  );
};

export default SpecialReview;
