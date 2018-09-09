import { GoogleSignin } from 'react-native-google-signin'
import { Platform, Alert } from 'react-native'
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
import { setUserInfo, fetchTransactions, setCurrency } from '../store/actions'

const config = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

const connections = {
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

    backupToFirebase: {
        transactions: input => {
            let data = {
                transactions: { expenses: input.expenses, income: input.income }
            }

            sendDataToFirebase(data)
        },
        currency: input => {
            let data = {
                selectedCurrency: input.selectedCurrency
            }

            sendDataToFirebase(data)
        }
    },

    fetchFromFirebase: async () => {
        if (this.user) {
            firebase
                .database()
                .ref(this.user.uid)
                .once('value', data => {
                    let backedupData = {
                        ...data.toJSON(),
                        isFetch: true
                    }

                    // dispatch actions to backup data
                    store.dispatch(setCurrency(backedupData))
                    store.dispatch(fetchTransactions(backedupData))
                })
                .catch(err => console.log(err))
        }
    },
    getCurrentUser() {
        return this.user
    }
}
let sendDataToFirebase = data => {
    // backs up ONLY if user is singed in
    if (this.user) {
        firebase
            .database()
            .ref(this.user.uid)
            .update(data)
            .catch(err => console.log(err))
    }
}

firebase.auth().onAuthStateChanged(user => {
    let userInfo = null

    if (user) {
        // User is signed in.
        userInfo = { uid: user.uid, email: user.email }
    }

    this.user = userInfo

    //connections.fetchFromFirebase()
    store.dispatch(setUserInfo(userInfo))
})

export default connections
