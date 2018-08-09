import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'
import { functions } from '../../../globals'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default props => {
    return (
        <View style={styles.main}>
            <TouchableOpacity onPress={props.backButtonOnPress}>
                <Text
                    style={{
                        color: 'white',
                        padding: 20
                    }}
                >
                    <Icon name={'arrow-left'} size={20} color={'white'} />
                </Text>
            </TouchableOpacity>
            <Text style={styles.categoryTitle}>{props.categoryTitle}</Text>
            <Text style={styles.totalAmount}>
                {functions.formatCurrency(props.totalAmount)}
            </Text>
        </View>
    )
}

var { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
    main: {
        flex: 1,
        width,
        height,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'center'
    },
    totalAmount: {
        fontSize: 35,
        textAlign: 'center',
        color: 'white'
    },
    categoryTitle: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    }
})
