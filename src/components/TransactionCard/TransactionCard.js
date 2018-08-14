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
            )
        }
        this.baseState = this.state
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
                    onChangeText={title => this.setState({ title })}
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
                    }}
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
                    selectedValue={this.state.category}
                    onValueChange={category =>
                        this.setState({
                            ...this.state,
                            category: this.getKeyFromDisplayText(category)
                        })
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
                            () => this.onSubmit(this.state)
                        )
                    }}
                />
            </Card>
        )
    }
}

export default TransactionCard
