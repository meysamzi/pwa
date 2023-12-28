import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { columns } from "./Assets/mockData";
import Modal from "./Components/Products/Modal";
import TableHeader from "./Components/Products/TableHeader";

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
      <Paper sx={{ maxWidth: "1280px", margin: "40px auto" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHeader />
            <TableBody>
              {products?.map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id}>
                          {column.label === "image" ? (
                            <img
                              src={row[column.label]}
                              alt="image"
                              width={50}
                              height={50}
                            />
                          ) : typeof row[column.id] === "object" ? (
                            row[column.label].rate
                          ) : column.id === "icon" ? (
                            <span
                              onClick={() =>
                                handleRecords(row.id, column.whichIcon)
                              }
                            >
                              {column.label}
                            </span>
                          ) : (
                            row[column.label]
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
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
