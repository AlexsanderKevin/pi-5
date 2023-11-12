import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View,Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/themed'
import api from '../../services/api'
import Input from '../../components/Input/Input'
import ButtonMain from '../../components/ButtonMain/ButtonMain'

export default function Login({navigation}) {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [userInfo, setUserInfo] = useState ({});

  const login = (username,password) =>{
    api.post('/login',{
      data: {login: username, senha: password}
    }).then(res=> {
      let { token, id_responsavel } = res.data;
      setUserInfo(username)
      SecureStore.setItemAsync('token', token)
      SecureStore.setItemAsync('id_usuario', id_responsavel.toString())
      AsyncStorage.setItem('user', username)
      setResultado('Login feito com sucesso')
      navigation.navigate('Home')
    }).catch(e => {
      console.log(`falha ao logar ${e}`)
    })
  }

  const [resultado, setResultado] = useState('Digite seus dados')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const logar = () => {

    if(email == '' && senha == ''){
      setResultado('Digite login e senha!!!')
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
