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

  const login =(username,password) =>{
    api.get(`login`,{
      //username,password
    }).then(res=> {
      let userInfo = res.data;
      setUserInfo(userInfo)
      SecureStore.setItemAsync('token','123456')
      AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
      setResultado('Login feito com suecesso')
      navigation.navigate('Home')
      //navigation.navigate('MovimentForm')
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

    if(email == 'admin' && senha == '1234'){
      SecureStore.setItemAsync('token','123456')
      AsyncStorage.setItem('user','Administrador')
      
      setResultado('Login feito com suecesso')
      navigation.navigate('Home')
      //navigation.navigate('MovimentForm')
    } else {
      setResultado('Login ou senha inválidos!')
    }
  }

  useEffect(()=>{
    SecureStore.getItemAsync('token')
    .then((token)=>{
      if(token!=null){
        navigation.navigate('Home')
        //navigation.navigate('MovimentForm')
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
