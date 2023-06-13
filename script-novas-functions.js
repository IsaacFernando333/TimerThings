const tituloResumo = document.querySelector('.resumo-titulo-texto');
const criar = document.querySelector('.icone-criar');
const palleta = document.querySelector('.icone-palleta');
const span = document.querySelector('.tela-span');
const esqueleto = document.querySelector('.esqueleto');
const temas = document.querySelector('.esqueleto-theme');
const criando = document.querySelector('.criando-adicionar');

const btnCriar = document.querySelector('.submit-foco');
const focos = document.querySelector('.elementos-lista');

document.addEventListener('click', (e) => {
    const elementoLista = document.querySelectorAll('div.elemento-lista');
    for (div of elementoLista) {
        if (e.target === div) {
            div.style.border = '2px dashed gray';
            let foco = div.innerText;
            tituloResumo.innerHTML = `FOCO ${foco}, RESUMO:`;
        } else {
            div.style.border = 'none';
        }
    };
});

document.addEventListener('click', (e) => {
    if (e.target === criar || e.target === palleta) {
        span.style.display = 'flex';
    }

    if (e.target === span) {
        span.style.display = 'none';
    };
});

palleta.addEventListener('click', (e) => {
    criando.style.display = 'none';
    temas.style.display = 'flex';
    esqueleto.appendChild(temas);
    esqueleto.style.height = 'fit-content';
});

criar.addEventListener('click', (e) => {
    criando.style.display = 'flex';
    temas.style.display = 'none';
    esqueleto.style.height = '400px';
    esqueleto.appendChild(criando);
});

btnCriar.addEventListener('click', (e) => {
    const valorCriar = document.querySelector('.input-foco');
    let elemento = document.createElement('div');
    let valor = document.createTextNode(`${valorCriar.value}`);
    elemento.className = 'elemento-lista';
    elemento.appendChild(valor);
    if (valorCriar.value !== "") {
        focos.appendChild(elemento);
        valorCriar.value = '';
        valorCriar.focus();
    } else {
        valorCriar.focus();
        return;
    };
})