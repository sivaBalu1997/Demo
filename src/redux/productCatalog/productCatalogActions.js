import {
  GET_MENU_CATEGORY_FAILED,
  GET_MENU_CATEGORY_SUCCESS,
  GET_MENU_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_FAILED,
  GET_MENU_SUB_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_SUCCESS,
  GET_TAG_CLASS_FAILED,
  GET_TAG_CLASS_REQUEST,
  GET_TAG_CLASS_SUCCESS,
  GET_INGR_REQUEST,
  GET_INGR_SUCCESS,
  GET_INGR_FAILED,
  ADD_MENU_ITEM_FAILED,
  ADD_MENU_ITEM_REQUEST,
  ADD_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_FAILED,
  UPDATE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_FAILED,
  GET_MODIFIER_REQUEST,
  GET_MODIFIER_SUCCESS,
  GET_MODIFIER_FAILED,
  GET_AVAILABILITY_REQUEST,
  GET_AVAILABILITY_SUCCESS,
  GET_AVAILABILITY_FAILED,
  UPDATE_MENU_ATTRIBUTE_REQUEST,
  UPDATE_MENU_ATTRIBUTE_SUCCESS,
  UPDATE_MENU_ATTRIBUTE_FAILED,
  CLEAR_MENU_ITEM_SUCCESS,
  RESET_DELETE_DATA,
  Primary_Post_Data_Send,
  Primary_Post_Data_Success,
  Primary_Post_Data_Failure,
  Item_Customizations_Data_Failure,
  Item_Customizations_Data_Success,
  Item_Customizations_Data_Request,
  Pricing_Detail_Data_Request,
  Pricing_Detail_Data_Success,
  Pricing_Detail_Data_Failure,
  Get_ItemImage,
  Get_ItemImage_Success,
  Get_ItemImage_Failure,
  STORE_MOCK_DATA_REQUEST,
  STORE_MOCK_DATA_SUCCESS,
  STORE_MOCK_DATA_FAILURE,
  STORE_MOCK_DATA_FILTERED_REQUEST,
  STORE_MOCK_DATA_FILTERED_SUCCESS,
  STORE_MOCK_DATA_FILTERED_FAILURE,
  ADD_MOCK_DATA_REQUEST,
  ADD_MOCK_DATA_SUCCESS,
  ADD_MOCK_DATA_FALIURE,
  DIET_DROPDOWN_LIST_REQUEST,
  DIET_DROPDOWN_LIST_SUCCESS,
  DIET_DROPDOWN_LIST_FAILURE,
  CUISINE_DATA_REQUEST,
  CUISINE_DATA_SUCCESS,
  CUISINE_DATA_FAILURE,
  CATEGORY_DATA_REQUEST,
  CATEGORY_DATA_SUCCESS,
  CATEGORY_DATA_FAILURE,
  BESTPAIR_DATA_REQUEST,
  BESTPAIR_DATA_SUCCESS,
  BESTPAIR_DATA_FAILURE,
  SUBCATEGORY_DATA_REQUEST,
  SUBCATEGORY_DATA_SUCCESS,
  SUBCATEGORY_DATA_FAILURE,
  DELETEDIETARY_REQUEST,
  DELETEDIETARY_SUCCESS,
  DELETEDIETARY_FAILURE,
  DELETECUISINE_REQUEST,
  DELETECUISINE_SUCCESS,
  DELETECUISINE_FAILURE,
  DELETECATEGORY_REQUEST,
  DELETECATEGORY_SUCCESS,
  DELETECATEGORY_FAILURE,
  DELETESUBCATEGORY_REQUEST,
  DELETESUBCATEGORY_SUCCESS,
  DELETESUBCATEGORY_FAILURE,
  FETCHDROPDOWN_FAILURE,
  FETCHDROPDOWN_REQUEST,
  FETCHDROPDOWN_SUCCESS,
  DELETEDROPDOWN_REQUEST,
  DELETEDROPDOWN_SUCCESS,
  DELETEDROPDOWN_FAILURE,
  UPLOAD_IMAGE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_IN_PROGRESS,
  ADD_MOCK_DATA_HIDDEN_REQUEST,
  ADD_MOCK_DATA_HIDDEN_SUCCESS,
  ADD_MOCK_DATA_HIDDEN_FALIURE,
  DIET_DATA_SUCCESS,
  DIET_DATA_REQUEST,
  DIET_DATA_FAILURE,
  GET_ITEM_CODE_REQUEST,
  GET_ITEM_CODE_SUCCESS,
  GET_ITEM_CODE_FAILURE,
  GET_POPULAR_ITEM_SUCCESS,
  GET_POPULAR_ITEM_FAILURE,
  GET_POPULAR_ITEM_REQUEST,
  SELECTED_MOCKDATA_REQUEST,
  SELECTED_MOCKDATA_SUCCESS,
  SELECTED_MOCKDATA_FAILURE,
  STORE_MENU_REQUEST,
  STORE_MENU_SUCCESS,
  STORE_MENU_FAILURE,
  ADDDROPDOWN_SUCCESS,
  ADDDROPDOWN_REQUEST,
  ADDDROPDOWN_FAILURE,
  KITCHEN_DATA_REQUEST,
  KITCHEN_DATA_SUCCESS,
  KITCHEN_DATA_FAILURE,
  PARTIAL_UPDATE_MENU_REQUEST,
  PARTIAL_UPDATE_MENU_SUCCESS,
  PARTIAL_UPDATE_MENU_FAILURE,
  START_IMAGE_UPLOAD,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  STORE_UPLOAD_FAILURE,
  API_UPLOAD_FAILURE,
  RETRY_IMAGE_UPLOAD,
  RETRY_IMAGE_SUCCESS,
  RETRY_IMAGE_FAILURE,
  SEARCH_FORITEM_SUCCESS,
  SEARCH_FORITEM,
  SEARCH_FORITEM_FAILURE,
  STORE_DATA_WITH_CATEGORY,
  STORE_DATA_WITH_CATEGORY_SUCCESS,
  STORE_DATA_WITH_CATEGORY_FAILURE,
  STORE_UPLOAD_SUCCESS,
  DELETE_MODIFIER_REQUEST,
  DELETE_MODIFIER_SUCCESS,
  DELETE_MODIFIER_FAILURE,
  REMOVE_DATA_REQUEST,
  REMOVE_DATA_SUCCESS,
  REMOVE_DATA_FAILURE,
  REMOVE_CODE_REQUEST,
  REMOVE_CODE_SUCCESS,
  REMOVE_CODE_FAILURE,
  UPDATE_MODIFIER_REQUEST,
  SELECTED_CATEGORY_DATA_REQUEST,
  RESET_SUCCESS_MESSAGE,
  ALLERGENS_REQUEST,
  ALLERGENS_SUCCESS,
  ALLERGENS_FAILURE,
  INGREDIENTS_REQUEST,
  INGREDIENT_SUCESS,
  INGREDIENT_FAILURE,
  Remove_ItemCust_Data_Request,
  Remove_Primary_Data_Request,
  Remove_Pricing_Data_Request,
  TAXCLASS_REQUEST,
  TAXCLASS_SUCCESS,
  TAXCLASS_FAILURE,
  GET_ITEM_CODE_VaLIDATION_ERROR,
  DELETE_IMAGE_FAILURE,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_REQUEST,
  SELECTED_COLUMNS,
  TRIGGER_FCM,
  TRIGGERED_FCM,
  SCHEDULE_FCM,
  SCHEDULE_FCM_RESPONSE,
  MEALTYPE_REQUEST,
  MEALTYPE_SUCCESS,
  MEALTYPE_FAILURE,
} from "./productCatalogConstants";

