import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { selectAddress, setNumberOfInstallments, completeShopping } from "../Slices/addcartSlice"
import { toUserOrders } from "../Slices/authSlice";

export default function PaymentPage() {

    const { user } = useSelector(state => state.auth);
    const { selectedAddress, cartTotalPrice, cargoTotal, lastCartPrice, numberOfInstallments, myCartProducts, lastOrderNumber } = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cartNumberValue, setCartNumberValue] = useState("");
    const [cartMonth, setCartMonth] = useState("");
    const [cartYear, setCartYear] = useState("");
    const [cvv, setCvv] = useState("");
    const [paymentPageErr, setPaymentPageErr] = useState("");

    const completeShoppingHandle = () => {
        if (selectedAddress === "") {
            setPaymentPageErr("address");
        }
        else if (cartNumberValue.length !== 16) {
            setPaymentPageErr("cart-number");
        }
        else if (cartMonth.length !== 2 || cartMonth > 12) {
            setPaymentPageErr("cart-expiration-date-month");
        }
        else if (cartYear.length !== 2) {
            setPaymentPageErr("cart-expiration-date-years");
        }
        else if (cvv.length !== 3) {
            setPaymentPageErr("cvv");
        }
        else {
            setPaymentPageErr("");
            dispatch(completeShopping(
                { telephone: user.telephone, cartInformation: { cartNumber: cartNumberValue, expirationDateMonth: cartMonth, expirationDateYear: cartYear, cvv: cvv } }
            ));
            dispatch(toUserOrders(
                {
                    orderNumber: lastOrderNumber + 1, situation: "waiting", address: selectedAddress, telephone: user.telephone,
                    cartInformation: { cartNumber: cartNumberValue, expirationDateMonth: cartMonth, expirationDateYear: cartYear, cvv: cvv },
                    paymentInformation: { month: numberOfInstallments, monthlyPayment: (cartTotalPrice / numberOfInstallments), cartTotal: cartTotalPrice },
                    products: myCartProducts,
                }
            ));
        }
    }

    return (
        <div className="payment-div">
            <div>
                <button onClick={() => navigate("/mycart-page")} className="btn-grey"><i className="fa-solid fa-chevron-left"></i>Back to Cart</button>
                <div>
                    <h2>Address Informations</h2>
                    <button onClick={() => navigate("/my-account/my-addresses")}>Edit My Addresses</button>
                </div>

                <div className="address-information">
                    {user.addresses && user.addresses.map((item, index) =>
                        <label style={{border: selectedAddress === (user.addresses[index]) ? "1px solid #FFB72B" : "none"}}
                            htmlFor={"address" + index} key={index}>
                            <div style={{ border: paymentPageErr === "address" ? "1px solid red" : "" }} className="address-div">
                                <input defaultChecked={selectedAddress === (user.addresses[index]) ? true : false}
                                    onClick={() => dispatch(selectAddress({index:index, address:user.addresses[index]}))}
                                    id={"address" + index} name="address" type="radio">
                                </input>
                                <p>{item}</p>
                            </div>
                        </label>
                    )}
                </div>

                <h2>Payment Informations</h2>

                <div className="payment-information-div">
                    <form>
                        <h3>Cart Informations</h3>
                        <div className="cart-number-div">
                            <p>Cart Number</p>
                            <div>
                                <input
                                    onInput={(e) => {
                                        if (e.nativeEvent.data === "0") {
                                        }
                                        else if (e.nativeEvent.data === "1") {
                                        }
                                        else if (e.nativeEvent.data === "2") {
                                        }
                                        else if (e.nativeEvent.data === "3") {
                                        }
                                        else if (e.nativeEvent.data === "4") {
                                        }
                                        else if (e.nativeEvent.data === "5") {
                                        }
                                        else if (e.nativeEvent.data === "6") {
                                        }
                                        else if (e.nativeEvent.data === "7") {
                                        }
                                        else if (e.nativeEvent.data === "8") {
                                        }
                                        else if (e.nativeEvent.data === "9") {
                                        }
                                        else if (e.nativeEvent.data === null) {
                                        }
                                        else {
                                            e.target.value = cartNumberValue;
                                            setCartNumberValue("");
                                        }
                                        if (e.target.value.length > e.target.maxLength) {
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);
                                        }
                                    }}
                                    onChange={(e) => setCartNumberValue(e.target.value)}
                                    style={{ outline: paymentPageErr === "cart-number" ? "1px solid red" : "" }}
                                    type="text" maxLength="16" className="cart-number-input">
                                </input>
                            </div>

                        </div>
                        <div>
                            <div className="expiration-date-div">
                                <p>Expiration Date (Mount/Year)</p>

                                <input
                                    onInput={(e) => {
                                        if (e.nativeEvent.data === "0") {
                                        }
                                        else if (e.nativeEvent.data === "1") {
                                        }
                                        else if (e.nativeEvent.data === "2") {
                                        }
                                        else if (e.nativeEvent.data === "3") {
                                        }
                                        else if (e.nativeEvent.data === "4") {
                                        }
                                        else if (e.nativeEvent.data === "5") {
                                        }
                                        else if (e.nativeEvent.data === "6") {
                                        }
                                        else if (e.nativeEvent.data === "7") {
                                        }
                                        else if (e.nativeEvent.data === "8") {
                                        }
                                        else if (e.nativeEvent.data === "9") {
                                        }
                                        else if (e.nativeEvent.data === null) {
                                        }
                                        else {
                                            e.target.value = cartMonth;
                                            setCartMonth("");
                                        }
                                        if (e.target.value.length > e.target.maxLength) {
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);
                                        }
                                    }}
                                    onChange={(e) => setCartMonth(e.target.value)}
                                    style={{ outline: paymentPageErr === "cart-expiration-date-month" ? "1px solid red" : "" }}
                                    type='text' maxLength="2" className="expiration-date-mounth-input">
                                </input>

                                <input
                                    onInput={(e) => {
                                        if (e.nativeEvent.data === "0") {
                                        }
                                        else if (e.nativeEvent.data === "1") {
                                        }
                                        else if (e.nativeEvent.data === "2") {
                                        }
                                        else if (e.nativeEvent.data === "3") {
                                        }
                                        else if (e.nativeEvent.data === "4") {
                                        }
                                        else if (e.nativeEvent.data === "5") {
                                        }
                                        else if (e.nativeEvent.data === "6") {
                                        }
                                        else if (e.nativeEvent.data === "7") {
                                        }
                                        else if (e.nativeEvent.data === "8") {
                                        }
                                        else if (e.nativeEvent.data === "9") {
                                        }
                                        else if (e.nativeEvent.data === null) {
                                        }
                                        else {
                                            e.target.value = cartYear;
                                            setCartYear("");
                                        }
                                        if (e.target.value.length > e.target.maxLength) {
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);
                                        }
                                    }}
                                    onChange={(e) => setCartYear(e.target.value)}
                                    style={{ outline: paymentPageErr === "cart-expiration-date-years" ? "1px solid red" : "" }}
                                    type='text' maxLength="2" className="expiration-date-year-input">
                                </input>

                            </div>

                            <div className="cvv-div">
                                <p>CVV</p>
                                <input
                                    onInput={(e) => {
                                        if (e.nativeEvent.data === "0") {
                                        }
                                        else if (e.nativeEvent.data === "1") {
                                        }
                                        else if (e.nativeEvent.data === "2") {
                                        }
                                        else if (e.nativeEvent.data === "3") {
                                        }
                                        else if (e.nativeEvent.data === "4") {
                                        }
                                        else if (e.nativeEvent.data === "5") {
                                        }
                                        else if (e.nativeEvent.data === "6") {
                                        }
                                        else if (e.nativeEvent.data === "7") {
                                        }
                                        else if (e.nativeEvent.data === "8") {
                                        }
                                        else if (e.nativeEvent.data === "9") {
                                        }
                                        else if (e.nativeEvent.data === null) {
                                        }
                                        else {
                                            e.target.value = cvv;
                                            setCvv("");
                                        }
                                        if (e.target.value.length > e.target.maxLength) {
                                            e.target.value = e.target.value.slice(0, e.target.maxLength);
                                        }
                                    }}
                                    onChange={(e) => setCvv(e.target.value)}
                                    style={{ outline: paymentPageErr === "cvv" ? "1px solid red" : "" }}
                                    type="text" maxLength="3" className="cvv-input">
                                </input>
                            </div>
                        </div>
                    </form>

                    <div className="payment-options-div">
                        <table>
                            <thead>
                                <tr>
                                    <td>Number of Installments</td>
                                    <td>Monthly Payment</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ color: numberOfInstallments === 1 ? "#fcaa08" : "#333" }}>
                                            <input
                                                defaultChecked={numberOfInstallments === 1 ? true : false}
                                                onClick={() => dispatch(setNumberOfInstallments(1))}
                                                type='radio' name='payment-options' id="payment-option-1">
                                            </input>
                                            1</label>
                                    </td>
                                    <td><span style={{ color: numberOfInstallments === 1 ? "#fcaa08" : "#333" }}>{lastCartPrice}</span></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ color: numberOfInstallments === 2 ? "#fcaa08" : "#333" }}>
                                            <input
                                                defaultChecked={numberOfInstallments === 2 ? true : false}
                                                onClick={() => dispatch(setNumberOfInstallments(2))}
                                                type='radio' name='payment-options' id="payment-option-2">
                                            </input>
                                            2</label>
                                    </td>
                                    <td><span style={{ color: numberOfInstallments === 2 ? "#fcaa08" : "#333" }}>{(lastCartPrice / 2).toFixed(2)}</span></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ color: numberOfInstallments === 3 ? "#fcaa08" : "#333" }}>
                                            <input
                                                defaultChecked={numberOfInstallments === 3 ? true : false}
                                                onClick={() => dispatch(setNumberOfInstallments(3))}
                                                type='radio' name='payment-options' id="payment-option-3">
                                            </input>
                                            3</label>
                                    </td>
                                    <td><span style={{ color: numberOfInstallments === 3 ? "#fcaa08" : "#333" }}>{(lastCartPrice / 3).toFixed(2)}</span></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td>
                                        <label style={{ color: numberOfInstallments === 6 ? "#fcaa08" : "#333" }}>
                                            <input
                                                defaultChecked={numberOfInstallments === 6 ? true : false}
                                                onClick={() => dispatch(setNumberOfInstallments(6))}
                                                type='radio' name='payment-options' id="payment-option-6">
                                            </input>
                                            6</label>
                                    </td>
                                    <td><span style={{ color: numberOfInstallments === 6 ? "#fcaa08" : "#333" }}>{(lastCartPrice / 6).toFixed(2)}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div >

            <div>
                <div className="my-cart-prices">
                    <p>Price : <span>{cartTotalPrice.toFixed(2)}</span></p>
                    <p>Cargo Total : <span>{cargoTotal.toFixed(2)}</span></p>
                    <hr></hr>
                    <p>Total Price : <span>{lastCartPrice}</span></p>
                </div>
                <button disabled={myCartProducts.length > 0 ? false : true} onClick={completeShoppingHandle} className="complete-shopping-btn">Complete Shopping</button>
            </div>

        </div >
    )
}