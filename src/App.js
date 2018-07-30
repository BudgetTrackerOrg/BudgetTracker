import React from 'react'
import styles from './styles/App.scss'
import { Footer, ContentViewer, FooterButton } from './components'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

class App extends React.Component {
    clicked() {
        console.log(this)
        alert(this.props.userID)
    }
    render() {
        return (
            <LinearGradient
                colors={['#4F4366', '#676785']}
                style={styles.container}
            >
                <ContentViewer />
                <Footer>
                    <FooterButton
                        onPress={this.clicked}
                        title="Add"
                        icon="md-add"
                    />
                </Footer>
            </LinearGradient>
        )
    }
}

// TODO: maping doesn't seem to work
const mapStateToProps = state => {
    console.log(state.main.id)
    return {
        // keys to be accessed as props
        userID: state.main.id
    }
}

export default connect(
    mapStateToProps,
    null
)(App)