//Get Menu

export const getMenuRequest = (data) => ({
  type: STORE_MENU_REQUEST,
  payload: data,
});

export const getMenuSuccess = (response) => ({
  type: STORE_MENU_SUCCESS,
  payload: response,
});

export const getMenuFailure = (error) => ({
  type: STORE_MENU_FAILURE,
  payload: error,
});

// Get Menu Category
export const getMenuCategoryRequest = (details) => ({
  type: GET_MENU_CATEGORY_REQUEST,
  payload: details,
});

export const getMenuCategorySuccess = (details) => ({
  type: GET_MENU_CATEGORY_SUCCESS,
  payload: details,
});
export const getMenuCategoryFailed = (details) => ({
  type: GET_MENU_CATEGORY_FAILED,
  payload: details,
});

// Get Menu Sub Category
export const getMenuSubCategoryRequest = (details) => ({
  type: GET_MENU_SUB_CATEGORY_REQUEST,
  payload: details,
});

export const getMenuSubCategorySuccess = (details) => ({
  type: GET_MENU_SUB_CATEGORY_SUCCESS,
  payload: details,
});

export const getMenuSubCategoryFailed = (details) => ({
  type: GET_MENU_SUB_CATEGORY_FAILED,
  payload: details,
});

// Get Tax Class
export const getTagClassRequest = (details) => ({
  type: GET_TAG_CLASS_REQUEST,
  payload: details,
});

