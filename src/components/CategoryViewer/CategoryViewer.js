import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem,
    TransactionOptions
} from './CategoryViewerComponents'
import { categories, functions } from '../../globals'

import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'

class CategoryViewer extends React.Component {
    timeFrame = 'month'
    popupDialog = null
    state = { lastOptionsOpenedInfo: null }

    showPopUp(lastOptionsOpenedInfo) {
        this.setState({
            ...this.state,
            lastOptionsOpenedInfo
        })
        this.popupDialog.show()
    }

    render() {
        return (
            <View>
                <PopupDialog
                    containerStyle={{ zIndex: 3 }}
                    width={0.8}
                    height={230}
                    ref={popupDialog => {
                        this.popupDialog = popupDialog
                    }}
                    dialogAnimation={
                        new SlideAnimation({
                            slideFrom: 'bottom'
                        })
                    }
                >
                    <TransactionOptions
                        transactionInfo={
                            this.state.lastOptionsOpenedInfo == null
                                ? {}
                                : this.state.lastOptionsOpenedInfo
                        }
                    />
                </PopupDialog>

                <View style={{ flex: 1 }}>
                    {/* {timeFrame} */}
                    <CategorySummary
                        backButtonOnPress={() => this.props.navigation.goBack()}
                        showBackButton={this.props.showBackButton}
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
                                onLongPress={transactionInfo =>
                                    this.showPopUp(transactionInfo)
                                }
                            />
                        ))}
                    </TransactionList>
                </View>
            </View>
        )
    }
}

export default withNavigation(CategoryViewer)
