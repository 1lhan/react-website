import { Link } from "react-router-dom"

export default function PageNotFound () {

    return(
        <div>
            <p>Page not founded</p>
            <Link to={'/'}>back to main page</Link>
        </div>
    )
}