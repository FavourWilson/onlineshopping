import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import { ModalPortal } from "react-native-modals";
import { UserContext } from "./userContext";

export default function App() {
  return (
   <Provider store={store}>
      <UserContext>
        <StackNavigator />
        <ModalPortal />
      </UserContext>
    </Provider>
  );
}


