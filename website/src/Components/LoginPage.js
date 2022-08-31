import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, confirmatory } from '../Slices/authSlice';

export default function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const { confirmatoryRandoms, users } = useSelector(state => state.auth);
    const [loginErrMsg,setloginErrMsg] = useState("");


    useEffect(() => {
        dispatch(confirmatory());
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (confirmatoryRandoms === confirm) {
            for (let i in users) {
                if (users[i].email === email &&
                    users[i].password === password) {
                    dispatch(login({ email: email, password: password }));
                    navigate('/');
                    setloginErrMsg("");
                }
                else{
                    console.log("E-mail or password wrong");
                    setloginErrMsg("E-mail or password wrong");
                }
            }
        }
        else {
            console.log("Wrong Verification Code !");
            setloginErrMsg("Wrong Verification Code !");
        }
    }

    return (
        <div className="login-page-div">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Log in</h2>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail" type="email" required></input>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" type="password" required></input>
                <div className="confirmatory-div">
                    <p>{confirmatoryRandoms}</p>
                    <input onChange={(e) => setConfirm(e.target.value)} placeholder="<= Enter" type="text"></input>
                </div>{}
                <p>{loginErrMsg && loginErrMsg}</p>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}