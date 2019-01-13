import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import styles from './CategoryBox.scss'
import ProgressCircle from 'react-native-progress-circle'
import { colors } from '../../globals'
export class CategoryBox extends Component {
    render() {
        let bgColor = '#fff'
        return (
            <View style={styles.categories}>
                <ProgressCircle
                    percent={this.props.percentage}
                    radius={this.props.radius || 50}
                    borderWidth={8}
                    color={this.props.percentageColor}
                    shadowColor={this.props.shadowColor || bgColor}
                    bgColor={bgColor}
                >
                    <TouchableHighlight
                        underlayColor="#d2d1e2"
                        style={{
                            ...styles.categories__touchableArea,
                            backgroundColor: bgColor
                        }}
                        onPress={
                            this.props.disabled ? () => {} : this.props.onPress
                        }
                    >
                        <Icon
                            style={styles.categories__icon}
                            name={this.props.categoryIcon}
                            size={this.props.categoryIconSize}
                            color={this.props.categoryIconColor}
                        />
                    </TouchableHighlight>
                </ProgressCircle>
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
    color: colors.iconColor
}

CategoryBox.defaultProps = {
    percentage: 0,
    percentageColor: 'blue'
}

export default CategoryBox
