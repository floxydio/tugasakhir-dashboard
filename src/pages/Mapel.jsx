import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import axiosNew from "../components/AxiosConfig";
import {   Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField, } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Mapel() {
  const [dataPelajaran, setDataPelajaran] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  //
  const [dataGuru, setDataGuru] = React.useState([])
  const [dataKelas,setDataKelas] = React.useState([])

  //
  const [handlePelajaran,setHandlerPelajaran] = React.useState()

  const [handleGuru,setHandlerGuru] = React.useState()


  const [handleKelas,setHandlerKelas] = React.useState()



  const [handleWaktu,setHandlerWaktu] = React.useState()


  React.useEffect(() => {
    async function getMapel() {
      await axiosNew.get("/pelajaran").then((res) => {
        setDataPelajaran(res.data.data);
      });
    }
    getMapel();
  }, []);


  async function openModalApi() {
    setOpen(true)
    async function getGuru() {
      await axiosNew.get("/guru").then(function (res) {
        setDataGuru(res.data.data);
      });
    }
    async function getKelas() {

      await axiosNew.get("/kelas").then(function (res) {
        setDataKelas(res.data.data);
      });
    }

    await getGuru();
    await getKelas();

  }

  return (
    <>
     <Button
          onClick={openModalApi}
          style={{
            marginBottom: "40px"
          }}
          variant="contained"
        >
          Tambah Mata Pelajaran
        </Button>
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

      <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                     Tambah Pelajaran
                    </Typography>
                    <FormControl sx={{ m: 1, minWidth: 120, marginTop: 5 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Nama Pelajaran"
                        type="text"
                        onChange={(e) => setHandlerPelajaran(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Nama Guru
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nama Guru"

                        onChange={(e) => setHandlerGuru(e.target.value)}
                      >
                        {dataGuru.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Nama Kelas
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nama Kelas"

                        onChange={(e) => setHandlerKelas(e.target.value)}
                      >
                        {dataKelas.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                           Kelas {e.nomor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button
                      style={{
                        marginTop: 30,
                      }}
                      // onClick={submitEdit}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
    </>
  );
}
