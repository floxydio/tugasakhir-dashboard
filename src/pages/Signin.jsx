import { Button, Container, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import cryptoJS from "crypto-js";
import axiosNew from "../components/AxiosConfig";
import Avatar from "@mui/material/Avatar";
import iconIniss from "../assets/icon.jpg";
export default function Signin() {
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      fetchSignInData();
    }
  }

  function fetchSignInData() {
    axiosNew
      .post(
        "/sign-in",
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
          localStorage.setItem("token", encrpyt);
          navigate("/");
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
        <Avatar
          src={iconIniss}
          sx={{ width: 250, height: 250, margin: "0 auto" }}
        />
        <Typography
          variant="h5"
          style={{
            textAlign: "center",
          }}
        >
          Login Area
        </Typography>
        <div
          onKeyDown={handleKeyPress}
          tabIndex={0}
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
            placeholder="Input Username anda..."
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            placeholder="Input Password anda..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => fetchSignInData()}
            variant="contained"
            style={{
              marginTop: "40px",
              height: 60,
            }}
          >
            Sign In
          </Button>
        </div>
      </Container>
    </>
  );
}
