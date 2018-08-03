import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'

export default props => {
    // if (!props.backButton) {
    //     backButton = <Text />
    // }

    return (
        <View style={styles.container}>
            <View>{props.children}</View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
