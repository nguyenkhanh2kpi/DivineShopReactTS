import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { accountReducer } from "./account/reducers";
import softwareReducer from '../store/software/productSlice' 
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";
import searchSlice from "./search/searchSlice";


const persistCongig = {
    key: 'root',
    storage,
    whilelist: ['account'],
}

const rootReducer = combineReducers({
    account: accountReducer,
    software: softwareReducer,
    search: searchSlice,
});

const persistedReducer = persistReducer(persistCongig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer
});

export const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
