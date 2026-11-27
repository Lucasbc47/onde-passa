import { StyleSheet, Text, View } from "react-native";

const Cabecalho = () => {
  return (
    <View style={styles.area}>
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
  area: {
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
    color: "#A6A6A6",
    marginTop: 4,
  },
});
