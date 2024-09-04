import {
  Primary_Post_Data_Send,
  Primary_Post_Data_Success,
  Primary_Post_Data_Failure,
  Item_Customizations_Data_Request,
  Item_Customizations_Data_Success,
  Item_Customizations_Data_Failure,
  Pricing_Detail_Data_Request,
  Pricing_Detail_Data_Success,
  Pricing_Detail_Data_Failure,
  API_Request,
  API_Success,
  API_Failure
} from "./constans";

const primarypagedata = {
  data: [],
  loading: false,
  error: null,
};

export const primarypagereducer = (state = primarypagedata, action) => {
  switch (action.type) {
    case Primary_Post_Data_Send:
      return {  ...state,data:action.payload }; 
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
      return {  ...state,itemData:action.payload }; 
    default:
      return state;
  }
};



const PricingDetailPage = {
  prizingData: [],
};

export const PricingDetailReducer=(state=PricingDetailPage,action)=>{
  switch(action.type)
  {
    case Pricing_Detail_Data_Request:
    return{...state,prizingData:action?.payload};
    
    default:
      return state;
  }
}

const Apidata={
  data:[],
  loading:false,
  error:null
}

export const Apidatas = (state = Apidata, action) => {
  switch (action.type) {
    case API_Request:

    return { ...state, loading: true, error: null };
      

    case API_Success:
      return { ...state, loading: false, data: action.payload };
      
    case API_Failure:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};