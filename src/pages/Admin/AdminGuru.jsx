import React, { useEffect, useState } from "react";
import cryptoJS from "crypto-js";
import axiosNew from "../../components/AxiosConfig";
import { useAdminGuru } from "../../store/admin/admin_guru.store";
import {
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";

const override = (React.CSSProperties = {
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
  position: "absolute",
});

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

export default function AdminGuru() {
  const [openCreateGuru, setOpenCreateGuru] = useState(false);
  const [openEditGuru, setOpenEditGuru] = useState(false);
  const [addNama, setAddNama] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [dataPassword, setDataPassword] = useState(null);

  //zustand store
  const dataGuru = useAdminGuru((state) => state);

  //Modal Open For Edit Data Guru
  const handleOpenEditGuru = () => setOpenEditGuru(true);

  //Modal Open For Edit Data Guru
  const handleCloseEditGuru = () => setOpenEditGuru(false);

  //Modal Open For Create Guru
  async function handleOpenCreateGuru() {
    setOpenCreateGuru(true);
  }

  //Modal Close For Create Guru
  const handleCloseCreateGuru = () => {
    setOpenCreateGuru(false);
    setAddNama("");
    setAddUsername("");
    setAddPassword("");
  };

  const toggleVisibilityPassword = () => setShowPassword(!showPassword);

  const userAgent = navigator.userAgent;

  //Generate Password
  function generatePassword(length, options) {
    const optionsChars = {
      digits: "1234567890",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      symbols: "!@#$%^&",
    };

    const chars = [];
    for (let key in options) {
      if (
        options.hasOwnProperty(key) &&
        options[key] &&
        optionsChars.hasOwnProperty(key)
      ) {
        chars.push(optionsChars[key]);
      }
    }

    if (chars.length === 0) {
      console.error("No valid options provided for generating the password.");
      return null;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
      const charSet = chars[Math.floor(Math.random() * chars.length)];
      password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    return password;
  }

  const passwordLength = 12;
  const passwordOptions = {
    digits: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
  };

  const inputRandomizePassword = () =>
    setAddPassword(passwordLength, passwordOptions);

  useEffect(() => {
    dataGuru.getGuru();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="filter_style">
        <Button onClick={handleOpenCreateGuru} variant="contained">
          Create Guru
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                No
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Nama Guru
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Status Guru
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                User Agent
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontFamily: "Poppins",
                }}
              >
                Edit
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataGuru.guru?.map((data) => {
              return (
                <TableRow
                  key={data.guru_id}
                  sx={{
                    "&:last-child td, &:lastchild th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row" align="left">
                    <Typography fontFamily={"Poppins"}>
                      {data.guru_id}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Typography fontFamily={"Poppins"}>{data.nama}</Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ fontFamily: "Poppins" }}
                  >
                    {data.username}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {data.status_user === 1 ? (
                      <Chip label={"Active"} color="success" />
                    ) : (
                      <Chip label={"Inactive"} color="error" />
                    )}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="left"
                    sx={{ width: "100px", fontFamily: "Poppins" }}
                  >
                    {/* <Typography sx={{ width: "100px" }} fontFamily={"Poppins"}>
                      {data.user_agent}
                    </Typography> */}
                    {data.user_agent}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Button
                      onClick={handleOpenEditGuru}
                      sx={{ float: "left" }}
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
      {/* `Modal For Create Guru` */}
      <Modal
        open={openCreateGuru}
        onClose={handleCloseCreateGuru}
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
              Tambah Data Guru
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <TextField
                size="small"
                id="outlined"
                label="Nama Guru"
                type="text"
                value={addNama}
                onChange={(e) => setAddNama(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <TextField
                size="small"
                id="outlined"
                label="Username"
                type="text"
                value={addUsername}
                onChange={(e) => setAddUsername(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <TextField
                size="small"
                id="outlined"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={
                  dataPassword === null
                    ? addPassword
                    : generatePassword(passwordLength, passwordOptions)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleVisibilityPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setAddPassword(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Button onClick={inputRandomizePassword}>
                Generate Password
              </Button>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <TextField
                size="small"
                id="outlined"
                label="User Agent"
                type="text"
                value={userAgent}
                disabled
              />
            </FormControl>
            <Button
              style={{
                marginTop: 30,
              }}
              onClick={() =>
                dataGuru.createGuru(
                  addNama,
                  addUsername,
                  addPassword
                  // addUserAgent
                )
              }
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
      {/* Modal For Edit Guru */}
      <Modal
        open={openEditGuru}
        onClose={handleCloseEditGuru}
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
              Edit Data Guru
            </Typography>
          </div>
        </Box>
      </Modal>
    </>
  );
}
