import {
  Primary_Post_Data_Send,
  Primary_Post_Data_Success,
  Primary_Post_Data_Failure,
  Item_Customizations_Data_Success,
  Item_Customizations_Data_Request,
  Item_Customizations_Data_Failure,
  Pricing_Detail_Data_Request,
  API_Failure,
  API_Success,
  API_Request

} from "./constans";

export const primarypost = (data) => ({
  type: Primary_Post_Data_Send,
  payload: data,
});

export const primarysuccess = (response) => ({
  type: Primary_Post_Data_Success,
  payload: response,
});

export const primaryfailure = (error) => ({
  type: Primary_Post_Data_Failure,
  payload: error,
});

export const itemCustomizationPost = (data) => ({
  type: Item_Customizations_Data_Request,
  payload: data,
});

export const itemCustomizationSuccess = (response) => ({
  type: Item_Customizations_Data_Success,
  payload: response,
});

export const itemCustomizationFaaliure = (error) => ({
  type: Item_Customizations_Data_Failure,
  payload: error,
});
export const PricingDetailRequest = (data) => ({
  type: Pricing_Detail_Data_Request,
  payload: data,
});
export const PricingDetailSuccess = (response) => ({
  type: Pricing_Detail_Data_Request,
  payload: response,
});
export const PricingDetailFailure = (error) => ({
  type: Pricing_Detail_Data_Request,
  payload: error,
});


export const ApiPost = (data) => ({
  type:  API_Request,
  payload: data,
});

export const ApiSuccess = (response) => ({
  type:  API_Success,
  payload: response,
});

export const ApiFailure = (error) => ({
  type:  API_Failure,
  payload: error,
});