export const getTagClassSuccess = (details) => ({
  type: GET_TAG_CLASS_SUCCESS,
  payload: details,
});

export const getTagClassFailed = (details) => ({
  type: GET_TAG_CLASS_FAILED,
  payload: details,
});

// Get Ingredients
export const getIngredientsRequest = (details) => ({
  type: GET_INGR_REQUEST,
  payload: details,
});

export const getIngredientsSuccess = (details) => ({
  type: GET_INGR_SUCCESS,
  payload: details,
});

export const getIngredientsFailed = (details) => ({
  type: GET_INGR_FAILED,
  payload: details,
});

// Get Modifier
export const getModifierRequest = (details) => {
  return {
    type: GET_MODIFIER_REQUEST,
    payload: details,
  };
};

export const getModifierSuccess = (details) => ({
  type: GET_MODIFIER_SUCCESS,
  payload: details,
});

export const getModifierFailed = (details) => ({
  type: GET_MODIFIER_FAILED,
  payload: details,
});

// Get Modifier
export const getAvailabilityRequest = (details) => ({
  type: GET_AVAILABILITY_REQUEST,
  payload: details,
});

export const getAvailabilitySuccess = (details) => ({
  type: GET_AVAILABILITY_SUCCESS,
  payload: details,
});

export const getAvailabilityFailed = (details) => ({
  type: GET_AVAILABILITY_FAILED,
  payload: details,
});

// Add menu Items
export const addMenuItemRequest = (data) => {
  return {
    type: ADD_MENU_ITEM_REQUEST,
    payload: data,
  };
};

export const addMenuItemSuccess = (data) => ({
  type: ADD_MENU_ITEM_SUCCESS,
  payload: data,
});

export const cleanMenuItemSuccessMsg = () => ({
  type: CLEAR_MENU_ITEM_SUCCESS,
  payload: "",
});
export const addMenuItemFailed = (data) => ({
  type: ADD_MENU_ITEM_FAILED,
  payload: data,
});

// Update Menu Item
export const updateMenuItemRequest = (data) => ({
  type: UPDATE_MENU_ITEM_REQUEST,
  payload: data,
});

export const updateMenuItemSuccess = (data) => ({
  type: UPDATE_MENU_ITEM_SUCCESS,
  payload: data,
});

export const updateMenuItemFailed = (data) => ({
  type: UPDATE_MENU_ITEM_FAILED,
  payload: data,
});

export const clearMenuItemSuccess = () => ({
  type: CLEAR_MENU_ITEM_SUCCESS,
  payload: "",
});

// Update Menu Attributes
export const updateMenuAttributeRequest = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_REQUEST,
  payload: data,
});
export const updateMenuAttributeSuccess = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_SUCCESS,
  payload: data,
});
export const updateMenuAttributeFailed = (data) => ({
  type: UPDATE_MENU_ATTRIBUTE_FAILED,
  payload: data,
});

// Delete Menu Item
export const deleteMenuItemRequest = (data) => ({
  type: DELETE_MENU_ITEM_REQUEST,
  payload: data,
});

export const deleteMenuItemSuccess = (data) => ({
  type: DELETE_MENU_ITEM_SUCCESS,
  payload: data,
});

