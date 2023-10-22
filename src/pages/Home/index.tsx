import { StyleSheet, ScrollView, View } from "react-native";
import {Text, Button} from "@rneui/themed"
import { useEffect,useState } from "react"
import axiosConfig from "../../../config/axios";
import { Avatar, Divider, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'

export default function Home({navigation}){
    const [equipamento, setEquipamentos] = useState([])
    const [nomeUser, setNomeUser] = useState('')

    useEffect(()=>{
        axiosConfig.get('equipamento').then((resposta)=>{
            setEquipamentos(resposta.data.equipamento)
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
        <View style={styles.container}>
            <ScrollView style={styles.containerScrollView}>
                <Text>recentes</Text>
                {
                    equipamento.length<=0 &&(
                        <Text>Nenhum produto encontrado</Text>
                    )
                }
                    {
                        equipamento.map((equipamento) => (
                            <ListItem style={styles.list} key={equipamento.id} onPress={()=>{
                                navigation.navigate("Equipamento",{equipamento})
                            }}> 
                                <ListItemContent>
                                    <ListItemTitle>
                                        {equipamento.id}
                                    </ListItemTitle>
                                    <ListItemSubtitle>
                                        ${equipamento.descricao}
                                    </ListItemSubtitle>
                                </ListItemContent>
                            </ListItem>
                        ))
                    }
                <Divider/>
                <Button  title='Sair' onPress={sair}></Button>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#353535'
    },
    containerScrollView: {

    },
    titleInput: {
        marginTop: 5,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5
    },
    list: {
        marginBottom: 10,
        padding: 5,
        borderRadius: 5,
        fontSize: 17,
        color: '#FFF',
        borderColor: 'white',
        borderWidth: 1
    },
  });
