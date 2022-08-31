import { createSlice, current } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedin: false,
        users: [{
            id: 0, name: "admin", email: "admin@hotmail.com", password: "123456", lastname: "admin",
            addresses: ["Saffet Mahallesi / Pınar Hisar Caddesi / Gündüz Apartmanı / Daire: 22 İstanbul / Esenler "],
            telephone: "05552224466",
            orders: [{
                address: "Saffet Mahallesi / Pınar Hisar Caddesi / Gündüz Apartmanı / Daire: 22 İstanbul / Esenler ",
                cartInformation: { cartNumber: '1111222233334444', expirationDateMonth: '04', expirationDateYear: '12', cvv: '222' },
                orderNumber: 10001,
                paymentInformation: { month: 2, monthlyPayment: 11488.3, cartTotal: 22976.6 },
                products: [
                    { brand: "msi", filterNumber: 0, id: 1, mprice: 7299.8, piece: 2, price: "14599.60", src: "images/rtx2080.png", tags: ['gpu', 'msi'], title: "MSI Nvdia Geforce RTX 2060", type: "gpu" },
                    { brand: "asus", filterNumber: 0, id: 2, mprice: 8377, piece: 1, price: "8377.00", src: "images/asus-rtx-3050.webp", tags: ['gpu', 'asus'], title: "Nvdia Geforce RTX 3050 8GB", type: "gpu" }], situation: "active",
                telephone: "05552224466"
            }],
            favorites: [{
                brand: "corsair", filterNumber: 0, id: 7, mprice: 1239.9, piece: 1, price: 1239.9, src: "images/corsair-16gb-8x2gb-3200mhz-cl16-siyah.webp",
                tags: ['ram', 'corsair'], title: "Corsair 16gb(8x2) 3200Mhz CL16 DDR4 Black Dual Kit Ram", type: "ram"
            }],
        }],
        user: {},
        userName: "",
        confirmatoryRandoms: "",
        signUpMsg: "",
        isEmailUsing: null,
        arr: [],
    },
    reducers: {
        login: (state, action) => {
            const x = state.users.map(object => object.email).indexOf(action.payload.email);

            state.user = state.users[x];
            state.userName = state.users[x].name;
            state.isLoggedin = true;
            console.log("Log in Succesfull !");

            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        autoLogin: state => {
            let user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                for (let i in state.users) {
                    if (user.email === state.users[i].email && user.password === state.users[i].password) {
                        state.user = state.users[i];
                        state.userName = state.users[i].name;
                        state.isLoggedin = true;
                    }
                }
            }
        },
        signup: (state, action) => {
            state.users.push({
                id: (state.users[state.users.length - 1].id + 1), name: action.payload.name, email: action.payload.email, password: action.payload.password,
                addresses: [], telephone: "", orders: [], favorites: [],
            });

            console.log(state.users[state.users.length - 1]);
        },
        confirmatory: (state) => {
            const words = ["a", "b", "c", "d", "e", "f", "g", "h", "ı", "i", "j",
                "k", "l", "m", "n", "o", "p", "r", "s", "t", "u", "v", "y", "z", "A", "B",
                "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "Y", "Z"];
            const n1 = Math.round(Math.random() * 9).toString();
            const n2 = Math.round(Math.random() * 9).toString();
            const n3 = Math.round(Math.random() * 9).toString();
            const w1 = words[Math.floor(Math.random() * words.length)];
            const w2 = words[Math.floor(Math.random() * words.length)];
            const w3 = words[Math.floor(Math.random() * words.length)];
            const random = n1 + w1 + n2 + w2 + n3 + w3;
            state.confirmatoryRandoms = random;
        },
        logout: (state) => {
            state.isLoggedin = false;
            localStorage.clear("user");
        },
        updateUser: (state, action) => {
            state.user.name = action.payload.name;
            state.user.lastname = action.payload.lastname;
            state.user.email = action.payload.email;
            state.user.telephone = action.payload.telephone;

            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);
            state.users[y] = state.user;

            state.arr = [];
            console.log(current(state.user));
            console.log(current(state.users));
        },
        onChangeUpdateUser: (state, action) => {
            if (action.payload.x === "name") {
                if (action.payload.y === state.user.name) {
                    let y = state.arr.indexOf("name");
                    state.arr.splice(y, 1);
                }
                else {
                    if (state.arr.indexOf("name") === -1) {
                        state.arr.push("name");
                    }
                }
            }
            if (action.payload.x === "lastname") {
                if (action.payload.y === state.user.lastname) {
                    let y = state.arr.indexOf("lastname");
                    state.arr.splice(y, 1);
                }
                else {
                    if (state.arr.indexOf("lastname") === -1) {
                        state.arr.push("lastname");
                    }
                }
            }
            if (action.payload.x === "email") {
                if (action.payload.y === state.user.email) {
                    let y = state.arr.indexOf("email");
                    state.arr.splice(y, 1);
                }
                else {
                    if (state.arr.indexOf("email") === -1) {
                        state.arr.push("email");
                    }
                }
            }
            if (action.payload.x === "telephone") {
                if (action.payload.y === state.user.telephone) {
                    let y = state.arr.indexOf("telephone");
                    state.arr.splice(y, 1);
                }
                else {
                    if (state.arr.indexOf("telephone") === -1) {
                        state.arr.push("telephone");
                    }
                }
            }
        },
        deleteAddress: (state, action) => {
            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);

            state.user.addresses.splice(action.payload, 1);
            state.users[y].addresses.splice(action.payload, 1);

            console.log(current(state.user))
        },
        addAddress: (state, action) => {
            if (state.user.addresses.length <= 5) {
                if (action.payload.length <= 50) {
                    console.log("The character length of new address must be more than 50")
                }
                else {
                    let x = state.user.id;
                    let y = state.users.findIndex(u => u.id === x);

                    state.user.addresses.push(action.payload);
                    state.users[y].addresses.push(action.payload);
                }
            }
            else {
                console.log("The number of addresses piece can not be more than 5")
            }
        },
        updateAddress: (state, action) => {
            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);

            state.user.addresses[action.payload.index] = action.payload.value;
            state.users[y].addresses[action.payload.index] = action.payload.value;
        },
        refresh: state => {
            state.arr = [];
        },
        toUserOrders: (state, action) => {
            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);

            state.user.orders.push(action.payload);
            state.users[y].orders.push(action.payload);

            console.log(current(state.user));
        },
        changePassword: (state, action) => {
            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);

            state.user.password = action.payload;
            state.users[y].password = action.payload;

            console.log(current(state.user));
        },
        addToFavorites: (state, action) => {
            let x = state.user.id;
            let y = state.users.findIndex(u => u.id === x);

            if (state.user.favorites.findIndex(f => f.title === action.payload.title) === -1) {
                state.user.favorites.push(action.payload);
                state.users[y].favorites.push(action.payload);
            }
            else {
                let z = state.user.favorites.findIndex(f => f.title === action.payload.title);
                state.user.favorites.splice(z, 1);
                state.users[y].favorites.splice(z, 1);
            }

            console.log(current(state.user));
            console.log(current(state.users));
        }
    }
})

export const { login, signup, confirmatory, logout, updateUser, deleteAddress, addAddress, updateAddress, onChangeUpdateUser, refresh, toUserOrders, changePassword, autoLogin, addToFavorites } = authSlice.actions;
export default authSlice.reducer;