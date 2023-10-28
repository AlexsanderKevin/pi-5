import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";

export default function Scroll ({ children, ...props }) {
  return (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
      {...props}
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 45,
    paddingTop: 15,
    paddingBottom: 100,
  }  
});

