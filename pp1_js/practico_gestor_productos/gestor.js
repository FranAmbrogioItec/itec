const productos = []; 

const renderizarProductos = () => {
    const tabla = document.getElementById("tablaProductos").querySelector('tbody');

    tabla.innerHTML = ''; //usa innerHTML para limpiar el contenido de la tabla

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td> ${index + 1}</td>
            <td> ${producto.nombre}</td>
            <td> ${producto.categoria}</td>
            <td> ${producto.precio}</td>
        `;

        tabla.appendChild(fila);
    });
};

const agregarProducto = () => {
    const nombre = document.getElementById('nombre').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const precio = document.getElementById('precio').value; 

    if (nombre !== '' && categoria !== '' && precio !== '') {
        productos.push({ nombre, categoria, precio }); // agregar el nuevo producto al array

        renderizarProductos(); 

        //limpiar los campos del formulario después de agregar
        document.getElementById('nombre').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('precio').value = '';
    }
};
