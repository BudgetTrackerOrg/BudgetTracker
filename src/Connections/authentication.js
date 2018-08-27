import { GoogleSignin, statusCodes } from 'react-native-google-signin'
import firebase from 'firebase'

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
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code
                    var errorMessage = error.message
                    // The email of the user's account used.
                    var email = error.email
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential
                    // ...
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
