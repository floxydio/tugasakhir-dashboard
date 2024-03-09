import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useKelasAdmin } from "../../store/admin/admin_kelas.store";
import { useEffect } from "react";
import { useState } from "react";
import axiosNew from "../../components/AxiosConfig";

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

export default function AdminKelas() {
  const [open, setOpen] = useState(false);

  const [addNamaKelas, setAddNamaKelas] = useState("");
  const [addNomorKelas, setAddNomorKelas] = useState("");
  const [addJumlahMurid, setAddJumlahMurid] = useState(0);

  const [dataGuru, setDataGuru] = useState([]);
  const [handleGuru, setHandleGuru] = useState(999);

  //Store
  const kelasStore = useKelasAdmin((state) => state);
  // const submitKelasStore = useKelasAdmin((state) => state);

  const handleClose = () => {
    setOpen(false);
    setAddNomorKelas("");
    setAddJumlahMurid(0);
  };

  async function openModalApi() {
    setOpen(true);
    async function getGuruByRole() {
      await axiosNew.get("/list-user-guru").then(function (res) {
        setDataGuru(res.data.data);
      });
    }
    await getGuruByRole();
  }

  useEffect(() => {
    kelasStore.getDataKelas();
  }, []);

  return (
    <>
      <ToastContainer />

      <Button
        onClick={openModalApi}
        style={{
          marginTop: "20px",
          marginBottom: "30px",
        }}
        variant="contained"
      >
        Tambah Kelas
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                Kelas ID
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                Nama Guru
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                Nomor Kelas
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                Jumlah Murid
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelasStore.kelas?.map((data) => {
              return (
                <TableRow
                  key={data.kelas_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {data.kelas_id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {data.guru_id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {data.nomor_kelas}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {data.jumlah_orang}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <Button
                      onClick={() => {
                        console.log("Masuk Nihhh");
                      }}
                      sx={{ float: "center" }}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
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
              Tambah Kelas
            </Typography>
            <FormControl
              fullWidth
              style={{
                marginTop: "40px",
              }}
            >
              <Select
                sx={{
                  height: 40,
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={999}
                value={handleGuru}
                onChange={(e) => setHandleGuru(e.target.value)}
              >
                <MenuItem value={999} disabled>
                  Pilih Guru
                </MenuItem>
                {dataGuru.map((e) => (
                  <MenuItem key={e.guru_id} value={e.guru_id}>
                    {e.nama}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              fullWidth
              style={{
                marginTop: "20px",
              }}
            >
              <TextField
                size="small"
                id="outlined"
                label="Kelas"
                type="text"
                value={addNomorKelas}
                onChange={(e) => setAddNomorKelas(e.target.value)}
              />
            </FormControl>
            <FormControl
              fullWidth
              style={{
                marginTop: "20px",
              }}
            >
              <TextField
                size="small"
                id="outlined"
                label="Jumlah Murid"
                type="number"
                value={addJumlahMurid}
                onChange={(e) => setAddJumlahMurid(e.target.value)}
              />
            </FormControl>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "40px",
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Close Form
              </Button>

              <Button
                variant="contained"
                onClick={() =>
                  kelasStore.submitKelas(
                    handleGuru,
                    addNomorKelas,
                    addJumlahMurid
                  )
                }
              >
                Submit Data
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
