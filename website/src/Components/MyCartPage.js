import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { increaseProductPiece, decreaseProductPiece, clearCart } from '../Slices/addcartSlice'

export default function MyCartPage() {

    const dispatch = useDispatch();
    const { myCartProducts, cartTotalPrice, cargoTotal, lastCartPrice } = useSelector(state => state.cart)
    const { isLoggedin } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const toPaymentPage = () => {
        navigate("payment");
    }

    return (
        <div className="my-cart-page-div">

            <div className="my-cart-products">
                {myCartProducts.length === 0 ? "Your cart is empty" : ""}
                {myCartProducts && myCartProducts.map((item, index) =>
                    <div key={index} className="my-cart-product">
                        <img src={item.src} alt="product"></img>
                        <div>
                            <h3>{item.title}</h3>
                            {item.indirim === null ?
                                <p>{item.mprice}</p>
                                :
                                <p><span className='old-price'>{item.mprice}</span> <span>{item.mprice - (item.mprice / (100 / item.indirim))}</span></p>
                            }
                        </div>
                        <div>
                            <button onClick={() => dispatch(decreaseProductPiece({index}))} className="price-decrease-btn"><i className="fa-solid fa-minus"></i></button>
                            <input value={item.piece} type='number' disabled min='0'></input>
                            <button onClick={() => dispatch(increaseProductPiece({index}))} className="price-increase-btn"><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <hr style={{display: index === (myCartProducts.length - 1) ? "none" : "block"}} className={index}/>
                    </div>
                )}
                <button onClick={() => dispatch(clearCart())} className="clear-cart-btn btn-grey">Clear Cart</button>
            </div>

            <div className="my-cart-prices">
                <p>Price : <span>{myCartProducts.length > 0 ? cartTotalPrice.toFixed(2) : 0}</span></p>
                <p>Cargo Total : <span>{cargoTotal}</span></p>
                <hr></hr>
                <p>Total Price : <span>{lastCartPrice}</span></p>
                <button onClick={toPaymentPage} className="confirm-shopping-btn" disabled={isLoggedin && myCartProducts.length > 0 ? false : true}>Confirm Cart</button>
            </div>

        </div>

    )
}