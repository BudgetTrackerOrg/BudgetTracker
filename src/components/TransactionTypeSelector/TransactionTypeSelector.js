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
                        onClick={value => {
                            this.setState(
                                {
                                    ...this.state,
                                    selectedValue: value
                                },
                                () => {
                                    this.props.onSelection(
                                        this.state.selectedValue
                                    )
                                }
                            )
                        }}
                    />
                    <TransactionTypeSelectorButton
                        selected={this.state.selectedValue === 'spending'}
                        icon={'minus'}
                        color="red"
                        title="Spending"
                        value="spending"
                        onClick={value => {
                            this.setState(
                                {
                                    ...this.state,
                                    selectedValue: value
                                },
                                () => {
                                    this.props.onSelection(
                                        this.state.selectedValue
                                    )
                                }
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}
export default TransactionTypeSelector
