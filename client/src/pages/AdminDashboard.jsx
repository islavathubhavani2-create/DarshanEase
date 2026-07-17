import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

    const [stats, setStats] = useState({

        totalUsers: 0,
        totalTemples: 0,
        totalSlots: 0,
        totalBookings: 0,
        totalDonations: 0,
        totalDonationAmount: 0

    });

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setStats(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-5">

                Admin Dashboard

            </h2>

            <div className="row">

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Users</h5>

                        <h2>{stats.totalUsers}</h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Temples</h5>

                        <h2>{stats.totalTemples}</h2>

                    </div>

                </div>

                <div className="col-md-4 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Slots</h5>

                        <h2>{stats.totalSlots}</h2>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Bookings</h5>

                        <h2>{stats.totalBookings}</h2>

                    </div>

                </div>

                <div className="col-md-6 mb-4">

                    <div className="card shadow text-center p-4">

                        <h5>Total Donations</h5>

                        <h2>{stats.totalDonations}</h2>

                    </div>

                </div>

                <div className="col-md-12">

                    <div className="card shadow text-center p-4">

                        <h5>Total Donation Amount</h5>

                        <h2>₹ {stats.totalDonationAmount}</h2>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;