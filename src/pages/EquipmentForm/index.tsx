import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import api from '../../services/api'

import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Scroll from '../../components/Scroll/Scroll'
import ButtonMain from '../../components/ButtonMain/ButtonMain'

export default function EquipmentForm({ navigation }) {
    const navigate = useNavigation()

    const [ nome, setNome ] = useState('')
    const [ sap, setSap ] = useState('')
    const [ tipo, setTipo ] = useState('')
    const [ descricao, setDescricao ] = useState('')
    const [ unidade_medida, setUnidadeMedida ] = useState('')
    const [ prioridade, setPrioridade ] = useState('')

    const postEquipment = () => {
        SecureStore.getItemAsync('token')
        .then((token) => {
            if(token){
                api.post('/equipamentos', {
                    nome: nome,
                    codigo_sap: sap,
                    id_tipo: tipo,
                    descricao: descricao,
                    unidade_medida: unidade_medida,
                    prioridade: prioridade
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
            <Scroll >
                <Input
                    label={'Nome'}
                    value={nome}
                    onChangeText={setNome}
                    placeholder='Teclado sem fio'
                />

                <Input
                    label={'Código SAP'}
                    value={sap}
                    onChangeText={setSap}
                    placeholder='1234'
                />

                <Input
                    label={'Tipo'}
                    value={tipo}
                    onChangeText={setTipo}
                    placeholder='Periferico'
                />

                <Input
                    label={'Descrição'}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder='Teclado logitech sem fio'
                />

                <Input
                    label={'Unidade de Medida'}
                    value={unidade_medida}
                    onChangeText={setUnidadeMedida}
                    placeholder='Unidade, Kg, etc'
                />

                <Input
                    label={'Prioridade'}
                    value={prioridade}
                    onChangeText={setPrioridade}
                    placeholder='1, 2 ou 3'
                />

                <ButtonMain 
                    style={styles.buttonAdicionar} 
                    onPress={postEquipment}
                >
                    <Text>Adicionar +</Text>
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
    buttonAdicionar: {
        marginBottom: 100
    },
    titleButtonAdicionar: {
        color: '#FFF',
        fontSize: 17
    }
})