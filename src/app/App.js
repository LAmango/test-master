import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import TestMasterTheme from "./theme";
import { Provider } from "react-redux";
import storeConfig from "../store";
import "./App.css";
import Routes from "../routes/Router";

const store = storeConfig();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={TestMasterTheme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
