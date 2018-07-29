import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
