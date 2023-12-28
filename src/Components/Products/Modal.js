const Modal = () => {
  return (
    <div style={{ display: isModalOpen ? "flex" : "none" }} className="modal">
      <Close sx={{ cursor: "pointer" }} onClick={() => setIsModalOpen(false)} />
      <div className="modalTextParent">
        {inputNames.map((inputName) => (
          <div className="modalTextChild">
            <label>{inputName}</label>
            <TextField
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  [e.target.name]: e.target.value,
                })
              }
              name={inputName}
              label={inputName}
              variant="outlined"
            />
          </div>
        ))}
        <Button onClick={() => updateRecord()} variant="contained">
          Update
        </Button>
      </div>
    </div>
  );
};

export default Modal;
