import React from 'react'
import styles from './styles/App.scss'
import { Footer, ContentViewer, FooterButton, MainPage } from './components'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View } from 'react-native'
import { addTransaction } from './store/actions'

class App extends React.Component {
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
                <Footer>
                    <FooterButton
                        onPress={
                            () => this.props.addTransaction(this.props.userID) // Actions are referenced with -> this.props.actionName
                        }
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
)(App)
