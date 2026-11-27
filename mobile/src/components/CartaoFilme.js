import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { formatarNota } from "../utils/formatacao";

const CartaoFilme = ({ poster, titulo, ano, nota, onSelecionar }) => {
  return (
    <Pressable style={styles.cartao} onPress={onSelecionar}>
      {poster ? (
        <Image source={{ uri: poster }} style={styles.poster} />
      ) : (
        <View style={styles.semPoster}>
          <Text style={styles.textoSemPoster}>Sem pôster</Text>
        </View>
      )}
      <View style={styles.informacoes}>
        <Text style={styles.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        {ano && <Text style={styles.ano}>{ano}</Text>}
        <Text style={styles.nota}>{formatarNota(nota)}</Text>
      </View>
    </Pressable>
  );
};

export default CartaoFilme;

const styles = StyleSheet.create({
  cartao: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 6,
  },
  semPoster: {
    width: 70,
    height: 105,
    borderRadius: 6,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  textoSemPoster: {
    fontSize: 12,
    color: "#A6A6A6",
    textAlign: "center",
  },
  informacoes: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  ano: {
    fontSize: 14,
    color: "#A6A6A6",
    marginTop: 4,
  },
  nota: {
    fontSize: 14,
    color: "#FFC83D",
    marginTop: 4,
  },
});
