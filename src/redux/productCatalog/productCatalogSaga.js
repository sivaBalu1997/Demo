import { put, call, takeLatest ,take} from "redux-saga/effects";
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
  uploadImageSuccess,
  uploadImageFailure,
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
  // getDietarydata,
  getId,
  store,
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
  UPLOAD_IMAGE_IN_PROGRESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  ADD_MENU_ITEM_SUCCESS,
} from "./productCatalogConstants";

// function* getdietarySaga(action) {
//   try {
//     const response = yield call(getDietarydata, action.payload);
//     if (response) {
//       console.log("response from sagas", response);
//       yield put(dietdatasuccess(response));
//     } else {
//       yield put(dietdatafailure({ message: "please Try Again" }));
//     }
//   } catch (err) {
//     yield put(dietdatafailure({ message: "please Try Again" }));
//   }
// }

function* getCategorySaga(action) {
  try {
    const response = yield call(getCategory, action.payload);
    if (response.status === 200) {
      yield put(getMenuCategorySuccess(response.data));
    } else {
      yield put(getMenuCategoryFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(getMenuCategoryFailed({ message: "please Try Again" }));
  }
}

function* getSubCategorySaga(action) {
  try {
    const response = yield call(getSubCategory, action.payload);
    if (response.status === 200) {
      yield put(getMenuSubCategorySuccess(response.data));
    } else {
      yield put(getMenuSubCategoryFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(getMenuSubCategoryFailed({ message: "please Try Again" }));
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

function* getModifierSaga(action) {
  try {
    const response = yield call(getModifier, action.payload);
    if (response.status === 200) {
      yield put(getModifierSuccess(response.data));
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
    const addApi = yield call(getId);
    const addApiresponse = addApi.data;

    if (addApi.status === 200) {
      yield put(addMenuItemSuccess(addApiresponse));

      const images = action.payload[0].imageUrls.map((image) => image.file);
      console.log("Images to upload:", images);


      for (const [index, image] of images.entries()) {
        yield put({
          type: UPLOAD_IMAGE_IN_PROGRESS,
          payload: { image, addApiresponse, index }, 
        });

     
        yield take([UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE]);
      }
    } else {
      yield put(addMenuItemFailed({ message: "Please Try Again" }));
    }
  } catch (err) {
    yield put(addMenuItemFailed({ message: "Please Try Again" }));
  }
}


function* uploadImageSaga(action) {
  const { image, addApiresponse, index } = action.payload;
  
  try {
    const formData = new FormData();
    formData.append("id", addApiresponse); 
    formData.append("formData", image); 
    
    console.log(`Uploading image at index ${index}:`, image.name);
    

    const response = yield call(store, formData);
    
  
   
    console.log(`Response for image at index ${index}:`, response);
    
    if (response.data.httpStatus=== 200) {
      yield put(uploadImageSuccess(image,response.data.message, index));
      console.log(`Image upload succeeded for index ${index}`);
    } else {
      // Failure case: Dispatch failure action for the specific image
      const error = "Image upload failed";
      yield put(uploadImageFailure(image, response.data.message, index, error));
      console.log(`Image upload failed for index ${index}`);
    }
  } catch (error) {
    // Error handling: Dispatch failure action with error message for the specific image
    yield put(uploadImageFailure(image, "failure", index, error.message));
    console.log(`Image upload error for index ${index}:`, error.message);
  }
}

function* updateMenuItemSaga(action) {
  try {
    const response = yield call(updateMenuItem, action.payload);
    if (response.status === 200) {
      yield put(updateMenuItemSuccess(response.data));
    } else {
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
    const response = yield call(deleteMenuItem, action.payload);
    if (response.status === 200) {
      yield put(deleteMenuItemSuccess(response.data));
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

export default function* productCatalog() {
  yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);

  // yield takeLatest(DIET_DROPDOWN_LIST_REQUEST, getdietarySaga);

  yield takeLatest(GET_MENU_SUB_CATEGORY_REQUEST, getSubCategorySaga);
  yield takeLatest(GET_TAG_CLASS_REQUEST, getTagClassSaga);
  yield takeLatest(GET_INGR_REQUEST, getIngredientsSaga);
  yield takeLatest(ADD_MENU_ITEM_REQUEST, addMenuItemSaga);
  yield takeLatest(UPLOAD_IMAGE_IN_PROGRESS, uploadImageSaga);
  yield takeLatest(UPDATE_MENU_ITEM_REQUEST, updateMenuItemSaga);
  yield takeLatest(DELETE_MENU_ITEM_REQUEST, deleteMenuItemSaga);
  yield takeLatest(GET_MODIFIER_REQUEST, getModifierSaga);
  yield takeLatest(GET_AVAILABILITY_REQUEST, getAvailabilitySaga);
  yield takeLatest(UPDATE_MENU_ATTRIBUTE_REQUEST, updateMenuAttributeSaga);
  yield takeLatest(Get_ItemImage, GetImageSaga);
}
