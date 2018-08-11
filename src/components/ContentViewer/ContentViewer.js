import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'

export default props => {
    return (
        <View style={styles.container}>
            <View>{props.children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
