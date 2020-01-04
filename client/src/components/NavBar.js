import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./NavBar.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

  return (
    <header>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <ul className="navbar-menu">
            <li>
              <NavLink to="/create" className="navbar-menu-item">
                <Typography variant="h6" className={classes.title}>
                  Create
                </Typography>
              </NavLink>
            </li>
            <li>
              <NavLink to="/links" className="navbar-menu-item">
                <Typography variant="h6" className={classes.title}>
                  Links
                </Typography>
              </NavLink>
            </li>
          </ul>
          <Button variant="contained" color="secondary" onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};
