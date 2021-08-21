import React from "react";
import ReactDOM from "react-dom";
import {ChakraProvider} from "@chakra-ui/react";

import {Provider as UserProvider} from "~/user/context";
import Layout from "~/app/layout/Layout";

import theme from "./theme";

import "./theme.css";
import HomeScreen from "./app/screens/Home";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Layout>
          <HomeScreen />
        </Layout>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
