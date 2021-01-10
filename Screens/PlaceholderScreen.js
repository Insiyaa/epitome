import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Text } from "react-native";

export default function NotifScreen(props) {
  return (
    <View style={styles.container}>
    <Text>Placeholder screen</Text>
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

