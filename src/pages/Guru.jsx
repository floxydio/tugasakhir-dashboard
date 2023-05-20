import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
import BarLoader from 'react-spinners/BarLoader.js';

const textFieldStyle = {
  marginBottom: 10,
};

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
  const [nama, setNama] = useState('');
  const [mengajar, setMengajar] = useState('');
  const [statusguru, setStatusguru] = useState('');
  const [rating, setRating] = useState('');
  const [statusGuru, setStatusGuru] = useState('');
  const [guru, setGuru] = useState([]);
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState('DESC');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function filterData() {
    let params = {};
    if (rating === '' && statusGuru === '' && orderBy !== '') {
      params = {
        orderBy: orderBy,
      };
    } else if (rating !== '' && statusGuru === '' && orderBy !== '') {
      params = {
        rating: rating,
        orderBy: orderBy,
      };
    } else if (rating !== '' && statusGuru !== '' && orderBy !== '') {
      params = {
        statusguru: statusGuru,
        rating: rating,
        orderBy: orderBy,
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
    alert(mengajar);
    await axios
      .post(
        'http://103.174.115.58:3000/v1/guru',
        {
          nama: nama,
          mengajar: mengajar,
          status_guru: parseInt(statusguru),
          rating: parseInt(rating),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        if ((res.status === 200) | (res.status === 201)) {
          console.log('Response: ', res);
        }
      });
  }

  return (
    <>
      <select
        value={orderBy}
        onChange={((e) => setOrderBy(e.target.value), console.log('DiPencet'))}
        style={{
          padding: '10px',
          marginBottom: 30,
        }}
      >
        <option value="DESC">Filter by Descending</option>
        <option value="ASC">Filter by Ascending</option>
      </select>
      <Button sx={{ marginLeft: 3 }} onClick={filterData} variant="contained">
        Filter
      </Button>
      <Button
        onClick={handleOpen}
        style={{
          float: 'right',
        }}
      >
        Click Here
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
                      <TableCell align="left">{row.status_guru}</TableCell>
                      <TableCell align="left">{row.rating}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal open={open} onClose={handleClose}>
            <Box sx={boxStyle} component="form" noValidate autoComplete="off">
              <Typography
                style={{
                  textAlign: 'center',
                  marginBottom: 10,
                }}
              >
                Masukan Data
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
                    onChange={(e) => setNama(e.target.value)}
                    style={textFieldStyle}
                  />
                  <TextField
                    required
                    id="outlined"
                    label="Mengajar"
                    type="text"
                    onChange={(e) => setMengajar(e.target.value)}
                    style={textFieldStyle}
                  />
                  <TextField
                    required
                    id="outlined-number-status_aktif"
                    label="Status Guru"
                    type="number"
                    onChange={(e) => setStatusguru(e.target.value)}
                    style={textFieldStyle}
                  />
                  <TextField
                    required
                    id="outlined-number-rating"
                    label="Rating"
                    type="number"
                    onChange={(e) => setRating(e.target.value)}
                    style={textFieldStyle}
                  />
                  <button onClick={(e) => checkData(e)} type="submit">
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
