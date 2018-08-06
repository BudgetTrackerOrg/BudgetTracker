import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './TransactionForm.scss'
import CancelButton from '../Field/CancelButton'
import Field from '../Field/Field'
import MoneyField from '../Field/MoneyField'
import DateField from '../Field/DateField'
import CategoryField from '../Field/CategoryField'
import FormButton from '../Field/FormButton'

export default class TransactionForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    handleSubmit() {
        alert('submit button pressed')
    }
    // cancelForm() {
    //     alert('form cancelled')
    // }

    render() {
        return (
            <View>
                <CancelButton
                    buttonText="Cancel"
                    // onPress={() => this.cancelForm()}
                    onPress={this.props.cancelForm}
                />
                <Text style={styles.form__heading}>{this.props.heading}</Text>

                <View style={styles.form__fields}>
                    <Field placeholder="What did you buy?" />
                    <MoneyField />
                    <DateField />
                    <CategoryField
                        firstCat="Housing"
                        secondCat="Transportation"
                        thirdCat="Food"
                        fourthCat="Bills"
                        fifthCat="Entertainment"
                        sixthCat="Other"
                    />
                    <FormButton
                        buttonText="Add"
                        onPress={() => this.handleSubmit()}
                    />
                </View>
            </View>
        )
    }
}
