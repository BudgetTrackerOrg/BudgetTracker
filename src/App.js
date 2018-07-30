import React from 'react'
import styles from './styles/App.scss'
import { Footer, ContentViewer, FooterButton } from './components'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { addTransaction } from './store/actions/index';

class App extends React.Component {
    // clicked = () => {
    //     console.log(this)
    //     alert(this.props.userID)
    // }
    render() {
        return (
            <LinearGradient
                colors={['#4F4366', '#676785']}
                style={styles.container}
            >
                <ContentViewer />
                <Footer>
                    <FooterButton
                        // onPress={this.clicked}
                        onPress={() => this.props.addTransaction(this.props.userID)}
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
    return {
        // keys to be accessed as props
        userID: state.main.id
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ addTransaction }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
