import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../Slices/productSlice";
import { addToCart } from '../Slices/addcartSlice';
import { nextImage, previousImage } from '../Slices/sliderSlice';
import { useNavigate } from 'react-router-dom';


export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products } = useSelector(state => state.products);
    const { imgSrc, imgNumber } = useSelector(state => state.slider)

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <div className='homepage-div'>

            <div className='image-slider-div'>
                <button onClick={() => {
                    dispatch(previousImage());
                }}><i className="fa-solid fa-chevron-left"></i></button>
                <img alt='product' src={"images/" + imgSrc[imgNumber]}></img>
                <button onClick={() => dispatch(nextImage())}><i className="fa-solid fa-chevron-right"></i></button>
            </div>

            <div style={{ width: 100 + '%' }} className='products-div'>
                {products && products.map((item, index) =>
                    <div className='product-div' key={item.id}>
                        <div className='product-div-flex'>
                            <img src={item.src} alt={"pc-comp-" + item.id}></img>
                            <h3 onClick={() => navigate(`/product/${item.title.replaceAll(" ", "-")}`)}>{item.title}</h3>
                            <div>
                                <p>{item.price}</p>
                                <button onClick={() => dispatch(addToCart(item))}>
                                    <i className="fa-solid fa-cart-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>

    );
}