import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, TouchableOpacity } from 'react-native'

const TransactionTypeSelector = props => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.onClick(props.value)
            }}
        >
            <Icon
                name={props.icon}
                size={40}
                color={props.selected ? props.color : '#aaa'}
                style={{ margin: 10 }}
            />
        </TouchableOpacity>
    )
}

export default TransactionTypeSelector
