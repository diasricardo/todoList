class Tarefa {
    constructor(id, titulo, descricao, status, data_criacao, data_atualizacao) {
        this.id = id || null;
        this.titulo = titulo;
        this.descricao = descricao || "";
        this.status = status || "a_fazer";
        //cria um novo objeto automaticamente nova data
        this.data_criacao = data_criacao || new Date();
        this.data_atualizacao = data_atualizacao || new Date();
    }
  }
  
  export default Tarefa;