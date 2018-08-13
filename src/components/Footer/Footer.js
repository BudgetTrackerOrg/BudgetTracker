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
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        height: 75
    }
}
