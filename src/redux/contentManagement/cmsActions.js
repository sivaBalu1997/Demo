import { GET_EXPLORE_FOOTER_IMAGE_FAILURE, GET_EXPLORE_FOOTER_IMAGE_REQUEST, GET_EXPLORE_FOOTER_IMAGE_SUCCESS, 
         GET_EXPLORE_VIDEO_FAILURE, GET_EXPLORE_VIDEO_REQUEST, GET_EXPLORE_VIDEO_SUCCESS, 
         GET_FEEDBACK_IMAGE_FAILURE, GET_FEEDBACK_IMAGE_REQUEST, GET_FEEDBACK_IMAGE_SUCCESS, 
         GET_FULL_MENU_VIDEO_FAILURE, GET_FULL_MENU_VIDEO_REQUEST, GET_FULL_MENU_VIDEO_SUCCESS, 
         GET_HAPPY_CUSTOMER_IMAGE_FAILURE, GET_HAPPY_CUSTOMER_IMAGE_REQUEST, GET_HAPPY_CUSTOMER_IMAGE_SUCCESS, 
         GET_LOYALTY_IMAGE_FAILURE, GET_LOYALTY_IMAGE_REQUEST, GET_LOYALTY_IMAGE_SUCCESS, 
         GET_RESTAURANT_FOOD_IMAGE_FAILURE, GET_RESTAURANT_FOOD_IMAGE_REQUEST, GET_RESTAURANT_FOOD_IMAGE_SUCCESS, 
         GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, GET_RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST, GET_RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS, 
         GET_RESTAURANT_LOGO_FAILURE, GET_RESTAURANT_LOGO_REQUEST, GET_RESTAURANT_LOGO_SUCCESS, 
         GET_RESTAURANT_VIDEO_FAILURE, GET_RESTAURANT_VIDEO_REQUEST, GET_RESTAURANT_VIDEO_SUCCESS,
         GET_WELCOME_BG_IMAGE_FAILURE, GET_WELCOME_BG_IMAGE_REQUEST, GET_WELCOME_BG_IMAGE_SUCCESS, 
         HAPPY_CUSTOMER_IMAGE_FAILURE, HAPPY_CUSTOMER_IMAGE_REQUEST, HAPPY_CUSTOMER_IMAGE_SUCCESS, 
         LOYALTY_IMAGE_FAILURE, LOYALTY_IMAGE_REQUEST, LOYALTY_IMAGE_SUCCESS, 
         RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST, RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS, 
         SAVE_EXPLORE_FOOTER_IMAGE_FAILURE, SAVE_EXPLORE_FOOTER_IMAGE_REQUEST, SAVE_EXPLORE_FOOTER_IMAGE_SUCCESS, 
         SAVE_EXPLORE_VIDEO_FAILURE, SAVE_EXPLORE_VIDEO_REQUEST, SAVE_EXPLORE_VIDEO_SUCCESS, 
         SAVE_FEEDBACK_IMAGE_FAILURE, SAVE_FEEDBACK_IMAGE_REQUEST, SAVE_FEEDBACK_IMAGE_SUCCESS, 
         SAVE_FULL_MENU_VIDEO_FAILURE, SAVE_FULL_MENU_VIDEO_REQUEST, SAVE_FULL_MENU_VIDEO_SUCCESS, 
         SAVE_RESTAURANT_FOOD_IMAGE_FAILURE, SAVE_RESTAURANT_FOOD_IMAGE_REQUEST, SAVE_RESTAURANT_FOOD_IMAGE_SUCCESS, 
         SAVE_RESTAURANT_LOGO_FAILURE, SAVE_RESTAURANT_LOGO_REQUEST, SAVE_RESTAURANT_LOGO_SUCCESS, 
         SAVE_RESTAURANT_VIDEO_FAILURE, SAVE_RESTAURANT_VIDEO_REQUEST, SAVE_RESTAURANT_VIDEO_SUCCESS, 
         SAVE_WELCOME_BG_IMAGE_FAILURE, SAVE_WELCOME_BG_IMAGE_REQUEST, SAVE_WELCOME_BG_IMAGE_SUCCESS } from "../../redux/contentManagement/cmsConstants"

//WelcomePage
export const PostWelcomeBgImgRequest = (payload) => ({
    type: SAVE_WELCOME_BG_IMAGE_REQUEST,
    payload: payload,
})

export const PostWelcomeBgImgSuccess = (response) => ({
    type: SAVE_WELCOME_BG_IMAGE_SUCCESS,
    payload: response,
})

export const PostWelcomeBgImgFailure = (error) => ({
    type: SAVE_WELCOME_BG_IMAGE_FAILURE,
    payload: error
})

