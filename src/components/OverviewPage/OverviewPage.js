import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { categories, functions, currencies } from '../../globals'
import { connect } from 'react-redux'

import CategoriesPageStyles from '../CategoriesPage/CategoriesPage.scss'
import Icon from 'react-native-vector-icons/FontAwesome'
class OverviewPage extends Component {
    render() {
        console.log(this.props.expenses)
        console.log(this.props.income)

        let expensesResult = functions.getExpenseResult(this.props.expenses)
        let incomeResult = functions.getExpenseResult(this.props.income)

        let totalResult = incomeResult.total - expensesResult.total
        console.log(totalResult)
        return (
            <View>
                <Text style={CategoriesPageStyles.main__subheading}>
                    TOTAL NET
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={{
                            ...CategoriesPageStyles.main__heading,
                            color: totalResult < 0 ? 'red' : 'white'
                        }}
                    >
                        {functions.formatCurrency(
                            totalResult,
                            this.props.selectedCurrency.symbol
                        )}
                        {totalResult < 0 ? (
                            <Icon name="sort-down" size={20} color="red" />
                        ) : (
                            ''
                        )}
                    </Text>
                </View>
                <View style={styles.dashboardInfo}>
                    <View style={styles.dashboardIncome}>
                        <View style={styles.graphLabel}>
                            <Text style={styles.dashboardHeadingText}>
                                INCOME
                            </Text>
                            <View
                                style={[
                                    styles.graphLabelIcon,
                                    styles.graphLabelIconIncome
                                ]}
                            />
                        </View>
                        <Text style={styles.dashboardAmountText}>
                            {functions.formatCurrency(
                                incomeResult.total,
                                this.props.selectedCurrency.symbol
                            )}
                        </Text>
                    </View>

                    <View style={styles.dashboardExpenses}>
                        <View style={styles.graphLabel}>
                            <View
                                style={[
                                    styles.graphLabelIcon,
                                    styles.graphLabelIconSpendings
                                ]}
                            />
                            <Text style={styles.dashboardHeadingText}>
                                SPENDINGS
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.dashboardAmountText}>
                                {functions.formatCurrency(
                                    expensesResult.total,
                                    this.props.selectedCurrency.symbol
                                )}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    getCategoryList() {}
}

const styles = {
    main: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    dashboardInfo: {
        flex: 1
    },
    dashboardIncome: {
        flex: 1,
        alignItems: 'flex-start'
    },
    dashboardExpenses: {
        flex: 1,
        alignItems: 'flex-end'
    },
    dashboardHeadingText: {
        color: '#fff',
        fontSize: 18
    },
    dashboardAmountText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10
    },
    graphLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    graphLabelIcon: {
        width: 18,
        height: 18
    },
    graphLabelIconIncome: {
        marginLeft: 10,
        backgroundColor: 'green'
    },
    graphLabelIconSpendings: {
        marginRight: 10,
        backgroundColor: 'red'
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default withNavigation(connect(mapStateToProps)(OverviewPage))
