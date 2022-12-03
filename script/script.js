//enviando formulario

const formulario = document.querySelector("form");

const processaFormulario = (event) => {
  event.preventDefault();

  const dados = new FormData(event.target);

  const dadosCompletos = Object.fromEntries(dados.entries());
  console.log(JSON.stringify(dadosCompletos));
};

formulario.addEventListener("submit", processaFormulario);

//-------------------------------------------------------------------------

// LISTA DE PRODUTOS

//Mostrando na tela
window.onload = () => {
  montarTabela();
  montarItem();
};

// localStorage dos produtos
const STORAGE_KEY = "all-list";
const todoStorage = {
  fetch() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach((todo, index) => {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  },
};

let data = todoStorage.fetch();

function adicionarproduto() {
  let produto = {
    id: parseInt(document.getElementById("id").value),
    descricao: document.getElementById("descricao").value,
    undMedida: document.getElementById("undMedida").value,
    estoque: document.getElementById("estoque").value,
    valorUnitario: document.getElementById("valorUnitario").value,
    valorTotal:
      parseFloat(document.getElementById("valorUnitario").value) *
      document.getElementById("estoque").value,
  };

  if (!produtoValida(produto)) return;
  if (produto.id !== "" && produto.id !== undefined && !isNaN(produto.id)) {
    let velhaproduto = data.find((vt) => vt.id === produto.id);
    data[data.indexOf(velhaproduto)] = produto;
    todoStorage.save(data);
    data = todoStorage.fetch();
  } else {
    produto.id = data.length + 1;
    data.push(produto);
    todoStorage.save(data);
    data = todoStorage.fetch();
  }
  montarTabela();
  limparCampos();
}

// montar tabela de itens na tela principal
function montarItem() {
  let trs = ``;
  if (data.length === 0) {
    const tr = `
        <tr>
        <td colspan="5" class="text-center">Nenhuma produto adicionada</td>
        </tr>
        `;
    document.getElementById("tabelaItensBody").innerHTML = tr;
    return;
  }
  data.forEach((task) => {
    const tr = `
        <tr>
            <td>${task.descricao}</td>
            <td>${task.undMedida}</td>
            <td>${task.estoque}</td>
            <td>${task.valorUnitario}</td>
            <td>${task.valorTotal}</td>
            <td class="text-center">
                <a class="btn btn-danger btn-sm" onclick="removerItem(${task.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg></a>
            </td>
        </tr>
        `;
    trs += tr;
  });
  document.getElementById("tabelaItensBody").innerHTML = trs;
}


//montar tabela com os produtos cadastrados
function montarTabela() {
  let trs = ``;
  if (data.length === 0) {
    const tr = `
        <tr>
        <td colspan="5" class="text-center">Nenhuma produto adicionada</td>
        </tr>
        `;
    document.getElementById("tabelaProdutosBody").innerHTML = tr;
    return;
  }
  data.forEach((task) => {
    const tr = `
        <tr>
            <td>${task.descricao}</td>
            <td>${task.undMedida}</td>
            <td>${task.estoque}</td>
            <td>${task.valorUnitario}</td>
            <td>${task.valorTotal}</td>
            <td class="text-center">
            <a class="btn btn-success" onclick="montarItem(${task.id})">+</a>
                <a class="btn btn-danger btn-sm" onclick="removerProduto(${task.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg></a>
            </td>
        </tr>
        `;
    trs += tr;
  });
  document.getElementById("tabelaProdutosBody").innerHTML = trs;
}

//deeleta item
function removerItem(id) {
  let task = data.find((task) => task.id === id);
  data.splice(data.indexOf(task), 1);
  montarItem();
}

//deleta produto
function removerProduto(id) {
  let task = data.find((task) => task.id === id);
  data.splice(data.indexOf(task), 1);
  todoStorage.save(data);
  data = todoStorage.fetch();
  montarTabela();
}

//limpar campos
function limparCampos() {
  document.getElementById("id").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("undMedida").value = "";
  document.getElementById("estoque").value = "";
  document.getElementById("valorUnitario").value = "";
}

function produtoValida(produto) {
  return (
    produto.descricao !== "" &&
    produto.executor !== "" &&
    produto.prazo !== "" &&
    produto.status !== ""
  );
}

function onFileSelected(event) {
  let selectedFile = event.target.files[0];
  let reader = new FileReader();

  let ultag = document.getElementById("food");
  ultag.title = selectedFile.name;

  reader.onload = function (event) {
    ultag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}

//Local storage dos anexos
let arr = [];

function addItem() {
  if (localStorage.meuArr) {
    arr = JSON.parse(localStorage.getItem("meuArr"));
  }

  let novoItem = document.getElementById("v").value;
  arr.push(novoItem);
  document.getElementById("v").value = "";
  localStorage.meuArr = JSON.stringify(arr);
}

//mostrar itens dos anexos
function showItems() {
  let resultDIV = document.getElementById("mostraItens");
  resultDIV.innerHTML = "";
  if (localStorage.meuArr) {
    arr = JSON.parse(localStorage.getItem("meuArr"));
  }

  for (let i in arr) {
    let p = document.createElement("p");
    p.innerHTML = arr[i];
    resultDIV.append(p);
  }
}

let inputFiles = [];

function newInput(input) {
  let filesStr = "";

  for (let i = 0; i < input.files.length; i++) {
    inputFiles.push(input.files[i]);
    filesStr +=
      "<li>" +
      input.files[i].name +
      "<a class='btn btn-success'>+</a>" +
      "<a  onclick='removeLi(this)'class='btn btn-danger btn-xl'>-</a></li>";
  }

  document.getElementById("file-input").value = "";

  document.getElementById("dp-files").innerHTML += filesStr;
}

function removeLi(e) {
  inputFiles = inputFiles.filter(function (file) {
    return file.name !== e.parentNode.innerHTML.split("<a")[0];
  });
  e.parentNode.parentNode.removeChild(e.parentNode);
}
