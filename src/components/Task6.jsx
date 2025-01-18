import { useState } from "react";
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

const initialUsers = [
  {
    id: 1,
    name: "Alex",
    surname: "White",
    age: 21,
    is_admin: false,
  },
  {
    id: 2,
    name: "N",
    surname: "Utkirova",
    age: 23,
    is_admin: false,
  },
  {
    id: 3,
    name: "Sharofiddin",
    surname: "Sayfiddinov",
    age: 24,
    is_admin: true,
  },
  {
    id: 4,
    name: "Zak",
    surname: "Makhametov",
    age: 25,
    is_admin: true,
  },
  {
    id: 5,
    name: "Asliddin",
    surname: "Jumayev",
    age: 25,
    is_admin: true,
  },
];

export default function Task6() {
  const [users, setUsers] = useState(initialUsers);
  const [modal, setModal] = useState({
    show: false,
    user: null,
    type: "edit",
  });

  const handleDelete = (id) => {
    setUsers(users.filter((p) => p.id !== id));
  };

  return (
    <>
      <Button onClick={() => setModal({ show: true, user: null, type: "add" })}>
        Add
      </Button>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Admin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.age}</td>
              <td>{user.is_admin ? "Yes" : "No"}</td>
              <td>
                <Button
                  onClick={() => setModal({ show: true, user, type: "edit" })}
                >
                  Edit
                </Button>
                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modal.show && (
        <Modal modal={modal} setModal={setModal} setUsers={setUsers} />
      )}
    </>
  );
}

// is-admin kebab-case
// isAdmin camelCase
// IsAdmin PascalCase
// is_admin snake_case
