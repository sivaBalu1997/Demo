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
  DIET_DROPDOWN_LIST_FAILURE,
  CUISINE_DATA_REQUEST,
  CUISINE_DATA_SUCCESS,
  CUISINE_DATA_FAILURE,
  CATEGORY_DATA_REQUEST,
  CATEGORY_DATA_SUCCESS,
  SUBCATEGORY_DATA_REQUEST,
  SUBCATEGORY_DATA_SUCCESS,
  SUBCATEGORY_DATA_FAILURE,
  CATEGORY_DATA_FAILURE,
  BESTPAIR_DATA_FAILURE,
  BESTPAIR_DATA_REQUEST,
  BESTPAIR_DATA_SUCCESS,
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
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
  UPLOAD_IMAGE_IN_PROGRESS,
  ADD_MOCK_DATA_HIDDEN_REQUEST,
  GET_ITEM_CODE_REQUEST,
  GET_ITEM_CODE_SUCCESS,
  GET_ITEM_CODE_FAILURE,
  GET_POPULAR_ITEM_REQUEST,
  GET_POPULAR_ITEM_SUCCESS,
  GET_POPULAR_ITEM_FAILURE,
  SELECTED_MOCKDATA_REQUEST,
  STORE_MENU_REQUEST,
  STORE_MENU_SUCCESS,
  STORE_MENU_FAILURE,
  KITCHEN_DATA_REQUEST,
  KITCHEN_DATA_SUCCESS,
  KITCHEN_DATA_FAILURE,
  PARTIAL_UPDATE_MENU_REQUEST,
  PARTIAL_UPDATE_MENU_SUCCESS,
  PARTIAL_UPDATE_MENU_FAILURE,
  STORE_UPLOAD_FAILURE,
  IMAGE_UPLOAD_SUCCESS,
  RETRY_IMAGE_SUCCESS,
  RETRY_IMAGE_FAILURE,
  DELETEDROPDOWN_FAILURE,
  DELETEDROPDOWN_SUCCESS,
  SEARCH_FORITEM,
  STORE_DATA_WITH_CATEGORY,
  ADD_MOCK_DATA_HIDDEN_FALIURE,
  ADD_MOCK_DATA_HIDDEN_SUCCESS,
  STORE_UPLOAD_SUCCESS,
  DELETE_MODIFIER_REQUEST,
  DELETE_MODIFIER_SUCCESS,
  DELETE_MODIFIER_FAILURE,
  REMOVE_DATA_REQUEST,
  REMOVE_CODE_REQUEST,
  START_IMAGE_UPLOAD,
  UPDATE_MODIFIER_REQUEST,
  SELECTED_CATEGORY_DATA_REQUEST,
  FETCHDROPDOWN_SUCCESS,
  FETCHDROPDOWN_FAILURE,
  FETCHDROPDOWN_REQUEST,
  RESET_SUCCESS_MESSAGE,
  ALLERGENS_REQUEST,
  ALLERGENS_SUCCESS,
  ALLERGENS_FAILURE,
  INGREDIENTS_REQUEST,
  INGREDIENT_SUCESS,
  INGREDIENT_FAILURE,
  Remove_Pricing_Data_Request,
  Remove_ItemCust_Data_Request,
  Remove_Primary_Data_Request,
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
  MEALTYPE_REQUEST,
  MEALTYPE_SUCCESS,
  MEALTYPE_FAILURE,
  SELECTED_SUBCATEGORY_DATA_REQUEST,
} from "../productCatalog/productCatalogConstants";
import { kitchenStationSuccess } from "./productCatalogActions";
import { mealType } from "assets/mockData/Moca_data";

