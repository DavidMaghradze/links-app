import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Auth.css";

export const Auth = () => {
  const auth = useContext(AuthContext);
  const { loading, error, request, clearError } = useHttp();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
      setMessage(error);
      clearError();
    }
  }, [error, clearError]);

  const changeHandler = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <>
      <Typography variant="h1" component="h1" align="center" color="primary">
        Manage Links
      </Typography>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          variant="elevation"
          aria-describedby="client-snackbar"
          onClose={() => setSnackbarOpen(false)}
          message={message}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => setSnackbarOpen(false)}
            >
              <CloseIcon className="close" />
            </IconButton>
          ]}
        ></SnackbarContent>
      </Snackbar>
      <Card className="auth-card">
        <header>
          <h2>Authorization</h2>
        </header>
        <form className="auth-form">
          <section className="auth-formfields">
            <div className="auth-formfield">
              <TextField
                label="Email"
                name="email"
                type="text"
                onChange={changeHandler}
              />
            </div>
            <div className="auth-formfield">
              <TextField
                label="Password"
                name="password"
                type="password"
                onChange={changeHandler}
              />
            </div>
          </section>
          <footer>
            <Button
              variant="contained"
              disabled={loading}
              onClick={loginHandler}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={registerHandler}
              disabled={loading}
            >
              Register account
            </Button>
          </footer>
        </form>
      </Card>
    </>
  );
};
