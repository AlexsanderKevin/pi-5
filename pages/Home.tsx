import { StyleSheet, ScrollView, View } from "react-native";
import {Text, Button} from "@rneui/themed"
import { useEffect,useState } from "react"
import axiosConfig from "../config/axios";
import { Avatar, Divider, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'

export default function Home({navigation}){
    const [equipamentos, setEquipamentos] = useState([])
    const [nomeUser, setNomeUser] = useState('')

    useEffect(()=>{
        axiosConfig.get('equipamentos').then((resposta)=>{
            setEquipamentos(resposta.data.products)
        })
        .catch(()=>{
            alert('Erro ao conectar')
        })
        AsyncStorage.getItem('user')
        .then((user)=>{
            setNomeUser(user)
        })
    },[])

    async function sair(){
        await SecureStore.deleteItemAsync('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }
    return(
        <ScrollView style={styles.listcontainer}>
            <Text style={styles.titulo}>Recentes</Text>
            {
                equipamentos.length<=0 &&(
                    <Text style={styles.titulo}>Nenhum equipamento encontrado</Text>
                )
            }
                {
                    equipamentos.map((equipamento) => (
                        <ListItem key={equipamento.id} style={styles.list} containerStyle={{ backgroundColor: "#353535" }}> 
                            <ListItemContent >
                                <ListItemTitle style={styles.texto}>
                                    {equipamento.id_equipamento} {equipamento.nome}
                                </ListItemTitle>
                            </ListItemContent>
                        </ListItem>
                    ))
                }
            <Button  title='Sair' onPress={sair}></Button>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#353535',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
    },
    listcontainer:{
        padding: 15,
        backgroundColor: '#353535',
    },
    titulo:{
        marginTop: 5,
        marginLeft: 0,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5,
        alignSelf:'flex-start',
    },
    texto:{
        marginTop: 5,
        marginLeft: 0,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5,
        alignSelf:'flex-start',
    },
    list: {
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
        
    }
});