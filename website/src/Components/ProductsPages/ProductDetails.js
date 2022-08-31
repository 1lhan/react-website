import { productDetailsPageFunc, compare, removeProductFromCompare } from '../../Slices/productDetailsSlice';
import { addToCart } from '../../Slices/addcartSlice';
import { addToFavorites } from '../../Slices/authSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ProductDetails() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(productDetailsPageFunc());
    }, [dispatch])

    const { productDetailsPageProduct, pagePathControl, compareArray } = useSelector(state => state.pDetails);
    const { myCartProducts } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth);

    const [compareDivDp, setCompareDivDp] = useState(false);

    return (
        <div className='product-details-page-first-div'>
            {pagePathControl === false ?
                <div>
                    <div>404 Page not founded</div><span style={{ textDecoration: "underline", color: "blue", cursor: "pointer" }} onClick={() => navigate('/')}>back to main page</span>
                </div>

                :
                <div className='product-details-page-div'>
                    <div className='product-detail-img-div'>
                        <img alt='product' src={"/" + productDetailsPageProduct.src}></img>
                    </div>
                    <div className='product-details-div'>
                        <div className='product-content'>
                            <h2>{productDetailsPageProduct.title}</h2>
                            {productDetailsPageProduct.indirim === null ?
                                <p>{productDetailsPageProduct.mprice}</p>
                                :
                                <p><span className='old-price'>{productDetailsPageProduct.mprice}</span> <span>{productDetailsPageProduct.mprice - (productDetailsPageProduct.mprice / (100 / productDetailsPageProduct.indirim))}</span></p>
                            }

                        </div>
                        <hr />
                        <div className='product-advantages'>
                            <div>
                                <i className="fa-solid fa-credit-card"></i>
                                <p>Instalment up to 6 month</p>
                            </div>
                            <div>
                                <i className="fa-solid fa-truck"></i>
                                <p>Free Shipping</p>
                            </div>
                        </div>
                        <div className='product-details-buttons-div'>
                            <button
                                style={{ background: myCartProducts.findIndex(p => p.title === productDetailsPageProduct.title) === -1 ? "#FFB72B" : "#1ee61e" }}
                                className='addtocart-btn btn-orange' onClick={() => dispatch(addToCart(productDetailsPageProduct))}>Add To Cart</button>
                            <button className={user.favorites.findIndex(f => f.title === productDetailsPageProduct.title) === -1 ? "add-to-favorites-btn" : "true add-to-favorites-btn"}
                                onClick={() => dispatch(addToFavorites(productDetailsPageProduct))}><i className="fa-solid fa-bookmark"></i></button>
                            <button className='compare-btn'>
                                <i onClick={() => setCompareDivDp(!compareDivDp)} className="fa-solid fa-code-compare"></i>
                                <hr />
                                <i onClick={() => dispatch(compare(productDetailsPageProduct))} className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <ul className='product-detail-list'>
                            <li>
                                <span className='product-detail-span-1'>Type</span>
                                <span className='product-detail-span-2'>{productDetailsPageProduct.type}</span>
                            </li>
                            <li>
                                <span className='product-detail-span-1'>Brand</span>
                                <span className='product-detail-span-2'>{productDetailsPageProduct.brand}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <div style={{ display: compareDivDp ? "flex" : "none" }} className='product-compare-div'>
                <div><i onClick={() => setCompareDivDp(!compareDivDp)} className="fa-solid fa-xmark"></i></div>
                {compareArray.length === 0 ?
                    <p>There is not product will be compared</p>
                    :
                    <table className='product-compare-table'>
                        <tbody>
                            <tr>
                                <td>Title</td>
                                {compareArray && compareArray.map((p, i) =>
                                    <td key={i}>
                                        <i onClick={() => dispatch(removeProductFromCompare(i))} className="fa-solid fa-xmark"></i>
                                        <img alt='product' src={'/' + p.src}></img>
                                        {p.title}</td>
                                )}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Type</td>
                                {compareArray && compareArray.map((p, i) =>
                                    <td key={i}>{p.type}</td>
                                )}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Price</td>
                                {compareArray && compareArray.map((p, i) =>
                                    <td key={i}>{p.mprice}</td>
                                )}
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>Brand</td>
                                {compareArray && compareArray.map((p, i) =>
                                    <td key={i}>{p.brand}</td>
                                )}
                            </tr>
                        </tbody>
                    </table>
                }
            </div>
        </div>
    )
}