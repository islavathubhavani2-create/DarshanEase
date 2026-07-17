import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="container text-center mt-5">

            <h1 className="display-1 text-danger">

                404

            </h1>

            <h2>

                Page Not Found

            </h2>

            <p className="lead">

                The page you are looking for doesn't exist.

            </p>

            <Link
                to="/"
                className="btn btn-primary mt-3"
            >

                Go Home

            </Link>

        </div>

    );

}

export default NotFound;