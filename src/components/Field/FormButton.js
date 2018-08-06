import React, { Component } from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './Field.scss'

export class FormButton extends Component {
    handleSubmit(){
        // alert('haha')
    }
    render() {
        return (
            <TouchableHighlight
                style={styles.input__button}
                onPress={this.handleSubmit.bind(this)}
            >
                <Text style={styles.input__button_text}>
                    {this.props.buttonText}
                </Text>
            </TouchableHighlight>
        )
    }
}

export default FormButton
