require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = 3000;
const MENSAGEM_ERRO_TMDB = "Não foi possível consultar o catálogo de filmes.";

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
    poster: filme.poster_path ? `https://image.tmdb.org/t/p/w342${filme.poster_path}` : null,
  };
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

app.listen(PORT, () => {
  console.log(`Backend do OndePassa no ar. Porta: ${PORT}.`);
});
