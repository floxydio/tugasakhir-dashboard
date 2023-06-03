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
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "../style/absensi.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AccountCircle, Close, Search } from "@mui/icons-material";
import axiosNew from "../components/AxiosConfig";
import cryptoJS from "crypto-js";

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

export default function Absensi() {
  const [getMonth, setGetMonth] = React.useState(0);
  const [absenData, setAbsenData] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("ASC");
  const [filterGuru, setFilterGuru] = React.useState("");
  const [month, setFilterMonth] = React.useState("");
  const tableRef = React.useRef(null);
  const [loading, setLoading] = React.useState(false);
  const [search, setSearch] = React.useState(undefined);
  const [isThrottled, setIsThrottled] = React.useState(false);

  // For Absen Manual
  const [addUser, setAddUser] = React.useState("");
  const [addNamaGuru, setAddNamaGuru] = React.useState("");
  const [addNamaUser, setAddNamaUser] = React.useState("");
  const [addPelajaran, setAddPelajaran] = React.useState("");
  const [addNomorKelas, setAddNomorkelas] = React.useState("");
  const [addKeterangan, setAddKeterangan] = React.useState("");
  const [addAlasan, setAddAlasan] = React.useState("");
  const [addHari, setAddHari] = React.useState("");
  const [addBulan, setAddBulan] = React.useState("");
  const [addTahun, setAddTahun] = React.useState("");
  const [addWaktu, setAddWaktu] = React.useState("");
  //

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [openManual, setOpenManual] = React.useState(false);
  const handleCloseManual = () => setOpenManual(false);

  const [editId, setEditId] = React.useState("");
  const [editNamaGuru, setNamaGuru] = React.useState("");
  const [editNamaUser, setEditNamaUser] = React.useState("");
  const [editPelajaran, setEditPelajaran] = React.useState("");
  const [editNomorKelas, setEditNomorkelas] = React.useState("");
  const [editKeterangan, setEditKeterangan] = React.useState("");
  const [editAlasan, setEditAlasan] = React.useState("");
  const [editHari, setEditHari] = React.useState("");
  const [editBulan, setEditBulan] = React.useState("");
  const [editTahun, setEditTahun] = React.useState("");
  const [editWaktu, setEditWaktu] = React.useState("");

  //
  const [dataGuru, setDataGuru] = React.useState([]);
  const [dataPelajaran, setDataPelajaran] = React.useState([]);
  const [dataKelas, setDataKelas] = React.useState([]);
  const [editValueGuru, setDataValueGuru] = React.useState("");
  const [editValueKelas, setDataValueKelas] = React.useState("");
  const [editValuePelajaran, setDataValuePelajaran] = React.useState("");

  const [dataUser, setDataUser] = React.useState([]);

  const token = localStorage.getItem("token");

  const dataKeterangan = [
    { id: 1, value: "ABSEN" },
    { id: 2, value: "IZIN" },
  ];

  async function handleOpen(
    id,
    namaUser,
    namaGuru,
    pelajaran,
    nomorKelas,
    keterangan,
    alasan,
    hari,
    bulan,
    tahun,
    waktu
  ) {
    setEditId(id);
    setEditNamaUser(namaUser);
    setNamaGuru(namaGuru);
    setEditPelajaran(pelajaran);
    setEditNomorkelas(nomorKelas);
    setEditKeterangan(keterangan);
    setEditAlasan(alasan);
    setEditHari(hari);
    setEditBulan(bulan);
    setEditTahun(tahun);
    setEditWaktu(waktu);
    setOpen(true);

    async function getGuru() {
      setLoading(true);
      await axiosNew.get("/guru").then(function (res) {
        setDataValueGuru(res.data.data.find((item) => item.nama === namaGuru));
        setNamaGuru(res.data.data.find((item) => item.nama === namaGuru));
        setDataGuru(res.data.data);
        setLoading(false);
      });
    }
    async function getPelajaran() {
      const decrypt = cryptoJS.AES.decrypt(
        token,
        `${import.meta.env.VITE_KEY_ENCRYPT}`
      );
      setLoading(true);
      await axiosNew
        .get("/find-pelajaran", {
          headers: {
            "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then(function (res) {
          setDataValuePelajaran(
            res.data.data.find((item) => item.nama === pelajaran)
          );
          setEditPelajaran(
            res.data.data.find((item) => item.nama === pelajaran)
          );
          setDataPelajaran(res.data.data);
          setLoading(false);
        });
    }
    async function getKelas() {
      setLoading(true);

      await axiosNew.get("/kelas").then(function (res) {
        setDataValueKelas(
          res.data.data.find((item) => item.nomor === nomorKelas)
        );
        setEditNomorkelas(
          res.data.data.find((item) => item.nomor === nomorKelas)
        );
        setDataKelas(res.data.data);
        setLoading(false);
      });
    }
    await getGuru();
    await getPelajaran();
    await getKelas();
  }

  async function handleOpenAbsenManual() {
    setOpenManual(true);
    const decrypt = cryptoJS.AES.decrypt(
      token,
      `${import.meta.env.VITE_KEY_ENCRYPT}`
    );

    async function getDataUser() {
      setLoading(true);
      await axiosNew
        .get("/list-users", {
          headers: {
            "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then(function (res) {
          setDataUser(res.data.data);
          setLoading(false);
        });
    }

    async function getGuru() {
      setLoading(true);
      await axiosNew.get("/guru").then(function (res) {
        setDataGuru(res.data.data);
        setLoading(false);
      });
    }
    async function getPelajaran() {
      setLoading(true);
      await axiosNew
        .get("/find-pelajaran", {
          headers: {
            "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then(function (res) {
          setDataPelajaran(res.data.data);
          setLoading(false);
        });
    }
    async function getKelas() {
      setLoading(true);

      await axiosNew.get("/kelas").then(function (res) {
        setDataKelas(res.data.data);
        setLoading(false);
      });
    }
    await getGuru();
    await getPelajaran();
    await getKelas();
    await getDataUser();
  }

  async function filterData() {
    const decrypt = cryptoJS.AES.decrypt(
      token,
      `${import.meta.env.VITE_KEY_ENCRYPT}`
    );
    setAbsenData([]);
    let params = {};
    if (
      month === "" &&
      filterGuru === "" &&
      orderBy !== "" &&
      search === undefined
    ) {
      params = {
        orderby: orderBy,
      };
    } else if (
      month !== "" &&
      filterGuru === "" &&
      orderBy !== "" &&
      search === undefined
    ) {
      params = {
        month: month,
        orderby: orderBy,
      };
    } else if (
      month !== "" &&
      filterGuru !== "" &&
      orderBy !== "" &&
      search === undefined
    ) {
      params = {
        gurunama: filterGuru,
        month: month,
        orderby: orderBy,
      };
      //aa
    } else if (
      month === "" &&
      filterGuru === "" &&
      orderBy !== "" &&
      search !== undefined
    ) {
      params = {
        search: search,
        orderby: orderBy,
      };
    } else if (month !== "" && filterGuru === "" && orderBy !== "") {
      params = {
        search: search,
        month: month,
        orderby: orderBy,
      };
    }
    async function getAbsenFilterOrderBy() {
      await axiosNew
        .get("/absen", {
          params: params,
          headers: {
            "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then((res) => {
          setAbsenData(res.data.data);
        });
    }
    getAbsenFilterOrderBy();
  }

  async function submitEdit() {
    const decrypt = cryptoJS.AES.decrypt(
      token,
      `${import.meta.env.VITE_KEY_ENCRYPT}`
    );
    let formData = {};
    if (editKeterangan === "IZIN") {
      formData = {
        guru_id: editNamaGuru.id === undefined ? editNamaGuru : editNamaGuru.id,
        pelajaran_id:
          editPelajaran.id === undefined ? editPelajaran : editPelajaran.id,
        kelas_id:
          editNomorKelas.nomor === undefined
            ? editNomorKelas
            : editNomorKelas.nomor,
        keterangan: editKeterangan,
        reason: editAlasan,
        day: editHari,
        month: editBulan,
        year: editTahun,
        time: editWaktu,
      };
    } else {
      formData = {
        guru_id: editNamaGuru.id === undefined ? editNamaGuru : editNamaGuru.id,
        pelajaran_id:
          editPelajaran.id === undefined ? editPelajaran : editPelajaran.id,
        kelas_id:
          editNomorKelas.nomor === undefined
            ? editNomorKelas
            : editNomorKelas.nomor,
        keterangan: editKeterangan,
        reason: "-",
        day: editHari,
        month: editBulan,
        year: editTahun,
        time: editWaktu,
      };
    }

    await axiosNew
      .put(`/edit-absen/${editId}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          handleClose();
          async function getAbsen() {
            setLoading(true);
            await axiosNew.get("/absen").then((res) => {
              setAbsenData(res.data.data);
              setLoading(false);
            });
          }
          getAbsen();
        }
      });
  }

  async function submitManual() {
    const decrypt = cryptoJS.AES.decrypt(
      token,
      `${import.meta.env.VITE_KEY_ENCRYPT}`
    );
    let formData = {};
    if (editKeterangan === "IZIN") {
      formData = {
        guru_id: addNamaGuru,
        pelajaran_id: addPelajaran,
        kelas_id: addNomorKelas,
        user_id: addUser,
        keterangan: addKeterangan,
        reason: addAlasan,
        day: addHari,
        month: addBulan,
        year: addTahun,
        time: addWaktu,
      };
    } else {
      formData = {
        guru_id: addNamaGuru,
        pelajaran_id: addPelajaran,
        kelas_id: addNomorKelas,
        keterangan: addKeterangan,

        user_id: addUser,
        reason: "-",
        day: addHari,
        month: addBulan,
        year: addTahun,
        time: addWaktu,
      };
    }

    await axiosNew
      .post(`/absen`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          handleCloseManual();
          async function getAbsen() {
            setLoading(true);
            await axiosNew.get("/absen").then((res) => {
              setAbsenData(res.data.data);
              setLoading(false);
            });
          }
          getAbsen();
        }
      });
  }

  const handleChangeThrottle = async () => {
    if (!isThrottled) {
      await filterData();
      setIsThrottled(true);
      setTimeout(() => {
        setIsThrottled(false);
      }, 500);
    }
  };

  React.useEffect(() => {
    async function getAbsen() {
      setLoading(true);
      const decrypt = cryptoJS.AES.decrypt(
        token,
        `${import.meta.env.VITE_KEY_ENCRYPT}`
      );
      await axiosNew
        .get("/absen", {
          headers: {
            "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
          },
        })
        .then((res) => {
          setAbsenData(res.data.data);
          setLoading(false);
        });
    }
    getAbsen();
    setGetMonth(new Date().getMonth() + 1);
  }, []);

  return (
    <>
      <TextField
        id="input-with-icon-textfield"
        label="Search Nama User"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          setSearch(e.target.value), handleChangeThrottle();
        }}
        variant="standard"
      />
      <div className="filter_style">
        <Button
          className="btn_absen"
          sx={{
            marginTop: 1,
          }}
          onClick={handleOpenAbsenManual}
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
                <MenuItem key={e.value} value={e.value}>
                  {e.name}
                </MenuItem>
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
                <TableCell align="right">Alasan</TableCell>
                <TableCell align="right">Hari</TableCell>
                <TableCell align="right">Bulan</TableCell>
                <TableCell align="right">Tahun</TableCell>
                <TableCell align="right">Waktu</TableCell>
                <TableCell align="right">Action</TableCell>
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
                  <TableCell align="right">
                    {row.keterangan === "ABSEN" ? (
                      <Chip label={row.keterangan} color="success" />
                    ) : (
                      <Chip label={row.keterangan} color="error" />
                    )}
                  </TableCell>
                  <TableCell align="right">{row.reason}</TableCell>

                  <TableCell align="right">{row.day}</TableCell>
                  <TableCell align="right">{row.month}</TableCell>
                  <TableCell align="right">{row.year}</TableCell>
                  <TableCell align="right">{row.time}</TableCell>
                  <TableCell align="right">
                    <Button
                      className="btn_absen"
                      sx={{
                        marginTop: 1,
                      }}
                      onClick={() =>
                        handleOpen(
                          row.id,
                          row.nama_user,
                          row.nama_guru,
                          row.pelajaran_nama,
                          row.nomor_kelas,
                          row.keterangan,
                          row.reason,
                          row.day,
                          row.month,
                          row.year,
                          row.time
                        )
                      }
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
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
                      Ubah Data Absen
                    </Typography>
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
                        value={
                          editNamaGuru.id === undefined
                            ? editNamaGuru
                            : editNamaGuru.id
                        }
                        onChange={(e) => setNamaGuru(e.target.value)}
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
                        Mata Pelajaran
                      </InputLabel>

                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Mata Pelajaran"
                        value={
                          editPelajaran.id === undefined
                            ? editPelajaran
                            : editPelajaran.id
                        }
                        onChange={(e) => setEditPelajaran(e.target.value)}
                      >
                        {dataPelajaran.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Nomor Kelas
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nomor Kelas"
                        value={
                          editNomorKelas.nomor === undefined
                            ? editNomorKelas
                            : editNomorKelas.nomor
                        }
                        onChange={(e) => setEditNomorkelas(e.target.value)}
                      >
                        {dataKelas.map((e) => (
                          <MenuItem key={e.id} value={e.nomor}>
                            Nomor Kelas : {e.nomor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Keterangan
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Keterangan"
                        value={editKeterangan}
                        onChange={(e) => setEditKeterangan(e.target.value)}
                      >
                        {dataKeterangan.map((e) => (
                          <MenuItem key={e.id} value={e.value}>
                            {e.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {editKeterangan === "IZIN" ? (
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <TextField
                          size="small"
                          id="outlined"
                          label="Alasan"
                          type="text"
                          value={editAlasan}
                          onChange={(e) => setEditAlasan(e.target.value)}
                        />
                      </FormControl>
                    ) : null}
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Tanggal"
                        type="text"
                        value={editHari}
                        onChange={(e) => setEditHari(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Bulan"
                        type="text"
                        value={editBulan}
                        onChange={(e) => setEditBulan(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Tahun"
                        type="text"
                        value={editTahun}
                        onChange={(e) => setEditTahun(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      style={{
                        marginTop: 30,
                      }}
                      onClick={submitEdit}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
              {/* Manual Absen */}
              <Modal
                open={openManual}
                onClose={handleCloseManual}
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
                      Tambah Data Absen
                    </Typography>
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
                        value={addNamaGuru}
                        onChange={(e) => setAddNamaGuru(e.target.value)}
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
                        Mata Pelajaran
                      </InputLabel>

                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Mata Pelajaran"
                        value={addPelajaran}
                        onChange={(e) => setAddPelajaran(e.target.value)}
                      >
                        {dataPelajaran.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Nomor Kelas
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nomor Kelas"
                        value={addNomorKelas}
                        onChange={(e) => setAddNomorkelas(e.target.value)}
                      >
                        {dataKelas.map((e) => (
                          <MenuItem key={e.id} value={e.nomor}>
                            Nomor Kelas : {e.nomor}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Nama Siswa
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nomor Kelas"
                        value={addUser}
                        onChange={(e) => setAddUser(e.target.value)}
                      >
                        {dataUser.map((e) => (
                          <MenuItem key={e.id} value={e.id}>
                            {e.nama}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="demo-simple-select-label">
                        Keterangan
                      </InputLabel>
                      <Select
                        sx={{
                          height: 40,
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Keterangan"
                        value={addKeterangan}
                        onChange={(e) => setAddKeterangan(e.target.value)}
                      >
                        {dataKeterangan.map((e) => (
                          <MenuItem key={e.id} value={e.value}>
                            {e.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {editKeterangan === "IZIN" ? (
                      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <TextField
                          size="small"
                          id="outlined"
                          label="Alasan"
                          type="text"
                          value={addAlasan}
                          onChange={(e) => setAddAlasan(e.target.value)}
                        />
                      </FormControl>
                    ) : null}
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Tanggal"
                        type="number"
                        value={addHari}
                        onChange={(e) => setAddHari(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Bulan"
                        type="number"
                        value={addBulan}
                        onChange={(e) => setAddBulan(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Tahun"
                        type="number"
                        value={addTahun}
                        onChange={(e) => setAddTahun(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <TextField
                        size="small"
                        id="outlined"
                        label="Waktu"
                        type="text"
                        value={addWaktu}
                        onChange={(e) => setAddWaktu(e.target.value)}
                      />
                    </FormControl>
                    <Button
                      style={{
                        marginTop: 30,
                      }}
                      onClick={submitManual}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </div>
                </Box>
              </Modal>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
