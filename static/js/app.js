/* =========================================================
   Aromas del Maule - Interacciones de la página
   1) Filtro de productos por categoría
   2) Carrito de compras (panel lateral + pedido por WhatsApp)
   3) Menú móvil
   4) Validación del formulario de contacto
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    // ---------- Utilidades ----------
    const $ = (selector) => document.querySelector(selector);
    const $$ = (selector) => document.querySelectorAll(selector);
    const formatoCLP = (n) => "$" + n.toLocaleString("es-CL");

    $("#anio").textContent = new Date().getFullYear();

    // ---------- 1) Filtro de productos ----------
    $$(".filtro").forEach((boton) => {
        boton.addEventListener("click", () => {
            $$(".filtro").forEach((b) => b.classList.remove("activo"));
            boton.classList.add("activo");

            const categoria = boton.dataset.filtro;
            $$(".producto").forEach((tarjeta) => {
                const coincide = categoria === "todos" || tarjeta.dataset.categoria === categoria;
                tarjeta.classList.toggle("oculto", !coincide);
            });
        });
    });

    // ---------- 2) Carrito ----------
    let carrito = []; // [{ id, nombre, precio, cantidad }]

    const panel = $("#panelCarrito");
    const fondo = $("#fondo");
    const lista = $("#listaCarrito");

    function mostrarAviso(texto) {
        const aviso = $("#aviso");
        aviso.textContent = texto;
        aviso.classList.add("visible");
        setTimeout(() => aviso.classList.remove("visible"), 1800);
    }

    function abrirCarrito() {
        panel.classList.add("abierto");
        fondo.classList.add("visible");
        panel.setAttribute("aria-hidden", "false");
    }

    function cerrarCarrito() {
        panel.classList.remove("abierto");
        fondo.classList.remove("visible");
        panel.setAttribute("aria-hidden", "true");
    }

    function dibujarCarrito() {
        const totalUnidades = carrito.reduce((suma, i) => suma + i.cantidad, 0);
        const totalPrecio = carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0);

        $("#contadorCarrito").textContent = totalUnidades;
        $("#totalCarrito").textContent = formatoCLP(totalPrecio);

        if (carrito.length === 0) {
            lista.innerHTML = '<li class="panel__vacio">Tu carrito está vacío ☕</li>';
        } else {
            lista.innerHTML = carrito
                .map(
                    (i) => `
                <li class="item">
                    <span class="item__nombre">${i.nombre}</span>
                    <span class="item__precio">${formatoCLP(i.precio * i.cantidad)}</span>
                    <div class="item__cant">
                        <button data-accion="restar" data-id="${i.id}" aria-label="Quitar uno">−</button>
                        <span>${i.cantidad}</span>
                        <button data-accion="sumar" data-id="${i.id}" aria-label="Agregar uno">+</button>
                    </div>
                </li>`
                )
                .join("");
        }

        // Enlace de pedido con el detalle del carrito
        const detalle = carrito.map((i) => `- ${i.cantidad} x ${i.nombre}`).join("\n");
        const mensaje = carrito.length
            ? `Hola! Quiero hacer este pedido:\n${detalle}\nTotal: ${formatoCLP(totalPrecio)}`
            : "Hola! Quiero hacer un pedido";
        $("#pedirCarrito").href = `https://wa.me/${window.WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
    }

    function agregarAlCarrito(producto) {
        const existente = carrito.find((i) => i.id === producto.id);
        if (existente) {
            existente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        dibujarCarrito();

        const contador = $("#btnCarrito");
        contador.classList.remove("pulso");
        void contador.offsetWidth; // reinicia la animación
        contador.classList.add("pulso");
        mostrarAviso(`${producto.nombre} agregado al carrito`);
    }

    $$(".btn-agregar").forEach((boton) => {
        boton.addEventListener("click", () => {
            agregarAlCarrito({
                id: Number(boton.dataset.id),
                nombre: boton.dataset.nombre,
                precio: Number(boton.dataset.precio),
            });
        });
    });

    lista.addEventListener("click", (e) => {
        const boton = e.target.closest("button[data-accion]");
        if (!boton) return;

        const item = carrito.find((i) => i.id === Number(boton.dataset.id));
        if (!item) return;

        item.cantidad += boton.dataset.accion === "sumar" ? 1 : -1;
        carrito = carrito.filter((i) => i.cantidad > 0);
        dibujarCarrito();
    });

    $("#btnCarrito").addEventListener("click", abrirCarrito);
    $("#cerrarCarrito").addEventListener("click", cerrarCarrito);
    fondo.addEventListener("click", cerrarCarrito);
    document.addEventListener("keydown", (e) => e.key === "Escape" && cerrarCarrito());
    $("#vaciarCarrito").addEventListener("click", () => {
        carrito = [];
        dibujarCarrito();
    });

    dibujarCarrito();

    // ---------- 3) Menú móvil ----------
    const nav = $("#nav");
    $("#btnMenu").addEventListener("click", () => nav.classList.toggle("abierto"));
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("abierto")));

    // ---------- 4) Validación del formulario ----------
    const form = $("#formContacto");
    const msg = $("#formMsg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const campos = [form.nombre, form.correo, form.mensaje];
        campos.forEach((c) => c.classList.remove("error"));
        msg.className = "formulario__msg";

        if (!form.nombre.value.trim()) {
            return marcarError(form.nombre, "Por favor escribe tu nombre.");
        }
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo.value.trim());
        if (!correoValido) {
            return marcarError(form.correo, "Ingresa un correo válido.");
        }
        if (form.mensaje.value.trim().length < 10) {
            return marcarError(form.mensaje, "El mensaje debe tener al menos 10 caracteres.");
        }

        msg.textContent = `¡Gracias, ${form.nombre.value.trim()}! Te responderemos pronto.`;
        msg.classList.add("ok-texto");
        form.reset();
    });

    function marcarError(campo, texto) {
        campo.classList.add("error");
        campo.focus();
        msg.textContent = texto;
        msg.classList.add("error-texto");
    }
});
