const telapreta = document.querySelector('.tela-span');
const telashow = document.querySelector('.esqueleto');
const telavalor = document.querySelector('.novoUser');
const foto = document.querySelector('.novoUser-foto');
const btn = document.querySelector('.novoUser-btn');
const mostrarNome = document.querySelector('.nome-valor');
const perfil = document.querySelector('.foto');

btn.addEventListener('click', function() {

    const fr = new FileReader();
    if (foto.value !== '') {
        fr.readAsDataURL(foto.files[0]);
    };
    fr.addEventListener('load', () => {
        const url = fr.result;
        const img = new Image();
        img.src = url;
        localStorage.setItem('img', url);
    });

    const nome = document.querySelector('.novoUser-nome');
    if (nome.value === '') {
        return;
    } else {
        const valorNome = nome.value;
        localStorage.setItem('user', JSON.stringify(valorNome));
        localStorage.setItem('tarefaFoco', 'TOTAL');
        location.reload();
    }
    alert('Seja bem-vindo(a)!');
});

function garanteFotoUser() {
    const img = new Image();
    if (localStorage.img) {
        const FotoPerfil = localStorage.getItem('img');
        img.src = FotoPerfil;
        perfil.appendChild(img);
    } else {
        const imgPlaceHolder = document.createElement('img');
        imgPlaceHolder.src = "./img/istockphoto-1300845620-612x612.jpg";
        imgPlaceHolder.alt ='Rosto';
        perfil.appendChild(imgPlaceHolder);
    };
}


function garanteNomeUser() {
    if (localStorage.getItem('user') === null) {
        telapreta.style.display = 'flex';
        telavalor.style.display = 'flex';
        telashow.appendChild(telavalor);
    } else {
        telavalor.style.display = 'none';
        const valorNomeVolta = JSON.parse(localStorage.getItem('user'));
        mostrarNome.innerHTML = valorNomeVolta;
        garanteFotoUser();
    }
}

garanteNomeUser();