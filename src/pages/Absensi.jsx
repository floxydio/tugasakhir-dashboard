import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";
import { DownloadTableExcel } from "react-export-table-to-excel";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Absensi() {
  const [absenData, setAbsenData] = React.useState([]);
  const [filterData, setFilterData] = React.useState("");
  const tableRef = React.useRef(null);

  function handleChange(value) {
    setFilterData(value);
  }

  React.useEffect(() => {
    async function getAbsen() {
      await axios.get("http://103.174.115.58:3000/v1/absen").then((res) => {
        setAbsenData(res.data.data);
      });
    }
    getAbsen();
  }, []);

  return (
    <>
      <DownloadTableExcel
        filename="absensi"
        sheet="absensi"
        currentTableRef={tableRef.current}
      >
        <button> Export excel </button>
      </DownloadTableExcel>
      <div
        style={{
          float: "right",
        }}
      >
        <select
          style={{
            padding: "10px",
            marginBottom: 30,
          }}
        >
          <option>Filter by Descending</option>
          <option>Filter by Ascending</option>
        </select>
      </div>
      <TableContainer component={Paper} ref={tableRef}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">User Name</TableCell>
              <TableCell align="right">Guru Name</TableCell>
              <TableCell align="right">Kelas</TableCell>
              <TableCell align="right">Keterangan</TableCell>
              <TableCell align="right">Day</TableCell>
              <TableCell align="right">Month</TableCell>
              <TableCell align="right">Year</TableCell>

              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {absenData.map((row, i) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{row.user_id}</TableCell>
                <TableCell align="right">{row.guru_id}</TableCell>
                <TableCell align="right">{row.kelas_id}</TableCell>
                <TableCell align="right">{row.keterangan}</TableCell>
                <TableCell align="right">{row.day}</TableCell>
                <TableCell align="right">{row.month}</TableCell>
                <TableCell align="right">{row.year}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
