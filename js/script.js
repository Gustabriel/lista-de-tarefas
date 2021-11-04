let lista_tarefas = document.querySelector("#lista");
let tarefas;
let data = new Date();
console.log(data.getDay());

if (localStorage.getItem("tarefas") != null){
    tarefas = JSON.parse(localStorage.getItem("tarefas"));
    exibirTarefas();
}else{
    tarefas = [];
}

document.querySelector("#btn").addEventListener("click", function(){
    add();
});

document.querySelector("#tarefa").addEventListener("keypress", function(e){
    if (e.key == "Enter"){
        add();
    }
})

document.querySelector("#tarefa").focus();

function add() {    
    let entrada = document.querySelector("#tarefa").value;
    if (entrada == ""){
        document.querySelector("#tarefa").placeholder = "Digite algo";
    }else{
        document.querySelector("#tarefa").placeholder = "Adicione mais tarefas digitando-as aqui";
        let id = (tarefas[0] != null)? tarefas[0].id + 1 : 1;
        tarefas.unshift({id: id, status: 1, titulo: entrada});
        localStorage.setItem("tarefas", JSON.stringify(tarefas) );
    }
    document.querySelector("#tarefa").value= "";
    document.querySelector("#tarefa").focus();
   exibirTarefas();
}

function exibirTarefas(){
    lista_tarefas.innerHTML = "";
    for(let tarefa of tarefas){
        let classCheck = (tarefa.status == 1)? "check" : "done";
        let classSpan  = (tarefa.status == 1)? "" : "done-span";
        lista_tarefas.innerHTML += `<li data-id="${tarefa.id}" title="Marcar como concluida">
                                <i class="fas fa-minus-circle close" title="Remover"></i>
                                <span class="${classSpan}">
                                <i class="fas fa-check-circle ${classCheck}"></i>-${tarefa.titulo} </span></li>`;
    }
    updateCloseButton();
    updateCheckButton();
}

function updateCloseButton(){
    let botoes_close = document.querySelectorAll(".close");
    for(let botao of botoes_close){
        botao.addEventListener("click", function(e){
            let id = Number(e.target.parentElement.getAttribute("data-id"));
            let index = tarefas.findIndex( (item) => item.id == id);
            tarefas.splice(index, 1);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            exibirTarefas();
        })
    }

}

function updateCheckButton(){
    let itens_li = document.querySelectorAll("li span");
    for (let item_li of itens_li) {
        item_li.addEventListener("click", function(e){
            let id = Number(e.target.parentElement.getAttribute("data-id"));
            let index = tarefas.findIndex( (item) => item.id == id);
            let tarefa_marcada = tarefas.find( (item) => item.id == id);
            tarefas.splice(index, 1);
            tarefa_marcada.status = 0;
            tarefas.push(tarefa_marcada);
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
            exibirTarefas();
        });
    }

}

//Dark-Mode

const dark_body = document.querySelector("body");
const dark_ul = document.querySelector("ul");
const btn = document.querySelector(".btn-dark-mode");

btn.addEventListener("click", function(e){
    if (e.target) {
        dark_body.classList.toggle("dark");
        dark_ul.classList.toggle("dark-ul");
    };
        
})