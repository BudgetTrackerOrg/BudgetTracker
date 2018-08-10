import React from 'react'
import { TouchableHighlight, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Field.scss'

const CancelButton = props => {
    return (
        <TouchableHighlight
            onPress={props.onPress}
            style={styles.cancel__button}
        >
            <View style={styles.container}>
                <Icon name="chevron-left" size={15} />
                <Text style={styles.cancel__text}>{props.buttonText}</Text>
            </View>
        </TouchableHighlight>
    )
}

export default CancelButton
