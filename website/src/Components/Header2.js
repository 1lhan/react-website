import { useNavigate } from "react-router-dom";

export default function Header2 () {

    const navigate = useNavigate();

    return(
        <header>
            <div className="container">
                <button onClick={() => navigate('/')} className="logo">XYZ</button>
            </div>
        </header>
    )
}