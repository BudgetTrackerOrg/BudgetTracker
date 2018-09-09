import React from 'react'
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native'
import { functions } from '../../../globals'

class TransactionOptions extends React.Component {
    render() {
        return (
            <View style={{ height: 70, paddingTop: 10 }}>
                <Text style={{ ...styles.text, marginBottom: 0, fontSize: 20 }}>
                    {functions.toTitleCase(this.props.transactionInfo.title)}
                </Text>
                <Text
                    style={{
                        ...styles.text,
                        fontSize: 52,
                        fontWeight: 'bold',
                        marginTop: 0
                    }}
                >
                    {functions.formatCurrency(
                        this.props.transactionInfo.amount,
                        this.props.selectedCurrency.symbol
                    )}
                </Text>
                <Text
                    style={{ ...styles.text, marginTop: 5, marginBottom: 15 }}
                >
                    Added on{' '}
                    {functions.toSimpleDateString(
                        new Date(this.props.transactionInfo.dateAdded)
                    )}
                </Text>
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        onPressOut={() => {
                            this.props.editTransactionCallback(
                                this.props.transactionInfo.id
                            )
                        }}
                    >
                        <Text style={styles.buttonLabel}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPressOut={() => {
                            this.props.deleteTransactionCallback(
                                this.props.transactionInfo.id
                            )
                            this.props.hidePopUpCallBack()
                        }}
                        style={{ ...styles.button, backgroundColor: '#FD6260' }}
                    >
                        <Text style={styles.buttonLabel}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
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

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default connect(mapStateToProps)(TransactionOptions)
