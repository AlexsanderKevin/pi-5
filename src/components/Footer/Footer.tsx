import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('EquipmentForm')}>
        <Text style={styles.link}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
        <Text style={styles.link}>QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: '#ffffff',
    backgroundColor: '#282828',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  link: {
    color: '#ffffff',
    opacity: .54,
    padding: 15
  }
})
