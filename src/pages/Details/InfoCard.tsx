import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";

export default function InfoCard({ equipment }) {
  const { tipo, codigo_sap, unidade_medida, descricao } = equipment;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardRow}>
        <View style={styles.cardPiece}>
          <Text style={styles.cardLabel}>Tipo</Text>
          <Text style={styles.cardText}>{ tipo.nome }</Text>
        </View>
        <View style={styles.cardPiece}>
          <Text style={styles.cardLabel}>Cod. SAP</Text>
          <Text style={styles.cardText}>{ codigo_sap }</Text>
        </View>
      </View>

      <View style={styles.cardPiece}>
        <Text style={styles.cardLabel}>Unidade de Medida</Text>
        <Text style={styles.cardText}>{ unidade_medida }</Text>
      </View>

      <View>
        <Text style={styles.cardLabel}>Descrição</Text>
        <Text style={styles.cardText}>{ descricao }</Text>
      </View>
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
  cardContainer: {
    backgroundColor: '#282828',
    padding: 20,
    marginVertical: 35,
    borderRadius: 10,
    borderColor: '#ffffff20',
    borderWidth: 1,
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 100,
  },
  cardPiece: {
    marginBottom: 30,
  },
  cardLabel: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 5,
  },
  cardText: {
    color: '#ffffff90',
    fontSize: 17
  }
});
