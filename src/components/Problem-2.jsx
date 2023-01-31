import React from "react";
import { NavLink } from "react-router-dom";

const Problem2 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <NavLink to={"/contacts/"} className="btn btn-lg btn-outline-warning">
            All Contacts
          </NavLink>

          <NavLink
            to={"/country-contacts/United%20States/"}
            className="btn btn-lg btn-outline-warning"
          >
            US Contacts
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
