import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LinearGradient from 'react-native-linear-gradient'
import { colors, categories } from '../../globals'
import styles from './AddTransactionScreen.scss'
import {
    CancelButton,
    CategoryField,
    DateField,
    Field,
    FormButton,
    MoneyField
} from '../../components/Field'
import Card from '../../components/Card/Card'
import { addTransaction } from '../../store/actions'

class AddTransactionScreen extends Component {
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

    render() {
        return (
            <LinearGradient
                style={styles.form}
                colors={colors.backgroundGradient}
            >
                <CancelButton
                    style={styles.cancelButton}
                    buttonText="Back"
                    onPress={this.props.closeForm}
                />
                <View>
                    <Text style={styles.form__heading}>
                        {this.props.heading}
                    </Text>
                    <Card style={styles.form__fields}>
                        <Field
                            placeholder="What did you buy?"
                            onChangeText={title => this.setState({ title })}
                        />
                        <MoneyField
                            value={'$' + this.state.amount}
                            onChangeText={val => {
                                const regex = /([0-9.]+)/g

                                this.setState({
                                    ...this.state,
                                    // This ternary expression returns a float
                                    amount: val.match(regex)
                                        ? val.match(regex)[0]
                                        : ''
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
                                    category =>
                                        categories[category].displayTitle
                                ) // Fetches the list of categories from the global file
                            }
                            selectedValue={this.state.category}
                            onValueChange={category =>
                                this.setState({
                                    ...this.state,
                                    category: this.getKeyFromDisplayText(
                                        category
                                    )
                                })
                            }
                        />
                        <FormButton
                            buttonText="Add"
                            onPress={() => {
                                this.setState(
                                    {
                                        ...this.state,
                                        amount: parseFloat(this.state.amount)
                                    },
                                    () => {
                                        this.props.addTransaction(this.state)
                                    }
                                )
                                this.props.closeForm()
                            }}
                        />
                    </Card>
                </View>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addTransaction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTransactionScreen)
