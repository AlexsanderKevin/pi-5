import { StyleSheet, View, Text } from 'react-native'

export default function PageTitle({ title, icon, children }) {
  return (
    <View style={styles.pageHeader}>
      <View style={styles.row}>
        { icon }
        <Text style={styles.pageHeaderText}>{ title }</Text>
      </View>

      { children && (<Text style={styles.pageHeaderSubText}>{ children }</Text>)}
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 30
  },
  pageHeaderText: {
    color: '#ffffff50',
    fontSize: 20,
  },
  pageHeaderSubText: {
    color: '#ffffff',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  }
});
