const elementoLista = document.querySelectorAll('div.elemento-lista');
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
    for (div of elementoLista) {
        if (e.target === div) {
            let foco = div.innerText;
            tituloResumo.innerHTML = `FOCO ${foco}, RESUMO:`;
        };
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
    const valorCriar = document.querySelector('.input-foco').value;
    let elemento = document.createElement('div');
    let valor = document.createTextNode(`${valorCriar}`);
    elemento.className = 'elemento-lista';
    elemento.appendChild(valor);
    if (valorCriar !== "") {
        focos.appendChild(elemento);
    } else {
        return;
    };
})