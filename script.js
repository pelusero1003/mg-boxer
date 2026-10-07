let carrito = [];

const coloresLiso = {
    "Negro con cintura celeste": "imagenes/Adulto/catalogo/liso/boxer-liso-negro-celeste.png",
    "Negro con cintura fucsia": "imagenes/Adulto/catalogo/liso/liso-negro-cintura-fucsia.png",
    "Negro con cintura gris": "imagenes/Adulto/catalogo/liso/liso-negro-cintura-gris.png",
    "Gris claro": "imagenes/Adulto/catalogo/liso/liso-gris-claro.png",
    "Azul marino": "imagenes/Adulto/catalogo/liso/liso-azul-marino.png",
    "Azul marino con cintura fucsia": "imagenes/Adulto/catalogo/liso/liso-azul-marino-cintura-fucsia.png",
    "Azul intenso": "imagenes/Adulto/catalogo/liso/liso-azul-intenso.png",
    "Celeste": "imagenes/Adulto/catalogo/liso/liso-celeste.png",
    "Turquesa": "imagenes/Adulto/catalogo/liso/liso-turquesa.png"
};

const disenosEstampados = [
    { nombre: "Floral negro", archivo: "01-floral-negro.png", talles: ["S"] },
    { nombre: "Grafiti", archivo: "02-grafiti.png", talles: ["S"] },
    { nombre: "Camuflado verde", archivo: "03-camuflado-verde.png", talles: ["M", "L", "XL"] },
    { nombre: "Geométrico rojo y azul", archivo: "04-geometrico-rojo-azul.png", talles: ["L"] },
    { nombre: "Tipográfico rojo", archivo: "05-tipografico-rojo.png", talles: ["L", "XL"] },
    { nombre: "Telarañas", archivo: "06-telaranas.png", talles: ["S"] },
    { nombre: "Floral naranja", archivo: "07-floral-naranja.png", talles: ["L"] },
    { nombre: "Ondas azules", archivo: "08-ondas-azules.png", talles: ["S", "M", "L"] },
    { nombre: "Ondas grises", archivo: "09-ondas-grises.png", talles: ["S", "M", "L"] },
    { nombre: "Figuras amarillas", archivo: "10-figuras-amarillas.png", talles: ["L", "XL", "XXL"] },
    { nombre: "Abstracto gris y azul", archivo: "11-abstracto-gris-azul.png", talles: ["L", "XL"] },
    { nombre: "Panteras negras", archivo: "12-panteras-negras.png", talles: ["L", "XL"] },
    { nombre: "Collage azul 972", archivo: "13-collage-azul-972.png", talles: ["M", "XL"] },
    { nombre: "Collage amarillo 972", archivo: "14-collage-amarillo-972.png", talles: ["M", "XL"] },
    { nombre: "Hojas azules", archivo: "15-hojas-azules.png", talles: ["S", "M", "XL"] },
    { nombre: "Jaspeado blanco 980", archivo: "16-jaspeado-blanco-980.png", talles: ["L"] },
    { nombre: "Jaspeado azul 980", archivo: "17-jaspeado-azul-980.png", talles: ["XL"] },
    { nombre: "Jaspeado negro 980", archivo: "18-jaspeado-negro-980.png", talles: ["XL"] },
    { nombre: "Geométrico azul 982", archivo: "19-geometrico-azul-982.png", talles: ["M", "L", "XL"] }
];

const rutaEstampados = "imagenes/Adulto/catalogo/estampados/";

function iniciarGaleriaEstampados() {
    const selector = document.getElementById("diseno-estampado");
    const miniaturas = document.getElementById("miniaturas-estampado");

    if (!selector || !miniaturas) return;

    disenosEstampados.forEach(function(diseno, indice) {
        const opcion = document.createElement("option");
        opcion.value = indice;
        opcion.textContent = diseno.nombre;
        selector.appendChild(opcion);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "miniatura" + (indice === 0 ? " activa" : "");
        boton.dataset.indice = indice;
        boton.onclick = function() {
            selector.value = indice;
            cambiarDisenoEstampado();
        };

        const imagen = document.createElement("img");
        imagen.src = rutaEstampados + diseno.archivo;
        imagen.alt = diseno.nombre;
        boton.appendChild(imagen);
        miniaturas.appendChild(boton);
    });

    cambiarDisenoEstampado();
}

function cambiarDisenoEstampado() {
    const indice = Number(document.getElementById("diseno-estampado").value || 0);
    const diseno = disenosEstampados[indice];
    const imagen = document.getElementById("imagen-estampado");
    const selectorTalle = document.getElementById("talle-estampado");

    imagen.src = rutaEstampados + diseno.archivo;
    imagen.alt = "Bóxer estampado " + diseno.nombre.toLowerCase();
    selectorTalle.innerHTML = '<option value="">Seleccionar talle</option>';

    diseno.talles.forEach(function(talle) {
        const opcion = document.createElement("option");
        opcion.value = talle;
        opcion.textContent = talle;
        selectorTalle.appendChild(opcion);
    });

    document.querySelectorAll("#miniaturas-estampado .miniatura").forEach(function(miniatura) {
        miniatura.classList.toggle("activa", Number(miniatura.dataset.indice) === indice);
    });
}

