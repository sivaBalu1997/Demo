import React, { useState } from "react";
import "./style.scss";
import edit from "../../../assets/svg/editoffer.svg";
import duplicate from "../../../assets/svg/Duplicate.svg";
import disable from "../../../assets/svg/offerdisable.svg";
import bin from "../../../assets/svg/offerbin.svg";
import { useDispatch } from "react-redux";
import { SPOfferListDelete, SPOfferListDisable ,SPOfferListEdit} from "redux/offer/offerActions";
import { useHistory } from "react-router";

interface DropdownParams {
  EnableorNot?: number;
  offerData?: any;
}

const Index: React.FC<DropdownParams> = ({ EnableorNot, offerData }) => {
  const dispatch = useDispatch(); 
  const history = useHistory();
  const [showDropdown,setShowDropdown]=useState(true);

  const handleEdit = (offer: any) => {
    console.log("Edit offer:", offer);
    dispatch(SPOfferListEdit(offer))
    history.push("/offer/special");
 
  };





  const handleDisable = (offer: any) => {
    console.log("Disable offer:", offer);

  
    const disableOffer = {
      offerId: offer.offerId,
      toEnable: EnableorNot === 1 || EnableorNot === 2 ? false : true,
    };

    dispatch(SPOfferListDisable(disableOffer));
    setShowDropdown(false)
  };

  const handleDelete = (offer: any) => {
    console.log("Delete offer:", offer);
    dispatch(SPOfferListDelete(offer.offerId));
    setShowDropdown(false)
  };

  const data = [
    ...(EnableorNot !== 0
      ? [
          {
            name: "Edit",
            img: edit,
            onclickFn: () => handleEdit(offerData),
          },
          {
            name: "Duplicate",
            img: duplicate,
            onclickFn: () => handleEdit(offerData),
          },
        ]
      : []),
    {
      name: EnableorNot === 0 ? "Enable" : "Disable",
      img: disable,
      onclickFn: () => handleDisable(offerData),
    },
    {
      name: "Delete",
      img: bin,
      onclickFn: () => handleDelete(offerData),
    },
  ];


  return (
<>{
  showDropdown &&  <div className="Offersdropdown-container">

  {   data.map((elem, index) => (
    <div
      key={index}
      className="Offersdropdown-items"
      onClick={elem.onclickFn}
    >
      <img className="Offersdropdown_img" src={elem.img} alt={elem.name} />
      <h4 className="Offersdropdown-heading">{elem.name}</h4>
    </div>
  ))}
</div>
}
</>
    
   
    
    
  );
};

export default Index;
