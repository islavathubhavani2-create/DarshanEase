import { Link } from "react-router-dom";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    const role = user?.role;

    const logout = () => {

        localStorage.clear();

        window.location = "/login";

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    🛕 DarshanEase
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        <li className="nav-item">

                            <Link className="nav-link" to="/">
                                Home
                            </Link>

                        </li>

                        {(role === "USER" || role === "ADMIN") && (

                            <>
                                <li className="nav-item">

                                    <Link className="nav-link" to="/temples">
                                        Temples
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/dashboard">
                                        My Bookings
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/donate">
                                        Donate
                                    </Link>

                                </li>

                            </>

                        )}

                        {role === "ADMIN" && (

                            <>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/admin">
                                        Dashboard
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/admin/temples">
                                        Manage Temples
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/admin/slots">
                                        Manage Slots
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/admin/bookings">
                                        Manage Bookings
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/admin/donations">
                                        Donations
                                    </Link>

                                </li>

                            </>

                        )}

                        {!user && (

                            <>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/login">
                                        Login
                                    </Link>

                                </li>

                                <li className="nav-item">

                                    <Link className="nav-link" to="/register">
                                        Register
                                    </Link>

                                </li>

                            </>

                        )}

                        {user && (

                            <li className="nav-item">

                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                            </li>

                        )}

                    </ul>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;