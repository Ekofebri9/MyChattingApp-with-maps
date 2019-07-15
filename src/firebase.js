import * as firebase from "firebase";
​
export const initialize = () => firebase.initializeApp({
    apiKey: "AIzaSyAsq5_Bz7k0NvHwgkujU5rsFdltIiKx42s",
    authDomain: "dwauth-a7b5e.firebaseapp.com",
    databaseURL: "https://dwauth-a7b5e.firebaseio.com",
    projectId: "dwauth-a7b5e",
    storageBucket: "dwauth-a7b5e.appspot.com",
    messagingSenderId: "913864115277"
});