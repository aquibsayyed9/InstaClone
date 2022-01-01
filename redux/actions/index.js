import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { USER_STATE_CHANGE } from "../constants/index";

export function fetchUser() {
  const db = getFirestore();
  const auth = getAuth();
  return (dispatch) => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists) {        
        dispatch({ type: USER_STATE_CHANGE, currentUser: docSnap.data() });
      } else console.log("does not exists");
    });
  };
}
