import React, { useEffect, useState } from "react";
import cryptoJS from "crypto-js";
import axiosNew from "../../components/AxiosConfig";
import { useAdminGuru } from "../../store/admin/admin_guru.store";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function AdminGuru() {
  const dataGuru = useAdminGuru((state) => state);

  useEffect(() => {
    dataGuru.getGuru();
  }, []);

  return (
    <>
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
              console.log(data);
              return (
                <TableRow
                  key={data.guru_id}
                  sx={{
                    "&:last-child td, &:lastchild th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {data.guru_id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.nama}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.status_guru}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {data.user_agent}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
