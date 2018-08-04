import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'

export default props => {
    return (
        <View style={styles.main}>
            <Text>$12</Text>
        </View>
    )
}

var { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width,
        height,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    }
})
