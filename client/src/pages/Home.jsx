import { Link } from "react-router-dom";

function Home() {
    return (

        <div className="container mt-5">

            <div className="row align-items-center">

                <div className="col-md-6">

                    <h1 className="display-3 fw-bold text-primary">

                        🛕 DarshanEase

                    </h1>

                    <h2 className="fw-bold mt-3">

                        Book Temple Darshan Online

                    </h2>

                    <p className="lead mt-3">

                        Experience a simple, secure and hassle-free way to
                        book darshan tickets for your favorite temples.

                    </p>

                    <div className="mt-4">

                        <Link
                            to="/temples"
                            className="btn btn-primary btn-lg me-3"
                        >
                            Explore Temples
                        </Link>

                        <Link
                            to="/register"
                            className="btn btn-outline-success btn-lg"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

                <div className="col-md-6 text-center">

                    <img
                        src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900"
className="img-fluid shadow hero-image"                        alt="Temple"
                    />

                </div>

            </div>

            <div className="row text-center mt-5">

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h2 className="text-primary">

                            100+

                        </h2>

                        <h5>Temples</h5>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h2 className="text-success">

                            50K+

                        </h2>

                        <h5>Bookings</h5>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow p-4">

                        <h2 className="text-danger">

                            99%

                        </h2>

                        <h5>Customer Satisfaction</h5>

                    </div>

                </div>

            </div>
  <footer className="footer">

            <h5>🛕 DarshanEase</h5>

            <p>Book Temple Darshan Online Easily</p>

            <hr />

            <p className="copyright">
                © 2026 DarshanEase. All Rights Reserved.
            </p>

        </footer>
        </div>

    );
}

export default Home;