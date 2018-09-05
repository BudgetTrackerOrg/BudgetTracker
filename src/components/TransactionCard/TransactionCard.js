import React, { Component } from 'react'
import {
    CategoryField,
    DateField,
    Field,
    FormButton,
    MoneyField,
    CancelButton
} from '../../components/Field'
import Card from '../Card/Card'
import TransactionTypeSelector from '../TransactionTypeSelector/TransactionTypeSelector'
import { categories } from '../../globals'
import styles from './TransactionCard.scss'
import { TouchableHighlight, Text, View } from 'react-native'
import { Picker } from 'react-native-picker-dropdown'

class TransactionCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            amount: '',
            dateAdded: new Date(),
            category: Object.keys(categories)[0],
            invalidTitle: null,
            invalidMoney: null,
            transactionType: ''
        }
        this.baseState = this.state
        this.invalid = { borderColor: '#a31a11' }
    }

    getKeyFromDisplayText(text) {
        let returnValue = text

        Object.keys(categories).forEach(key => {
            if (categories[key].displayTitle === text) {
                returnValue = key
            }
        })

        return returnValue
    }

    onSubmit(data) {
        let finalValues = {
            title: data.title,
            amount: data.amount,
            dateAdded: data.dateAdded,
            category: data.category,
            transactionType: data.transactionType
        }

        if (data.transactionType === 'income') {
            finalValues.category = 'income'
        }

        this.props.onSubmit(finalValues)
        this.setState(this.baseState)
    }

    updateStateWithProps() {
        this.setState({
            title: this.props.title ? this.props.title : this.state.title,
            amount: this.props.amount ? this.props.amount : this.state.amount,
            dateAdded: this.props.dateAdded
                ? this.props.dateAdded
                : this.state.dateAdded,
            category: this.props.category
                ? this.props.category
                : this.state.category
        })
    }

    render() {
        let spendingForm = (
            <View>
                <Field
                    placeholder={'What did you buy?'}
                    value={this.state.title}
                    onChangeText={title => {
                        this.setState({ ...this.state, title })
                        // If field was previously invalid, it validates as soon as
                        // something is entered into the field
                        if (this.state.invalidTitle)
                            this.setState({
                                invalidTitle: null
                            })
                    }}
                    invalidStyles={this.state.invalidTitle}
                />
                <MoneyField
                    value={'$' + this.state.amount}
                    onChangeText={val => {
                        const regex = /([0-9.]+)/g

                        this.setState({
                            ...this.state,
                            // This ternary expression returns a float
                            amount: val.match(regex) ? val.match(regex)[0] : ''
                        })
                        // If field was previously invalid, it validates as soon as
                        // something is entered into the field
                        if (this.state.invalidMoney)
                            this.setState({
                                invalidMoney: null
                            })
                    }}
                    invalidStyles={this.state.invalidMoney}
                />
                <DateField
                    date={this.state.dateAdded}
                    onDateChange={date => {
                        // doing the following because param which is being passed in is a string, which breaks things
                        date = date.split('-')
                        date = new Date(date[2], parseInt(date[0]) - 1, date[1])

                        this.setState({
                            ...this.state,
                            dateAdded: date
                        })
                    }}
                />
                <CategoryField
                    onValueChange={category =>
                        this.setState({
                            ...this.state,
                            category
                        })
                    }
                    selectedValue={this.state.category}
                />
            </View>
        )

        let incomeForm = (
            <View>
                <Field
                    placeholder={'Title'}
                    value={this.state.title}
                    onChangeText={title => {
                        this.setState({ ...this.state, title })
                        // If field was previously invalid, it validates as soon as
                        // something is entered into the field
                        if (this.state.invalidTitle)
                            this.setState({
                                invalidTitle: null
                            })
                    }}
                    invalidStyles={this.state.invalidTitle}
                />
                <MoneyField
                    value={'$' + this.state.amount}
                    onChangeText={val => {
                        const regex = /([0-9.]+)/g

                        this.setState({
                            ...this.state,
                            // This ternary expression returns a float
                            amount: val.match(regex) ? val.match(regex)[0] : ''
                        })
                        // If field was previously invalid, it validates as soon as
                        // something is entered into the field
                        if (this.state.invalidMoney)
                            this.setState({
                                invalidMoney: null
                            })
                    }}
                    invalidStyles={this.state.invalidMoney}
                />
                <DateField
                    date={this.state.dateAdded}
                    onDateChange={date => {
                        // doing the following because param which is being passed in is a string, which breaks things
                        date = date.split('-')
                        date = new Date(date[2], parseInt(date[0]) - 1, date[1])

                        this.setState({
                            ...this.state,
                            dateAdded: date
                        })
                    }}
                />
            </View>
        )

        let form
        let header
        if (this.state.transactionType === 'spending') {
            form = spendingForm
            header = 'Add Expense'
        } else if (this.props.isEditForm) {
            form = spendingForm
            header = 'Edit Details for ' + this.state.title
        } else {
            form = incomeForm
            header = 'Add Income'
        }
        return (
            <Card style={styles.form__fields}>
                {this.props.isEditForm ? null : (
                    <TransactionTypeSelector
                        onSelection={type => {
                            this.setState({
                                ...this.state,
                                transactionType: type
                            })
                        }}
                    />
                )}
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 15,
                        marginBottom: 15
                    }}
                >
                    {header}
                </Text>

                {form}

                <FormButton
                    buttonText={'Add'}
                    onPress={() => {
                        this.setState(
                            {
                                ...this.state,
                                amount: parseFloat(this.state.amount)
                            },
                            () => {
                                if (!this.state.title && !this.state.amount) {
                                    this.setState({
                                        ...this.state,
                                        amount: '',
                                        invalidTitle: this.invalid,
                                        invalidMoney: this.invalid
                                    })
                                } else if (!this.state.title) {
                                    this.setState({
                                        ...this.state,
                                        invalidTitle: this.invalid,
                                        invalidMoney: null
                                    })
                                } else if (!this.state.amount) {
                                    this.setState({
                                        ...this.state,
                                        amount: '',
                                        invalidTitle: null,
                                        invalidMoney: this.invalid
                                    })
                                } else {
                                    this.setState(
                                        // This is placed onSubmit and not onChangeText
                                        // because trim() has very strange behaviour
                                        // when applied to onChangeText
                                        // If a better alternative is found,
                                        // please go ahead
                                        {
                                            title: this.state.title.trim()
                                        },
                                        () => this.onSubmit(this.state)
                                    )
                                }
                            }
                        )
                    }}
                />
                {this.props.isEditForm ? null : (
                    <TouchableHighlight onPress={this.props.onCancelPress}>
                        <Text style={{ textAlign: 'center', color: '#5362E4' }}>
                            Cancel
                        </Text>
                    </TouchableHighlight>
                )}
            </Card>
        )
    }
}

export default TransactionCard
