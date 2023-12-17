import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
const drawerWidth = 240;
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Absensi from "../pages/Absensi";
import Guru from "../pages/Guru";
import Home from "../pages/Home";
import imgIcon from "../assets/icon.jpg";
import Mapel from "../pages/Mapel";
import axiosNew from "./AxiosConfig";
import { AccountBox, Book, Event, House, Logout, PermIdentity, School, Star } from "@mui/icons-material";
import Users from "../pages/Users";
import Nilai from "../pages/Nilai";
import { useLocation } from 'react-router-dom'
import Profile from "./Profile";
import Ujian from "../pages/Ujian";



function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [changeNav, setChangeNav] = useState(0);
  const [changeMenuName, setChangeMenuName] = useState('');
  const location = useLocation();
  const [roleId, setRoleId] = useState()
  const [menu, setMenu] = useState([])


  const fetchRole = async (id) => {
    await axiosNew.get(`/role/${id}`).then((data) => {
      console.log(data.data.data)
      setMenu(data.data.data)

    })
  }

  useEffect(() => {
    async function fetchDataRefresh() {
      if (
        token === null || token === undefined
      ) {
        navigate("/sign-in");
        localStorage.removeItem("token");
      } else {
        await axiosNew
          .get("/refresh-token", {
            headers: {
              "x-access-token": token,
            },
          })
          .then((res) => {
            console.log(res.data.data.role)
            if (res.status === 200) {
              setData(res.data.data);
              fetchRole(res.data.data.role)
            }
          }).catch((err) => {
            if (err.response.status === 400) {
              navigate("/sign-in");
              localStorage.removeItem("token");
            }
          });
      }
    }
    // fromPath()
    fetchDataRefresh();
  }, [location]);



  function onChangeNav(id, route) {
    setChangeNav(id);
    setChangeMenuName(route)
    navigate(route)
    // if (id === 2) {
    //   navigate("/guru")
    // } else if (id === 1) {
    //   navigate("/")
    // } else if (id === 3) {
    //   navigate("/absensi")
    // } else if (id === 4) {
    //   navigate("/mapel")
    // } else if (id === 5) {
    //   navigate("/users")
    // } else if (id === 6) {
    //   navigate("/nilai")
    // } else if (id === 7) {
    //   navigate("/ujian")
    // } else if (id === 8) {
    //   navigate('/sign-in', { replace: true })
    //   localStorage.removeItem("token");
    // }
  }

  function fromPath(route, id) {
    if (location.pathname === route) {
      setChangeNav(id)
    }
  }

  function iconByName(name) {
    if (name === "Guru") {
      return <AccountBox className="h-5 w-5" />
    } else if (name === "Absensi") {
      return <Book className="h-5 w-5" />
    } else if (name === "Ujian") {
      return <School className="h-5 w-5" />
    } else if (name === "Nilai") {
      return <School className="h-5 w-5" />
    } else if (name === "Users") {
      return <Star className="h-5 w-5" />
    } else if (name === "Mapel") {
      return <AccountBox className="h-5 w-5" />
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <p style={{
        textAlign: "center", color: "white",
        marginTop: 40, fontSize: 42
      }}>INISS</p>
      <p style={{
        textAlign: "center", color: "white",
        fontSize: 8
      }}>
        (Intelligentsia Nurul Ilmi Secondary School)
      </p>
      <List
        sx={{
          marginTop: 10,
        }}
      >
        {menu.map((text, index) => (
          <div key={text.id} className="last:mb-0 mb-2">
            <div
              className={`flex items-center p-2 cursor-pointer ${changeNav - 1 === index ? 'bg-white text-black' : 'text-white'}`}
              onClick={() => onChangeNav(text.id, text.url_path)}
            >
              <div className={`flex-shrink-0 ${changeNav - 1 === index ? 'text-black' : 'text-white'}`}>
                {iconByName(text.menu_name)}

              </div>
              <span className="ml-3">{text.menu_name}</span>
            </div>
            {index < menu.length - 1 && <hr className="border-t border-gray-200" />}
          </div>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          boxShadow: "0 4px 5px -6px #222",
          backgroundColor: "#FFFFFF",
          color: "black",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              style={{
                fontSize: 20,
              }}
            >
              Dashboard
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  marginRight: 10,
                }}
              >
                {data.nama}
              </span>
              <Profile />
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,

              backgroundColor: "#233044"
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#233044",
              color: "white",
            },
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          backgroundColor: "#F4F6F9",
          flexGrow: 1,
          height: "100vh",
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {location.pathname === "/" ? <Home /> : null}
        {location.pathname === "/guru" ? <Guru /> : null}
        {location.pathname === "/absensi" ? <Absensi /> : null}
        {location.pathname === "/mapel" ? <Mapel /> : null}
        {location.pathname === "/users" ? <Users /> : null}
        {location.pathname === "/nilai" ? <Nilai /> : null}
        {location.pathname === "/ujian" ? <Ujian /> : null}


      </Box>
    </Box>

  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
