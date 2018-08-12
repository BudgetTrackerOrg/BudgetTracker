import React from 'react'
import { View, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={{ ...styles.container, ...props.style }}>
            {props.children}
        </View>
    )
}

const styles = {
    container: {
        borderTopWidth: 1,
        borderTopColor: '#76768E',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 75
    }
}
