import React, { Component } from 'react'
import { Animated } from 'react-native'

let formHidden = true

class Popup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bounceValue: new Animated.Value(1000)
        }
    }
    openForm() {
        let toValue = 100

        if (formHidden) toValue = 0

        Animated.spring(this.state.bounceValue, {
            toValue: toValue,
            velocity: 3,
            tension: 2,
            friction: 8
        }).start()

        formHidden = !formHidden
    }
    render() {

        let popupDisplay = this.props.popupDisplay

        return (
            <Animated.View
                style={[
                    styles.subView,
                    { transform: [{ translateY: this.state.bounceValue }] }
                ]}
            >
                {popupDisplay}
            </Animated.View>
        )
    }
}

export default Popup
