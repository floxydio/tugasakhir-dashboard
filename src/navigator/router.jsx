import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Guru from "../pages/Guru";
import Absensi from "../pages/Absensi.jsx";
import Mapel from "../pages/Mapel.jsx";
import Users from "../pages/Users.jsx";
import Nilai from "../pages/Nilai.jsx";
import Ujian from "../pages/Ujian.jsx";
import SignUp from "../pages/SignUp.jsx";
import Signin from "../pages/Signin.jsx";
import ErrorNotFound from "../pages/ErrorNotFound.jsx";
import axiosNew from "../components/AxiosConfig.jsx";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "guru",
        element: <Guru />
      }, {
        path: "mapel",
        element: <Mapel />
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
  }, {
    path: "/sign-up",
    element: <SignUp />
  }, {
    path: "*",
    element: <ErrorNotFound />
  }
])
