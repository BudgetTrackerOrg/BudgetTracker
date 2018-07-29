import React from 'react'
import styles from './styles/App.scss'
import { Footer, ContentViewer, FooterButton } from './components'
import LinearGradient from 'react-native-linear-gradient'

export default class App extends React.Component {
    clicked() {
        alert('AHAHAHA')
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
