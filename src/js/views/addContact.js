import React, { useState } from 'react';


export const AddContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adress, setAdress] = useState('');

  const createContact = (newContact) => {
    fetch('https://playground.4geeks.com/contact/agendas/alexbv/contacts', {
      method: 'POST',
      body: JSON.stringify(newContact),
      headers: { 'content-type': 'application/json' }
    })
      .then((response) => response.json())
      .then((addedContact) => {
        setContacts((prevContacts) => [...prevContacts, addedContact]);
      })
      .catch((error) => console.error('Error creating contact:', error));
  };

  return (
    <div>
      <h2>Add New Contact</h2>
      <form >
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={createContact}>Add Contact</button>
      </form>
    </div>
  );
};