export const deleteMenuItemFailed = (data) => ({
  type: DELETE_MENU_ITEM_FAILED,
  payload: data,
});

export const resetDeleteData = () => ({
  type: RESET_DELETE_DATA,
});

// {******************Primary Page Redux Actions*****************************************************}

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
export const PrimaryDataClear=()=>({
  type:Remove_Primary_Data_Request,
})

// {******************Item Customization  Redux Actions*****************************************************}

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
export const itemCustomizationClear=()=>({
  type:Remove_ItemCust_Data_Request,
})

// {******************Pricing Detail  Redux Actions*****************************************************}

export const PricingDetailRequest = (data) => ({
  type: Pricing_Detail_Data_Request,
  payload: data,
});
export const PricingDetailSuccess = (response) => ({
  type: Pricing_Detail_Data_Success,
  payload: response,
});
export const PricingDetailFailure = (error) => ({
  type: Pricing_Detail_Data_Failure,
  payload: error,
});
export const PricingDetailsClear=()=>({
  type:Remove_Pricing_Data_Request,
})

//{******************Item_Image_From_Internet*****************************************************}

export const Get_Image = () => ({
  type: Get_ItemImage,
});

export const Get_Image_Success = (data) => ({
  type: Get_ItemImage_Success,
  payload: data,
});

export const Get_Image_Failed = (data) => ({
  type: Get_ItemImage_Failure,
  payload: data,
});

export const storeMockDataRequest = (data) => ({
  type: STORE_MOCK_DATA_REQUEST,
  payload: data,
});

export const storeMockDataSuccess = (response) => ({
  type: STORE_MOCK_DATA_SUCCESS,
  payload: response,
});

export const storeMockDataFailure = (error) => ({
  type: STORE_MOCK_DATA_FAILURE,
  payload: error,
});

export const storeMockDataFilteredRequest = (data) => ({
  type: STORE_MOCK_DATA_FILTERED_REQUEST,
  payload: data,
});

export const storeMockDataFilteredSuccess = (response) => ({
  type: STORE_MOCK_DATA_FILTERED_SUCCESS,
  payload: response,
});

export const storeMockDataFilteredFailure = (error) => ({
  type: STORE_MOCK_DATA_FILTERED_FAILURE,
  payload: error,
});

// {************AddMockDataRedux***********************************}

export const addMockDataRequest = (data) => ({
  type: ADD_MOCK_DATA_REQUEST,
  payload: data,
});

export const addMockDataSuccess = (response) => ({
  type: ADD_MOCK_DATA_SUCCESS,
  payload: response,
});

export const addMockDataFailure = (error) => ({
  type: ADD_MOCK_DATA_FALIURE,
  payload: error,
});

//dietary
export const dietdatarequest = (data) => ({
  type: DIET_DROPDOWN_LIST_REQUEST,
  payload: data,
});

export const dietdatasuccess = (response) => ({
  type: DIET_DROPDOWN_LIST_SUCCESS,
  payload: response,
});

export const dietdatafailure = (error) => ({
  type: DIET_DROPDOWN_LIST_FAILURE,
  payload: error,
});

//cuisine
export const cuisineDataRequest = (data) => ({
  type: CUISINE_DATA_REQUEST,
  payload: data,
});

export const cuisineDataSuccess = (response) => ({
  type: CUISINE_DATA_SUCCESS,
  payload: response,
});

export const cuisineDataFailure = (error) => ({
  type: CUISINE_DATA_FAILURE,
  payload: error,
});

//category
export const catogoryDataRequest = (data) => ({
  type: CATEGORY_DATA_REQUEST,
  payload: data,
});

export const catogoryDataSuccess = (response) => ({
  type: CATEGORY_DATA_SUCCESS,
  payload: response,
});

export const catogoryDataFailure = (error) => ({
  type: CATEGORY_DATA_FAILURE,
  payload: error,
});

export const selectedCategory = (data) => ({
  type: SELECTED_CATEGORY_DATA_REQUEST,
  payload: data,
});



//bestPair
export const bestPairDataRequest = (data) => ({
  type: BESTPAIR_DATA_REQUEST,
  payload: data,
});

