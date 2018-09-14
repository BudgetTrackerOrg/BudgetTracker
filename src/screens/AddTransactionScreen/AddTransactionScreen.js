import React, { Component } from 'react'
import { View, Keyboard, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { colors } from '../../globals'
import styles from './AddTransactionScreen.scss'
import { addTransaction } from '../../store/actions'
import TransactionCard from '../../components/TransactionCard/TransactionCard'

class AddTransactionScreen extends Component {
    constructor(props) {
        super(props)
        // All state values will be updated immediately before form is submitted
        // The state properties which are edited are in TransactionCard.js
        this.state = {
            title: null,
            amount: null,
            dateAdded: null,
            category: null,
            id: null
        }
    }

    updateState(data) {
        this.setState(data, () => {
            this.props.addTransaction(this.state)
            this.props.closeForm()
            Keyboard.dismiss()
        })
    }

    render() {
        return (
            <View style={styles.form} colors={colors.backgroundGradient}>
                <KeyboardAvoidingView behavior="padding">
                    <TransactionCard
                        titlePlaceholder="What did you buy?"
                        currencyType={this.props.currencyType}
                        onCancelPress={this.props.closeForm}
                        onSubmit={this.updateState.bind(this)}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { ...state }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addTransaction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTransactionScreen)
