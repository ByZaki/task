import { Link } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import ModalForItems from "../components/ModalForItems";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { style } from "../components/Style";
import ModalForDelete from "../components/ModalForDelete";

export const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function Items() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [deleteModal, setDeleteModal] = useState(null);
  const [modal, setModal] = useState({
    show: false,
    item: null,
    type: "edit",
  });

  const handleGetData = (filter) => {
    const name = filter?.name;
    const price = filter?.price;
    const sortBy = filter;

    setIsLoading(true);

    let url = `${BASE_URL}/items?`;

    if (name) {
      url += `name=${name}&`;
    }
    if (price) {
      url += `price=${price}`;
    }
    if (sortBy) {
      url += `sortBy=${sortBy}`;
    }

    axios.get(url).then((response) => {
      setItems(response.data);
      setIsLoading(false);
    });
  };

  const handleEdit = (id, data) => {
    axios.patch(`${BASE_URL}/items/${id}`, data).then(() => {
      handleGetData();
    });
  };

  const handleAdd = (data) => {
    axios.post(`${BASE_URL}/items/`, data).then(() => {
      handleGetData();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const price = event.target[1].value;

    handleGetData({ name, price });
  };

  const handleSortBy = (event) => {
    const sortBy = event.target.value;

    setSortBy(sortBy);
    handleGetData(sortBy);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <Stack sx={{ width: "900px", margin: "0 auto" }}>
        <Link to="/" style={{ marginBottom: "20px", width: "fit-content" }}>
          <ArrowBackIcon />
        </Link>

        <Box sz={style}>
          <form onSubmit={handleSubmit}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  label="search by name"
                  variant="outlined"
                  name="search"
                />
                <TextField
                  size="small"
                  label="search by price"
                  variant="outlined"
                  name="search"
                />
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel>Sort by</InputLabel>

                  <Select value={sortBy} label="sortBy" onChange={handleSortBy}>
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="-price">Expensive</MenuItem>
                    <MenuItem value="price">Low cost</MenuItem>
                    <MenuItem value="weight">Weight</MenuItem>
                  </Select>
                </FormControl>
                <IconButton variant="outlined" type="submit">
                  <SearchIcon />
                </IconButton>
              </Stack>
              <Button
                variant="outlined"
                endIcon={<AddIcon />}
                onClick={() =>
                  setModal({ show: true, user: null, type: "add" })
                }
              >
                Create new product
              </Button>
            </Stack>
          </form>
        </Box>

        {isLoading ? (
          "Loading data"
        ) : items.length ? (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} size="large" stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Price($)</TableCell>
                  <TableCell align="right">Weight(gram)</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                    <TableCell align="right">{item.price + "$"}</TableCell>
                    <TableCell align="right">{item.weight + "g"}</TableCell>
                    <TableCell align="right" direction="row" spacing={2}>
                      <IconButton
                        color="success"
                        onClick={() =>
                          setModal({ show: true, item, type: "edit" })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => setDeleteModal(item.id)}
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
          <ModalForItems
            modal={modal}
            setModal={setModal}
            handleEdit={handleEdit}
            handleAdd={handleAdd}
          />
        )}
        {deleteModal && (
          <ModalForDelete
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleGetData={handleGetData}
            endpoint="items"
          />
        )}
      </Stack>
    </>
  );
}
