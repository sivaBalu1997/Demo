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
  return API({
    method: "get",
    url: `/api/v1/menu-items?locationId=${locationId}`,
  });
};

export function getCategory(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Category`,
  });
}

//get dropDown
export function getSubSectionData(payload) {
  return API({
    method: "post",
    url: `/api/v1/menu-items/view/sub-section`,
    data: payload, // Send the full payload as the request body
  });
}

//Delete subsection
export const deleteSubSection = (data) => {
  return API({
    method: "delete",
    url: `/api/v1/menu-items/sub-section`,
    data: data,
  });
};

export const addSubsectionApi = (data) => {
  return API({
    method: "post",
    url: `/api/v1/menu-items/sub-section`,
    data: data,
  });
};

export const imageUploadingApi = (formData) => {
  return API({
    method: "post",
    url: `api/v1/menu-items/upload-image`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // headers: {
    //   'accept': 'application/json',
    //   // 'Content-Type': 'multipart/form-data' is set automatically when using FormData
    // },
  });
};

export function getSubCategory({ locationId, id }) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=${id}&option=Sub-Category`,
  });
}

export function getTagClass(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Tag`,
  });
}

export function getModifier(data) {
  const { name, locationId } = data;
  return API({
    method: "get",
    url: `/api/v1/menu-items/modifiers?name=${name}&locationId=${locationId}`,
  });
}

export function getIngredients(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=INGR`,
  });
}

export function addMenuItem(data) {
  const { menuPayload, locationid } = data;
  return API({
    method: "post",
    url: `/api/v1/menu-items`,
    data: menuPayload,
    headers: {
      "Content-Type": "application/json",
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
  return API({
    method: "put",
    url: `/api/v1/menu-items/edit`,
    data: data,
  });
}

export function updateMenuItemAttribute(data) {
  return API({
    method: "post",
    url: `/merchants/itemAttributes`,
    data: data,
  });
}

export function deleteMenuItem(payload) {
  return API({
    method: "delete",
    url: `/api/v1/menu-items/delete`,
    data:{itemId:payload}

  });
}

export function getAvailability(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Availability`,
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
  return API({
    method: "get",
    url: `/api/v1/menu-items/validate-item-code?locationId=${locationId}&itemCode=${itemCode}`,
  });
}

export function getPopularItemRequestApi(locationId) {
  return API({
    method: "get",
    url: `/api/v1/menu-items/count-popular-items?locationId=${locationId}`,
  });
}

export function apiUpdateMenu(payload) {
  return API({
    method: "patch",
    url: `/api/v1/menu-items/partial-update`,
    data: payload,
  });
}


export function hideMockData(payload) {
  return API({
    method: "put",
    url: `/api/v1/menu-items/availability`,
    data:payload
  });
}
