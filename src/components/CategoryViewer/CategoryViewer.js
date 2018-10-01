import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, BackHandler } from 'react-native'
import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import _ from 'lodash'
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

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', () =>
            this.props.navigation.goBack()
        )
    }

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
                    <TransactionCard
                        isEditForm={true}
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
                            _.filter(this.props.expenses, {
                                category: this.props.category
                            })
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
                        expenses={_.filter(this.props.expenses, {
                            category: this.props.category
                        })}
                        income={this.props.income}
                        onlyExpenses={this.props.onlyExpenses}
                        data={this.props.expenses}
                        extraData={this.props}
                        keyExtractor={expense => expense.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <TransactionListItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    amount={item.amount}
                                    dateAdded={item.dateAdded}
                                    category={item.category}
                                    showCategory={this.props.showCategory}
                                    onLongPress={transactionInfo =>
                                        this.showPopUp(transactionInfo)
                                    }
                                />
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        expenses: state.transaction.expenses
    }
}

export default withNavigation(connect(mapStateToProps)(CategoryViewer))
