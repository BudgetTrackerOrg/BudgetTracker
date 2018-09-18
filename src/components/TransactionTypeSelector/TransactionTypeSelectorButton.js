import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, TouchableOpacity, Text } from 'react-native'

const TransactionTypeSelector = props => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.onClick(props.value)
            }}
            style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
        >
            <Icon
                name={props.icon}
                size={40}
                color={props.selected ? props.color : '#aaa'}
                style={{ marginTop: 10 }}
            />
            <Text style={{ marginBottom: 10 }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default TransactionTypeSelector
