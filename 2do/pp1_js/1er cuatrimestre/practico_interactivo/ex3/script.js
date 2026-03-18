const peso = parseInt(prompt("Cual es tu peso?"));
const altura = parseFloat(prompt("Cual es tu altura?"));
const imc = peso / (altura * altura);

alert("Tu imc es : " + imc);

if (imc < 18.5) {
    alert("Bajo peso")
} else if (imc >= 18.5 && imc <= 24.9) {
    alert("Peso normal")
} else if (imc >= 25 && imc <= 29.9) {
    alert("Sobrepeso")
} else {
    alert("Gordo chupa pija")
}