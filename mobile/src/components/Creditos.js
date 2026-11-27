import { StyleSheet, Text, View } from "react-native";

const Creditos = () => {
  return (
    <View style={styles.area}>
      <Text style={styles.texto}>
        Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
      </Text>
    </View>
  );
};

export default Creditos;

const styles = StyleSheet.create({
  area: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  texto: {
    fontSize: 12,
    color: "#A6A6A6",
    textAlign: "center",
  },
});
