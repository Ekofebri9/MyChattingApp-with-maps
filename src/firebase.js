import * as firebase from "firebase";
​
export const initialize = () => firebase.initializeApp({
    apiKey: "AIzaSyBSci7f2QlMpoLFVFmpBwcWrygEqYAg_SQ ",
    authDomain: "my-chatting-tagloc-app.firebaseapp.com",
    databaseURL: "https://my-chatting-tagloc-app.firebaseio.com/",
    projectId: "my-chatting-tagloc-app",
    storageBucket: "dwauth-a7b5e.appspot.com",
    messagingSenderId: "913864115277"
});