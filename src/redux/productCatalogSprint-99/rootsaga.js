
import { all } from "redux-saga/effects";
import { itemCustomizationData,PricingDetailData } from "./saga";

import {watchPostprimary} from './saga'



export default function* rootSaga() {
    yield all([
        watchPostprimary(),
    ]);
  }
