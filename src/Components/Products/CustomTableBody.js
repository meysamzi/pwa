import { TableBody, TableCell, TableRow } from "@mui/material";
import { columns } from "../../Assets/mockData";

const CustomTableBody = ({ products, handleRecords }) => {
  return (
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
                      onClick={() => handleRecords(row.id, column.whichIcon)}
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
  );
};

export default CustomTableBody;
