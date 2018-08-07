import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { functions } from '../../../globals'

export default props => {
    return (
        <View style={styles.main}>
            <Text style={styles.categoryTitle}>{props.categoryTitle}</Text>
            <Text style={styles.totalAmount}>
                {functions.formatCurreny(props.totalAmount)}
            </Text>
        </View>
    )
}

var { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width,
        height,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    totalAmount: {
        fontSize: 35,
        textAlign: 'center',
        color: 'white'
    },
    categoryTitle: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    }
})
