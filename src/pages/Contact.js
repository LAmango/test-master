import React from "react";
import { TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  paper: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    width: 350,
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
  success: {
    fontSize: 16,
    margin: "10px auto"
  },
});

const Contact = () => {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState("");
  const classes = useStyles();

  const handleSubmit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email is not valid!");
    } else if (message === "") {
      setError("Message cannot be empty!");
    } else {
      setError("");
      setEmail("");
      setMessage("");
      setSuccess("Thanks for the message!");
    }
  };
  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <h2>Info</h2>
        <div className={classes.group}>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <h2>Contact</h2>
        <TextField
          value={email}
          label="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          value={message}
          label="Message"
          onChange={e => setMessage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        {error && <div className={classes.error}>{error}</div>}
        {success && <div className={classes.success}>{success}</div>}
      </Paper>
    </div>
  );
};

export default Contact;
