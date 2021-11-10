import { fork } from "redux-saga/effects";
import marketSaga from "./modules/market";

export default function* rootSaga() {
  yield fork(marketSaga);
}
