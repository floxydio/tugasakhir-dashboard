import {
  Box,
  Button,
  FormControl,
  Menu,
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
import cryptoJS from "crypto-js";

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
  const [openEdit, setOpenEdit] = useState(false);

  // State Create
  const [handleGuru, setHandleGuru] = useState(999);
  const [addNomorKelas, setAddNomorKelas] = useState("");
  const [addJumlahMurid, setAddJumlahMurid] = useState(0);

  // State Edit
  const [editId, setEditId] = useState(0);
  const [editHandleGuru, setEditHandleGuru] = useState(999);
  const [editNomorKelas, setEditNomorKelas] = useState("");
  const [editJumlahMurid, setEditJumlahMurid] = useState(0);

  //Store
  const kelasStore = useKelasAdmin((state) => state);

  const handleClose = () => {
    setOpen(false);
    setHandleGuru(999);
    setAddNomorKelas("");
    setAddJumlahMurid(0);
  };

  // Open Modal for Edit
  const handleOpenEdit = (id, guru_id, nomor_kelas, jumlah_orang) => {
    setEditId(id);
    setEditHandleGuru(guru_id);
    setEditNomorKelas(nomor_kelas);
    setEditJumlahMurid(jumlah_orang);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  async function openModalApi() {
    kelasStore.getGuruByRole();
    setOpen(true);
  }

  useEffect(() => {
    kelasStore.getDataKelas();
    // async function findKelas() {
    //   // const decrypt = cryptoJS.AES.decrypt(
    //   //   token,
    //   //   `${import.meta.env.VITE_KEY_ENCRYPT}`
    //   // );
    //   await axiosNew
    //     .get("/kelas", {
    //       headers: {
    //         "x-access-token": localStorage.getItem("token:"),
    //       },
    //     })
    //     .then((result) => {
    //       setGuru(result.data.data);
    //       setLoading(false);
    //     });
    // }
    // findKelas();
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
        color="primary"
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
                  fontFamily: "Poppins",
                }}
              >
                No
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Kelas ID
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Nama Guru
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Nomor Kelas
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Jumlah Murid
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Ubah Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kelasStore.kelas?.map((data, i) => {
              return (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {i + 1}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {data.kelas_id}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {data.guru_users.nama}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {data.nomor_kelas}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    <Typography sx={{ fontFamily: "Poppins" }}>
                      {data.jumlah_orang}
                    </Typography>
                  </TableCell>

                  <TableCell align="center" component="th" scope="row">
                    <Button
                      onClick={() =>
                        handleOpenEdit(
                          data.kelas_id,
                          data.guru_id,
                          data.nomor_kelas,
                          data.jumlah_orang
                        )
                      }
                      sx={{ float: "center", fontFamily: "Poppins" }}
                      variant="contained"
                    >
                      Ubah
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Create */}
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
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
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
                {kelasStore.role?.map((data, i) => {
                  return (
                    <div key={i}>
                      <MenuItem key={data.guru_id} value={data.guru_id}>
                        {data.nama}
                      </MenuItem>
                    </div>
                  );
                })}
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
      {/* End Modal Create */}

      {/* Modal Edit */}
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} autoComplete="off">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Edit Data Kelas
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
                value={editHandleGuru}
                onChange={(e) => setEditHandleGuru(e.target.value)}
              >
                <MenuItem value={999} disabled>
                  Pilih Guru
                </MenuItem>
                {kelasStore.role?.map((data) => (
                  <MenuItem key={data.guru_id} value={data.guru_id}>
                    {data.nama}
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
                value={editNomorKelas}
                onChange={(e) => setEditNomorKelas(e.target.value)}
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
                value={editJumlahMurid}
                onChange={(e) => setEditJumlahMurid(e.target.value)}
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
                onClick={handleCloseEdit}
              >
                Close Form
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  kelasStore.editKelas(
                    editId,
                    editHandleGuru,
                    editJumlahMurid,
                    editNomorKelas
                  );
                }}
                // onClick={() => {
                //   console.log(editId);
                //   console.log(editHandleGuru);
                //   console.log(editJumlahMurid);
                //   console.log(editNomorKelas);
                // }}
              >
                Submit Data
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* End Modal Edit */}
    </>
  );
}
