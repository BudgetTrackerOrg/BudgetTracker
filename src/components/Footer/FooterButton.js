import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const FooterButton = props => {
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor="white">
            <View style={styles.button}>
                <View style={styles.innerView}>
                    <Icon
                        name={props.icon}
                        size={30}
                        style={{ ...styles.color, ...props.iconStyle }}
                    />
                    {/* <Text style={styles.color}>{props.title}</Text> */}
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default FooterButton

const styles = {
    button: {
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    color: {
        color: '#EEE'
    }
}
