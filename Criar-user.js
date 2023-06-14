const telapreta = document.querySelector('.tela-span');
const telashow = document.querySelector('.esqueleto');
const telavalor = document.querySelector('.novoUser');
const foto = document.querySelector('.novoUser-foto');
const btn = document.querySelector('.novoUser-btn');
const mostrarNome = document.querySelector('.nome-valor');
// const perfil = document.querySelector('.foto');

btn.addEventListener('click', function() {
    const nome = document.querySelector('.novoUser-nome');
    if (nome.value === '') {
        return;
    } else {
        const valorNome = nome.value;
        // const fot = foto.value;
        // localStorage.setItem('img', JSON.stringify(fot));
        localStorage.setItem('user', JSON.stringify(valorNome));
        location.reload();
    }
});

function garanteNomeUser() {
    if (localStorage.getItem('user') === null) {
        telapreta.style.display = 'flex';
        telavalor.style.display = 'flex';
        telashow.appendChild(telavalor);
    } else {
        telavalor.style.display = 'none';
        const valorNomeVolta = JSON.parse(localStorage.getItem('user'));
        // const picture = JSON.parse(localStorage.getItem('img'));
        // perfil.setAttribute('src', `C:/Users/isaac/Desktop/${picture}`);
        mostrarNome.innerHTML = valorNomeVolta;
    }
}

garanteNomeUser();