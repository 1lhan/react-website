import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Slices/productSlice';
import urunyazdirReducer from './Slices/addcartSlice';
import auth from './Slices/authSlice';
import slider from "./Slices/sliderSlice"
import pDetails from './Slices/productDetailsSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: urunyazdirReducer,
        auth: auth,
        slider: slider,
        pDetails: pDetails
    },

})

export default store;