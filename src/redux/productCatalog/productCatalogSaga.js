import { put, call, takeLatest, take, takeEvery } from "redux-saga/effects";
import {
  getMenuCategoryRequest,
  getMenuCategorySuccess,
  getMenuCategoryFailed,
  getMenuSubCategoryFailed,
  getMenuSubCategorySuccess,
  getTagClassFailed,
  getTagClassSuccess,
  getIngredientsSuccess,
  getIngredientsFailed,
  addMenuItemSuccess,
  addMenuItemFailed,
  updateMenuItemSuccess,
  updateMenuItemFailed,
  deleteMenuItemSuccess,
  deleteMenuItemFailed,
  getModifierSuccess,
  getModifierFailed,
  getAvailabilitySuccess,
  getAvailabilityFailed,
  updateMenuAttributeSuccess,
  updateMenuAttributeFailed,
  Get_Image,
  Get_Image_Failed,
  dietdatarequest,
  dietdatasuccess,
  dietdatafailure,
  cuisineDataSuccess,
  cuisineDataFailure,
  catogoryDataSuccess,
  catogoryDataFailure,
  subCategoryDataSuccess,
  subCategoryDataFailure,
  bestPairDataSuccess,
  bestPairDataFailure,
  bestPairDataRequest,
  deleteDietarySuccess,
  deleteDietaryFailure,
  fetchDropDownFailure,
  uploadImageSuccess,
  uploadImageFailure,
  getItemCodeSuccess,
  getItemCodeFailure,
  getPopularItemSuccess,
  getPopularItemFailure,
  getMenuFailure,
  addDropDownSuccess,
  addDropDownFailure,
  deleteDropDownSuccess,
  deleteDropDownFailure,
  getMenuSuccess,
  kitchenStationSuccess,
  partialUpdateMenuSuccess,
  partialUpdateMenuFailure,
  ImageUploadApiFail,
  imageUploadFailure,
  imageUploadSuccess,
  storeUploadFailure,
  retryimageUploadSuccess,
  retryimageUploadFailure,
  storeUploadSuccess,
  ingredientsFailure,
  allergensSuccess,
  ingredientsSuccess,
  removeDataRequest,
  taxClassSuccess,
  getItemCodeValiadtion,
  deleteimageSuccess,
  deleteimageFailure,
  triggeredFcm,
  scheduleFCMResponse,
} from "./productCatalogActions";
import {
  getCategory,
  getSubCategory,
  getTagClass,
  getIngredients,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getModifier,
  getAvailability,
  updateMenuItemAttribute,
  getImage,
  getDietarydata,
  getCuisineData,
  getCategorydata,
  getSubCategoryData,
  getBestPairData,
  getSubSectionData,
  getId,
  store,
  getItemCodeRequestApi,
  getPopularItemRequestApi,
  getMenuData,
  getMenuDataApi,
  addSubsectionApi,
  apiUpdateMenu,
  deleteSubSection,
  imageUploadingApi,
  hideMockData,
  deleteImage,
  triggerFcmUrl,
  scheduleTriggerFCM,
} from "../productCatalog/productCataloglogAPI";

