import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader.js";
import { MonthModels } from "../models/Month_models";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import "../style/absensi.css";
const override = (React.CSSProperties = {
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  position: "absolute",
});
export default function Absensi() {
  const [getMonth, setGetMonth] = React.useState(0);
  const [absenData, setAbsenData] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("ASC");
  const [filterGuru, setFilterGuru] = React.useState("");
  const [month, setFilterMonth] = React.useState("");
  const tableRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);

  function filterData() {
    let params = {};
    if (month === "" && filterGuru === "" && orderBy !== "") {
      params = {
        orderby: orderBy,
      };
    } else if (month !== "" && filterGuru === "" && orderBy !== "") {
      params = {
        month: month,
        orderby: orderBy,
      };
    } else if (month !== "" && filterGuru !== "" && orderBy !== "") {
      params = {
        gurunama: filterGuru,
        month: month,
        orderby: orderBy,
      };
    }
    async function getAbsenFilterOrderBy() {
      await axios
        .get("http://103.174.115.58:3000/v1/absen", {
          params: params,
        })
        .then((res) => {
          setAbsenData(res.data.data);
        });
    }
    getAbsenFilterOrderBy();
  }

  React.useEffect(() => {
    async function getAbsen() {
      setLoading(true);
      await axios.get("http://103.174.115.58:3000/v1/absen").then((res) => {
        setAbsenData(res.data.data);
        setLoading(false);
      });
    }
    getAbsen();
    setGetMonth(new Date().getMonth() + 1);
  }, []);

  return (
    <>
      <div className="filter_style">
        <Button
          className="btn_absen"
          sx={{
            marginTop: 1,
          }}
          onClick={filterData}
          variant="contained"
        >
          Absen Manual
        </Button>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Bulan</InputLabel>
            <Select
              sx={{
                height: 40,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month === "" ? getMonth : month}
              label="Bulan"
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              {MonthModels.map((e) => (
                <MenuItem value={e.value}>{e.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              sx={{
                height: 40,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderBy}
              label="Filter"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <MenuItem value="DESC">Filter by Descending</MenuItem>
              <MenuItem value="ASC">Filter by Ascending</MenuItem>
            </Select>
          </FormControl>

          <Button
            sx={{
              marginTop: 1,
            }}
            onClick={filterData}
            variant="contained"
          >
            Filter
          </Button>
        </div>
      </div>
      {loading ? (
        <BarLoader
          color="#274F99"
          loading={loading}
          size={30}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <TableContainer component={Paper} ref={tableRef}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">Nama User</TableCell>
                <TableCell align="right">Nama Guru</TableCell>
                <TableCell align="right">Pelajaran</TableCell>
                <TableCell align="right">Nomor Kelas</TableCell>
                <TableCell align="right">Keterangan</TableCell>
                <TableCell align="right">Hari</TableCell>
                <TableCell align="right">Bulan</TableCell>
                <TableCell align="right">Tahun</TableCell>
                <TableCell align="right">Waktu</TableCell>
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
                  <TableCell align="right">{row.nama_user}</TableCell>
                  <TableCell align="right">{row.nama_guru}</TableCell>
                  <TableCell align="right">{row.pelajaran_nama}</TableCell>
                  <TableCell align="right">{row.nomor_kelas}</TableCell>
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
      )}
    </>
  );
}
