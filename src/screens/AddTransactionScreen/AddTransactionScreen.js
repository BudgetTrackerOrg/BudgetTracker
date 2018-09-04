import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../globals'
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
        this.backgroundColor = setTimeout(() => {
            return 'red'
        }, 1000)
    }

    updateState(data) {
        this.setState(data, () => {
            this.props.addTransaction(this.state)
            this.props.closeForm()
        })
    }

    // blurBackground = () => {
    // start = setTimeout(() => {
    //     this.backgroundColor = 'red'
    // }, 1000)

    // }

    render() {
        return (
            <View
                style={[
                    styles.form,
                    {
                        backgroundColor: this.backgroundColor
                    }
                ]}
                // colors={colors.backgroundGradient}
            >
                <CancelButton
                    style={styles.cancelButton}
                    buttonText="Back"
                    onPress={this.props.closeForm}
                />
                <View>
                    <Text style={styles.form__heading}>
                        {this.props.heading}
                    </Text>
                    <TransactionCard
                        titlePlaceholder="What did you buy?"
                        submitBtnText="Add"
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
