import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { DownloadTableExcel } from "react-export-table-to-excel";
import BarLoader from "react-spinners/BarLoader.js";
import { MonthModels } from "../models/Month_models";
import { Button } from "@mui/material";
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

  // function handleFilterData(value) {
  //   setOrderBy(value);
  //   async function getAbsenFilterOrderBy() {
  //     await axios
  //       .get("http://192.168.50.110:3000/v1/absen", {
  //         params: {
  //           orderby: orderBy,
  //         },
  //       })
  //       .then((res) => {
  //         setAbsenData(res.data.data);
  //       });
  //   }
  //   getAbsenFilterOrderBy();
  // }

  // function handleFilterByMonth(value) {
  //   setFilterMonth(value);
  //   async function getAbsenFilterMonth() {
  //     await axios
  //       .get("http://192.168.50.110:3000/v1/absen", {
  //         params: {
  //           month: month,
  //           orderby: orderBy,
  //         },
  //       })
  //       .then((res) => {
  //         setAbsenData(res.data.data);
  //       });
  //   }
  //   getAbsenFilterMonth();
  // }

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
        .get("http://192.168.50.110:3000/v1/absen", {
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
      await axios.get("http://192.168.50.110:3000/v1/absen").then((res) => {
        setAbsenData(res.data.data);
        setLoading(false);
      });
    }
    getAbsen();
    setGetMonth(new Date().getMonth());
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
          value={month}
          onChange={(e) => setFilterMonth(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: 30,
            marginRight: 20,
          }}
        >
          {MonthModels.map((e) => (
            <option key={e.value} value={e.value}>
              {e.name}
            </option>
          ))}
        </select>
        <select
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: 30,
          }}
        >
          <option value="DESC">Filter by Descending</option>
          <option value="ASC">Filter by Ascending</option>
        </select>
        <Button
          sx={{
            marginLeft: 5,
          }}
          onClick={filterData}
          variant="contained"
        >
          Filter
        </Button>
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
