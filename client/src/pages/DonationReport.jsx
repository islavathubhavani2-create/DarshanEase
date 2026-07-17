import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

function DonationReport() {

    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDonations();

    }, []);

    const fetchDonations = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(

                "/donations",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setDonations(res.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Donation Report

            </h2>

            <table className="table table-bordered table-hover">

                <thead>

                    <tr>

                        <th>User</th>

                        <th>Temple</th>

                        <th>Amount</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        donations.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center"
                                    >

                                        No Donations Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                donations.map((d) => (

                                    <tr key={d._id}>

                                        <td>{d.user.name}</td>

                                        <td>{d.temple.name}</td>

                                        <td className="fw-bold text-success">

                                            ₹ {d.amount}

                                        </td>

                                        <td>

                                            {new Date(d.createdAt).toLocaleDateString()}

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

export default DonationReport;