import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';
import Styles from "./scss/Styles.scss";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={Styles.test}>
                    <Text>Hello World</Text>
                </View>
                <TextInput style={{ width: 200 }}></TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});