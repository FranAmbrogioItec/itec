let producto1 = 100; 
let producto2 = 200; 
let esEstudiante = false; 

let totalSinDescuento = producto1 + producto2;
let descuento = esEstudiante ? totalSinDescuento * 0.1 : 0; //si esEstudiante es true, aplica el *0.1, si es false, descuento=0
let totalFinal = totalSinDescuento - descuento;

console.log("Precio sin descuento:", totalSinDescuento);

if (esEstudiante) {
    console.log("Se aplicó un descuento de:", descuento);
} else {
    console.log("No se aplica descuento ya que no es estudiante");
}

console.log("Total a pagar:", totalFinal);
