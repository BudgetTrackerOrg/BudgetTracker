import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './MainPage.scss'

import CategoryBox from '../Categories/CategoryBox'

export class MainPage extends Component {
    render() {
        return (
            <View>
                <Text style={styles.main__heading}>{this.props.heading}</Text>

                <View style={styles.categories}>
                    <CategoryBox
                        categoryIcon="home"
                        categoryName="Housing"
                        percentage={50}
                    />
                    <CategoryBox
                        categoryIcon="car"
                        categoryName="Transportation"
                    />
                    <CategoryBox categoryIcon="cookie" categoryName="Food" />
                    <CategoryBox
                        categoryIcon="credit-card"
                        categoryName="Bills"
                    />
                    <CategoryBox
                        categoryIcon="film"
                        categoryName="Entertainment"
                    />

                    <CategoryBox
                        categoryIcon="ellipsis-h"
                        categoryName="Other"
                    />
                </View>
            </View>
        )
    }
}

export default MainPage
