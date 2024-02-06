function calcularTotal() {
    const producto1 = parseInt(document.getElementById("producto1").value) || 0;
    const producto2 = parseInt(document.getElementById("producto2").value) || 0;
    const producto3 = parseInt(document.getElementById("producto3").value) || 0;

    let total = 0;

    // Verificar si se ha seleccionado al menos un producto
    if (producto1 === 0 && producto2 === 0 && producto3 === 0) {
        document.getElementById("resultado").innerText = "Por favor, seleccione al menos un producto.";
        return;
    }

    // Calcular el costo total
    const productos = [producto1, producto2, producto3];
    for (let i = 0; i < productos.length; i++) {
        total += productos[i];
    }

    document.getElementById("resultado").innerText = `El costo total es: $${total}`;
}