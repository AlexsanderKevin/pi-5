import { StyleSheet, ScrollView, View } from "react-native";
import {Text, Button} from "@rneui/themed"
import { useEffect,useState } from "react"
import { Avatar, Divider, ListItem } from "@rneui/base";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";

export default function Home({navigation}){
    const [equipamento, setEquipamentos] = useState([])
    const [nomeUser, setNomeUser] = useState('')

    useEffect(()=>{
        api.get('/equipamentos')
        .then((res) => {setEquipamentos(res.data)})
        .catch((error) => {console.log(error.message)})

        /*AsyncStorage.getItem('user')
        .then((user)=>{
            setNomeUser(user)
        })*/
    },[])

    async function sair(){
        await SecureStore.deleteItemAsync('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }
    return(
        <View style={styles.container}>
            <Header/>
            <Scroll>
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
                                // navigation.navigate("Equipamento")
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
            </Scroll>
            <Footer navigation={navigation}/>
        </View>
    );
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
