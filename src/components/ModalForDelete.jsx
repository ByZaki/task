import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { style } from "./Style";
import { Stack } from "@mui/material";
import { BASE_URL } from "../pages/Users";
import axios from "axios";

export default function ModalForDelete({
  deleteModal,
  setDeleteModal,
  handleGetData,
  endpoint,
}) {
  // const handleDelete = (id) => {
  //   axios.delete(`${BASE_URL}/users/${id}`).then(() => {
  //     handleGetData();
  //     setDeleteModal(null);
  //   });
  // };
  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/${endpoint}/${id}`).then(() => {
      handleGetData();
      setDeleteModal(null);
    });
  };

  return (
    <>
      <Modal open={!!deleteModal} onClose={null}>
        <Box sx={style}>
          <Stack sx={{ textAlign: "center" }} spacing={2}>
            <Stack>
              <Typography variant="h5" component="h2">
                Delete
              </Typography>
              <Typography sx={{ mt: 2 }}>Are you sure?</Typography>
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Button
                onClick={() => setDeleteModal(null)}
                size="large"
                variant="outlined"
                sx={{ padding: "5px 50px" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(deleteModal)}
                size="large"
                variant="contained"
                color="error"
                sx={{ padding: "5px 50px" }}
              >
                Delete
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
