import "./Modal.css";
import Button from "../Button/Button";

export default function ModalTask7({ modal, setModal, setUsers }) {
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
    const age = event.target[2].value;
    const isAdmin = event.target[3].value;

    if (!modal.user?.id) {
      setUsers((users) => [
        ...users,
        {
          id: users.length + 1,
          name,
          surname,
          age,
          is_admin: isAdmin,
        },
      ]);
    } else {
      setUsers((users) => {
        const foundUserIndex = users.findIndex(
          (item) => item.id === modal.user?.id
        );
        if (foundUserIndex === -1) return users;

        users[foundUserIndex] = {
          id: modal.user.id,
          name,
          surname,
          age,
          is_admin: isAdmin,
        };
        return users;
      });
    }
    handleClose();
  };

  return (
    <div className="modal-overlay">
      <form className="modal-container" onSubmit={handleSubmit}>
        <div className="modal-header">
          <h2>{modal.type === "edi" ? "Edit" : "Add"} user</h2>
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
            <label>Age</label>
            <input
              type="number"
              className="form-input"
              defaultValue={modal.user?.age}
            />
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
