import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem
} from './CategoryViewerComponents'
import { categories, functions } from '../../globals'

import { withNavigation } from 'react-navigation'

class CategoryViewer extends React.Component {
    timeFrame = 'month'

    render() {
        return (
            <View>
                <View style={{ flex: 1 }}>
                    {/* {timeFrame} */}
                    <CategorySummary
                        backButtonOnPress={() => this.props.navigation.goBack()}
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

export default withNavigation(CategoryViewer)
