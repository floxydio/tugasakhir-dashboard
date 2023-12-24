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
import { PhotoCamera } from '@mui/icons-material';
import { useMediaQuery } from 'react-responsive'
import { formatDate } from '../helper/DateConverter';


export default function Ujian() {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  const [keterangan, setKeterangan] = useState('')
  const [editKeterangan, setEditKeterangan] = useState('')


  // For Create
  const [showModal, setShowModal] = useState(false)
  const [typeUjian, setTypeUjian] = useState()
  const [durasi, setDurasi] = useState()
  const [jamMulai, setJamMulai] = useState()
  const [questions, setQuestions] = useState([]);
  const [addEssay, setAddEssay] = useState(false)
  const [essay, setEssay] = useState([])
  const [tanggal, setTanggal] = useState(new Date().toISOString())
  const [dataUjian, setDataUjian] = useState([])
  const [answerUser, setAnswerUser] = useState([])
  const [dataPelajaran, setDataPelajaran] = useState([])
  const [selectedPelajaran, setSelectedPelajaran] = useState()
  const tableRef = useRef(null);

  const [hideModalTrigger, setHideModalTrigger] = useState(false)
  const [modalRecreate, setModalRecreate] = useState(false)

  // For Edit
  const [showModalEdit, setShowModalEdit] = useState(false)
  const [editTypeUjian, setEditTypeUjian] = useState()
  const [editDurasi, setEditDurasi] = useState()
  const [editJamMulai, setEditJamMulai] = useState()
  const [editQuestions, setEditQuestions] = useState([]);
  const [editAddEssay, setEditAddEssay] = useState(false)
  const [editEssay, setEditEssay] = useState([])
  const [editDataUjian, setEditDataUjian] = useState([])
  const [editTanggal, setEditTanggal] = useState()
  const [editSelectedPelajaran, setEditSelectedPelajaran] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState()

  async function getEditUjian(id) {
    console.time("Fetch Get Edit Ujian")
    await axiosNew.get(`/ujian-detail/${id}`).then((res) => {
      setEditDataUjian(res.data)
      setEditQuestions(res.data.soal)
      setEditEssay(res.data.essay)

      console.log(`Data Soal -> ${JSON.parse(res.data.soal)}`)
      console.log(`Data Essay -> ${JSON.parse(res.data.essay)}`)
      console.timeEnd("Fetch Get Edit Ujian")
    }).catch((err) => {
      console.log(`Err when load ujian edit ${JSON.stringify(err)} `)
    })
  }


  const onHideModal = () => {
    setShowModal(false)
  }

  const onHideModalEdit = () => {
    setShowModalEdit(false)
    setIsEdit(false)
  }

  async function getUjian() {
    setAnswerUser([])
    await axiosNew.get("/all-ujian", {
    }).then((res) => {
      setDataUjian(res.data.data)
      setHideModalTrigger(false)
    }).catch((err) => {
      console.log(`Err when load ujian: ${err} `)
    })
  }

  async function getPelajaran() {
    setDataPelajaran([])
    await axiosNew.get("/pelajaran").then((res) => {
      console.log("Response Pelajaran -> ", res.data.data)
      setDataPelajaran(res.data.data)
    }).catch((err) => {
      console.log(`Err when load pelajaran: ${err} `)
    })
  }

  const handleFileChange = (file, qIndex, cIndex) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(`Reader Result -> ${reader.result}`)
    reader.onloadend = () => {
      const updatedQuestions = [...questions];
      updatedQuestions[qIndex].pilihan[cIndex]['isi_plihan[' + cIndex + ']'] = reader.result;
      setQuestions(updatedQuestions);
    };
  };

  const handleFileChangeEdit = (file, qIndex, cIndex) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(`Reader Result -> ${reader.result}`)
    reader.onloadend = () => {
      const updatedQuestions = [...editQuestions];

      updatedQuestions[qIndex].pilihan[cIndex][1] = reader.result;
      setQuestions(updatedQuestions);
    };
  };

  async function onClickJawabanSiswa() {
    setDataUjian([])
    await axiosNew.get("/all-exam", {}).then((res) => {
      setAnswerUser(res.data.data)
      setHideModalTrigger(true)
      console.log("Data Jawaban Siswa ->", res.data.data)
    })
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
    if (savedQuestions || savedEssay) {
      if (import.meta.env.VITE_SERVER_TYPE !== "dev") {
        toast.info("Data Ujian belum disubmit, silahkan submit!")
      }
    }
    getUjian()
  }, []);


  useEffect(() => {
    if (!isEdit) {
      localStorage.setItem('questions', JSON.stringify(questions));
      localStorage.setItem('essay', JSON.stringify(essay));
    }
  }, [questions, essay]);

  async function createUjian() {
    console.log(questions)
    await axiosNew.post("/create-ujian", {
      nama_ujian: typeUjian,
      mapel: selectedPelajaran ?? dataPelajaran[0]?.pelajaran_id,
      jam: jamMulai,
      durasi: durasi,
      kelas_id: 1,
      tanggal: new Date(tanggal).toISOString(),
      total_soal: questions.length + essay.length,
      keterangan: keterangan,
      soal: questions,
      essay: essay,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      if (res.status === 200 || res.status === 201) {
        toast.success("Berhasil Membuat Ujian")
        localStorage.removeItem('questions');
        localStorage.removeItem('essay');
        getUjian()
        setShowModal(false)
      } else {
        console.log(res)
      }
    }).catch((err) => {
      console.log(err)
      // toast.error(err.response.data.message)
    })
  }

  async function editUjian(id) {
    await axiosNew.put(`/edit-ujian/${id}`, {
      nama_ujian: editTypeUjian,
      mapel: editSelectedPelajaran,
      jam: editJamMulai,
      durasi: editDurasi,
      total_soal: editQuestions.length + editEssay.length,
      soal: editQuestions,
      essay: editEssay,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      console.log("Sukses Edit Ujian")
      getUjian()
      toast.success("Berhasil Edit Ujian")

    }).catch((err) => {
      console.error("Gagal Edit Ujian")
      toast.error("Gagal Edit Ujian")
    })
  }

  async function recreateEditUjian() {
    await axiosNew.post(`/create-ujian`, {
      nama_ujian: editTypeUjian,
      mapel: editSelectedPelajaran,
      jam: editJamMulai,
      durasi: editDurasi,
      total_soal: editQuestions.length + editEssay.length,
      soal: editQuestions,
      tanggal: new Date(editTanggal).toISOString(),
      essay: editEssay,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      getUjian()
      toast.success("Berhasil Buat Ulang Ujian")

    }).catch((err) => {
      console.error("Gagal Edit Ujian")
      toast.error("Gagal Buat Ulang Ujian")
    })
  }

  const [choiceInputType, setChoiceInputType] = useState({});

  const toggleChoiceInputType = (questionIndex, choiceIndex) => {
    const newChoiceInputType = { ...choiceInputType };
    const key = `${questionIndex}-${choiceIndex}`;
    newChoiceInputType[key] = newChoiceInputType[key] === 'image' ? 'text' : 'image';
    setChoiceInputType(newChoiceInputType);
  };



  return (
    <>
      <ToastContainer />
      <div className='flex flex-col lg:flex-row' style={{
      }}>
        <Button variant='contained' onClick={async () => {
          await getPelajaran()
          setShowModal(true)
        }}>Buat Ujian</Button>
        <Button style={{
          marginRight: isDesktopOrLaptop ? 10 : 0,
          marginBottom: isDesktopOrLaptop ? 0 : 20,
          marginTop: isDesktopOrLaptop ? 0 : 20,
          marginLeft: isDesktopOrLaptop ? 10 : 0,
        }} variant='contained' onClick={() => getUjian()}>Cek Soal</Button>
        <Button className='lg:ml-2' variant='contained' onClick={() => onClickJawabanSiswa()}>Cek Jawaban Siswa</Button>
      </div>

      {/* Modal untuk buat ujian */}

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
                value={typeUjian ?? "Ujian Tengah Semester"}
                defaultValue={"Ujian Tengah Semester"}
                label="Jenis Ujian"
                onChange={(e) => setTypeUjian(e.target.value)}
              >
                <MenuItem value={"Ujian Tengah Semester"}>Ujian Tengah Semester</MenuItem>
                <MenuItem value={"Ujian Akhir Semester"}>Ujian Akhir Semester</MenuItem>
                <MenuItem value={"Ulangan Harian"}>Ulangan Harian</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}>
              <InputLabel id="demo-simple-select-label">Durasi Ujian</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={durasi ?? 15}
                label="Durasi Ujian"
                defaultValue={15}
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
                value={jamMulai ?? 7}
                label="Durasi Ujian"
                defaultValue={7}
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
              <InputLabel id="demo-simple-select-label">Mata Pelajaran</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedPelajaran ?? dataPelajaran[0]?.pelajaran_id}
                label="Mata Pelajaran"
                defaultValue={dataPelajaran[0]?.pelajaran_id}
                onChange={(e) => {
                  setSelectedPelajaran(e.target.value)
                }}
              >f
                {dataPelajaran.map((pelajaran, i) => (
                  <MenuItem key={i} value={pelajaran.pelajaran_id}>{pelajaran.nama}</MenuItem>
                ))}

              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >

              <TextField id="outlined-basic" label="Keterangan" variant="outlined" onChange={(e) => setKeterangan(e.target.value)} />
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <TextField id="outlined" variant='outlined' type='date' onChange={(e) => setTanggal(e.target.value)} />
            </FormControl>

            <div style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "100%",
              height: "1px",
              backgroundColor: "black",
            }}></div>

            <p style={{
              marginBottom: 30
            }}>Soal Ujian Input</p>
            {questions.length === 0 && <Button
              onClick={() => {
                setQuestions([...questions, {
                  id_soal: 1,
                  soal: '',
                  pilihan: Array(5).fill({}).map((_, i) => ({
                    ['jenis_pilihan[' + i + ']']: String.fromCharCode(65 + i),
                    ['isi_plihan[' + i + ']']: ''
                  })),
                  jawaban: ''
                }]);
              }}
            >
              Tambah Soal Pilihan Ganda
            </Button>}
            {questions.map((question, qIndex) => (
              <div key={qIndex}>
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%"
                    }}
                    defaultValue={question.soal || ''}
                    label={`Soal No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      questions[qIndex].soal = e.target.value;
                      // Handle text change
                    }}
                  />
                </FormControl>
                {['A', 'B', 'C', 'D', 'E'].map((choiceLabel, cIndex) => {
                  const inputTypeKey = `${qIndex}-${cIndex}`;
                  const isImageInput = choiceInputType[inputTypeKey] === 'image';
                  return (
                    <div key={cIndex}>

                      <Button sx={{
                        display: "block",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginLeft: "auto",
                      }} variant='contained' onClick={() => toggleChoiceInputType(qIndex, cIndex)}>
                        {isImageInput ? <PhotoCamera sx={{
                          marginTop: "10px"
                        }} /> : <span>Switch</span>}
                      </Button>
                      {isImageInput ? (
                        <>
                          <img src={question.pilihan[cIndex]['isi_plihan[' + cIndex + ']']} alt="" height={100} className='img_soal' style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                          }} />
                          <InputLabel id="demo-simple-select-label">{
                            `Pilihan ${choiceLabel}`
                          }</InputLabel>
                          <TextField
                            type="file"

                            variant="outlined"
                            sx={{
                              width: "100%"
                            }}
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files[0], qIndex, cIndex)}

                          />
                        </>
                      ) : (
                        <>

                          <TextField
                            sx={{
                              width: "100%"
                            }}
                            defaultValue={question.pilihan[cIndex]['isi_plihan[' + cIndex + ']'] || ''}
                            label={`Pilihan ${choiceLabel}`}

                            variant="outlined"
                            onChange={(e) => {
                              // Handle text change
                              const updatedQuestions = [...questions];
                              updatedQuestions[qIndex].pilihan[cIndex]['isi_plihan[' + cIndex + ']'] = e.target.value;
                              setQuestions(updatedQuestions);
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    defaultValue={question.jawaban || ''}
                    label={`Jawaban No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      questions[qIndex].jawaban = e.target.value;
                      // Handle text change
                    }}
                  />
                </FormControl>
              </div>
            ))}
            <Button
              style={{ marginTop: "20px" }}
              variant='contained'
              onClick={() => {
                if (questions[questions.length - 1].soal === '') {
                  toast.error("Soal tidak boleh kosong!")
                  return
                } else if (questions[questions.length - 1].jawaban === '') {
                  toast.error("Jawaban tidak boleh kosong!")
                  return
                } else {
                  console.log(questions)
                  setQuestions([...questions, {
                    id_soal: questions.length + 1 ?? 1,
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
            {questions.length > 1 && <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              color='error'
              onClick={() => {
                setQuestions([...questions].slice(0, questions.length - 1));
              }}
            >
              Hapus 1 Soal Pilihan Ganda
            </Button>}

            <FormControlLabel sx={{ marginTop: "40px", marginBottom: "40px" }} control={<Switch checked={addEssay} onChange={() => {
              setAddEssay(!addEssay)
            }} />} label="Tambahkan Essay" />

            {addEssay && <>
              {essay.map((s, eIndex) => (
                <>
                  <div style={{}} key={eIndex}>
                    <p>Soal Essay ke {eIndex + 1}</p>
                    <FormControl fullWidth>
                      <TextField
                        defaultValue={essay[eIndex].soal || ''}
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
                        defaultValue={essay[eIndex].jawaban || ''}
                        label="Jawaban Essay" onChange={e => {
                          const updatedEssay = [...essay];
                          updatedEssay[eIndex].jawaban = e.target.value;
                          setEssay(updatedEssay);
                        }} variant='outlined' sx={{ marginTop: "15px" }} />
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
                // console.log(JSON.stringify(essay, null, 2));
                if (tanggal === undefined || tanggal === null) {
                  toast.error('Pilih tanggal ujian terlebih dahulu')
                } else {
                  createUjian()

                }

              }}>Submit Data</Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* End */}

      {/* Modal untuk buat ulang */}
      <Modal
        disablePortal
        open={modalRecreate}
        onClose={() => setModalRecreate(false)}
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
              Buat Ulang Ujian
            </Typography>
            <FormControl fullWidth style={{
              marginTop: "50px"
            }}>
              <InputLabel id="demo-simple-select-label">Jenis Ujian</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editTypeUjian}
                defaultValue={editTypeUjian}
                label="Jenis Ujian"
                onChange={(e) => setEditTypeUjian(e.target.value)}
              >
                <MenuItem value={"Ujian Tengah Semester"}>Ujian Tengah Semester</MenuItem>
                <MenuItem value={"Ujian Akhir Semester"}>Ujian Akhir Semester</MenuItem>
                <MenuItem value={"Ulangan Harian"}>Ulangan Harian</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}>
              <InputLabel id="demo-simple-select-label">Durasi Ujian</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editDurasi}
                label="Durasi Ujian"
                defaultValue={editDurasi}
                onChange={(e) => setEditDurasi(e.target.value)}
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
                value={editJamMulai}
                label="Durasi Ujian"
                onChange={(e) => setEditJamMulai(e.target.value)}
              >
                <MenuItem value={"07"}>07.00</MenuItem>
                <MenuItem value={"08"}>08.00</MenuItem>
                <MenuItem value={"09"}>09.00</MenuItem>
                <MenuItem value={"10"}>10.00</MenuItem>
                <MenuItem value={"11"}>11.00</MenuItem>
                <MenuItem value={"11"}>12.00</MenuItem>
                <MenuItem value={"13"}>13.00</MenuItem>
                <MenuItem value={"14"}>14.00</MenuItem>
                <MenuItem value={"15"}>15.00</MenuItem>
                <MenuItem value={"16"}>16.00</MenuItem>
                <MenuItem value={"17"}>17.00</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <InputLabel id="demo-simple-select-label">Mata Pelajaran</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editSelectedPelajaran}
                label="Mata Pelajaran"
                onChange={(e) => {
                  setEditSelectedPelajaran(e.target.value)
                }}
              >
                {dataPelajaran.map((pelajaran, i) => (
                  <MenuItem key={i} value={pelajaran.pelajaran_id}>{pelajaran.nama}</MenuItem>
                ))}

              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <TextField id="outlined-basic" label="Keterangan" variant="outlined" onChange={(e) => setEditKeterangan(e.target.value)} />
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <TextField id="outlined" value={editTanggal} variant='outlined' type='date' onChange={(e) => setEditTanggal(e.target.value)} />
            </FormControl>

            <div style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "100%",
              height: "1px",
              backgroundColor: "black",
            }}></div>

            <p style={{

              marginBottom: 30
            }}>Soal Ujian Input</p>
            {editQuestions.length === 0 && <Button
              onClick={() => {
                setEditQuestions([...editQuestions, {
                  id_soal: 1,
                  soal: '',
                  pilihan: Array(5).fill({}).map((_, i) => ({
                    ['jenis_pilihan[' + i + ']']: String.fromCharCode(65 + i),
                    ['isi_plihan[' + i + ']']: ''
                  })),
                  jawaban: ''
                }]);
              }}
            >
              Tambah Soal Pilihan Ganda
            </Button>}
            {editQuestions.map((question, qIndex) => (
              <div key={qIndex}>
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%"
                    }}
                    defaultValue={question.soal}
                    label={`Soal No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      editQuestions[qIndex].soal = e.target.value;
                      // Handle text change
                    }}
                  />
                </FormControl>


                {['A', 'B', 'C', 'D', 'E'].map((choiceLabel, cIndex) => {
                  const inputTypeKey = `${qIndex}-${cIndex}`;
                  const isImageInput = choiceInputType[inputTypeKey] === 'image';
                  return (
                    <div key={cIndex}>

                      <Button sx={{
                        display: "block",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginLeft: "auto",
                      }} variant='contained' onClick={() => {
                        toggleChoiceInputType(qIndex, cIndex)

                      }}>
                        {isImageInput ? <PhotoCamera sx={{
                          marginTop: "10px"
                        }} /> : <span>Switch</span>}
                      </Button>
                      {isImageInput ? (
                        <>
                          {/* console.log(editQuestions[qIndex].pilihan[1][1]) */}

                          <img src={editQuestions.pilihan[cIndex][1]} alt="" height={100} className='img_soal' style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                          }} />
                          <InputLabel id="demo-simple-select-label">{
                            `Pilihan ${choiceLabel}`
                          }</InputLabel>
                          <TextField
                            type="file"
                            variant="outlined"
                            sx={{
                              width: "100%"
                            }}
                            accept="image/*"
                            onChange={(e) => handleFileChangeEdit(e.target.files[0], qIndex, cIndex)}

                          />
                        </>
                      ) : (
                        <>

                          <TextField
                            sx={{
                              width: "100%"
                            }}
                            label={`Pilihan ${choiceLabel}`}
                            variant="outlined"
                            // defaultValue={
                            //   editQuestions.pilihan[cIndex][1].toString().includes("data:image") ? "" : editQuestions.pilihan[cIndex][1].toString() ?? ''
                            // }
                            onChange={(e) => {
                              // const updatedQuestions = [...editQuestions];
                              // updatedQuestions[qIndex].pilihan[cIndex]['isi_plihan[' + cIndex + ']'] = e.target.value;
                              // setQuestions(updatedQuestions);
                              editQuestions.pilihan[cIndex][1] = e.target.value
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    value={
                      editQuestions?.jawaban ?? ''
                    }
                    label={`Jawaban No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      const updatedQuestions = [...editQuestions];
                      updatedQuestions[qIndex].jawaban = e.target.value;
                      setQuestions(updatedQuestions);
                      // Handle text change
                    }}
                  />
                </FormControl>
              </div>
            ))}

            <Button
              style={{ marginTop: "20px" }}
              variant='contained'
              onClick={() => {
                if (editQuestions[editQuestions.length - 1].soal === '') {
                  toast.error("Soal tidak boleh kosong!")
                  return
                } else if (editQuestions[editQuestions.length - 1].jawaban === '') {
                  toast.error("Jawaban tidak boleh kosong!")
                  return
                } else {
                  console.log(editQuestions)
                  setEditQuestions([...editQuestions, {
                    id_soal: editQuestions.length + 1 ?? 1,
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
            {editQuestions.length > 1 && <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              color='error'
              onClick={() => {
                setEditQuestions([...editQuestions].slice(0, editQuestions.length - 1));
              }}
            >
              Hapus 1 Soal Pilihan Ganda
            </Button>}


            <FormControlLabel sx={{ marginTop: "40px", marginBottom: "40px" }} control={<Switch checked={editAddEssay} onChange={() => {
              setEditAddEssay(!editAddEssay)
            }} />} label="Tambahkan Essay" />

            {editAddEssay && <>
              {editEssay.map((s, eIndex) => (
                <>
                  <div style={{}} key={eIndex}>
                    <p>Soal Essay ke {eIndex + 1}</p>
                    <FormControl fullWidth>
                      <TextField
                        value={editEssay[eIndex].soal || ''}
                        label="Soal Essay"
                        variant="outlined"
                        sx={{ marginTop: "15px" }}
                        onChange={e => {
                          const updatedEssay = [...editEssay];
                          updatedEssay[eIndex].soal = e.target.value;
                          setEssay(updatedEssay);
                        }}
                      />
                      <TextField
                        value={editEssay[eIndex].jawaban || ''}
                        label="Jawaban Essay" onChange={e => {
                          const updatedEssay = [...editEssay];
                          updatedEssay[eIndex].jawaban = e.target.value;
                          setEssay(updatedEssay);
                        }} variant='outlined' sx={{ marginTop: "15px" }} />
                    </FormControl>
                  </div>
                </>
              ))}

              <Button
                style={{ marginTop: "20px" }}
                variant='contained'
                onClick={() => {
                  setEditEssay([...editEssay, {
                    id_soal: editEssay.length + 1,
                    soal: '',
                    jawaban: ''
                  }]);
                }}
              >
                Tambah Soal Essay
              </Button>
            </>}

            {editEssay.length > 1 && <Button
              style={{ marginTop: "20px" }}
              variant='contained'
              color='error'
              onClick={() => {
                setEditEssay([...editEssay].slice(0, essay.length - 1));
              }}
            >
              Hapus 1 Soal Essay
            </Button>}
            <Button variant="contained" onClick={async () => {
              // console.log(JSON.stringify(editQuestions, null, 2));
              await recreateEditUjian()

            }}>Submit Edit Data</Button>
          </div>
        </Box>
      </Modal>


      {/* End */}


      {/* Modal untuk Edit Ujian - Modal Edit */}

      <Modal
        disablePortal
        open={showModalEdit}
        onClose={onHideModalEdit}
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
                value={editTypeUjian}
                defaultValue={editTypeUjian}
                label="Jenis Ujian"
                onChange={(e) => setEditTypeUjian(e.target.value)}
              >
                <MenuItem value={"Ujian Tengah Semester"}>Ujian Tengah Semester</MenuItem>
                <MenuItem value={"Ujian Akhir Semester"}>Ujian Akhir Semester</MenuItem>
                <MenuItem value={"Ulangan Harian"}>Ulangan Harian</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}>
              <InputLabel id="demo-simple-select-label">Durasi Ujian</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editDurasi}
                label="Durasi Ujian"
                defaultValue={editDurasi}
                onChange={(e) => setEditDurasi(e.target.value)}
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
                value={editJamMulai}
                label="Durasi Ujian"
                onChange={(e) => setEditJamMulai(e.target.value)}
              >
                <MenuItem value={"07"}>07.00</MenuItem>
                <MenuItem value={"08"}>08.00</MenuItem>
                <MenuItem value={"09"}>09.00</MenuItem>
                <MenuItem value={"10"}>10.00</MenuItem>
                <MenuItem value={"11"}>11.00</MenuItem>
                <MenuItem value={"11"}>12.00</MenuItem>
                <MenuItem value={"13"}>13.00</MenuItem>
                <MenuItem value={"14"}>14.00</MenuItem>
                <MenuItem value={"15"}>15.00</MenuItem>
                <MenuItem value={"16"}>16.00</MenuItem>
                <MenuItem value={"17"}>17.00</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <InputLabel id="demo-simple-select-label">Mata Pelajaran</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={editSelectedPelajaran}
                label="Mata Pelajaran"
                onChange={(e) => {
                  setEditSelectedPelajaran(e.target.value)
                }}
              >
                {dataPelajaran.map((pelajaran, i) => (
                  <MenuItem key={i} value={pelajaran.pelajaran_id}>{pelajaran.nama}</MenuItem>
                ))}

              </Select>
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <TextField id="outlined-basic" label="Keterangan" variant="outlined" onChange={(e) => setEditKeterangan(e.target.value)} />
            </FormControl>

            <FormControl fullWidth style={{
              marginTop: "20px"
            }}
            >
              <TextField id="outlined" value={editTanggal} variant='outlined' type='date' />
            </FormControl>

            <div style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "100%",
              height: "1px",
              backgroundColor: "black",
            }}></div>

            <p style={{

              marginBottom: 30
            }}>Soal Ujian Input</p>
            {editQuestions.length === 0 && <Button
              onClick={() => {
                setEditQuestions([...editQuestions, {
                  id_soal: 1,
                  soal: '',
                  pilihan: Array(5).fill({}).map((_, i) => ({
                    ['jenis_pilihan[' + i + ']']: String.fromCharCode(65 + i),
                    ['isi_plihan[' + i + ']']: ''
                  })),
                  jawaban: ''
                }]);
              }}
            >
              Tambah Soal Pilihan Ganda
            </Button>}
            {editQuestions.map((question, qIndex) => (
              <div key={qIndex}>
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%"
                    }}
                    defaultValue={question.soal}
                    label={`Soal No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      editQuestions[qIndex].soal = e.target.value;
                      // Handle text change
                    }}
                  />
                </FormControl>


                {['A', 'B', 'C', 'D', 'E'].map((choiceLabel, cIndex) => {
                  const inputTypeKey = `${qIndex}-${cIndex}`;
                  const isImageInput = choiceInputType[inputTypeKey] === 'image';
                  return (
                    <div key={cIndex}>

                      <Button sx={{
                        display: "block",
                        marginBottom: "10px",
                        marginTop: "10px",
                        marginLeft: "auto",
                      }} variant='contained' onClick={() => {
                        toggleChoiceInputType(qIndex, cIndex)

                      }}>
                        {isImageInput ? <PhotoCamera sx={{
                          marginTop: "10px"
                        }} /> : <span>Switch</span>}
                      </Button>
                      {isImageInput ? (
                        <>
                          {/* console.log(editQuestions[qIndex].pilihan[1][1]) */}

                          <img src={question.pilihan[cIndex][1]} alt="" height={100} className='img_soal' style={{
                            marginTop: "20px",
                            marginBottom: "20px",
                          }} />
                          <InputLabel id="demo-simple-select-label">{
                            `Pilihan ${choiceLabel}`
                          }</InputLabel>
                          <TextField
                            type="file"
                            variant="outlined"
                            sx={{
                              width: "100%"
                            }}
                            accept="image/*"
                            onChange={(e) => handleFileChangeEdit(e.target.files[0], qIndex, cIndex)}

                          />
                        </>
                      ) : (
                        <>

                          <TextField
                            sx={{
                              width: "100%"
                            }}
                            label={`Pilihan ${choiceLabel}`}
                            variant="outlined"
                            // defaultValue={
                            //   question.pilihan[cIndex][1].toString().includes("data:image") ? "" : question.pilihan[cIndex][1].toString() ?? ''
                            // }
                            onChange={(e) => {
                              // const updatedQuestions = [...editQuestions];
                              // updatedQuestions[qIndex].pilihan[cIndex]['isi_plihan[' + cIndex + ']'] = e.target.value;
                              // setQuestions(updatedQuestions);
                              question.pilihan[cIndex][1] = e.target.value
                            }}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
                <FormControl fullWidth style={{}}>
                  <TextField
                    sx={{
                      width: "100%",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                    value={
                      question.jawaban ?? ''
                    }
                    label={`Jawaban No-${qIndex + 1}`}
                    variant="outlined"
                    onChange={(e) => {
                      const updatedQuestions = [...editQuestions];
                      updatedQuestions[qIndex].jawaban = e.target.value;
                      setQuestions(updatedQuestions);
                      // Handle text change
                    }}
                  />
                </FormControl>
              </div>
            ))}

            <Button
              style={{ marginTop: "20px" }}
              variant='contained'
              onClick={() => {
                if (editQuestions[editQuestions.length - 1].soal === '') {
                  toast.error("Soal tidak boleh kosong!")
                  return
                } else if (editQuestions[editQuestions.length - 1].jawaban === '') {
                  toast.error("Jawaban tidak boleh kosong!")
                  return
                } else {
                  console.log(editQuestions)
                  setEditQuestions([...editQuestions, {
                    id_soal: editQuestions.length + 1 ?? 1,
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
            {editQuestions.length > 1 && <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              color='error'
              onClick={() => {
                setEditQuestions([...editQuestions].slice(0, editQuestions.length - 1));
              }}
            >
              Hapus 1 Soal Pilihan Ganda
            </Button>}


            <FormControlLabel sx={{ marginTop: "40px", marginBottom: "40px" }} control={<Switch checked={editAddEssay} onChange={() => {
              setEditAddEssay(!editAddEssay)
            }} />} label="Tambahkan Essay" />

            {editAddEssay && <>
              {editEssay.map((s, eIndex) => (
                <>
                  <div style={{}} key={eIndex}>
                    <p>Soal Essay ke {eIndex + 1}</p>
                    <FormControl fullWidth>
                      <TextField
                        value={editEssay[eIndex].soal || ''}
                        label="Soal Essay"
                        variant="outlined"
                        sx={{ marginTop: "15px" }}
                        onChange={e => {
                          const updatedEssay = [...editEssay];
                          updatedEssay[eIndex].soal = e.target.value;
                          setEssay(updatedEssay);
                        }}
                      />
                      <TextField
                        value={editEssay[eIndex].jawaban || ''}
                        label="Jawaban Essay" onChange={e => {
                          const updatedEssay = [...editEssay];
                          updatedEssay[eIndex].jawaban = e.target.value;
                          setEssay(updatedEssay);
                        }} variant='outlined' sx={{ marginTop: "15px" }} />
                    </FormControl>
                  </div>
                </>
              ))}

              <Button
                style={{ marginTop: "20px" }}
                variant='contained'
                onClick={() => {
                  setEditEssay([...editEssay, {
                    id_soal: editEssay.length + 1,
                    soal: '',
                    jawaban: ''
                  }]);
                }}
              >
                Tambah Soal Essay
              </Button>
            </>}

            {editEssay.length > 1 && <Button
              style={{ marginTop: "20px" }}
              variant='contained'
              color='error'
              onClick={() => {
                setEditEssay([...editEssay].slice(0, essay.length - 1));
              }}
            >
              Hapus 1 Soal Essay
            </Button>}

            <Button variant="contained" onClick={async () => {
              // console.log(JSON.stringify(editQuestions, null, 2));
              await editUjian(editId)

            }}>Submit Edit Data</Button>
          </div>
        </Box>
      </Modal>

      <TableContainer sx={{ marginTop: 10, display: hideModalTrigger ? 'none' : 'block' }} component={Paper} ref={tableRef}>
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
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Tanggal</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Nama Pelajaran</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Jam Mulai</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Total Soal</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Dibuat Pada</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataUjian.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left" >{row.kelas_id}</TableCell>
                <TableCell align="left">{row.nama_ujian}</TableCell>
                <TableCell align="left">{new Date(row.tanggal).toLocaleDateString()}</TableCell>
                <TableCell align="left">{row.nama ?? "Kosong"}</TableCell>
                <TableCell align="left">{row.jam_mulai}</TableCell>
                <TableCell align="left">{row.total_soal}</TableCell>
                <TableCell align="left">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="left">
                  <Button
                    className="btn_absen"
                    sx={{
                      marginTop: 1,
                    }}
                    variant="contained"
                    onClick={async () => {
                      await getPelajaran()
                      getEditUjian(row.id)
                      setEditTypeUjian(row.nama_ujian)
                      setEditDurasi(row.durasi)
                      setEditJamMulai(row.jam_mulai.split("")[0] + row.jam_mulai.split("")[1])
                      setEditTanggal(formatDate(new Date(row.tanggal)))
                      setEditSelectedPelajaran(row.pelajaran_id)

                      setEditId(row.id)
                      setModalRecreate(true)
                    }}
                  >
                    Buat Ulang
                  </Button>
                  <Button
                    className="btn_absen"
                    sx={{
                      marginTop: 1,
                    }}
                    variant="contained"
                    onClick={async () => {
                      await getPelajaran()
                      getEditUjian(row.id)
                      setEditTypeUjian(row.nama_ujian)
                      setEditDurasi(row.durasi)
                      setEditJamMulai(row.jam_mulai.split("")[0] + row.jam_mulai.split("")[1])
                      setEditTanggal(formatDate(new Date(row.tanggal)))
                      setEditSelectedPelajaran(row.pelajaran_id)
                      setShowModalEdit(true)
                      setEditId(row.id)
                      setIsEdit(true)
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      {dataUjian.length === 0 && <TableContainer sx={{ marginTop: 10, display: hideModalTrigger ? 'block' : 'none' }} component={Paper} ref={tableRef}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>User Id</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Jawaban PG</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Jawaban Essay</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Ujian Id</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Total  Benar</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Total Salah</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Dibuat Pada</TableCell>
              <TableCell align="left" style={{
                fontWeight: "bold"
              }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answerUser.map((row, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left" >{row.user_id}</TableCell>
                <TableCell align="left">{JSON.parse(row.jawaban_pg)}</TableCell>
                <TableCell align="left">{JSON.parse(row.jawaban_essay)}</TableCell>
                <TableCell align="left">{row.ujian_id}</TableCell>
                <TableCell align="left">{row.total_benar}</TableCell>
                <TableCell align="left">{row.total_salah}</TableCell>
                <TableCell align="left">{new Date(row.submittedAt).toLocaleDateString()}</TableCell>
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
      }

    </>
  )
}
