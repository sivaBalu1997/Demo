import Store from "../store";
import API from "../api";

export function getMenu(data) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "get",
    url: "/merchants/menu",
    params: data,
  });
}

// Update Item options
export function updateItemOptions(details) {
  return API({
    method: "post",
    url: "/merchants/updateMenu",
    params: details,
    headers: {
      Authorization: "bearer " + Store.getState().auth.credentials?.accessToken,
    },
  });
}
