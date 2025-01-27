import axios from "axios";
import { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import ModalTask10 from "./Modal/ModalTask10";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search</label>
        <input type="search" placeholder="name" name="search" />
        <input type="search" placeholder="price" name="search" />
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="search" variant="outlined" type="submit">
            <SearchIcon />
          </IconButton>
        </Stack>
        <label>Sort by</label>
        <select value={sortBy} onChange={handleSortBy}>
          <option value=""></option>
          <option value="name">Name</option>
          <option value="-price">Expensive</option>
          <option value="price">Low cost</option>
          <option value="weight">Weight</option>
        </select>
      </form>
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
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price($)</th>
              <th>Weight(gram)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price + "$"}</td>
                <td>{item.weight + "g"}</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      onClick={() =>
                        setModal({ show: true, item, type: "edit" })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "There's nothing here yet."
      )}
      {modal.show && (
        <ModalTask10
          modal={modal}
          setModal={setModal}
          handleEdit={handleEdit}
          handleAdd={handleAdd}
        />
      )}
    </>
  );
}
