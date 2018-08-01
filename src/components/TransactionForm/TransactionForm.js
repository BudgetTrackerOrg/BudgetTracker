import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './TransactionForm.scss'

import CategoryBox from '../Categories/CategoryBox'

export class TransactionForm extends Component {
    render() {
        return (
            <View>
                <Text style={styles.form__heading}>{this.props.heading}</Text>

                <View style={styles.categories}>
                    <CategoryBox
                        categoryIcon="home"
                        categoryName="House/Rent"
                    />
                    <CategoryBox
                        categoryIcon="car"
                        categoryName="Car/Transit"
                    />
                    <CategoryBox
                        categoryIcon="cutlery"
                        categoryName="Food/Drink"
                    />
                    <CategoryBox
                        categoryIcon="credit-card"
                        categoryName="Payments/Bills"
                    />
                    <CategoryBox
                        categoryIcon="film"
                        categoryName="Entertainment"
                    />
                    <CategoryBox
                        categoryIcon="shopping-cart"
                        categoryName="Shopping"
                    />
                    <CategoryBox
                        categoryIcon="graduation-cap"
                        categoryName="Education"
                    />
                    <CategoryBox
                        categoryIcon="question-circle"
                        categoryName="Other"
                    />
                    <CategoryBox
                        categoryIcon="plus-circle"
                        categoryName="Add Category"
                    />
                </View>
            </View>
        )
    }
}

export default TransactionForm
