const start = document.querySelector('.iniciar');
const pause = document.querySelector('.pausar');
const clean = document.querySelector('.zerar');

//elements to change
const principal = document.querySelector('.principal');
const conteudo = document.querySelector('.conteudo');
const timer = document.querySelector('.timer');
const temasDiv = document.querySelectorAll('.temas-div');
const temas = document.querySelector('.temas');
const temas2 = document.querySelector('.temas-2');

// temas
const blue = document.querySelector('.blue');
const pink = document.querySelector('.pink');
const dark = document.querySelector('.dark');

document.addEventListener('click', function(e) {
    let t = document.querySelector('.tempo');
    if (start === e.target) {
        t.style.color = 'white';
        start.classList = "clicado";
    } else {
        start.classList = 'iniciar';
    };
    
    if (pause === e.target) {
        pause.classList = 'clicado';
        t.style.color = 'rgb(139, 139, 255)';
    } else {
        pause.classList = 'pausar';
    };
    
    if (clean === e.target) {
        clean.classList = 'clicado';
        t.style.color = 'red';
    } else {
        clean.classList = 'zerar';
    };
});

document.addEventListener('click', function(e) {
    let t = document.querySelector('.tempo');
    if (e.target === blue) {
            principal.style.backgroundColor = 'var(--darkblue)';
            conteudo.style.backgroundColor = 'var(--lightblue)';
            timer.style.backgroundColor = 'var(--midleblue)';
            t.style.backgroundColor = 'var(--lightblue)';
            const cor = 'blue';
            localStorage.setItem('teme', JSON.stringify([cor]));
    };

    if (e.target === pink) {
        principal.style.backgroundColor = 'var(--darkpink)';
        conteudo.style.backgroundColor = 'var(--lightpink)';
        timer.style.backgroundColor = 'var(--midlepink)';
        t.style.backgroundColor = 'var(--lightpink)';
        const cor = 'pink';
        localStorage.setItem('teme', JSON.stringify([cor]));
    };

    if (e.target === dark) {
        principal.style.backgroundColor = 'var(--darkblack)';
        conteudo.style.backgroundColor = 'var(--lightblack)';
        timer.style.backgroundColor = 'var(--midleblack)';
        t.style.backgroundColor = 'var(--lightblack)';
        const cor = 'dark';
        localStorage.setItem('teme', JSON.stringify([cor]));
    };

    if (e.target === temas || e.target === temas2) {
        temasDiv[0].style.display = 'flex';
        temasDiv[1].style.display = 'flex';
        temasDiv[2].style.display = 'flex';
        temasDiv[3].style.display = 'flex';
        temas.style.height = '200px';
    };
});



function temaModo() {
    const modoTema = localStorage.getItem('teme');
    const p = JSON.parse(modoTema);
    let t = document.querySelector('.tempo');
    console.log(modoTema)
    if (p[0] === 'dark') {
        principal.style.backgroundColor = 'var(--darkblack)';
        conteudo.style.backgroundColor = 'var(--lightblack)';
        timer.style.backgroundColor = 'var(--midleblack)';
        t.style.backgroundColor = 'var(--lightblack)';
    };

    if (p[0] === 'blue') {
        principal.style.backgroundColor = 'var(--darkblue)';
        conteudo.style.backgroundColor = 'var(--lightblue)';
        timer.style.backgroundColor = 'var(--midleblue)';
        t.style.backgroundColor = 'var(--lightblue)';
    };
    
    if (p[0] === 'pink') {
        principal.style.backgroundColor = 'var(--darkpink)';
        conteudo.style.backgroundColor = 'var(--lightpink)';
        timer.style.backgroundColor = 'var(--midlepink)';
        t.style.backgroundColor = 'var(--lightpink)';
    };
}

temaModo();
