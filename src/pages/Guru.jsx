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
  FormLabel,
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
  const [validation, setValidation] = useState({});
  const [value, setValue] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputRating = (e) => {
    setRating(e.target.value);
  };

  const handleInputStatusGuru = (e) => {
    setStatusguru(e.target.value);
  };

  const handleInput = (event) => {
    setValue(event.target.value.replace(/[^0-9]/g, ''));
    if (value > 2) {
      setValue('2');
    }
  };

  const findGuru = () => {
    axios.get('http://103.174.115.58:3000/v1/guru').then((result) => {
      console.log(result.data.data);
      setGuru(result.data.data);
    });
  };

  const guruPost = async (e) => {
    e.preventDefault();

    await axios
      .post('http://103.174.115.58:3000/v1/guru', {
        nama: nama,
        mengajar: mengajar,
        statusguru: statusguru,
        rating: rating,
      })
      .then(() => {
        history.pushState();
      })
      .catch((err) => {
        setValidation(err.response.data);
      });
  };

  useEffect(() => {
    findGuru();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nama</TableCell>
              <TableCell>Mengajar</TableCell>
              <TableCell>Status Guru</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {guru.map((row) => {
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}
              >
                <TableCell align="left">{row.nama}</TableCell>
                <TableCell align="left">{row.mengajar}</TableCell>
                <TableCell align="left">{row.status_guru}</TableCell>
                <TableCell align="left">{row.rating}</TableCell>
              </TableRow>;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOpen}>Click Here</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} component="form" noValidate autoComplete="off">
          <form onSubmit={guruPost}>
            <FormControl>
              <TextField
                required
                id="outlined"
                label="Nama"
                onChange={(e) => setNama(e.target.value)}
                style={textFieldStyle}
              />
              <TextField
                required
                id="outlined"
                label="Mengajar"
                onChange={(e) => setMengajar(e.target.value)}
                style={textFieldStyle}
              />
              <TextField
                required
                id="outlined-number-rating"
                label="Rating"
                type="number"
                onChange={[handleInput, handleInputRating]}
                style={textFieldStyle}
              />
              <TextField
                required
                id="outlined-number-status_aktif"
                label="Status Guru"
                type="number"
                onChange={[handleInput, handleInputStatusGuru]}
                style={textFieldStyle}
              />
              <button type="submit">Submit</button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </>
  );
}
