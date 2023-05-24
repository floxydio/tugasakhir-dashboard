import { useState, useEffect } from 'react';
import axios from 'axios';
import BarLoader from 'react-spinners/BarLoader.js';
import { RatingModels } from '../models/Rating_models';
import { GuruModels } from '../models/Guru_models';
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
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';

const textFieldStyle = {
  marginBottom: 10,
  marginTop: 10,
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

export default function Guru() {
  const [rating, setRating] = useState('');
  const [guru, setGuru] = useState([]);
  const [getRating, setGetRating] = useState(0);
  const [openTambahGuru, setOpenTambahGuru] = useState(false);
  const [openEditData, setOpenEditData] = useState(false);
  const [orderBy, setOrderBy] = useState('DESC');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const [editNamaGuru, setEditNamaGuru] = useState('');
  const [editNamaMengajar, setEditNamaMengajar] = useState('');
  const [editStatusGuru, setEditStatusGuru] = useState('');
  const [editRatingGuru, setEditRatingGuru] = useState('');
  const [newNama, setNewNama] = useState('');
  const [newMengajar, setNewMengajar] = useState('');
  const [newStatusGuru, setNewStatusGuru] = useState('');
  const [newRating, setNewRating] = useState('');

  const handleOpen = () => setOpenTambahGuru(true);
  const handleClose = () => setOpenTambahGuru(false);

  function handleOpenEdit(id, namaGuru, namaMengajar, status_guru, rating) {
    setEditId(id);
    setEditNamaGuru(namaGuru);
    setEditNamaMengajar(namaMengajar);
    setEditStatusGuru(status_guru);
    setEditRatingGuru(rating);
    setOpenEditData(true);
  }
  const handleCloseEdit = () => setOpenEditData(false);

  function filterData() {
    let params = {};
    if (rating === '' && orderBy !== '') {
      params = {
        orderby: orderBy,
      };
    } else if (rating !== '' && orderBy !== '') {
      params = {
        rating: rating,
        orderby: orderBy,
      };
    }
    async function getDataGuruFilterOrderBy() {
      await axios
        .get('http://103.174.115.58:3000/v1/guru', {
          params: params,
        })
        .then((res) => {
          setGuru(res.data.data);
        });
    }
    getDataGuruFilterOrderBy();
  }

  useEffect(() => {
    setLoading(true);
    async function findGuru() {
      await axios.get('http://103.174.115.58:3000/v1/guru').then((result) => {
        setGuru(result.data.data);
        setLoading(false);
      });
    }
    findGuru();
  }, []);

  async function checkData(e) {
    e.preventDefault();
    await axios.post(
      'http://103.174.115.58:3000/v1/guru',
      {
        nama: newNama,
        mengajar: newMengajar,
        status_guru: newStatusGuru,
        rating: newRating,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  }

  async function handleEdit(e) {
    e.preventDefault();
    await axios
      .put(
        `http://103.174.115.58:3000/v1/edit-guru/${editId}`,
        {
          nama: editNamaGuru,
          mengajar: editNamaMengajar,
          status_guru: editStatusGuru,
          rating: editRatingGuru,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setOpenEditData(false);
          async function findGuru() {
            await axios
              .get('http://103.174.115.58:3000/v1/guru')
              .then((result) => {
                setGuru(result.data.data);
                setLoading(false);
              });
          }
          findGuru();
        }
      });
  }

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120, bottom: 8 }} size="small">
        <InputLabel id="demo-simple-select-label">Rating</InputLabel>
        <Select
          sx={{
            height: 40,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rating === '' ? getRating : rating}
          label="Rating"
          onChange={(e) => setRating(e.target.value)}
        >
          {RatingModels.map((e) => (
            <MenuItem value={e.value} key={e.value}>
              {e.rating}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120, bottom: 8 }} size="small">
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Filter"
          value={orderBy}
          onChange={(e) => setOrderBy(e.target.value)}
          sx={{
            padding: '10px',
            height: 40,
          }}
        >
          <MenuItem value="DESC">Filter by Descending</MenuItem>
          <MenuItem value="ASC">Filter by Ascending</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ marginLeft: 3 }} onClick={filterData} variant="contained">
        Filter
      </Button>
      <Button
        onClick={handleOpen}
        style={{
          float: 'right',
        }}
        variant="contained"
      >
        Tambah Guru
      </Button>
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
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Mengajar</TableCell>
                  <TableCell>Status Guru</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {guru.map((row) => {
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.nama}</TableCell>
                      <TableCell align="left">{row.mengajar}</TableCell>
                      <TableCell align="left">
                        {row.status_guru === 1 ? (
                          <Chip label={'Active'} color="success" />
                        ) : (
                          <Chip label={'Inactive'} color="error" />
                        )}
                      </TableCell>
                      <TableCell align="left">{row.rating}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() =>
                            handleOpenEdit(
                              row.id,
                              row.nama,
                              row.mengajar,
                              row.status_guru,
                              row.rating
                            )
                          }
                          style={{
                            float: 'left',
                          }}
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
          <Modal open={openTambahGuru} onClose={handleClose}>
            <Box sx={boxStyle} noValidate autoComplete="off">
              <Typography
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                Masukkan Data Guru
              </Typography>
              <FormControl
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <TextField
                  required
                  id="outlined"
                  label="Nama"
                  type="text"
                  onChange={(e) => setNewNama(e.target.value)}
                  style={textFieldStyle}
                />
                <TextField
                  required
                  id="outlined"
                  label="Mengajar"
                  type="text"
                  onChange={(e) => setNewMengajar(e.target.value)}
                  style={textFieldStyle}
                />
                <TextField
                  required
                  id="outlined-number-status_aktif"
                  label="Status Guru"
                  type="number"
                  onChange={(e) => setNewStatusGuru(e.target.value)}
                  style={textFieldStyle}
                />
                <TextField
                  required
                  id="outlined-number-rating"
                  label="Rating"
                  type="number"
                  onChange={(e) => setNewRating(e.target.value)}
                  style={textFieldStyle}
                />
                <Button
                  onClick={(e) => checkData(e)}
                  type="submit"
                  sx={{
                    height: 45,
                    backgroundColor: 'blue',
                    color: 'white',
                    fontWeight: 'bold',
                    borderColor: 'transparent',
                    borderRadius: 20,
                    marginTop: 2,
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </Box>
          </Modal>
          <Modal
            open={openEditData}
            onClose={handleCloseEdit}
            arial-aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={boxStyle} autoComplete="off">
              <Typography
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                Edit Data
              </Typography>
              <form
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <FormControl>
                  <TextField
                    required
                    id="outlined"
                    label="Nama"
                    type="text"
                    style={textFieldStyle}
                    value={editNamaGuru}
                    onChange={(e) => setEditNamaGuru(e.target.value)}
                  />
                  <TextField
                    required
                    id="outlined"
                    label="Mengajar"
                    type="text"
                    style={textFieldStyle}
                    value={editNamaMengajar}
                    onChange={(e) => setEditNamaMengajar(e.target.value)}
                  />
                  <TextField
                    required
                    id="outlined-number-status_aktif"
                    label="Status Guru"
                    type="number"
                    style={textFieldStyle}
                    value={editStatusGuru}
                    onChange={(e) => setEditStatusGuru(e.target.value)}
                  />
                  <TextField
                    required
                    id="outlined-number-rating"
                    label="Rating"
                    type="number"
                    value={editRatingGuru}
                    style={textFieldStyle}
                    onChange={(e) => setEditRatingGuru(e.target.value)}
                  />
                  <button
                    onClick={handleEdit}
                    type="submit"
                    style={{
                      marginTop: 20,
                      height: 45,
                      backgroundColor: 'blue',
                      color: 'white',
                      fontWeight: 'bold',
                      borderColor: 'transparent',
                      borderRadius: 20,
                    }}
                  >
                    Submit
                  </button>
                </FormControl>
              </form>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
}
