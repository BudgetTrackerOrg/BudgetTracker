import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import { colors, currencies } from '../../globals'
import styles from './AddTransactionScreen.scss'
import { CancelButton } from '../../components/Field'
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
        })
    }

    render() {
        return (
            <View style={styles.form} colors={colors.backgroundGradient}>
                <View>
                    <TransactionCard
                        titlePlaceholder="What did you buy?"
                        currencyType={this.props.currencyType}
                        onCancelPress={this.props.closeForm}
                        onSubmit={this.updateState.bind(this)}
                    />
                </View>
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
