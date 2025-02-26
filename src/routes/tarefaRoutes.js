import express from "express";
import TarefaController from "../controllers/TarefaController.js"

const router = express.Router();

router.get("/", TarefaController.listarTarefas);
router.post("/tarefas", TarefaController.adicionarTarefa);
router.post("/tarefas/:id", TarefaController.atualizarTarefa);
router.delete("/tarefas/:id", TarefaController.deletarTarefa);
export default router;