import {
  ADD_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_REQUEST,
  GET_AVAILABILITY_REQUEST,
  GET_INGR_REQUEST,
  GET_MENU_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_REQUEST,
  GET_MODIFIER_REQUEST,
  GET_TAG_CLASS_REQUEST,
  UPDATE_MENU_ATTRIBUTE_REQUEST,
  UPDATE_MENU_ITEM_REQUEST,
  Get_ItemImage,
  DIET_DROPDOWN_LIST_REQUEST,
  CUISINE_DATA_REQUEST,
  CATEGORY_DATA_REQUEST,
  SUBCATEGORY_DATA_REQUEST,
  BESTPAIR_DATA_REQUEST,
  FETCHDROPDOWN_REQUEST,
  DELETEDROPDOWN_REQUEST,
  UPLOAD_IMAGE_IN_PROGRESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  ADD_MENU_ITEM_SUCCESS,
  GET_ITEM_CODE_REQUEST,
  GET_POPULAR_ITEM_REQUEST,
  ADDDROPDOWN_REQUEST,
  STORE_MENU_REQUEST,
  PARTIAL_UPDATE_MENU_REQUEST,
  START_IMAGE_UPLOAD,
  RETRY_IMAGE_UPLOAD,
  ADD_MOCK_DATA_HIDDEN_SUCCESS,
  ADD_MOCK_DATA_HIDDEN_REQUEST,
  ADD_MOCK_DATA_HIDDEN_FALIURE,
  PARTIAL_UPDATE_MENU_SUCCESS,
  DELETE_IMAGE_REQUEST,
  UPDATE_TRIGGER_FCM,
  TRIGGER_FCM,
  SCHEDULE_FCM,
  UPDATE_SCHEDULE_TRIGGER_FCM,
} from "./productCatalogConstants";
import { showSuccessToast } from "util/toastUtils";
import {
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from "../../util/toastUtils";
import { useSelector } from "react-redux";

// import { log } from "console";

function* fetchMenuDataSaga(action) {
  try {
    yield put(removeDataRequest());
    const response = yield call(getMenuDataApi, action.payload);
    if (response.status === 200) {
      yield put(getMenuSuccess(response.data));
    } else {
      yield put(getMenuFailure({ message: "Please try again" }));
    }
  } catch (err) {
    yield put(getMenuFailure({ message: "Please try again" }));
  }
}

function* fetchDropdownDataSaga(action) {
  try {
    // Pass the entire action.payload to getSubSectionData
    const response = yield call(getSubSectionData, action.payload);
    if (response.status === 200) {
      switch (action.payload.type) {
        case "DIET":
          yield put(dietdatasuccess(response));
          break;
        case "CUISINES":
          yield put(cuisineDataSuccess(response));
          break;
        case "CATEGORY":
          yield put(catogoryDataSuccess(response));
          break;
        case "SUB_CATEGORY":
          yield put(subCategoryDataSuccess(response));
          break;
        case "BEST_PAIRED_ITEMS":
          yield put(bestPairDataSuccess(response));
          break;
        case "KITCHEN_STATION":
          yield put(kitchenStationSuccess(response.data));
          break;
        case "INGREDIENTS":
          yield put(ingredientsSuccess(response));
          break;
        case "ALLERGENS":
          yield put(allergensSuccess(response));
          break;
        case "TAX":
          yield put(taxClassSuccess(response))
          break;
        default:
          throw new Error("Invalid type");
      }
    } else {
      yield put(fetchDropDownFailure({ message: "Please try again" }));
    }
  } catch (err) {
    yield put(fetchDropDownFailure({ message: "Please try again" }));
  }
}

function* addSubsection(action) {
  // const { dropDownType } = action.payload;
  try {
    const response = yield call(addSubsectionApi, action.payload);
    const viewdata = {
      locationId: action.payload.locationId,
      type: action.payload.type,
      parentId: action.payload.type === 'SUB_CATEGORY' ? action.payload.parentId : "",
    };
    
    if (response.status === 200) {
      yield put({
        type: FETCHDROPDOWN_REQUEST,
        payload: viewdata,
      });

      yield put(addDropDownSuccess("success"));
    } else {
      yield put(addDropDownFailure({ message: "Please try again" }));
      if (
        response.data.message &&
        response.data.message.includes("already exist")
      ) {
        showErrorToast(response.data.message);
        yield put(addDropDownFailure({ message: "Please try again" }));
      }
    }
  } catch (err) {
    yield put(addDropDownFailure({ message: "Please try again" }));
  }
}

//Delete subSection
function* deleteSubSectionSaga(action) {
  try {
    const deteleData = {
      id: action.payload.id,
      type: action.payload.type,
    };

    const parenId = action.payload?.parentId;
    const response = yield call(deleteSubSection, deteleData);

    const viewdata = {
      locationId: action.payload.locationid,
      type: action.payload.type,
      parentId: action.payload.type === 'SUB_CATEGORY' ? parenId : "",
    };


    if (response.status === 200) {
      yield put({
        type: FETCHDROPDOWN_REQUEST,
        payload: viewdata,
      });

      yield put(deleteDropDownSuccess(response));
    } else {
      yield put(deleteDropDownFailure("failed"));
    }
  } catch (err) {
    yield put(deleteDropDownFailure("failed"));
  }
}

function* getTagClassSaga(action) {
  try {
    const response = yield call(getTagClass, action.payload);
    if (response.status === 200) {
      yield put(getTagClassSuccess(response.data));
    } else {
      yield put(getTagClassFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(getTagClassFailed({ message: "please Try Again" }));
  }
}
function* deleteimage(action) {
  try {
    const response = yield call(deleteImage, action.payload);
    if (response.status === 200) {
      yield put(deleteimageSuccess(response.data));
    } else {
      yield put(deleteimageFailure({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(deleteimageFailure({ message: "please Try Again" }));
  }
}
function* getModifierSaga(action) {
  try {
    const response = yield call(getModifier, action.payload);

    if (response.status === 200) {
      if (Array.isArray(response.data) && response.data.length === 0) {
        yield put(getModifierFailed());
      } else {
        yield put(getModifierSuccess(response.data));
      }
    } else {
      yield put(getModifierFailed());
    }
  } catch (err) {
    yield put(getModifierFailed());
  }
}

function* getIngredientsSaga(action) {
  try {
    const response = yield call(getIngredients, action.payload);
    if (response.status === 200) {
      yield put(getIngredientsSuccess(response.data));
      if (
        action.payload?.sagaCallBack != null &&
        typeof action.payload?.sagaCallBack === "function"
      ) {
        action.payload.sagaCallBack(response.data);
      }
    } else {
      yield put(getIngredientsFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(getIngredientsFailed({ message: "please Try Again" }));
  }
}

function* getAvailabilitySaga(action) {
  try {
    const response = yield call(getAvailability, action.payload);
    if (response.status === 200) {
      yield put(getAvailabilitySuccess(response.data));
    } else {
      yield put(getAvailabilityFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(getAvailabilityFailed({ message: "please Try Again" }));
  }
}

function* addMenuItemSaga(action) {
  try {
    const addApi = yield call(addMenuItem, action.payload);
    const addApiresponse = addApi.data;
    if (addApi.status === 200) {
      showSuccessToast("Item added successfully");
      yield put(addMenuItemSuccess(addApiresponse));
    } else {
      showErrorToast(addApiresponse.message);
      yield put(addMenuItemFailed({ message: "Please Try Again" }));
    }
  } catch (err) {
    yield put(addMenuItemFailed({ message: "Please Try Again" }));
  }
}

// function* uploadImageSaga(action) {
//   const { image, addApiresponse, index } = action.payload;
//   try {
//     const formData = new FormData();
//     formData.append("id", addApiresponse);
//     formData.append("formData", image);

//     const response = yield call(store, formData);
//     if (response.data.httpStatus === 200) {
//       yield put(uploadImageSuccess(image, response.data.message, index));
//       console.log(`Image upload succeeded for index ${index}`);
//     } else {
//       const error = "Image upload failed";
//       yield put(uploadImageFailure(image, addApiresponse, index, error));
//     }
//   } catch (error) {
//     yield put(uploadImageFailure(image, addApiresponse, index, error.message));
//   }
// }

const convertImageToBinaryString = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(new Error("Image conversion failed"));
    };
    reader.readAsDataURL(imageFile);
  });
};

function* imageUploadSaga (action) {
  const images = action.payload?.imageUrls;
  

  let itemId = action.payload.itemId;
  const failureArray = [];

  try {
    const firstImage = images[0];    
    
    const response = yield call(uploadImageApi, firstImage, itemId);
    if (response.data && response.data.itemId) {
      // console.log();
      
      itemId = response.data.itemId;
    }

    // yield put(imageUploadSuccess(itemId));
  } catch (error) {
    failureArray.push({
      file: images[0].file,
      itemId: "",
    });
    yield put(imageUploadFailure(images[0].name, ""));
    return;
  }

  for (let i = 1; i < images.length; i++) {
    const image = images[i];

    try {
      const response = yield call(uploadImageApi, image, itemId);

      if(i===images.length-1 && response.status===200)
      {
        yield put(imageUploadSuccess(itemId));
      }

      
    } catch (error) {
      failureArray.push({
        file: image.file,
        itemId: itemId || "",
      });
      yield put(imageUploadFailure(image.name, itemId));
    }
  }

  // If there are failures, dispatch a failure action for all failed uploads
  if (failureArray.length > 0) {
    yield put(storeUploadFailure(failureArray, "failed"));
  } else {
    yield put(storeUploadSuccess(itemId));
  }
}

export const uploadImageApi = async (image, itemId) => {
  const formData = new FormData();
  // const binaryString = await convertImageToBinaryString(image.file);
  // console.log("blog image",binaryString);

  formData.append("image", image.file);
  formData.append("itemId", itemId);
  return await imageUploadingApi(formData);
};

function* retryImage(action) {
  const image = action.payload;
  let itemId = null;
  try {
    const response = yield call(uploadImageApi, image, itemId);

    if (response.itemId) {
      itemId = response.itemId;
    }

    yield put(retryimageUploadSuccess(itemId));
  } catch (error) {
    yield put(retryimageUploadFailure(image.file.name, itemId));
  }
}

function* updateMenuItemSaga(action) {
  try {
    const response = yield call(updateMenuItem, action.payload);
    if (response.status === 200) {
      showSuccessToast("Menu updated successfully");
      yield put(updateMenuItemSuccess(response.data));
      yield put(removeDataRequest());
    } else {
      showErrorToast(response.data.message);
      yield put(updateMenuItemFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(updateMenuItemFailed({ message: "please Try Again" }));
  }
}

function* updateMenuAttributeSaga(action) {
  try {
    const response = yield call(updateMenuItemAttribute, action.payload);
    if (response.status === 200) {
      showSuccessToast(response.message);
      yield put(updateMenuAttributeSuccess(response.data));
    } else {
      yield put(updateMenuAttributeFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(updateMenuAttributeFailed({ message: "please Try Again" }));
  }
}

function* deleteMenuItemSaga(action) {
  try {
    const response = yield call(deleteMenuItem, action.payload.itemId);
    if (response.status === 200) {
      showSuccessToast(response?.data?.message);
      yield put(
        deleteMenuItemSuccess({
          message: response.data,
          itemId: action.payload.itemId,
        })
      );
      yield put(removeDataRequest());
    } else {
      yield put(deleteMenuItemFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(deleteMenuItemFailed({ message: "please Try Again" }));
  }
}

function* GetImageSaga(action) {
  try {
    const response = yield call(getImage);
    if (response.status === 200) {
      yield put(response.data);
    } else {
      yield put(Get_Image_Failed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(Get_Image_Failed({ message: "please Try Again" }));
  }
}

function* getItemCodeSaga(action) {
  try {
    const { params1, params2 } = action.payload;
    const response = yield call(getItemCodeRequestApi, params1, params2);
   


    if(response.data.httpStatus===409){

      yield put(getItemCodeValiadtion(response.data.message));

    }

    else if(response.data.httpStatus===200){  
      yield put(getItemCodeSuccess(response.data.message));
    }
    else{
      yield put(getItemCodeFailure("Item code already in use."));
    }
    
  } catch (error) {
    yield put(getItemCodeFailure(error.message));
  }
}

function* getPopularItemSaga(action) {
  try {
    const locationId = action.payload;
    const response = yield call(getPopularItemRequestApi, locationId);
    yield put(getPopularItemSuccess(response));
  } catch (error) {
    yield put(getPopularItemFailure(error.message));
  }
}

function* partialUpdateMenuSaga(action) {
  try {
    const updatedMenu = yield call(apiUpdateMenu, action.payload.data);
    if (updatedMenu.status === 200) {
      showSuccessToast(updatedMenu.data.message);
      yield put(partialUpdateMenuSuccess(updatedMenu.data.message));

      yield put({
        type: STORE_MENU_REQUEST,
        payload: action.payload.locationid,
      });
    }
    else{
      yield put(partialUpdateMenuFailure(true));
      showErrorToast(updatedMenu.data.message);

    }
  } catch (error) {
    yield put(partialUpdateMenuFailure(error.message));
  }
}

function* addMockDataHiddenSaga(action) {
  try {
    const { hidePayload, location } = action.payload;

    const response = yield call(hideMockData, hidePayload);
    if (response.status === 200) {
      showSuccessToast(response.data.message);
      yield put({
        type: ADD_MOCK_DATA_HIDDEN_SUCCESS,
        payload: response.data.message,
      });
      yield put({ type: STORE_MENU_REQUEST, payload: location });
    } else {
      showErrorToast(response.data.message);
      yield put({
        type: ADD_MOCK_DATA_HIDDEN_FALIURE,
        payload: response.data.message,
      });
    }
  } catch (error) {
    yield put({ type: ADD_MOCK_DATA_HIDDEN_FALIURE, payload: error.message });
  }
}

function* triggerFcmSaga(action) {
  try {
    yield put({ type: UPDATE_TRIGGER_FCM, payload: true })
    
    const response = yield call(triggerFcmUrl,action.payload);
    if (response) {
      yield put(
        triggeredFcm({
          message: response.data,
          
        })
      );
     
    }
    yield put({ type: UPDATE_TRIGGER_FCM ,payload:false})
   
  } catch (err) {
    yield put({ type: UPDATE_TRIGGER_FCM, payload: false })
  }
}

function* scheduleFCMSaga(action) {
  try {
    yield put({ type: UPDATE_SCHEDULE_TRIGGER_FCM, payload: true })
    const response = yield call(scheduleTriggerFCM,action.payload);
    if (response) {
      yield put(
        scheduleFCMResponse({
          message: response.data,
        })
      );
    }
    yield put({ type: UPDATE_SCHEDULE_TRIGGER_FCM ,payload:false})
  } catch (err) {
    yield put({ type: UPDATE_SCHEDULE_TRIGGER_FCM, payload: false })
  }
}

export default function* productCatalog() {
  // yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);
  yield takeLatest(STORE_MENU_REQUEST, fetchMenuDataSaga);
  

  yield takeEvery(FETCHDROPDOWN_REQUEST, fetchDropdownDataSaga);
  yield takeLatest(DELETEDROPDOWN_REQUEST, deleteSubSectionSaga);
  yield takeLatest(ADDDROPDOWN_REQUEST, addSubsection);

  // yield takeLatest(GET_MENU_SUB_CATEGORY_REQUEST, getSubCategorySaga);
  yield takeLatest(GET_TAG_CLASS_REQUEST, getTagClassSaga);
  yield takeLatest(GET_INGR_REQUEST, getIngredientsSaga);
  yield takeLatest(ADD_MENU_ITEM_REQUEST, addMenuItemSaga);
  yield takeLatest(RETRY_IMAGE_UPLOAD, retryImage);

  // yield takeLatest(UPLOAD_IMAGE_IN_PROGRESS, uploadImageSaga);
  yield takeLatest(START_IMAGE_UPLOAD, imageUploadSaga);
  yield takeLatest(UPDATE_MENU_ITEM_REQUEST, updateMenuItemSaga);
  yield takeLatest(DELETE_MENU_ITEM_REQUEST, deleteMenuItemSaga);
  yield takeLatest(GET_MODIFIER_REQUEST, getModifierSaga);
  yield takeLatest(GET_AVAILABILITY_REQUEST, getAvailabilitySaga);
  yield takeLatest(UPDATE_MENU_ATTRIBUTE_REQUEST, updateMenuAttributeSaga);
  yield takeLatest(Get_ItemImage, GetImageSaga);
  yield takeLatest(GET_ITEM_CODE_REQUEST, getItemCodeSaga);

  yield takeLatest(GET_POPULAR_ITEM_REQUEST, getPopularItemSaga);

  yield takeLatest(PARTIAL_UPDATE_MENU_REQUEST, partialUpdateMenuSaga);
  yield takeLatest(ADD_MOCK_DATA_HIDDEN_REQUEST, addMockDataHiddenSaga);
  yield takeLatest(DELETE_IMAGE_REQUEST, deleteimage);
  yield takeLatest(TRIGGER_FCM,triggerFcmSaga)
  yield takeLatest(SCHEDULE_FCM, scheduleFCMSaga)
}
