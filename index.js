import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './src/store'
import App from './src/App'
import Loading from './src/components/Loading/Loading'

// Backend
import firebase from 'firebase'
import {
    REACT_APP_API_KEY as API_KEY,
    REACT_APP_AUTH_DOMAIN as AUTH_DOMAIN,
    REACT_APP_DATABASE_URL as DATABASE_URL,
    REACT_APP_PROJECT_ID as PROJECT_ID,
    REACT_APP_STORAGE_BUCKET as STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID as MESSAGING_SENDER_ID
} from 'react-native-dotenv'

class rootApp extends Component {
    backupToFirebase() {
        firebase
            .database()
            .ref('users/001') // change to the user's Google account info later || unique id reducer
            .set({
                name: 'testing testing', // change to the user's Google account info later
                data: store
            })
            .then(() => {
                console.log('INSERTED')
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={<Loading />} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('BudgetTracker', () => rootApp)
