import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import { style } from "./Style";

export default function ModalForTask9({
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
            <Stack direction="row" spacing={1}>
              <IconButton type="submit">
                <SaveAltIcon />
              </IconButton>
              <IconButton onClick={handleClose}>
                <CancelIcon />
              </IconButton>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
