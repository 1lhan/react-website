import { NavLink, /*useNavigate*/ } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../Slices/authSlice";

export default function Header() {
    const dispatch = useDispatch();
    const productPiece = useSelector(state => state.cart.productArrayPiece);
    const { currentlyMyCartProductPiece } = useSelector(state => state.cart)
    const { isLoggedin, userName } = useSelector(state => state.auth);

    return (
        <header>
            <nav className='container'>
                <NavLink className="logo" to="/">XYZ</NavLink>
                <div className='navbar-search-menu-div'>
                    <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                    <label htmlFor="menu-checkbox" className="menu-btn">
                        <i className="fa-solid fa-bars"></i><span>Products</span>
                    </label>
                    <input id='menu-checkbox' type="checkbox"></input>
                    <ul className='dropdown-menu'>
                        <li>
                            <label>
                                <NavLink name="Computer-Components" to="Computer-Components">Computer Components</NavLink>
                            </label>
                        </li>
                        <li>
                            <label>
                                <NavLink name="Computer-Peripherals" to="Computer-Peripherals">Computer Peripherals</NavLink>
                            </label>
                        </li>
                        <li>
                            <label>
                                <NavLink name="Computer" to="Computer">Computer</NavLink>
                            </label>
                        </li>
                    </ul>
                </div>

                <div className='navbar-buttons-div'>

                    <button className="login-signup-btn" to={isLoggedin ? "/my-account/user-informations" : "login-page"}>
                        <i className="fa-solid fa-user"></i>
                        <span>{isLoggedin ? "My Account" : "Log in"}<br />{isLoggedin ? userName : ""}</span>
                        {isLoggedin ? <ul>
                            <li>
                                <NavLink to="my-account/user-informations">
                                    <i className="fa-solid fa-user"></i>
                                    <span>User Informations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-account/my-orders">
                                    <i className="fa-solid fa-box"></i>
                                    <span>My Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-account/my-addresses">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>My Addresses</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-account/my-favorites-products">
                                    <i className="fa-solid fa-bookmark"></i>
                                    <span>My Favorites Products</span>
                                </NavLink>
                            </li>
                            <li>
                                <a onClick={() => dispatch(logout())} href="http://localhost:3000/">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>

                            :
                            <ul>
                                <li>
                                    <NavLink to="login-page">Log in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="signup-page">Sign up</NavLink>
                                </li>
                            </ul>}
                    </button>


                    <NavLink className="cart-btn" to="mycart-page">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span className='product-piece-span'>{productPiece && currentlyMyCartProductPiece}</span>
                        <span>My Cart</span>
                    </NavLink>

                </div>
            </nav>
        </header>
        // style={({isActive}) => ({backgroundColor: isActive ? '#d6f8f8' : '#fff'})}
    )
}

/*
                            <li>
                                <NavLink onClick={() => dispatch(logout())} className="logout-btn" to="http://localhost:3000/">
                                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                    Log Out
                                </NavLink>
                            </li>
<NavLink className="login-signup-btn" to={isLoggedin ? "/my-account/user-informations" : "login-page"}>
                        <i className="fa-solid fa-user"></i>
                        <span>{isLoggedin ? "My Account" : "Log in"}<br />{isLoggedin ? userName : ""}</span>
                        {isLoggedin ? <ul>
                            <li>
                                <NavLink to="user-informations">
                                    <i className="fa-solid fa-user"></i>
                                    <span>User Informations</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-orders">
                                    <i className="fa-solid fa-box"></i>
                                    <span>My Orders</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-addresses">
                                    <i className="fa-solid fa-location-dot"></i>
                                    <span>My Addresses</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="my-favorites-products">
                                    <i className="fa-solid fa-bookmark"></i>
                                    <span>My Favorites Products</span>
                                </NavLink>
                            </li>
                        </ul>
                            :
                            <ul>
                                <li>
                                    <NavLink to="login-page">Log in</NavLink>
                                </li>
                                <li>
                                    <NavLink to="signup-page">Sign up</NavLink>
                                </li>
                            </ul>}
                    </NavLink>
<button className="login-signup-btn" onClick={(e) => e.preventDefault()}>
                        <i className="fa-solid fa-user"></i>
                        <span>{isLoggedin ? "My Account" : "Log in"}<br/>{isLoggedin ? userName : ""}</span>
                        {isLoggedin ? "" : <ul>
                            <li>
                                <NavLink to="login-page">Log in</NavLink>
                            </li>
                            <li>
                                <NavLink to="signup-page">Sign up</NavLink>
                            </li>
                        </ul>}
                        
                    </button>
                    */