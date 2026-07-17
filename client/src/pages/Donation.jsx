import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { donate, getTemples } from "../services/api";

function Donation() {

    const [amount, setAmount] = useState("");
    const [temples, setTemples] = useState([]);
    const [temple, setTemple] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {

        fetchTemples();

    }, []);

    const fetchTemples = async () => {

        try {

            const res = await getTemples();

            setTemples(res.data);

        }

        catch (err) {

            console.log(err);

            toast.error("Failed to Load Temples");

        }

    };

    const handleDonate = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await donate(

                {
                    temple,
                    amount,
                    message
                },

                token

            );

            toast.success("Donation Successful ❤️");

            setTemple("");
            setAmount("");
            setMessage("");

        }

        catch (err) {

            console.log(err);

            toast.error(

                err.response?.data?.message ||

                "Donation Failed"

            );

        }

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">

                Make a Donation

            </h2>

            <form
                className="col-md-6 mx-auto"
                onSubmit={handleDonate}
            >

                <select
                    className="form-control mb-3"
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

                <input

                    className="form-control mb-3"

                    placeholder="Donation Amount"

                    type="number"

                    value={amount}

                    onChange={(e) => setAmount(e.target.value)}

                    required

                />

                <textarea

                    className="form-control mb-3"

                    placeholder="Message (Optional)"

                    value={message}

                    onChange={(e) => setMessage(e.target.value)}

                />

                <button

                    className="btn btn-success w-100"

                >

                    Donate

                </button>

            </form>

        </div>

    );

}

export default Donation;