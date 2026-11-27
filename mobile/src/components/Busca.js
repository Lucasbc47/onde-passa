import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const Busca = ({ termo, onTermoAlterado, onLimpar, buscando }) => {
  return (
    <View style={styles.area}>
      <TextInput
        style={styles.campo}
        value={termo}
        placeholder="Digite o título de um filme"
        placeholderTextColor="#A6A6A6"
        onChangeText={onTermoAlterado}
      />
      {buscando && (
        <ActivityIndicator
          size="small"
          color="#FF8A00"
          style={styles.indicador}
        />
      )}
      {termo !== "" && (
        <Pressable style={styles.botaoLimpar} onPress={onLimpar}>
          <Text style={styles.textoLimpar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Busca;

const styles = StyleSheet.create({
  area: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  campo: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    borderWidth: 1,
    borderColor: "#2B2B2B",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: "#FFFFFF",
  },
  botaoLimpar: {
    marginLeft: 8,
    padding: 8,
  },
  textoLimpar: {
    fontSize: 16,
    color: "#A6A6A6",
  },
  indicador: {
    marginLeft: 8,
  },
});