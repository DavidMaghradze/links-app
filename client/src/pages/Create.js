import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  card: {
    marginTop: 100
  },

  form: {
    marginTop: 20
  }
});

export const Create = () => {
  const classes = useStyles();

  const auth = useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();
  const [link, setLink] = useState("");

  const pressHandler = async event => {
    if (event.key === "Enter") {
      try {
        console.log(auth);
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link
          },
          {
            Authorization: `Bearer ${auth.token}`
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };

  return (
    <Container fixed>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h3" component="h3">
            Create Link
          </Typography>
          <div className={classes.form}>
            <TextField
              id="filled-basic"
              label="Filled"
              variant="filled"
              type="text"
              value={link}
              onChange={e => setLink(e.target.value)}
              onKeyPress={pressHandler}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};
