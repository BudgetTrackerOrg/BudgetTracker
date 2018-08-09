import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem
} from './CategoryViewerComponents'
import { categories, functions } from '../../globals'

import { withNavigation } from 'react-navigation'

import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'

class CategoryViewer extends React.Component {
    timeFrame = 'month'
    popupDialog = null

    showPopUp() {
        this.popupDialog.show()
    }

    render() {
        return (
            <View>
                <PopupDialog
                    style={{ zIndex: 3 }}
                    ref={popupDialog => {
                        this.popupDialog = popupDialog
                    }}
                    dialogAnimation={
                        new SlideAnimation({
                            slideFrom: 'bottom'
                        })
                    }
                >
                    <Text>HA</Text>
                </PopupDialog>

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
                <View style={{ flex: 3, zIndex: 1 }}>
                    <TransactionList>
                        {this.props.expenses.map(expense => (
                            <TransactionListItem
                                key={expense.id}
                                title={expense.title}
                                amount={expense.amount}
                                dateAdded={expense.dateAdded}
                                onLongPress={() => this.showPopUp()}
                            />
                        ))}
                    </TransactionList>
                </View>
            </View>
        )
    }
}

export default withNavigation(CategoryViewer)
