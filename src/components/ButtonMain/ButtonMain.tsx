import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";

export default function ButtonMain({ children, style, ...props }) {
  return (
    <TouchableOpacity style={[ styles.buttonLogin, style ]} {...props}>
      <Text style={styles.titleButtonLogin}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonLogin: {
    paddingVertical: 12,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0865B'
  },
  titleButtonLogin: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold'
  },
});

