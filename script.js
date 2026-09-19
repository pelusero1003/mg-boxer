const CLAVE_CARRITO = "mgboxer-carrito";
const TELEFONO_WHATSAPP = "542944322149";

let carrito = [];

try {
    carrito = JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
} catch (e) {
    carrito = [];
}

function guardarCarrito() {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch (e) {}
}

let temporizadorAviso;

function mostrarAviso(texto) {
    const aviso = document.getElementById("aviso");
    const textoAviso = document.getElementById("aviso-texto");
    const contador = document.getElementById("contador");

    if (!aviso || !textoAviso || !contador) return;

    textoAviso.textContent = texto;
    aviso.classList.add("visible");
    contador.classList.remove("salto");
    void contador.offsetWidth;
    contador.classList.add("salto");

    clearTimeout(temporizadorAviso);
    temporizadorAviso = setTimeout(function() {
        aviso.classList.remove("visible");
    }, 3500);
}

function agregarAlCarrito(item) {
    const existente = carrito.find(function(producto) {
        return producto.nombre === item.nombre &&
            producto.categoria === item.categoria &&
            producto.color === item.color &&
            (producto.codigo || "") === (item.codigo || "") &&
            producto.talle === item.talle;
    });

    if (existente) {
        existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
        item.cantidad = 1;
        carrito.push(item);
    }

    mostrarCarrito();
    mostrarAviso(item.nombre + " agregado al carrito");
}

