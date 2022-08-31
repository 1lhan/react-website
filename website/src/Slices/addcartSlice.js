import { createSlice } from "@reduxjs/toolkit";


const addcartSlice = createSlice({
    name: "addcart",
    initialState: {
        value: 0,
        piece: 1,
        myCartProducts: [],
        productArrayPiece: "0",
        cartTotalPrice: 0,
        currentlyMyCartProductPiece: 0,
        cargoTotal: 0,
        selectedAddress: "",
        lastCartPrice: 0,
        numberOfInstallments: 1,
        lastOrderNumber: 10000,
        shoppingObject: {
            orderNumber: "", status: "", address: "", telephone: "", cartInformation: { cartNumber: "", expirationDateMonth: "", expirationDateYear: "", cvv: "" }, installments: { month: "", monthlyPayment: "", cartTotal: "" }, products: [],
        },
    },
    reducers: {
        addToCart: (state, action) => {
            state.myCartProducts.push(action.payload);
            if (state.myCartProducts.length >= 0) {
                state.myCartProducts = [...new Map(state.myCartProducts.map(item => [item["title"], item])).values()];
                state.productArrayPiece = state.myCartProducts.length;
            }

            if (state.myCartProducts.length > 0) {
                state.cargoTotal = 14.99;
            }

            state.cartTotalPrice = 0;
            for (let i in state.myCartProducts) {
                state.cartTotalPrice += Number(state.myCartProducts[i].price);
                /*if (state.myCartProducts[i].indirim !== null) {
                    state.cartTotalPrice += Number(state.myCartProducts[i].price - (state.myCartProducts[i].price / (100 / state.myCartProducts[i].indirim)));
                }
                else {
                state.cartTotalPrice += Number(state.myCartProducts[i].price);
                }*/
            }

            state.currentlyMyCartProductPiece = state.myCartProducts.length;
            state.lastCartPrice = Number(state.cartTotalPrice + state.cargoTotal).toFixed(2);
        },
        increaseProductPiece: (state, action) => {
            state.myCartProducts[action.payload.index].piece++;
            const newPrice = state.myCartProducts[action.payload.index].mprice * state.myCartProducts[action.payload.index].piece;
            state.myCartProducts[action.payload.index].price = newPrice.toFixed(2);

            state.cartTotalPrice = 0;
            for (let i in state.myCartProducts) {
                state.cartTotalPrice += Number(state.myCartProducts[i].price);
            }
            state.lastCartPrice = Number(state.cartTotalPrice + state.cargoTotal).toFixed(2);
        },
        decreaseProductPiece: (state, action) => {
            state.myCartProducts[action.payload.index].piece--;

            if (state.myCartProducts[action.payload.index].piece === 0) {
                state.myCartProducts.splice(action.payload.index, 1)
            }
            else if (state.myCartProducts[action.payload.index].piece > 0) {
                const newPrice = state.myCartProducts[action.payload.index].mprice * state.myCartProducts[action.payload.index].piece;
                state.myCartProducts[action.payload.index].price = newPrice.toFixed(2);
            }

            if (state.myCartProducts.length === 0) {
                state.cargoTotal = 0;
            }

            state.cartTotalPrice = 0;
            for (let i in state.myCartProducts) {
                state.cartTotalPrice += Number(state.myCartProducts[i].price);
            }

            state.currentlyMyCartProductPiece = state.myCartProducts.length;
            state.lastCartPrice = Number(state.cartTotalPrice + state.cargoTotal).toFixed(2);
        },
        selectAddress: (state, action) => {
            state.selectedAddress = action.payload.address;
        },
        setNumberOfInstallments: (state, action) => {
            state.numberOfInstallments = action.payload;
        },
        completeShopping: (state, action) => {
            state.shoppingObject = {
                orderNumber: state.lastOrderNumber + 1, situation: "active", address: state.selectedAddress, telephone: action.payload.telephone, cartInformation: action.payload.cartInformation,
                paymentInformation: { month: state.numberOfInstallments, monthlyPayment: (state.cartTotalPrice / state.numberOfInstallments), cartTotal: state.cartTotalPrice },
                products: state.myCartProducts,
            }
            console.log(state.shoppingObject);
            state.lastOrderNumber += 1;
        },
        clearCart: state => {
            state.myCartProducts = [];
            state.lastCartPrice = 0;
            state.cartTotalPrice = 0;
            state.cargoTotal = 0;
            state.productArrayPiece = 0;
        },
        deleteSelectedAddress: state => {
            state.selectedAddress = "";
        }
    }
})

export const { addToCart, increaseProductPiece, decreaseProductPiece, selectAddress, setNumberOfInstallments, completeShopping, clearCart, deleteSelectedAddress } = addcartSlice.actions;

export default addcartSlice.reducer;