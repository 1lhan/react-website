import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk('products/getProducts', async (dispatch, getState) => {
    return await fetch('/data.json').then((res) =>
        res.json())
})

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: null,
        firstFiltedProductsArray: [],
        filtedProductsArray: [],
        computerComponentsFilters: [{
            filterName: "Computer Components Types", filters: ["gpu", "processor", "motherboard", "ram", "ssd", "hdd", "cooler"],
            jsonFilterName: "type", filtedP: [], filtedFilterNames: ["gpu", "processor", "motherboard", "ram", "ssd", "hdd", "cooler"], filterNumber: 0
        },
        {
            filterName: "Computer Components Brand", filters: ["msi", "asus", "corsair", "intel", "amd", "wd", "cooler master", "samsung"],
            jsonFilterName: "brand", filtedP: [], filtedFilterNames: ["msi", "asus", "corsair", "intel", "amd", "wd", "cooler master", "samsung"], filterNumber: 0
        }],
        computerPeripheralsFilters: [{ filterName: "Computer Peripherals Types", filters: ["mouse", "keyboard", "mousepad"], jsonFilterName: "type", filtedP: [], filtedFilterNames: ["mouse", "keyboard", "mousepad"], filterNumber: 0 },
        { filterName: "Computer Peripherals Brand", filters: ["corsair", "steel series"], jsonFilterName: "brand", filtedP: [], filtedFilterNames: ["corsair", "steel series"], filterNumber: 0 }],
        selectFilterName: "",
        dynamicProductPiece: "",
        currentlyProductTypes: [],
        cFilterName: "",
        totalFiltedNumber: 0,
        filtedProductsArray2: [],
        allFilterNames: [],
        filterNames: [],
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = 'success';
            state.products = action.payload;

            state.filtedProductsArray = [];
            state.firstFiltedProductsArray = [];
            state.filterNames = [];

            if ((window.location.pathname).replace("/", "") === "Computer-Components") {
                for (let i in state.computerComponentsFilters[0].filters) {
                    for (let j in state.products) {
                        if (state.products[j].type === state.computerComponentsFilters[0].filters[i]) {
                            state.filtedProductsArray.push(state.products[j]);
                            state.firstFiltedProductsArray.push(state.products[j]);
                        }
                    }
                }
                state.currentlyProductTypes = state.computerComponentsFilters;
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filters) {
                        state.allFilterNames.push(state.currentlyProductTypes[i].filters[j]);
                    }
                }
            }

            if ((window.location.pathname).replace("/", "") === "Computer-Peripherals") {
                for (let i in state.computerPeripheralsFilters[0].filters) {
                    for (let j in state.products) {
                        if (state.products[j].type === state.computerPeripheralsFilters[0].filters[i]) {
                            state.filtedProductsArray.push(state.products[j]);
                            state.firstFiltedProductsArray.push(state.products[j]);
                        }
                    }
                }
                state.currentlyProductTypes = state.computerPeripheralsFilters;
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filters) {
                        state.allFilterNames.push(state.currentlyProductTypes[i].filters[j]);
                    }
                }
            }

            state.firstFiltedProductsArray = [...new Map(state.firstFiltedProductsArray.map(item => [item["title"], item])).values()];
            state.filtedProductsArray = [...new Map(state.filtedProductsArray.map(item => [item["title"], item])).values()];

            state.dynamicProductPiece = state.filtedProductsArray.length;
            // set value to dynamicProductPiece for print dynamic product piece
        },
        [getProducts.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
    reducers: {
        filtProducts: (state, action) => {

            state.filterNames.push(action.payload);
            state.filtedProductsArray = [];
            state.totalFiltedNumber = 0;
            state.filtedProductsArray2 = [];
            state.allFilterNames = [];


            for (let i in state.currentlyProductTypes) {
                state.currentlyProductTypes[i].filtedFilterNames = [];
                for (let j in state.currentlyProductTypes[i].filters) {
                    for (let k in state.filterNames) {
                        if (state.currentlyProductTypes[i].filters[j] === state.filterNames[k]) {
                            state.currentlyProductTypes[i].filtedFilterNames.push(state.filterNames[k]);
                        }
                    }
                }
            }

            for (let i in state.currentlyProductTypes) {
                state.currentlyProductTypes[i].filtedP = [];
                for (let j in state.currentlyProductTypes[i].filtedFilterNames) {
                    for (let k in state.firstFiltedProductsArray) {
                        if (state.currentlyProductTypes[i].filtedFilterNames[j] === state.firstFiltedProductsArray[k][`${state.currentlyProductTypes[i].jsonFilterName}`]) {
                            state.currentlyProductTypes[i].filtedP.push(state.firstFiltedProductsArray[k]);
                        }
                    }
                }
            }

            for (let i in state.currentlyProductTypes) {
                if (state.currentlyProductTypes[i].filtedP.length === 0) {
                    state.currentlyProductTypes[i].filtedNumber = 1;
                    state.totalFiltedNumber += state.currentlyProductTypes[i].filtedNumber;
                }
                else {
                    state.currentlyProductTypes[i].filtedNumber = 2;
                    state.totalFiltedNumber += state.currentlyProductTypes[i].filtedNumber;
                }
            }

            if (state.totalFiltedNumber === state.currentlyProductTypes.length) {
                state.filtedProductsArray = state.firstFiltedProductsArray;
            }
            else if (state.totalFiltedNumber === (state.currentlyProductTypes.length * 2)) {
                console.log("n");
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filtedP) {
                        state.filtedProductsArray.push(state.currentlyProductTypes[i].filtedP[j]);
                    }
                }
                for (let i = 0; i < state.filtedProductsArray.length; i++) {
                    for (let j = (i + 1); j < state.filtedProductsArray.length; j++) {
                        if (state.filtedProductsArray[i].title === state.filtedProductsArray[j].title) {
                            state.filtedProductsArray2.push(state.filtedProductsArray[i]);
                        }
                    }
                }
                state.filtedProductsArray = state.filtedProductsArray2;
                state.filtedProductsArray = [...new Map(state.filtedProductsArray.map(item => [item["title"], item])).values()];
            }
            else {
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filtedP) {
                        state.filtedProductsArray.push(state.currentlyProductTypes[i].filtedP[j]);
                    }
                }
                state.filtedProductsArray = [...new Map(state.filtedProductsArray.map(item => [item["title"], item])).values()];
            }

            if (state.filtedProductsArray.length === 0) {
                for (let i in state.currentlyProductTypes) {
                    state.currentlyProductTypes[i].filtedFilterNames = state.currentlyProductTypes[i].filters;
                }
            }
            else {
                for (let i in state.currentlyProductTypes) {
                    state.currentlyProductTypes[i].filtedFilterNames = [];
                    for (let j in state.filtedProductsArray) {
                        state.currentlyProductTypes[i].filtedFilterNames.push(state.filtedProductsArray[j][`${state.currentlyProductTypes[i].jsonFilterName}`]);
                    }
                    state.currentlyProductTypes[i].filtedFilterNames = [...new Set(state.currentlyProductTypes[i].filtedFilterNames)];
                }
            }

            for (let i in state.currentlyProductTypes) {
                for (let j in state.currentlyProductTypes[i].filtedFilterNames) {
                    state.allFilterNames.push(state.currentlyProductTypes[i].filtedFilterNames[j]);
                }
            }

            // Select Filter Codes
            if (state.selectFilterName === "lowToHigh") {
                state.filtedProductsArray.sort((a, b) => {
                    return a.mprice - b.mprice
                })
            }
            else if (state.selectFilterName === "highToLow") {
                state.filtedProductsArray.sort((a, b) => {
                    return b.mprice - a.mprice
                })
            }
            else if (state.selectFilterName === "newestProducts") {
                state.filtedProductsArray.sort((a, b) => {
                    return a.id - b.id
                })
            }

            // set value to dynamicProductPiece for print currently product piece
            state.dynamicProductPiece = state.filtedProductsArray.length;
            //console.log(current(state.currentlyProductTypes))
        },
        deleteFilterName: (state, action) => {

            state.filterNames.splice(state.filterNames.indexOf(action.payload), 1);
            state.filtedProductsArray = [];
            state.totalFiltedNumber = 0;
            state.filtedProductsArray2 = [];
            state.allFilterNames = [];

            for (let i in state.currentlyProductTypes) {
                state.currentlyProductTypes[i].filtedFilterNames = [];
                for (let j in state.currentlyProductTypes[i].filters) {
                    for (let k in state.filterNames) {
                        if (state.currentlyProductTypes[i].filters[j] === state.filterNames[k]) {
                            state.currentlyProductTypes[i].filtedFilterNames.push(state.filterNames[k]);
                        }
                    }
                }
            }

            for (let i in state.currentlyProductTypes) {
                state.currentlyProductTypes[i].filtedP = [];
                for (let j in state.currentlyProductTypes[i].filtedFilterNames) {
                    for (let k in state.firstFiltedProductsArray) {
                        if (state.currentlyProductTypes[i].filtedFilterNames[j] === state.firstFiltedProductsArray[k][`${state.currentlyProductTypes[i].jsonFilterName}`]) {
                            state.currentlyProductTypes[i].filtedP.push(state.firstFiltedProductsArray[k]);
                        }
                    }
                }
            }

            for (let i in state.currentlyProductTypes) {
                if (state.currentlyProductTypes[i].filtedP.length === 0) {
                    state.currentlyProductTypes[i].filtedNumber = 1;
                    state.totalFiltedNumber += state.currentlyProductTypes[i].filtedNumber;
                }
                else {
                    state.currentlyProductTypes[i].filtedNumber = 2;
                    state.totalFiltedNumber += state.currentlyProductTypes[i].filtedNumber;
                }
            }

            if (state.totalFiltedNumber === state.currentlyProductTypes.length) {
                state.filtedProductsArray = state.firstFiltedProductsArray;
            }
            else if (state.totalFiltedNumber === (state.currentlyProductTypes.length * 2)) {
                console.log("n");
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filtedP) {
                        state.filtedProductsArray.push(state.currentlyProductTypes[i].filtedP[j]);
                    }
                }
                for (let i = 0; i < state.filtedProductsArray.length; i++) {
                    for (let j = (i + 1); j < state.filtedProductsArray.length; j++) {
                        if (state.filtedProductsArray[i].title === state.filtedProductsArray[j].title) {
                            state.filtedProductsArray2.push(state.filtedProductsArray[i]);
                        }
                    }
                }
                state.filtedProductsArray = state.filtedProductsArray2;
                state.filtedProductsArray = [...new Map(state.filtedProductsArray.map(item => [item["title"], item])).values()];
            }
            else {
                for (let i in state.currentlyProductTypes) {
                    for (let j in state.currentlyProductTypes[i].filtedP) {
                        state.filtedProductsArray.push(state.currentlyProductTypes[i].filtedP[j]);
                    }
                }
                state.filtedProductsArray = [...new Map(state.filtedProductsArray.map(item => [item["title"], item])).values()];
            }

            if (state.filtedProductsArray.length === 0) {
                for (let i in state.currentlyProductTypes) {
                    state.currentlyProductTypes[i].filtedFilterNames = state.currentlyProductTypes[i].filters;
                }
            }
            else {
                for (let i in state.currentlyProductTypes) {
                    state.currentlyProductTypes[i].filtedFilterNames = [];
                    for (let j in state.filtedProductsArray) {
                        state.currentlyProductTypes[i].filtedFilterNames.push(state.filtedProductsArray[j][`${state.currentlyProductTypes[i].jsonFilterName}`]);
                    }
                    state.currentlyProductTypes[i].filtedFilterNames = [...new Set(state.currentlyProductTypes[i].filtedFilterNames)];
                }
            }

            for (let i in state.currentlyProductTypes) {
                for (let j in state.currentlyProductTypes[i].filtedFilterNames) {
                    state.allFilterNames.push(state.currentlyProductTypes[i].filtedFilterNames[j]);
                }
            }

            // Select Filter Codes
            if (state.selectFilterName === "lowToHigh") {
                state.filtedProductsArray.sort((a, b) => {
                    return a.mprice - b.mprice
                })
            }
            else if (state.selectFilterName === "highToLow") {
                state.filtedProductsArray.sort((a, b) => {
                    return b.mprice - a.mprice
                })
            }
            else if (state.selectFilterName === "newestProducts") {
                state.filtedProductsArray.sort((a, b) => {
                    return a.id - b.id
                })
            }

            // set value to dynamicProductPiece for print currently product piece
            state.dynamicProductPiece = state.filtedProductsArray.length;
            //console.log(current(state.currentlyProductTypes))
        },
        selectFilter: (state, action) => {
            if (action.payload === "lowToHigh") {
                state.selectFilterName = "lowToHigh";
                state.filtedProductsArray.sort((a, b) => {
                    return a.mprice - b.mprice
                })
            }
            else if (action.payload === "highToLow") {
                state.selectFilterName = "highToLow";
                state.filtedProductsArray.sort((a, b) => {
                    return b.mprice - a.mprice
                })
            }
            else if (action.payload === "newestProducts") {
                state.selectFilterName = "newestProducts";
                state.filtedProductsArray.sort((a, b) => {
                    return a.id - b.id
                })
            }
        }
    }
});

export const { filtProducts, deleteFilterName, selectFilter } = productSlice.actions;

export default productSlice.reducer;