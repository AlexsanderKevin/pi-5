import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'

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

    const id_equipamento = 3;
    
    const postMoviment = () => {
        let id_responsavel

        SecureStore.getItemAsync('id_usuario')
        .then((id_usuario)=>{
            id_responsavel = id_usuario
        })

        SecureStore.getItemAsync('token')
        .then((token) => {
            console.log(`responsavel: ${id_responsavel}`)
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