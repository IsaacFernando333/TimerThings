const iniciar = document.querySelector('.iniciar');
const pausar = document.querySelector('.pausar');
const zerar = document.querySelector('.zerar');
const apagar = document.querySelector('.definitivo');
const tempo = document.querySelector('.tempo');
const total = document.querySelector('.total');

let s, m, h, d = 0;
let t, z;
let ts, th, tm, td = 0;

function formataTelaTimer() {
    if (h < 10 && m < 10 && s < 10) {
        tempo.innerHTML = `0${h}:0${m}:0${s}`;
    } else if (m < 10 && s < 10) {
        tempo.innerHTML = `${h}:0${m}:0${s}`;
    } else if (h < 10 && s < 10) {
        tempo.innerHTML = `0${h}:${m}:0${s}`;
    } else if (h < 10 && m < 10) {
        tempo.innerHTML = `0${h}:0${m}:${s}`;
    } else if (h < 10) {
        tempo.innerHTML = `0${h}:${m}:${s}`;
    } else if (m < 10) {
        tempo.innerHTML = `${h}:0${m}:${s}`;
    } else if (s < 10) {
        tempo.innerHTML = `${h}:${m}:0${s}`;
    }
}

function formataTelaDefinitivo() {
    total.innerHTML = `Dias: ${td} → Horas: ${th} → Minutos: ${tm} → Segundos: ${ts}`;
}

function iniciaTudo() {
    t = setInterval(function() {
        if (s <= 58) {
            s++;
        } else {
            s = 0;
            m++;
        };
    
        if (m > 59) {
            m = 0;
            h++;
        };
    
        if (h > 23) {
            h = 0;
            d++;
        };
        formataTelaTimer();
        formataTelaDefinitivo();
        salvar()
    }, 1000);

    z = setInterval(function() {
        if (ts <= 58) {
            ts++;
        } else {
            ts = 0;
            tm++;
        }
    
        if (tm > 59) {
            tm = 0;
            th++;
        }

        if (th > 23) {
            th = 0;
            td++;
        }
        formataTelaDefinitivo();
        salvar();
    }, 1000);
}

iniciar.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    // iniciaT();
    iniciaTudo();
    salvar();
});

pausar.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    salvar();
});

zerar.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    tempo.innerHTML = "00:00:00";
    s = 0;
    m = 0;
    h = 0;
    d = 0;
    salvar();
});

apagar.addEventListener('click', function(e) {
    let c = confirm("DESEJA APAGAR ESSA INFORMAÇÃO?");
    if (c) {
        localStorage.removeItem('tempoTotal');
        [ts, th, tm, td] = [0, 0, 0, 0];
        formataTelaDefinitivo();
    } else {
        return;
    }
});

function salvar() {
    const dados = [h, m, s, d];
    const definitivos = [th, tm, ts, td];
    const dadosJSON = JSON.stringify(dados);
    const definitivosJSON = JSON.stringify(definitivos);
    localStorage.setItem('tempoSalvo', dadosJSON);
    localStorage.setItem('tempoTotal', definitivosJSON);
}

function retornar() {
    const retorno = localStorage.getItem('tempoSalvo');
    const retornoDefinitivo = localStorage.getItem('tempoTotal');
    const listaRetorno = JSON.parse(retorno);
    const listaDefinitivo = JSON.parse(retornoDefinitivo);
    s = listaRetorno[2];
    m = listaRetorno[1];
    h = listaRetorno[0];
    d = listaRetorno[3];
    formataTelaTimer();
    ts = listaDefinitivo[2]
    tm = listaDefinitivo[1]
    th = listaDefinitivo[0]
    td = listaDefinitivo[3]
    formataTelaDefinitivo();
}

retornar();
