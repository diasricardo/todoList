import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tarefaRoutes from "./routes/tarefaRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta 'public'
// app.use(express.static(path.join(__dirname, 'src', 'public')));
console.log('Diretório atual:', __dirname);
app.use(express.static(path.join(__dirname, 'src', 'public')));


// Define a pasta de views
app.set("views", path.join(__dirname, "views"));

// Define o motor de visualização como EJS
app.set("view engine", "ejs");

// Define as rotas
app.use(tarefaRoutes);

// Define a porta do servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em: http://localhost:${porta}`);
});

export default app;


// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import tarefaRoutes from "./routes/tarefaRoutes.js";
// import path from "path";

// // Carrega as variáveis de ambiente do arquivo .env
// dotenv.config();

// const app = express();

// // Habilita o CORS para permitir requisições de diferentes origens
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Configura o caminho para arquivos estáticos
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, "src/public")));

// // Configura o EJS como engine de template
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "src/views"));

// // Usa as rotas definidas em tarefaRoutes
// app.use(tarefaRoutes);

// // Define a porta do servidor
// const porta = process.env.PORT || 3000;
// app.listen(porta, () => {
//     console.log(`Servidor rodando em: http://localhost:${porta}`);
// });