export const bestPairDataSuccess = (response) => ({
  type: BESTPAIR_DATA_SUCCESS,
  payload: response,
});

export const bestPairDataFailure = (error) => ({
  type: BESTPAIR_DATA_FAILURE,
  payload: error,
});

//kitchenStation
export const kitchenStationRequest = (data) => ({
  type: KITCHEN_DATA_REQUEST,
  payload: data,
});

export const kitchenStationSuccess = (response) => {
  return {
    type: KITCHEN_DATA_SUCCESS,
    payload: response,
  };
};

export const kitchenStationFailure = (error) => ({
  type: KITCHEN_DATA_FAILURE,
  payload: error,
});

//subCategory
export const subCategoryDataRequest = (data) => ({
  type: SUBCATEGORY_DATA_REQUEST,
  payload: data,
});

export const subCategoryDataSuccess = (response) => ({
  type: SUBCATEGORY_DATA_SUCCESS,
  payload: response,
});

export const subCategoryDataFailure = (error) => ({
  type: SUBCATEGORY_DATA_FAILURE,
  payload: error,
});

//allergens
export const allergensRequeest = (data) => ({
  type: ALLERGENS_REQUEST,
  payload: data
});

export const allergensSuccess = (response) => ({
  type: ALLERGENS_SUCCESS,
  payload: response
});

export const allergensFailure = (error) => ({
  type: ALLERGENS_FAILURE,
  payload: error
})

//Ingredients
export const ingredientsRequest = (data) => ({
  type: INGREDIENTS_REQUEST,
  payload: data
});

export const ingredientsSuccess = (response) => ({
  type: INGREDIENT_SUCESS,
  payload: response
})

export const ingredientsFailure = (error) => ({
  type: INGREDIENT_FAILURE,
  payload: error
})

//Tax Class
export const taxClassRequest = (data) => ({
  type: TAXCLASS_REQUEST,
  payload: data
});

export const taxClassSuccess = (response) => ({
  type: TAXCLASS_SUCCESS,
  payload: response
})

export const taxClassFailure = (error) => ({
  type: TAXCLASS_FAILURE,
  payload: error
})
//MealType
export const MealTypeRequest = (data) => ({
  type: MEALTYPE_REQUEST,
  payload: data
});

export const MealTypeSuccess = (response) => ({
  type:  MEALTYPE_SUCCESS,
  payload: response
})

export const MealTypeFailure = (error) => ({
  type:  MEALTYPE_FAILURE,
  payload: error
})

//FetchDropDown
export const fetchDropDownRequest = (data) => ({
  type: FETCHDROPDOWN_REQUEST,
  payload: data,
});

export const fetchDropDownSuccess = (response) => ({
  type: FETCHDROPDOWN_SUCCESS,
  payload: response,
});

export const fetchDropDownFailure = (error) => ({
  type: FETCHDROPDOWN_FAILURE,
  payload: error,
});

//delete Dietary
export const deleteDietaryRequest = (data) => ({
  type: DELETEDIETARY_REQUEST,
  payload: data,
});

export const deleteDietarySuccess = (response) => ({
  type: DELETEDIETARY_SUCCESS,
  payload: response,
});

export const deleteDietaryFailure = (error) => ({
  type: DELETEDIETARY_FAILURE,
  payload: error,
});

//delete Cuisine
export const deleteCuisineRequest = (data) => ({
  type: DELETECUISINE_REQUEST,
  payload: data,
});

export const deleteCuisineSuccess = (response) => ({
  type: DELETECUISINE_SUCCESS,
  payload: response,
});

export const deleteCuisineFailure = (error) => ({
  type: DELETECUISINE_FAILURE,
  payload: error,
});

//delete category
export const deleteCategoryRequest = (data) => ({
  type: DELETECATEGORY_REQUEST,
  payload: data,
});

export const deleteCategorySuccess = (response) => ({
  type: DELETECATEGORY_SUCCESS,
  payload: response,
});

export const deleteCategoryFailure = (error) => ({
  type: DELETECATEGORY_FAILURE,
  payload: error,
});

