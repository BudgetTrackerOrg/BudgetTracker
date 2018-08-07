import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './MainPage.scss'
import { withNavigation } from 'react-navigation'
import CategoryBox from '../Categories/CategoryBox'
import { categories, functions } from '../../globals'

export class MainPage extends Component {
    render() {
        let expensesResult = functions.getExpenseResult(this.props.expenses)
        console.log(expensesResult)
        return (
            <View>
                <Text style={styles.main__subheading}>Total Spending</Text>
                <Text style={styles.main__heading}>
                    {functions.formatCurreny(expensesResult.total)}
                </Text>
                <View style={styles.categories}>
                    {Object.keys(categories).map(category => (
                        <CategoryBox
                            key={category}
                            categoryIcon={categories[category].displayIcon}
                            categoryName={categories[category].displayTitle}
                            percentageColor={categories[category].color}
                            disabled={
                                expensesResult.categories[category] == undefined
                            }
                            percentage={
                                expensesResult.categories[category] != undefined
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

export default withNavigation(MainPage)
