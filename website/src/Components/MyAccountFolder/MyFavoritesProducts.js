import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { addToFavorites } from '../../Slices/authSlice';

export default function MyFavoritesProducts() {

    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div className="my-favorites-products-div">
            <h2>My Favorites Products</h2>
            <div className="my-favorites-products-div-2">
                {user.favorites.map((f, index) =>
                    <div key={index} className="favorite-product-div">
                        <img alt='product' src={'/' + f.src}></img>
                        <div className="favorite-product-content-div">
                            <h3 onClick={() => navigate(`/product/${f.title.replaceAll(" ", "-")}`)}>{f.title}</h3>
                            <p>{f.mprice}</p>
                        </div>
                        <button onClick={() => dispatch(addToFavorites(f))}><i className="fa-solid fa-bookmark"></i></button>
                    </div>
                )}
            </div>
        </div>
    )
}