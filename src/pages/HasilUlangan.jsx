import React, { useEffect, useState, useRef } from 'react'
import { FetchHasilUlangan } from '../repository/HasilUlangan_api'
import { Box, Button, Fade, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Modal, Select, Switch, TextField, Typography } from '@mui/material'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function HasilUlangan() {
    const tableRef = useRef(null);
    const [dataJawaban, setDataJawaban] = useState([])
    const [hideModalTrigger, setHideModalTrigger] = useState(false)


    const fetchDataHasilUlangan = async () => {
        setDataJawaban([])
        await FetchHasilUlangan().then(res => {
            setDataJawaban(res.data.data)
        }).catch(err => {
            console.log('error', err)
        })

    }
    useEffect(() => {
        fetchDataHasilUlangan()
    }, [])



    return (
        <>
            <TableContainer sx={{ marginTop: 3, display: 'block' }} component={Paper} ref={tableRef}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{
                                fontWeight: "bold"
                            }}>No</TableCell>
                            <TableCell align="left" style={{
                                fontWeight: "bold"
                            }}>Nama Siswa</TableCell>

                            <TableCell align="left" style={{
                                fontWeight: "bold"
                            }}>Mata Pelajaran</TableCell>
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
                        {dataJawaban.map((row, i) => (
                            <TableRow
                                key={i}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="left" >{row.siswa.nama}</TableCell>
                                <TableCell align="left">{row.ujian.pelajaran.nama}</TableCell>
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

        </>
    )
}
