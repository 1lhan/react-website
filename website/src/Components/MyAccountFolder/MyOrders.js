import { useSelector } from "react-redux";



export default function MyOrders() {

    const { user } = useSelector(state => state.auth);

    return (
        <div className="my-orders-div">
            <h2>My Orders</h2>
            {user.orders.length === 0 ? "You haven't any orders" : ""}
            {user.orders && user.orders.map((item, index) =>
                <div key={index} className="order-div">
                    <div className="order-div-1">
                        <p>Order Number : <span>{item.orderNumber}</span></p>
                        <hr />
                        <p>Cart Total : <span>{(item.paymentInformation.cartTotal).toFixed(2)}</span></p>
                        <hr />
                        <p>Situation : <span style={{
                            color:
                                item.situation === "active" ? "green" : "" ||
                                    item.situation === "waiting" ? "aquamarine" : "" ||
                                        item.situation === "done" ? "#FFB72B" : ""

                        }}>{(item.situation)}</span></p>
                        <label className="btn-grey" htmlFor={"order-details-" + index}>+<span>Details</span></label>
                    </div>

                    <div className="order-div-2">
                        {item.products && item.products.map((item2, index2) =>
                            <div className="order-product-div" key={index2}>
                                <img alt={item2.title} src={"/" + item2.src}></img>
                                <div className="order-product-div-2">
                                    <p className="order-product-div-title">{item2.title}</p>
                                    <div>
                                        <p>Product Piece Price : {item2.mprice}</p>
                                        <p>Product Piece : {item2.piece}</p>
                                        <p>Total Product Price : {item2.price}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <input className="order-details-cb" type="checkbox" id={"order-details-" + index}></input>
                    <div className="order-div-3">
                        <hr />
                        <p>Address : <span>{item.address}</span></p>
                        <p>Telephone : <span>{item.telephone}</span></p>
                    </div>
                </div>
            )}
        </div>

    )
}