import { GET_EXPLORE_FOOTER_IMAGE_FAILURE, GET_EXPLORE_FOOTER_IMAGE_REQUEST, GET_EXPLORE_FOOTER_IMAGE_SUCCESS, 
         GET_EXPLORE_VIDEO_FAILURE, GET_EXPLORE_VIDEO_REQUEST, GET_EXPLORE_VIDEO_SUCCESS, 
         GET_FULL_MENU_VIDEO_FAILURE, GET_FULL_MENU_VIDEO_REQUEST, GET_FULL_MENU_VIDEO_SUCCESS, 
         GET_HAPPY_CUSTOMER_IMAGE_FAILURE, GET_HAPPY_CUSTOMER_IMAGE_REQUEST, GET_HAPPY_CUSTOMER_IMAGE_SUCCESS, 
         GET_LOYALTY_IMAGE_FAILURE, GET_LOYALTY_IMAGE_REQUEST, GET_LOYALTY_IMAGE_SUCCESS, 
         GET_RESTAURANT_FOOD_IMAGE_FAILURE, GET_RESTAURANT_FOOD_IMAGE_REQUEST, 
         GET_RESTAURANT_FOOD_IMAGE_SUCCESS, GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, GET_RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST, 
         GET_RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS, GET_RESTAURANT_LOGO_FAILURE, GET_RESTAURANT_LOGO_REQUEST, 
         GET_RESTAURANT_LOGO_SUCCESS, GET_RESTAURANT_VIDEO_FAILURE, GET_RESTAURANT_VIDEO_REQUEST, 
         GET_RESTAURANT_VIDEO_SUCCESS, GET_WELCOME_BG_IMAGE_FAILURE, GET_WELCOME_BG_IMAGE_REQUEST, 
         GET_WELCOME_BG_IMAGE_SUCCESS, HAPPY_CUSTOMER_IMAGE_FAILURE, HAPPY_CUSTOMER_IMAGE_REQUEST, 
         HAPPY_CUSTOMER_IMAGE_SUCCESS, LOYALTY_IMAGE_FAILURE, LOYALTY_IMAGE_REQUEST, LOYALTY_IMAGE_SUCCESS, 
         RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST, 
         RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS, SAVE_EXPLORE_FOOTER_IMAGE_FAILURE, SAVE_EXPLORE_FOOTER_IMAGE_REQUEST, 
         SAVE_EXPLORE_FOOTER_IMAGE_SUCCESS, SAVE_EXPLORE_VIDEO_FAILURE, SAVE_EXPLORE_VIDEO_REQUEST, 
         SAVE_EXPLORE_VIDEO_SUCCESS, SAVE_FULL_MENU_VIDEO_FAILURE, SAVE_FULL_MENU_VIDEO_REQUEST, 
         SAVE_FULL_MENU_VIDEO_SUCCESS, SAVE_RESTAURANT_FOOD_IMAGE_FAILURE, SAVE_RESTAURANT_FOOD_IMAGE_REQUEST, 
         SAVE_RESTAURANT_FOOD_IMAGE_SUCCESS, SAVE_RESTAURANT_LOGO_FAILURE, SAVE_RESTAURANT_LOGO_REQUEST, 
         SAVE_RESTAURANT_LOGO_SUCCESS, SAVE_RESTAURANT_VIDEO_FAILURE, SAVE_RESTAURANT_VIDEO_REQUEST, 
         SAVE_RESTAURANT_VIDEO_SUCCESS, SAVE_WELCOME_BG_IMAGE_FAILURE, SAVE_WELCOME_BG_IMAGE_REQUEST, 
         SAVE_WELCOME_BG_IMAGE_SUCCESS } from "../constants/cmsConstants"

const initialState = {
    welcomeBgImg: [],
    restaurantLogo: [],
    restaurantVideo: [],
    restaurantFoodImg: [],
    restaurantInfrastructureimg: [],
    happyCustomerImg: [],
    loyaltyImg: [],
    exploreVideo: [],
    exploreFooterImg: [],
    fullMenuVideo: [],
    feedbackImg: []
}   

