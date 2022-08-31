import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, onChangeUpdateUser, refresh, changePassword } from "../../Slices/authSlice";

export default function UserInformations() {

    const { user, arr } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    const [currentlyPw,setCurrentlyPw] = useState("");
    const [newPw1,setNewPw1] = useState("");
    const [newPw2,setNewPw2] = useState("");

    const [changePwMsg,setChangePwMsg] = useState("");

    const changePasswordHandle = (e) => {
        e.preventDefault();
        
        if(user.password !== currentlyPw){
            setChangePwMsg("Currently password wrong")
        }
        else if(newPw1 !== newPw2){
            setChangePwMsg("The entered password are not same")
        }
        else if (user.password === newPw1){
            setChangePwMsg("Currently password and new password can not be same")
        }
        else if(newPw1.length <= 5 && newPw2.length <= 5){
            setChangePwMsg("New password length must be more than 5 characters")
        }
        else{
            dispatch(changePassword(newPw1));
            setChangePwMsg("Password has succesfully changed");
            e.target.reset();
        }
    }

    useEffect(() => {
        dispatch(refresh())
    }, [dispatch])


    return (
        <div onSubmit={(e) => e.preventDefault()} className="myaccount-content-div">
            <form>
                <h2>User Informations</h2>
                <div>
                    <div>
                        <input onChange={(e) => {
                            setName(e.target.value);
                            dispatch(onChangeUpdateUser({ x: e.target.name, y: e.target.value }))
                        }} type="text" defaultValue={user.name} name="name" required></input>
                    </div>

                    <div>
                        <input onChange={(e) => {
                            setLastname(e.target.value);
                            dispatch(onChangeUpdateUser({ x: e.target.name, y: e.target.value }))
                        }} type="text" defaultValue={user.lastname} name="lastname" required></input>
                    </div>
                </div>

                <div>
                    <input onChange={(e) => {
                        setEmail(e.target.value);
                        dispatch(onChangeUpdateUser({ x: e.target.name, y: e.target.value }))
                    }} type="text" defaultValue={user.email} name="email" required></input>
                </div>

                <div>
                    <input onChange={(e) => {
                        setTelephone(e.target.value);
                        dispatch(onChangeUpdateUser({ x: e.target.name, y: e.target.value }))
                    }} type="text" defaultValue={user.telephone} name="telephone" required></input>
                </div>
                <button className="user-update-btn"
                    disabled={arr.length === 0 ? true : false}
                    onClick={() => dispatch(updateUser({ name: name || user.name, lastname: lastname || user.lastname, email: email || user.email, telephone: telephone || user.telephone }))}
                    type="submit">Update</button>
            </form>
            
            <form onSubmit={(e) => changePasswordHandle(e)} className="change-password-form">
                <h2>Change Password</h2>
                <div>
                    <p>Currently Password</p>
                    <input onChange={(e) => setCurrentlyPw(e.target.value)} type="password" required></input>
                </div>

                <div>
                    <p>New Password</p>
                    <input onChange={(e) => setNewPw1(e.target.value)} type="password" required></input>
                </div>

                <div>
                    <p>New Password(again)</p>
                    <input onChange={(e) => setNewPw2(e.target.value)} type="password" required></input>
                </div>

                <button type="submit" style={{ width: 100 + "%" }} className="btn-grey">Update</button>

                <p style={{color: changePwMsg === "Password has succesfully changed" ? "green" : "red",display:changePwMsg === "" ? "none" : "block"}}>{changePwMsg && changePwMsg}</p>
                
            </form>
        </div>
    )
}