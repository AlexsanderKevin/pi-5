import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, View,Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import Input from '../../components/Input/Input'
import ButtonMain from '../../components/ButtonMain/ButtonMain'
import messages from '../../utils/messages'
import criptografar from '../../utils/rsa'

export default function Login({navigation}) {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [userInfo, setUserInfo] = useState ({});
  const [resultado, setResultado] = useState(messages.DIGITE_SEUS_DADOS)

  const login = async (username,password) =>{
    api.post('/login',{
      data: {login: username, senha: criptografar(password)}
    }).then(async res=> {
      let { token, id_responsavel } = res.data;
      setUserInfo(username)
      SecureStore.setItemAsync('token', token)
      SecureStore.setItemAsync('id_usuario', id_responsavel.toString())
      AsyncStorage.setItem('user', username)
      setResultado(messages.LOGIN_REALIZADO)
      navigation.navigate('Home')
    }).catch(e => {
      const { message } = e.response.data
      if (message) {
        alert(`${messages.ERROR_TENTE_NOVAMENTE} ${message}`)
      }else {
        alert(`${messages.ERROR_TENTE_NOVAMENTE} ${e} `)
      }
  });
  }

  const logar = async () => {

    if(email == '' && senha == ''){
      setResultado(messages.DIGITE_LOGIN_E_SENHA)
      return
    }

    login(email, senha)
  }

  return (
    <View style={styles.container}>
      <Image style={styles.item} source={require("../../assets/images/logo.png") }resizeMode='contain' />
      <Input
        label='Email'
        value={email}
        onChangeText={setEmail}
        placeholder='fulano@email.com'
      />

      <Input
        label={'Senha'}
        value={senha}
        onChangeText={setSenha}
        placeholder='******'
        secureTextEntry={true}
      />

        <ButtonMain 
          style={styles.buttonLogin} 
          onPress={logar}
        >
          login
        </ButtonMain>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#353535',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
    },
    buttonLogin: {
        width: '50%',
        marginTop: 30
    },
    item: {
      aspectRatio:1,
      width: '70%',
      height: 130,
      marginBottom: 50
      },
  });
