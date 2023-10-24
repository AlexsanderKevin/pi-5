import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

export default function Header() {
  const navigation = useNavigation();

  const handleGoback = () => {
    if (navigation.canGoBack()) {
      navigation.goBack()
    } else {
      navigation.navigate('login')
    }
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleGoback}
        >
          <ArrowLeft style={styles.linkText} />
          <Text style={styles.linkText}>
            {navigation.canGoBack() ? 'Voltar': 'Sair'}
          </Text>
        </TouchableOpacity>
        <Image style={styles.item} source={require("../../assets/images/logo.png") }resizeMode='contain' />
      </View>
      <View style={styles.headerShadow}>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#ffffff',
    backgroundColor: '#282828',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    paddingTop: 10,
    paddingRight: 10
  },
  headerShadow: {
    height: 60
  },
  linkText: {
    color: '#ffffff',
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  item: {
    height: 30,
    width: 40
  },
})