import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api"
});

export default api;

// ADD THIS
export const getTemples = () =>
    api.get("/temples");

export const getMyBookings = (token) =>
    api.get("/bookings", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const cancelBooking = (id, token) =>
    api.put(
        `/bookings/cancel/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

export const donate = (data, token) =>
    api.post(
        "/donations",
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );