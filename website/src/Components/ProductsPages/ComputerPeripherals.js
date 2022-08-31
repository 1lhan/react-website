import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../Slices/productSlice";
import { addToCart } from '../../Slices/addcartSlice';
import RightSideFilters from './RightSideFilters';
import MainFilters from './MainFilters';
import { useNavigate } from 'react-router-dom';

export default function ComputerPeripherals() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { filtedProductsArray } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])


    return (
        <div className='section-inclusive-div-2'>

            <MainFilters />

            <div className='section-right-side-div'>
                <RightSideFilters />
                <div className='products-div'>
                    {filtedProductsArray && filtedProductsArray.map((item, index) =>
                        <div className='product-div' key={index}>
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
        </div>
    );
}