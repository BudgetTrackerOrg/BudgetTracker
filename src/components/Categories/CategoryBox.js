import React, { Component } from 'react'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import styles from '../../styles/App.scss'

export class CategoryBox extends Component {
    render() {
        return (
            <LinearGradient
                style={styles.categories__icon}
                colors={['#5e5e7c', '#737396']}
            >
                <Icon
                    name={this.props.categoryIcon}
                    size={60}
                    // This sets the default colour to white if no value is specified. I will try to shorten this later somehow
                    color={
                        this.props.categoryIconColor
                            ? this.props.categoryIconColor
                            : '#eee'
                    }
                />
                <Text style={styles.categories__text}>
                    {this.props.categoryName}
                </Text>
            </LinearGradient>
        )
    }
}

export default CategoryBox
