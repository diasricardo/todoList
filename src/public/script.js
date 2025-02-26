document.addEventListener("DOMContentLoaded", () => {
    // *** Alteração 1: Adicionado o ícone da lixeira ao JavaScript ***
    const trashIcon = document.getElementById("trash-icon");

    // Adiciona a funcionalidade de arrastar em todas as tarefas
    document.querySelectorAll(".task-card").forEach(tarefa => {
        tarefa.setAttribute("draggable", "true");

        tarefa.addEventListener("dragstart", (event) => {
            // Salva o ID da tarefa sendo arrastada
            event.dataTransfer.setData("text", event.target.id);
            console.log("Tarefa arrastada:", event.target.id);

            // *** Alteração 2: Mostra o ícone da lixeira ao iniciar o arrasto ***
            trashIcon.classList.remove("d-none");
        });

        tarefa.addEventListener("dragend", () => {
            // *** Alteração 3: Esconde o ícone da lixeira ao parar de arrastar ***
            trashIcon.classList.add("d-none");
        });
    });

    // Configura as colunas para permitir soltar as tarefas
    document.querySelectorAll(".task-column").forEach(column => {
        column.addEventListener("dragover", (event) => {
            event.preventDefault(); // Permite soltar
        });

        column.addEventListener("drop", async (event) => {
            event.preventDefault();

            // Pega o ID da tarefa arrastada
            const taskId = event.dataTransfer.getData("text");
            const newStatus = column.getAttribute("data-status");

            console.log(`Tarefa ${taskId} movida para ${newStatus}`);

            // Atualiza o status da tarefa no banco de dados
            try {
                const response = await fetch(`/tarefas/${taskId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: newStatus })
                });

                if (response.ok) {
                    console.log("Status atualizado com sucesso!");
                    location.reload(); // Recarrega a página para refletir as mudanças
                } else {
                    console.error("Erro ao atualizar o status:", response.statusText);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        });
    });

    // *** Alteração 4: Adicionada a lógica para deletar tarefas ao soltar na lixeira ***
    trashIcon.addEventListener("dragover", (event) => {
        event.preventDefault(); // Permite soltar
    });

    trashIcon.addEventListener("drop", async (event) => {
        event.preventDefault();

        // Pega o ID da tarefa arrastada
        const taskId = event.dataTransfer.getData("text");

        // Confirmação antes de deletar
        if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
            try {
                const response = await fetch(`/tarefas/${taskId}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    console.log("Tarefa deletada com sucesso!");
                    location.reload(); // Recarrega a página para refletir as mudanças
                } else {
                    console.error("Erro ao deletar a tarefa:", response.statusText);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            }
        }
    });
});