import Stack from "@mui/material/Stack";
import { style } from "./Style";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";

export default function ModalForItems({
  modal,
  setModal,
  handleEdit,
  handleAdd,
}) {
  const handleClose = () => {
    setModal({
      show: false,
      user: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("nameInput");
    const price = formData.get("price");
    const weight = formData.get("weight");

    if (!modal.item?.id) {
      handleAdd({ name, price, weight });
    } else {
      handleEdit(modal.item?.id, { name, price, weight });
    }

    handleClose();
  };

  return (
    <>
      <Modal open={modal.show} onClose={handleClose}>
        <Box sx={style} onSubmit={handleSubmit}>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ "& > :not(style)": { m: 1, minWidth: 120 } }}
              noValidate
              autoComplete="off"
            >
              <h2>{modal.type === "edit" ? "Edit" : "Add"} user</h2>
              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  size="small"
                  variant="outlined"
                  name="nameInput"
                  defaultValue={modal.item?.name}
                />
              </FormControl>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Price
                </FormHelperText>
                <OutlinedInput
                  type="number"
                  size="small"
                  name="price"
                  defaultValue={modal.item?.price}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">$</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                <FormHelperText id="outlined-weight-helper-text">
                  Weight
                </FormHelperText>
                <OutlinedInput
                  type="number"
                  size="small"
                  name="weight"
                  defaultValue={modal.item?.weight}
                  id="outlined-adornment-weight"
                  endAdornment={
                    <InputAdornment position="end">g</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
              </FormControl>
            </Box>

            <Stack direction="row" spacing={1}>
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
