import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tarefaRoutes from "./routes/tarefaRoutes.js";

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();

// Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.set("view engine", "ejs");
app.set(express.static("views", "./src/views"));
app.use(tarefaRoutes);

export default app;

// // Define a porta do servidor
// const porta = 3000;
// app.listen(porta, () => {
//     console.log(`Servidor rodando em: http://localhost:${porta}`);
// });

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