import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import styles from './CategoryBox.scss'
export class CategoryBox extends Component {
    render() {
        return (
            <View
                style={{
                    ...styles.categories //ios
                    // borderColor: '#fff',
                    // shadowOpacity: 0.3,
                    // shadowRadius: 2,
                    // shadowOffset: { height: 1, width: 0 }, //android
                    // elevation: 5
                }}
            >
                <View style={styles.categories__icon}>
                    <Icon
                        name={this.props.categoryIcon}
                        size={this.props.categoryIconSize}
                        color={this.props.categoryIconColor}
                    />
                </View>
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
