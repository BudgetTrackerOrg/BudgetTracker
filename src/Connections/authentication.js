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
                                        connections.backupToFirebase({
                                            expenses: store.getState()
                                                .transaction.expenses
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
                        connections.backupToFirebase({
                            expenses: store.getState().transaction.expenses
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
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('IN_PROGRESS')
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('PLAY_SERVICES_NOT_AVAILABLE')
            } else {
                console.log('OTHER')
                console.log(error)
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
