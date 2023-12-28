import { Delete, Edit } from "@mui/icons-material";

export const columns = [
  { id: "title", label: "title", minWidth: 170 },
  { id: "price", label: "price", minWidth: 170 },
  {
    id: "category",
    label: "category",
    minWidth: 170,
  },
  {
    id: "rating",
    label: "rating",
    minWidth: 170,
  },
  {
    id: "image",
    label: "image",
    minWidth: 170,
  },
  {
    id: "icon",
    label: <Delete sx={{ cursor: "pointer" }} />,
    whichIcon:"delete",
    minWidth: 170,
  },
  {
    id: "icon",
    label: <Edit sx={{ cursor: "pointer" }} />,
    whichIcon:"edit",
    minWidth: 170,
  },
];
