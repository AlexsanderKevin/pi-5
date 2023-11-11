import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Scroll from '../../components/Scroll/Scroll'
import ButtonMain from '../../components/ButtonMain/ButtonMain'

export default function MovimentForm({navigation}) {
    const navigate = useNavigation()

    const [ status, setStatus ] = useState('')
    const [ zona, setZona ] = useState('')
    const [ quantidade, setQuantidade ] = useState('')
    const [ observacao, setObservacao ] = useState('')
    
    const postMoviment = () => {
        let id_responsavel
        let id_equipamento
        let nome_equipamento

        SecureStore.getItemAsync('id_usuario')
        .then((id_usuario)=>{
            if(id_usuario){
                id_responsavel = id_usuario
            }else{
                alert(`Você deve efetuar o login antes de realizar uma movimentação no sistema!`)
            }
            
        })

        AsyncStorage.getItem('id_equipamento').then((id) => {
            if(id){
                id_equipamento = id
            }else{
                alert(`Faça a leitura de um QRCode válido!`)
                return
            }
        });

        AsyncStorage.getItem('nome_equipamento').then((nome) => {
            if(nome){
                nome_equipamento = nome
            }
        });

        SecureStore.getItemAsync('token')
        .then((token) => {
            if(token && id_responsavel !== null){
                api.post('/movimentacoes', {
                    id_responsavel: id_responsavel,
                    id_equipamento: id_equipamento,
                    status: status,
                    id_zona: zona,
                    quantidade: quantidade,
                    observacao: observacao
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization : token
                    }
                })
                .then(() => {navigation.navigate('Home')})
                .catch((error) => {console.log(error.message)})
            }else{
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.container}>
            <Header/>
            <Scroll>
                <Input
                    label={'Status'}
                    value={status}
                    onChangeText={setStatus}
                    placeholder='Em andamento'
                />

                <Input
                    label={'Zona'}
                    value={zona}
                    onChangeText={setZona}
                    placeholder='Armario 1'
                />

                <Input
                    label={'Quantidade'}
                    value={quantidade}
                    onChangeText={setQuantidade}
                    placeholder='1'
                />

                <Input
                    label={'Observação'}
                    value={observacao}
                    onChangeText={setObservacao}
                    placeholder='Realizado a troca do componte X'
                />
                <ButtonMain 
                    style={styles.buttonMover} 
                    onPress={postMoviment}
                >
                    <Text>Mover +</Text>
                </ButtonMain>

            </Scroll>
            <Footer navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#353535',
    },
    buttonMover: {
        marginBottom: 100
    },
    titleButtonMover: {
        color: '#FFF',
        fontSize: 17
    }
})