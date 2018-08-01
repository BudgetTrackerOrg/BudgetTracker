import React, { Component } from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import styles from './CategoryBox.scss'

export class CategoryBox extends Component {
    render() {
        return (
            <LinearGradient
                style={styles.categories__icon}
                colors={['#5e5e7c', '#737396']}
            >
                <Icon
                    name={this.props.categoryIcon}
                    size={this.props.categoryIconSize}
                    color={this.props.categoryIconColor}
                />
                <Text style={styles.categories__text}>
                    {this.props.categoryName}
                </Text>
            </LinearGradient>
        )
    }
}

Icon.defaultProps = {
    name: 'question-circle',
    size: 60,
    color: '#eee'
}

export default CategoryBox
