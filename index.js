"use strict";
var _a, _b;
const selecionar = document.querySelector('select');
const iconeCheck = document.getElementById('icone-check');
const iconeX = document.getElementById('icone-x');
function enviarDados(event) {
    event.preventDefault();
    const spanEnviar = document.getElementById('span-enviar');
    const valorDia = Number(document.getElementById('valor-dia').value);
    const dataInput = String(document.getElementById('data').value);
    const option = selecionar.value;
    if (option === 'Bateu a meta') {
        console.log('Bateu a meta!!');
        selecionar === null || selecionar === void 0 ? void 0 : selecionar.classList.add('ativar');
        selecionar === null || selecionar === void 0 ? void 0 : selecionar.classList.remove('ativou');
    }
    else if (option === 'Não bateu a meta') {
        selecionar === null || selecionar === void 0 ? void 0 : selecionar.classList.add('ativou');
        selecionar === null || selecionar === void 0 ? void 0 : selecionar.classList.remove('ativar');
    }
    else {
        alert('Escolha uma meta');
        return;
    }
    if (isNaN(valorDia) || !dataInput) {
        alert('Preencha os campos!!');
        return;
    }
    const data = new Date(dataInput);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const dados = { valor: valorDia, data: dataFormatada, option: option };
    const dadosExistentes = JSON.parse(localStorage.getItem('dadosTabela') || '[]');
    dadosExistentes.push(dados);
    localStorage.setItem('dadosTabela', JSON.stringify(dadosExistentes));
    receberDados();
    document.getElementById('valor-dia').value = '';
    document.getElementById('data').value = '';
}
const selecionarMes = document.getElementById('mes-selecao');
(_a = document.getElementById('ver-historico')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    selecionarMesAtual();
    receberDados();
});
function selecionarMesAtual() {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth() + 1;
    const selecionarMes = document.getElementById('mes-selecao');
    selecionarMes.value = String(mesAtual);
}
function receberDados() {
    const tabela = document.getElementById('table');
    const tbody = tabela.querySelector('tbody');
    if (!tbody)
        return;
    tbody.innerHTML = '';
    const dadosExistentes = JSON.parse(localStorage.getItem('dadosTabela') || '[]');
    const mesSelecionado = selecionarMes.value;
    if (!mesSelecionado) {
        alert("Selecione um mês válido!");
        return;
    }
    const dadosFiltrados = dadosExistentes.filter((dados) => {
        const [dia, mes, ano] = dados.data.split('/');
        const data = new Date(`${ano}-${mes}-${dia}`);
        const mesData = data.getMonth() + 1;
        return mesData === Number(mesSelecionado);
    });
    if (dadosFiltrados.length === 0) {
        alert("Não há valores para o mês selecionado.");
        return;
    }
    dadosFiltrados.forEach((dados, index) => {
        const createTr = document.createElement('tr');
        const valorTd = document.createElement('td');
        const dataTd = document.createElement('td');
        const optionTd = document.createElement('td');
        const deleteTd = document.createElement('td');
        valorTd.textContent = `R$ ${dados.valor.toFixed(2)}`;
        dataTd.textContent = dados.data;
        optionTd.textContent = dados.option;
        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '🗑️';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.addEventListener('click', () => excluirLinha(index));
        deleteTd.appendChild(deleteIcon);
        createTr.appendChild(valorTd);
        createTr.appendChild(dataTd);
        createTr.appendChild(optionTd);
        createTr.appendChild(deleteTd);
        if (dados.option === 'Bateu a meta') {
            createTr.classList.add('meta-batida');
        }
        else if (dados.option === 'Não bateu a meta') {
            createTr.classList.add('meta-nao-batida');
        }
        tbody.appendChild(createTr);
    });
}
selecionarMes.addEventListener('change', receberDados);
function excluirLinha(index) {
    const dadosExistentes = JSON.parse(localStorage.getItem('dadosTabela') || '[]');
    dadosExistentes.splice(index, 1);
    localStorage.setItem('dadosTabela', JSON.stringify(dadosExistentes));
    receberDados();
}
window.onload = selecionarMesAtual;
(_b = document.getElementById('enviar')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', enviarDados);
const secaoTabela = document.getElementById('secao-tabela');
const secaoPrencher = document.getElementById('secao-prencher');
const linksPainel = document.querySelectorAll('a');
function mostrarTabela() {
    secaoTabela === null || secaoTabela === void 0 ? void 0 : secaoTabela.classList.add('ativarTabela');
    secaoTabela === null || secaoTabela === void 0 ? void 0 : secaoTabela.classList.remove('sumir');
    secaoPrencher === null || secaoPrencher === void 0 ? void 0 : secaoPrencher.classList.add('sumir');
    secaoPrencher === null || secaoPrencher === void 0 ? void 0 : secaoPrencher.classList.remove('mostrar');
}
function mostrarPrencher() {
    secaoTabela === null || secaoTabela === void 0 ? void 0 : secaoTabela.classList.remove('ativarTabela');
    secaoTabela === null || secaoTabela === void 0 ? void 0 : secaoTabela.classList.add('sumir');
    secaoPrencher === null || secaoPrencher === void 0 ? void 0 : secaoPrencher.classList.remove('sumir');
    secaoPrencher === null || secaoPrencher === void 0 ? void 0 : secaoPrencher.classList.add('mostrar');
}
