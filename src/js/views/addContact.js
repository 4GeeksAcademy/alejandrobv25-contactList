import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/addContact.css";


export const AddContact = ({ addContactToList }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();
    fetch('https://playground.4geeks.com/contact/agendas/alexbv/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        address
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Contact:", data);
        addContactToList(data);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error al guardar el contacto:", error);
      });
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