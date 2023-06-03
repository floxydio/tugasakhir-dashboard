import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { Diversity3TwoTone, Person } from "@mui/icons-material";
import axios from "axios";

export default function Home() {
  const [murid, setMurid] = useState([]);
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    function getDataUser() {
      axios
        .get("http://103.174.115.58:3000/v1/list-users")
        .then(function (res) {
          setMurid(res.data.data);
        });
    }
    function getGuru() {
      axios.get("http://103.174.115.58:3000/v1/guru").then(function (res) {
        setGuru(res.data.data);
        setLoading(false);
      });
    }
    getDataUser();
    getGuru();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card sx={{ maxWidth: 300 }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Diversity3TwoTone
                sx={{
                  fontSize: 40,

                  marginRight: 10,
                }}
              />
              <div>
                <span>{murid.length}</span>
                <Typography variant="body2" color="text.secondary">
                  Total Murid
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card sx={{ maxWidth: 300, marginLeft: 5 }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 10,
                marginRight: 10,
              }}
            >
              <Diversity3TwoTone
                sx={{
                  fontSize: 40,
                  marginRight: 10,
                }}
              />
              <div>
                <span>{guru.length}</span>
                <Typography variant="body2" color="text.secondary">
                  Total Guru
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
