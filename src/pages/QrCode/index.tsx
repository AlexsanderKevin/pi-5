import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import messages from '../../utils/messages'

import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import { BarCodeScanner } from 'expo-barcode-scanner'
import isValidToken from '../../middlewares/verifyToken'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function QrCode({navigation}) {
  const [ scanned, setScanned ] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()

      if (status === null) {
        alert(messages.SOLICITAR_PERMISSAO_CAMERA)
      }
      if (status !== 'granted') {
        alert(messages.SEM_PERMISSAO_CAMERA)
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
    const validToken = await isValidToken(token)

    if(validToken){
        try {
          const res = await api.get(`/equipamentos/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            }
          })

          return res.data !== null
        }catch(error){
          console.log(`${messages.ERROR_MESSAGE} ${error.message}`)
          return false
        }
    }else{
      alert(messages.SESSAO_EXPIRADA)
      navigation.navigate('Login')
      throw new Error(messages.TOKEN_EXPIRED)
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
          nonStandard(messages.EQUIPAMENTO_NAO_CADASTRADO)
        }
        
      }else{
        nonStandard(messages.QRCODE_FORA_DO_PADRAO)
      }
    }catch(error){
      if(error.message !== messages.TOKEN_EXPIRED)
        nonStandard(messages.QRCODE_FORA_DO_PADRAO)
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