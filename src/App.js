import { useEffect, useLayoutEffect, useState } from "react";
import { Paper, Table, TableContainer } from "@mui/material";
import Modal from "./Components/Products/Modal";
import TableHeader from "./Components/Products/TableHeader";
import CustomTableBody from "./Components/Products/CustomTableBody";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [recordId, setRecordId] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRecords = (id, whichIcon) => {
    setRecordId(id);
    whichIcon === "delete"
      ? setProducts(products?.filter((record) => record?.id !== id))
      : setIsModalOpen(true);
  };

  const updateRecord = () => {
    setProducts(
      products?.map((record) => {
        if (record?.id === recordId) {
          return { ...record, ...editRecord };
        } else {
          return record;
        }
      })
    );
  };

  return (
    <>
    {console.log("dom")}
      <Paper sx={{ maxWidth: "1280px", margin: "40px auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader />
            <CustomTableBody
              products={products}
              handleRecords={handleRecords}
            />
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editRecord={editRecord}
        setEditRecord={setEditRecord}
        updateRecord={updateRecord}
      />
    </>
  );
}
