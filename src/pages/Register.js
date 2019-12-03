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
  }
});

const Register = ({ signUpError, signUp, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Not a valid Email!");
    } else if (password !== password2) {
      setError("Passwords need to match!");
    } else {
      signUp(email, password);
    }
  };

  const classes = useStyles();
  if (user) {
    return <Redirect to="/card" noThrow />;
  } else {
    return (
      <div className={classes.layout}>
        <Paper className={classes.paper}>
          <h2>Register</h2>
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
          <TextField
            onChange={e => setPassword2(e.target.value)}
            value={password2}
            label="Password 2"
            type="password"
          />
          <Button className={classes.btn} onClick={handleSignUp}>
            Register
          </Button>
          {signUpError && <div className={classes.error}>{signUpError}</div>}
          {error && <div className={classes.error}>{error}</div>}
        </Paper>
      </div>
    );
  }
};
export default Register;
