import { useDispatch, useSelector } from "react-redux";
import { selectFilter } from "../../Slices/productSlice";

export default function RightSideFilters() {

    const dispatch = useDispatch();
    const { dynamicProductPiece } = useSelector(state => state.products)

    return (
        <div className='right-side-filters'>
            <p>Total Products: {dynamicProductPiece}</p>
            <select onChange={(event) => dispatch(selectFilter(event.target.value))} name="arrangement">
                <option value="newestProducts">Newest Products</option>
                <option value="mostSelled">Most Selled</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
            </select>
        </div>
    )
}