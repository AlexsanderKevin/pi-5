import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { ArrowsLeftRight, Eye, PlusCircle, PlusSquare } from 'phosphor-react-native'
import Scroll from '../../components/Scroll/Scroll';
import PageTitle from '../../components/PageTitle/PageTitle'
import InfoCard from './InfoCard';
import MovimentationList from './MovimentationList';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Details({ navigation, route }) {
  const { nome, id_equipamento } = route.params.equipamento

  const redirectToMovimentationForm = () => {
    AsyncStorage.setItem('id_equipamento', id_equipamento.toString())
    AsyncStorage.setItem('nome_equipamento', nome)
    navigation.navigate("MovimentForm")
  }

  return (
    <View style={styles.container}>
      <Header/>
      <Scroll>
        <PageTitle
          title={'Detalhes'}
          icon={<Eye color={'#ffffff50'}/>}
        >{ null }</PageTitle>

        <Text style={styles.equipmentTitle}>{ nome }</Text>
        <View style={styles.titleDivisor}/>

        <InfoCard equipment={route.params.equipamento}/>

        <View style={styles.historyHeader}>
          <View style={styles.historyHeaderDiv}>
            <ArrowsLeftRight style={styles.historyTitle}/>
            <Text style={styles.historyTitle}>Histórico</Text>
          </View>
          <TouchableOpacity onPress={redirectToMovimentationForm}>
            <PlusCircle color='#F0865B' />
          </TouchableOpacity>
        </View>

        <MovimentationList id={id_equipamento}/>
      </Scroll>
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
  equipmentTitle: {
    color: '#ffffff',
    fontSize: 32,
    fontFamily: 'Times New Roman',
  },
  titleDivisor: {
    backgroundColor: '#E46262',
    height: 6,
    width: 60,
    marginTop: 5,
    borderRadius: 5,
  },
  historyHeader: {
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between'
  },
  historyTitle: {
    fontSize: 25,
    fontFamily: 'Times New Roman',
    color: '#ffffff',
  },
  historyHeaderDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  }
});