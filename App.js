import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCc-7fdvE3Tc5zUUN2aGGc_pqzG7nI7ijA",
  authDomain: "instagram-demo-fc5f2.firebaseapp.com",
  projectId: "instagram-demo-fc5f2",
  storageBucket: "instagram-demo-fc5f2.appspot.com",
  messagingSenderId: "510566006298",
  appId: "1:510566006298:web:195debab798eab8a971ba3",
  measurementId: "G-01FC8503LF",
};
if (firebase.getApps().length === 0) firebase.initializeApp(firebaseConfig);

//redux configuration
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            ></Stack.Screen>
            <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">            
            <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation} ></Stack.Screen>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}></Stack.Screen>
          </Stack.Navigator>
          </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
