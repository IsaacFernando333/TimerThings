const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
const deleting = document.querySelector('.esquerdo-resetar');
const tempoValor = document.querySelector('.tempo-valor');
const dias = document.querySelector('.dias');
const horas = document.querySelector('.horas');
const minutos = document.querySelector('.minutos');
const segundos = document.querySelector('.segundos');

document.addEventListener('click', function(e) {
    if (e.target === start) {
        start.classList = 'clicado';
    } else {
        start.classList = 'btns-tempo'
    };

    if (e.target === pause) {
        pause.classList = 'clicado';
    } else {
        pause.classList = 'btns-tempo';
    };

    if (e.target === reset) {
        reset.classList = 'clicado';
    } else {
        reset.classList = 'btns-tempo';
    };
});

let s = 0, m = 0, h = 0, d = 0;
let t, z;
let ts = 0, th = 0, tm = 0, td = 0;

function formataTelaTimer() {
    if (h < 10 && m < 10 && s < 10) {
        tempoValor.innerHTML = `0${h}:0${m}:0${s}`;
    } else if (m < 10 && s < 10) {
        tempoValor.innerHTML = `${h}:0${m}:0${s}`;
    } else if (h < 10 && s < 10) {
        tempoValor.innerHTML = `0${h}:${m}:0${s}`;
    } else if (h < 10 && m < 10) {
        tempoValor.innerHTML = `0${h}:0${m}:${s}`;
    } else if (h < 10) {
        tempoValor.innerHTML = `0${h}:${m}:${s}`;
    } else if (m < 10) {
        tempoValor.innerHTML = `${h}:0${m}:${s}`;
    } else if (s < 10) {
        tempoValor.innerHTML = `${h}:${m}:0${s}`;
    }
}

function formataTelaDefinitivo() {
    dias.innerHTML = `${td}d`;
    horas.innerHTML = `${th}h`;
    minutos.innerHTML = `${tm}m`;
    segundos.innerHTML = `${ts}s`;
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

start.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    // iniciaT();
    iniciaTudo();
    salvar();
});

pause.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    salvar();
});

reset.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    tempoValor.innerHTML = "00:00:00";
    s = 0;
    m = 0;
    h = 0;
    d = 0;
    salvar();
});

deleting.addEventListener('click', function(e) {
    clearInterval(t);
    clearInterval(z);
    let c = confirm("DESEJA deletar ESSA INFORMAÇÃO?");
    if (c) {
        localStorage.removeItem('tempoValorTotal');
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
    localStorage.setItem('tempoValorSalvo', dadosJSON);
    localStorage.setItem('tempoValorTotal', definitivosJSON);
}

function retornar() {
    const retorno = localStorage.getItem('tempoValorSalvo');
    const retornoDefinitivo = localStorage.getItem('tempoValorTotal');
    const listaRetorno = JSON.parse(retorno);
    const listaDefinitivo = JSON.parse(retornoDefinitivo);
    s = listaRetorno[2];
    m = listaRetorno[1];
    h = listaRetorno[0];
    d = listaRetorno[3];
    formataTelaTimer();
    ts = listaDefinitivo[2];
    tm = listaDefinitivo[1];
    th = listaDefinitivo[0];
    td = listaDefinitivo[3];
    formataTelaDefinitivo();
}

formataTelaDefinitivo();
retornar();
