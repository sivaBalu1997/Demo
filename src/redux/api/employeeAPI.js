import Store from "../store";
import API from "./api";
import { encryptJson } from "../../util/react-ec-utils"

export function fetchOutlets(merchantId) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "post",
    url: "/merchants/deviceRegister",
    data: {
      merchantId: merchantId,
      locationId: "",
      deviceIdentifier: "",
      deviceType: "",
    },
    headers: {
      Authorization: "bearer " + token,
    },
  })
}


//Create Employee
export function createEmployee(details) {
  const token = Store.getState().auth.credentials.accessToken;
  // const merchantId = Store.getState().auth.credentials.merchantId;
  const data = encryptJson(details);
  return API({
    method: "post",
    url: `/merchants/staffs/add`, 
    data: {data},
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Get Employee
export function getEmployeeDetails(locationId) {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  const payload = {"locationId":locationId}
  const encPayload = encryptJson(payload);
  return API({
    method: "post",
    url: `/merchants/staffs`,
    data:{"data":encPayload},
    // params:{"data":encPayload},
    headers: {
      Authorization: "bearer " + token,
    },
  },)
}

//Get Employee By ID
export function getEmployeeById(staffId) {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  const staff = staffId

  const reqPayload = {merchantId:merchantId,staffId:staffId}
  const data = encryptJson(reqPayload);
  return API({
    method: 'post',
    url: `/merchants/staff/details`,
    data:{data},
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Get Employee role By ID
export function getEmployeeRoleById(staffId) {
  const token = Store.getState().auth.credentials.accessToken;
  const merchantId = Store.getState().auth.credentials.merchantId;
  const staff = staffId
  const reqPayload = {merchantId:merchantId,staffId:staffId}
  const data = encryptJson(reqPayload);


  return API({
    method: 'post',
    url: `/merchants/staff/permissions`,
    data:{data},
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Remove Employee
export function removeEmployee(staffId) {
  const token = Store.getState().auth.credentials.accessToken;
  const staff = staffId
  
  const reqPayload = {staffId:staffId}
  const data = encryptJson(reqPayload);
  return API({
    method: "delete",
    url: `/merchants/staffs/remove`, 
    data: {data},
    headers: {
      Authorization: "bearer " + token,
    },
  })
}
export function manageUserAccess(details) {
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: "/merchants/manage/userAccess",
    data: details,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

export function updatePIN(details) {
 // console.log("Calling from API :::::");
  const token = Store.getState().auth.credentials.accessToken;
  return API({
    method: "put",
    url: `/staff?id=${details.id}&devicePin=${details.pin}`,
    headers: {
      Authorization: "bearer " + token,
    },
  })
}

//Roles and Functions
export const rolesAndFunctions = () => {
  const token = Store.getState().auth.credentials.accessToken;
  return API ({
    method: 'get',
    url: `/api-info`,
    headers: {
      Authorization: "bearer " + token,
    }
  })
}

//Block or Unblock employee
export const employeeStatus = ({staffId, isToBlock}) => {
  const token = Store.getState().auth.credentials.accessToken;
  const staff = staffId;
  const reqPayload = {staffId:staffId,isToBlock:isToBlock}
  console.log("Payload:",staffId,isToBlock)
  const data = encryptJson(reqPayload);
  
  return API ({
    method: 'patch',
    url:`/merchants/staffs/status`, 
    data:{data},
    headers: {
      Authorization: "bearer " + token,
    }
  })
}

//Edit Employee
export const editEmployee = (details) => {
  const token = Store.getState().auth.credentials.accessToken;
  const data = encryptJson(details);

  return API ({
    method: 'put',
    url:`/merchants/staffs/update`,
    data:{data},
    headers: {
      Authorization: "bearer " + token,
    }
  })
}

//Pin Refresh
export const refreshPinApi = (merchantId) => {
  const token = Store.getState().auth.credentials.accessToken;
  return API ({
    method: 'get',
    url:`/merchants/${merchantId}/device-pin`,
    headers: {
      Authorization: "bearer " + token,
    }
  })
}
