import React, { Component } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'
import Entities from 'html-entities/lib/html5-entities'
import {
    CategoryField,
    DateField,
    Field,
    FormButton,
    MoneyField
} from '../../components/Field'
import Card from '../Card/Card'
import TransactionTypeSelector from '../TransactionTypeSelector/TransactionTypeSelector'
import { categories } from '../../globals'
import styles from './TransactionCard.scss'

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

    // This allows the decoding of Entity characters for currency symbols
    entities = new Entities()

    // This calls the reset method in ./TransactionTypeSelector.js
    transactionTypeSelectorRef = React.createRef()

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

        if (!this.props.isEditForm) {
            this.transactionTypeSelectorRef.current.reset()
        }
    }

    updateStateWithProps() {
        this.setState({
            title: this.props.title || this.state.title,
            amount: this.props.amount || this.state.amount,
            dateAdded: this.props.dateAdded || this.state.dateAdded,
            category: this.props.category || this.state.category
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
                    value={
                        this.entities.decode(this.props.currencyType) +
                        this.state.amount
                    }
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
                    value={
                        this.entities.decode(this.props.currencyType) +
                        this.state.amount
                    }
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
        let buttonText
        if (this.state.transactionType === 'spending') {
            form = spendingForm
            header = 'Add Expense'
            buttonText = 'Add'
        } else if (this.props.isEditForm) {
            form = spendingForm
            header = 'Edit Details for ' + this.state.title
            buttonText = 'Update'
        } else {
            form = incomeForm
            header = 'Add Income'
            buttonText = 'Add'
        }

        return (
            <Card style={styles.form__fields}>
                {this.props.isEditForm ? null : (
                    <TransactionTypeSelector
                        ref={this.transactionTypeSelectorRef}
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
                    // buttonText is a variable which has a value of either 'Add' or 'Update'
                    buttonText={buttonText}
                    onPress={() => {
                        this.setState(
                            {
                                ...this.state,
                                title: this.state.title.trim(),
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
                                        this.onSubmit(this.state),
                                        () => this.setState(this.baseState)
                                    )
                                }
                            }
                        )
                    }}
                />
                {this.props.isEditForm ? null : (
                    <TouchableHighlight
                        onPress={() => {
                            this.props.onCancelPress()
                            this.transactionTypeSelectorRef.current.reset()
                        }}
                    >
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
