import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import cryptoJS from "crypto-js";

export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function fetchSignInData() {
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
          let encrpyt = cryptoJS.AES.encrypt(
            res.data.accessToken,
            `${import.meta.env.VITE_KEY_ENCRYPT}`
          );
          console.log(res.data.accessToken);
          localStorage.setItem("token", encrpyt);
          navigate("/");
          // Example -> Decrypt
          // var decrypted = cryptoJS.AES.decrypt(
          //   encrypted,
          //   `${proces.env.KEY_ENCRYPT}`
          // );
          // console.log(decrypted.toString(cryptoJS.enc.Utf8));
        }
      });
  }

  return (
    <>
      <Container
        maxWidth="sm"
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          position: "absolute",
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
