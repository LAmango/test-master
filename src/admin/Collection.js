import React, { forwardRef } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: 15
  },
  title: {
    color: theme.palette.primary.main
  },
  paper: {
    padding: 15,
    margin: 20
  },
  list: {
    color: "black"
  },
  input: {
    marginBottom: 15
  },
  table: {
    margin: 20
  }
}));

const Collections = ({
  update,
  del,
  add,
  cardsetChosen,
  chosen,
  title,
  serializer
}) => {
  const classes = useStyles();
  console.log("COLLECTIONS REDRAWN", chosen);
  const collectionTitle = title
    ? title[0].toUpperCase() + title.slice(1)
    : null;

  const columns = serializer
    ? serializer.map(item => {
        return { title: item, field: item };
      })
    : null;

  const data = [];
  data.length = chosen ? Object.keys(chosen).length : 0;
  const iteration = serializer
    ? Object.keys(chosen).map(item =>
        serializer.map(
          key => (data[item] = { ...data[item], [key]: chosen[item][key] })
        )
      )
    : null;

  return (
    <Grid item xs={9}>
      <h2 className={classes.title}>{collectionTitle}</h2>
      {serializer && (
        <MaterialTable
          style={{ margin: 20 }}
          title={cardsetChosen ? cardsetChosen : collectionTitle}
          icons={tableIcons}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  add(title, newData);
                  resolve();
                }, 1000);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  update(title, newData);
                  resolve();
                }, 1000);
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  del(title, oldData);
                  resolve();
                }, 1000);
              })
          }}
          columns={columns}
          data={data}
        />
      )}
    </Grid>
  );
};

export default Collections;
