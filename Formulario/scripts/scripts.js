// Seleccionar el formulario y agregar un evento 'submit'
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Aquí verificarías las credenciales (por ejemplo, con una API o validación interna)

    // Simular que el login es exitoso (para propósitos de demostración)
    const isLoggedIn = true;

    if (isLoggedIn) {
        // Redireccionar a la página principal después del login
        window.location.href = './index.html'; // Cambia 'index.html' por la ruta de tu página principal
    } else {
        // Manejar caso de login fallido si es necesario
        alert('Login fallido. Por favor verifica tus credenciales.');
    }
});

// Seleccionar el botón de logout
const btnLogout = document.getElementById('btnLogout');

btnLogout.addEventListener('click', function() {
    // Aquí deberías limpiar cualquier información de sesión (cookies, localStorage, etc.)

    // Redireccionar al login después del logout
    window.location.href = './login.html'; // Cambia 'login.html' por la ruta de tu página de login
});



const pages = [
    { title: 'Inicio', url: './index.html' },
    { title: 'Dermocosmética', url: './dermocosmetica.html' },
    { title: 'Perfumería', url: './perfumeria.html' },
    { title: 'Higiene Personal', url: './higiene.html' },
    { title: 'Carrito', url: './carrito.html' }
];

document.addEventListener('DOMContentLoaded', function() {
    const decrementButtons = document.querySelectorAll('#button-minus');
    const incrementButtons = document.querySelectorAll('#button-plus');
    const quantityInputs = document.querySelectorAll('.form-control.text-center');
    const deleteButtons = document.querySelectorAll('.btn-danger');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Función para actualizar el subtotal y total
    function updateTotals() {
        let subtotal = 0;
        quantityInputs.forEach((input, index) => {
            const quantity = parseInt(input.value);
            const price = parseFloat(input.dataset.price); // Obtener precio del dataset
            const total = quantity * price;
            subtotal += total;
            // Actualizar el total de cada producto
            document.querySelectorAll('.total-product')[index].textContent = `$${total.toFixed(2)}`;
        });
        // Mostrar el subtotal y total actualizados
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${subtotal.toFixed(2)}`; // Suponiendo envío gratis
    }

    // Event listeners para botones de incremento y decremento
    decrementButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const currentValue = parseInt(quantityInputs[index].value);
            if (currentValue > 1) {
                quantityInputs[index].value = currentValue - 1;
                updateTotals();
            }
        });
    });

    incrementButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const currentValue = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = currentValue + 1;
            updateTotals();
        });
    });

    // Event listener para botones de eliminar producto
    deleteButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Eliminar el producto de la lista
            this.closest('tr').remove();
            updateTotals();
        });
    });

    // Actualizar totales iniciales
    updateTotals();
});
// En tu archivo JavaScript (script.js), vamos a usar fetch para obtener los datos del archivo JSON 
//y luego rellenar dinámicamente las tarjetas de productos en la página principal.
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.row.row-cols-1.row-cols-md-3.g-4');

    // URL del archivo JSON o de la API (simulado con un array aquí)
    const url = './productos.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Filtrar productos por categoría (aquí se filtra por 'Dermocosmética' como ejemplo)
            const productosDermocosmetica = data.filter(producto => producto.categoria === 'Dermocosmética');

            // Mostrar productos en las tarjetas
            productosDermocosmetica.forEach(producto => {
                const card = `
                    <div class="col">
                        <div class="card h-100">
                            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="card-text">$${producto.precio}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="input-group">
                                        <button class="btn btn-outline-secondary" type="button" id="button-minus">-</button>
                                        <input type="text" id="quantity" class="form-control text-center" value="1" readonly>
                                        <button class="btn btn-outline-secondary" type="button" id="button-plus">+</button>
                                    </div>
                                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addToCartModal">Añadir al Carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
// Obtener todos los botones + y - dentro de las tarjetas
const buttonsPlus = document.querySelectorAll('.button-plus');
const buttonsMinus = document.querySelectorAll('.button-minus');
const quantityInputs = document.querySelectorAll('.quantity-input');

// Agregar evento clic para el botón +
buttonsPlus.forEach((button, index) => {
    button.addEventListener('click', () => {
        let currentValue = parseInt(quantityInputs[index].value);
        quantityInputs[index].value = currentValue + 1;
    });
});

// Agregar evento clic para el botón -
buttonsMinus.forEach((button, index) => {
    button.addEventListener('click', () => {
        let currentValue = parseInt(quantityInputs[index].value);
        if (currentValue > 1) {
            quantityInputs[index].value = currentValue - 1;
        }
    });
});