// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let amigos = [];
let amigosSorteados = [];
let numeroSorteo = 0;

function agregarAmigo() {
    const elementoNombre = document.getElementById("amigo");
    
    // Eliminamos los espacios al inicio y al final
    nombre = elementoNombre.value.trim();

    if (nombre === "") {
        alert("Por favor, ingresa un nombre válido.");
        return;
    }

    if (amigos.includes(nombre)) {
        alert("Este nombre ya está en la lista.");
        return;
    }

    // Agregamos el nombre al final del arreglo
    amigos.push(nombre);
    amigosSorteados.push(nombre);
    elementoNombre.value = "";
    actualizarLista();
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    for (let i=0; i<amigos.length; i++) {
        nombre = amigos[i]
        const li = document.createElement("li");

        // Eliminamos nombres opcionalmente
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.classList.add("boton-eliminar");
        botonEliminar.onclick = () => eliminarAmigo(i);
        
        li.appendChild(botonEliminar);
        li.appendChild(document.createTextNode(nombre));
        lista.appendChild(li);
    }
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    amigosSorteados.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Agrega al menos dos amigos antes de sortear.");
        return;
    }

    // Bloqueamos el ingreso de más amigos una vez inicie el sorteo
    const txtAmigo = document.getElementById("amigo");
    txtAmigo.disabled = true;

    if (numeroSorteo == amigos.length) {
        alert("Se han sorteado todos los amigos! Se iniciará un nuevo sorteo!");
        txtAmigo.disabled = false;
        
        // Reiniciamos el juego
        amigos = [];
        numeroSorteo = 0;

        const lista = document.getElementById("listaAmigos");
        lista.innerHTML = "";
        const elementoResultado = document.getElementById("resultado");
        elementoResultado.innerHTML = "";
        return;
    }

    let indiceSorteo = 0;
    let amigoSecreto = "";
    const amigo = amigos[numeroSorteo]
    for (;;) {
        indiceSorteo = Math.floor(Math.random() * amigosSorteados.length);
        amigoSecreto = amigosSorteados[indiceSorteo];
        if (amigoSecreto != amigo) break;
    }
    
    amigosSorteados.splice(indiceSorteo, 1);

    const elementoResultado = document.getElementById("resultado");
    elementoResultado.innerHTML = `<li>🎉 El amigo secreto de ${amigo} es: <strong>${amigoSecreto}</strong> 🎉</li>`;
    numeroSorteo++;
}