function textoDetalle(producto) {
    let detalle = "";

    if (producto.categoria && producto.talle) {
        detalle += " · " + producto.categoria + " · Talle " + producto.talle;
    }

    if (producto.color) {
        detalle += " · " + producto.color;
    }

    if (producto.codigo) {
        detalle += " · Código " + producto.codigo;
    }

    return detalle;
}

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
    { nombre: "Ondas azules", archivo: "08-ondas-azules.png", talles: ["L"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Ondas grises", codigo: "M964 3 G", archivo: "09-ondas-grises.png", talles: ["L"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Figuras amarillas", codigo: "M973 3 NG/AM", archivo: "10-figuras-amarillas.png", talles: ["L"] },
    { nombre: "Abstracto gris y azul", codigo: "M958 3 NG", archivo: "11-abstracto-gris-azul.png", talles: ["L"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Panteras negras", codigo: "M967 3 NG", archivo: "12-panteras-negras.png", talles: ["L"] },
    { nombre: "Collage azul 972", codigo: "M972 2 AZ", archivo: "13-collage-azul-972.png", talles: ["M"] },
    { nombre: "Collage amarillo 972", archivo: "14-collage-amarillo-972.png", talles: ["M"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Hojas azules", archivo: "15-hojas-azules.png", talles: ["S", "M", "XL"] },
    { nombre: "Jaspeado blanco 980", codigo: "M980 4 B", archivo: "16-jaspeado-blanco-980-lody.png", talles: ["XL"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] },
    { nombre: "Geométrico azul 982", archivo: "19-geometrico-azul-982.png", talles: ["M", "L", "XL"], agotado: true, tallesPedido: ["S", "M", "L", "XL", "XXL"] }
];

const rutaEstampados = "imagenes/Adulto/catalogo/estampados/";

function iniciarGaleriaEstampados() {
    const selector = document.getElementById("diseno-estampado");
    const miniaturas = document.getElementById("miniaturas-estampado");

    if (!selector || !miniaturas) return;

    disenosEstampados.forEach(function(diseno, indice) {
        const opcion = document.createElement("option");
        opcion.value = indice;
        const detalleCodigo = diseno.codigo ? " — " + diseno.codigo : "";
        opcion.textContent = diseno.nombre + detalleCodigo + (diseno.agotado ? " — AGOTADO" : "");
        selector.appendChild(opcion);

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "miniatura" + (indice === 0 ? " activa" : "") + (diseno.agotado ? " miniatura-agotada" : "");
        boton.dataset.indice = indice;
        if (diseno.agotado) {
            boton.setAttribute("aria-label", diseno.nombre + ", vendido y disponible por encargo");
        }
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
    const estado = document.getElementById("estado-estampado");
    const botonComprar = document.getElementById("boton-estampado");

    imagen.src = rutaEstampados + diseno.archivo;
    imagen.alt = "Bóxer estampado " + diseno.nombre.toLowerCase();
    selectorTalle.innerHTML = diseno.agotado
        ? '<option value="">Seleccionar talle para encargar</option>'
        : '<option value="">Seleccionar talle</option>';

    const tallesMostrados = diseno.agotado ? diseno.tallesPedido : diseno.talles;
    tallesMostrados.forEach(function(talle) {
        const opcion = document.createElement("option");
        opcion.value = talle;
        opcion.textContent = diseno.agotado ? talle + " (por encargo)" : talle;
        selectorTalle.appendChild(opcion);
    });

    if (diseno.agotado) {
        estado.textContent = "Vendido · Disponible nuevamente por pedido";
        estado.classList.add("visible");
        botonComprar.textContent = "PEDIR POR ENCARGO";
        botonComprar.classList.add("btn-encargo");
    } else {
        estado.textContent = "";
        estado.classList.remove("visible");
        botonComprar.textContent = "Comprar";
        botonComprar.classList.remove("btn-encargo");
    }

    document.querySelectorAll("#miniaturas-estampado .miniatura").forEach(function(miniatura) {
        miniatura.classList.toggle("activa", Number(miniatura.dataset.indice) === indice);
    });
}

function agregarProductoEstampado() {
    const indice = Number(document.getElementById("diseno-estampado").value || 0);
    const talle = document.getElementById("talle-estampado").value;
    const diseno = disenosEstampados[indice];

    if (talle === "") {
        alert("Elegí un talle.");
        return;
    }

    if (diseno.agotado) {
        pedirPorEncargoEstampado(diseno, talle);
        return;
    }

    agregarAlCarrito({
        nombre: "Bóxer Estampado",
        precio: 15000,
        categoria: "Adulto",
        color: diseno.nombre,
        codigo: diseno.codigo || "",
        talle: talle
    });
}

function pedirPorEncargoEstampado(diseno, talle) {
    const mensaje =
        "Hola MG Boxer! Quiero pedir por encargo:%0A%0A" +
        "- Bóxer Estampado" +
        "%0A- Diseño: " + encodeURIComponent(diseno.nombre) +
        (diseno.codigo ? "%0A- Código: " + encodeURIComponent(diseno.codigo) : "") +
        "%0A- Talle: " + encodeURIComponent(talle) +
        "%0A%0A¿Me avisás cuándo estaría disponible?";

    window.open("https://wa.me/542944322149?text=" + mensaje, "_blank");
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

    agregarAlCarrito({
        nombre: "Bóxer Liso",
        precio: 15000,
        categoria: "Adulto",
        color: color,
        codigo: "",
        talle: talle
    });
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

    agregarAlCarrito({
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        color: "",
        codigo: "",
        talle: talle
    });
}


function agregarProducto(nombre, precio) {
    agregarAlCarrito({
        nombre: nombre,
        precio: precio,
        categoria: "",
        color: "",
        codigo: "",
        talle: ""
    });
}


function mostrarCarrito() {
    const listaCarrito = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    listaCarrito.innerHTML = "";

    let total = 0;
    let unidades = 0;

    carrito.forEach(function(producto, indice) {
        if (!producto.cantidad) producto.cantidad = 1;

        const fila = document.createElement("div");
        fila.className = "fila-carrito";

        const informacion = document.createElement("div");
        informacion.className = "producto-carrito-info";

        const nombre = document.createElement("strong");
        nombre.textContent = producto.nombre;

        const detalle = document.createElement("span");
        detalle.textContent = textoDetalle(producto);

        const subtotal = document.createElement("span");
        subtotal.className = "subtotal-carrito";
        subtotal.textContent = "$" + (producto.precio * producto.cantidad).toLocaleString("es-AR");

        informacion.append(nombre, detalle, subtotal);

        const controles = document.createElement("div");
        controles.className = "controles-carrito";

        const menos = document.createElement("button");
        menos.type = "button";
        menos.className = "boton-cantidad";
        menos.textContent = "−";
        menos.setAttribute("aria-label", "Quitar una unidad");
        menos.onclick = function() { cambiarCantidad(indice, -1); };

        const cantidad = document.createElement("strong");
        cantidad.className = "numero-cantidad";
        cantidad.textContent = producto.cantidad;

        const mas = document.createElement("button");
        mas.type = "button";
        mas.className = "boton-cantidad";
        mas.textContent = "+";
        mas.setAttribute("aria-label", "Agregar una unidad");
        mas.onclick = function() { cambiarCantidad(indice, 1); };

        const eliminar = document.createElement("button");
        eliminar.type = "button";
        eliminar.className = "boton-eliminar";
        eliminar.textContent = "Eliminar";
        eliminar.onclick = function() { eliminarProducto(indice); };

        controles.append(menos, cantidad, mas, eliminar);
        fila.append(informacion, controles);
        listaCarrito.appendChild(fila);

        total += producto.precio * producto.cantidad;
        unidades += producto.cantidad;
    });

    contador.textContent = unidades;
    totalElemento.textContent = total.toLocaleString("es-AR");

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    }

    guardarCarrito();
}


function cambiarCantidad(indice, cambio) {
    carrito[indice].cantidad = (carrito[indice].cantidad || 1) + cambio;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    mostrarCarrito();
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

    let mensaje = "Hola MG Boxer! Quiero hacer este pedido:\n\n";
    let total = 0;

    carrito.forEach(function(producto) {
        const cantidad = producto.cantidad || 1;
        mensaje +=
            "- " + cantidad + " x " + producto.nombre +
            textoDetalle(producto) +
            " · $" + (producto.precio * cantidad).toLocaleString("es-AR") +
            "\n";

        total += producto.precio * cantidad;
    });

    mensaje += "\nTotal: $" + total.toLocaleString("es-AR");

    window.open(
        "https://wa.me/" + TELEFONO_WHATSAPP + "?text=" + encodeURIComponent(mensaje),
        "_blank"
    );
}

function enviarOpinion() {
    const experiencia = document.querySelector('input[name="experiencia"]:checked');
    const comentario = document.getElementById("comentario-opinion").value.trim();

    if (!experiencia) {
        alert("Elegí una opción para contarnos cómo fue tu experiencia.");
        return;
    }

    let mensaje = "Hola MG Boxer! Quiero dejar una opinión sobre la página:%0A%0A";
    mensaje += "- Experiencia: " + encodeURIComponent(experiencia.value);
    if (comentario) {
        mensaje += "%0A- Comentario: " + encodeURIComponent(comentario);
    }

    window.open("https://wa.me/542944322149?text=" + mensaje, "_blank");
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
