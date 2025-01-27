import { useEffect, useState } from "react";
import ModalForTask9 from "./Modal/ModalForTask9";
import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function Task9() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({
    show: false,
    user: null,
    type: "edit",
  });

  const handleGetData = () => {
    setIsLoading(true);
    axios.get(`${BASE_URL}/users`).then((response) => {
      setUsers(response.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/users/${id}`).then(() => {
      handleGetData();
    });

    // setUsers(users.filter((p) => p.id !== id));
  };
  const handleEdit = (id, data) => {
    axios.patch(`${BASE_URL}/users/${id}`, data).then(() => {
      handleGetData();
    });
  };

  const handleAdd = (data) => {
    axios.post(`${BASE_URL}/users`, data).then(() => {
      handleGetData();
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={() => setModal({ show: true, user: null, type: "add" })}
        >
          <PersonAddIcon />
        </IconButton>
      </Stack>
      {isLoading ? (
        "Loading..."
      ) : users.length ? (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Gender</th>
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
                <td>{user.gender}</td>
                <td>{user.is_admin ? "Yes" : "No"}</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() =>
                        setModal({ show: true, user, type: "edit" })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No data"
      )}
      {modal.show && (
        <ModalForTask9
          modal={modal}
          setModal={setModal}
          setUsers={setUsers}
          handleEdit={handleEdit}
          handleAdd={handleAdd}
        />
      )}
    </>
  );
}
