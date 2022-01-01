import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {doc, getFirestore, setDoc}  from "firebase/firestore";

export class Register extends Component {
  //constructor to initialize component
  constructor(props) {
    super(props); // wont be able to call `this.[methodname]` without this statement
    this.state = {
      email: "",
      password: "",
      name: "",
    };
    this.onSignUp = this.onSignUp.bind(this); //so that we can access state variables
  }
  onSignUp() {
    const auth = getAuth();
    
    const { email, password, name } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        //console.log(auth.currentUser.uid);
        //doc([firestore instance, collection name, unique document id])
        setDoc(doc(getFirestore(), "users", auth.currentUser.uid), {name: name, email: email});
        
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

        <Button onPress={() => this.onSignUp()} title="Sign Up"></Button>
      </View>
    );
  }
}

export default Register;
