import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './MainPage.scss'
import { withNavigation } from 'react-navigation'
import CategoryBox from '../Categories/CategoryBox'
import { categories } from '../../globals'

export class MainPage extends Component {
    render() {
        return (
            <View>
                <Text style={styles.main__heading}>{this.props.heading}</Text>
                <View style={styles.categories}>
                    {Object.keys(categories).map(category => (
                        <CategoryBox
                            key={category}
                            categoryIcon={categories[category].displayIcon}
                            categoryName={categories[category].displayTitle}
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
