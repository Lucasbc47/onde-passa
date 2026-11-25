import { StyleSheet, Text, View } from "react-native";

const Cabecalho = () => {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.emoji}>🍿</Text>
        <Text style={styles.titulo}>OndePassa</Text>
      </View>
      <Text style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
  );
};

export default Cabecalho;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    fontSize: 28,
    marginRight: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtitulo: {
    fontSize: 14,
    color: "#9A9A9A",
    marginTop: 4,
  },
});
