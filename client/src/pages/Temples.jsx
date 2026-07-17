import { useEffect, useState } from "react";
import api from "../services/api";
import TempleCard from "../components/TempleCard";
import Loader from "../components/Loader";

function Temples() {

    const [temples, setTemples] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getTemples();

    }, []);

    const getTemples = async () => {

        try {

            const res = await api.get("/temples");

            setTemples(res.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="container mt-5">

            <h2 className="mb-4 text-center">

                Temple List

            </h2>

            {

                temples.length === 0 ? (

                    <div className="alert alert-info text-center">

                        No Temples Available

                    </div>

                ) : (

                    <div className="row">

                        {

                            temples.map((temple) => (

                                <TempleCard
                                    key={temple._id}
                                    temple={temple}
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default Temples;