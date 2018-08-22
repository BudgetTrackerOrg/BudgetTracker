import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { functions } from '../../../globals'

export default props => {
    return (
        <View style={{ height: 70, paddingTop: 10 }}>
            <Text style={{ ...styles.text, marginBottom: 0, fontSize: 20 }}>
                {functions.toTitleCase(props.transactionInfo.title)}
            </Text>
            <Text
                style={{
                    ...styles.text,
                    fontSize: 52,
                    fontWeight: 'bold',
                    marginTop: 0
                }}
            >
                {functions.formatCurrency(props.transactionInfo.amount)}
            </Text>
            <Text style={{ ...styles.text, marginTop: 5, marginBottom: 15 }}>
                Added on{' '}
                {/* {functions.toSimpleDateString(props.transactionInfo.dateAdded)} */}
            </Text>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPressOut={() => {
                        props.editTransactionCallback()
                    }}
                >
                    <Text style={styles.buttonLabel}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPressOut={() => {
                        props.deleteTransactionCallback(
                            props.transactionInfo.id
                        )
                        props.hidePopUpCallBack()
                    }}
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
        textAlign: 'left',
        margin: 4,
        marginLeft: 20,
        fontSize: 10
    }
}
