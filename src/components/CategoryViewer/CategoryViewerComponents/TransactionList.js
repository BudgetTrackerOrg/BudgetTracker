import React from 'react'
import { ScrollView, StyleSheet, Dimensions } from 'react-native'

export default props => {
    return <ScrollView style={styles.main}>{props.children}</ScrollView>
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20
    }
})
