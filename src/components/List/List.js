import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default props => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 10,
        paddingBottom: 10
    }
})
