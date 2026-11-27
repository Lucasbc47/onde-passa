import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Cabecalho from "./src/components/Cabecalho";
import Carregando from "./src/components/Carregando";
import Creditos from "./src/components/Creditos";
import ListaFilmes from "./src/components/ListaFilmes";
import backendClient from "./src/utils/backendClient";

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [emAlta, setEmAlta] = useState([]);

  useEffect(() => {
    const buscarFilmesEmAlta = async () => {
      try {
        const resposta = await backendClient.get("/em-alta");
        setEmAlta(resposta.data);
      } catch (error) {
        console.log(error);
        setErro(
          "Não foi possível carregar os filmes. Verifique se o backend está no ar."
        );
      } finally {
        setCarregando(false);
      }
    };
    buscarFilmesEmAlta();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <StatusBar style="light" />
        <Cabecalho />
        <View style={styles.conteudo}>
          {carregando ? (
            <Carregando mensagem="Buscando os filmes em alta..." />
          ) : erro ? (
            <Text style={styles.erro}>{erro}</Text>
          ) : (
            <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
          )}
        </View>
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#141414",
  },
  conteudo: {
    flex: 1,
  },
  erro: {
    color: "#FF8A00",
    fontSize: 14,
    textAlign: "center",
    padding: 16,
  },
});
