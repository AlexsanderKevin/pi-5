import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native'
import isValidToken from '../../middlewares/verifyToken'
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import messages from '../../utils/messages';
import api from '../../services/api';

export default function MovimentationList({ id, navigation }) {
  const [ movimentation, setMovimentation ] = useState([])

  useEffect(() => {
    SecureStore.getItemAsync('token').then(async token => {
      const validToken = await isValidToken(token)

      if (validToken) {
        api.get(`/movimentacoes/equipamentos/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : token
          }
        })
        .then((res) => setMovimentation(res.data))
        .catch((error) => console.log(error.message))
      }else{
        alert(messages.SESSAO_EXPIRADA)
        navigation.navigate('Login')
      }
    })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.containerSideLine}></View>
      {movimentation.map(movimentation => (
        <View style={styles.cardFrame} key={movimentation.id_movimentacao}>
          <View style={styles.cardCircle}></View>

          <View style={styles.card} >
            <View>
              <Text style={styles.dateText}>{movimentation.data_entrada.slice(0, 10)}</Text>
              <Text style={styles.zoneText}>{movimentation.zona.nome}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{movimentation.status}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100,
    position: 'relative',
  },
  card: {
    height: 73,
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#282828',
    marginBottom: 10,
    borderRadius: 7,
    borderColor: '#ffffff20',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '90%',
  },
  dateText: {
    color: '#ffffff50',
    marginBottom: 5,
  },
  zoneText: {
    color: '#ffffff',
    fontSize: 18,
  },
  statusText: {
    color: '#ffffff70',
    fontSize: 12,
  },
  statusContainer: {
    borderColor: '#ffffff20',
    borderWidth: 1,
    backgroundColor: '#353535',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  cardFrame: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15
  },
  cardCircle: {
    backgroundColor: '#E46262',
    width: 18,
    height: 18,
    borderRadius: 50,
    marginBottom: 10,
  },
  containerSideLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#E46262',
    position: 'absolute',
    left: 8,
    marginTop: 40,
  }
})
