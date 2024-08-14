import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(contacts);

  return (
    <>
      <h1>Contacts App</h1>

      {contacts.length ? (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {contact.name} - {contact.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No contacts found</p>
      )}

      <hr />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          const email = document.getElementById("email");
          const name = document.getElementById("name");
          const phone = document.getElementById("phone");

          const contact = {
            name: name.value,
            email: email.value,
            phone: phone.value,
          };

          console.log(contact);
          console.log(JSON.stringify(contact));

          fetch("http://localhost:5000/api/contacts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(contact),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              setContacts([...contacts, data]);
            })
            .catch((error) => console.log(error));
        }}
      >
        <input type="text" name="name" placeholder="Name" id="name" />
        <input type="email" name="email" placeholder="Email" id="email" />
        <input type="tel" name="phone" placeholder="Phone" id="phone" />
        <button type="submit">Add Contact</button>
      </form>
    </>
  );
}

export default App;
