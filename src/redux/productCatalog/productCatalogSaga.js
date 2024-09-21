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
  bestPairDataRequest


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
  getBestPairData
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
  BESTPAIR_DATA_REQUEST
 
} from "./productCatalogConstants";


//Dietary
function* getdietarySaga(action) {
  try {
    const response = yield call(getDietarydata, action.payload);
    if (response) {
      yield put(dietdatasuccess(response));
    } 
    else {
      yield put(dietdatafailure({ message: "please Try Again" }));
    }
  } catch (err) {
    yield put(dietdatafailure({ message: "please Try Again" }));
  }
}

//cuisine 
function* getCuisineSaga(action) {
  try{
    const response = yield call(getCuisineData, action.payload)
    if(response){
      yield put(cuisineDataSuccess(response))
    }
    else {
      yield put(cuisineDataFailure({message: 'please Try Again'}))
    }
  } catch(err){
    yield put(cuisineDataFailure({message: 'please Try Again'}))
  }
} 

//category
function* getCategorySaga(action) {
  try {
    const response = yield call(getCategorydata, action.payload)
    if(response){
      yield put(catogoryDataSuccess(response))
    }else{
      yield put(catogoryDataFailure({message: 'please Try Again'}))
    }
  }catch (err){
    yield put(catogoryDataFailure({message: 'please Try Again'}))
  }
}

//subCategory
function* getSubCategorySaga(action){
  try{
    const response = yield call(getSubCategoryData, action.payload)
    if(response){
      yield put(subCategoryDataSuccess(response))
    }else{
      yield put(subCategoryDataFailure({message: 'please Try Again'}))
    }
  }catch(err){
    yield put(subCategoryDataFailure({message: 'please Try Again'}))
  }
}

//bestPair
function* getBestPairDataSaga(action){
  try{
    const response = yield call(getBestPairData, action.payload)
    if(response){
      yield put(bestPairDataSuccess(response))
    }else{
      yield put(bestPairDataFailure({message: 'please Try Again'}))
    }
  }catch(err){
    yield put(bestPairDataFailure({message: 'please Try Again'}))
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

export default function* productCatalog() {
  // yield takeLatest(GET_MENU_CATEGORY_REQUEST, getCategorySaga);

  yield takeLatest(DIET_DROPDOWN_LIST_REQUEST, getdietarySaga);
  yield takeLatest(CUISINE_DATA_REQUEST, getCuisineSaga);
  yield takeLatest(CATEGORY_DATA_REQUEST, getCategorySaga);
  yield takeLatest(SUBCATEGORY_DATA_REQUEST, getSubCategorySaga);
  yield takeLatest(BESTPAIR_DATA_REQUEST, getBestPairDataSaga)

  yield takeLatest(GET_MENU_SUB_CATEGORY_REQUEST, getSubCategorySaga);
  yield takeLatest(GET_TAG_CLASS_REQUEST, getTagClassSaga);
  yield takeLatest(GET_INGR_REQUEST, getIngredientsSaga);
  yield takeLatest(ADD_MENU_ITEM_REQUEST, addMenuItemSaga);
  yield takeLatest(UPDATE_MENU_ITEM_REQUEST, updateMenuItemSaga);
  yield takeLatest(DELETE_MENU_ITEM_REQUEST, deleteMenuItemSaga);
  yield takeLatest(GET_MODIFIER_REQUEST, getModifierSaga);
  yield takeLatest(GET_AVAILABILITY_REQUEST, getAvailabilitySaga);
  yield takeLatest(UPDATE_MENU_ATTRIBUTE_REQUEST, updateMenuAttributeSaga);
  yield takeLatest(Get_ItemImage, GetImageSaga);
}


