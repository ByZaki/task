import "./Modal.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function ModalForTask9({
  modal,
  setModal,
  handleEdit,
  handleAdd,
}) {
  const [selectGender, setSelectGender] = useState(modal.user?.gender);

  const handleClose = () => {
    setModal({
      show: false,
      user: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value;
    const surname = event.target[1].value;
    const gender = event.target[2].value;
    const isAdmin = event.target[3].checked;

    if (!modal.user?.id) {
      // setUsers((users) => [
      //   ...users,
      //   {
      //     id: modal.length + 1,
      //     name,
      //     surname,
      //     gender,
      //     is_admin: isAdmin,
      //   },
      // ]);

      handleAdd({
        name,
        surname,
        gender,
        is_admin: isAdmin,
      });
    } else {
      // setUsers((users) => {
      //   const foundUserIndex = users.findIndex(
      //     (item) => item.id === modal.user?.id
      //   );
      //   if (foundUserIndex === -1) return users;

      //   users[foundUserIndex] = {
      //     id: modal.user.id,
      //     name,
      //     surname,
      //     gender,
      //     is_admin: isAdmin,
      //   };
      //   return users;
      // });

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
    <div className="modal-overlay">
      <form className="modal-container" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{modal.type === "edit" ? "Edit" : "Add"} user</h2>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-input"
              name="nameInput"
              defaultValue={modal.user?.name}
            />
          </div>
          <div className="form-group">
            <label>Surname</label>
            <input
              type="text"
              className="form-input"
              defaultValue={modal.user?.surname}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              className="form-input"
              value={selectGender}
              onChange={(event) => {
                const { value } = event.target;
                setSelectGender(value);
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Admin</label>
            <input type="checkbox" defaultChecked={modal.user?.is_admin} />
          </div>
        </div>
        <div className="modal-footer">
          <Button type="submit" className="modal-button save-button">
            Save
          </Button>
          <Button className="modal-button cancel-button" onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
