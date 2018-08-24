import React from 'react'
import { ScrollView, Platform, FlatList } from 'react-native'

export default props => {
    return (
        <ScrollView style={styles.main} bounces={false}>
            <FlatList
                data={props.data}
                renderItem={props.renderItem}
                extraData={props.extraData}
                keyExtractor={props.keyExtractor}
            />
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
