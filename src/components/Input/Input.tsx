import { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

export default function Input({ label, value, ...props }) {
  const [ isFocused, setIsFocused ] = useState(false)
  const [ isValid, setIsValid ] = useState(false)

  useEffect(() => setIsValid(value), [ value ])

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => {setIsFocused(false)}

  return (
    <View style={styles.inputContainer}>
      <Text 
        style={[ styles.titleInput, isFocused ? styles.activeLabel : null ]}
      >
        { label }
      </Text>
      <TextInput 
        style={[ styles.input, isFocused || isValid ? styles.activeInput : null]} 
        placeholderTextColor="#848484"
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  titleInput: {
    marginBottom: 10,
    fontSize: 17,
    color: '#FFF',
    paddingBottom: .5,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    fontSize: 17,
    color: '#FFF',
    borderColor: 'white',
    borderWidth: 1,
    width: '100%',
  },
  activeInput: {
    borderColor: '#F0865B',
    borderWidth: 2,
    backgroundColor: '#ffffff25'
  },
  activeLabel: {
    color: '#F0865B',
    fontWeight: 'bold'
  }
})
