import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    getMyBookings,
    cancelBooking
} from "../services/api";
import Loader from "../components/Loader";

function Dashboard() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await getMyBookings(token);

            setBookings(res.data);

        }

        catch (err) {

            console.log(err);

            toast.error("Failed to Load Bookings");

        }

        finally {

            setLoading(false);

        }

    };

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmCancel) return;

        try {

            const token = localStorage.getItem("token");

            await cancelBooking(id, token);

            toast.success("Booking Cancelled Successfully");

            fetchBookings();

        }

        catch (err) {

            console.log(err);

            toast.error(
                err.response?.data?.message || "Cancellation Failed"
            );

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                My Bookings

            </h2>

            {

                bookings.length === 0 ? (

                    <div className="alert alert-info text-center">

                        No Bookings Yet

                    </div>

                ) : (

                    bookings.map((booking) => (

                        <div
                            className="card shadow mb-4 p-4"
                            key={booking._id}
                        >

                            <h4 className="text-primary">

                                {booking.temple.name}

                            </h4>

                            <hr />

                            <p>

                                <strong>Date :</strong>{" "}

                                {new Date(
                                    booking.slot.date
                                ).toLocaleDateString()}

                            </p>

                            <p>

                                <strong>Time :</strong>{" "}

                                {booking.slot.time}

                            </p>

                            <p>

                                <strong>Persons :</strong>{" "}

                                {booking.numberOfPersons}

                            </p>

                            <p>

                                <strong>Total Amount :</strong>{" "}

                                ₹{booking.totalAmount}

                            </p>

                            <p>

                                <strong>Status :</strong>{" "}

                                {

                                    booking.bookingStatus === "BOOKED"

                                        ?

                                        <span className="badge bg-success">

                                            BOOKED

                                        </span>

                                        :

                                        <span className="badge bg-danger">

                                            CANCELLED

                                        </span>

                                }

                            </p>

                            {

                                booking.bookingStatus === "BOOKED" &&

                                <button

                                    className="btn btn-danger"

                                    onClick={() => handleCancel(booking._id)}

                                >

                                    Cancel Booking

                                </button>

                            }

                        </div>

                    ))

                )

            }

        </div>

    );

}

export default Dashboard;