export const PostRestaurantLogoRequest = (payload) => ({
    type: SAVE_RESTAURANT_LOGO_REQUEST,
    payload: payload
})

export const PostRestaurantLogoSuccess = (response) => ({
    type: SAVE_RESTAURANT_LOGO_SUCCESS,
    payload: response,
})

export const PostRestaurantLogoFailure = (error) => ({
    type: SAVE_RESTAURANT_LOGO_FAILURE,
    payload: error,
})

//RestaurantInfo
export const PostRestaurantVideoRequest = (payload) => ({
    type: SAVE_RESTAURANT_VIDEO_REQUEST,
    payload: payload,
})

export const PostRestaurantVideoSuccess = (response) => ({
    type: SAVE_RESTAURANT_VIDEO_SUCCESS,
    payload: response,
})

export const PostRestaurantVideoFailure = (error) => ({
    type: SAVE_RESTAURANT_VIDEO_FAILURE,
    payload: error,
})

export const PostFoodImageRequest = (payload) => ({
    type: SAVE_RESTAURANT_FOOD_IMAGE_REQUEST,
    payload: payload,
})

export const PostFoodImageSuccess = (response) => ({
    type: SAVE_RESTAURANT_FOOD_IMAGE_SUCCESS,
    payload: response,
})

export const PostFoodImageFailure = (error) => ({
    type: SAVE_RESTAURANT_FOOD_IMAGE_FAILURE,
    payload: error,
})

export const PostHappyCustomerImageRequest = (payload) => ({
    type: HAPPY_CUSTOMER_IMAGE_REQUEST,
    payload: payload,
})

export const PostHappyCustomerImageSuccess = (response) => ({
    type: HAPPY_CUSTOMER_IMAGE_SUCCESS,
    payload: response,
})

export const PostHappyCustomerImageFailure = (error) => ({
    type: HAPPY_CUSTOMER_IMAGE_FAILURE,
    payload: error,
})

export const PostInfrastructureImageRequest = (payload) => ({
    type: RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST,
    payload: payload,
})

export const PostInfrastructureImageSuccess = (response) => ({
    type: RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS,
    payload: response,
})

export const PostInfrastructureImageFailure = (error) => ({
    type: RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE,
    payload: error,
})

export const PostLoyaltyImageRequest = (payload) => ({
    type: LOYALTY_IMAGE_REQUEST,
    payload: payload,
})

export const PostLoyaltyImageSuccess = (response) => ({
    type: LOYALTY_IMAGE_SUCCESS,
    payload: response,
})

export const PostLoyaltyImageFailure = (error) => ({
    type: LOYALTY_IMAGE_FAILURE,
    payload: error,
})

//ExploreMenu
export const PostExploreVideoRequest = (payload) => ({
    type: SAVE_EXPLORE_VIDEO_REQUEST,
    payload: payload,
})

export const PostExploreVideoSuccess = (response) => ({
    type: SAVE_EXPLORE_VIDEO_SUCCESS,
    payload: response,
})

export const PostExploreVideoFailure = (error) => ({
    type: SAVE_EXPLORE_VIDEO_FAILURE,
    payload: error,
})

export const PostExploreFooterImageRequest = (payload) => ({
    type: SAVE_EXPLORE_FOOTER_IMAGE_REQUEST,
    payload: payload,
})

export const PostExploreFooterImageSuccess = (response) => ({
    type: SAVE_EXPLORE_FOOTER_IMAGE_SUCCESS,
    payload: response,
})

export const PostExploreFooterImageFailure = (error) => ({
    type: SAVE_EXPLORE_FOOTER_IMAGE_FAILURE,
    payload: error,
})

//FullMenu
export const PostFullMenuVideoRequest = (payload) => ({
    type: SAVE_FULL_MENU_VIDEO_REQUEST,
    payload: payload,
})

export const PostFullMenuVideoSuccess = (response) => ({
    type: SAVE_FULL_MENU_VIDEO_SUCCESS,
    payload: response,
})

export const PostFullMenuVideoFailure = (error) => ({
    type: SAVE_FULL_MENU_VIDEO_FAILURE,
    payload: error,
})

//Feedback
export const PostFeedbackImageRequest = (payload) => ({
    type: SAVE_FEEDBACK_IMAGE_REQUEST,
    payload: payload,
})

export const PostFeedbackImageSuccess = (response) => ({
    type: SAVE_FEEDBACK_IMAGE_SUCCESS,
    payload: response,
})

export const PostFeedbackImageFailure = (error) => ({
    type: SAVE_FEEDBACK_IMAGE_FAILURE,
    payload: error,
})

//GET
//WelcomePage
export const GetWelcomeBgImgRequest = () => ({
    type: GET_WELCOME_BG_IMAGE_REQUEST,
})

