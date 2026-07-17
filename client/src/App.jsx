import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Temples from "./pages/Temples";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Donation from "./pages/Donation";
import ManageTemples from "./pages/ManageTemples";
import ManageSlots from "./pages/ManageSlots";
import ManageBookings from "./pages/ManageBookings";
import DonationReport from "./pages/DonationReport";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/temples"
                    element={<Temples />}
                />

                <Route
                    path="/booking/:templeId"
                    element={<Booking />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/donate"
                    element={
                        <ProtectedRoute>
                            <Donation />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute adminOnly>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/temples"
                    element={
                        <ProtectedRoute adminOnly>
                            <ManageTemples />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/slots"
                    element={
                        <ProtectedRoute adminOnly>
                            <ManageSlots />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/bookings"
                    element={
                        <ProtectedRoute adminOnly>
                            <ManageBookings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/donations"
                    element={
                        <ProtectedRoute adminOnly>
                            <DonationReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />

        </BrowserRouter>

    );

}

export default App;