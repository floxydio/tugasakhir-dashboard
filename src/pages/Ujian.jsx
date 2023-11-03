import { Box, Button, Fade, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material'
import React, { useState, useEffect, useRef } from 'react'
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { ToastContainer, toast } from 'react-toastify';
import axiosNew from "../components/AxiosConfig"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useUjian } from '../store/ujian.store';



export default function Ujian() {
  const [showModal, setShowModal] = useState(false)
  const [typeUjian, setTypeUjian] = useState()
  const [durasi, setDurasi] = useState()
  const [jamMulai, setJamMulai] = useState()
  const [questions, setQuestions] = useState([]);
  const [soal, setSoal] = useState('');
  const [choices, setChoices] = useState(Array(5).fill(''));
  const [jawaban, setJawaban] = useState('');
  const [addEssay, setAddEssay] = useState(false)
  const [essay, setEssay] = useState([])
  const tableRef = useRef(null);


  const onHideModal = () => {
    setShowModal(false)

  }

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    const savedEssay = localStorage.getItem('essay');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
    if (savedEssay) {
      setAddEssay(true)
      setEssay(JSON.parse(savedEssay));
    }
    if(savedQuestions || savedEssay) {
      if(import.meta.env.VITE_SERVER_TYPE !== "dev") {
        toast.info("Data Ujian belum disubmit, silahkan submit!")
      }
    }
    useUjian.getState().getUjian()
  }, []);

  
  useEffect(() => {
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('essay', JSON.stringify(essay));
  }, [questions, essay]);

  async function createUjian() {
    await axiosNew.post("/create-ujian", {
      nama_ujian: "Ujian Tengah Semester",
      durasi: 60,
      total_soal: questions.length + essay.length,
      soal: questions,
      essay: essay,
    },{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      toast.success("Berhasil Membuat Ujian")
      onHideModal()
    }).catch((err) => {
     toast.error("Gagal Membuat Ujian")
    })
  }


  return (
    <>
      <ToastContainer />
      <Button variant='contained' onClick={() => setShowModal(true)}>Buat Ujian</Button>
      <Modal
        disablePortal
        open={showModal}
        onClose={onHideModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={{
            position: 'absolute',
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '60%', 
            height: '90vh', 
            bgcolor: 'white',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
          }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >

              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Input Ujian
              </Typography>
              <FormControl fullWidth style={{
                marginTop: "50px"
              }}>
                <InputLabel id="demo-simple-select-label">Jenis Ujian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={typeUjian}
                  label="Jenis Ujian"
                  onChange={(e) => setTypeUjian(e.target.value)}
                >
                  <MenuItem value={10}>Ujian Tengah Semester</MenuItem>
                  <MenuItem value={20}>Ujian Akhir Semester</MenuItem>
                  <MenuItem value={30}>Ulangan Harian</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{
                marginTop: "20px"
              }}>
                <InputLabel id="demo-simple-select-label">Durasi Ujian</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={durasi}
                  label="Durasi Ujian"
                  onChange={(e) => setDurasi(e.target.value)}
                >
                  <MenuItem value={15}>15 Menit</MenuItem>
                  <MenuItem value={30}>30 Menit</MenuItem>
                  <MenuItem value={45}>45 Menit</MenuItem>
                  <MenuItem value={60}>60 Menit</MenuItem>
                  <MenuItem value={90}>90 Menit</MenuItem>
                  <MenuItem value={120}>120 Menit</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{
                marginTop: "20px"
              }}
              >
                <InputLabel id="demo-simple-select-label">Jam Mulai</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={jamMulai}
                  label="Durasi Ujian"
                  onChange={(e) => setJamMulai(e.target.value)}
                >
                  <MenuItem value={7}>07.00</MenuItem>
                  <MenuItem value={8}>08.00</MenuItem>
                  <MenuItem value={9}>09.00</MenuItem>
                  <MenuItem value={10}>10.00</MenuItem>
                  <MenuItem value={11}>11.00</MenuItem>
                  <MenuItem value={12}>12.00</MenuItem>
                  <MenuItem value={13}>13.00</MenuItem>
                  <MenuItem value={14}>14.00</MenuItem>
                  <MenuItem value={15}>15.00</MenuItem>
                  <MenuItem value={16}>16.00</MenuItem>
                  <MenuItem value={17}>17.00</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth style={{
                marginTop: "20px"
              }}
              >
                <InputLabel id="demo-simple-select-label">Keterangan</InputLabel>
                <TextField id="outlined-basic" label="Keterangan" variant="outlined" />
              </FormControl>

              <FormControl fullWidth style={{
                marginTop: "20px"
              }}
              >
                <TextField id="outlined" variant='outlined' type='date' />
              </FormControl>

              <p>Soal Ujian Input</p>

              {questions.map((question, qIndex) => (
                <div style={{
                  border: "1px solid black",
                  padding: "20px",
                  marginTop: "20px",
                 borderRadius: "10px"
                }} key={qIndex}>
                  <p>Soal ke - {qIndex + 1}</p>
                  <FormControl fullWidth>
                    <TextField
                      label="Soal"
                      variant="outlined"
                      value={question.soal || ''}
                      sx={{ marginTop: "15px" }}
                      onChange={e => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[qIndex].soal = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                    {['A', 'B', 'C', 'D', 'E'].map((choiceLabel, cIndex) => (
                      <TextField
                        key={cIndex}
                        value={question.pilihan[cIndex]['isi_plihan[' + cIndex + ']'] || ''}
                        label={`Pilihan ${choiceLabel}`}
                        variant="outlined"
                        sx={{ marginTop: "15px" }}
                        onChange={e => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[qIndex].pilihan[cIndex]['isi_plihan[' + cIndex + ']'] = e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                    ))}
                  <Typography variant="subtitle2" sx={{ marginTop: "15px", color:"red" }}>*Kosongkan E Jika tidak diperlukan </Typography>

                    <TextField
                      label="Jawaban"
                      value={question.jawaban || ''}
                      variant="outlined"
                      sx={{ marginTop: "15px" }}
                      onChange={e => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[qIndex].jawaban = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                  </FormControl>
                </div>
              ))}

              <Button
                style={{ marginTop: "20px" }}
                variant='contained'
                onClick={() => {
                  if(questions[questions.length - 1].soal === '') {
                    toast.error("Soal tidak boleh kosong!")
                    return
                  } else if(questions[questions.length - 1].jawaban === '') {
                    toast.error("Jawaban tidak boleh kosong!")
                    return
                  } else {
                    setQuestions([...questions, {
                      id_soal: questions.length + 1,
                      soal: '',
                      pilihan: Array(5).fill({}).map((_, i) => ({
                        ['jenis_pilihan[' + i + ']']: String.fromCharCode(65 + i),
                        ['isi_plihan[' + i + ']']: ''
                      })),
                      jawaban: ''
                    }]);
                  }
                }}
              >
                Tambah Soal Pilihan Ganda
              </Button>
              {questions.length > 1 &&  <Button
                style={{marginTop:"20px"}}
                variant="contained"
                color='error'
                onClick={() => {
                  setQuestions([...questions].slice(0, questions.length - 1));
                }}
              >
                Hapus 1 Soal Pilihan Ganda
              </Button>}

              <FormControlLabel sx={{marginTop: "40px",marginBottom: "40px"}} control={<Switch checked={addEssay} onChange={() => {
                setAddEssay(!addEssay)
              }} />} label="Tambahkan Essay" />

              {addEssay && <>
                {essay.map((s, eIndex) => (
                  <>
                  <div style={{}} key={eIndex}>
                  <p>Soal Essay ke {eIndex + 1}</p>
                  <FormControl fullWidth>
                  <TextField
                    value={essay[eIndex].soal || ''}
                    label="Soal Essay"
                    variant="outlined"
                    sx={{ marginTop: "15px" }}
                    onChange={e => {
                      const updatedEssay = [...essay];
                      updatedEssay[eIndex].soal = e.target.value;
                      setEssay(updatedEssay);
                    }}
                  />
                  <TextField
                   value={essay[eIndex].jawaban || ''}
                   label="Jawaban Essay" onChange={e => {
                    const updatedEssay = [...essay];
                    updatedEssay[eIndex].jawaban = e.target.value;
                    setEssay(updatedEssay);
                  }} variant='outlined' sx={{marginTop:"15px"}} />
                  </FormControl>
                </div>
                  </>
                ))}
                     <Button
                style={{ marginTop: "20px" }}
                variant='contained'
                onClick={() => {
                  setEssay([...essay, {
                    id_soal: essay.length + 1,
                    soal: '',
                    jawaban: ''
                  }]);
                }}
              >
                Tambah Soal Essay
              </Button>
              </>}
         
              {essay.length > 1 && <Button
                style={{ marginTop: "20px" }}
                variant='contained'
                color='error'
                onClick={() => {
                  setEssay([...essay].slice(0, essay.length - 1));
                }}
              >
                Hapus 1 Soal Essay
              </Button>}

              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "100px"
              }}>


                <Button variant="contained" color='error' onClick={() => {
                  onHideModal()

                }}>Close Modal</Button>

                <Button variant="contained" onClick={() => {
                    console.log(JSON.stringify(questions, null, 2));
                    console.log(JSON.stringify(essay, null, 2));
                    // createUjian()

                }}>Submit Data</Button>
              </div>
            </div>
          </Box>
      </Modal>

      <TableContainer sx={{marginTop: 10}} component={Paper} ref={tableRef}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Kelas ID</TableCell>
                <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Type Ujian</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Tanggal</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Nama Pelajaran</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Jam Mulai</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Total Soal</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Dibuat Pada</TableCell>
                <TableCell align="left"style={{
                fontWeight: "bold"
              }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {useUjian.getState().ujian.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left" >{row.kelas_id}</TableCell>
                  <TableCell align="left">{row.nama_ujian}</TableCell>
                  <TableCell align="left">{row.tanggal}</TableCell>
                  <TableCell align="left">{row.nama ?? "Kosong"}</TableCell>
                  <TableCell align="left">{row.jam_mulai}</TableCell>
                  <TableCell align="left">{row.total_soal}</TableCell>
                  <TableCell align="left">{row.createdAt}</TableCell>
                  <TableCell align="left">
                    <Button
                      className="btn_absen"
                      sx={{
                        marginTop: 1,
                      }}
                   
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          
            </TableBody>
          </Table>
        </TableContainer>

    </>
  )
}
