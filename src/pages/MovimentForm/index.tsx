import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native'
import api from '../../services/api'
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'

import { useNavigation } from '@react-navigation/native'
import { Divider } from '@rneui/base';

export default function MovimentForm({navigation}) {
    const navigate = useNavigation()


    const [ status, setStatus ] = useState('')
    const [ zona, setZona ] = useState('')
    const [ quantidade, setQuantidade ] = useState('')
    const [ observacao, setObservacao ] = useState('')

    const [ nome, setNome ] = useState('')
    const [ sap, setSap ] = useState('')
    const [ tipo, setTipo ] = useState('')
    const [ descricao, setDescricao ] = useState('')
    const [ unidade_medida, setUnidadeMedida ] = useState('')
    const [ prioridade, setPrioridade ] = useState('')


    async function sair(){
        await SecureStore.deleteItemAsync('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }

    const postMoviment = (body) => {
        api.post('/movimentacoes')
        .then((res) => {console.log(res)})
        .catch((error) => {console.log(error.message)})
        /*const url = `http://45.190.111.28:3001/movimentacoes`
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXZpZEBlbWFpbC5jb20uYnIiLCJsb2dpbiI6ImRhdmlkIiwiaWF0IjoxNjk3OTQxMjA5LCJleHAiOjE2OTc5NDQ4MDl9.VRA6uwJwmL3_kcoNLbWZurGHlV9FfQis8YQWW0T8pEY'
            },
            body: JSON.stringify(body)
        })
        .then(response => console.log(response.json()))
        .catch(error => console.error('Erro:', error.message))*/
    }


    const handleSubmit = () => {
        const body = {
            //id_equipamento,
            id_zona: zona,
            //id_responsavel,
            //data_entrega,
            //data_saida,
            status,
            quantidade,
            observacao
        }
        postMoviment(body)
    }

    // const handleSubmit1 = () => {
    //     const body = {
    //         //id_equipamento,
    //         id_zona: zona,
    //         //id_responsavel,
    //         //data_entrega,
    //         //data_saida,
    //         status,
    //         quantidade,
    //         observacao
    //     }
    //     putMoviment(body)
    // }

    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>Status</Text>
            <TextInput
                style={styles.input}
                value={status}
                onChangeText={setStatus}
                placeholder='Em andamento'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Zona</Text>
            <TextInput
                style={styles.input}
                value={zona}
                onChangeText={setZona}
                placeholder='Armario 1'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Quantidade</Text>
            <TextInput
                style={styles.input}
                value={quantidade}
                onChangeText={setQuantidade}
                placeholder='1'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Observacao</Text>
            <TextInput
                style={styles.inputObs}
                value={observacao}
                onChangeText={setObservacao}
                placeholder='fulano@email.com'
                placeholderTextColor="#848484"
            />

            <TouchableOpacity style={styles.buttonMover} onPress={handleSubmit}>
                <Text style={styles.titleButtonMover}> Mover </Text>
            </TouchableOpacity>

            <Divider/>
                <Button  title='Sair' onPress={sair}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#353535'
    },
    titleInput: {
        marginTop: 5,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5
    },
    input: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        fontSize: 17,
        color: '#FFF',
        borderColor: 'white',
        borderWidth: 1
    },
    inputObs: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        height: 120,
        fontSize: 17,
        
        color: '#FFF',
        borderColor: 'white',
        borderWidth: 1
    },
    buttonMover: {
        marginTop: 10,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0865B'
    },
    titleButtonMover: {
        color: '#FFF',
        fontSize: 17
    }
})