import React, { Component } from 'react'
import { View, Text, Platform, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'
import { categories, functions, currencies } from '../../globals'
import { connect } from 'react-redux'

import CategoriesPageStyles from '../CategoriesPage/CategoriesPage.scss'
import Icon from 'react-native-vector-icons/FontAwesome'

const width = Dimensions.get('window')

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
                        <View
                            style={[styles.graphLabel, styles.graphLabelIncome]}
                        >
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
                        <View>
                            <Text
                                style={[
                                    styles.amountText,
                                    styles.amountTextIncome
                                ]}
                            >
                                {functions.formatCurrency(
                                    incomeResult.total,
                                    this.props.selectedCurrency.symbol
                                )}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.dashboardExpenses}>
                        <View
                            style={[
                                styles.graphLabel,
                                styles.graphLabelExpenses
                            ]}
                        >
                            <View
                                style={[
                                    styles.graphLabelIcon,
                                    styles.graphLabelIconExpenses
                                ]}
                            />
                            <Text style={styles.dashboardHeadingText}>
                                EXPENSES
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={[
                                    styles.amountText,
                                    styles.amountTextExpenses
                                ]}
                            >
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
        flex: 1,
        flexDirection: 'row'
    },
    dashboardIncome: {
        width: width / 2,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dashboardExpenses: {
        width: width / 2,
        flex: 1
    },
    dashboardHeadingText: {
        color: '#fff',
        fontSize: 18
    },
    amountText: {
        color: '#fff',
        fontSize: 20,
        marginTop: 10
    },
    amountTextIncome: {
        marginRight: 38
    },
    amountTextExpenses: {
        marginLeft: 38
    },
    graphLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    graphLabelIcon: {
        width: 18,
        height: 18,
        marginLeft: 10,
        marginRight: 10
    },
    graphLabelIconIncome: {
        backgroundColor: 'green',
        justifyContent: 'flex-end'
    },
    graphLabelIconExpenses: {
        backgroundColor: '#af3123'
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default withNavigation(connect(mapStateToProps)(OverviewPage))
