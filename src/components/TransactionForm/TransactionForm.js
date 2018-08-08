import React, { Component } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../globals'
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
            expenses: [
                {
                    title: '',
                    amount: 0,
                    date: null,
                    category: ''
                }
            ]
        }
    }
    handleSubmit() {
        alert(this.state)
    }

    render() {
        return (
            <LinearGradient style={styles.form} colors={colors.formGradient}>
                <CancelButton
                    buttonText="Cancel"
                    onPress={this.props.cancelForm}
                />
                <Text style={styles.form__heading}>{this.props.heading}</Text>

                <View style={styles.form__fields}>
                    <Field
                        placeholder="What did you buy?"
                        onChangeText={title => this.setState({ title })}
                    />
                    <MoneyField
                        onChangeText={amount => this.setState({ amount })}
                    />
                    <DateField
                        date={this.state.date || new Date()}
                        onDateChange={date => this.setState({ date })}
                    />
                    <CategoryField
                        firstCat="Housing"
                        secondCat="Transportation"
                        thirdCat="Food"
                        fourthCat="Bills"
                        fifthCat="Entertainment"
                        sixthCat="Other"
                        onValueChange={category => this.setState({ category })}
                    />
                    <FormButton
                        buttonText="Add"
                        onPress={() => this.handleSubmit()}
                    />
                </View>
            </LinearGradient>
        )
    }
}
