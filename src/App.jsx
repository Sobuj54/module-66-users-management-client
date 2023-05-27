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

    console.log(user);
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
    </>
  );
}

export default App;