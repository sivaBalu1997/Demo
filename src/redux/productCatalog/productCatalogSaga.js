import { put, call, takeLatest, take } from "redux-saga/effects";
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
  ImageUploadApiFail,
  imageUploadFailure,
  imageUploadSuccess,
  storeUploadFailure,
  retryimageUploadSuccess,
  retryimageUploadFailure


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
  deleteSubSection,
  imageUploadingApi
  
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
  START_IMAGE_UPLOAD,
  RETRY_IMAGE_UPLOAD,
} from "./productCatalogConstants";
// import { log } from "console";
 

function* fetchMenuDataSaga(action) {
  try{
    const response = yield call(getMenuDataApi, action.payload)
    if(response.status === 200){
      yield put(getMenuSuccess(response.data))
    }else {
      yield put(getMenuFailure({message : 'Please try again'}))
    }
  } catch (err){
    yield put(getMenuFailure({message : 'Please try again'}))
  }
}

function* fetchDropdownDataSaga(action) {  
  try {
    // Pass the entire action.payload to getSubSectionData
    const response = yield call(getSubSectionData, action.payload);

    if (response) {
      switch (action.payload.type) {
        case 'DIET':
          yield put(dietdatasuccess(response));         
          break;
        case 'CUISINES':
          yield put(cuisineDataSuccess(response));
          break;
        case 'CATEGORY':
          yield put(catogoryDataSuccess(response));
          break;
        case 'SUB_CATEGORY':
          yield put(subCategoryDataSuccess(response));
          break;
        case 'BEST_PAIRED_ITEMS':
          yield put(bestPairDataSuccess(response));
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
  
    if (response.status === 200) {
      switch (action.payload.type) {
        case 'dietary':         
          yield put({ type: FETCHDROPDOWN_REQUEST, payload:action.payload.type });
          break;
        case 'cuisine':
          yield put({ type: FETCHDROPDOWN_REQUEST, payload:action.payload.type });
          break;
        case 'category':
          yield put({ type: FETCHDROPDOWN_REQUEST, payload:action.payload.type });
          break;
        case 'subCategory':
          yield put({ type: FETCHDROPDOWN_REQUEST, payload:action.payload.type });
          break;
        case 'bestPair':
          yield put({ type: FETCHDROPDOWN_REQUEST, payload:action.payload.type });
          break;
        default:
          throw new Error('Invalid type');
      }
    } else {
      yield put(addDropDownFailure({ message: 'Please try again' }));
    }
  } catch (err) {
    yield put(addDropDownFailure({ message: 'Please try again' }));
  }
}
 



//Delete subSection
function* deleteSubSectionSaga(action) {
  try {
  
    console.log("deleted data",action.payload)
    const response = yield call(deleteSubSection, action.payload);
  
    if (response) {
      yield put(deleteDropDownSuccess(response)) // add switch case
    } else {
      console.log("delete failed");
      
      yield put(deleteDropDownFailure("failed"))
    }
  } catch (err) {
    yield put(deleteDropDownFailure("failed"))
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


function* imageUploadSaga(action) {
  const images = action.payload;  
  let itemId = null;  
  const failureArray = [];
  // console.log("images",images)

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    // console.log("images one by one",image)

    try {
      const response = yield call(uploadImageApi, image, itemId);
      
      if (i === 0 && response.itemId) {
        itemId = response.itemId;
      }

      yield put(imageUploadSuccess(itemId));
      
    } catch (error) {
      failureArray.push({
        file: image.file,
        itemId: itemId || 'null',  
      });

     
      console.log("failureArray",failureArray)
      yield put(imageUploadFailure(image.name, itemId));
    }
  }
  if (failureArray.length > 0) {
    console.log("error");
    
    yield put(storeUploadFailure(failureArray));
  }

}
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
function convertToBase64(file) {
  const reader = new FileReader();
  
  // This will block until the file is read
  reader.readAsDataURL(file);
  let base64String = '';

  reader.onload = () => {
    base64String = reader.result;  // Capture the result
  };

  // Wait for the FileReader to load (blocking)
  while (!base64String) {
    // Busy-waiting until the base64String is set
  }

  return base64String;  // Return the Base64 string
}
export const uploadImageApi = async (image, itemId) => {
  const formData = new FormData();
  const binaryString = await convertImageToBinaryString(image.file)
  // console.log("blog image",binaryString);
  
  formData.append('image', image.file);
  formData.append('itemId', itemId);
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

function* getItemCodeSaga(action) {
  try {
    const { params1, params2 } = action.payload; // Destructure the payload
    const response = yield call(getItemCodeRequestApi, params1, params2);
    yield put(getItemCodeSuccess(response));
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

export default function* productCatalog() {
  // yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);
  yield takeLatest(STORE_MENU_REQUEST, fetchMenuDataSaga);

  yield takeLatest(FETCHDROPDOWN_REQUEST, fetchDropdownDataSaga);
  yield takeLatest(DELETEDROPDOWN_REQUEST, deleteSubSectionSaga)
  yield takeLatest(ADDDROPDOWN_REQUEST, addSubsection)

 
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
}
