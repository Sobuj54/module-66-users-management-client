import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUser = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("inside post response", data);
        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };

  return (
    <>
      <h1>User management system</h1>
      <div>user : {users.length}</div>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" required /> <br />
        <input type="text" name="email" required />
        <br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </div>
    </>
  );
}

export default App;
