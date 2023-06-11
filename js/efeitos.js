const start = document.querySelector('.iniciar');
const pause = document.querySelector('.pausar');
const clean = document.querySelector('.zerar');

//elements to change
const principal = document.querySelector('.principal');
const conteudo = document.querySelector('.conteudo');
const timer = document.querySelector('.timer');
const temasDiv = document.querySelector('.temas-div');
const temas = document.querySelector('.temas');
const iconePincel = document.querySelector('.icone-pincel');

// temas
const blue = document.querySelector('.blue');
const pink = document.querySelector('.pink');
const dark = document.querySelector('.dark');


document.addEventListener('click', function(e) {
    start === e.target ? start.classList = "clicado" :  start.classList = 'iniciar';
    
    pause === e.target ? pause.classList = 'clicado' : pause.classList = 'pausar';

    clean === e.target ? clean.classList = 'clicado' : clean.classList = 'zerar';

    if (e.target === temas || e.target === iconePincel) {
        temasDiv.style.display = 'flex';
        temas.style.height = '200px';
    };
    
    if (e.target === principal || e.target === start || e.target === pause || e.target === clean) {
        temasDiv.style.display = 'none';
        temas.style.height = '70px';
    };
});

document.addEventListener('change', function(e) {
    if (e.target === blue) {
        const cor = 'blue';
        stilos(cor);
        localStorage.setItem('teme', JSON.stringify([cor]));
    };

    if (e.target === pink) {
        const cor = 'pink';
        stilos(cor);
        localStorage.setItem('teme', JSON.stringify([cor]));
    };

    if (e.target === dark) {
        const cor = 'black';
        stilos(cor);
        localStorage.setItem('teme', JSON.stringify([cor]));
    };
});


function stilos(a) {
    let t = document.querySelector('.tempo');
    principal.style.backgroundColor = `var(--dark${a})`;
    conteudo.style.backgroundColor = `var(--light${a})`;
    timer.style.backgroundColor = `var(--midle${a})`;
    t.style.backgroundColor = `var(--light${a})`;
}

function temaModo() {
    const modoTema = localStorage.getItem('teme');
    const p = JSON.parse(modoTema);
    let t = document.querySelector('.tempo');
    stilos(p[0]);
}

temaModo();
