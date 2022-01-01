import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import auth from "firebase/auth";
import {doc, getFirestore, setDoc, collection, FieldValue, serverTimestamp}  from "firebase/firestore";

require("firebase/firestore");
require("firebase/storage");

export default function Save(props, {navigation}) {
  //console.log(props.route.params.image);
  const [caption, setCaption] = useState("");
  const uploadImage = async () => {
    const uri = props.route.params.image; // get image uri from storage
    const response = await fetch(uri); // get image in blob form
    const blob = await response.blob();
    const childPath = `post/${auth.getAuth().currentUser.uid}/${Math.random().toString(36)}`;
    const storage = getStorage();
    const storageRef = ref(storage, childPath);

    const task = uploadBytes(storageRef, blob);
    //.then((snapshot) => {console.log('uploaded blob !')})

    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompletion = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => 
      console.log(snapshot));
      savePostDate(snapshot);
    };

    task.on("state_changed", taskProgress, taskCompletion);
  };

  const savePostDate = (downloadUrl) => {
    setDoc(doc(getFirestore(), "posts", "userPosts"), {downloadUrl: downloadUrl, caption: serverTimestamp()}).then((function () {
        props.navigation.popToTop()
    }));
  }

  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.Image }} />
      <TextInput
        placeholder="Write a caption"
        onChangeText={(caption) => setCaption(caption)}
      />

      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}
