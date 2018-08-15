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
            category: this.getKeyFromDisplayText(
                categories[Object.keys(categories)[0]].displayTitle
            ),
            // There are two state properties pertaining to CATEGORY
            // "category" is for the KEY, which is used for the Redux State
            // "displayCategory" is for the DROPDOWN MENU VALUE, for the Picker
            displayCategory:
                categories[Object.keys(categories)[0]].displayTitle,
            // Changes styling if fields are invalid
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
        this.props.onSubmit(data)
        this.setState(this.baseState)
    }

    render() {
        return (
            <Card style={styles.form__fields}>
                <Field
                    placeholder={this.props.titlePlaceholder}
                    value={this.state.title}
                    onChangeText={title => {
                        this.setState({ ...this.state, title })
                        // If field was previously invalid, it validates as soon as
                        // something is entered into the field
                        if (this.state.invalidTitle)
                            this.setState({ invalidTitle: null })
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
                            this.setState({ invalidMoney: null })
                    }}
                    invalidStyles={this.state.invalidMoney}
                />
                <DateField
                    date={this.state.dateAdded}
                    onDateChange={date =>
                        this.setState({
                            ...this.state,
                            dateAdded: date
                        })
                    }
                />
                <CategoryField
                    categories={
                        Object.keys(categories).map(
                            category => categories[category].displayTitle
                        ) // Fetches the list of categories from the global file
                    }
                    onValueChange={category =>
                        this.setState({
                            ...this.state,
                            category: this.getKeyFromDisplayText(category),
                            // See comments in the constructor for explanation of
                            // "category" and "displayCategory"
                            displayCategory: category
                        })
                    }
                    selectedValue={this.state.displayCategory}
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
                                    this.onSubmit(this.state)
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
