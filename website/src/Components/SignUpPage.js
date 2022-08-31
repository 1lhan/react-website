import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, confirmatory } from '../Slices/authSlice';

export default function LoginPage() {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [confirm, setConfirm] = useState("");
    const [signUpMsg, setSignUpMsg] = useState("")
    const [isEmailUsing, setIsEmailUsing] = useState("");
    const { users, confirmatoryRandoms } = useSelector(state => state.auth);



    useEffect(() => {
        dispatch(confirmatory())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i in users) {
            if (users[i].email === email) {
                setIsEmailUsing(false);
            } else {
                setIsEmailUsing(true);
            }
        }

        if (isEmailUsing === false) {
            setSignUpMsg("This email has already been using");
        }
        else if (confirmatoryRandoms !== confirm) {
            setSignUpMsg("Wrong Verification Code !");
        }
        else if (password !== password2) {
            setSignUpMsg("The passwords entered are not same");
        }
        else if (password.length <= 5) {
            setSignUpMsg("Password length must be more than 6 characters");
        }
        else {
            setSignUpMsg("Sign up Succesfull !");
            dispatch(signup({ name: name, email: email, password: password, password2: password2, confirm: confirm }));
            e.target.reset();
        }
    }

    return (
        <div className="signup-page-div">
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Sign Up</h2>
                <input onChange={(e) => setName(e.target.value)} placeholder="Name" type="name" required></input>
                <input onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" type="email" required></input>
                <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required></input>
                <input onChange={(e) => setPassword2(e.target.value)} placeholder="Password" type="password" required></input>
                <div className="confirmatory-div">
                    <p>{confirmatoryRandoms}</p>
                    <input onChange={(e) => setConfirm(e.target.value)} placeholder="<= Enter" type="text"></input>
                </div>
                <button type="submit">Sign Up</button>
                {signUpMsg && <p>{signUpMsg}</p>}
            </form>
        </div>
    )
}