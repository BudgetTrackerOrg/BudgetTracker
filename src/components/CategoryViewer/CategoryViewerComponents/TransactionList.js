import React from 'react'
import { ScrollView, StyleSheet, Dimensions, Text, View } from 'react-native'
var { heightt, width } = Dimensions.get('window')
export default props => {
    return (
        <ScrollView style={styles.main} bounces={true}>
            {props.children}
            {/* using this view to add space at the end of the list */}
            <View
                style={{
                    height: 50
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: 0.5
    }
})
