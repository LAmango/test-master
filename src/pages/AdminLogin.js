import React, { useState } from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "@reach/router";

const useStyles = makeStyles({
  paper: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: "auto"
  },
  layout: {
    width: "100%",
    height: "100%"
  },
  input: {
    marginBottom: 20
  }
});

const AdminLogin = ({ user, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  const classes = useStyles();
  if (user) {
    return <Redirect to="/card" noThrow />;
  } else {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            label="Password"
          />
          <Button onClick={handleLogin}>Login</Button>
        </Paper>
      </div>
    );
  }
};
export default AdminLogin;
