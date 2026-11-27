import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Carregando = ({ mensagem = "Carregando..." }) => {
  return (
    <View style={styles.area}>
      <ActivityIndicator size="large" color="#FF8A00" />
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
};

export default Carregando;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mensagem: {
    marginTop: 12,
    fontSize: 14,
    color: "#A6A6A6",
  },
});
