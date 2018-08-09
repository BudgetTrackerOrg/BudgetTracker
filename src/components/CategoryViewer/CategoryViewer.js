import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem
} from './CategoryViewerComponents'
import { categories, functions } from '../../globals'

export default class App extends React.Component {
    timeFrame = 'month'

    render() {
        return (
            <View>
                <View style={{ flex: 1 }}>
                    {/* {timeFrame} */}
                    <CategorySummary
                        totalAmount={functions.getTotalAmount(
                            this.props.expenses,
                            this.props.category
                        )}
                        categoryTitle={
                            categories[this.props.category].displayTitle
                        }
                    />
                </View>
                <View style={{ flex: 3 }}>
                    <TransactionList>
                        {this.props.expenses.map(expense => (
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
}
