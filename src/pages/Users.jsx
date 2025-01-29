import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";

import axios from "axios";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import ModalForUsers from "../components/ModalForUsers";
import ModalForDelete from "../components/ModalForDelete";

export const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(null);
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
      <Stack sx={{ width: "900px", margin: "0 auto" }}>
        <Link to="/" style={{ marginBottom: "20px", width: "fit-content" }}>
          <ArrowBackIcon />
        </Link>
        <Stack
          direction="row"
          spacing={1}
          sx={{ marginBottom: "10px", justifyContent: "end" }}
        >
          <Button
            variant="outlined"
            endIcon={<AddIcon />}
            onClick={() => setModal({ show: true, user: null, type: "add" })}
          >
            Create new user
          </Button>
        </Stack>
        {isLoading ? (
          "Loading..."
        ) : users.length ? (
          <TableContainer>
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Gender</TableCell>
                  <TableCell align="right">Admin</TableCell>
                  <TableCell align="right"></TableCell>
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
                        color="warning"
                        onClick={() =>
                          setModal({ show: true, user, type: "edit" })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteModal(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          "There's nothing here yet."
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
        {deleteModal && (
          <ModalForDelete
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleGetData={handleGetData}
            endpoint="users"
          />
        )}
      </Stack>
    </>
  );
}
