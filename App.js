import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function App() {

    console.log(Platform.OS);
    console.log(window.process);

    if (Platform.OS == "web") {
        if (navigator.userAgent.toLowerCase().indexOf('electron/') > -1) {
            const { ipcRenderer } = window.require('electron');

            //Synchronous message emmiter and handler
            ipcRenderer.sendSync('synchronous-message', 'sync ping')

            //Async message sender
            ipcRenderer.send('asynchronous-message', 'async ping')
        }
    }

    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
