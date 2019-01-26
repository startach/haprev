import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const Button = ({ color, onPress, label }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.button, { backgroundColor: color }]}
  >
    <Text style={styles.buttonLabel}>{label.toUpperCase()}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 4,
    margin: 12,
    width: "80%"
  },
  buttonLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    padding: 12
  }
});