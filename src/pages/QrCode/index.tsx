import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer';
// import { Camera } from 'react-native-vision-camera';
// import { useCameraDevice } from 'react-native-vision-camera/lib/typescript/hooks/useCameraDevice';

export default function QrCode({ navigation }) {
  // const device = useCameraDevice('back')

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

