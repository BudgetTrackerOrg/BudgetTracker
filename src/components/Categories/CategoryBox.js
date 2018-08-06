import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './CategoryBox.scss'
import { createStackNavigator } from 'react-navigation'
export class CategoryBox extends Component {
    render() {
        return (
            <View style={styles.categories}>
                <TouchableHighlight
                    underlayColor="#d2d1e2"
                    style={styles.categories__touchableArea}
                    onPress={this.props.onPress}
                >
                    <Icon
                        style={styles.categories__icon}
                        name={this.props.categoryIcon}
                        size={this.props.categoryIconSize}
                        color={this.props.categoryIconColor}
                    />
                </TouchableHighlight>

                <View style={styles.categories__title}>
                    <Text style={styles.categories__text}>
                        {this.props.categoryName}
                    </Text>
                </View>
            </View>
        )
    }
}

Icon.defaultProps = {
    name: 'question-circle',
    size: 35,
    color: '#5A33C9'
}

CategoryBox.defaultProps = {
    percentage: 50,
    percentageColor: 'blue'
}

export default CategoryBox
