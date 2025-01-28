import axios from "axios";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import ModalForItems from "./Modal/ModalForItems";
import {
  Box,
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
import { style } from "./Modal/Style";

const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function Task10() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [modal, setModal] = useState({
    show: false,
    item: null,
    type: "edit",
  });

  const handleGetItems = (filter) => {
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

  const handleDelete = (id) => {
    axios.delete(`${BASE_URL}/items/${id}`).then(() => {
      handleGetItems();
    });
  };

  const handleEdit = (id, data) => {
    axios.patch(`${BASE_URL}/items/${id}`, data).then(() => {
      handleGetItems();
    });
  };

  const handleAdd = (data) => {
    axios.post(`${BASE_URL}/items/`, data).then(() => {
      handleGetItems();
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const price = event.target[1].value;

    handleGetItems({ name, price });
  };

  const handleSortBy = (event) => {
    const sortBy = event.target.value;

    setSortBy(sortBy);
    handleGetItems(sortBy);
  };

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <>
      <Box sz={style}>
        <form onSubmit={handleSubmit}>
          <Box>
            <InputLabel id="demo-simple-select-label">Search</InputLabel>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                id="outlined-basic"
                label="name"
                variant="outlined"
                name="search"
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="price"
                variant="outlined"
                name="search"
              />
              <IconButton aria-label="search" variant="outlined" type="submit">
                <SearchIcon />
              </IconButton>
            </Stack>
            <Stack direction="row">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-simple-select-label">Sort by</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="sortBy"
                  onChange={handleSortBy}
                >
                  <MenuItem value=""></MenuItem>
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="-price">Expensive</MenuItem>
                  <MenuItem value="price">Low cost</MenuItem>
                  <MenuItem value="weight">Weight</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </form>
      </Box>
      <Stack direction="row" spacing={1}>
        <IconButton
          onClick={() => setModal({ show: true, item: null, type: "add" })}
        >
          <AddIcon />
        </IconButton>
      </Stack>
      {isLoading ? (
        "Loading data"
      ) : items.length ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="simple table"
            size="large"
            stickyHeader={true}
          >
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Price($)</TableCell>
                <TableCell align="right">Weight(gram)</TableCell>
                <TableCell align="right">Action</TableCell>
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
                      onClick={() =>
                        setModal({ show: true, item, type: "edit" })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
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
    </>
  );
}
