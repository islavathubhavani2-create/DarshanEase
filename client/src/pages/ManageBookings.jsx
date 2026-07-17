import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Loader from "../components/Loader";

function ManageBookings() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(

                "/bookings",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

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

    const handleCancel = async(id)=>{

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if(!confirmCancel) return;

        try{

            const token = localStorage.getItem("token");

            await api.put(

                `/bookings/cancel/${id}`,

                {},

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            toast.success("Booking Cancelled Successfully");

            fetchBookings();

        }

        catch(err){

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Cancellation Failed"

            );

        }

    };

    if(loading){

        return <Loader/>;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Manage Bookings

            </h2>

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>User</th>

                        <th>Temple</th>

                        <th>Date</th>

                        <th>Persons</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        bookings.length===0

                        ?

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center"
                            >

                                No Bookings Found

                            </td>

                        </tr>

                        :

                        bookings.map((booking)=>(

                            <tr key={booking._id}>

                                <td>

                                    {booking.user.name}

                                </td>

                                <td>

                                    {booking.temple.name}

                                </td>

                                <td>

                                    {new Date(
                                        booking.slot.date
                                    ).toLocaleDateString()}

                                </td>

                                <td>

                                    {booking.numberOfPersons}

                                </td>

                                <td>

                                    {

                                        booking.bookingStatus==="BOOKED"

                                        ?

                                        <span className="badge bg-success">

                                            BOOKED

                                        </span>

                                        :

                                        <span className="badge bg-danger">

                                            CANCELLED

                                        </span>

                                    }

                                </td>

                                <td>

                                    {

                                        booking.bookingStatus==="BOOKED"

                                        &&

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>handleCancel(booking._id)}

                                        >

                                            Cancel

                                        </button>

                                    }

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageBookings;