import { useState } from "react";
import api from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            const res = await api.post("/auth/login", formData);

localStorage.setItem("token",res.data.token);

localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);
            toast.success("Login Successful");

            setTimeout(() => {
    window.location.href = "/dashboard";
},1500);

        } catch (err) {

            toast.error(err.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="container mt-5" style={{ maxWidth: "500px" }}>

            <ToastContainer />

            <div className="card shadow p-4">

                <h2 className="text-center mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

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

                    <button
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>

    );

}

export default Login;