import React, { useState, useEffect } from "react";
import { useLocation, NavLink, useNavigate } from "react-router-dom";
import Describe from "./modalC";

function Modals() {
  const location = useLocation();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [even, setEven] = useState(false);
  const [page, setPage] = useState(1);
  const [active, setActive] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = `https://contact.mediusware.com/api${location.pathname}?search=${search}&page=${page}`;
  const handelModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const getData = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContacts(data.results);
      });
  };

  const getDataOnScroll = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setContacts([...contacts, ...data.results]);
      });
  };

  const handleInfinityScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight &&
        search === ""
      ) {
        setPage(page + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOnScroll(url);
  }, [page]);
  useEffect(() => {
    getData(url);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfinityScroll);
    return () => window.removeEventListener("scroll", handleInfinityScroll);
  }, [page]);

  const navigate = useNavigate();

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (search === "" || search) {
        setPage(1);
        navigate(`${location.pathname + "?search=" + search}`);
        getData(url);
      }
    }, 3000);
    return () => clearTimeout(timeOutId);
  }, [search]);

  const handleChange = (value) => {
    setSearch(value);
  };

  return (
    <div style={{ background: "white" }}>
      <div
        style={{
          padding: "10px",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "20px",
            gap: "10px",
          }}
        >
          <NavLink
            to={"/contacts/"}
            className="btn btn-outline-warning"
            style={{ background: "#46139f", border: "none", color: "white" }}
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            All Contacts
          </NavLink>
          <NavLink
            to={"/country-contacts/United%20States/"}
            className="btn btn-outline-warning"
            style={{ background: "#ff7f50", border: "none", color: "white" }}
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            US Contacts
          </NavLink>
          <NavLink
            to={"/problem-2"}
            className="btn btn-outline-warning"
            style={{
              background: "white",
              border: "2px solid #46139f",
              color: "#46139f",
            }}
            onClick={() => {
              setPage(1);
              setSearch("");
            }}
          >
            Close
          </NavLink>
          <input
            type="text"
            placeholder="Search"
            value={search}
            className="form-control"
            style={{ width: "200px" }}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                setPage(1);
                navigate(`${location.pathname + "?search=" + search}`);
                getData(url);
              }
            }}
          />
        </div>
        <div
          style={{
            padding: "20px",
            color: "black",
            marginBottom: "20px",
          }}
        >
          <table
            className="table"
            style={{
              minWidth: "500px",
            }}
          >
            <thead className="thead-light" style={{ background: "#e9ecef" }}>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Phone</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((item, index) => {
                if (even) {
                  if (parseInt(item?.id) % 2 === 0) {
                    return (
                      <tr
                        key={index}
                        onClick={() => {
                          handelModal();
                          setActive([...item]);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <th scope="row">{item?.id}</th>
                        <td>{item?.phone}</td>
                        <td>{item?.country.name}</td>
                      </tr>
                    );
                  }
                } else {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        handelModal();
                        setActive(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <th scope="row">{item?.id}</th>
                      <td>{item?.phone}</td>
                      <td>{item?.country.name}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div
          style={{
            position: "fixed",
            padding: "10px",
            bottom: "0px",
            background: "#e9ecef",
            minWidth: "500px",
            gap: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <label style={{ fontSize: "20px", fontWeight: "bold" }}>
            Only even :{" "}
            <input
              type="checkbox"
              style={{ width: "20px" }}
              name="even"
              onChange={(e) => setEven(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <Describe open={isModalOpen} handelModal={handelModal} info={active} />
    </div>
  );
}

export default Modals;
