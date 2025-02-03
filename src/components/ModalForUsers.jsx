import { useState, useEffect } from "react";
import { style } from "./Style";
import {
  FormControlLabel,
  FormGroup,
  Stack,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Modal,
  TextField,
  Checkbox,
  Button,
} from "@mui/material";

export default function ModalForUsers({
  modal,
  setModal,
  handleEdit,
  handleAdd,
}) {
  const [name, setName] = useState(modal.user?.name || "");
  const [surname, setSurname] = useState(modal.user?.surname || "");
  const [selectGender, setSelectGender] = useState(modal.user?.gender || "");
  const [isAdmin, setIsAdmin] = useState(modal.user?.is_admin || false);

  useEffect(() => {
    if (modal.user) {
      setName(modal.user.name);
      setSurname(modal.user.surname);
      setSelectGender(modal.user.gender);
      setIsAdmin(modal.user.is_admin);
    }
  }, [modal.user]);

  const handleClose = () => {
    setModal({
      show: false,
      user: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!name || !surname) {
      alert("Name and Surname are required!");
      return;
    }

    const userData = {
      name,
      surname,
      gender: selectGender,
      is_admin: isAdmin,
    };

    if (!modal.user?.id) {
      handleAdd(userData);
    } else {
      handleEdit(modal.user.id, { ...userData, id: modal.user.id });
    }
    handleClose();
  };

  return (
    <Modal open={modal.show} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <h2>{modal.type === "edit" ? "Edit" : "Add"} User</h2>
          <Box
            sx={{ "& > :not(style)": { m: 1, minWidth: 120 } }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                label="Name"
                variant="outlined"
                name="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Surname"
                variant="outlined"
                name="surnameInput"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel>Gender</InputLabel>
              <Select
                value={selectGender}
                label="Gender"
                onChange={(e) => setSelectGender(e.target.value)}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Admin"
            />
          </FormGroup>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="success"
            >
              {modal.type === "edit" ? "Save" : "Create"}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={handleClose}
              color="error"
            >
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
