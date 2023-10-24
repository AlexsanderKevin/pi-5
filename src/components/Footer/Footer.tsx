import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { House, ListPlus, QrCode } from 'phosphor-react-native'
import { useRoute } from '@react-navigation/native'

export default function Footer({ navigation }) {
  const route = useRoute()
  const currentRoute = route.name

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => navigation.navigate('EquipmentForm')}
      >
        <ListPlus style={currentRoute === 'EquipmentForm' ? styles.activeLink : styles.linkText} size={25}/>
        <Text style={currentRoute === 'EquipmentForm' ? styles.activeLink : styles.linkText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <House style={currentRoute === 'Home' ? styles.activeLink : styles.linkText} size={25}/>
        <Text style={currentRoute === 'Home' ? styles.activeLink : styles.linkText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton} 
        onPress={() => navigation.navigate('QrCode')}
      >
        <QrCode style={currentRoute === 'QrCode' ? styles.activeLink : styles.linkText} size={25}/>
        <Text style={currentRoute === 'QrCode' ? styles.activeLink : styles.linkText}>QR Code</Text>
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
  linkText: {
    color: '#ffffff',
    opacity: .54,
  },
  linkButton: {
    color: '#ffffff',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeLink: {
    color: '#F0865B',
    opacity: 1
  }
})
