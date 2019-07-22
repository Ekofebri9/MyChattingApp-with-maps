import * as firebase from 'firebase';
import Env from 'react-native-config';
const config = firebase.initializeApp({
    apiKey: Env.API_KEY,
    authDomain: Env.AUTH_DOMAIN,
    databaseURL: Env.DATABASE_URL,
    projectId: Env.PROJECT_ID,
    storageBucket: Env.STORAGE_BUCKET,
    messagingSenderId: Env.SENDER_ID,
    appId: Env.APP_ID
});
export default config

