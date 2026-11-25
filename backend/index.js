require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = 3000;
const MENSAGEM_ERRO_TMDB = "Não foi possível consultar o catálogo de filmes.";
const URL_IMAGENS = "https://image.tmdb.org/t/p/";

const app = express();
app.use(cors());
app.use(express.json());

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
  params: { language: "pt-BR" },
});

function simplificarFilme(filme) {
  return {
    id: filme.id,
    titulo: filme.title,
    ano: filme.release_date ? filme.release_date.slice(0, 4) : null,
    nota: Number(filme.vote_average.toFixed(1)),
    poster: filme.poster_path ? `${URL_IMAGENS}w342${filme.poster_path}` : null,
  };
}

function simplificarProvedores(provedores) {
  const lista = provedores || [];
  return lista.map((servico) => ({
    nome: servico.provider_name,
    logo: `${URL_IMAGENS}w92${servico.logo_path}`,
  }));
}

app.get("/", (req, res) => {
  res.json({ app: "OndePassa", status: "online" });
});

app.get("/em-alta", async (req, res) => {
  try {
    const resposta = await tmdbClient.get("/trending/movie/week");
    res.json(resposta.data.results.map(simplificarFilme));
  } catch (error) {
    console.log(error);
    res.status(502).json({ mensagem: MENSAGEM_ERRO_TMDB });
  }
});

app.get("/filmes", async (req, res) => {
  const termo = (req.query.busca || "").trim();
  if (!termo) {
    return res.status(400).json({ mensagem: "Informe o título de um filme." });
  }

  console.log(`Busca: ${termo}`);
  try {
    const resposta = await tmdbClient.get("/search/movie", {
      params: { query: termo, include_adult: false },
    });
    res.json(resposta.data.results.map(simplificarFilme));
  } catch (error) {
    console.log(error);
    res.status(502).json({ mensagem: MENSAGEM_ERRO_TMDB });
  }
});

app.get("/filme", async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ mensagem: "Informe o id do filme." });
  }
  try {
    const resposta = await tmdbClient.get(`/movie/${id}`, {
      params: { append_to_response: "watch/providers" },
    });
    const detalhes = resposta.data;
    const detalhesBrasil = detalhes["watch/providers"].results.BR || {};
    res.json({
      ...simplificarFilme(detalhes),
      duracao: detalhes.runtime || null,
      generos: detalhes.genres.map((genero) => genero.name),
      sinopse: detalhes.overview || null,
      fundo: detalhes.backdrop_path
        ? `${URL_IMAGENS}w780${detalhes.backdrop_path}`
        : null,
      ondeAssistir: {
        assinatura: simplificarProvedores(detalhesBrasil.flatrate),
        aluguel: simplificarProvedores(detalhesBrasil.rent),
        compra: simplificarProvedores(detalhesBrasil.buy),
      },
    });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ mensagem: "Filme não encontrado." });
    }
    res.status(502).json({ mensagem: MENSAGEM_ERRO_TMDB });
  }
});

app.listen(PORT, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${PORT}.`);
});
