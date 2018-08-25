import React, { Component } from 'react'
import { Text, TouchableHighlight } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../globals'
import Icon from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'

class OnboardingScreen extends Component {
    render() {
        return (
            <LinearGradient
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0,
                    padding: 40
                }}
                colors={colors.backgroundGradient}
            >
                <Icon name="cloud" size={100} color="white" />
                <Text style={styles.header}>Backup Your Data!</Text>
                <Text style={styles.text}>
                    Login with your Google account, to backup your data!
                </Text>
                {/* <GoogleSigninButton style={{ width: 48, height: 48 }} /> */}
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigation.navigate('Home')
                    }}
                >
                    <Text>skip</Text>
                </TouchableHighlight>
            </LinearGradient>
        )
    }
}

const styles = {
    header: {
        fontSize: 30,
        textAlign: 'center',
        color: '#fff'
    },
    text: {
        fontSize: 15,
        textAlign: 'center',
        color: '#fff'
    }
}
export default OnboardingScreen
