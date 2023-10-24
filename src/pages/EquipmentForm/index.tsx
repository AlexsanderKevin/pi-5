import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import api from '../../services/api'

import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/Footer/Footer'

export default function EquipmentForm({ navigation }) {
    const navigate = useNavigation()

    const [ nome, setNome ] = useState('')
    const [ sap, setSap ] = useState('')
    const [ tipo, setTipo ] = useState('')
    const [ descricao, setDescricao ] = useState('')
    const [ unidade_medida, setUnidadeMedida ] = useState('')
    const [ prioridade, setPrioridade ] = useState('')

    const postEquipment = (body) => {
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
                'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJkYXZpZEBlbWFpbC5jb20uYnIiLCJsb2dpbiI6ImRhdmlkIiwiaWF0IjoxNjk4MDI3NDI2LCJleHAiOjE2OTgwMzEwMjZ9.tmO7NBpo2yUun5r-ESOMacc-URuB2-8V_U_XZoa-soo'
            }
        })
        .then((res) => {console.log(res)})
        .catch((error) => {console.log(error.message)})
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleInput}>Nome</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder='Teclado sem fio'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Código SAP</Text>
            <TextInput
                style={styles.input}
                value={sap}
                onChangeText={setSap}
                placeholder='1234'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Tipo</Text>
            <TextInput
                style={styles.input}
                value={tipo}
                onChangeText={setTipo}
                placeholder='Periferico'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Descrição</Text>
            <TextInput
                style={styles.input}
                value={descricao}
                onChangeText={setDescricao}
                placeholder='Teclado logitech sem fio'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Unidade de Medida</Text>
            <TextInput
                style={styles.input}
                value={unidade_medida}
                onChangeText={setUnidadeMedida}
                placeholder='Unidade, Kg, etc'
                placeholderTextColor="#848484"
            />

            <Text style={styles.titleInput}>Prioridade</Text>
            <TextInput
                style={styles.input}
                value={prioridade}
                onChangeText={setPrioridade}
                placeholder='1, 2 ou 3'
                placeholderTextColor="#848484"
            />

            <TouchableOpacity style={styles.buttonAdicionar} onPress={postEquipment}>
                <Text style={styles.titleButtonAdicionar}>Adicionar +</Text>
            </TouchableOpacity>
            <Footer navigation={navigation}/>
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
    buttonAdicionar: {
        marginTop: 10,
        paddingVertical: 10,
        width: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0865B'
    },
    titleButtonAdicionar: {
        color: '#FFF',
        fontSize: 17
    }
})