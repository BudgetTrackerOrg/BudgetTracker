import { Footer, ContentViewer, FooterButton, MainPage } from '../../components'
import React from 'react'
import { Animated, Text } from 'react-native'
import styles from './HomeScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { bindActionCreators } from 'redux'
import { addTransaction } from '../../store/actions'

import { connect } from 'react-redux'



// TESTING ONLY
import Popup from '../../components/Popup/Popup'
import TransactionForm from '../../components/TransactionForm/TransactionForm'



// let formHidden = true

class HomeScreen extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         bounceValue: new Animated.Value(1000)
    //     }
    // }
    gotoCategoryScreen() {
        return () => {
            this.props.navigation.navigate('Category')
        }
    }
    // openForm() {
    //     let toValue = 100

    //     if (formHidden) toValue = 0

    //     Animated.spring(this.state.bounceValue, {
    //         toValue: toValue,
    //         velocity: 3,
    //         tension: 2,
    //         friction: 8
    //     }).start()

    //     formHidden = !formHidden
    // }

    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={['#5A33C9', '#923AD1']}
                style={styles.container}
            >
                <ContentViewer>
                    <MainPage />
                </ContentViewer>
                {/* <Animated.View
                    style={[
                        styles.subView,
                        { transform: [{ translateY: this.state.bounceValue }] }
                    ]}
                >
                    <TransactionForm />
                </Animated.View> */}
                <Popup popupDisplay={<TransactionForm/>} openForm={this.props.openForm()} />
                <Footer>
                    <FooterButton
                        onPress={this.openForm()}
                        //this.props.addTransaction(this.props.userID) // Actions are referenced with -> this.props.actionName
                        title="Add"
                        icon="md-add"
                    />
                </Footer>
            </LinearGradient>
        )
    }
}

const mapStateToProps = state => {
    return {
        // Keys referenced in this file as -> this.props.userID
        userID: state.main.id
    }
}

// mapDispatchToProps is what allows the component to fire off an action
const mapDispatchToProps = dispatch => {
    // Pass the name of the action inside object as first argument of bindActionCreators
    return bindActionCreators({ addTransaction }, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen)
