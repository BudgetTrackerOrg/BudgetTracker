import React from 'react'
import { View, Text } from 'react-native'
import TransactionTypeSelectorButton from './TransactionTypeSelectorButton'

class TransactionTypeSelector extends React.Component {
    constructor(props) {
        super(props)
        // All state values will be updated immediately before form is submitted
        // The state properties which are edited are in TransactionCard.js

        this.state = { selectedValue: 'income' }
    }

    componentDidMount() {
        this.props.onSelection(this.state.selectedValue)
    }

    reset() {
        this.setState({ ...this.state, selectedValue: 'income' }, () => {
            this.props.onSelection(this.state.selectedValue)
        })
    }

    setTransactionType = selectedValue => {
        this.setState({ ...this.state, selectedValue }, () =>
            this.props.onSelection(this.state.selectedValue)
        )
    }

    render() {
        return (
            <View style={{ borderBottomColor: '#eee', borderBottomWidth: 0.5 }}>
                <Text
                    style={{ textAlign: 'center', fontSize: 15, marginTop: 10 }}
                >
                    Transaction Type
                </Text>
                <View
                    style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row'
                    }}
                >
                    <TransactionTypeSelectorButton
                        selected={this.state.selectedValue === 'income'}
                        icon={'plus'}
                        color="green"
                        title="Income"
                        value="income"
                        onClick={value => this.setTransactionType(value)}
                    />
                    <TransactionTypeSelectorButton
                        selected={this.state.selectedValue === 'spending'}
                        icon={'minus'}
                        color="red"
                        title="Spending"
                        value="spending"
                        onClick={value => this.setTransactionType(value)}
                    />
                </View>
            </View>
        )
    }
}
export default TransactionTypeSelector
