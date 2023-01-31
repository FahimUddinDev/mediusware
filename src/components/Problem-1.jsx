import React, { useState, useEffect } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [data, setData] = useState([]);
  const [active, setActive] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const onSubmit = (e) => {
    setData([...data, { name: name, status: status }]);
    setName("");
    setStatus("");
    e.preventDefault();
  };

  const handleClick = (val) => {
    setShow(val);
  };

  const handleChange = (e) => {
    e.target.name === "name"
      ? setName(e.target.value)
      : setStatus(e.target.value);
  };

  const getActive = (condition) => {
    if (condition === "all") {
      const active = data.filter(
        (item) => item.status.toLowerCase() === "active"
      );
      const completed = data.filter(
        (item) => item.status.toLowerCase() === "completed"
      );
      const other = data.filter(
        (item) =>
          item.status.toLowerCase() !== "active" &&
          item.status.toLowerCase() !== "completed"
      );
      setActive([...active, ...completed, ...other]);
    } else {
      setActive(data.filter((item) => item.status.toLowerCase() === condition));
    }
  };

  useEffect(() => {
    getActive(show);
  }, [show, data]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto">
              <input
                name="name"
                value={name}
                type="text"
                className="form-control"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-auto">
              <input
                name="status"
                value={status}
                type="text"
                className="form-control"
                placeholder="Status"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSubmit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {active.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
