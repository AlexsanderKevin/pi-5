import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import AsyncStorage from '@react-native-async-storage/async-storage'

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

      if (status === null) {
        alert(`Para utilizar esta função, conceda permissão de acesso a câmera nas configurações do seu smartphone.`)
      }
      if (status !== 'granted') {
        alert(`Sem permissão de acesso à câmera!`)
      }
    })()
  }, [])

  const nonStandard = () => {
    setScanned(false)
    alert(`QRCode fora do padrão!`)
    navigation.navigate('Home')
  }

  const handleBarCodeScanned = ({ type, data }) => {
    try{
      const { id_equipamento, nome } = JSON.parse(data)

      if ( id_equipamento !== undefined && nome !== undefined )
      {
        setScanned(true)
        AsyncStorage.setItem('id_equipamento', id_equipamento.toString())
        AsyncStorage.setItem('nome_equipamento', nome)
        navigation.navigate('MovimentForm')
      }else{
        nonStandard()
      }
    }catch(err){
      nonStandard()
    }
  }

  return (
    <View style={styles.container}>
      <Header/>
      <View>
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
    backgroundColor: '#353535',
    justifyContent: 'center'
  },
  camera: {
    height: '94%',
    width: '100%',
    top: 35
  }
})