//delete sub-category
export const deleteSubCategoryRequest = (data) => ({
  type: DELETESUBCATEGORY_REQUEST,
  payload: data,
});

export const deleteSubCategorySuccess = (response) => ({
  type: DELETESUBCATEGORY_SUCCESS,
  payload: response,
});

export const deleteSubCategoryFailure = (error) => ({
  type: DELETESUBCATEGORY_FAILURE,
  payload: error,
});
//Add dropdownList
export const addDropDowRequest = (data) => ({
  type: ADDDROPDOWN_REQUEST,
  payload: data,
});

export const addDropDownSuccess = (response) => ({
  type: ADDDROPDOWN_SUCCESS,
  payload: response,
});

export const addDropDownFailure = (error) => ({
  type: ADDDROPDOWN_FAILURE,
  payload: error,
});

//delete dropdown list
export const deleteDropDowRequest = (data) => ({
  type: DELETEDROPDOWN_REQUEST,
  payload: data,
});

export const deleteDropDownSuccess = (response) => ({
  type: DELETEDROPDOWN_SUCCESS,
  payload: response,
});

export const deleteDropDownFailure = (error) => ({
  type: DELETEDROPDOWN_FAILURE,
  payload: error,
});

//Search Function
export const searchForItem = (data) => ({
  type: SEARCH_FORITEM,
  payload: data,
});

export const searchForItemSuccess = (response) => ({
  type: SEARCH_FORITEM_SUCCESS,
  payload: response,
});

export const searchForItemFailure = (error) => ({
  type: SEARCH_FORITEM_FAILURE,
  payload: error,
});

export const uploadImage = (image, id, index) => ({
  type: UPLOAD_IMAGE_IN_PROGRESS,
  payload: { image, id, index },
});

export const uploadImageSuccess = (image, id, index) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: { image, id, index },
});

export const uploadImageFailure = (image, id, index, error) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: { image, id, index, error },
});
export const addMockDataHiddenRequest = (payload) => ({
  type: ADD_MOCK_DATA_HIDDEN_REQUEST,
  payload,
});


export const addMockDataHiddenSuccess = (response) => ({
  type: ADD_MOCK_DATA_HIDDEN_SUCCESS,
  payload: response,
});
export const addMockDataHiddenFailure = (error) => ({
  type: ADD_MOCK_DATA_HIDDEN_FALIURE,
  payload: error,
});
export const resetSuccessMessage = () => ({
  type: RESET_SUCCESS_MESSAGE,
});

export const getItemCodeRequest = (params1, params2) => ({
  type: GET_ITEM_CODE_REQUEST,
  payload: { params1, params2 },
});

export const getItemCodeSuccess = (response) => ({
  type: GET_ITEM_CODE_SUCCESS,
  payload: response,
});

export const getItemCodeFailure = (error) => ({
  type: GET_ITEM_CODE_FAILURE,
  payload: error,
});
export const getItemCodeValiadtion = (error) => ({
  type: GET_ITEM_CODE_VaLIDATION_ERROR,
  payload: error,
});

export const getPopularItemRequest = (locationId) => ({
  type: GET_POPULAR_ITEM_REQUEST,
  payload: locationId, // Assuming only locationId is needed
});

export const getPopularItemSuccess = (response) => ({
  type: GET_POPULAR_ITEM_SUCCESS,
  payload: response,
});

export const getPopularItemFailure = (error) => ({
  type: GET_POPULAR_ITEM_FAILURE,
  payload: error,
});

// *****************SelectedMockData************************************************

export const selectedMockDataRequest = (payload) => ({
  type: SELECTED_MOCKDATA_REQUEST,
  payload,
});

export const selectedMockDataSuccess = (data) => ({
  type: SELECTED_MOCKDATA_SUCCESS,
  payload: data,
});

export const selectedMockDataFailure = (error) => ({
  type: SELECTED_MOCKDATA_FAILURE,
  payload: error,
});

// *********************PartialUpdate*********************************

export const partialUpdateMenuRequest = (data,locationid) => ({
  type: PARTIAL_UPDATE_MENU_REQUEST,
  payload:{data,locationid},
});

