import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import styles from './CategoriesPage.scss'
import { withNavigation } from 'react-navigation'
import CategoryBox from '../Categories/CategoryBox'
import { categories, functions } from '../../globals'
import Icon from 'react-native-vector-icons/FontAwesome'

export class CategoriesPage extends Component {
    render() {
        let expensesResult = functions.getExpenseResult(this.props.expenses)
        let incomeResult = functions.getExpenseResult(this.props.income)

        let totalResult = incomeResult.total - expensesResult.total

        return (
            <View>
                <Text style={styles.main__subheading}>TOTAL SPENDING</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={styles.main__heading}
                    >
                        {functions.formatCurrency(
                            totalResult,
                            this.props.selectedCurrency.symbol
                        )}
                    </Text>
                </View>
                <View style={styles.categories}>
                    {Object.keys(categories).map(category => (
                        <CategoryBox
                            key={category}
                            categoryIcon={categories[category].displayIcon}
                            categoryName={categories[category].displayTitle}
                            percentageColor={categories[category].color}
                            percentage={
                                expensesResult.categories[category]
                                    ? expensesResult.categories[category]
                                          .percentage
                                    : 0
                            }
                            onPress={() => {
                                this.props.navigation.navigate('Category', {
                                    category,
                                    expenses: this.props.expenses,
                                    income: this.props.income
                                })
                            }}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { selectedCurrency: state.main.selectedCurrency }
}

export default withNavigation(connect(mapStateToProps)(CategoriesPage))
