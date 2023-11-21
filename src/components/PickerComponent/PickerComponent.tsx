import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet } from 'react-native'

export default function PickerComponent({ items, label, value, onChangeValue }) {
  return (
    <>
    <Text style={styles.titleInput}>{ label }</Text>
    <View style={styles.container}>
      <Picker
          style={styles.picker}
          selectedValue={value}
          onValueChange={onChangeValue}
          >
          { items.map(item => (
            <Picker.Item 
              style={styles.pickerItem} 
              key={item.index} 
              label={item.label} 
              value={item.index} 
              />
          ))}
      </Picker>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    picker: {
      color: '#fff',
    },
    pickerItem: {
      borderWidth: 1
    },
    container: {
      borderBlockColor: '#FFF',
      borderWidth: 1,
      padding: 3,
      borderRadius: 10,
      fontSize: 17,
      color: '#FFF',
      borderColor: 'white',
      width: '100%',
      marginBottom: 25,
    },
    titleInput: {
      marginBottom: 10,
      fontSize: 17,
      color: '#FFF',
      paddingBottom: .5,
    },
})
