import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button/Button";
import ModalTask10 from "./Modal/ModalTask10";

const BASE_URL = "https://312a2de6570b1db6.mokky.dev";

export default function Task10() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modal, setModal] = useState({
    show: false,
    item: null,
    type: "edit",
  });

  const handleGetItems = () => {
    setIsLoading(true);
    axios.get(`${BASE_URL}/items?`).then((response) => {
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
    console.log(event);

    const searchItem = event.target[0].value.toLowerCase();
    setSearchQuery(searchItem);
    handleGetItems(searchItem);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery) ||
      item.price.toString().includes(searchQuery) ||
      item.weight.toString().includes(searchQuery)
  );

  useEffect(() => {
    handleGetItems();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Search</label>
        <input
          type="search"
          placeholder="banana"
          name="search"
          defaultValue={""}
        />

        <Button type="submit">Search</Button>
      </form>

      <Button onClick={() => setModal({ show: true, item: null, type: "add" })}>
        Add
      </Button>
      {isLoading ? (
        "Loading data"
      ) : items.length ? (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price($)</th>
              <th>Weight(kg)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price + "$"}</td>
                <td>{item.weight + "kg"}</td>
                <td>
                  <Button
                    onClick={() => setModal({ show: true, item, type: "edit" })}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
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
