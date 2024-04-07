const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
const deleting = document.querySelector('.esquerdo-resetar');
const tempoValor = document.querySelector('.tempo-valor');
const dias = document.querySelector('.dias');
const horas = document.querySelector('.horas');
const minutos = document.querySelector('.minutos');
const segundos = document.querySelector('.segundos');

const worker = new Worker('worker.js');

localStorage.setItem('tempoValorSalvo', JSON.stringify([0,0,0,0]));


async function salva() {
    const nomeTarefa = localStorage.getItem('tarefaFoco');
    const definitivos = JSON.parse(localStorage.getItem(`${nomeTarefa}`));
    const data = { nomeTarefa, definitivos};
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)    
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    del();
    buscardata();
}

salva();



async function buscardata() {
    const response = await fetch('/api');
    const dataa = await response.json();
    
    let l = [];
    let d = [];
    
    for (e of dataa) {
        
        const v = e.tempo.split(',');
        const calculo = ((v[2]/60)/60) + (v[1]/60) + parseInt(v[0]) + (v[3]/24);
        l.push(e.nomeTarefa);
        d.push(calculo.toFixed(2));
    }
    
    const bla = document.createElement('canvas');
    bla.setAttribute('id','myChart');
    const ctx = document.querySelector('.chartBox');
    ctx.append(bla);

    const data = {
        labels: l,
        datasets: [{
          label: 'Horas totais',
          data: d,
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)'
          ],
          borderWidth: 1
        }]
      };
  
      // config 
      const config = {
        type: 'bar',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
    };
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

async function del() {
    let c = document.getElementById('myChart');
    c.remove();
}

window.onresize = ()=> { document.querySelector('.container-raiz').style.transition = '0s'};

document.addEventListener('click', function(e) {
    if (e.target === start) {
        document.querySelector('.container-raiz').style.transition = '2s';
        start.classList = 'clicado';
        document.querySelector('.container-raiz').style.backgroundColor = 'black';
    } else {
        start.classList = 'btns-tempo';
    };
    
    if (e.target === pause) {
        pause.classList = 'clicado';
        document.querySelector('.container-raiz').style.transition = '2s';
        document.querySelector('.container-raiz').style.backgroundColor = `${localStorage.getItem('COLOR').slice(2,-2)}`;
    } else {
        pause.classList = 'btns-tempo';
    };
    
    if (e.target === reset) {
        document.querySelector('.container-raiz').style.transition = '2s';
        document.querySelector('.container-raiz').style.backgroundColor = `${localStorage.getItem('COLOR').slice(2,-2)}`;
        reset.classList = 'clicado';
    } else {
        reset.classList = 'btns-tempo';
    };
});


// tarefaFoco = localStorage.getItem('tarefaFoco');
let s = 0, m = 0, h = 0, d = 0;
let ts = 0, th = 0, tm = 0, td = 0;
let t, z;

worker.onmessage = function(message) {
    let dataMain = message.data;
    s = dataMain[0];
    m = dataMain[1];
    h = dataMain[2];
    d = dataMain[3];
    ts = dataMain[4];
    th = dataMain[5];
    tm = dataMain[6];
    td = dataMain[7];

    if (s > 60) {
        localStorage.setItem('tempoValorSalvo', JSON.stringify([0,0,0,0]));
        s = 0;
        m = 0;
        h = 0;
        d = 0;
        worker.postMessage('pause');
        alert('Meta de tempo batida');
    }
    
    
    formataTelaTimer();
    formataTelaDefinitivo();
    salvar();
    document.title = 'Timer Things ' + tempoValor.innerHTML;
}

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

start.addEventListener('click', function(e) {
    worker.postMessage(['start', s, m, h, d, ts, tm, th, td]);
});

pause.addEventListener('click', async function(e) {
    worker.postMessage('pause');
    del();
    
    const nomeTarefa = localStorage.getItem('tarefaFoco');
    const definitivos = JSON.parse(localStorage.getItem(`${nomeTarefa}`));
    const data = { nomeTarefa, definitivos};
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)    
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    
    buscardata();
});

reset.addEventListener('click', async function(e) {
    worker.postMessage('reset');
    tempoValor.innerHTML = "00:00:00";
    document.title = tempoValor.innerHTML;
    s = 0;
    m = 0;
    h = 0;
    d = 0;
    salvar();
});

deleting.addEventListener('click', function(e) {
    worker.postMessage('deleting');
    let c = confirm("DESEJA DELETAR ESSA INFORMAÇÃO?");
    if (c) {
        return;
        
        // localStorage.removeItem('tempoValorTotal');
        // [ts, th, tm, td] = [0, 0, 0, 0];
        // formataTelaDefinitivo();
    } else {
        return;
    }
});

function salvar() {
    let tarefaFoco = localStorage.getItem('tarefaFoco');
    const dados = [h, m, s, d];
    const definitivos = [th, tm, ts, td];
    const dadosJSON = JSON.stringify(dados);
    const definitivosJSON = JSON.stringify(definitivos);
    localStorage.setItem('tempoValorSalvo', dadosJSON);
    localStorage.setItem(`${tarefaFoco}`, definitivosJSON);
}

function retornar() {
    let tarefaFoco = localStorage.getItem('tarefaFoco');
    const retorno = localStorage.getItem('tempoValorSalvo');
    const retornoDefinitivo = localStorage.getItem(`${tarefaFoco}`);
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