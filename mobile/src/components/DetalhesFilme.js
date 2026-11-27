import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Carregando from "./Carregando";
import backendClient from "../utils/backendClient";
import { formatarDuracao, formatarNota } from "../utils/formatacao";

const DetalhesFilme = ({ id, onVoltar }) => {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filme, setFilme] = useState(null);

  useEffect(() => {
    const buscarDetalhes = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await backendClient.get("/filme", {
          params: { id },
        });
        setFilme(resposta.data);
      } catch (error) {
        console.log(error);
        setErro(
          error.response?.data?.mensagem ||
            "Não foi possível carregar os detalhes."
        );
      } finally {
        setCarregando(false);
      }
    };
    buscarDetalhes();
  }, [id]);

  const linhaDeInformacoes = () => {
    const itens = [filme.ano, formatarDuracao(filme.duracao), ...filme.generos];
    return itens.filter((item) => item).join(" · ");
  };

  return (
    <View style={styles.tela}>
      <Pressable style={styles.botaoVoltar} onPress={onVoltar}>
        <Text style={styles.textoVoltar}>‹ Voltar</Text>
      </Pressable>
      {carregando ? (
        <Carregando mensagem="Carregando os detalhes..." />
      ) : erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        <ScrollView>
          {filme.fundo && (
            <Image source={{ uri: filme.fundo }} style={styles.fundo} />
          )}
          <View style={styles.conteudo}>
            {filme.poster ? (
              <Image source={{ uri: filme.poster }} style={styles.poster} />
            ) : (
              <View style={styles.semPoster}>
                <Text style={styles.textoSemPoster}>Sem pôster</Text>
              </View>
            )}
            <Text style={styles.titulo}>{filme.titulo}</Text>
            <Text style={styles.informacoes}>{linhaDeInformacoes()}</Text>
            <Text style={styles.nota}>{formatarNota(filme.nota)}</Text>
            <Text style={styles.tituloSecao}>Sinopse</Text>
            <Text style={styles.sinopse}>
              {filme.sinopse ? filme.sinopse : "Sinopse indisponível."}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DetalhesFilme;

const styles = StyleSheet.create({
  tela: {
    flex: 1,
  },
  botaoVoltar: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  textoVoltar: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8A00",
  },
  erro: {
    color: "#FF8A00",
    fontSize: 14,
    textAlign: "center",
    padding: 16,
  },
  fundo: {
    width: "100%",
    height: 180,
  },
  conteudo: {
    padding: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6,
  },
  semPoster: {
    width: 100,
    height: 150,
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
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 12,
  },
  informacoes: {
    fontSize: 14,
    color: "#A6A6A6",
    marginTop: 6,
  },
  nota: {
    fontSize: 14,
    color: "#FFC83D",
    marginTop: 6,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 16,
  },
  sinopse: {
    fontSize: 14,
    color: "#E0E0E0",
    marginTop: 6,
    lineHeight: 20,
  },
});
