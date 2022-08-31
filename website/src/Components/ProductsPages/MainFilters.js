import { useDispatch, useSelector } from 'react-redux';
import { filtProducts, deleteFilterName } from '../../Slices/productSlice';

export default function SelectFilters() {

    const dispatch = useDispatch();
    const { currentlyProductTypes, allFilterNames } = useSelector(state => state.products);

    return (
        <div className='filters-div'>
            {currentlyProductTypes && currentlyProductTypes.map((item, index) => (
                <div key={index} className='filter-children-div'>
                    <label htmlFor={'filter-div'+index}><h2>{item.filterName}</h2><i className="fa-solid fa-plus"></i></label>
                    <input className='filter-div-cb' id={'filter-div'+index} type='checkbox'></input>
                    <ul>
                        {item.filters && item.filters.map((obj, index) => (
                            <li style={{ display: allFilterNames.findIndex(i => i === item.filters[index]) === -1 ? "none" : "flex" }} key={index}>
                                <label htmlFor={(item.filterName + " " + item.filters[index]).replaceAll(" ", "-")}>
                                    <input
                                        onChange={(e) => e.target.checked ? dispatch(filtProducts(e.target.name)) : dispatch(deleteFilterName(e.target.name))}
                                        name={item.filters[index]}
                                        id={(item.filterName + " " + item.filters[index]).replaceAll(" ", "-")}
                                        type="checkbox"></input>
                                    {item.filters[index].charAt(0).toUpperCase() + item.filters[index].slice(1)}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}