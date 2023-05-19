import React from "react";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader.js";

export default function App() {
  const override = (React.CSSProperties = {
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    position: "absolute",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    function checkLogin() {
      if (localStorage.getItem("token") === null) {
        setTimeout(() => {
          navigate("/sign-in");
          setLoading(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    checkLogin();
  }, [navigate]);
  return (
    <>
      {loading ? (
        <BeatLoader
          color="#274F99"
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Dashboard />
      )}
    </>
  );
}