function agregarProductoEstampado() {
    const indice = Number(document.getElementById("diseno-estampado").value || 0);
    const talle = document.getElementById("talle-estampado").value;

    if (talle === "") {
        alert("Elegí un talle.");
        return;
    }

    carrito.push({
        nombre: "Bóxer Estampado",
        precio: 15000,
        categoria: "Adulto",
        color: disenosEstampados[indice].nombre,
        talle: talle
    });

    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", iniciarGaleriaEstampados);

function seleccionarColorLiso(color) {
    const selectorColor = document.getElementById("color-liso");
    selectorColor.value = color;
    cambiarColorLiso();
}

function cambiarColorLiso() {
    const color = document.getElementById("color-liso").value;
    const imagen = document.getElementById("imagen-liso");

    imagen.src = coloresLiso[color];
    imagen.alt = "Bóxer liso " + color.toLowerCase();

    document.querySelectorAll("#miniaturas-liso .miniatura").forEach(function(miniatura) {
        miniatura.classList.toggle("activa", miniatura.dataset.color === color);
    });
}

function agregarProductoLiso() {
    const color = document.getElementById("color-liso").value;
    const talle = document.getElementById("talle-liso").value;

    if (talle === "") {
        alert("Elegí un talle.");
        return;
    }

    carrito.push({
        nombre: "Bóxer Liso",
        precio: 15000,
        categoria: "Adulto",
        color: color,
        talle: talle
    });

    mostrarCarrito();
}

function actualizarTalles(tipo) {
    const categoria = document.getElementById("categoria-" + tipo).value;
    const selectTalle = document.getElementById("talle-" + tipo);

    selectTalle.innerHTML = '<option value="">Seleccionar talle</option>';

    let talles = [];

    if (categoria === "nino") {
        talles = ["12", "14", "16"];
    }

    if (categoria === "adulto") {
        talles = ["S", "M", "L", "XL", "XXL", "XXXL"];
    }

    talles.forEach(function(talle) {
        const opcion = document.createElement("option");
        opcion.value = talle;
        opcion.textContent = talle;
        selectTalle.appendChild(opcion);
    });
}


function agregarProductoConTalle(nombre, precio, tipo) {

    const talle = document.getElementById("talle-" + tipo).value;

    if (talle === "") {
        alert("Elegí un talle.");
        return;
    }

    let categoria = "Adulto";

    if (tipo === "nino") {
        categoria = "Niño";
    }

    carrito.push({
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        color: "",
        talle: talle
    });

    mostrarCarrito();
}


function agregarProducto(nombre, precio) {
    carrito.push({
        nombre: nombre,
        precio: precio,
        categoria: "",
        color: "",
        talle: ""
    });

    mostrarCarrito();
}


function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    listaCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach(function(producto, indice) {
        const productoCarrito = document.createElement("div");

        let detalles = "";

        if (producto.categoria !== "" && producto.talle !== "") {
            detalles =
                " - " +
                producto.categoria +
                " - Talle " +
                producto.talle;
        }

        if (producto.color) {
            detalles += " - Color " + producto.color;
        }

        productoCarrito.innerHTML = `
            <p>
                ${producto.nombre}
                ${detalles}
                - $${producto.precio.toLocaleString("es-AR")}
                <button onclick="eliminarProducto(${indice})">X</button>
            </p>
        `;

        listaCarrito.appendChild(productoCarrito);

        total += producto.precio;
    });

    contador.textContent = carrito.length;
    totalElemento.textContent = total.toLocaleString("es-AR");

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    }
}


function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    mostrarCarrito();
}


function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}


function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("Agregá al menos un producto al carrito.");
        return;
    }

    let mensaje = "Hola MG Boxer! Quiero hacer este pedido:%0A%0A";
    let total = 0;

    carrito.forEach(function(producto) {
        mensaje += "- " + producto.nombre;

        if (producto.categoria !== "" && producto.talle !== "") {
            mensaje +=
                " - " +
                producto.categoria +
                " - Talle " +
                producto.talle;
        }

        if (producto.color) {
            mensaje += " - Color " + producto.color;
        }

        mensaje +=
            " - $" +
            producto.precio.toLocaleString("es-AR") +
            "%0A";

        total += producto.precio;
    });

    mensaje +=
        "%0ATotal: $" +
        total.toLocaleString("es-AR");

    const telefono = "+542944322149"; // Reemplazá con tu número de teléfono de WhatsApp

    window.open(
        "https://wa.me/" +
        telefono +
        "?text=" +
        mensaje,
        "_blank"
    );
}
