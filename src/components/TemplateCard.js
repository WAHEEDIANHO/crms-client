import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

import "../css/criminal.css";

function Card({ api, data, pre, handleDelete }) {
  return (
    <div className="col-md-3">
      <div className="card template-card">
        <div className="image">
          <img src={`${api}/${data.imageUrl}`} alt="profile" />
        </div>
        <div className="card-text p-2">
          <div className="h4">{data.sname}</div>
          <div className="meta">
            <span
              className={`badge bg-${
                data.crime
                  ? "info"
                  : data.role === "admin"
                  ? "success"
                  : data.role === "staff"
                  ? "warning"
                  : "danger"
              } rounded-pill d-inline`}
            >
              {data.crime ? data.crime : data.role}
            </span>
          </div>
          <div className="description text-muted text-wrap">{data.address}</div>
        </div>
        <div className="card-footer text-end">
          <EditBtn pre={pre} id={data._id} />
          <DeleteBtn id={data._id} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Card;
