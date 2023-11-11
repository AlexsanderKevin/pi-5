import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import { BarCodeScanner } from 'expo-barcode-scanner'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function QrCode({navigation}) {
  const [ scanned, setScanned ] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      if (status === null) {
        alert(`Para utilizar esta função, conceda permissão de acesso a câmera nas configurações do seu smartphone.`)
      }
      if (status !== 'granted') {
        alert(`Sem permissão de acesso à câmera!`)
      }
    })()
  }, [])

  const nonStandard = (message) => {
    setScanned(false)
    alert(message)
    navigation.navigate('Home')
  }

  async function isValidEquipment(id) {
    const token = await SecureStore.getItemAsync('token')
    if(token){
        try {
          const res = await api.get(`/equipamentos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            }
          })

          return res.data !== null
        }catch(error){
          console.log(`Error message: ${error.message}`)
          return false
        }
    }else{
      navigation.navigate('Login')
    }
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    let valid = false

    setScanned(true)

    try{
      const { id_equipamento, nome } = JSON.parse(data)

      if ( id_equipamento !== undefined && nome !== undefined )
      {
        valid = await isValidEquipment(id_equipamento)

        if(valid) {
          AsyncStorage.setItem('id_equipamento', id_equipamento.toString())
          AsyncStorage.setItem('nome_equipamento', nome)
          navigation.navigate('MovimentForm')
        }else{
          nonStandard(`Este equipamento não está cadastrado no sistema!`)
        }
        
      }else{
        nonStandard(`QRCode fora do padrão!`)
      }
    }catch(error){
      nonStandard(`QRCode fora do padrão!`)
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