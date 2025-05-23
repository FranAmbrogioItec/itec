const autos = []; 

const renderizarAutos = () => {
    const tabla = document.getElementById("tablaAutos").querySelector('tbody');

    tabla.innerHTML = ''; //usa innerHTML para limpiar el contenido de la tabla

    autos.forEach((auto, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td> ${index + 1}</td>
            <td> ${auto.marca}</td>
            <td> ${auto.modelo}</td>
            <td> ${auto.anio}</td>
        `;

        tabla.appendChild(fila);
    });
};

const agregarAuto = () => {
    const marca = document.getElementById('marca').value.trim();
    const modelo = document.getElementById('modelo').value.trim();
    const anio = document.getElementById('anio').value; 

    if (marca !== '' && modelo !== '' && anio !== '') {
        autos.push({ marca, modelo, anio }); // agregar el nuevo auto al array

        renderizarAutos(); //volver a renderizar la tabla con el nuevo auto

        //limpiar los campos del formulario después de agregar
        document.getElementById('marca').value = '';
        document.getElementById('modelo').value = '';
        document.getElementById('anio').value = '';
    }
};
