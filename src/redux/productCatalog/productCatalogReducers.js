import { produce } from "immer";
import {
  GET_MENU_CATEGORY_REQUEST,
  GET_MENU_CATEGORY_SUCCESS,
  GET_MENU_CATEGORY_FAILED,
  GET_MENU_SUB_CATEGORY_REQUEST,
  GET_MENU_SUB_CATEGORY_SUCCESS,
  GET_MENU_SUB_CATEGORY_FAILED,
  GET_TAG_CLASS_FAILED,
  GET_TAG_CLASS_SUCCESS,
  GET_TAG_CLASS_REQUEST,
  GET_INGR_REQUEST,
  GET_INGR_SUCCESS,
  GET_INGR_FAILED,
  ADD_MENU_ITEM_SUCCESS,
  ADD_MENU_ITEM_REQUEST,
  ADD_MENU_ITEM_FAILED,
  UPDATE_MENU_ITEM_REQUEST,
  UPDATE_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEM_FAILED,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
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
  CLEAR_MENU_ITEM_MSG,
  RESET_DELETE_DATA,
  Primary_Post_Data_Send,
  Item_Customizations_Data_Request,
  Pricing_Detail_Data_Request,
  Get_ItemImage,
  STORE_MOCK_DATA_REQUEST,
  STORE_MOCK_DATA_FILTERED_REQUEST,
  ADD_MOCK_DATA_REQUEST,
  DIET_DROPDOWN_LIST_REQUEST,
  DIET_DROPDOWN_LIST_SUCCESS,
  DIET_DROPDOWN_LIST_FAILURE
} from "../productCatalog/productCatalogConstants";

const initialProductCatalogState = {

  dietaryData:[],
  getDietaryloading:false,
  getDietarySuccess:false,

  categoryData: [],
  getCategoryLoading: false,
  getCategorySuccess: false,
  subCategoryData: [],
  getSubCategoryLoading: false,
  getSubCategorySuccess: false,
  taxClass: [],
  getTaxClassLoading: false,
  getTaxClassSuccess: false,
  ingredients: [],
  getIngredientsLoading: false,
  getIngredientsSuccess: false,
  requestCompleted: false,
  modifier: [],
  getModifierLoading: false,
  getModifierSuccess: false,


  addMenuLoading: false,
  addMenuSuccess: false,
  addMenuFailed: false,
  addMenuSuccessMessage: "",
  addMenuFailedMessage: "",
  updateMenuItemLoading: false,
  updateMenuItemSuccess: false,
  updateMenuItemFailed: false,
  updateMenuItemSuccessMessage: "",
  updateMenuItemFailureMessage: "",
  deleteMenuItemLoading: false,
  deleteMenuItemSuccess: false,
  deleteMenuItemFailed: false,
  deleteMenuItemSuccessMessage: "",
  deleteMenuItemFailureMessage: "",
  availability: [],
  getAvailabilityLoading: false,
  getAvailabilitySuccess: false,
  updateMenuAttributeLoading: false,
  updateMenuAttributeSuccess: "",
  updateMenuAttributeFailed: false,
};

