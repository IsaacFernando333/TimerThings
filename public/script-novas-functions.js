const tituloResumo = document.querySelector('.resumo-titulo-texto');
const criar = document.querySelector('.icone-criar');
const palleta = document.querySelector('.icone-palleta');
const span = document.querySelector('.tela-span');
const esqueleto = document.querySelector('.esqueleto');
const temas = document.querySelector('.esqueleto-theme');
const criando = document.querySelector('.criando-adicionar');
const resetar = document.querySelector('.esquerdo-sair');
const focos = document.querySelector('.elementos-lista');
const btnCriar = document.querySelector('.submit-foco');


document.addEventListener('click', (e) => {
    const elementoLista = document.querySelectorAll('div.elemento-lista');
    for (div of elementoLista) {
        if (e.target === div) {
            worker.postMessage('pause');
            location.reload();
            let foco = div.innerText;
            localStorage.setItem('tarefaFoco', `${foco}`);
            tituloResumo.innerHTML = `Foco em: ${foco}`;
            window.location.reload();
            mantemTarefa();
        } else {
            mantemTarefa();
        }
    };
});

function mantemTarefa() {
    let mantem = localStorage.getItem('tarefaFoco');
    const elementoLista = document.querySelectorAll('div.elemento-lista');
    for (t of elementoLista) {
        if (t.innerText === mantem) {
            tituloResumo.innerHTML = `Foco em: ${t.innerText}`;
            t.style.border = '4px dashed #68279a';
            t.style.background = 'gray';
            localStorage.getItem('tarefaFoco');
        } else {
            t.style.border = 'none';
        }
    }
}

document.addEventListener('click', (e) => {
    if (e.target === criar || e.target === palleta) {
        span.style.display = 'flex';
    }

    if (localStorage.getItem('user') === null) {
        span.style.display = 'flex';
    } else if (e.target === span) {
        span.style.display = 'none';
    };
});

palleta.addEventListener('click', (e) => {
    temas.style.display = 'flex';
    criando.style.display = 'none';
    esqueleto.appendChild(temas);
});

criar.addEventListener('click', (e) => {
    criando.style.display = 'flex';
    temas.style.display = 'none';
    esqueleto.appendChild(criando);
});


resetar.addEventListener('click', async () => {
    let rst = confirm('Isso apagará tudo definitvamente:');
    if (rst) {
        localStorage.clear();
        location.reload();
    };
    return;
});

let trf = [];

function garanteTarefa(b) {
    if (localStorage.tarefas) {
        trf = JSON.parse(localStorage.getItem('tarefas'));
    };
    
    localStorage.setItem('tarefas', JSON.stringify(trf));
    trf.push(b);
    localStorage.tarefas = JSON.stringify(trf);
}

function mostraDentro() {
   let versaoArray = JSON.parse(localStorage.getItem('tarefas'));
   for (el of versaoArray) {
       let elemento = document.createElement('div');
       elemento.className = 'elemento-lista';
       let texto = document.createTextNode(el);
       elemento.appendChild(texto);
       focos.appendChild(elemento);
   };
}

btnCriar.addEventListener('click', async (e) => {
    const valorCriar = document.querySelector('.input-foco');
    let elemento = document.createElement('div');
    let valor = document.createTextNode(`${valorCriar.value}`);
    elemento.className = 'elemento-lista';
    elemento.appendChild(valor);
    let nomeTarefa = valorCriar.value;
    let tempo = "0, 0, 0, 0";
    let t = [0, 0, 0, 0];
    const dadosJSON = JSON.stringify(t);
    
    localStorage.setItem(nomeTarefa, dadosJSON);

    const data = { nomeTarefa, tempo};
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)    
    };
    const response = await fetch('/api', options);
    const json = await response.json();

    const response_user = await fetch('/api');
    const data_user = await response_user.json();

    window.location.reload();

    if (valorCriar.value !== "") {
        focos.appendChild(elemento);
        garanteTarefa(`${valorCriar.value}`);
        valorCriar.value = '';
        valorCriar.focus();
    } else {
        valorCriar.focus();
        return;
    };
});


mostraDentro();
mantemTarefa();