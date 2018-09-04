import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import {
    CategorySummary,
    TransactionList,
    TransactionListItem,
    TransactionOptions
} from './CategoryViewerComponents'
import TransactionCard from '../TransactionCard/TransactionCard'
import CancelButton from '../Field/CancelButton'
import { categories, functions } from '../../globals'

class CategoryViewer extends Component {
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
                        Edit Details:{' '}
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
                                : new Date(
                                      this.state.lastOptionsOpenedInfo.dateAdded
                                  )
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
                    height={270}
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
                            this.props.expenses
                        )}
                        categoryTitle={
                            this.props.category
                                ? categories[this.props.category].displayTitle
                                : 'All Transactions'
                        }
                    />
                </View>
                <View style={{ flex: 3, zIndex: 1 }}>
                    <TransactionList
                        data={this.props.expenses}
                        renderItem={expense => {
                            return (
                                <TransactionListItem
                                    key={expense.item.id}
                                    id={expense.item.id}
                                    title={expense.item.title}
                                    amount={expense.item.amount}
                                    dateAdded={expense.item.dateAdded}
                                    category={expense.item.category}
                                    showCategory={this.props.showCategory}
                                    onLongPress={transactionInfo =>
                                        this.showPopUp(transactionInfo)
                                    }
                                />
                            )
                        }}
                        extraData={this.state}
                        keyExtractor={expense => expense.id.toString()}
                    />
                </View>
            </View>
        )
    }
}

export default withNavigation(CategoryViewer)