const initialProductCatalogState = {
  menuData: [],
  menuDataLoading: false,
  menuDataSuccess: false,
  menuDataFailed: false,

  getDataLoading: false,

  dietaryData: [],
  getDietaryloading: false,
  getDietarySuccess: false,

  cuisineData: [],
  getCuisineDataLoading: false,
  getCuisineSuccess: false,
  geitCuisineFailure: false,

  categoryData: [],
  getCategoryLoading: false,
  getCategorySuccess: false,

  subCategoryData: [],
  getSubCategoryLoading: false,
  getSubCategorySuccess: false,

  bestPairData: [],
  getBestPairDataLoading: false,
  getBestPairSuccess: false,

  kitchenStation: [],
  kitchenStationLoading: false,
  kitchenStationSuccess: false,

  allergens: [],
  allergensLoading: false,
  allergensSuccess: false,

  ingredients: [],
  ingredientsLoading: false,
  ingredientsSuccess: false,

  taxClass: [],
  getTaxClassLoading: false,
  getTaxClassSuccess: false,

  deletesubsectionfailure: "",
  deletesubsectionsuccess: "",

  ingredients: [],
  getIngredientsLoading: false,
  getIngredientsSuccess: false,

  mealType: [],
  mealTypeLoading: false,
  mealTypeSuccess: false,

  requestCompleted: false,

  modifier: [],
  getModifierLoading: false,
  getModifierSuccess: false,

  deletedId: [],
  deletedIdLoading: false,
  deleteIdFailure: false,

  //delete dropdown
  deleteDietarySuccess: false,
  deleteDietaryFailure: false,
  deleteDietaryLoading: false,

  deleteCuisineSuccess: false,
  deleteCuisineFailure: false,
  deleteCuisineLoading: false,

  deleteCategorySuccess: false,
  deleteCategoryFailure: false,
  deleteCategoryLoading: false,

  deleteSubCategorySuccess: false,
  deleteSubCategoryFailure: false,
  deleteSubCategoryLoading: false,

  addMenuLoading: false,
  addMenuSuccess: false,
  addMenuFailed: false,
  addMenuItemdata: [],
  addMenuSuccessMessage: "",
  addMenuFailedMessage: "",

  imageuploadStatus: {},
  imageerrorMessage: "",
  itemId: "",
  uploadFailures: [],
  uploadImageLoading: false,
  imageUploadfailuremsg: "",
  imageUploadsuccessemsg: false,
  successImageId: "",

  editData: [],
  dropDownLoading: false,
  dropDownSuccess: false,

  retrySucess: "",
  retryFailure: {
    imageName: "",
    itemId: "",
  },

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
  selectedCategory: {},
  selectedSubCategory: {},

  updateModifierId: [],
  //partialUpdate
  partialDataSendingLoading: false,
  partialDataSendingsuccess: "",
  partialDataSendingfaliure: false,

  deleteimageloading:false,
  deleteimagesuccess:false,
  deleteimagefailure:false,
  selectedColumns:{},

  fcMEventloading:false,
  fcMEventsuccess:false,
  fcMEventfailure:false,


};

