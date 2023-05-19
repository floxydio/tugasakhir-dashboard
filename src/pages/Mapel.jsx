import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function Mapel() {
  const [dataPelajaran, setDataPelajaran] = React.useState([]);

  React.useEffect(() => {
    async function getMapel() {
      await axios.get("http://103.174.115.58:3000/v1/pelajaran").then((res) => {
        setDataPelajaran(res.data.data);
      });
    }
    getMapel();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Nama Pelajaran</TableCell>
              <TableCell align="right">Nama Guru</TableCell>
              <TableCell align="right">Nomor Kelas</TableCell>
              <TableCell align="right">Waktu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPelajaran.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="right">{row.nama}</TableCell>
                <TableCell align="right">{row.guru}</TableCell>
                <TableCell align="right">{row.kelas_nomor}</TableCell>
                <TableCell align="right">{row.jam}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
