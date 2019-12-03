import React from "react";
import { Paper, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  paper: {
    padding: 15,
    margin: 10
  }
});

const Services = ({ services }) => {
  const classes = useStyles();

  const servicesList = services
    ? services.map(service => {
        return (
          <Paper key={service._id} className={classes.paper}>
            <h2>{service.title}</h2>
            <Divider />
            {service.description}
          </Paper>
        );
      })
    : null;
  return (
    <div>
      <h2>Services</h2>
      {servicesList}
    </div>
  );
};

export default Services;