export default function productCatalogReducer(
  state = initialProductCatalogState,
  action
) {
  return produce(state, (draft) => {
    switch (action.type) {
      case STORE_MENU_REQUEST:
        draft.menuData = [];
        draft.updateModifierId=[];
        // draft.addMenuLoading = true;
        draft.menuDataLoading = true;
        draft.menuDataSuccess = false;
        draft.menuDataFailed = false;
        break;
      case STORE_MENU_SUCCESS:
        draft.menuData = action.payload;
        draft.menuDataSuccess = true;
        draft.menuDataFailed = false;
        draft.menuDataLoading = false;
        break;
      case STORE_MENU_FAILURE:
        draft.menuData = [];
        draft.menuDataLoading = false;
        draft.menuDataFailed = true;
        draft.menuDataSuccess = false;
        break;
//selected Columns
case SELECTED_COLUMNS:
        draft.selectedColumns = action.payload;
       
        break;

        case DELETE_IMAGE_REQUEST:
        draft.deleteimageloading = true;
        draft.deleteimagesuccess = false;
        draft.deleteimagefailure = false;
        break;
      case DELETE_IMAGE_SUCCESS:
        draft.deleteimageloading = false;
        draft.deleteimagesuccess = true;
        draft.deleteimagefailure = false;
        break;
      case DELETE_IMAGE_FAILURE:
        draft.deleteimageloading = false;
        draft.deleteimagesuccess = false;
        draft.deleteimagefailure = true;
        break;

      //partial update
      case PARTIAL_UPDATE_MENU_REQUEST:
        draft.partialDataSendingLoading = true;
        draft.partialDataSendingsuccess = "";
        draft.partialDataSendingfaliure = false;
        break;
      case PARTIAL_UPDATE_MENU_SUCCESS:
        draft.partialDataSendingLoading = false;
        draft.partialDataSendingsuccess = action.payload;
        draft.partialDataSendingfaliure = false;
        break;
      case PARTIAL_UPDATE_MENU_FAILURE:
        draft.partialDataSendingLoading = false;
        draft.partialDataSendingsuccess = "";
        draft.partialDataSendingfaliure = true;
        break;

      case FETCHDROPDOWN_REQUEST:
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;

      case FETCHDROPDOWN_FAILURE:
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;

      //dietary data
      case DIET_DROPDOWN_LIST_REQUEST:
        draft.dietaryData = [];
        draft.getDataLoading = true;
        draft.getDietaryloading = true;
        draft.getDietarySuccess = false;
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;
      case DIET_DROPDOWN_LIST_SUCCESS:
        draft.dietaryData = action.payload;
        draft.getDataLoading = false;
        draft.getDietaryloading = false;
        draft.getDietarySuccess = true;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case DIET_DROPDOWN_LIST_FAILURE:
        draft.dietaryData = [];
        draft.getDataLoading = false;
        draft.getDietaryloading = false;
        draft.dropDownLoading = false;
        draft.getDietarySuccess = false;
        draft.dropDownSuccess = false;
        break;

      //cuisine data
      case CUISINE_DATA_REQUEST:
        draft.cuisineData = [];
        draft.getDataLoading = true;
        draft.getCuisineDataLoading = false;
        draft.dropDownLoading = true;
        break;
      case CUISINE_DATA_SUCCESS:
        draft.cuisineData = action.payload;
        draft.getDataLoading = false;
        draft.getCuisineSuccess = true;
        draft.getCuisineDataLoading = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case CUISINE_DATA_FAILURE:
        draft.cuisineData = [];
        draft.getCuisineSuccess = false;
        draft.getDataLoading = false;
        draft.getCuisineDataLoading = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;

      //category
      case CATEGORY_DATA_REQUEST:
        draft.categoryData = [];
        draft.getDataLoading = true;
        draft.getCategoryLoading = true;
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;
      case CATEGORY_DATA_SUCCESS:
        draft.categoryData = action.payload;
        draft.getDataLoading = false;
        draft.getCategorySuccess = true;
        draft.getCategoryLoading = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case CATEGORY_DATA_FAILURE:
        draft.categoryData = [];
        draft.getDataLoading = false;
        draft.getCategorySuccess = false;
        draft.getCategoryLoading = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;

      //subCategory
      case SUBCATEGORY_DATA_REQUEST:
        draft.subCategoryData = [];
        draft.getDataLoading = true;
        draft.getSubCategoryLoading = true;
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;
      case SUBCATEGORY_DATA_SUCCESS:
        draft.subCategoryData = action.payload;
        draft.getSubCategoryLoading = false;
        draft.getDataLoading = false;
        draft.getCategorySuccess = true;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case SUBCATEGORY_DATA_FAILURE:
        draft.subCategoryData = [];
        draft.getDataLoading = false;
        draft.getSubCategoryLoading = false;
        draft.getCategorySuccess = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;

      //bestPair
      case BESTPAIR_DATA_REQUEST:
        draft.bestPairData = [];
        draft.getDataLoading = true;
        draft.getBestPairDataLoading = true;
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;
      case BESTPAIR_DATA_SUCCESS:
        draft.bestPairData = action.payload;
        draft.getDataLoading = false;
        draft.getBestPairDataLoading = false;
        draft.getBestPairSuccess = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case BESTPAIR_DATA_FAILURE:
        draft.bestPairData = [];
        draft.getDataLoading = false;
        draft.getBestPairDataLoading = false;
        draft.getBestPairSuccess = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;
      case SELECTED_CATEGORY_DATA_REQUEST:
        draft.selectedCategory = action.payload;
        case SELECTED_SUBCATEGORY_DATA_REQUEST:
        draft.selectedSubCategory = action.payload;

      //kitchenStation
      case KITCHEN_DATA_REQUEST:
        draft.kitchenStation = [];
        draft.getDataLoading = true;
        draft.kitchenStationLoading = true;
        draft.dropDownLoading = true;
        draft.dropDownSuccess = false;
        break;
      case KITCHEN_DATA_SUCCESS:
        draft.kitchenStation = action.payload;
        draft.kitchenStationLoading = false;
        draft.getDataLoading = false;
        draft.kitchenStationSuccess = true;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = true;
        break;
      case KITCHEN_DATA_FAILURE:
        draft.kitchenStation = [];
        draft.kitchenStationLoading = false;
        draft.getDataLoading = false;
        draft.kitchenStationSuccess = false;
        draft.dropDownLoading = false;
        draft.dropDownSuccess = false;
        break;

      case ALLERGENS_REQUEST:
        draft.allergens = [];
        draft.allergensLoading = true;
        draft.allergensSuccess = false;
        break;
      case ALLERGENS_SUCCESS:
        draft.allergens = action.payload;
        draft.allergensLoading = false;
        draft.allergensSuccess = true;
        break;
      case ALLERGENS_FAILURE:
        draft.allergens = [];
        draft.allergensLoading = false;
        draft.allergensSuccess = false;
        break;

      case INGREDIENTS_REQUEST:
        draft.ingredients = [];
        draft.ingredientsLoading = true;
        draft.ingredientsSuccess = false;
        break;
      case INGREDIENT_SUCESS:
        draft.ingredients = action.payload;
        draft.ingredientsLoading = false;
        draft.ingredientsSuccess = true;
        break;
      case INGREDIENT_FAILURE:
        draft.ingredients = [];
        draft.ingredientsLoading = false;
        draft.ingredientsSuccess = false;
        break;

      case ALLERGENS_REQUEST:
        draft.allergens = [];
        draft.allergensLoading = true;
        draft.allergensSuccess = false;
        break;
      case ALLERGENS_SUCCESS:
        draft.allergens = action.payload;
        draft.allergensLoading = false;
        draft.allergensSuccess = true;
        break;
      case ALLERGENS_FAILURE:
        draft.allergens = [];
        draft.allergensLoading = false;
        draft.allergensSuccess = false;
        break;

      case INGREDIENTS_REQUEST:
        draft.ingredients = [];
        draft.ingredientsLoading = true;
        draft.ingredientsSuccess = false;
        break;
      case INGREDIENT_SUCESS:
        draft.ingredients = action.payload;
        draft.ingredientsLoading = false;
        draft.ingredientsSuccess = true;
        break;
      case INGREDIENT_FAILURE:
        draft.ingredients = [];
        draft.ingredientsLoading = false;
        draft.ingredientsSuccess = false;
        break;


        case MEALTYPE_REQUEST:
        draft.mealType = [];
        draft.mealTypeLoading = true;
        draft.mealTypeSuccess = false;
        break;
      case MEALTYPE_SUCCESS:
        draft.mealType = action.payload;
        draft.mealTypeLoading = false;
        draft.mealTypeSuccess = true;
        break;
      case MEALTYPE_FAILURE:
        draft.mealType = [];
        draft.mealTypeLoading = false;
        draft.mealTypeSuccess = false;
        break;

      case TAXCLASS_REQUEST:
        draft.taxClass = [];
        draft.getTaxClassLoading = true;
        draft.getTaxClassSuccess = false;
        break;

      case TAXCLASS_SUCCESS:
        draft.taxClass = action.payload;
        draft.getTaxClassLoading = false;
        draft.getTaxClassSuccess = true;
        break;

      case TAXCLASS_FAILURE:
        draft.taxClass = action.payload;
        draft.getTaxClassLoading = false;
        draft.getTaxClassSuccess = false;
        break;

      // Get Menu Category
      case GET_MENU_CATEGORY_REQUEST:
        draft.categoryData = [];
        draft.dropDownLoading = true;
        draft.getCategoryLoading = true;
        draft.getCategorySuccess = false;
        draft.dropDownLoading = false;
        break;
      case GET_MENU_CATEGORY_SUCCESS:
        draft.categoryData = action.payload;
        draft.getCategoryLoading = false;
        draft.getCategorySuccess = true;
        draft.dropDownLoading = false;
        break;
      case GET_MENU_CATEGORY_FAILED:
        draft.categoryData = [];
        draft.getCategoryLoading = false;
        draft.getCategorySuccess = false;
        draft.dropDownLoading = false;
        break;

      // Get menu Sub Category
      case GET_MENU_SUB_CATEGORY_REQUEST:
        draft.subCategoryData = [];
        draft.dropDownLoading = true;
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
      //deletesubsection

      case DELETEDROPDOWN_FAILURE:
        draft.deletesubsectionfailure = "failed";
        break;
      case DELETEDROPDOWN_SUCCESS:
        draft.deletesubsectionsuccess = "success";
        break;

      case GET_INGR_REQUEST:
        draft.ingredients = [];
        draft.getSubCategoryLoading = true;
        draft.getIngredientsSuccess = false;
        draft.requestCompleted = false;
        break;
      case GET_INGR_SUCCESS:
        draft.ingredients = action.payload;
        draft.getSubCategoryLoading = false;
        draft.getIngredientsSuccess = true;
        draft.requestCompleted = true;
        break;
      case GET_INGR_FAILED:
        draft.ingredients = [];
        draft.getSubCategoryLoading = false;
        draft.getIngredientsSuccess = false;
        draft.requestCompleted = false;
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
        draft.addMenuItemdata = action.payload;
        draft.addMenuLoading = true;
        draft.addMenuFailed = false;
        draft.addMenuSuccess = false;
        draft.addMenuSuccessMessage = "";
        draft.addMenuFailedMessage = "";
        break;
      case ADD_MENU_ITEM_SUCCESS:
        draft.addMenuLoading = false;
        draft.updateMenuItemLoading=false;
        draft.addMenuFailed = false;
        draft.addMenuSuccess = true;
        draft.addMenuSuccessMessage = action.payload;
        draft.addMenuFailedMessage = "";
        break;
      case ADD_MENU_ITEM_FAILED:
        draft.addMenuLoading = false;
        draft.updateMenuItemLoading=false;
        draft.addMenuFailed = true;
        draft.addMenuSuccess = false;
        draft.addMenuSuccessMessage = "";
        draft.addMenuFailedMessage = action.payload;
        break;

      //UPLOAD_IMAGE_SUCCESS:

      case START_IMAGE_UPLOAD:
        draft.uploadImageLoading = true;
        draft.imageUploadsuccessemsg = false;
        draft.addMenuLoading = true;
        draft.updateMenuItemLoading=true;
        
        break;

      case UPLOAD_IMAGE_SUCCESS:
        draft.imageuploadStatus = action.payload;
        draft.uploadImageLoading = false;
        draft.imageUploadsuccessemsg = true;
        // draft.updateMenuItemLoading=true;
        // draft.addMenuLoading = false;
        break;

      case UPLOAD_IMAGE_FAILURE:
        draft.uploadImageLoading = false;
        draft.imageuploadStatus = action.payload;
        draft.imageerrorMessage = action.payload;
        draft.imageUploadsuccessemsg = false;
        
        // draft.addMenuLoading = false;
        break;

      case IMAGE_UPLOAD_SUCCESS:
        draft.uploadImageLoading = false;
        draft.itemId = action.payload;
        draft.imageUploadsuccessemsg = true;
        // draft.addMenuLoading = false;
        break;

      case STORE_UPLOAD_FAILURE:
        draft.uploadImageLoading = false;
        draft.uploadFailures = action.payload.failureArray;
        draft.imageUpload = action.payload.statusmsg;
        draft.imageUploadsuccessemsg = false;
        // draft.addMenuLoading = false;
        break;

      case STORE_UPLOAD_SUCCESS:
        draft.uploadImageLoading = false;
        draft.successImageId = action.payload;
        draft.imageUploadsuccessemsg = true;
        // draft.addMenuLoading = false;
        break;

      case RETRY_IMAGE_SUCCESS:
        draft.retrySucess = action.payload;
        break;

      case RETRY_IMAGE_FAILURE:
        draft.retryFailure.imageName = action.payload.imageName;
        draft.retryFailure.itemId = action.payload.itemId;
        break;

      // Update Menu Item
      case UPDATE_MENU_ITEM_REQUEST:
        draft.updatedPayload = action.payload;
        draft.updateMenuItemLoading = true;
        draft.updateMenuItemFailed = false;
        draft.updateMenuItemSuccess = false;
        draft.updateMenuItemFailureMessage = "";
        draft.updateMenuItemSuccessMessage = "";
        break;
      case UPDATE_MENU_ITEM_SUCCESS:
        draft.updateMenuItemLoading = false;
        draft.addMenuLoading = false;
        draft.updateMenuItemFailed = false;
        draft.updateMenuItemSuccess = true;
        draft.updateMenuItemFailureMessage = "";
        draft.updateMenuItemSuccessMessage = action.payload;
        break;
      case UPDATE_MENU_ITEM_FAILED:
        draft.updateMenuItemLoading = false;
        draft.addMenuLoading = false;
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

        // draft.menuData = draft.menuData.map((category) => {
        //   if (!category.itemResponseList) return category;
        //   return {
        //     ...category,
        //     itemResponseList: category.itemResponseList.filter(
        //       (item) => item.itemId !== action.payload.itemId
        //     ),
        //   };
        // });
        

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

      case DELETEDIETARY_REQUEST:
        draft.deleteDietarySuccess = false;
        draft.deleteDietaryFailure = false;
        draft.deleteDietaryLoading = true;
        break;
      case DELETEDIETARY_SUCCESS:
        draft.deleteDietarySuccess = true;
        draft.deleteDietaryFailure = false;
        draft.deleteDietaryLoading = false;
        break;
      case DELETEDIETARY_FAILURE:
        draft.deleteCuisineSuccess = false;
        draft.deleteCuisineFailure = true;
        draft.deleteCuisineLoading = false;
        break;

      case DELETECUISINE_REQUEST:
        draft.deleteCuisineSuccess = false;
        draft.deleteCuisineFailure = false;
        draft.deleteCuisineLoading = true;
        break;
      case DELETECUISINE_SUCCESS:
        draft.deleteCuisineSuccess = true;
        draft.deleteCuisineFailure = false;
        draft.deleteCuisineLoading = false;
        break;
      case DELETECUISINE_FAILURE:
        draft.deleteCuisineSuccess = false;
        draft.deleteCuisineFailure = true;
        draft.deleteCuisineLoading = false;
        break;

      case DELETECATEGORY_REQUEST:
        draft.deleteCategorySuccess = false;
        draft.deleteCategoryFailure = false;
        draft.deleteCategoryLoading = true;
        break;
      case DELETECATEGORY_SUCCESS:
        draft.deleteCategorySuccess = true;
        draft.deleteCategoryFailure = false;
        draft.deleteCategoryLoading = false;
        break;
      case DELETECATEGORY_FAILURE:
        draft.deleteCategorySuccess = false;
        draft.deleteCategoryFailure = true;
        draft.deleteCategoryLoading = false;
        break;

      case DELETESUBCATEGORY_REQUEST:
        draft.deleteSubCategorySuccess = false;
        draft.deleteSubCategoryFailure = false;
        draft.deleteSubCategoryLoading = true;
        break;
      case DELETESUBCATEGORY_SUCCESS:
        draft.deleteSubCategorySuccess = true;
        draft.deleteSubCategoryFailure = false;
        draft.deleteSubCategoryLoading = false;
        break;
      case DELETESUBCATEGORY_FAILURE:
        draft.deleteSubCategorySuccess = false;
        draft.deleteSubCategoryFailure = true;
        draft.deleteSubCategoryLoading = false;
        break;
      case DELETE_MODIFIER_REQUEST:
        draft.deletedId = [action.payload];
        draft.deleteIdFailure = false;
        draft.deletedIdLoading = true;
        break;
      case DELETE_MODIFIER_SUCCESS:
        draft.deletedId = [...draft.deletedId, action.payload];
        draft.deleteIdFailure = false;
        draft.deletedIdLoading = false;
        break;
      case DELETE_MODIFIER_FAILURE:
        draft.deletedId = [];
        draft.deleteIdFailure = false;
        draft.deletedIdLoading = false;
        break;
      case UPDATE_MODIFIER_REQUEST:
        draft.updateModifierId = action.payload;
        break;
      case SELECTED_MOCKDATA_REQUEST:
        draft.editData = action.payload;
        break;
      case REMOVE_DATA_REQUEST:
        draft.editData = [];
        draft.updateModifierId=[]
        draft.successImageId = "";
        break;
        case TRIGGER_FCM:
          draft.fcMEventloading = true;
          
          break;
          case TRIGGERED_FCM:
            draft.fcMEventloading = false;
            break;
            

      default:
    }
  });
}

