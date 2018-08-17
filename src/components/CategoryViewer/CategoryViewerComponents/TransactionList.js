import React from 'react'
import { ScrollView, StyleSheet, Platform, Text, View } from 'react-native'

export default props => {
    return (
        <ScrollView style={styles.main} bounces={true}>
            {props.children.length > 0 ? (
                props.children
            ) : (
                <Text style={{ textAlign: 'center' }}>
                    No Transactions added
                </Text>
            )}
            {/* using this view to add space at the end of the list */}
            <View style={{ height: 50 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#f4f4f4',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: 0.5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 1,
                shadowRadius: 1
            },
            android: {
                elevation: 2
            }
        })
    }
})
