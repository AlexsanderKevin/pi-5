import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
import { Eye } from 'phosphor-react-native'

export default function Details({ navigation }) {
  return (
    <View style={styles.container}>
      <Header/>
      <View>
        <Eye/>
        <Text>Detalhes</Text>
      </View>
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
});
