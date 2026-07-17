import { Link } from "react-router-dom";
function TempleCard({ temple }) {

    return (

        <div className="col-md-4 mb-4">

            <div className="card shadow h-100">

                <img
                    src={temple.image}
                    className="card-img-top"
                    alt={temple.name}
                    style={{
                        height: "220px",
                        objectFit: "cover"
                    }}
                />

               <div className="card-body">

    <h5>{temple.name}</h5>

    <p>📍 {temple.location}</p>

    <p>{temple.description}</p>

    <Link
        to={`/booking/${temple._id}`}
        className="btn btn-primary w-100"
    >
        View Slots
    </Link>

</div>

            </div>

        </div>

    );

}

export default TempleCard;