import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./modules/market";
import userNameReducer from "./modules/user";
import rootSaga from "../middleware";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    market: marketReducer,
    user: userNameReducer,
  },
  middleware: [sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
