import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Close } from "@mui/icons-material";
import { columns } from "./Assets/mockData";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_KEY}products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleRecords = (id, whichIcon) => {
    whichIcon === "delete"
      ? setProducts(products?.filter((record) => record?.id !== id))
      : setIsModalOpen(true);
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
        <TablePagination
          rowsPerPageOptions={[1, 2]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <div style={{ display: isModalOpen ? "flex" : "none" }} className="modal">
        <Close />
        <div className="modalTextParent">
          <div className="modalTextChild">
            <label>title</label>
            <TextField name="title" label="title" variant="outlined" />
          </div>
          <div className="modalTextChild">
            <label>price</label>
            <TextField name="price" label="price" variant="outlined" />
          </div>
          <div className="modalTextChild">
            <label>category</label>
            <TextField name="category" label="category" variant="outlined" />
          </div>
          <div className="modalTextChild">
            <label>rating</label>
            <TextField name="rating" label="rating" variant="outlined" />
          </div>
          <Button variant="contained">Update</Button>
        </div>
      </div>
    </>
  );
}
