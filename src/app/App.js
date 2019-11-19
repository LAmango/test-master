import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import TestMasterTheme from "./theme";
import { Provider } from "react-redux";
import storeConfig from "../store";
import Routes from "../routes/Router";

const store = storeConfig();

function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={TestMasterTheme}>
          <Routes />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
