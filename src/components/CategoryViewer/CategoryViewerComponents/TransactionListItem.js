import React from 'react'
import {
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableWithoutFeedback
} from 'react-native'
import { functions } from '../../../globals'

export default props => {
    return (
        <TouchableWithoutFeedback onLongPress={() => props.onLongPress(props)}>
            <View style={styles.main}>
                <View style={styles.left}>
                    <Text style={styles.title}>
                        {functions.toTitleCase(props.title)}
                    </Text>
                    <Text style={styles.date}>
                        {/* {functions.toSimpleDateString(props.dateAdded)} */}
                    </Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.amount}>
                        {functions.formatCurrency(props.amount)}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
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
        flex: 2,
        alignItems: 'flex-end'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    amount: {
        fontSize: 26,
        fontWeight: '200'
    }
})
