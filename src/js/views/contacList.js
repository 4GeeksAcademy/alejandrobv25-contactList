import React, { useEffect, useState } from 'react';
import "../../styles/contactList.css";
import { Link } from 'react-router-dom';


export const ContactList = () => {
  const [agenda, setAgenda] = useState([null]);
  const [contacts, setContacts] = useState([]);


  useEffect(() => {
    fetch('https://playground.4geeks.com/contact/agendas/alexbv', {
      method: 'POST',
      body: JSON.stringify({ name: "alexbv" }),
      headers: { 'content-type': 'application/json' }
    })
      .then((response) => response.json())
      .then((agendaData) => setAgenda(agendaData));
  }, []);


  useEffect(() => {
    fetch('https://playground.4geeks.com/contact/agendas/alexbv', {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then((response) => response.json())
      .then((respJson) => setContacts(respJson.contacts));
  }, [agenda]);


  const handleUpdateContact = (contactId) => {
    const contactToUpdate = contacts.find(contact => contact.id === contactId);
    if (contactToUpdate) {
      fetch(`https://playground.4geeks.com/contact/agendas/alexbv/contacts/${contactId}`, {
        method: 'PUT',
        body: JSON.stringify(contactToUpdate),
        headers: { 'content-type': 'application/json' }
      })
        .then((response) => response.json())
        .then((updatedContact) => {
          setContacts((prevContacts) =>
            prevContacts.map((contact) =>
              contact.id === contactId ? updatedContact : contact
            )
          );
        })
        .catch((error) => console.error('Error updating contact:', error));
    }
  };


  const handleDeleteContact = (contactId) => {
    fetch(`https://playground.4geeks.com/contact/agendas/alexbv/contacts/${contactId}`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
      .then((response) => {
        if (response.ok) {
          setContacts(contacts.filter(contact => contact.id !== contactId));
        } else {
          console.error('Error deleting contact');
        }
      })
      .catch((error) => console.error('Error deleting contact:', error));
  };

  return (
    <div>

      <div className="container">
        <Link to="/addContact" className='btn btn-success'> add contact </Link>
        <h1>Contacts Alexbv</h1>
        {contacts.map((contact) => (
          <li className="contact-card" key={contact.id}>
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Adress: {contact.address}</p>
            <Link onClick={() => handleDeleteContact(contact.id)} className='delete-icon'><i className="fas fa-trash"></i></Link>
          </li>
        ))}
      </div>
    </div>
  );
};
