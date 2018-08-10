import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-vector-icons/FontAwesome5'
import { functions } from '../../../globals'
export default props => {
    console.log(props)

    return (
        <View style={{ height: 50 }}>
            <Text style={{ ...styles.text, fontSize: 32, fontWeight: 'bold' }}>
                {functions.toTitleCase(props.transactionInfo.title)}
            </Text>
            <Text style={styles.text}>
                {functions.formatCurrency(props.transactionInfo.amount)}
            </Text>
            <Text style={{ ...styles.text, marginTop: 5, marginBottom: 15 }}>
                Added on{' '}
                {functions.toSimpleDateString(props.transactionInfo.dateAdded)}
            </Text>
            <View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonLabel}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: '#FD6260' }}
                >
                    <Text style={styles.buttonLabel}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = {
    button: {
        backgroundColor: '#3283FD',
        borderRadius: 20,
        padding: 10,
        margin: 10
    },
    buttonLabel: {
        textAlign: 'center',

        color: 'white'
    },
    text: {
        textAlign: 'center',
        margin: 4,
        fontSize: 10
    }
}
