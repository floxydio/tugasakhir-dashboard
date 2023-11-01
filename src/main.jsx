import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signin from "./pages/Signin.jsx";
import "./index.css";
import Guru from "./pages/Guru.jsx";
import Absensi from "./pages/Absensi.jsx";
import Mapel from "./pages/Mapel.jsx";
import Users from "./pages/Users.jsx";
import Nilai from "./pages/Nilai.jsx";
import Ujian from "./pages/Ujian.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "guru",
        element: <Guru />
      },{
        path: "mapel",
        element: <Mapel/>
      },
      {
        path: "absensi",
        element: <Absensi />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "nilai",
        element: <Nilai />
      }, {
        path: "ujian",
        element: <Ujian />
      }
    ]
  }, {
    path: "/sign-in",
    element: <Signin />
  }
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
