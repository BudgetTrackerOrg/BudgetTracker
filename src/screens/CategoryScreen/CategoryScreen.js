import React from 'react'
import { ContentViewer } from '../../components'
import { Text, Button, View } from 'react-native'
import styles from './CategoryScreen.scss'
import LinearGradient from 'react-native-linear-gradient'
import { addTransaction } from '../../store/actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CategoryScreen extends React.Component {
    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1.0 }}
                colors={['#5A33C9', '#923AD1']}
                style={styles.container}
            >
                <ContentViewer backButton={true}>
                    <Text>AY</Text>
                </ContentViewer>
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
)(CategoryScreen)
