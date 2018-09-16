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
                <View style={styles.main}>
                    <Text>TESTTESTT</Text>
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
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default withNavigation(connect(mapStateToProps)(OverviewPage))