export const GetWelcomeBgImgSuccess = (response) => ({
    type: GET_WELCOME_BG_IMAGE_SUCCESS,
    payload: response,
})

export const GetWelcomeBgImgFailure = (error) => ({
    type: GET_WELCOME_BG_IMAGE_FAILURE,
    payload: error
})

export const GetRestaurantLogoRequest = () => ({
    type: GET_RESTAURANT_LOGO_REQUEST,
})

export const GetRestaurantLogoSuccess = (response) => ({
    type: GET_RESTAURANT_LOGO_SUCCESS,
    payload: response,
})

export const GetRestaurantLogoFailure = (error) => ({
    type: GET_RESTAURANT_LOGO_FAILURE,
    payload: error
})

//Restaurant Info
export const GetRestaurantVideoRequest = () => ({
    type: GET_RESTAURANT_VIDEO_REQUEST,
})

export const GetRestaurantVideoSuccess = (response) => ({
    type: GET_RESTAURANT_VIDEO_SUCCESS,
    payload: response,
})

export const GetRestaurantVideoFailure = (error) => ({
    type: GET_RESTAURANT_VIDEO_FAILURE,
    payload: error
})

export const GetFoodImgRequest = () => ({
    type: GET_RESTAURANT_FOOD_IMAGE_REQUEST,
})

export const GetFoodImgSuccess = (response) => ({
    type: GET_RESTAURANT_FOOD_IMAGE_SUCCESS,
    payload: response,
})

export const GetFoodImgFailure = (error) => ({
    type: GET_RESTAURANT_FOOD_IMAGE_FAILURE,
    payload: error
})

export const GetRestaurantInfrastructureRequest = () => ({
    type: GET_RESTAURANT_INFRASTRUCTURE_IMAGE_REQUEST,
})

export const GetRestaurantInfrastructureSuccess = (response) => ({
    type: GET_RESTAURANT_INFRASTRUCTURE_IMAGE_SUCCESS,
    payload: response,
})

export const GetRestaurantInfrastructureFailure = (error) => ({
    type: GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE,
    payload: error
})

export const GetHappyCustomerRequest = () => ({
    type: GET_HAPPY_CUSTOMER_IMAGE_REQUEST,
})

export const GetHappyCustomerSuccess = (response) => ({
    type: GET_HAPPY_CUSTOMER_IMAGE_SUCCESS,
    payload: response,
})

export const GetHappyCustomerFailure = (error) => ({
    type: GET_HAPPY_CUSTOMER_IMAGE_FAILURE,
    payload: error
})

export const GetLoyaltyImgRequest = () => ({
    type: GET_LOYALTY_IMAGE_REQUEST,
})

export const GetLoyaltyImgSuccess = (response) => ({
    type: GET_LOYALTY_IMAGE_SUCCESS,
    payload: response,
})

export const GetLoyaltyImgFailure = (error) => ({
    type: GET_LOYALTY_IMAGE_FAILURE,
    payload: error
})


//ExploreMenu
export const GetExploreVideoRequest = () => ({
    type: GET_EXPLORE_VIDEO_REQUEST,
})

export const GetExploreVideoSuccess = (response) => ({
    type: GET_EXPLORE_VIDEO_SUCCESS,
    payload: response,
})

export const GetExploreVideoFailure = (error) => ({
    type: GET_EXPLORE_VIDEO_FAILURE,
    payload: error
})

export const GetExploreFooterImgRequest = () => ({
    type: GET_EXPLORE_FOOTER_IMAGE_REQUEST,
})

export const GetExploreFooterImgSuccess = (response) => ({
    type: GET_EXPLORE_FOOTER_IMAGE_SUCCESS,
    payload: response,
})

export const GetExploreFooterImgFailure = (error) => ({
    type: GET_EXPLORE_FOOTER_IMAGE_FAILURE,
    payload: error
})


//Fullmenu
export const GetFullMenuVideoRequest = () => ({
    type: GET_FULL_MENU_VIDEO_REQUEST,
})

export const GetFullMenuVideoSuccess = (response) => ({
    type: GET_FULL_MENU_VIDEO_SUCCESS,
    payload: response,
})

export const GetFullMenuVideoFailure = (error) => ({
    type: GET_FULL_MENU_VIDEO_FAILURE,
    payload: error
})


//Feedback
export const GetFeedbackImgRequest = () => ({
    type: GET_FEEDBACK_IMAGE_REQUEST,
})

export const GetFeedbackImgSuccess = (response) => ({
    type: GET_FEEDBACK_IMAGE_SUCCESS,
    payload: response,
})

export const GetFeedbackImgFailure = (error) => ({
    type: GET_FEEDBACK_IMAGE_FAILURE,
    payload: error
})