export const partialUpdateMenuSuccess = (data) => ({
  type: PARTIAL_UPDATE_MENU_SUCCESS,
  payload:data,
});

export const partialUpdateMenuFailure = (payload) => ({
  type: PARTIAL_UPDATE_MENU_FAILURE,
  payload,
});

export const startImageUpload = (images) => ({
  type: START_IMAGE_UPLOAD,
  payload: images,
});

export const imageUploadSuccess = (itemId) => ({
  type: IMAGE_UPLOAD_SUCCESS,
  payload: itemId,
});

export const imageUploadFailure = (imageName, itemId) => ({
  type: IMAGE_UPLOAD_FAILURE,
  payload: { imageName, itemId },
});

export const storeUploadFailure = (failureArray, statusmsg) => ({
  type: STORE_UPLOAD_FAILURE,
  payload: { failureArray, statusmsg },
});
export const storeUploadSuccess = (statusmsg) => ({
  type: STORE_UPLOAD_SUCCESS,
  payload: statusmsg,
});
export const ImageUploadApiFail = (message) => ({
  type: API_UPLOAD_FAILURE,
  payload: message,
});

export const retryImageUpload = (image) => ({
  type: RETRY_IMAGE_UPLOAD,
  payload: image,
});

export const retryimageUploadSuccess = (itemId) => ({
  type: RETRY_IMAGE_SUCCESS,
  payload: itemId,
});

export const retryimageUploadFailure = (imageName, itemId) => ({
  type: RETRY_IMAGE_FAILURE,
  payload: { imageName, itemId },
});

// {*****************StorewithCatagoryId***************************8}

export const storeDataWithCategory = (data) => ({
  type: STORE_DATA_WITH_CATEGORY,
  payload: data,
});

export const storeDataWithCategorySuccess = (data) => ({
  type: STORE_DATA_WITH_CATEGORY_SUCCESS,
  payload: data,
});

export const storeDataWithCategoryFailure = (error) => ({
  type: STORE_DATA_WITH_CATEGORY_FAILURE,
  payload: { error },
});
export const deleteModifierRequest = (data) => ({
  type: DELETE_MODIFIER_REQUEST,
  payload: data,
});

export const deleteModifierSuccess = (response) => ({
  type: DELETE_MODIFIER_SUCCESS,
  payload: response,
});

export const deleteModifierFailure = (error) => ({
  type: DELETE_MODIFIER_FAILURE,
  payload: error,
});

export const removeDataRequest = () => ({
  type: REMOVE_DATA_REQUEST,
  
});

export const removeDataSuccess = () => ({
  type: REMOVE_DATA_SUCCESS,
});

export const removeDataFailure = () => ({
  type: REMOVE_DATA_FAILURE,
});
export const removeCodeRequest = () => ({
  type: REMOVE_CODE_REQUEST,
  
});

export const removeCodeSuccess = () => ({
  type: REMOVE_CODE_SUCCESS,
});

export const removeCodeFailure = () => ({
  type: REMOVE_CODE_FAILURE,
});

export const updateModifierData = (data) => ({
  type: UPDATE_MODIFIER_REQUEST,
  payload: data
})


//delete image

export const deleteimageRequest = (data) => ({
  type: DELETE_IMAGE_REQUEST,
  payload: data,
});

export const deleteimageSuccess = (response) => ({
  type: DELETE_IMAGE_SUCCESS,
  payload: response,
});

export const deleteimageFailure = (error) => ({
  type: DELETE_IMAGE_FAILURE,
  payload: error,
});


export const selectedColumnsCarryData = (data) => ({
  type: SELECTED_COLUMNS,
  payload: data,
});


// export function triggerFcm(payload) {
//   return typedAction(TRIGGER_FCM, payload)
// }
  



export const triggerFcm = (payload)=>({
  type:TRIGGER_FCM,
  payload:payload

})
export const triggeredFcm = (response) => ({
  type: TRIGGERED_FCM,
  payload: response,
});

export const scheduleFCM = (payload) => ({
  type : SCHEDULE_FCM,
  payload : payload,
})

export const scheduleFCMResponse = (response) => ({
  type : SCHEDULE_FCM_RESPONSE,
  payload: response
})
