import { useState } from "react";
import { style } from "./Style";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  FormControlLabel,
  FormGroup,
  Stack,
  IconButton,
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
  const [selectGender, setSelectGender] = useState(modal.user?.gender || "");

  const handleClose = () => {
    setModal({
      show: false,
      user: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    console.log(event);

    const name = formData.get("nameInput");
    const surname = formData.get("surnameInput");
    const gender = selectGender;
    const isAdmin = formData.get("isAdmin") === "on";

    if (!modal.user?.id) {
      handleAdd({
        name,
        surname,
        gender,
        is_admin: isAdmin,
      });
    } else {
      handleEdit(modal.user.id, {
        id: modal.user.id,
        name,
        surname,
        gender,
        is_admin: isAdmin,
      });
    }
    handleClose();
  };
  return (
    <>
      <Modal open={modal.show} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <h2>{modal.type === "edit" ? "Edit" : "Add"} user</h2>
            <Box
              sx={{ "& > :not(style)": { m: 1, minWidth: 120 } }}
              noValidate
              autoComplete="off"
            >
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  name="nameInput"
                  defaultValue={modal.user?.name}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Surname"
                  variant="outlined"
                  name="surnameInput"
                  defaultValue={modal.user?.surname}
                />
              </FormControl>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectGender}
                  label="Gender"
                  onChange={(event) => {
                    const { value } = event.target;
                    setSelectGender(value);
                  }}
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
                    name="isAdmin"
                    defaultChecked={modal.user?.is_admin}
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
    </>
  );
}
