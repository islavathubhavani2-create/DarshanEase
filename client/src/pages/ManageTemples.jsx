import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import Loader from "../components/Loader";

function ManageTemples() {

    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        fetchTemples();

    }, []);

    const fetchTemples = async () => {

        try {

            const res = await api.get("/temples");

            setTemples(res.data);

        }

        catch (err) {

            console.log(err);

            toast.error("Failed to Load Temples");

        }

        finally {

            setLoading(false);

        }

    };

    const handleAddTemple = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            if (editingId) {

                await api.put(

                    `/temples/${editingId}`,

                    {
                        name,
                        location,
                        description,
                        image
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                toast.success("Temple Updated Successfully");

            }

            else {

                await api.post(

                    "/temples",

                    {
                        name,
                        location,
                        description,
                        image
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }

                );

                toast.success("Temple Added Successfully");

            }

            setName("");
            setLocation("");
            setDescription("");
            setImage("");
            setEditingId(null);

            fetchTemples();

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Something Went Wrong"

            );

        }

    };

    const handleDeleteTemple = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this temple?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/temples/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("Temple Deleted Successfully");

            fetchTemples();

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

                Manage Temples

            </h2>

            <form
                className="row g-3 mb-5"
                onSubmit={handleAddTemple}
            >

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Temple Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-6">

                    <input
                        className="form-control"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-12">

                    <textarea
                        className="form-control"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-12">

                    <input
                        className="form-control"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />

                </div>

                <div className="col-md-12">

                    <button className="btn btn-success">

                        {editingId ? "Update Temple" : "Add Temple"}

                    </button>

                </div>

            </form>

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Location</th>

                        <th>Description</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        temples.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >

                                        No Temples Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                temples.map((temple) => (

                                    <tr key={temple._id}>

                                        <td>{temple.name}</td>

                                        <td>{temple.location}</td>

                                        <td>{temple.description}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => {

                                                    setEditingId(temple._id);

                                                    setName(temple.name);
                                                    setLocation(temple.location);
                                                    setDescription(temple.description);
                                                    setImage(temple.image);

                                                }}
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteTemple(temple._id)}
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

export default ManageTemples;