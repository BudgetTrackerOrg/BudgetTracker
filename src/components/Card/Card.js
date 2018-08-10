import React from 'react'
import { View, Platform } from 'react-native'

export default props => {
    return (
        <View
            style={{
                ...props.style,
                backgroundColor: '#fff',
                borderRadius: 10,
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
            }}
        >
            {props.children}
        </View>
    )
}
