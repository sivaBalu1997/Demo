import { call, put } from "redux-saga/effects"
import { GetExploreFooterImgRequest, GetExploreFooterImgSuccess, GetExploreVideoRequest, GetExploreVideoSuccess, GetFoodImgRequest, GetFoodImgSuccess, GetFullMenuVideoRequest, GetFullMenuVideoSuccess, GetHappyCustomerRequest, GetHappyCustomerSuccess, GetLoyaltyImgRequest, GetLoyaltyImgSuccess, GetRestaurantInfrastructureRequest, GetRestaurantInfrastructureSuccess, GetRestaurantLogoRequest, GetRestaurantLogoSuccess, GetRestaurantVideoRequest, GetRestaurantVideoSuccess, GetWelcomeBgImgRequest, GetWelcomeBgImgSuccess, PostExploreFooterImageFailure, PostExploreFooterImageSuccess, PostExploreVideoFailure, PostExploreVideoSuccess, PostFoodImageFailure, PostFoodImageSuccess, PostFullMenuVideoFailure, PostFullMenuVideoSuccess, PostHappyCustomerImageFailure, PostHappyCustomerImageSuccess, PostInfrastructureImageFailure, PostInfrastructureImageSuccess, PostLoyaltyImageFailure, PostLoyaltyImageSuccess, PostRestaurantLogoFailure, PostRestaurantLogoSuccess, PostRestaurantVideoFailure, PostRestaurantVideoSuccess, PostWelcomeBgImgFailure, PostWelcomeBgImgSuccess } from "../actions/cmsActions"
import { GET_EXPLORE_FOOTEIMAGE_FAILURE, GET_EXPLORE_FOOTER_IMAGE_FAILURE, GET_EXPLORE_VIDEO_FAILURE, GET_FULL_MENU_VIDEO_FAILURE, GET_HAPPY_CUSTOMER_IMAGE_FAILURE, GET_LOYALTY_IMAGE_FAILURE, GET_RESTAURANT_FOOD_IMAGE_FAILURE, GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, GET_RESTAURANT_LOGO_FAILURE, GET_RESTAURANT_VIDEO_FAILURE, GET_WELCOME_BG_IMAGE_FAILURE } from "../constants/cmsConstants"
import { GetAPI, PostAPI } from "../api/cmsAPI"

//Welcome Page
//Post Method
export function* PostWelcomeBgImage(action) {
    
    try {
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if (response.status === 200) {
            yield put(PostWelcomeBgImgSuccess(response))
            yield put(GetWelcomeBgImgRequest()) 
        }
    } catch (error) {
        yield put(PostWelcomeBgImgFailure(error.message))
    }
}

export function* PostRestaurantLogo(action) {
    try {
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if (response.status === 200) {
            yield put(PostRestaurantLogoSuccess(response))
            yield put(GetRestaurantLogoRequest()) 
        }
    } catch (error) {
        yield put(PostRestaurantLogoFailure(error.message))
    }
}

//GET Method
export function* GetWelcomeBgImage() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const wdata = yield response.data
            // console.log("Data from GET:", data)
            if (wdata) {
                const filteredData = wdata.filter(item => item.entityType === 'div1')
                yield put(GetWelcomeBgImgSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_WELCOME_BG_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_WELCOME_BG_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetRestaurantLogo() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const rdata = yield response.data
            if (rdata) {
                const filteredData = rdata.filter(item => item.entityType === 'div2')
                yield put(GetRestaurantLogoSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_RESTAURANT_LOGO_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_RESTAURANT_LOGO_FAILURE, payload: error.message })
        console.error(error)
    }
}

//Restaurant Info
//Post Method
export function* PostRestaurantvideo(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostRestaurantVideoSuccess(response))
            yield put(GetRestaurantVideoRequest())
        }
    } catch(error){
        yield put(PostRestaurantVideoFailure(error.message))
    }
}

export function* PostFoodImg(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostFoodImageSuccess(response))
            yield put(GetFoodImgRequest())
        }
    } catch(error){
        yield put(PostFoodImageFailure(error.message))
    }
}

