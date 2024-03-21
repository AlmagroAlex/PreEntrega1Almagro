// Array de productos con sus precios
var productos = [
    { nombre: "remera", precio: 20 },
    { nombre: "camisa", precio: 30 },
    { nombre: "musculosa", precio: 25 }
];

// Evento para iniciar la compra
document.getElementById("iniciarCompra").addEventListener("click", function() {
    var nombreUsuario = prompt("Por favor, ingresa tu nombre:");
    if (nombreUsuario) {
        localStorage.setItem("nombreUsuario", nombreUsuario);
        var producto = buscarProducto();
        var cantidad = solicitarCantidad(producto);
        var totalCompra = calcularTotal(producto, cantidad);
        alert("El total de tu compra es de: $" + totalCompra.toFixed(2));
        alert("Gracias por tu compra, " + nombreUsuario + ", y vuelve pronto! :)");
    } else {
        alert("Por favor, ingresa un nombre.");
    }
});

// Función para buscar un producto
function buscarProducto() {
    var productoBuscado = prompt("Hola " + localStorage.getItem("nombreUsuario") + "! Por favor, ingresa el nombre del producto que buscas (Remera, Camisa o Musculosa):");
    if (!productoBuscado) {
        alert("Por favor, ingresa un nombre de producto válido.");
        return buscarProducto(); // Llamada recursiva en caso de entrada inválida
    }
    var productoEncontrado = productos.find(function(producto) {
        return producto.nombre.toLowerCase() === productoBuscado.toLowerCase();
    });
    if (!productoEncontrado) {
        alert("Lo siento, el producto que buscas no está disponible en nuestra tienda.");
        return buscarProducto(); // Llamada recursiva en caso de producto no encontrado
    }
    return productoEncontrado;
}

// Función para solicitar al usuario la cantidad de productos que desea comprar
function solicitarCantidad(producto) {
    var cantidad = parseInt(prompt("Ingresa la cantidad de " + producto.nombre + "s que deseas comprar:"));
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresa una cantidad válida.");
        return solicitarCantidad(producto); //en caso de cantidad inválida
    }
    return cantidad;
}

// Función para calcular el total de la compra
function calcularTotal(producto, cantidad) {
    return producto.precio * cantidad;
}
