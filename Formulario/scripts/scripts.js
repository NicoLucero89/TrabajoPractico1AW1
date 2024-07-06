// LOGIN y LOGOUT

// Seleccionar el formulario y agregar un evento 'submit'
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe automáticamente

    // Aquí verificar las credenciales (por ejemplo, con una API o validación interna)

    // Simular que el login es exitoso 
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
    // Limpiar cualquier información de sesión (cookies, localStorage, etc.)
    sessionStorage.clear();
    localStorage.clear();

    // Redireccionar al login después del logout
    window.location.href = './login.html'; // Cambia 'login.html' por la ruta de tu página de login
});


// Almacenar la información del usuario logueado en sessionStorage
// Suponiendo que tengo el nombre de usuario al iniciar sesión
const username = "UsuarioEjemplo";
sessionStorage.setItem('username', username);

// Manejo del carrito de compras en la página de productos (dermocosmetica.html)

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
                                        <button class="btn btn-outline-secondary button-minus" type="button">-</button>
                                        <input type="text" class="form-control text-center quantity-input" value="1" readonly>
                                        <button class="btn btn-outline-secondary button-plus" type="button">+</button>
                                    </div>
                                    <button class="btn btn-primary add-to-cart-btn" data-bs-toggle="modal" data-bs-target="#addToCartModal" data-product='${JSON.stringify(producto)}'>Añadir al Carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += card;
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
                    updateTotals(); // Actualizar totales después de cambiar la cantidad
                });
            });

            // Agregar evento clic para el botón -
            buttonsMinus.forEach((button, index) => {
                button.addEventListener('click', () => {
                    let currentValue = parseInt(quantityInputs[index].value);
                    if (currentValue > 1) {
                        quantityInputs[index].value = currentValue - 1;
                        updateTotals(); // Actualizar totales después de cambiar la cantidad
                    }
                });
            });

            // Agregar evento clic para el botón 'Añadir al Carrito'
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const product = JSON.parse(this.getAttribute('data-product'));
                    addToCart(product);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// Función para agregar productos al carrito
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    cartItems.push(product);
    localStorage.setItem('productosEnCarrito', JSON.stringify(cartItems));
    console.log('Producto agregado al carrito:', product);
    updateCartBadge(); // Actualizar el contador del carrito
}

// Función para actualizar el subtotal y total
function updateTotals() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const subtotalElement = document.getElementById('subtotal');
    let subtotal = 0;

    quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value);
        const price = parseFloat(input.closest('.card-body').querySelector('.card-text').textContent.replace('$', ''));
        const total = quantity * price;
        subtotal += total;
        document.querySelectorAll('.total-product')[index].textContent = `$${total.toFixed(2)}`;
    });

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Función para actualizar el contador del carrito en la barra de navegación
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    const badgeElement = document.getElementById('cartBadge');
    badgeElement.textContent = cartItems.length;
}

// Ejecutar la función para actualizar el contador del carrito al cargar la página
updateCartBadge();



