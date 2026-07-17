import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
function Booking() {

    const { templeId } = useParams();

    const [slots, setSlots] = useState([]);

    useEffect(() => {

        fetchSlots();

    }, []);

    const fetchSlots = async () => {

        try {

            const res = await api.get("/slots");

            const templeSlots = res.data.filter(

                slot => slot.temple._id === templeId

            );

            setSlots(templeSlots);

        }

        catch (err) {

            console.log(err);

        }

    };
    const bookTicket = async (slotId) => {

    try {

        const token = localStorage.getItem("token");

        if (!token) {

            toast.error("Please login first");

            return;

        }

        await api.post(

            "/bookings",

            {
                temple: templeId,
                slot: slotId,
                numberOfPersons: 1
            },

            {
                headers: {

                    Authorization: `Bearer ${token}`

                }
            }

        );

        toast.success("Ticket Booked Successfully");

        fetchSlots();

    }

    catch (err) {

        toast.error(

            err.response?.data?.message ||

            "Booking Failed"

        );

    }

};

    return (

        <div className="container mt-5">
    <ToastContainer />
            <h2 className="mb-4">

                Available Slots

            </h2>

           {
    slots.length === 0 ? (

        <div className="alert alert-warning text-center">
            No slots available for this temple.
        </div>

    ) : (

        slots.map(slot => (

            <div
                key={slot._id}
                className="card mb-3 p-3 shadow"
            >
                <h5>{slot.date}</h5>

                <p>{slot.time}</p>

                <p>₹ {slot.price}</p>

                <p>
                    Seats Left: {slot.availableSeats - slot.bookedSeats}
                </p>

                <button

    className="btn btn-success"

    onClick={() => bookTicket(slot._id)}

>

    Book Ticket

</button>
            </div>

        ))

    )
}

        </div>

    );

}

export default Booking;