import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", formData);

            toast.success("Registration Successful");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            toast.error(err.response?.data?.message || "Registration Failed");

        }

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "550px" }}>

            <ToastContainer />

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Register
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label>Name</label>

                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Phone</label>

                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button className="btn btn-success w-100">
                        Register
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Register;