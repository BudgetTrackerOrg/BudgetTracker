import { GoogleSignin } from 'react-native-google-signin'
import { Platform } from 'react-native'
import authentication from './authentication'
import {
    REACT_APP_IOS_CLIENT_ID as IOS_CLIENT_ID,
    REACT_APP_WEB_CLIENT_ID as WEB_CLIENT_ID,
    REACT_APP_API_KEY as API_KEY,
    REACT_APP_AUTH_DOMAIN as AUTH_DOMAIN,
    REACT_APP_DATABASE_URL as DATABASE_URL,
    REACT_APP_PROJECT_ID as PROJECT_ID,
    REACT_APP_STORAGE_BUCKET as STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID as MESSAGING_SENDER_ID
} from 'react-native-dotenv'
import firebase from 'firebase'
import { store } from '../store'
import { setUserInfo } from '../store/actions'

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

export default {
    init: async () => {
        //set up google AUTH
        GoogleSignin.configure({
            ...Platform.select({
                ios: {
                    iosClientId: IOS_CLIENT_ID
                },
                android: {}
            }),
            webClientId: WEB_CLIENT_ID,
            offlineAccess: false
        })
    },
    signIn: authentication.signIn,
    signOut: authentication.signOut,

    backupToFirebase: data => {
        firebase
            .database()
            .ref(this.uid)
            .set({ data })
            .catch(err => console.log(err))
    },
    fetchFromFirebase: () => {
        firebase
            .database()
            .ref(this.uid)
            .once('value', data => data.toJSON())
            .catch(err => console.log(err))
    }
}

firebase.auth().onAuthStateChanged(user => {
    let userInfo = null

    if (user) {
        // User is signed in.
        userInfo = {
            uid: user.uid,
            email: user.email
        }
    }

    this.uid = userInfo.uid
    store.dispatch(setUserInfo(userInfo))
})
