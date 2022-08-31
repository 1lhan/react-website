import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Slices/authSlice";

export default function MyAccountLeftSide() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    }

    return (
        <div className="my-account-left-side">

            <ul className="myaccount-navbar">
                <li style={{height: "3rem", alignItems: "flex-start"}}>
                    <h2>My Account</h2>
                </li>
                <li>
                    <NavLink to="/my-account/user-informations">
                        <i className="fa-solid fa-user"></i>
                        <span>User Informations</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/my-orders">
                        <i className="fa-solid fa-box"></i>
                        <span>My Orders</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/my-addresses">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>My Addresses</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/my-account/my-favorites-products">
                        <i className="fa-solid fa-bookmark"></i>
                        <span>My Favorites Products</span>
                    </NavLink>
                </li>
            </ul>

            <form onSubmit={handleSubmit}>
                <button type="submit" /*onClick={() => dispatch(logout())}*/ className="logout-btn" /*to="http://localhost:3000/"*/>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    Log Out
                </button>
            </form>
        </div>
    )
}
