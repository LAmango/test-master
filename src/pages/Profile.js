import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, Grid, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
  }
}));

const Profile = ({ user, update }) => {
  const [canEdit, setEdit] = React.useState(false);
  const [email, setEmail] = React.useState(user.email);
  const [college, setCollege] = React.useState(user.college);
  const classes = useStyles();

  const handleSave = () => {
    const newUser = {
      ...user,
      email: email,
      college: college
    };
    update(user._id, newUser);
    setEdit(false);
  };
  return (
    <div className={classes.layout}>
      <Paper className={classes.paper}>
        <TextField
          value={canEdit ? email : user.email}
          label="Email"
          disabled={!canEdit}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          value={canEdit ? college : user.college}
          label="College"
          disabled={!canEdit}
          onChange={e => setCollege(e.target.value)}
        />
        {canEdit ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={() => setEdit(true)}>Edit</Button>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
