import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View,Image } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text } from '@rneui/themed'
import api from '../../services/api'

export default function Login({navigation}) {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [userInfo, setUserInfo]=useState ({});

  const login = (username,password) =>{
    api.post('/login',{
      data: {login: username, senha: password}
    }).then(res=> {
      let token = res.data;
      setUserInfo(username)
      SecureStore.setItemAsync('token', token)
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

  useEffect(()=>{
    SecureStore.getItemAsync('token')
    .then((token)=>{
      if(token!=null){
        navigation.navigate('Home')
      }
    })
  },[])

  return (
    <View style={styles.container}>
      <Image style={styles.item} source={require("../../assets/images/logo.png") }resizeMode='contain' />
      <Text style={styles.titleInput}>Email</Text>
      <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='fulano@email.com'
                placeholderTextColor="#848484"
        />

      <Text style={styles.titleInput}>Senha</Text>
      <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                placeholder='******'
                secureTextEntry={true}
                placeholderTextColor="#848484"
        />

        <TouchableOpacity style={styles.buttonLogin} onPress={logar}>
            <Text style={styles.titleButtonLogin}>login</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#353535',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
    },
    titleInput: {
        marginTop: 5,
        marginLeft: 40,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5,
        alignSelf:'flex-start',
    },
    input: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        fontSize: 17,
        color: '#FFF',
        borderColor: 'white',
        borderWidth: 1,
        width: '80%',
    },
    buttonLogin: {
        marginTop: 10,
        paddingVertical: 10,
        width: '40%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0865B'
    },
    titleButtonLogin: {
        color: '#FFF',
        fontSize: 17
    },
    item: {
      aspectRatio:1,
      width: '70%',
      height: 150,
      },
  });
