import express from "express";
import multer from "multer";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postController.js";

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos carregados: "uploads/"
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo carregado
    cb(null, file.originalname);
  },
});

// Instancia do middleware Multer com a configuração de armazenamento
const upload = multer({ storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Parseia o corpo da requisição para JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  // Rota GET para buscar todos os posts (implementada em postController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada em postController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de post (implementada em uploadImagem)
  // Utiliza o middleware `upload.single('imagem')` para processar um único arquivo chamado 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso em outros arquivos
export default routes;
