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
import Dashboard from "./components/Dashboard.jsx";

// const router = createBrowserRouter([
//   {
//     path: "/sign-in",
//     element: <Signin />,
//   },
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path:"/guru",
//     element: <Guru />,
//   },
//   {
//     path:"/absensi",
//     element: <Absensi />
//   },
//   {
//     path: "/mapel",
//     element: <Mapel/>
//   },
//   {
//     path: "/users",
//     element: <Users/>
//   },
//   {
//     path:"/nilai",
//     element: <Nilai/>
//   }

// ]);

// dashboard route
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
