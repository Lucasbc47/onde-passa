import { StyleSheet, Text, View } from "react-native";

const Creditos = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
      </Text>
    </View>
  );
};

export default Creditos;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  texto: {
    fontSize: 12,
    color: "#9A9A9A",
    textAlign: "center",
  },
});
