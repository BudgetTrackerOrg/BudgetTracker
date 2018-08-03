import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import styles from './TransactionForm.scss'
import Field from '../Field/Field'
import MoneyField from '../Field/MoneyField'
import DateField from '../Field/DateField'
import CategoryField from '../Field/CategoryField'
import FormButton from '../Field/FormButton'

export class TransactionForm extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight>
                    <Text style={styles.form__cancel}>Cancel</Text>
                </TouchableHighlight>
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
                    {/* <FormButton
                        buttonText="Add"
                    /> */}
                </View>
            </View>
        )
    }
}

export default TransactionForm
