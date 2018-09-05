import React, { Component } from 'react'
import {
    CategoryField,
    DateField,
    Field,
    FormButton,
    MoneyField
} from '../../components/Field'
import Card from '../Card/Card'
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
            invalidMoney: null
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
            category: data.category
        }
        this.props.onSubmit(finalValues)
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
        return (
            <Card style={styles.form__fields}>
                <Field
                    placeholder={this.props.titlePlaceholder}
                    value={this.state.title}
                    onChangeText={title => {
                        this.setState({ ...this.state, title: title.trim() })
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
                    // TODO:
                    // Make a variable for the '$'. Default will be $ but the
                    // user should be allowed to change currency
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
                <FormButton
                    buttonText={this.props.submitBtnText}
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
                                        this.onSubmit(this.state),
                                        () => this.setState(this.baseState)
                                    )
                                }
                            }
                        )
                    }}
                />
            </Card>
        )
    }
}

export default TransactionCard
