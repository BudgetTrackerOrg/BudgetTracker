import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../globals'

const Loading = () => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={colors.backgroundGradient}
            style={styles.container}
        >
            <ActivityIndicator size="large" color="red" />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Loading
