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
            displayCategory:
                categories[Object.keys(categories)[0]].displayTitle,
            category: this.getKeyFromDisplayText(this.displayCategory),
            invalidTitle: null,
            invalidMoney: null
        } // "displayCategory" is for the DROPDOWN MENU VALUE, for the Picker // "category" is for the KEY, which is used for the Redux State // There are two state properties pertaining to CATEGORY // Changes styling if fields are invalid
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
        console.log(this.state.title)
        return (
            <Card style={styles.form__fields}>
                <Field
                    placeholder={this.props.titlePlaceholder}
                    value={
                        this.props.title ? this.props.title : this.state.title
                    }
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
                        '$' +
                        (this.props.amount
                            ? this.props.amount
                            : this.state.amount)
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
                    date={
                        this.props.dateAdded
                            ? this.props.dateAdded
                            : this.state.dateAdded
                    }
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
                    selectedValue={
                        this.props.category
                            ? this.props.category
                            : this.state.displayCategory
                    }
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
            </Card>
        )
    }
}

export default TransactionCard
