import { TableCell, TableHead, TableRow } from "@mui/material";
import { columns } from "../../Assets/mockData";

const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
            {column.id}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
