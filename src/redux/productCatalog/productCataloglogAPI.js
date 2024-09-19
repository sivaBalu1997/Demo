import { API,Image_API } from "redux/api";
import Store from "../store";
import Axios from "axios";
import { dietarytype } from "assets/mockData/Moca_data";

export function getCategory(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Category`,
  });
}

export function getDietarydata(){
  console.log("dietary",dietarytype)
  return dietarytype;
}

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