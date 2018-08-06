import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem
} from './CategoryViewerComponents'
import { categories } from '../../globals'

export default props => {
    return (
        <View>
            <View style={{ flex: 1 }}>
                <CategorySummary
                    totalAmount={getTotalAmount(props.expenses, props.category)}
                    categoryTitle={categories[props.category].displayTitle}
                />
            </View>
            <View style={{ flex: 3 }}>
                <TransactionList>
                    {props.expenses.map(expense => (
                        <TransactionListItem
                            key={expense.id}
                            title={expense.title}
                            amount={expense.amount}
                            dateAdded={expense.dateAdded}
                        />
                    ))}
                </TransactionList>
            </View>
        </View>
    )
}

const getTotalAmount = (expenses, category) => {
    let total = 0

    for (let i in expenses) {
        total += expenses[i].amount
    }

    return total
}
