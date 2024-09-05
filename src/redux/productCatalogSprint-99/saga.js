import {
    Primary_Post_Data_Send,
    Primary_Post_Data_Success,
    Primary_Post_Data_Failure,
    API_Request
  } from "./constans";

  
  import { itemCustomizationAPI ,primarypageAPI,PricingDetailApi} from "./Api";

  import { Item_Customizations_Data_Request, Item_Customizations_Data_Success } from "./constans";
  import { Pricing_Detail_Data_Request,Pricing_Detail_Data_Success } from "./constans";
  import { takeEvery, call, put } from 'redux-saga/effects';
  import {primarypost,primarysuccess,primaryfailure,ApiSuccess,ApiFailure}from './Actions'


  // const data=
  // {
  //   locationId:"9c485244-afd4-11eb-b6c7-42010a010026",
  //   itemCode:primarydetailsdata.itemCode,
  //   altName:"alt name",
  //   itemName:primarydetailsdata.itemName,
  //   description:primarydetailsdata.description,
  //   price:"12",
  //   categoryId:primarydetailsdata.categoryId,
  //   subCategoryId:"",
  //   kitchenStations:["3bdfa61-0e4f-48e6-b2bb-b4bd1d103950"],
  //   taxFeeId:"",
  //   ingredients:["03348389-4b2a-4fca-affa-6ad4291b0241"],
  //   modifiers:[],
  //   availabilityId:["b1492143-2c4c-4a4f-bc49-a3b99cbb1349"],
  //   category:primarydetailsdata.category,
  //   subCategory:primarydetailsdata.subCategory,
  //   itemId:null
  // }

  function* postprimary(action) {
    try{
      // const payload=action.payload;
      const response= yield call(primarypageAPI,action.payload)
  if(response.status===200 ||response.status===201)
  {
    yield put(ApiSuccess(response.data));
  } else {
    yield put(ApiFailure(response.statusText));
  }

  
  
      // yield put(primarysuccess(payload));
      // console.log("Posted Successfully");


  }catch (error) {
  }
  }


  
// function* postData(action) {
//   try {
//     const response = yield call(postOutletRegistration, action.payload);

//     if (response.status === 200) {
//       console.log("response fro pm ",response.data)
//       yield put(postDataSuccess(response.data));
//     } else {
//       yield put(postDataFailure(response.statusText));
//     }
//   } catch (error) {
//  }
// }

 




// function* postItemCustomization(action){
//   try {
//     const payload = action.payload;
//     const response = yield call(itemCustomizationAPI, payload);
//     console.log("Response received:", response);

//     if (response && response.data) {
//       console.log("Posted Successfully");
//       yield put({ type: "Item_Customizations_Data_Success", payload: response.data   });
//     } else {
//       throw new Error("Response data is undefined");
//     }
//   } catch (error) {
//     console.error("Failed to post:", error);
//     yield put({ type: "Item_Customizations_Data_Failure", error: error.message || error });
//   }
// } 


// function* postPricingDetail(action){
//   try{
//       const payload=action.payload;
//       const response= yield call(PricingDetailApi,payload)
//       console.log("Posted Successfully");
//       yield put({type:"Pricing_Detail_Data_Success"  , payload: response.data});
//       console.log("Posted Successfully");
//   }catch (error) {
//   }
// }

export function* watchPostprimary() {
    yield takeEvery(API_Request, postprimary);


  }
// export function* itemCustomizationData() {
//     yield takeEvery(Item_Customizations_Data_Request,postItemCustomization);
//   }
  // export function* PricingDetailData() {
  //   yield takeEvery(Pricing_Detail_Data_Request,postPricingDetail);
  // }