import { Button, Container, TextField, Typography } from "@mui/material";
import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import cryptoJS from "crypto-js";
import axiosNew from "../components/AxiosConfig";
import Avatar from "@mui/material/Avatar";
import iconIniss from "../assets/icon.jpg";
import imgIcon from "../assets/slide1.jpg";
import img2 from "../assets/slide2.jpg";
import img3 from "../assets/slide3.jpg";
import { useAuth } from "../store/auth.store";
export default function Signin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadImage, setLoadImage] = useState(imgIcon);

  function changeImageEvery3SecondsAndRepeat() {
    const images = [img2, img3];
    let i = 0;
    setInterval(() => {
      if (i === images.length) {
        i = 0;
      }
      setLoadImage(images[i]);
      i++;
    }, 8000);
      
  } 

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      useAuth.getState().signInFetch(username, password,navigate); 
    }
  }

  useEffect(() => {
    changeImageEvery3SecondsAndRepeat()
  }, []);

  return (
    <>
      <div>
      <img src={loadImage} style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        position: "absolute",
        zIndex: -1,
        top: 0,
        transition: "all 0.5s ease",
        filter: "grayscale(100%)" ,
        left: 0

      }} />
      <Container
        style={{
          transform: "translate(-50%, -50%)",
          top: "50%",
          width: "40%",
          left: "50%",
          position: "absolute",
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          opacity: 0.9,
          boxShadow: "0 0 10px rgba(0,0,0,0.3)"
           
        }}
      >
        <Avatar
          src={iconIniss}
          sx={{ width: 100, height: 100, margin: "0 auto" }}
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
            style={{
              marginTop: "10px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            placeholder="Input Password anda..."
            type="password"
            style={{
              marginTop: "10px",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",

            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={() => useAuth.getState().signInFetchAndNavigate(username, password,navigate)}
            variant="contained"
            style={{
              marginTop: "40px",
              backgroundColor: "#274F99",
              color: "#fff",
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              height: 60,
            }}
          >
            Sign In
          </Button>
        </div>
      </Container>
      </div>
    </>
  );
}
