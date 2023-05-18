import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function fetchSignInData() {
    console.log(username);
    axios
      .post(
        "http://103.174.115.58:3000/v1/sign-in",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/");
          localStorage.setItem("token", res.data.accessToken);
        }
      });
  }
  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          height: "100vh",
        }}
      >
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
          }}
        >
          Sign In Your Account
        </Typography>
        <div
          className="input__form"
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => fetchSignInData()}
            variant="contained"
            style={{
              marginTop: "40px",
            }}
          >
            Sign In
          </Button>
        </div>
      </Container>
    </>
  );
}
