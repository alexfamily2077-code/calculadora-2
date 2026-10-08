const display = document.getElementById("display");

let numeroAtual = "0";
let numeroAnterior = null;
let operador = null;
let esperandoNumero = false;

function atualizarDisplay() {
    if (numeroAtual.length > 10) {
        display.style.fontSize = "28px";
    } else {
        display.style.fontSize = "42px";
    }
    display.textContent = numeroAtual;
}

function adicionarNumero(numero) {
    if (esperandoNumero) {
        numeroAtual = numero;
        esperandoNumero = false;
        atualizarDisplay();
        return;
    }

    if (numero === "." && numeroAtual.includes(".")) {
        return;
    }

    if (numeroAtual === "0" && numero !== ".") {
        numeroAtual = numero;
    } else {
        numeroAtual += numero;
    }

    atualizarDisplay();
}

function escolherOperador(novoOperador) {
    if (operador !== null && !esperandoNumero) {
        calcular();
    }

    numeroAnterior = parseFloat(numeroAtual);
    operador = novoOperador;
    esperandoNumero = true;
}

function calcular() {
    if (operador === null || numeroAnterior === null) {
        return;
    }

    const atual = parseFloat(numeroAtual);
    let resultado;

    switch (operador) {
        case "+":
            resultado = numeroAnterior + atual;
            break;
        case "-":
            resultado = numeroAnterior - atual;
            break;
        case "×":
            resultado = numeroAnterior * atual;
            break;
        case "÷":
            if (atual === 0) {
                numeroAtual = "Erro";
                numeroAnterior = null;
                operador = null;
                atualizarDisplay();
                return;
            }
            resultado = numeroAnterior / atual;
            break;
    }

    resultado = Math.round(resultado * 100000000) / 100000000;

    numeroAtual = String(resultado);
    numeroAnterior = null;
    operador = null;
    esperandoNumero = true;

    atualizarDisplay();
}

function limpar() {
    numeroAtual = "0";
    numeroAnterior = null;
    operador = null;
    esperandoNumero = false;
    atualizarDisplay();
}

function apagar() {
    if (esperandoNumero || numeroAtual === "Erro") {
        return;
    }

    if (numeroAtual.length <= 1) {
        numeroAtual = "0";
    } else {
        numeroAtual = numeroAtual.slice(0, -1);
    }

    atualizarDisplay();
}

function porcentagem() {
    if (numeroAtual === "Erro") return;
    numeroAtual = String(parseFloat(numeroAtual) / 100);
    atualizarDisplay();
}

// Eventos do Teclado
document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        adicionarNumero(event.key);
    }
    if (event.key === ".") {
        adicionarNumero(".");
    }
    if (event.key === "+") {
        escolherOperador("+");
    }
    if (event.key === "-") {
        escolherOperador("-");
    }
    if (event.key === "*" || event.key === "x") {
        escolherOperador("×");
    }
    if (event.key === "/") {
        event.preventDefault();
        escolherOperador("÷");
    }
    if (event.key === "Enter" || event.key === "=") {
        calcular();
    }
    if (event.key === "Escape") {
        limpar();
    }
    if (event.key === "Backspace") {
        apagar();
    }
    if (event.key === "%") {
        porcentagem();
    }
});