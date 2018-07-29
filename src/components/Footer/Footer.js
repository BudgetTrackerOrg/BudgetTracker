import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
    return <View style={styles.container}>{props.children}</View>
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 75
    }
})