//{.....................Image Upload.........................}

// {*************Primary Page Redux ************************************************}
const primarypagedata = {
  data: [],
  loading: false,
  error: null,
};

export const primarypagereducer = (state = primarypagedata, action) => {
  switch (action.type) {
    case Primary_Post_Data_Send:
      return {
        ...state,
        data: action.payload,
      };
    case REMOVE_DATA_REQUEST:
      return {
        ...state,
        data: [],
      };
    case Remove_Primary_Data_Request:
      return {
        ...state,
        data: [],
      };
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
    case REMOVE_DATA_REQUEST:
      return {
        ...state,
        itemData: [],
      };
    



    case Remove_ItemCust_Data_Request:
      return {
        ...state,
        itemData: [],
      };
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
    case REMOVE_DATA_REQUEST:
      return {
        ...state,
        prizingData: [],
      };
    case Remove_Pricing_Data_Request:
      return {
        ...state,
        prizingData: [],
      };
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
const imageuploadinitialstate = {
  images: [], // Array of images to be uploaded
  uploadStatus: {}, // Store image upload status: { imageId: 'pending' | 'success' | 'failed' }
  errorMessages: {}, // Store error messages for failed uploads: { imageId: errorMessage }
};

export const imageUploadReducer = (state = imageuploadinitialstate, action) => {
  switch (action.type) {
    case UPLOAD_IMAGE_IN_PROGRESS:
      return {
        ...state,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        uploadStatus: {
          ...state.uploadStatus,
          id: action.payload.id,
          image: action.payload.image,
          index: action.payload.index,
          status: "success",
        },
      };
    case UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadStatus: {
          ...state.uploadStatus,
          id: action.payload.id,
          index: action.payload.index,
          image: action.payload.image,
          status: "failed",
        },
        errorMessages: {
          ...state.errorMessages,
          id: action.payload.id,
          image: action.payload.image,
          index: action.payload.index,
          errormessgae: action.payload.error,
        },
      };
    default:
      return state;
  }
};

//Search for an item

const initialSearchitem = {
  SearcheItem: {},
};

export const searchforamitemreducer = (state = initialSearchitem, action) => {
  switch (action.type) {
    case SEARCH_FORITEM:
      return {
        ...state,
        SearcheItem: action?.payload,
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
  }
};

const mockDataFiltered = {
  data: [],
};

export const storeMockDataFilteredReducer = (
  state = mockDataFiltered,
  action
) => {
  switch (action.type) {
    case STORE_MOCK_DATA_FILTERED_REQUEST:
      return {
        ...state,
        data: action?.payload,
      };

    default:
      return state;
  }
};

// {**************************AddMockData***********************************************}

const addMockData = {
  data: [],
};

export const addMockDataReducer = (state = mockDataFiltered, action) => {
  switch (action.type) {
    case ADD_MOCK_DATA_REQUEST:
      return {
        ...state,
        data: action?.payload,
      };

    default:
      return state;
  }
};
const addMockHiddenData = {
  data: [],
  failed: false,
  loading: false,
  success: false,
};

export const addMockDataHiddenReducer = (state = addMockHiddenData, action) => {
  switch (action.type) {
    case ADD_MOCK_DATA_HIDDEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        failed: false,
        success: false
      };
    case ADD_MOCK_DATA_HIDDEN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        failed: false,
        success: true,
      };
    case ADD_MOCK_DATA_HIDDEN_FALIURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        failed: true,
        success: false,
      };

    case RESET_SUCCESS_MESSAGE:
      return {
        ...state,
        loading: false,
        failed: false,
        success: false,
        error: action.payload,
        data: [],
      };

    default:
      return state;
  }
};

