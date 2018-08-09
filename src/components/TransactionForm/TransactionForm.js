import React, { Component } from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { colors, categories } from '../../globals'
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
            title: '',
            amount: '',
            date: new Date(),
            category: categories[Object.keys(categories)[0]].displayTitle
        }
    }
    handleSubmit() {
        alert(
            'title: ' +
                this.state.title +
                '\namount: ' +
                this.state.amount +
                '\ndate: ' +
                this.state.date +
                '\ncategory: ' +
                this.state.category
        )
    }

    render() {
        return (
            <LinearGradient style={styles.form} colors={colors.formGradient}>
                <CancelButton
                    buttonText="Back"
                    onPress={this.props.cancelForm}
                />
                <Text style={styles.form__heading}>{this.props.heading}</Text>

                <View style={styles.form__fields}>
                    <Field
                        placeholder="What did you buy?"
                        onChangeText={title => this.setState({ title })}
                    />
                    <MoneyField
                        value={'$' + this.state.amount}
                        onChangeText={val => {
                            const regex = /[+-]?\d+(\.\d+)?/g
                            this.setState({
                                ...this.state,
                                // This ternary expression returns a float
                                amount: !val.match(regex)
                                    ? 0
                                    : val.match(regex)[0]
                            })
                        }}
                    />
                    <DateField
                        date={this.state.date}
                        onDateChange={date => this.setState({ date })}
                    />
                    <CategoryField
                        categories={Object.keys(categories).map(
                            category => categories[category].displayTitle
                        )}
                        selectedValue={this.state.category}
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
