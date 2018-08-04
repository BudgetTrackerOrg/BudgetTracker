import React from 'react'
import { View, StyleSheet } from 'react-native'
import {
    CategorySummary,
    TransactionList,
    TransactionItem
} from './CategoryViewerComponents'

export default props => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <CategorySummary />
            </View>
            <View style={{ flex: 3 }}>
                <TransactionList>
                    <TransactionItem />
                </TransactionList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
