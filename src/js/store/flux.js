const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			agenda: null,
			contacts: [],
		},
		actions: {

			loadAgenda: () => {
				fetch('https://playground.4geeks.com/contact/agendas/alexbv', {
					method: 'POST',
					body: JSON.stringify({ name: "alexbv" }),
					headers: { 'content-type': 'application/json' }
				})
				.then((response) => response.json())
				.then((agendaData) => setStore({ agenda: agendaData }))
				.catch((error) => console.error("Error al cargar la agenda:", error));
			},

			loadContacts: () => {
				fetch('https://playground.4geeks.com/contact/agendas/alexbv', {
					method: 'GET',
					headers: { 'content-type': 'application/json' }
				})
				.then((response) => response.json())
				.then((respJson) => setStore({ contacts: respJson.contacts }))
				.catch((error) => console.error('Error al cargar los contactos:', error));
			},

			createContact: (name, phone, email, address) => {
				fetch('https://playground.4geeks.com/contact/agendas/alexbv/contacts', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ name, phone, email, address }),
				})
				.then((response) => response.json())
				.then((data) => {
					const store = getStore();
					setStore({ contacts: [...store.contacts, data] });
				})
				.catch((error) => console.error("Error al crear un contacto:", error));
			},

			updateContact: (contactId) => {
				const store = getStore();
				const contactToUpdate = store.contacts.find(contact => contact.id === contactId);
				if (contactToUpdate) {
					fetch(`https://playground.4geeks.com/contact/agendas/alexbv/contacts/${contactId}`, {
						method: 'PUT',
						body: JSON.stringify(contactToUpdate),
						headers: { 'content-type': 'application/json' }
					})
					.then((response) => response.json())
					.then((updatedContact) => {
						const updatedContacts = store.contacts.map((contact) =>
							contact.id === contactId ? updatedContact : contact
						);
						setStore({ contacts: updatedContacts });
					})
					.catch((error) => console.error('Error al actualizar el contacto:', error));
				}
			},

			deleteContact: (contactId) => {
				fetch(`https://playground.4geeks.com/contact/agendas/alexbv/contacts/${contactId}`, {
					method: 'DELETE',
					headers: { 'content-type': 'application/json' }
				})
				.then((response) => {
					if (response.ok) {
						const store = getStore();
						setStore({ contacts: store.contacts.filter(contact => contact.id !== contactId) });
					} else {
						console.error('Error al eliminar el contacto');
					}
				})
				.catch((error) => console.error('Error al eliminar el contacto:', error));
			}
		}
	};
};
export default getState;
