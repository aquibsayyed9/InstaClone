import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth"

export class Login extends Component {
  //constructor to initialize component
  constructor(props) {
    super(props); // wont be able to call `this.[methodname]` without this statement
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignIn.bind(this); //so that we can access state variables
  }
  onSignIn() {
    const auth = getAuth();
    const { email, password, name } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="name"
          onChangeText={(name) => this.setState({ name })}
        />
        <TextInput
          placeholder="email"
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true} //this will hide password
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={() => this.onSignUp()} title="Sign In"></Button>
      </View>
    );
  }
}

export default Login;
