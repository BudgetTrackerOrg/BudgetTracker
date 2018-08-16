import React from 'react'
import { View, Text } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem,
    TransactionOptions
} from './CategoryViewerComponents'
import { categories, functions } from '../../globals'
import TransactionCard from '../TransactionCard/TransactionCard'
import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import CancelButton from '../Field/CancelButton'

class CategoryViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { lastOptionsOpenedInfo: null }
        this.transCard = React.createRef()
    }

    timeFrame = 'month'
    popupDialog = null
    editDialog = null

    showPopUp(lastOptionsOpenedInfo) {
        this.setState({
            ...this.state,
            lastOptionsOpenedInfo
        })
        this.popupDialog.show()
    }

    hidePopUp(lastOptionsOpenedInfo) {
        this.setState({
            ...this.state,
            lastOptionsOpenedInfo
        })
        this.popupDialog.dismiss()
    }
    render() {
        return (
            <View>
                <PopupDialog
                    containerStyle={{ zIndex: 3 }}
                    width={0.9}
                    height={530}
                    ref={editDialog => {
                        this.editDialog = editDialog
                    }}
                    dialogAnimation={
                        new SlideAnimation({
                            slideFrom: 'bottom'
                        })
                    }
                >
                    <CancelButton
                        iconColor={'#212121'}
                        onPress={() => {
                            this.editDialog.dismiss()
                            this.popupDialog.show()
                        }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: 20 }}>
                        Edit Details{' '}
                        {this.state.lastOptionsOpenedInfo == null
                            ? ''
                            : this.state.lastOptionsOpenedInfo.title}
                    </Text>
                    <TransactionCard
                        ref={transCard => {
                            this.transCard = transCard
                        }}
                        title={
                            this.state.lastOptionsOpenedInfo == null
                                ? null
                                : this.state.lastOptionsOpenedInfo.title
                        }
                        amount={
                            this.state.lastOptionsOpenedInfo == null
                                ? null
                                : this.state.lastOptionsOpenedInfo.amount
                        }
                        dateAdded={
                            this.state.lastOptionsOpenedInfo == null
                                ? null
                                : this.state.lastOptionsOpenedInfo.dateAdded
                        }
                        category={
                            this.state.lastOptionsOpenedInfo == null
                                ? null
                                : this.state.lastOptionsOpenedInfo.category
                        }
                        titlePlaceholder="What did you buy?"
                        submitBtnText="Update"
                        onSubmit={updatedTransaction => {
                            this.editDialog.dismiss()
                            this.props.editTransactionCallback(
                                updatedTransaction,
                                this.state.lastOptionsOpenedInfo == null
                                    ? null
                                    : this.state.lastOptionsOpenedInfo.id
                            )
                        }}
                    />
                </PopupDialog>

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
                        hidePopUpCallBack={() => this.hidePopUp()}
                        deleteTransactionCallback={
                            this.props.deleteTransactionCallback
                        }
                        editTransactionCallback={() => {
                            this.popupDialog.dismiss()
                            this.editDialog.show()
                            this.transCard.updateStateWithProps() //needed to update the form with the props passed
                        }}
                    />
                </PopupDialog>

                <View style={{ flex: 1 }}>
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
                                id={expense.id}
                                title={expense.title}
                                amount={expense.amount}
                                dateAdded={expense.dateAdded}
                                category={expense.category}
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
