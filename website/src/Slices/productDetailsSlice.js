import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const productDetailsPageFunc = createAsyncThunk('productDetailsSlice/productDetailsPageFunc', async (dispatch, getState) => {
    return await fetch('/data.json').then((res) => res.json())
})

const productDetailsSlice = createSlice({
    name: "productDetailsSlice",
    initialState: {
        status: null,
        products: [],
        productTitles: [],
        productDetailsPageProduct: {},
        pagePathControl: false,
        compareArray: [],
    },
    extraReducers: {
        [productDetailsPageFunc.pending]: (state, action) => {
            state.status = 'loading';
        },
        [productDetailsPageFunc.fulfilled]: (state, action) => {
            state.status = 'success';
            state.products = action.payload;

            state.productTitles = [];

            for (let i in state.products) {
                state.productTitles.push(state.products[i].title);
            }
            state.productTitles = [...new Set(state.productTitles)];

            for (let i in state.productTitles) {
                if (window.location.pathname.replace("/product/", "").replaceAll("-", " ") === state.productTitles[i]) {
                    state.productDetailsPageProduct = state.products[i];
                    state.pagePathControl = true;
                }
            }
        },
        [productDetailsPageFunc.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
    reducers: {
        compare: (state, action) => {
            if (state.compareArray.findIndex(p => p.title === action.payload.title) === -1) {
                state.compareArray.push(action.payload);
            }
            if (state.compareArray.length > 0) {
                if (state.compareArray[0].type !== action.payload.type) {
                    console.log("Type of The products to be compared might be same");
                    state.compareArray.pop()
                }
            }
            console.log(current(state.compareArray));
        },
        removeProductFromCompare: (state, action) => {
            state.compareArray.splice(action.payload,1);
        }
    },
})

export const { compare, removeProductFromCompare } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;