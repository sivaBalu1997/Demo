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
} from "./productCatalogConstants";
// import { log } from "console";

function* fetchMenuDataSaga(action) {
  try {
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

    if (response) {
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
    console.log("action.payload.type", action.payload.type);

    const viewdata = {
      locationId: action.payload.locationId,
      type: action.payload.type,
      parentId: action.payload.parentId,
    };
    if (response.status === 200) {
      yield put({
        type: FETCHDROPDOWN_REQUEST,
        payload: viewdata,
      });
      yield put(addDropDownSuccess("success"));
      // switch (action.payload.type) {
      //   case "DIET":
      //     yield put({
      //       type: FETCHDROPDOWN_REQUEST,
      //       payload: viewdata
      //     });
      //     yield put(addDropDownSuccess("success"));

      //     break;
      //   case "CUISINES":
      //     yield put({
      //       type: FETCHDROPDOWN_REQUEST,
      //       payload:viewdata,
      //     });
      //     break;
      //   case "CATEGORY":
      //     yield put({
      //       type: FETCHDROPDOWN_REQUEST,
      //       payload: viewdata,
      //     });
      //     break;
      //   case "SUB_CATEGORY":
      //     yield put({
      //       type: FETCHDROPDOWN_REQUEST,
      //       payload: viewdata,
      //     });
      //     break;
      //   case "BEST_PAIRED_ITEMS":
      //     yield put({
      //       type: FETCHDROPDOWN_REQUEST,
      //       payload: viewdata,
      //     });
      //     break;
      //   default:
      //     throw new Error("Invalid type");
      // }
    } else {
      yield put(addDropDownFailure({ message: "Please try again" }));
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
    console.log("deteleData", deteleData);

    const response = yield call(deleteSubSection, deteleData);
    console.log("delete call ", action);

    const viewdata = {
      locationId: action.payload.locationid,
      type: action.payload.type,
      parentId: "",
    };
    if (response.status === 200) {
      yield put({
        type: FETCHDROPDOWN_REQUEST,
        payload: viewdata,
      });

      yield put(deleteDropDownSuccess(response)); // add switch case
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
    const addApi = yield call(addMenuItem, action.payload);
    const addApiresponse = addApi.data;

    if (addApi.status === 200) {
      yield put(addMenuItemSuccess(addApiresponse));
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
function* imageUploadSaga(action) {
  const images = action.payload;
  let itemId = "";
  const failureArray = [];

  try {
    const firstImage = images[0];

    const response = yield call(uploadImageApi, firstImage, itemId);

    // console.log("First image uploaded, item ID:", response);
    console.log("response", response);

    if (response.data && response.data.itemId) {
      itemId = response.data.itemId;
    }

    // Dispatch success action with the updated itemId
    yield put(imageUploadSuccess(itemId));
  } catch (error) {
    // Handle failure for the first image
    failureArray.push({
      file: images[0].file,
      itemId: "", // No itemId available for the first image
    });
    console.log("Failed to upload the first image", failureArray);
    yield put(imageUploadFailure(images[0].name, ""));
    return;
  }

  // If the first image was successful, upload the remaining images with the itemId
  for (let i = 1; i < images.length; i++) {
    const image = images[i];

    try {
      // Call the API to upload the remaining images with the updated itemId
      const response = yield call(uploadImageApi, image, itemId);

      // console.log("Image uploaded, item ID:", response);

      // Dispatch success action
      yield put(imageUploadSuccess(itemId));
    } catch (error) {
      // Handle failure for remaining images
      failureArray.push({
        file: image.file,
        itemId: itemId || "", // Use the itemId from the first image's response
      });

      // console.log("Failed upload, failureArray:", failureArray);
      yield put(imageUploadFailure(image.name, itemId));
    }
  }

  // If there are failures, dispatch a failure action for all failed uploads
  if (failureArray.length > 0) {
    console.log("Error uploading some images");
    yield put(storeUploadFailure(failureArray, "failed"));
  } else {
    console.log("itemId", itemId);

    yield put(storeUploadSuccess(itemId));
  }
}

export const uploadImageApi = async (image, itemId) => {
  const formData = new FormData();
  const binaryString = await convertImageToBinaryString(image.file);
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
    const response = yield call(deleteMenuItem, action.payload.itemId);
    if (response.status === 200) {
      yield put(deleteMenuItemSuccess(response.data));
      yield put({
        type: STORE_MENU_REQUEST,
        payload: action.payload.locationid
      });
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

function* partialUpdateMenuSaga(action) {
  try {
    const updatedMenu = yield call(apiUpdateMenu, action.payload);
    yield put(partialUpdateMenuSuccess(updatedMenu));
  } catch (error) {
    yield put(partialUpdateMenuFailure(error.message));
  }
}

function* addMockDataHiddenSaga(action) {
  try {
    const data = yield call(hideMockData, action.payload); 
    yield put({ type: ADD_MOCK_DATA_HIDDEN_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: ADD_MOCK_DATA_HIDDEN_FALIURE, payload: error.message });
  }
}

export default function* productCatalog() {
  // yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);
  yield takeLatest(STORE_MENU_REQUEST, fetchMenuDataSaga);

  yield takeLatest(FETCHDROPDOWN_REQUEST, fetchDropdownDataSaga);
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
}

// {
//   "id": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//   "branchName": "A2B Veg Restaurant,chicago",
//   "aboutUs": null,
//   "address": "28244, Diehl Rd Warrenville, Illinois, 60555",
//   "addressline2": null,
//   "state": null,
//   "pincode": null,
//   "locationSlug": "devtest-chicago",
//   "open": 1,
//   "city": "Chicago",
//   "country": "US",
//   "branch": [
//       {
//           "id": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "locationName": "A2B Veg Restaurant,chicago",
//           "locationSlug": "devtest-chicago",
//           "rating": 1,
//           "latitude": 41.8037477616254,
//           "longitude": -88.16822616151867,
//           "cost": "30-2",
//           "orderTypes": [
//               {
//                   "id": "df8eb2dc-6789-4b2a-bdc9-46df7c19add9",
//                   "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//                   "typeName": "Delivery",
//                   "typeGroup": "S",
//                   "codLimit": null,
//                   "isEnabled": 1,
//                   "minOrderAmount": 0,
//                   "orderTax": null
//               },
//               {
//                   "id": "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
//                   "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//                   "typeName": "DineIn",
//                   "typeGroup": "D",
//                   "codLimit": null,
//                   "isEnabled": 1,
//                   "minOrderAmount": 0,
//                   "orderTax": null
//               },
//               {
//                   "id": "b1eddc4e-710e-437c-871c-609b84af43c1",
//                   "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//                   "typeName": "GloriaFood",
//                   "typeGroup": "T",
//                   "codLimit": null,
//                   "isEnabled": 0,
//                   "minOrderAmount": 0,
//                   "orderTax": null
//               },
//               {
//                   "id": "1b53fad0-ce9c-4736-8710-85377d19d938",
//                   "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//                   "typeName": "Instore",
//                   "typeGroup": "I",
//                   "codLimit": null,
//                   "isEnabled": 1,
//                   "minOrderAmount": 0,
//                   "orderTax": null
//               },
//               {
//                   "id": "b1eddc4e-710e-437c-871c-609b84af43cd",
//                   "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//                   "typeName": "Pickup",
//                   "typeGroup": "P",
//                   "codLimit": null,
//                   "isEnabled": 1,
//                   "minOrderAmount": 0,
//                   "orderTax": null
//               }
//           ],
//           "cusine": [
//               "Authentic Indian Vegetarian"
//           ],
//           "isOpen": 1,
//           "serviceDisable": {
//               "sms": 1,
//               "onlineOrder": null,
//               "onlineCheckIn": 0,
//               "email": 0,
//               "whatsappSms": 0,
//               "checkInWhatsapp": 0
//           },
//           "media": [
//               {
//                   "id": "5acfc0a1-4c44-4851-8388-b7ca2adaf6cc",
//                   "entityType": "LOGO",
//                   "mimeType": "img/png",
//                   "entityId": "d99bef75-92bc-478d-9b5a-77522b0d25c0"
//               }
//           ]
//       }
//   ],

//   "orderTypes": [
//       {
//           "id": "df8eb2dc-6789-4b2a-bdc9-46df7c19add9",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "typeName": "Delivery",
//           "typeGroup": "S",
//           "codLimit": null,
//           "isEnabled": 1,
//           "minOrderAmount": 0,
//           "orderTax": null
//       },
//       {
//           "id": "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "typeName": "DineIn",
//           "typeGroup": "D",
//           "codLimit": null,
//           "isEnabled": 1,
//           "minOrderAmount": 0,
//           "orderTax": null
//       },
//       {
//           "id": "1b53fad0-ce9c-4736-8710-85377d19d938",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "typeName": "Instore",
//           "typeGroup": "I",
//           "codLimit": null,
//           "isEnabled": 1,
//           "minOrderAmount": 0,
//           "orderTax": null
//       },
//       {
//           "id": "b1eddc4e-710e-437c-871c-609b84af43cd",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "typeName": "Pickup",
//           "typeGroup": "P",
//           "codLimit": null,
//           "isEnabled": 1,
//           "minOrderAmount": 0,
//           "orderTax": null
//       }
//   ],
//   "statusIds": [
//       "11",
//       "19",
//       "25",
//       "11",
//       "11",
//       "19",
//       "25",
//       "11"
//   ],
//   "thirdParties": [
//       "Grubhub",
//       "Doordash",
//       "Uber eats",
//       "Seamless",
//       "Swiggy",
//       "Zomato",
//       "GloriaFood"
//   ],
//   "cuisineDevices": {
//       "48445e41-be1e-404f-bad9-c5068eb0f1f4": [
//           "1d85ff6d-0b8c-4e1f-a851-6a70eced87a6",
//           "469e508e-e5b2-43b0-b478-16fcd115c58f"
//       ]
//   },
//   "itemSpecialName": [
//       {
//           "id": "119cd4b7-f44a-45d6-8c21-c8d4559d52ab",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T10:54:11.000+00:00",
//           "modifiedTime": "2023-11-02T11:41:12.000+00:00"
//       },
//       {
//           "id": "12b453c3-1d34-4472-83b4-0479933db3d5",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T11:10:42.000+00:00",
//           "modifiedTime": "2023-10-25T11:10:54.000+00:00"
//       },
//       {
//           "id": "195a16fa-d290-4835-b898-5008263d4b10",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-09-30T06:13:37.000+00:00",
//           "modifiedTime": "2023-10-16T06:20:45.000+00:00"
//       },
//       {
//           "id": "2c007d72-9fb9-41e0-9a4d-4a90775f226d",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "vadai",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-12-15T06:11:37.000+00:00",
//           "modifiedTime": "2023-12-15T06:11:37.000+00:00"
//       },
//       {
//           "id": "3e3eaf83-a8d1-4039-9fa4-73301d5f3410",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-09-27T04:49:17.000+00:00",
//           "modifiedTime": "2023-10-25T09:51:21.000+00:00"
//       },
//       {
//           "id": "3f086639-38dc-4dad-ab0e-faedffa8796b",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Today's special ",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2024-04-25T06:06:30.000+00:00",
//           "modifiedTime": "2024-04-25T06:06:30.000+00:00"
//       },
//       {
//           "id": "410a8cb3-85ec-419e-bb3c-8cea68f68071",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T09:42:06.000+00:00",
//           "modifiedTime": "2023-10-25T10:26:14.000+00:00"
//       },
//       {
//           "id": "4e7d0025-aa10-41a5-bed5-d51df250d350",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Diwali sweet",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-09-30T06:08:09.000+00:00",
//           "modifiedTime": "2023-09-30T06:08:09.000+00:00"
//       },
//       {
//           "id": "5ded64e9-c8e3-44b0-9c9e-1696030a0491",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Vadai",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-12-05T07:22:31.000+00:00",
//           "modifiedTime": "2023-12-05T07:22:31.000+00:00"
//       },
//       {
//           "id": "7066b829-6b0d-486b-a646-0e434c74e9fc",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Special",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2024-04-25T03:50:52.000+00:00",
//           "modifiedTime": "2024-04-25T03:50:52.000+00:00"
//       },
//       {
//           "id": "74bd821e-14a8-4c21-99b5-31c9bcff6be3",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-16T06:33:51.000+00:00",
//           "modifiedTime": "2023-10-25T09:40:06.000+00:00"
//       },
//       {
//           "id": "7b6ac8e9-ee53-446d-b139-db57f774d4df",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-16T06:34:51.000+00:00",
//           "modifiedTime": "2023-10-25T09:43:36.000+00:00"
//       },
//       {
//           "id": "7b96b8e3-3494-424b-aa23-e192ea75adbe",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Special ",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-11-14T11:51:11.000+00:00",
//           "modifiedTime": "2023-11-14T11:51:11.000+00:00"
//       },
//       {
//           "id": "8241f006-b091-4329-b601-f6822bb11834",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Hhh",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-12-15T06:09:17.000+00:00",
//           "modifiedTime": "2023-12-15T06:09:17.000+00:00"
//       },
//       {
//           "id": "a4e78bda-393c-457e-a39f-00a0e1e74e1e",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Rice",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-09-30T06:12:55.000+00:00",
//           "modifiedTime": "2023-09-30T06:12:55.000+00:00"
//       },
//       {
//           "id": "a62bd148-e2b0-429b-8300-3b1b4fb090b2",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T10:06:10.000+00:00",
//           "modifiedTime": "2023-10-25T10:06:19.000+00:00"
//       },
//       {
//           "id": "b881298d-45dc-4378-aeee-5d10ab0df00b",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Today ",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2024-04-25T06:28:59.000+00:00",
//           "modifiedTime": "2024-04-25T06:28:59.000+00:00"
//       },
//       {
//           "id": "c9e92b54-1b47-4637-a656-e827cdeb6d68",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-09-27T04:46:57.000+00:00",
//           "modifiedTime": "2023-09-27T04:48:56.000+00:00"
//       },
//       {
//           "id": "ca168c58-d96f-42de-91ad-be37387f6d99",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T10:27:01.000+00:00",
//           "modifiedTime": "2023-10-25T11:08:52.000+00:00"
//       },
//       {
//           "id": "d8478d35-d2c4-4340-8e25-558646b20e8c",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Diwali",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-20T08:47:41.000+00:00",
//           "modifiedTime": "2023-10-20T08:47:41.000+00:00"
//       },
//       {
//           "id": "eaa59ed6-4df8-498d-99d5-d8ac346c5cc6",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2024-05-08T15:54:20.000+00:00",
//           "modifiedTime": "2024-05-17T08:31:33.000+00:00"
//       },
//       {
//           "id": "f51d9d17-1969-40bc-95e6-fd8a1e5d0091",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "Hii",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T09:36:19.000+00:00",
//           "modifiedTime": "2023-10-25T09:36:19.000+00:00"
//       },
//       {
//           "id": "f76708a0-593d-4c54-8d44-6e9ffe8b4f2f",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T11:08:37.000+00:00",
//           "modifiedTime": "2023-10-25T11:10:10.000+00:00"
//       },
//       {
//           "id": "f95e030c-dfc0-49a3-b737-062aa3efeaa3",
//           "locationId": "d99bef75-92bc-478d-9b5a-77522b0d25c0",
//           "name": "",
//           "categoryType": "S",
//           "parentId": null,
//           "sortOrder": 0,
//           "isEnabled": 1,
//           "description": null,
//           "createdTime": "2023-10-25T11:11:59.000+00:00",
//           "modifiedTime": "2023-10-25T11:12:09.000+00:00"
//       }
//   ],
//   "orderFlowDetails": [
//       {
//           "orderTypeId": "b1eddc4e-710e-437c-871c-609b84af43cd",
//           "statusIds": [
//               "11",
//               "19",
//               "25"
//           ]
//       },
//       {
//           "orderTypeId": "1b53fad0-ce9c-4736-8710-85377d19d938",
//           "statusIds": [
//               "11",
//               "19",
//               "25"
//           ]
//       },
//       {
//           "orderTypeId": "df8eb2dc-6789-4b2a-bdc9-46df7c19add9",
//           "statusIds": [
//               "11"
//           ]
//       },
//       {
//           "orderTypeId": "6e006c2d-1dd2-4b81-9af1-9e02a8336107",
//           "statusIds": [
//               "11"
//           ]
//       }
//   ],
//   "scheduledDelivery": 0,
//   "scheduledDeliveryCutOffTime": null,
//   "scheduledDeliveryDurationInDays": 5,
//   "disabledServices": {
//       "sms": 1,
//       "onlineOrder": null,
//       "onlineCheckIn": 0,
//       "email": 0,
//       "whatsappSms": 0,
//       "checkInWhatsapp": 0
//   },
//   "deliverySettings": null,
//   "platformConfiguration": null,
//   "merchantSlug": null,
//   "allowSectionSelection": true,
//   "maxReservationDayCount": null,
//   "customerOrdersAutoAccept": 1,
//   "assignTableDuringQuickCheckIn": 1,
//   "imageRequired": 0,
//   "sectionDetailsList": [
//       {
//           "id": "4caec7eb-51fe-4449-a08c-7ae3645911cf",
//           "sectionName": "Main Section"
//       }
//   ],
//   "timeZoneCd": null,
//   "prepTimeInMins": 15,
//   "dataCapCnpPayment": false,
//   "kotFooter": "Order for delivery \n directly from \n www.a2bnewjersey.com for savings upto 20%",
//   "pinBasedLogin": 1,
//   "cashDiscountOffer": null,
//   "receiptFooter": null,
//   "isSurchargeEnabled": false,
//   "isQSRDineInEnabled": false,
//   "surchargePercentage": 0.0,
//   "isInQueueSectionEnabled": true,
//   "popularItemCount": null,
//   "containsAlcohol": false,
//   "serviceTaxConfigured": false,
//   "cashDiscount": false,
//   "customizationCountRequired": true,
//   "digitalReceiptEnabled": false,
//   "taxToBeRemoved": true
// }
