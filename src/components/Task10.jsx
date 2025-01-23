import axios from "axios";
import { useEffect, useState } from "react";
import Button from "./Button/Button";
import ModalTask10 from "./Modal/ModalTask10";

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

    // if (name && price) {
    //   url = url + `name=${name}&price=${price}`;
    // }

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
    // const sortName = event.target[1].value;
    // const sortPrice = event.target[2].value;
    // const sortWeight = event.target[3].value;
    const sortBy = event.target.value;
    console.log(sortBy);

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
        <Button type="submit">Search</Button>
        <label>Sort by:</label>
        <select value={sortBy} onChange={handleSortBy}>
          <option value=""></option>
          <option value="name">Name</option>
          <option value="-price">Expensive</option>
          <option value="price">Low cost</option>
          <option value="weight">Weight</option>
        </select>
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
