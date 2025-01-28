import { useEffect, useState } from "react";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Stack from "@mui/material/Stack";
import {
  IconButton,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ModalForUsers from "./Modal/ModalForUsers";

const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function UsersComponent() {
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
        <TableContainer component={Paper} sx={{ width: "600px" }}>
          <Table aria-label="simple table" stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Surname</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Admin</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.surname}</TableCell>
                  <TableCell align="right">{user.gender}</TableCell>
                  <TableCell align="right">
                    {user.is_admin ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right" direction="row" spacing={2}>
                    <IconButton
                      onClick={() =>
                        setModal({ show: true, user, type: "edit" })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        "No data"
      )}
      {modal.show && (
        <ModalForUsers
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
