// Importa a instância do banco de dados Firebase (db) a partir do arquivo de configuração
import { db } from "../config/firebase.js";

//Importar o modelo Tarefas, que representa a estrutura
import Tarefa from "../models/Tarefa.js"

//Define a coleção de tarefas no firestone
//tarefas que serão usadas para serem armazenadas

const TarefaColecao = db.collection("tarefas");

//Define a classe que contem os metodos para manipular as tarefas
class TarefaController{
    // Método para listar todas as tarefas e renderizar a página
    static async listarTarefas(req, res){
        try{
       // Obtém todos os documentos da coleção "tasks" no Firestore 
        const todasTarefas = await TarefaColecao.get();
                //Mapeia os documentos para um vetor
        const tarefas = todasTarefas.docs.map(tarefa =>({
            id: tarefa.id, //id do documento no firestone
            ...tarefa.data() //o spread faz com que peguemos todos os valores, diferente do destruct onde pegamos valores especificos
            // const { titulo, descricao, status } = tarefa.data(); // Desestrutura os dados

            // return {
            //     id: tarefa.id,
            //     titulo,
            //     descricao,
            //     status
            // };
        }));
        res.render("index", { tarefas })
    }
    
    catch(error){
        //Em caso de erro, joga o erro no console
        console.error("Erro ao carregar Tarefas", error)
        res.status(500).send("Erro ao carregar tarefas.");
    }
    }

    //Metodo para adicionar uma nova tarefa
    static async adicionarTarefa(req, res){
        try{
            //extrai o titulo e a descrição 
            const { titulo, descricao} = req.body;

            //Cria uma nova instancia da classe tarefa a partir dos dados recebidos
            //É passado no lugar de id o valor de null, devido a inserção do id que sera feita pelo firestone
            const novaTarefa = new Tarefa(null, titulo, descricao,"a fazer" )
            // Adiciona a nova tarefa à coleção
            await TarefaColecao.add({
                titulo: novaTarefa.titulo,
                descricao: novaTarefa.descricao,
                status: novaTarefa.status,
                data_criacao: novaTarefa.data_criacao,
                data_atualizacao: novaTarefa.data_atualizacao
            });

            //redireciona o usuario de volta para a pagina inicial
            res.redirect("/");
        }catch(error){
            console.log("Erro ao adicionar tarefa", error);
            res.status(500).send("Erro ao adicionar tarefa");
        }
    }

    static async atualizarTarefa(req, res){
        try{
            //Extrai o ID da tarefa dos paremetros
            const { id } = req.params;

            //Extrai o novo status da tarefa do corpo da requisição
            const { status } = req.body;

            //Atualiza o documento da tarefa no firestone com o novo status
            await TarefaColecao.doc(id).update({
                status,
                data_atualizacao: new Date()//atualiza a data
            })
            res.redirect("/")
        }
        catch(error){
             // Em caso de erro, loga o erro no console e envia uma resposta de erro ao cliente
             console.error("Erro ao atualizar tarefa:", error);
             res.status(500).send("Erro ao atualizar tarefa.");
        }
    }

    static async deletarTarefa(req, res){
        try{
            const { id } = req.params;
            await TarefaColecao.doc(id).delete();
            res.redirect("/");
        }
        catch(error)
        {
            console.log('Erro ao deletar tarefa', error);
            res.status(500).send('Erro ao deletar tarefa');
        }
    }
}export default TarefaController;