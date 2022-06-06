import API from "./api";
import Store from "../store";

export function getCategory(locationId) {
  return API({
    method: "get",
    url: `/merchants/itemAttributes?locationId=${locationId}&id=&option=Category`,
  });
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
      "content-type": "multipart/form-data",
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
