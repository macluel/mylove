function atualizarMensagem() {
    const dataInicio = new Date(2025, 0, 19); // 19 de janeiro de 2025
    const hoje = new Date();

    // Calcula a diferença total de meses
    let totalMeses = (hoje.getFullYear() - dataInicio.getFullYear()) * 12 + (hoje.getMonth() - dataInicio.getMonth());

    // Se ainda não chegou o dia 19 deste mês, não contamos o mês atual
    if (hoje.getDate() < 19) {
        totalMeses -= 1;
    }

    // Converte meses em anos e meses
    const anos = Math.floor(totalMeses / 12);
    const meses = totalMeses % 12;

    // Calcula dias desde o último "mêsversário"
    let ultimoMesversario = new Date(hoje.getFullYear(), hoje.getMonth(), 19);
    if (hoje.getDate() < 19) {
        // Se ainda não passou do dia 19, pegamos o dia 19 do mês anterior
        ultimoMesversario.setMonth(ultimoMesversario.getMonth() - 1);
    }
    const diffDias = Math.floor((hoje - ultimoMesversario) / (1000 * 60 * 60 * 24));

    let mensagem = "Feliz ";

    if (anos > 0) {
        mensagem += `${anos} ano${anos > 1 ? "s" : ""}`;
    }
    if (meses > 0) {
        mensagem += `${anos > 0 ? " e " : ""}${meses} mês${meses > 1 ? "es" : ""}`;
    }
    if (diffDias > 0) {
        mensagem += `${(anos > 0 || meses > 0) ? " e " : ""}${diffDias} dia${diffDias > 1 ? "s" : ""}`;
    }

    mensagem += " de namoro!";

    // Atualiza o HTML se o elemento existir
    const elemento = document.getElementById("mensagem");
    if (elemento) {
        elemento.innerText = mensagem;
    }
}

window.onload = atualizarMensagem;