const itemCode = {
  itemCode: null,
  loading: false,
  error: null,
  success: null,
  errormsg: null,
};

export const getItemCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ITEM_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        itemCode: action.payload,
        errormsg: null,
      };

    case GET_ITEM_CODE_VaLIDATION_ERROR:
      return {
        ...state,
        loading: false,
        errormsg: action.payload,
      };
    case GET_ITEM_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        itemCode: action.payload,
      };
    case REMOVE_DATA_REQUEST:
      return {
        ...state,
        itemCode: null,
        loading: false,
        error: null,
      };
    case REMOVE_CODE_REQUEST:
      return {
        ...state,
        itemCode: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

const popularItem = {
  popularItems: [],
  loading: false,
  error: null,
};

export const getPopularItemReducer = (state = popularItem, action) => {
  switch (action.type) {
    case GET_POPULAR_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_POPULAR_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        popularItems: action.payload,
      };
    case GET_POPULAR_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const selectedMockData = {
  data: [],
};

export const selectedMockDataReducer = (state = selectedMockData, action) => {
  switch (action.type) {
    case SELECTED_MOCKDATA_REQUEST:
      return {
        ...state,
        data: action?.payload,
      };
    case REMOVE_DATA_REQUEST:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

const menuData = {
  menuData: {},
  loading: false,
  error: null,
};

export const partialUpdatemenuReducer = (state = menuData, action) => {
  switch (action.type) {
    case PARTIAL_UPDATE_MENU_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PARTIAL_UPDATE_MENU_SUCCESS:
      return {
        ...state,
        loading: false,
        menuData: action.payload,
        error: null,
      };

    case PARTIAL_UPDATE_MENU_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const CatagoryData = {
  data: [],
};

export const storeDataReducer = (state = CatagoryData, action) => {
  switch (action.type) {
    case STORE_DATA_WITH_CATEGORY:
      return {
        ...state,
        data: action?.payload,
      };

    default:
      return state;
  }
};