export default function productCatalogReducer(
  state = initialProductCatalogState,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
   //dietary data
      case  DIET_DROPDOWN_LIST_REQUEST:
        draft.dietaryData = [];
        draft.getDietaryloading = true;
        draft.getDietarySuccess = false;
        break;
      case  DIET_DROPDOWN_LIST_SUCCESS:
        draft.dietaryData = action.payload;
        console.log("action.payload",action.payload)

        draft.getDietaryloading = false;
        draft.getDietarySuccess = true;
        break;
      case DIET_DROPDOWN_LIST_FAILURE:
        draft.dietaryData = [];
        draft.getDietaryloading = false;
        draft.getDietarySuccess = false;
        break;


      // Get Menu Category

      


      case GET_MENU_CATEGORY_REQUEST:
        draft.categoryData = [];
        draft.getCategoryLoading = true;
        draft.getCategorySuccess = false;
        break;
      case GET_MENU_CATEGORY_SUCCESS:
        draft.categoryData = action.payload;
        draft.getCategoryLoading = false;
        draft.getCategorySuccess = true;
        break;
      case GET_MENU_CATEGORY_FAILED:
        draft.categoryData = [];
        draft.getCategoryLoading = false;
        draft.getCategorySuccess = false;
        break;
      // Get menu Sub Category
      case GET_MENU_SUB_CATEGORY_REQUEST:
        draft.subCategoryData = [];
        draft.getSubCategoryLoading = true;
        draft.getSubCategorySuccess = false;
        break;
      case GET_MENU_SUB_CATEGORY_SUCCESS:
        draft.subCategoryData = action.payload;
        draft.getSubCategoryLoading = false;
        draft.getSubCategorySuccess = true;
        break;
      case GET_MENU_SUB_CATEGORY_FAILED:
        draft.subCategoryData = [];
        draft.getCategoryLoading = false;
        draft.getCategorySuccess = false;
        break;
      // Get Tax Class
      case GET_TAG_CLASS_REQUEST:
        draft.tagClass = [];
        draft.getTagClassLoading = true;
        draft.getTagClassSuccess = false;
        break;
      case GET_TAG_CLASS_SUCCESS:
        draft.tagClass = action.payload;
        draft.getTagClassLoading = false;
        draft.getTagClassSuccess = true;
        break;
      case GET_TAG_CLASS_FAILED:
        draft.tagClass = [];
        draft.getTagClassLoading = false;
        draft.getTagClassSuccess = false;
        break;
      // Get Ingredients
      case GET_INGR_REQUEST:
        draft.ingredients = [];
        draft.getSubCategoryLoading = true;
        draft.getIngredientsSuccess = false;
        draft.requestCompleted = false
        break;
      case GET_INGR_SUCCESS:
        draft.ingredients = action.payload;
        draft.getSubCategoryLoading = false;
        draft.getIngredientsSuccess = true;
        draft.requestCompleted = true
        break;
      case GET_INGR_FAILED:
        draft.ingredients = [];
        draft.getSubCategoryLoading = false;
        draft.getIngredientsSuccess = false;
        draft.requestCompleted = false
        break;
      // Get Modifier
      case GET_MODIFIER_REQUEST:
        draft.getModifierLoading = true;
        draft.getModifierSuccess = false;
        draft.modifier = [];
        break;
      case GET_MODIFIER_SUCCESS:
        draft.getModifierLoading = false;
        draft.getModifierSuccess = true;
        draft.modifier = action.payload;
        break;
      case GET_MODIFIER_FAILED:
        draft.getModifierLoading = false;
        draft.getModifierSuccess = false;
        draft.modifier = [];
        break;
      // Get Availability
      case GET_AVAILABILITY_REQUEST:
        draft.getAvailabilityLoading = true;
        draft.getAvailabilitySuccess = false;
        draft.availability = [];
        break;
      case GET_AVAILABILITY_SUCCESS:
        draft.getAvailabilityLoading = false;
        draft.getAvailabilitySuccess = true;
        draft.availability = action.payload;
        break;
      case GET_AVAILABILITY_FAILED:
        draft.getAvailabilityLoading = false;
        draft.getAvailabilitySuccess = false;
        draft.availability = [];
        break;
      // Add Menu Item
      case ADD_MENU_ITEM_REQUEST:
        draft.addMenuLoading = true;
        draft.addMenuFailed = false;
        draft.addMenuSuccess = false;
        draft.addMenuSuccessMessage = "";
        draft.addMenuFailedMessage = "";
        break;
      case ADD_MENU_ITEM_SUCCESS:
        draft.addMenuLoading = false;
        draft.addMenuFailed = false;
        draft.addMenuSuccess = true;
        draft.addMenuSuccessMessage = action.payload;
        draft.addMenuFailedMessage = "";
        break;
      case ADD_MENU_ITEM_FAILED:
        draft.addMenuLoading = false;
        draft.addMenuFailed = true;
        draft.addMenuSuccess = false;
        draft.addMenuSuccessMessage = "";
        draft.addMenuFailedMessage = action.payload;
        break;
      // Update Menu Item
      case UPDATE_MENU_ITEM_REQUEST:
        draft.updateMenuItemLoading = true;
        draft.updateMenuItemFailed = false;
        draft.updateMenuItemSuccess = false;
        draft.updateMenuItemFailureMessage = "";
        draft.updateMenuItemSuccessMessage = "";
        break;
      case UPDATE_MENU_ITEM_SUCCESS:
        draft.updateMenuItemLoading = false;
        draft.updateMenuItemFailed = false;
        draft.updateMenuItemSuccess = true;
        draft.updateMenuItemFailureMessage = "";
        draft.updateMenuItemSuccessMessage = action.payload;
        break;
      case UPDATE_MENU_ITEM_FAILED:
        draft.updateMenuItemLoading = false;
        draft.updateMenuItemFailed = true;
        draft.updateMenuItemSuccess = false;
        draft.updateMenuItemFailureMessage = action.payload;
        draft.updateMenuItemSuccessMessage = "";
        break;
      // Delete Menu Item
      case DELETE_MENU_ITEM_REQUEST:
        draft.deleteMenuItemLoading = true;
        draft.deleteMenuItemFailed = false;
        draft.deleteMenuItemSuccess = false;
        draft.deleteMenuItemFailureMessage = "";
        draft.deleteMenuItemSuccessMessage = "";
        break;
      case DELETE_MENU_ITEM_SUCCESS:
        draft.deleteMenuItemLoading = false;
        draft.deleteMenuItemFailed = false;
        draft.deleteMenuItemSuccess = true;
        draft.deleteMenuItemFailureMessage = "";
        draft.deleteMenuItemSuccessMessage = action.payload;
        break;
      case DELETE_MENU_ITEM_FAILED:
        draft.deleteMenuItemLoading = false;
        draft.deleteMenuItemFailed = true;
        draft.deleteMenuItemSuccess = false;
        draft.deleteMenuItemFailureMessage = action.payload;
        draft.deleteMenuItemSuccessMessage = "";
        break;
      case RESET_DELETE_DATA:
        draft.deleteMenuItemLoading = false;
        draft.deleteMenuItemFailed = false;
        draft.deleteMenuItemSuccess = false;
        draft.deleteMenuItemFailureMessage = "";
        draft.deleteMenuItemSuccessMessage = "";
        break;
      // Update Menu Attribute
      case UPDATE_MENU_ATTRIBUTE_REQUEST:
        draft.updateMenuAttributeLoading = true;
        draft.updateMenuAttributeSuccess = [];
        draft.updateMenuAttributeFailed = false;
        break;
      case UPDATE_MENU_ATTRIBUTE_SUCCESS:
        draft.updateMenuAttributeLoading = false;
        draft.updateMenuAttributeSuccess = action.payload;
        draft.updateMenuAttributeFailed = false;
        break;
      case UPDATE_MENU_ATTRIBUTE_FAILED:
        draft.updateMenuAttributeLoading = false;
        draft.updateMenuAttributeSuccess = [];
        draft.updateMenuAttributeFailed = true;
        break;
      case CLEAR_MENU_ITEM_SUCCESS:
        draft.addMenuSuccessMessage = "";
        draft.updateMenuItemSuccessMessage = "";
        break;
      case CLEAR_MENU_ITEM_MSG:
        draft.updateMenuAttributeSuccess = "";
        break;
      default:
        break;
    }
  });
}

