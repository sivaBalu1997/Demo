
import Store from "../store";
import { API } from "redux/api";

export function getOfferList(offerListParams) {

  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "GET",
    url: `/coupon/offer/${offerListParams.locationId}?status=${offerListParams.status}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function createOffer(createofferParams) {
  const token = Store.getState().auth.credentials.accessToken;

  return API({
    method: "POST",
    url: `/coupon/offer`,
    data: createofferParams,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function EditOffer(offerId) {

  const token = Store.getState().auth.credentials.accessToken;
 
  return API({
    method: "POST",
    url: `/coupon/offer/${offerId.id}`,
    data:offerId.data ,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}
export function deleteOffer(offerId) {
 
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "DELETE",
    url: `/coupon/offer/${offerId}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function disableOffer(offerId) {
  console.log(offerId,"checking disabled offers status")
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "PATCH",
    url: `/coupon/offer/${offerId.id}?status=${offerId.status}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function getDropdownData(dropdownDataparams) {

  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "GET",
    url: `/coupon/offer/details/${dropdownDataparams.locationId}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}
export function getCatagoryDropdownData(payload) {
  return API({
    method: "post",
    url: `/api/v1/menu-items/view/sub-section`,
    data: payload, // Send the full payload as the request body
  });
}



export const getSPOfferList = (locationId) => {
  return API({
    method: "get",
    url: `/coupon/happy-hour/list?locationId=${locationId}`,
  });
};

export const getSPOfferListItemDelete = (offerId) => {
  return API({
    method: "DELETE",
    url: `/coupon/happy-hours?offerId=${offerId.offerId}`,
  });
};


export const getSPOfferListItemDisable = (disableItem) => {
  
  return API({
    method: "patch",
    url: `/coupon/happy-hours?offerId=${disableItem.offerId}&toEnable=${disableItem.toEnable}`,
  });
};

export const getOfferListdata = (payload) => {
 
  return API({
    method: "GET",
    url: `coupon/happy-hours/list/items?locationId=${payload.locationId}&categoryId=${payload.catagoryId}`,
  });
};

export const createSpecialOffer = (payload) => {
  return API({
    method: "post",
    url: `/coupon/happy-hour/create`,
    data: payload,
  });
};


export const UpdateSpecialOffer = (payload) => {
  return API({
    method: "put",
    url: `/coupon/happy-hour/update`,
    data: payload,
  });
};