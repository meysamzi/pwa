import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { columns } from "./Assets/mockData";

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
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.id}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
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
      <div style={{ display: isModalOpen ? "flex" : "none" }} className="modal">
        <Close
          sx={{ cursor: "pointer" }}
          onClick={() => setIsModalOpen(false)}
        />
        <div className="modalTextParent">
          <div className="modalTextChild">
            <label>title</label>
            <TextField
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  [e.target.name]: e.target.value,
                })
              }
              name="title"
              label="title"
              variant="outlined"
            />
          </div>
          <div className="modalTextChild">
            <label>price</label>
            <TextField
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  [e.target.name]: e.target.value,
                })
              }
              name="price"
              label="price"
              variant="outlined"
            />
          </div>
          <div className="modalTextChild">
            <label>category</label>
            <TextField
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  [e.target.name]: e.target.value,
                })
              }
              name="category"
              label="category"
              variant="outlined"
            />
          </div>
          <div className="modalTextChild">
            <label>rating</label>
            <TextField
              onChange={(e) =>
                setEditRecord({
                  ...editRecord,
                  [e.target.name]: e.target.value,
                })
              }
              name="rating"
              label="rating"
              variant="outlined"
            />
          </div>
          <Button onClick={() => updateRecord()} variant="contained">
            Update
          </Button>
        </div>
      </div>
    </>
  );
}
