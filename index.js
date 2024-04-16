// Evento para iniciar la compra
document.getElementById("iniciarCompra").addEventListener("click", function() {
    document.getElementById("contenido").style.display = "block";
});

// Cargar datos de productos
axios.get('productos.json')
    .then(function(response) {
        const productos = response.data;
        const productoSelect = document.getElementById("producto");
        productos.forEach(function(producto) {
            const option = document.createElement("option");
            option.value = producto.nombre;
            option.text = producto.nombre + " - $" + producto.precio;
            productoSelect.appendChild(option);
        });

        // Cargar productos seleccionados del localStorage al iniciar la página
        const productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];
        productosSeleccionados.forEach(productoSeleccionado => {
            const option = document.createElement("option");
            option.value = productoSeleccionado.nombre;
            option.text = productoSeleccionado.nombre;
            productoSelect.appendChild(option);
        });
    })
    .catch(function(error) {
        console.log(error);
    });

// Evento para procesar el formulario
document.getElementById("compraForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const productoSeleccionado = document.getElementById("producto").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    // Obtener o inicializar los productos seleccionados desde el localStorage
    let productosSeleccionados = JSON.parse(localStorage.getItem("productosSeleccionados")) || [];

    axios.get('productos.json')
        .then(function(response) {
            const productos = response.data;
            const producto = productos.find(item => item.nombre === productoSeleccionado);
            if (producto) {
                // Agregar el producto seleccionado al array
                productosSeleccionados.push({ nombre: producto.nombre, cantidad: cantidad });
                // Almacenar los productos seleccionados en el localStorage
                localStorage.setItem("productosSeleccionados", JSON.stringify(productosSeleccionados));

                let totalCompra = 0;
                productosSeleccionados.forEach(productoSeleccionado => {
                    totalCompra += calcularTotal(productos.find(item => item.nombre === productoSeleccionado.nombre), productoSeleccionado.cantidad);
                });

                if (totalCompra > 0) {
                    // Utilizar SweetAlert para mostrar el mensaje de compra exitosa
                    Swal.fire({
                        icon: 'success',
                        title: '¡Compra exitosa!',
                        text: `Hola ${nombreUsuario}, el total de tu compra es de: $${totalCompra.toFixed(2)}. Gracias por tu compra y vuelve pronto!`
                    });
                } else {
                    // Utilizar SweetAlert para mostrar un mensaje de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Lo siento, los productos seleccionados no están disponibles en nuestra tienda.'
                    });
                }
            } else {
                // Utilizar SweetAlert para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Lo siento, el producto seleccionado no está disponible en nuestra tienda.'
                });
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
