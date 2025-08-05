<?php
// Configuración de la base de datos
$host = 'localhost';
$usuario = 'tu_usuario_mysql';
$contrasena = 'tu_contrasena_mysql';
$base_de_datos = 'tu_base_de_datos';

// Crear conexión
$conexion = new mysqli($host, $usuario, $contrasena, $base_de_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Consulta a la base de datos
$sql = "SELECT id, nombre, precio FROM productos";
$resultado = $conexion->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Listado de Productos</title>
</head>
<body>
    <h1>Productos en stock</h1>

    <?php if ($resultado && $resultado->num_rows > 0): ?>
        <ul>
            <?php while($fila = $resultado->fetch_assoc()): ?>
                <li>
                    <strong><?php echo htmlspecialchars($fila["nombre"]); ?></strong>
                    - $<?php echo number_format($fila["precio"], 2); ?>
                </li>
            <?php endwhile; ?>
        </ul>
    <?php else: ?>
        <p>No hay productos cargados.</p>
    <?php endif; ?>

</body>
</html>

<?php
$conexion->close();
?>

