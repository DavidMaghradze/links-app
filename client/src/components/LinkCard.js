import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    marginTop: 100
  },

  form: {
    marginTop: 20
  },

  links: {
    marginTop: 20,
    marginBottom: 20
  },

  linksItem: {
    marginBottom: 10
  },

  linksItemTitle: {
    marginRight: 8
  }
});

export const LinkCard = ({ link }) => {
  console.log(link);
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3" component="h3">
          Your Link
        </Typography>
        <List components="nav">
          <div className={classes.links}>
            <section className={classes.linksItem}>
              <strong className={classes.linksItemTitle}>Your link:</strong>
              <a href={link.to} target="_blank" rel="noopener noreferrer">
                {link.to}
              </a>
            </section>
            <section className={classes.linksItem}>
              <strong className={classes.linksItemTitle}>Source:</strong>
              <a href={link.from} target="_blank" rel="noopener noreferrer">
                {link.from}
              </a>
            </section>
            <section className={classes.linksItem}>
              <strong className={classes.linksItemTitle}>Clicks:</strong>
              {link.clicks}
            </section>
            <section className={classes.linksItem}>
              <strong className={classes.linksItemTitle}>Created at:</strong>
              {new Date(link.date).toLocaleDateString()}
            </section>
          </div>
        </List>
      </CardContent>
    </Card>
  );
};
