const express = require('express');

const app = express();

let minutos = 0;
let segundos = 0;
let intervalo;
function implementar() {
    segundos++
    if (segundos >= 60) {
        minutos++
        segundos = 0;
    }
}
app.get('/', (req, res) => {
    const minutosFormatados = String(minutos).padStart(2, "0");
    const segundosFormatados = String(segundos).padStart(2, "0");
    return res.send(`Tempo atual do cronômetro ${minutosFormatados}:${segundosFormatados}`)
});

app.get('/iniciar', (req, res) => {
    if (!intervalo) {
        intervalo = setInterval(implementar, 1000);
    }
    return res.send("Cronômetro iniciado");
});

app.get('/pausar', (req, res) => {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
    return res.send("Cronômetro pausado");
});

app.get('/continuar', (req, res) => {
    if (!intervalo) {
        intervalo = setInterval(implementar, 1000);
    }
    return res.send("Cronômetro continuando");
});

app.get('/zerar', (req, res) => {
    if(intervalo){
        clearInterval(intervalo);
        intervalo = null;
        segundos = 0
        minutos = 0
    }
    return res.send("Cronômetro zerado");
});

app.listen(8000);