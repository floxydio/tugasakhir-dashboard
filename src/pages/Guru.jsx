import { useEffect, useState } from 'react';
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

export default function Guru() {
  const [nama, setNama] = useState('');
  const [mengajar, setMengajar] = useState('');
  const [statusguru, setStatusguru] = useState('');
  const [rating, setRating] = useState('');
  const [guru, setGuru] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function findGuru() {
      await axios.get('http://103.174.115.58:3000/v1/guru').then((result) => {
        console.log(result.data.data);
        setGuru(result.data.data);
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
      <Button
        onClick={handleOpen}
        style={{
          float: 'right',
        }}
      >
        Click Here
      </Button>
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
  );
}
