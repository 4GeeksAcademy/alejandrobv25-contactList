import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; 
import "../../styles/addContact.css";

export const AddContact = () => {
  const { store, actions } = useContext(Context); 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createContact(name, phone, email, address); 
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };

  return (
    <div className="container-fluid">
      <h1>Add Contact</h1>
      <form className="m-3" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Phone</label>
          <input
            type="number"
            className="form-control"
            placeholder="+34 XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Add Contact
        </button>
      </form>
      <Link to="/contactList">Return to contact list</Link>
    </div>
  );
};
