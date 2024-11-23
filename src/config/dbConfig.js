import { MongoClient } from "mongodb";

/**
 * Conecta ao banco de dados MongoDB Atlas.
 *
 * @param {string} stringConexao A string de conexão para o MongoDB Atlas.
 * @returns {Promise<MongoClient>} Uma Promise que resolve para o cliente MongoDB conectado.
 */
export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  try {
    mongoClient = new MongoClient(stringConexao);
    console.log("Conectando ao cluster do banco de dados...");
    await mongoClient.connect();
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    return mongoClient;
  } catch (erro) {
    console.error("Falha na conexão com o banco!", erro);
    process.exit();
  }
}
