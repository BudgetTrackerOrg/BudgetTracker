import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <TouchableHighlight
            style={styles.container}
            onPress={props.onPress}
            underlayColor="rgba(255,255,255,0.4)"
        >
            <View style={styles.innerView}>
                <Icon
                    name={props.icon}
                    size={20}
                    color="white"
                    style={{ marginRight: 10 }}
                />
                <Text style={{ color: '#fff' }}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    innerView: {
        alignItems: 'flex-start',
        flexDirection: 'row'
    }
})
