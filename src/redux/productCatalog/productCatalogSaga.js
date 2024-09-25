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
  getItemCodeSuccess,
  getItemCodeFailure


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
  getItemCode
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
  GET_ITEM_CODE_REQUEST
 
} from "./productCatalogConstants";

function* getCategorySaga(action) {
  try {
    const response = yield call(getCategory, action.payload);
    if (response.status === 200) {
      yield put(getMenuCategorySuccess(response.data));
    }
  }
  catch(error){

  }
}

function* fetchDropdownDataSaga(action) {
  // const { dropDownType } = action.payload;
  try {
    const response = yield call(getSubSectionData, action.payload);
    if (response) {
      switch (action.payload) {
        case 'dietary':
          // yield put(dietdatasuccess(response));
          break;
        case 'cuisine':
          yield put(cuisineDataSuccess(response));
          break;
        case 'category':
          yield put(catogoryDataSuccess(response));
          break;
        case 'subCategory':
          yield put(subCategoryDataSuccess(response));
          break;
        case 'bestPair':
          yield put(bestPairDataSuccess(response));
          break;
        default:
          throw new Error('Invalid type');
      }
    } else {
      yield put(fetchDropDownFailure({ message: 'Please try again' }));
    }
  } catch (err) {
    yield put(fetchDropDownFailure({ message: 'Please try again' }));
  }
}

function* getSubCategorySaga(action) {
  try {
    const response = yield call(getSubCategory, action.payload);
    if (response.status === 200) {
      yield put(getMenuSubCategorySuccess(response.data));
    } else {
      yield put(getMenuSubCategoryFailed({ message: "please Try Again" }));
    }}catch(error){

    }
  }

//Delete subSection
function* deleteSubSectionSaga(action) {
  try{
    const response = yield call(deleteSubSectionSaga, action.payload)
    if(response){
      yield put(deleteDietarySuccess(response)) // add switch case
    }else{
      yield put(deleteDietaryFailure({message:'please Try Again'}))
    }
  }catch(err){
    yield put(deleteDietaryFailure({message:'please Try Again'}))
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
      if(action.payload?.sagaCallBack != null && typeof action.payload?.sagaCallBack === 'function'){
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
    const response = yield call(addMenuItem, action.payload);
    if (response.status === 200) {
      yield put(addMenuItemSuccess(response.data));
    } else {
      yield put(addMenuItemFailed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(addMenuItemFailed({ message: "please Try Again" }));
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
      yield put((response.data));
    } else {
      yield put(Get_Image_Failed({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(Get_Image_Failed({ message: "please Try Again" }));
  }
}


function* getItemCodeSaga(action) {
  const { locationId, itemCode } = action.payload;
  try {
    const response = yield call(getItemCode, locationId, itemCode);
    yield put(getItemCodeSuccess(response.data));
  } catch (error) {
    yield put(getItemCodeFailure(error.message));
  }
}

export default function* productCatalog() {
  // yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);

  yield takeLatest(FETCHDROPDOWN_REQUEST, fetchDropdownDataSaga);
  yield takeLatest(DELETEDROPDOWN_REQUEST, deleteSubSectionSaga)

  // yield takeLatest(GET_MENU_SUB_CATEGORY_REQUEST, getSubCategorySaga);
  yield takeLatest(GET_TAG_CLASS_REQUEST, getTagClassSaga);
  yield takeLatest(GET_INGR_REQUEST, getIngredientsSaga);
  yield takeLatest(ADD_MENU_ITEM_REQUEST, addMenuItemSaga);
  yield takeLatest(UPDATE_MENU_ITEM_REQUEST, updateMenuItemSaga);
  yield takeLatest(DELETE_MENU_ITEM_REQUEST, deleteMenuItemSaga);
  yield takeLatest(GET_MODIFIER_REQUEST, getModifierSaga);
  yield takeLatest(GET_AVAILABILITY_REQUEST, getAvailabilitySaga);
  yield takeLatest(UPDATE_MENU_ATTRIBUTE_REQUEST, updateMenuAttributeSaga);
  yield takeLatest(Get_ItemImage, GetImageSaga);
  yield takeLatest(GET_ITEM_CODE_REQUEST, getItemCodeSaga);
}