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
  const [addNama, setAddNama] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addPassword, setAddPassword] = useState("");
  const [addUserAgent, setAddUserAgent] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [dataPassword, setDataPassword] = useState(null);

  const dataGuru = useAdminGuru((state) => state);

  async function handleOpenCreateGuru() {
    setOpenCreateGuru(true);
  }

  const handleCloseCreateGuru = () => {
    setOpenCreateGuru(false);
    setAddNama("");
    setAddUsername("");
    setAddPassword("");
  };

  const toggleVisibilityPassword = () => setShowPassword(!showPassword);

  const userAgent = navigator.userAgent;

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

  function InputRandomizePassword() {
    setAddPassword(generatePassword(passwordLength, passwordOptions));
  }

  useEffect(() => {
    dataGuru.getGuru();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="filter_style">
        <Button onClick={handleOpenCreateGuru}>Create Guru</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                No
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                Nama Guru
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                Username
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                Status Guru
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                }}
              >
                User Agent
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
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
                    {data.guru_id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {data.nama}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {data.username}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {data.status_user === 1 ? (
                      <Chip label={"Active"} color="success" />
                    ) : (
                      <Chip label={"Inactive"} color="error" />
                    )}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {data.user_agent}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    <Button
                      onClick={() => {
                        console.log("Masuk Nihhh");
                      }}
                      sx={{ float: "left" }}
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
              <Button onClick={InputRandomizePassword}>
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
              // onClick={() => {
              //   console.log(addNama);
              //   console.log(addUsername);
              //   console.log(addPassword);
              // }}
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
    </>
  );
}
