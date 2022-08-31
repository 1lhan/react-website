import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteAddress, addAddress, updateAddress } from "../../Slices/authSlice";
import { deleteSelectedAddress } from "../../Slices/addcartSlice";

export default function MyAddresses() {

    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth);
    const [newAddress, setnewAddress] = useState("");
    const [textareaDp, setTextareaDp] = useState(false);

    const [updAddress0, setupdAddress0] = useState("");
    const [updAddress1, setupdAddress1] = useState("");
    const [updAddress2, setupdAddress2] = useState("");
    const [updAddress3, setupdAddress3] = useState("");
    const [updAddress4, setupdAddress4] = useState("");

    const updateAddressHandle = (e) => {
        if (e.index === 0) {
            setupdAddress0(e.value);
        }
        if (e.index === 1) {
            setupdAddress1(e.value);
        }
        if (e.index === 2) {
            setupdAddress2(e.value);
        }
        if (e.index === 3) {
            setupdAddress3(e.value);
        }
        if (e.index === 4) {
            setupdAddress4(e.value);
        }
    }

    const updateAddressHandle2 = (e) => {
        if (e === 0) {
            if (updAddress0 === "") {
                setupdAddress0(user.addresses[e])
            }
            else if (updAddress0 === user.addresses[e]) {
            }
            else {
                dispatch(updateAddress({ index: e, value: updAddress0 }));
                console.log("Address update is has succesfull")
            }
        }
        if (e === 1) {
            if (updAddress1 === "") {
                setupdAddress1(user.addresses[e])
            }
            else if (updAddress1 === user.addresses[e]) {
            }
            else {
                dispatch(updateAddress({ index: e, value: updAddress1 }));
                console.log("Address update is has succesfull")
            }
        }
        if (e === 2) {
            if (updAddress2 === "") {
                setupdAddress2(user.addresses[e])
            }
            else if (updAddress2 === user.addresses[e]) {
            }
            else {
                dispatch(updateAddress({ index: e, value: updAddress2 }));
                console.log("Address update is has succesfull")
            }
        }
        if (e === 3) {
            if (updAddress3 === "") {
                setupdAddress3(user.addresses[e])
            }
            else if (updAddress3 === user.addresses[e]) {
            }
            else {
                dispatch(updateAddress({ index: e, value: updAddress3 }));
                console.log("Address update is has succesfull")
            }
        }
        if (e === 4) {
            if (updAddress4 === "") {
                setupdAddress4(user.addresses[e])
            }
            else if (updAddress4 === user.addresses[e]) {
            }
            else {
                dispatch(updateAddress({ index: e, value: updAddress4 }));
                console.log("Address update is has succesfull")
            }
        }
    }

    return (
        <div className="myaccount-content-div">
            <div className="my-addresses-div">

                <div>
                    <h2>My Addresses</h2>
                    <button onClick={() => setTextareaDp(!textareaDp)}
                        className="add-addresses-btn">{textareaDp ? "Close Textarea" : "Add Addresses"}</button>
                </div>

                <div style={{ display: textareaDp ? 'flex' : 'none' }}>

                    <textarea
                        onChange={(e) => setnewAddress(e.target.value)}
                        defaultValue={newAddress}
                        className="add-address-textarea">
                    </textarea>

                    <button onClick={() => dispatch(addAddress(newAddress))}
                        className="save-address-btn">Save new address</button>

                </div>

                {user.addresses && user.addresses.map((item, index) =>
                    <div className="address-div" key={index}>

                        <textarea onChange={(e) => updateAddressHandle({ index: index, value: e.target.value })} className="addresses-inputs" defaultValue={item}></textarea>

                        <div className="address-div-btns">
                            <button style={{ background: "#ff0011" }}
                                onClick={() => {
                                    dispatch(deleteAddress(index));
                                    dispatch(deleteSelectedAddress());
                                }}>
                                <i className="fa-solid fa-trash"></i></button>

                            <button onClick={() => updateAddressHandle2(index)}>
                                <i className="fa-solid fa-pen-to-square"></i></button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}