import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import firebase from 'firebase'
import { Alert } from 'react-native'
import connections from './index'
import { store } from '../store'
export default {
    signIn: async () => {
        try {
            await GoogleSignin.hasPlayServices()
            let userInfo = await GoogleSignin.signIn()
            var credential = firebase.auth.GoogleAuthProvider.credential(
                userInfo.idToken
            )

            // Sign in with credential from the Google user.
            firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(user => {
                    if (!user.additionalUserInfo.isNewUser) {
                        Alert.alert(
                            'Backup with Google Account',
                            'How would you like to link "' +
                                userInfo.user.email +
                                '" to BudgetTracker?',
                            [
                                {
                                    text: 'Backup data from Device',
                                    onPress: () => {
                                        connections.backupToFirebase.transactions(
                                            {
                                                expenses: store.getState()
                                                    .transaction.expenses,
                                                income: store.getState()
                                                    .transaction.income
                                            }
                                        )
                                        connections.backupToFirebase.currency({
                                            selectedCurrency: store.getState()
                                                .main.selectedCurrency
                                        })
                                    }
                                },
                                {
                                    text: 'Fetch data from Cloud',
                                    onPress: () => {
                                        connections.fetchFromFirebase()
                                    }
                                }
                            ]
                        )
                    } else {
                        connections.backupToFirebase.transactions({
                            expenses: store.getState().transaction.expenses,
                            income: store.getState().transaction.income,
                            selectedCurrency: store.getState().main
                                .selectedCurrency
                        })
                        connections.backupToFirebase.currency({
                            selectedCurrency: store.getState().main
                                .selectedCurrency
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                })

            return userInfo
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('SIGN_IN_CANCELLED')
                Alert.alert('Sign in cancelled')
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('IN_PROGRESS')
                Alert.alert('Another Sign in currently in progress')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('PLAY_SERVICES_NOT_AVAILABLE')
                Alert.alert(
                    'Google Play Services are currently unavailable, please try again later'
                )
            } else {
                console.log('OTHER')
                console.log(error)
                Alert.alert(
                    'Whoops! Something went wrong, try again later.',
                    'Make sure you are connected to the internet.'
                )
            }
        }
    },
    signOut: async () => {
        try {
            await GoogleSignin.revokeAccess()
            await GoogleSignin.signOut()

            firebase
                .auth()
                .signOut()
                .then(function() {
                    // Sign-out successful.
                })
                .catch(function(error) {
                    // An error happened.
                })
        } catch (error) {
            console.error(error)
        }
    }
}
