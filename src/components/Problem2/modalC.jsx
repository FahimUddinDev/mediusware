import { Modal } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
const Describe = ({ open, handelModal, info }) => {
  return (
    <Modal
      open={open}
      onClose={handelModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="container">
        <div
          className="row mt-5"
          style={{
            background: "white",
            margin: "20px",
            borderRadius: "10px",
            padding: "20px",
            gap: "20px",
          }}
        >
          <div
            className="d-flex justify-content-between"
            style={{ gap: "10px" }}
          >
            <div className="d-flex" style={{ gap: "10px" }}>
              <NavLink
                onClick={handelModal}
                to={"/contacts/"}
                className="btn btn-outline-warning"
              >
                All Contacts
              </NavLink>
              <NavLink
                onClick={handelModal}
                to={"/country-contacts/United%20States/"}
                className="btn btn-outline-warning"
              >
                US Contacts
              </NavLink>
            </div>
            <button onClick={handelModal} className="btn btn-outline-warning">
              Close
            </button>
          </div>
          <div style={{ width: "600px" }}>
            <h4>Contact NO : {info?.id}</h4>
            <h4>Contact Number : {info?.phone}</h4>
            <h4>Country : {info?.country?.name}</h4>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Describe;
