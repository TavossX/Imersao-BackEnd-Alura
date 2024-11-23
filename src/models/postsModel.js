import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Estabelece a conexão com o banco de dados MongoDB
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função para buscar todos os posts da coleção "posts"
export async function getTodosPosts() {
  // Seleciona o banco de dados "Imersão-InstaByte"
  const db = conexao.db("Imersão-InstaByte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Busca todos os documentos da coleção e retorna como um array
  return colecao.find().toArray();
}

// Função para criar um novo post na coleção "posts"
export async function criarPost(novoPost) {
  // Seleciona o banco de dados "Imersão-InstaByte"
  const db = conexao.db("Imersão-InstaByte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");
  // Insere o novo post na coleção e retorna o resultado da inserção
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  // Seleciona o banco de dados "Imersão-InstaByte"
  const db = conexao.db("Imersão-InstaByte");
  // Seleciona a coleção "posts" dentro do banco de dados
  const colecao = db.collection("posts");

  const objID = ObjectId.createFromHexString(id);

  // Insere o novo post na coleção e retorna o resultado da inserção
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
