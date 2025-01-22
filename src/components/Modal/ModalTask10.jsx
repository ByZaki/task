import "./Modal.css";
import Button from "../Button/Button";

export default function ModalForTask9({
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

    const name = event.target[0].value;
    const price = event.target[1].value;
    const weight = event.target[2].value;

    if (!modal.item?.id) {
      handleAdd({ name, price, weight });
    } else {
      handleEdit(modal.item?.id, { name, price, weight });
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
              defaultValue={modal.item?.name}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-input"
              defaultValue={modal.item?.price}
            />
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              className="form-input"
              defaultValue={modal.item?.weight}
            />
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
