import { StyleSheet, View, Text } from 'react-native'

export default function PageTitle({ title, icon, children }) {
  return (
    <View style={styles.pageHeader}>
      { icon }
      <Text style={styles.pageHeaderText}>{ title }</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  pageHeader: {
    color: '#ffffff50',
    borderBottomColor: '#ffffff50',
    borderBottomWidth: 1,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  pageHeaderText: {
    color: '#ffffff50',
    fontSize: 20,
  }
});
