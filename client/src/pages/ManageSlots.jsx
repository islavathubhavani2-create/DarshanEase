import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Loader from "../components/Loader";

function ManageSlots() {

    const [slots, setSlots] = useState([]);
    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);

    const [temple, setTemple] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [availableSeats, setAvailableSeats] = useState("");
    const [price, setPrice] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const [slotRes, templeRes] = await Promise.all([
                api.get("/slots"),
                api.get("/temples")
            ]);

            setSlots(slotRes.data);
            setTemples(templeRes.data);

        }

        catch (err) {

            console.log(err);

            toast.error("Failed to Load Slots");

        }

        finally {

            setLoading(false);

        }

    };

    const handleAddSlot = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (editingId) {

                await api.put(

                    `/slots/${editingId}`,

                    {
                        temple,
                        date,
                        time,
                        availableSeats,
                        price
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                toast.success("Slot Updated Successfully");

            }

            else {

                await api.post(

                    "/slots",

                    {
                        temple,
                        date,
                        time,
                        availableSeats,
                        price
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                toast.success("Slot Added Successfully");

            }

            setTemple("");
            setDate("");
            setTime("");
            setAvailableSeats("");
            setPrice("");
            setEditingId(null);

            fetchData();

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Something Went Wrong"

            );

        }

    };

    const handleDeleteSlot = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this slot?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/slots/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Slot Deleted Successfully");

            fetchData();

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Delete Failed"

            );

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Manage Slots

            </h2>

            <form
                className="row g-3 mb-5"
                onSubmit={handleAddSlot}
            >

                <div className="col-md-6">

                    <select
                        className="form-control"
                        value={temple}
                        onChange={(e) => setTemple(e.target.value)}
                        required
                    >

                        <option value="">

                            Select Temple

                        </option>

                        {

                            temples.map((t) => (

                                <option
                                    key={t._id}
                                    value={t._id}
                                >

                                    {t.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="col-md-6">

                    <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-3">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Seats"
                        value={availableSeats}
                        onChange={(e) => setAvailableSeats(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-3">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-12">

                    <button className="btn btn-success">

                        {editingId ? "Update Slot" : "Add Slot"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>Temple</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Seats</th>

                        <th>Booked</th>

                        <th>Price</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        slots.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="text-center"
                                    >

                                        No Slots Available

                                    </td>

                                </tr>

                            )

                            :

                            (

                                slots.map((slot) => (

                                    <tr key={slot._id}>

                                        <td>{slot.temple.name}</td>

                                        <td>{new Date(slot.date).toLocaleDateString()}</td>

                                        <td>{slot.time}</td>

                                        <td>{slot.availableSeats}</td>

                                        <td>{slot.bookedSeats}</td>

                                        <td>₹ {slot.price}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => {

                                                    setEditingId(slot._id);

                                                    setTemple(slot.temple._id);
                                                    setDate(slot.date);
                                                    setTime(slot.time);
                                                    setAvailableSeats(slot.availableSeats);
                                                    setPrice(slot.price);

                                                }}
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteSlot(slot._id)}
                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ManageSlots;