import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const Provedores = ({ titulo, provedores }) => {
  if (provedores.length === 0) {
    return null;
  }

  return (
    <View style={styles.secao}>
      <Text style={styles.titulo}>{titulo}</Text>
      <ScrollView horizontal>
        {provedores.map(({ nome, logo }) => (
          <View key={nome} style={styles.servico}>
            <Image source={{ uri: logo }} style={styles.logoServico} />
            <Text style={styles.nomeServico} numberOfLines={2}>
              {nome}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Provedores;

const styles = StyleSheet.create({
  secao: {
    marginTop: 12,
  },
  titulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  servico: {
    width: 72,
    marginRight: 12,
    alignItems: "center",
  },
  logoServico: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  nomeServico: {
    fontSize: 11,
    color: "#A6A6A6",
    textAlign: "center",
    marginTop: 4,
  },
});
