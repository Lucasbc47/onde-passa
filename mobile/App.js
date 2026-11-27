import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Busca from "./src/components/Busca";
import Cabecalho from "./src/components/Cabecalho";
import Carregando from "./src/components/Carregando";
import Creditos from "./src/components/Creditos";
import DetalhesFilme from "./src/components/DetalhesFilme";
import ListaFilmes from "./src/components/ListaFilmes";
import backendClient from "./src/utils/backendClient";

export default function App() {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [emAlta, setEmAlta] = useState([]);
  const [termo, setTermo] = useState("");
  const [termoBuscado, setTermoBuscado] = useState("");
  const [resultados, setResultados] = useState(null);
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [mensagemCarregando, setMensagemCarregando] = useState(
    "Buscando os filmes em alta..."
  );

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

  const buscar = async () => {
    setMensagemCarregando("Procurando filmes...");
    setCarregando(true);
    try {
      const resposta = await backendClient.get("/filmes", {
        params: { busca: termo },
      });
      setResultados(resposta.data);
      setTermoBuscado(termo);
      setErro(null);
    } catch (error) {
      console.log(error);
      setErro(
        error.response?.data?.mensagem || "Não foi possível buscar os filmes."
      );
    } finally {
      setCarregando(false);
    }
  };

  const limpar = () => {
    setTermo("");
    setResultados(null);
    setErro(null);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.tela}>
        <StatusBar style="light" />
        <Cabecalho />
        {filmeSelecionado === null ? (
          <View style={styles.conteudo}>
            <Busca
              termo={termo}
              onTermoAlterado={setTermo}
              onBuscar={buscar}
              onLimpar={limpar}
            />
            <View style={styles.conteudo}>
              {carregando ? (
                <Carregando mensagem={mensagemCarregando} />
              ) : erro ? (
                <Text style={styles.erro}>{erro}</Text>
              ) : resultados === null ? (
                <ListaFilmes
                  titulo="Em alta nesta semana"
                  filmes={emAlta}
                  onSelecionar={setFilmeSelecionado}
                />
              ) : resultados.length === 0 ? (
                <Text style={styles.aviso}>
                  Nenhum filme encontrado para “{termoBuscado}”.
                </Text>
              ) : (
                <ListaFilmes
                  titulo={`Resultados para “${termoBuscado}”`}
                  filmes={resultados}
                  onSelecionar={setFilmeSelecionado}
                />
              )}
            </View>
          </View>
        ) : (
          <DetalhesFilme
            id={filmeSelecionado}
            onVoltar={() => setFilmeSelecionado(null)}
          />
        )}
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
  aviso: {
    color: "#A6A6A6",
    fontSize: 14,
    textAlign: "center",
    padding: 16,
  },
});
