import {Apidatas, primarypagereducer} from './reducer'
import { combineReducers } from 'redux'
import { itemCustomizationsReducer } from "./reducer";
import { PricingDetailReducer } from './reducer';


export const rootReducer=combineReducers({
    primarypage:primarypagereducer,
    itemCustomizationsReducer1:itemCustomizationsReducer,
    PricingDetailReducer:PricingDetailReducer,
    Apireducer:Apidatas
})



