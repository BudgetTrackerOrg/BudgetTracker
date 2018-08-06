import React, { Component } from 'react'
import { TouchableHighlight, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './Field.scss'
import colors from '../../globals/colors'

export class FormButton extends Component {
    handleSubmit() {
        // alert('haha')
    }
    render() {
        return (
            <LinearGradient
                style={[styles.input, styles.input__button]}
                colors={colors.backgroundGradient}
            >
                <TouchableHighlight onPress={this.props.onPress}>
                    <Text style={styles.input__button_text}>
                        {this.props.buttonText}
                    </Text>
                </TouchableHighlight>
            </LinearGradient>
        )
    }
}

export default FormButton
