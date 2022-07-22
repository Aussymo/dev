import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const App = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  //json data
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState("");
  const [newLast, setNewLast] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    Axios.get("https://dev072220222.herokuapp.com/api/get").then((response) => {
      setData(response.data);
    });
  }, []);

  const submitEmployee = () => {
    Axios.post("https://dev072220222.herokuapp.com/api/insert", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    }).then(() => {
      alert("Successfully added employee");
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`https://dev072220222.herokuapp.com/api/delete/${id}`);
  };

  const updateData = (id) => {
    Axios.put(`https://dev072220222.herokuapp.com/api/update/${id}`, {
      id: id,
      firstName: newData,
      lastName: newLast,
      email: newEmail,
      phoneNumber: newPhone,
    });
    setNewData("");
    setNewLast("");
    setNewEmail("");
    setNewPhone("");
  };

  return (
    <div className="form">
      <form>
        <h1>Registration</h1>
        <input
          type="text"
          className="first"
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="last"
          placeholder="last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="phone"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit" className="submit" onClick={submitEmployee}>
          Submit
        </button>
        <br />
        <br />
      </form>

      <br />
      <br />

      {/* update employee */}

      <Card className="cards">
        {data.map((value) => {
          {
            console.log(value);
          }
          return (
            <ListGroup>
              <h1 className="title">Updating...</h1>
              <ListGroup.Item>
                {value.firstName}
                <input
                  type="text"
                  className="firstName"
                  placeholder="First Name"
                  onChange={(e) => {
                    setNewData(e.target.value);
                  }}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {value.lastName}
                <input
                  type="text"
                  placeholder="Last Name"
                  className="lastName"
                  onChange={(e) => {
                    setNewLast(e.target.value);
                  }}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {value.email}
                <input
                  type="email"
                  placeholder="Email"
                  className="email"
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                {value.phoneNumber}
                <input
                  type="text"
                  placeholder="phoneNumber"
                  className="phoneNumber"
                  onChange={(e) => {
                    setNewPhone(e.target.value);
                  }}
                />
              </ListGroup.Item>
              <button
                type="submit"
                className="update"
                onClick={() => {
                  updateData(value.id);
                }}
              >
                Update
              </button>
            </ListGroup>
          );
        })}
      </Card>

      <br />
      <br />
      {/* added employess */}
      <Table striped bordered hover size="sm">
        <thead>
          <h1>All Employees</h1>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value) => {
            return (
              <tr>
                <td>
                  {value.id} <br />{" "}
                </td>{" "}
                <td>{value.firstName}</td>
                <td>{value.lastName}</td>
                <td>{value.email}</td>
                <td>{value.phoneNumber}</td>
                <td>
                  <button
                    type="submit"
                    className="delete"
                    onClick={() => {
                      deleteEmployee(value.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <br />
      <br />
    </div>
  );
};

export default App;
