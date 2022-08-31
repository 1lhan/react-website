import { Route, Routes } from "react-router-dom";
import MyAccountLeftSide from "./MyAccountLeftSide";
import MyAddresses from "./MyAddresses";
import MyOrders from "./MyOrders";
import UserInformations from "./UserInformations";
import MyFavoritesProducts from "./MyFavoritesProducts";
import PageNotFound from "../PageNotFound";

export default function MyAccount() {


    return (
        <div className="section-inclusive-div-2">

            <Routes>
                <Route path="user-informations" element={<MyAccountLeftSide />} />
                <Route path="my-orders" element={<MyAccountLeftSide />} />
                <Route path="my-addresses" element={<MyAccountLeftSide />} />
                <Route path="my-favorites-products" element={<MyAccountLeftSide />} />
            </Routes>

            <Routes>
                <Route path="user-informations" element={<UserInformations />} />
                <Route path="my-orders" element={<MyOrders />} />
                <Route path="my-addresses" element={<MyAddresses />} />
                <Route path="my-favorites-products" element={<MyFavoritesProducts />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>

        </div>
    )
}