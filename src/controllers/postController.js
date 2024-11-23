import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Função para listar todos os posts
export async function listarPosts(req, res) {
  // Chama a função para buscar os posts no banco de dados (ou outra fonte)
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (OK)
  res.status(200).json(posts);
}

// Função para criar um novo post
export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função para criar o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (error) {
    // Em caso de erro, loga a mensagem de erro no console
    console.error(error.message);
    // Envia uma mensagem de erro genérica ao cliente com status 500 (Erro interno do servidor)
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

// Função para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
  // Cria um objeto com os dados do novo post, incluindo o nome original da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };
  try {
    // Chama a função para criar o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Cria o novo nome do arquivo da imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (error) {
    // Em caso de erro, loga a mensagem de erro no console
    console.error(error.message);
    // Envia uma mensagem de erro genérica ao cliente com status 500 (Erro interno do servidor)
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function atualizarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };
    // Chama a função para criar o novo post no banco de dados
    const postCriado = await atualizarPost(id, post);

    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (error) {
    // Em caso de erro, loga a mensagem de erro no console
    console.error(error.message);
    // Envia uma mensagem de erro genérica ao cliente com status 500 (Erro interno do servidor)
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
