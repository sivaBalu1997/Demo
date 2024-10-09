import { API,Image_API } from "redux/api";
import Store from "../store";
import Axios from "axios";
import { bestPairType, categoryType, cuisine, dietarytype, subcategory, subcategoryType } from "assets/mockData/Moca_data";

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
export const deleteSubSection = ({data}) => {
  return API ({
    method: 'delete',
    url: `/api/v1/menu-items/sub-section`,
    data: {data}
  })
}

export const addSubsectionApi = ( data ) => {
  console.log('Data to be sent:', data); 

  return API({
    method: 'post',
    url: `/api/v1/menu-items/sub-section`,
    data:  data ,
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

export function getModifier(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Modifier`,
  });
}

export function getIngredients(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=INGR`,
  });
}

export function addMenuItem(data) {
  return API({
    method: "post",
    url: `/merchants/productCatalog`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
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
    url: `/merchants/item`,
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

export function deleteMenuItem(data) {
  return API({
    method: "delete",
    url: `/merchants/item?id=${data}&option=ITEM`,
  });
}

export function getAvailability(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Availability`,
  });
}

export function getImage() {
  return Axios.get('https://i.graphicmama.com/blog/wp-content/uploads/2016/12/20132839/french-fries-vector-image.jpg')
}
export function getId() {
  return Axios.get('http://192.168.1.29:8080/api/giveId')
}


export function store(formData) {

  return Axios.post('http://192.168.1.29:8080/api/storeImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}


export function getItemCodeRequestApi(locationId,itemCode) {
  return API({
    method: "get",
    url: `/api/v1/menu-items/validate-item-code?locationId=${locationId}&itemCode=${itemCode}`,
  });
}


export function getPopularItemRequestApi(locationId) {
  return API({
    method: "get",
    url: `/api/v1/menu-items/count-popular-items?locationId=${locationId}`
  });
}


