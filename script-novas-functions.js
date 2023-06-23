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

// document.addEventListener('click', (e) => {
//     const elementoLista = document.querySelectorAll('div.elemento-lista');
//     for (div of elementoLista) {
//         if (e.target === div) {
//             div.style.border = '2px dashed gray';
//             let foco = div.innerText;
//             tituloResumo.innerHTML = `FOCO ${foco}, RESUMO:`;
//         } else {
//             div.style.border = 'none';
//         }
//     };
// });

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
    esqueleto.style.height = '500px';
    esqueleto.appendChild(temas);
});

criar.addEventListener('click', (e) => {
    criando.style.display = 'flex';
    temas.style.display = 'none';
    esqueleto.style.height = '400px';
    esqueleto.appendChild(criando);
});


resetar.addEventListener('click', () => {
    let rst = confirm('Essa funcionalidade não existe ainda! Isso apenas apagará tudo definitvamente');
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

btnCriar.addEventListener('click', (e) => {
    const valorCriar = document.querySelector('.input-foco');
    let elemento = document.createElement('div');
    let valor = document.createTextNode(`${valorCriar.value}`);
    elemento.className = 'elemento-lista';
    elemento.appendChild(valor);
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