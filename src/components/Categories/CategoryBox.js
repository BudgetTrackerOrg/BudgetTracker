import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import styles from './CategoryBox.scss'

export class CategoryBox extends Component {
    render() {
        const percentageBarStyles = {
            height: 5,
            width: this.props.percentage + '%',
            borderRadius: 2,
            backgroundColor: this.props.percentageColor,
            justifyContent: 'center',
            alignItems: 'center'
        }
        return (
            <View style={styles.categories__icon}>
                {/* TODO: figure out drop shawdow, without the blubble effect which happens when you do elevation */}
                <View style={styles.view}>
                    <View style={percentageBarStyles} />
                </View>

                <View style={styles.view}>
                    <Text style={styles.categories__text}>
                        {this.props.categoryName}
                    </Text>
                </View>

                <View style={styles.view__icon}>
                    <Icon
                        name={this.props.categoryIcon}
                        size={this.props.categoryIconSize}
                        color={this.props.categoryIconColor}
                    />
                </View>
            </View>
        )
    }
}

Icon.defaultProps = {
    name: 'question-circle',
    size: 20,
    color: '#fff'
}

CategoryBox.defaultProps = {
    percentage: 50,
    percentageColor: 'blue'
}

export default CategoryBox
