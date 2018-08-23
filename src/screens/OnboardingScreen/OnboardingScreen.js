import React, { Component } from 'react'
import { Button, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../globals'

class OnboardingScreen extends Component {
    render() {
        return (
            <LinearGradient
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 0
                }}
                colors={colors.backgroundGradient}
            >
                <Text>Welcome to the onboarding screen</Text>
                <Button
                    title="done"
                    onPress={() => {
                        this.props.navigation.navigate('Home')
                    }}
                />
            </LinearGradient>
        )
    }
}

export default OnboardingScreen
