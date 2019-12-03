import React, { useState } from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Redirect, Link } from "@reach/router";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    width: 300,
    margin: "auto"
  },
  layout: {
    marginTop: 40,
    width: "100%",
    height: "100%"
  },
  input: {
    marginBottom: 20
  },
  btn: {
    width: "auto"
  },
  error: {
    color: "red",
    fontSize: 16,
    margin: "10px auto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  }
}));

const Login = ({ user, userError, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login(email, password);
  };

  const classes = useStyles();
  if (user) {
    if (user.type === "admin") {
      return <Redirect to="/admin" noThrow />;
    } else {
      return <Redirect to="/card" noThrow />;
    }
  } else {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <h2>Login</h2>
          <TextField
            value={email}
            onChange={e => setEmail(e.target.value)}
            label="Email"
          />
          <TextField
            onChange={e => setPassword(e.target.value)}
            value={password}
            label="Password"
            type="password"
          />
          <Button className={classes.btn} onClick={handleLogin}>
            Login
          </Button>
          {userError && <div className={classes.error}>{userError}</div>}
          <Link className={classes.link} to="/register">
            <span>New User?</span>
          </Link>
        </Paper>
      </div>
    );
  }
};
export default Login;
