import { API, Image_API } from "redux/api";
import Store from "../store";
import Axios from "axios";
import {
  bestPairType,
  categoryType,
  cuisine,
  dietarytype,
  subcategory,
  subcategoryType,
} from "assets/mockData/Moca_data";
import { useSelector } from "react-redux";

export const getMenuDataApi = (locationId) => {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/api/v1/menu-items?locationId=${locationId}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
};

export function getCategory(locationId) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Category`,
  });
}

//get dropDown
export function getSubSectionData(payload) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({

    method: "post",
    url: `/api/v1/menu-items/view/sub-section`,
    data: payload, 
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

//Delete subsection
export const deleteSubSection = (data) => {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "delete",
    url: `/api/v1/menu-items/sub-section`,
    data: data,
    headers: {
      Authorization: "bearer " + token,
    },
  });
};

export const addSubsectionApi = (data) => {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "post",
    url: `/api/v1/menu-items/sub-section`,
    data: data,
    headers: {
      Authorization: "bearer " + token,
    },
  });
};

export const imageUploadingApi = (formData) => {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "post",
    url: `api/v1/menu-items/upload-image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "bearer " + token,
    },
    // headers: {
    //   'accept': 'application/json',
    //   // 'Content-Type': 'multipart/form-data' is set automatically when using FormData
    // },
  });
};

export function getSubCategory({ locationId, id }) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=${id}&option=Sub-Category`,
  });
}

export function getTagClass(locationId) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Tag`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "bearer " + token,
    },
  });
}

export function getModifier(data) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  const { name, locationId } = data;
  return API({
    method: "get",
    url: `/api/v1/menu-items/modifiers?name=${name}&locationId=${locationId}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "bearer " + token,
    },
  });
}

export function getIngredients(locationId) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=INGR`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "bearer " + token,
    },
  });
}

export function addMenuItem(data) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  const { menuPayload, locationid } = data;
  return API({
    method: "post",
    url: `/api/v1/menu-items/create`,
    data: menuPayload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,

    },
  });
}

// export function getId() {
//   return API({
//     method: "get",
//     url: 'http://192.168.1.29:8080/api/giveId',

//   });
// }

export function updateMenuItem(data) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "put",
    url: `/api/v1/menu-items/edit`,
    data: data,
    headers: {
      "Content-Type":  "application/json",
      Authorization: "bearer " + token,
    },
  });
}

export function updateMenuItemAttribute(data) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "post",
    url: `/merchants/itemAttributes`,
    data: data,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function deleteMenuItem(payload) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "delete",
    url: `/api/v1/menu-items/delete`,
    data:{itemId:payload},
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },

  });
}

export function getAvailability(locationId) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Availability`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "bearer " + token,
    },
  });
}

export function getImage() {
  return Axios.get(
    "https://i.graphicmama.com/blog/wp-content/uploads/2016/12/20132839/french-fries-vector-image.jpg"
  );
}

export function getId() {
  return Axios.get("http://192.168.1.29:8080/api/giveId");
}

export function store(formData) {
  return Axios.post(
    "https://apiq.magilhub.com/magilhub-data-services/api/v1/menu-items/upload-image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function getItemCodeRequestApi(locationId, itemCode) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/api/v1/menu-items/validate-item-code?locationId=${locationId}&itemCode=${itemCode}`,
    headers: {    
      Authorization: "bearer " + token,
    },
  });
}

export function getPopularItemRequestApi(locationId) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "get",
    url: `/api/v1/menu-items/count-exclusive-items?locationId=${locationId}`,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function apiUpdateMenu(payload) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "patch",
    url: `/api/v1/menu-items/partial-update`,
    data: payload,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}


export function hideMockData(payload) {
  const token = Store.getState()?.auth?.credentials?.accessToken;

  return API({
    method: "put",
    url: `/api/v1/menu-items/availability`,
    data:payload,
    headers: {
      Authorization: "bearer " + token,
    },
  });
}

export function deleteImage(payload) {
  const token = Store.getState()?.auth?.credentials?.accessToken;
console.log({payload});

  return API({
    method: "delete",
    url: `/api/v1/menu-items/remove?imageId=${payload}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "bearer " + token,
    },

  });
}

export function triggerFcmUrl(payload) {
  const { successCB, errorCB, eventName, topic, sendToDefaultDeviceOnly = false, locationId,  ...filteredBody } = payload || {};
  const body = {...filteredBody, locationId}  
  return API({

    method: 'post',
    url:`/api/v1/menu-items/sync?locationId=${locationId}`,
    // url: `/fcm/trigger-event?topic=${topic}&eventName=${eventName}&sendToDefaultDeviceOnly=${sendToDefaultDeviceOnly}&locationId=${locationId}`,
    data: body
  })
}

export const scheduleTriggerFCM = (payload) => {
  const { successCB, errorCB, eventName, topic, sendToDefaultDeviceOnly = false, locationId, scheduledTime,  ...filteredBody } = payload || {};
  const body = {...filteredBody, locationId, scheduledTime}  
  return API({
    method: 'post',
    url:`/api/v1/menu-items/sync?locationId=${locationId}`,
    // url: `/fcm/trigger-event?topic=${topic}&eventName=${eventName}&sendToDefaultDeviceOnly=${sendToDefaultDeviceOnly}&locationId=${locationId}`,
    data: body
  })
}