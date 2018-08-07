import React, { Component } from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './Field.scss'

export default class FormButton extends Component {
    render() {
        return (
            <TouchableHighlight
                onPress={this.props.onPress}
                style={[
                    styles.input,
                    styles.input__field,
                    styles.input__button
                ]}
            >
                <Text style={styles.input__button_text}>
                    {this.props.buttonText}
                </Text>
            </TouchableHighlight>
        )
    }
}
