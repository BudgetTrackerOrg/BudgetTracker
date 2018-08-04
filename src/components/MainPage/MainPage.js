import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from './MainPage.scss'
import { withNavigation } from 'react-navigation'
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
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'housing'
                            })
                        }}
                    />
                    <CategoryBox
                        categoryIcon="car"
                        categoryName="Transportation"
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'transportation'
                            })
                        }}
                    />
                    <CategoryBox
                        categoryIcon="cookie"
                        categoryName="Food"
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'food'
                            })
                        }}
                    />
                    <CategoryBox
                        categoryIcon="credit-card"
                        categoryName="Bills"
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'bills'
                            })
                        }}
                    />
                    <CategoryBox
                        categoryIcon="film"
                        categoryName="Entertainment"
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'entertainment'
                            })
                        }}
                    />

                    <CategoryBox
                        categoryIcon="ellipsis-h"
                        categoryName="Other"
                        onPress={() => {
                            this.props.navigation.navigate('Category', {
                                category: 'other'
                            })
                        }}
                    />
                </View>
            </View>
        )
    }
}

export default withNavigation(MainPage)
