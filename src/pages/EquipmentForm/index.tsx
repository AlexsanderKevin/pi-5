import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import api from '../../services/api'
import isValidToken from '../../middlewares/verifyToken'
import messages from '../../utils/messages'

import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Scroll from '../../components/Scroll/Scroll'
import ButtonMain from '../../components/ButtonMain/ButtonMain'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ListPlus } from 'phosphor-react-native'
import PickerComponent from '../../components/PickerComponent/PickerComponent'

export default function EquipmentForm({ navigation }) {
    const navigate = useNavigation()

    const [ nome, setNome ] = useState('')
    const [ sap, setSap ] = useState('')
    const [ tipo, setTipo ] = useState('')
    const [ descricao, setDescricao ] = useState('')
    const [ unidade_medida, setUnidadeMedida ] = useState('')
    const [ prioridade, setPrioridade ] = useState('')
    const [ tipoList, setTipoList ] = useState([])

    const getTipoList = () => {
        SecureStore.getItemAsync('token').then(async token => {
        const validToken = await isValidToken(token)

        if (validToken) {
            api.get(`/tipos`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            }
            })
            .then((res) => {
                setTipoList(res.data.map(item => {
                    return { label: item.nome, index: item.id_tipo }
                }))
            })
            .catch((error) => console.log(error.message))
        }else{
            alert(messages.SESSAO_EXPIRADA)
            navigation.navigate('Login')
        }
        })
    }

    useEffect(() => {
        getTipoList()
    }, [])

    const postEquipment = async () => {
        const token = await SecureStore.getItemAsync('token')
        const validToken = await isValidToken(token)

        if(validToken){
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
            alert(messages.SESSAO_EXPIRADA)
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.container}>
            <Header/>
            <Scroll >
                <PageTitle
                    title={'Adicionar'}
                    icon={<ListPlus color={'#ffffff50'}/>}
                >{ null }</PageTitle>
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

                <PickerComponent
                    label='Tipo'
                    items={tipoList}
                    value={tipo}
                    onChangeValue={(itemIndex, itemLabel) => setTipo(itemIndex) }
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