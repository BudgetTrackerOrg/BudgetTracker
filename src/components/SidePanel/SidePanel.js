import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { List, ListItem } from '../List'

export default props => {
    return (
        <View style={styles.container}>
            <List>
                {props.selectableOptions.map(option => {
                    return (
                        <ListItem
                            key={option.title}
                            title={option.title}
                            onPress={option.onPress}
                            icon={option.icon}
                        />
                    )
                })}
            </List>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#212121'
    }
})