export function* PostInfrastructureImg(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostInfrastructureImageSuccess(response))
            yield put(GetRestaurantInfrastructureRequest())
        }
    }catch(error){
        yield put(PostInfrastructureImageFailure(error.message))
    }
}

export function* PostHappyCustomerImg(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostHappyCustomerImageSuccess(response))
            yield put(GetHappyCustomerRequest())
        }
    }catch(error){
        yield put(PostHappyCustomerImageFailure(error.message))
    }
}

export function* PostLoyaltyImg(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostLoyaltyImageSuccess(response))
            yield put(GetLoyaltyImgRequest())
        }
    }catch(error){
        yield put(PostLoyaltyImageFailure(error.message))
    }
}

//Get Method
export function* GetRestaurantVideo() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            // console.log("Data from GET:", data)
            if (data) {
                const filteredData = data.filter(item => item.entityType === 'div3')
                yield put(GetRestaurantVideoSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_RESTAURANT_VIDEO_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_RESTAURANT_VIDEO_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetRestaurantFoodImage() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = data.filter(item => item.entityType === 'div4')
                yield put(GetFoodImgSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_RESTAURANT_FOOD_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_RESTAURANT_FOOD_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetRestaurantInfrastructureImage() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = data.filter(item => item.entityType === 'div5')
                yield put(GetRestaurantInfrastructureSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_RESTAURANT_INFRASTRUCTURE_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetHappyCustomer() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                // Filter data for both entity types
                const div6Data = data.filter((item) => item.entityType === 'div6')
                const div7Data = data.filter((item) => item.entityType === 'div7')
                // Concatenate both arrays
                const happyCustomerData = [...div6Data, ...div7Data]
                yield put(GetHappyCustomerSuccess(happyCustomerData))
              }
        } else {
            yield put({ type: GET_HAPPY_CUSTOMER_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_HAPPY_CUSTOMER_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetLoyaltyImage() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = data.filter(item => item.entityType === 'div8')
                yield put(GetLoyaltyImgSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_LOYALTY_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_LOYALTY_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

//Explore Menu
//Post
export function* PostExploreVideo(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostExploreVideoSuccess(response))
            yield put(GetExploreVideoRequest())
        }
    } catch(error){
        yield put(PostExploreVideoFailure(error.message))
    }
}

export function* PostExploreFooterImg(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostExploreFooterImageSuccess(response.data))
            yield put(GetExploreFooterImgRequest())
        }
    } catch(error){
        yield put(PostExploreFooterImageFailure(error.message))
    }
}

//Get
export function* GetExploreVideo() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = yield data.filter(item => item.entityType === 'div9')
                yield put(GetExploreVideoSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_EXPLORE_VIDEO_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_EXPLORE_VIDEO_FAILURE, payload: error.message })
        console.error(error)
    }
}

export function* GetExploreFooterImg() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = yield data.filter(item => item.entityType === 'div10')
                yield put(GetExploreFooterImgSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_EXPLORE_FOOTER_IMAGE_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_EXPLORE_FOOTER_IMAGE_FAILURE, payload: error.message })
        console.error(error)
    }
}

//Full Menu
//Post
export function* PostFullMenu(action){
    try{
        const payload = action.payload
        const response = yield call(PostAPI, payload)
        if(response.status === 200){
            yield put(PostFullMenuVideoSuccess(response))
            yield put(GetFullMenuVideoRequest())
        }
    } catch(error){
        yield put(PostFullMenuVideoFailure(error.message))
    }
}

//Get
export function* GetFullMenuVideo() {
    try {
        const response = yield call(GetAPI)
        if (response.status === 200) {
            const data = yield response.data
            if (data) {
                const filteredData = data.filter(item => item.entityType === 'div11')
                yield put(GetFullMenuVideoSuccess(filteredData))
            }
        } else {
            yield put({ type: GET_FULL_MENU_VIDEO_FAILURE })
        }
    } catch (error) {
        yield put({ type: GET_FULL_MENU_VIDEO_FAILURE, payload: error.message })
        console.error(error)
    }
}