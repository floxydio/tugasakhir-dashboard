import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
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
import cryptoJS from "crypto-js";
import imgIcon from "../assets/icon.jpg";
import Mapel from "../pages/Mapel";
import axiosNew from "./AxiosConfig";
import { AccountBox, Book, Event, House, PermIdentity } from "@mui/icons-material";
import Users from "../pages/Users";

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [changeNav, setChangeNav] = React.useState(1);

  React.useEffect(() => {
    async function fetchDataRefresh() {
      const decrypt = cryptoJS.AES.decrypt(
        token,
        `${import.meta.env.VITE_KEY_ENCRYPT}`
      );

      if (
        decrypt.toString(cryptoJS.enc.Utf8) === undefined ||
        decrypt.toString(cryptoJS.enc.Utf8) === null
      ) {
        navigate("/sign-in");
        localStorage.removeItem("token");
      } else {
        await axiosNew
          .get("/refresh-token", {
            headers: {
              "x-access-token": decrypt.toString(cryptoJS.enc.Utf8),
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setData(res.data.data);
            } else {
              navigate("/sign-in");
              localStorage.removeItem("token");
            }
          });
      }
    }
    fetchDataRefresh();
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  let menu = [
    {
      id: 1,
      name: "Home",
      url: "/",
    },
    {
      id: 2,
      name: "Guru",
      url: "/guru",
    },
    {
      id: 3,
      name: "Absensi",
      url: "/absensi",
    },
    {
      id: 4,
      name: "Mapel",
      url: "/mapel",
    },
    {
      id: 5,
      name: "Users",
      url: "/users",
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <img
        src={imgIcon}
        width={80}
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      /> */}
      <p style={{ textAlign: "center" }}>INISS</p>

      <List
        sx={{
          marginTop: 10,
        }}
      >
        {menu.map((text, index) => (
          <ListItem
            key={text.id}
            sx={{
              backgroundColor: changeNav - 1 === index ? "white" : null,
              color: changeNav - 1 === index ? "black" : "white",
            }}
            onClick={() => setChangeNav(text.id)}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon
                sx={{
                  color: changeNav - 1 === index ? "black" : "white",
                }}
              >
                {index == 0 ? <House /> : null}
                {index == 1 ? <PermIdentity /> : null}
                {index == 2 ? <Event /> : null}
                {index == 3 ? <Book /> : null}
                {index == 4 ? <AccountBox /> : null}
              </ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
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
              Dashboard - Intelligentsia Nurul Ilmi Secondary School
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
              <Avatar
                onClick={() => logout()}
                alt="Remy Sharp"
                src="https://randomuser.me/api/portraits/men/94.jpg"
              />
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
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#000000",
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
        {changeNav == 1 ? <Home /> : null}
        {changeNav == 2 ? <Guru /> : null}
        {changeNav == 3 ? <Absensi /> : null}
        {changeNav == 4 ? <Mapel /> : null}

        {changeNav == 5 ? <Users /> : null}
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
