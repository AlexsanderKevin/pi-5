import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import isValidToken from '../../middlewares/verifyToken'
import AsyncStorage from '@react-native-async-storage/async-storage'
import messages from '../../utils/messages'

import { useNavigation } from '@react-navigation/native'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Scroll from '../../components/Scroll/Scroll'
import ButtonMain from '../../components/ButtonMain/ButtonMain'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ArrowsLeftRight } from 'phosphor-react-native'
import PickerComponent from '../../components/PickerComponent/PickerComponent'

export default function MovimentForm({navigation}) {
    const navigate = useNavigation()

    const [ status, setStatus ] = useState('')
    const [ zona, setZona ] = useState(1)
    const [ quantidade, setQuantidade ] = useState('')
    const [ observacao, setObservacao ] = useState('')
    const [ equipamento, setEquipamento ] = useState('')
    const [ zonas, setZonas ] = useState([])

    const getEquipmentName = () => {
        AsyncStorage.getItem('nome_equipamento').then((nome) => {
            if(nome) setEquipamento(nome)
        });
    }

    const getZonas = () => {
        SecureStore.getItemAsync('token').then(async token => {
        const validToken = await isValidToken(token)

        if (validToken) {
            api.get(`/zonas`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : token
            }
            })
            .then((res) => {
                setZonas(res.data.map(item => {
                    return { label: item.nome, index: item.id_zona }
                }))
                console.log(zonas)
            })
            .catch((error) => console.log(error.message))
        }else{
            alert(messages.SESSAO_EXPIRADA)
            navigation.navigate('Login')
        }
        })
    }

    useEffect(() => {
        getEquipmentName()
        getZonas()
    }, [])
    
    const postMoviment = () => {
        let id_responsavel
        let id_equipamento
        let nome_equipamento

        SecureStore.getItemAsync('id_usuario')
        .then((id_usuario)=>{
            if(id_usuario){
                id_responsavel = id_usuario
            }else{
                alert(messages.EFETUAR_LOGIN_ANTES_MOVIMENTACAO)
                navigation.navigate('Login')
            }
            
        })

        AsyncStorage.getItem('id_equipamento').then((id) => {
            if(id){
                id_equipamento = id
            }else{
                alert(messages.QRCODE_FORA_DO_PADRAO)
                navigation.navigate('Home')
            }
        });

        AsyncStorage.getItem('nome_equipamento').then((nome) => {
            if(nome){
                nome_equipamento = nome
            }
        });

        SecureStore.getItemAsync('token')
        .then(async (token) => {
            const validToken = await isValidToken(token)

            if(validToken && id_responsavel !== null){
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
                alert(messages.SESSAO_EXPIRADA)
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.container}>
            <Header/>
            <Scroll>
                <PageTitle
                    title={'Movimentar'}
                    icon={<ArrowsLeftRight color={'#ffffff50'}/>}
                >
                    { equipamento } 
                </PageTitle>
                <Input
                    label={'Status'}
                    value={status}
                    onChangeText={setStatus}
                    placeholder='Em andamento'
                />

                <PickerComponent
                    label='Zona'
                    items={zonas}
                    value={zona}
                    onChangeValue={(itemIndex, itemLabel) => setZona(itemIndex) }
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
    },
})