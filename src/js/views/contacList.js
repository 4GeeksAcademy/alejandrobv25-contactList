import React, { useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';
import "../../styles/contactList.css";

export const ContactList = () => {
  const { store, actions } = React.useContext(Context);
  const [contacts, setContacts] = useState(store.contacts);

  useEffect(() => {
    if (!store.agenda) {
      actions.loadAgenda();
    }
  }, [actions, store.agenda]);

  useEffect(() => {
    if (store.agenda && store.contacts.length === 0) {
      actions.loadContacts();
    }
  }, [actions, store.agenda, store.contacts.length]);

  useEffect(() => {
    setContacts(store.contacts);
  }, [store.contacts]);

  return (
    <div>
      <div className="container">
        <Link to="/addContact" className="btn btn-success">Add Contact</Link>
        <h1>Contacts Alexbv</h1>
        {
          contacts && contacts.length > 0 ? (
            contacts.map((contact) => (
              <li className="contact-card" key={contact.id}>
                <h3>{contact.name}</h3>
                <p>Email: {contact.email}</p>
                <p>Phone: {contact.phone}</p>
                <p>Address: {contact.address}</p>
                <Link onClick={() => actions.deleteContact(contact.id)} className="delete-icon">
                  <i className="fas fa-trash"></i>
                </Link>
              </li>
            ))
          ) : (
            <p>No contacts available</p>
          )
        }
      </div>
    </div>
  );
};
