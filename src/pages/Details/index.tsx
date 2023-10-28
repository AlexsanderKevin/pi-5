import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { ArrowsLeftRight, Eye } from 'phosphor-react-native'
import Scroll from '../../components/Scroll/Scroll';
import PageTitle from '../../components/PageTitle/PageTitle'
import InfoCard from './InfoCard';

export default function Details({ navigation, route }) {
  const { nome } = route.params.equipamento

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
          <ArrowsLeftRight style={styles.historyTitle}/>
          <Text style={styles.historyTitle}>Histórico</Text>
        </View>

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
    gap: 10
  },
  historyTitle: {
    fontSize: 25,
    fontFamily: 'Times New Roman',
    color: '#ffffff',
  }
});