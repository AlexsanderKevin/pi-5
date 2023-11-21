import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import {Text, Button} from "@rneui/themed"
import { useEffect,useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../services/api'
import * as SecureStore from 'expo-secure-store'
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Scroll from "../../components/Scroll/Scroll";
import { ListMagnifyingGlass } from "phosphor-react-native";
import ButtonMain from "../../components/ButtonMain/ButtonMain";

export default function Home({navigation}){
    const [equipamento, setEquipamentos] = useState([])

    useEffect(()=>{
        api.get('/equipamentos')
        .then((res) => {setEquipamentos(res.data)})
        .catch((error) => {console.log(error.message)})
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
                <View style={styles.pageTitle}>
                    <ListMagnifyingGlass color="white"/>
                    <Text style={styles.titleText}>Recentes</Text>
                </View>
                {
                    equipamento.length<=0 &&(
                        <Text>Nenhum produto encontrado</Text>
                    )
                }
                <View style={styles.list}>
                    <View style={styles.listHeader} > 
                        <Text style={styles.listHeaderLabel}> Id </Text>
                        <Text style={styles.listHeaderText}> Equipamento </Text>
                    </View>
                    { equipamento.map((equipamento) => (
                        <TouchableOpacity 
                            style={styles.listItem} 
                            key={equipamento.id_equipamento} 
                            onPress={()=>{ navigation.navigate("Equipamento",{equipamento})
                        }}> 
                            <Text style={styles.itemLabel}>{equipamento.id_equipamento}</Text>
                            <Text style={styles.itemText}>{equipamento.descricao}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <ButtonMain  onPress={sair}>Sair</ButtonMain>
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
    pageTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginTop: 30,
        marginBottom: 15
    },
    titleText: {
        color: 'white',
        fontSize: 20,
    },
    titleInput: {
        marginTop: 5,
        fontSize: 17,
        color: '#FFF',
        paddingBottom: .5
    },
    listItem: {
        padding: 20,
        fontSize: 17,
        color: '#FFF',
        borderTopColor: '#282828',
        borderRightColor: '#282828',
        borderLeftColor: '#282828',
        backgroundColor: '#282828',
        borderWidth: 1,
        borderBottomColor: '#ffffff20',
        display: 'flex',
        flexDirection: 'row',
        gap: 20
    },
    list: {
        borderRadius: 10,
        backgroundColor: '#282828',
        marginBottom: 30,
        paddingBottom: 10,
        borderColor: '#ffffff20',
        borderWidth: 1,
    },
    itemLabel: {
        backgroundColor: '#282828',
        color: '#FFF',
        fontWeight: 'bold',
        width: 30,
    },
    itemText: {
        backgroundColor: '#282828',
        color: '#FFF',
    },
    listHeaderLabel: {
        color: '#FFF',
        fontWeight: 'bold',
        width: 30,
    },
    listHeader: {
        padding: 20,
        fontSize: 17,
        color: '#FFF',
        borderTopColor: '#ffffff15',
        borderRightColor: '#ffffff15',
        borderLeftColor: '#ffffff15',
        backgroundColor: '#ffffff15',
        borderWidth: 1,
        borderBottomColor: '#ffffff15',
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    listHeaderText: {
        color: '#FFF',
        fontWeight: 'bold',
    }
  });
