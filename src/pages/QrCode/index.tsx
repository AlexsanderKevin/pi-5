import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';

export default function QrCode({ navigation }) {

  return (
    <View style={styles.container}>
      <Header/>
      <View>
        <Text>Qr Code</Text>
        <Text>{"{ Camera }"}</Text>
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
  camera: {

  }
});

