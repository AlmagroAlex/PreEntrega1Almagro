// Evento para iniciar la compra
document.getElementById("iniciarCompra").addEventListener("click", function() {
    document.getElementById("contenido").style.display = "block";
});

// Cargar datos de productos
axios.get('productos.json')
    .then(function(response) {
        var productos = response.data;
        var productoSelect = document.getElementById("producto");
        productos.forEach(function(producto) {
            var option = document.createElement("option");
            option.value = producto.nombre;
            option.text = producto.nombre + " - $" + producto.precio;
            productoSelect.appendChild(option);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

// Evento para procesar el formulario
document.getElementById("compraForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var nombreUsuario = document.getElementById("nombreUsuario").value;
    var productoSeleccionado = document.getElementById("producto").value;
    var cantidad = parseInt(document.getElementById("cantidad").value);

    axios.get('productos.json')
        .then(function(response) {
            var productos = response.data;
            var producto = productos.find(function(item) {
                return item.nombre === productoSeleccionado;
            });

            if (producto) {
                var totalCompra = calcularTotal(producto, cantidad);
                document.getElementById("resultado").innerText = "Hola " + nombreUsuario + ", el total de tu compra es de: $" + totalCompra.toFixed(2) + ". Gracias por tu compra y vuelve pronto!";
            } else {
                document.getElementById("resultado").innerText = "Lo siento, el producto seleccionado no está disponible en nuestra tienda.";
            }
        })
        .catch(function(error) {
            console.log(error);
        });
});

// Función para calcular el total de la compra
function calcularTotal(producto, cantidad) {
    return producto.precio * cantidad;
}