// {*************Primary Page Redux ************************************************}
const primarypagedata = {
  data: [],
  loading: false,
  error: null,
};
export const primarypagereducer = (state = primarypagedata, action) => {
  switch (action.type) {
    case Primary_Post_Data_Send:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const initialState = {
  itemData: [],
  isLoading: false,
  error: null,
};

export const itemCustomizationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Item_Customizations_Data_Request:
      return { ...state, itemData: action.payload };
    default:
      return state;
  }
};

// {*******************Prizing Detail Page Redux Reducer***************}

const PricingDetailPage = {
  prizingData: [],
};

export const PricingDetailReducer = (state = PricingDetailPage, action) => {
  switch (action.type) {
    case Pricing_Detail_Data_Request:
      return { ...state, prizingData: action?.payload };

    default:
      return state;
  }
};

// {*******************Get_ImageName***************}

const ItemImage = {
  InitialImageData: "",
};
export const imageReducer = (state = ItemImage, action) => {
  switch (action.type) {
    case Get_ItemImage:
      return {
        ...state,
        InitialImageData: action.payload,
      };
    default:
      return state;
  }
};

const mockData = {
  data: [],
};

export const storeMockDataReducer = (state = mockData, action) => {
  switch (action.type) {
    case STORE_MOCK_DATA_REQUEST:
      return {
        ...state,
        data: action?.payload,
      };
      default:
      return state;
    }}

 

 

  const mockDataFiltered = {
    data: []
  };

  export  const storeMockDataFilteredReducer = (state = mockDataFiltered, action) => {
    switch (action.type) {
      case STORE_MOCK_DATA_FILTERED_REQUEST:
        return {
          ...state,data:action?.payload
        };
  
    
  
      default:
        return state;
    }
  };
 

  // {**************************AddMockData***********************************************}

  const addMockData = {
    data: []
  }

  export  const addMockDataReducer = (state = mockDataFiltered, action) => {
    switch (action.type) {
      case ADD_MOCK_DATA_REQUEST:
        return {
          ...state,data:action?.payload
        };
  
    
  
      default:
        return state;
    }
  };

