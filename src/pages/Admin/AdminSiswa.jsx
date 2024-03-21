import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  TableBody,
  Button,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useAdminSiswa } from "../../store/admin/admin_siswa.store";
import { ToastContainer } from "react-toastify";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AdminSiswa() {
  // Store
  const siswaState = useAdminSiswa((state) => state);

  // State Create
  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");

  // State Edit
  const [editId, setEditId] = useState(0);
  const [editNama, setEditNama] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editKelas, setEditKelas] = useState("");

  const handleClose = () => {
    setNama("");
    setUsername("");
    setPassword("");
    setKelas("");
    siswaState.onCloseModal();
  };

  const handleOpenEdit = (id, nama, username, password, kelas) => {
    setEditId(id);
    setEditNama(nama);
    setEditUsername(username);
    setEditPassword(password);
    setEditKelas(kelas);
    siswaState.editSiswa();
    siswaState.openEditModal();
  };

  useEffect(() => {
    siswaState.fetchSiswa();
    siswaState.fetchKelas();
  }, []);

  return (
    <>
      <ToastContainer />

      {/* Create Button */}
      <Button
        variant="contained"
        color="primary"
        style={{
          marginTop: "20px",
          marginBottom: "30px",
        }}
        onClick={() => siswaState.onOpenModal()}
      >
        Tambah Siswa
      </Button>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                No
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                Nama Siswa
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                Nomor Kelas
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
                align="center"
              >
                Ubah Data
              </TableCell>
              <TableCell
                align="center"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Hapus Data
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {siswaState.siswa?.map((item, i) => (
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
                    {item.nama}
                  </Typography>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <Typography sx={{ fontFamily: "Poppins" }}>
                    {item.username}
                  </Typography>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <Typography sx={{ fontFamily: "Poppins" }}>
                    {item.kelas.nomor_kelas}
                  </Typography>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <Button
                    onClick={() => {
                      handleOpenEdit(
                        item.nama,
                        item.username,
                        item.password,
                        item.kelas_id
                      );
                    }}
                    sx={{ float: "center", fontFamily: "Poppins" }}
                    variant="contained"
                  >
                    Ubah
                  </Button>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                  <Button
                    // onClick={() => handleOpenDelete(data.kelas_id)}
                    variant="contained"
                  >
                    Hapus
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Create*/}
      <Modal
        open={siswaState.addModalTrigger}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
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
              Daftar Siswa / Siswi
            </Typography>
            <FormControl
              fullWidth
              style={{
                marginTop: "40px",
              }}
            >
              <TextField
                size="small"
                id="outlined"
                label="Nama Lengkap"
                type="text"
                value={nama}
                onChange={(e) => {
                  // Only Alphabet
                  setNama(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                }}
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
                label="Username"
                type="text"
                value={username}
                onChange={(e) => {
                  // Remove space
                  setUsername(e.target.value.replace(/\s/g, ""));
                }}
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
                type="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  // Remove space
                  setPassword(e.target.value.replace(/\s/g, ""));
                }}
              />
            </FormControl>
            <FormControl
              fullWidth
              style={{
                marginTop: "20px",
              }}
            >
              <Select
                sx={{
                  height: 40,
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={kelas === "" ? "999" : kelas}
                onChange={(e) => setKelas(e.target.value)}
              >
                <MenuItem value="999" disabled>
                  Pilih Kelas
                </MenuItem>
                {siswaState.kelas.map((item, i) => (
                  <MenuItem key={i} value={item.kelas_id}>
                    {item.nomor_kelas}
                  </MenuItem>
                ))}
              </Select>
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
              <Button variant="contained" color="error" onClick={handleClose}>
                Tutup
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  siswaState.sendCreateSiswa(nama, username, password, kelas);
                }}
              >
                Submit Data
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* End Modal Create*/}

      {/* Modal Edit */}
      <Modal
        open={siswaState.editModalTrigger}
        onClose={() => siswaState.closeEditModal()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle} noValidate autoComplete="off">
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
              Edit Data Siswa / Siswi
            </Typography>
            <FormControl
              fullWidth
              style={{
                marginTop: "40px",
              }}
            >
              <TextField
                size="small"
                id="outlined"
                label="Nama Lengkap"
                type="text"
                value={editNama}
                onChange={(e) => {
                  // Only Alphabet
                  setEditNama(e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                }}
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
                label="Username"
                type="text"
                value={editUsername}
                onChange={(e) => {
                  // Remove space
                  setEditUsername(e.target.value.replace(/\s/g, ""));
                }}
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
                type="password"
                label="Password"
                value={editPassword}
                onChange={(e) => {
                  // Remove space
                  setEditPassword(e.target.value.replace(/\s/g, ""));
                }}
              />
            </FormControl>
            <FormControl
              fullWidth
              style={{
                marginTop: "20px",
              }}
            >
              <Select
                sx={{
                  height: 40,
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editKelas === "" ? "999" : editKelas}
                onChange={(e) => setEditKelas(e.target.value)}
              >
                <MenuItem value="999" disabled>
                  Pilih Kelas
                </MenuItem>
                {siswaState.kelas.map((item, i) => (
                  <MenuItem key={i} value={item.kelas_id}>
                    {item.nomor_kelas}
                  </MenuItem>
                ))}
              </Select>
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
                onClick={() => siswaState.closeEditModal()}
              >
                Tutup
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  siswaState.editSiswa(
                    editId,
                    editNama, 
                    editUsername, 
                    editPassword, 
                    editKelas,
                  );
                }}
              >
                Update Data
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* End Modal Edit*/}
    </>
  );
}
