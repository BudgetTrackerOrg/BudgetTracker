import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './CategoriesPage.scss'
import { withNavigation } from 'react-navigation'
import CategoryBox from '../Categories/CategoryBox'
import { categories, functions } from '../../globals'

export class CategoriesPage extends Component {
    render() {
        let expensesResult = functions.getExpenseResult(this.props.expenses)

        return (
            <View>
                <Text style={styles.main__subheading}>Total Spending</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        adjustsFontSizeToFit
                        numberOfLines={1}
                        style={styles.main__heading}
                    >
                        {functions.formatCurrency(expensesResult.total)}
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
                                    category
                                })
                            }}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

export default withNavigation(CategoriesPage)
