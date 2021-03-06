import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const CancelButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={props.style}>
            <Text
                style={{
                    color: 'white',
                    padding: 20
                }}
            >
                <Icon
                    name={'arrow-left'}
                    size={20}
                    color={props.iconColor ? props.iconColor : 'white'}
                />
            </Text>
        </TouchableOpacity>
    )
}

export default CancelButton
