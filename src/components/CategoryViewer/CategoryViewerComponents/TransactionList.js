import React from 'react'
import { ScrollView, Platform, FlatList, Text } from 'react-native'

export default props => {
    let data = []

    if (props.onlyExpenses) {
        data = [...props.expenses]
    } else {
        // loop through each array adding them to data object
        Object.keys(props.expenses).forEach(key => {
            data.push(props.expenses[key])
        })

        Object.keys(props.income).forEach(key => {
            data.push(props.income[key])
        })
    }

    let content = (
        <Text style={{ textAlign: 'center' }}>No transactions yet</Text>
    )

    if (data.length > 0) {
        content = (
            <FlatList
                data={data}
                renderItem={props.renderItem}
                extraData={props.extraData}
                keyExtractor={props.keyExtractor}
            />
        )
    }
    return (
        <ScrollView style={styles.main} bounces={false}>
            {content}
        </ScrollView>
    )
}

const styles = {
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
}
