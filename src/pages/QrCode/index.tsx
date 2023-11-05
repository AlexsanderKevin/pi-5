import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import { BarCodeScanner } from 'expo-barcode-scanner'

import { 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  View, 
  Text 
} from 'react-native'

export default function QrCode({navigation}) {
  const [ hasPermission, setHasPermission ] = useState(null)
  const [ scanned, setScanned ] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    alert(`Código QRCode tipo: ${type}, dados: ${data} escaneado`)
    //TODO FUNCTION INSERT MOVEMENT 
  }

  if (hasPermission === null) {
    alert(`Para utilizar esta função, conceda permissão de acesso a câmera nas configurações do seu smartphone.`)
  }
  if (!hasPermission) {
    alert(`Sem permissão de acesso à câmera!`)
  }

  return (
    <View style={styles.container}>
      <Header/>
      <View>
        <Text>Qr Code</Text>
        <Text>{"{ Camera }"}</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
      <Footer navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#353535',
    justifyContent: 'center'
  },
  camera: {
    height: '85%',
    width: '100%',
    top: 30
  }
})