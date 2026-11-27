import { FlatList, StyleSheet, Text, View } from "react-native";
import CartaoFilme from "./CartaoFilme";

const ListaFilmes = ({ titulo, filmes, onSelecionar }) => {
  return (
    <View style={styles.lista}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(filme) => `${filme.id}`}
        renderItem={({ item }) => (
          <CartaoFilme
            poster={item.poster}
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            onSelecionar={() => onSelecionar(item.id)}
          />
        )}
      />
    </View>
  );
};

export default ListaFilmes;

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
});
