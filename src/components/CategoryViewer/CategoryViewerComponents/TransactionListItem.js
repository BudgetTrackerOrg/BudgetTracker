import React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'

export default props => {
    return (
        <View style={styles.main}>
            <View style={styles.left}>
                <Text>{props.title}</Text>
                <Text>{props.dateAdded.toDateString()}</Text>
            </View>
            <View style={styles.right}>
                <Text>{props.amount}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 10,
        justifyContent: 'flex-start',
        margin: 5,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 2
            }
        })
    },
    left: {
        flex: 2
    },
    right: {
        flex: 2
    }
})