export const contentImageReducer = (state = initialState, action) => {
switch(action.type){
    //WelcomPage
    //Post
    case SAVE_WELCOME_BG_IMAGE_REQUEST:
        return {
            ...state,
            isLoading: true,
            welcomeBgImg: action.payload,
        }
    case SAVE_WELCOME_BG_IMAGE_SUCCESS: return {
        ...state,
        isLoading: false,
        welcomeBgImg: action.payload,
    }
    case SAVE_WELCOME_BG_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_WELCOME_BG_IMAGE_REQUEST:return{
        ...state,
        isLoading: true,
    } 
    case GET_WELCOME_BG_IMAGE_SUCCESS:
        return {
            ...state,
            isLoading: false,
            welcomeBgImg: action.payload,
        }

    case GET_WELCOME_BG_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    //Post
    case SAVE_RESTAURANT_LOGO_REQUEST: return {
        ...state,
        isLoading: true,
        restaurantLogo: action.payload,
    }

    case SAVE_RESTAURANT_LOGO_SUCCESS: return{
        ...state,
        isLoading: false,
        restaurantLogo: action.payload,
    }

    case SAVE_RESTAURANT_LOGO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    
    //GET
    case GET_RESTAURANT_LOGO_REQUEST: return{
        ...state,
        isLoading: true,
    }

    case GET_RESTAURANT_LOGO_SUCCESS: return{
        ...state,
        isLoading: false,
        restaurantLogo: action.payload,
    }

    case GET_RESTAURANT_LOGO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //RestaurantVideo
    //Post
    case SAVE_RESTAURANT_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
        restaurantVideo: action.payload,
    }
    case SAVE_RESTAURANT_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        restaurantVideo: action.payload,
    }
    case SAVE_RESTAURANT_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //GET
    case GET_RESTAURANT_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_RESTAURANT_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        restaurantVideo: action.payload,
    }

    case GET_RESTAURANT_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    //Post
    case SAVE_RESTAURANT_FOOD_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
        restaurantFoodImg: action.payload,
    }
    case SAVE_RESTAURANT_FOOD_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        restaurantFoodImg: action.payload,
    }
    case SAVE_RESTAURANT_FOOD_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_RESTAURANT_FOOD_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_RESTAURANT_FOOD_IMAGE_SUCCESS: return{
        ...state,
        isLoading: false,
        restaurantFoodImg: action.payload,
    }

    case GET_RESTAURANT_FOOD_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    //Post
    case RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
        restaurantInfrastructureimg: action.payload,
    }
    case RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        restaurantInfrastructureimg: action.payload,
    }
    case RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        restaurantInfrastructureimg: action.payload,
    }

    case GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    //Post
    case HAPPY_CUSTOMER_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
        happyCustomerImg: action.payload,
    }
    case HAPPY_CUSTOMER_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        happyCustomerImg: action.payload,
    }
    case HAPPY_CUSTOMER_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_HAPPY_CUSTOMER_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_HAPPY_CUSTOMER_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        happyCustomerImg: action.payload,
    }

    case GET_HAPPY_CUSTOMER_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    //Post
    case LOYALTY_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
        loyaltyImg: action.payload,
    }
    case LOYALTY_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        loyaltyImg: action.payload,
    }
    case LOYALTY_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_LOYALTY_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_LOYALTY_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        loyaltyImg: action.payload,
    }

    case GET_LOYALTY_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //ExploreMenu
    //Post
    case SAVE_EXPLORE_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
        exploreVideo: action.payload,
    }
    case SAVE_EXPLORE_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        exploreVideo: action.payload,
    }
    case SAVE_EXPLORE_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_EXPLORE_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_EXPLORE_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        exploreVideo: action.payload,
    }

    case GET_EXPLORE_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }


    //Post
    case SAVE_EXPLORE_FOOTER_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
        exploreFooterImg: action.payload,
    }
    case SAVE_EXPLORE_FOOTER_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        exploreFooterImg: action.payload,
    }
    case SAVE_EXPLORE_FOOTER_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_EXPLORE_FOOTER_IMAGE_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_EXPLORE_FOOTER_IMAGE_SUCCESS: return{
        ...state,
        isLoading: true,
        exploreFooterImg: action.payload,
    }

    case GET_EXPLORE_FOOTER_IMAGE_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //FullMenu
    //Post
    case SAVE_FULL_MENU_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
        fullMenuVideo: action.payload,
    }
    case SAVE_FULL_MENU_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        fullMenuVideo: action.payload,
    }
    case SAVE_FULL_MENU_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }

    //Get
    case GET_FULL_MENU_VIDEO_REQUEST: return{
        ...state,
        isLoading: false,
    }

    case GET_FULL_MENU_VIDEO_SUCCESS: return{
        ...state,
        isLoading: true,
        fullMenuVideo: action.payload,
    }

    case GET_FULL_MENU_VIDEO_FAILURE: return{
        ...state,
        isLoading: false,
        error: action.payload
    }
    
    default : return state
}
}