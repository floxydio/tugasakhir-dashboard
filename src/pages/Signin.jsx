import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function Signin() {
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
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button
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
