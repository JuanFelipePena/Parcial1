const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
var datos;
let carrito = JSON.parse('{ "items" : []}');
fetch(url).then(res=>res.json()).then(res=>{

    datos = res
    //console.log(datos)

    cargar()
})

function cargar () {
    let nav = document.getElementsByClassName("navbar-nav")[0];

    for(let i = 0; i < datos.length; i++) {

    let navItem = document.createElement("nav-link");
    navItem.innerHTML = `<a class="nav-item active nav-link" href="#">${datos[i].name}</a>` 
    navItem.addEventListener("click", function(){cargarComida(datos[i])}, false); 
    nav.appendChild(navItem)
}

let tituloActual = document.getElementById("tituloComida");
tituloActual.innerHTML = datos[0].name;

var fila = document.getElementsByClassName("row")[0];
let hamburguesas = datos[0].products;

for(let i = 0; i <hamburguesas.length; i++) {        
    celda = fila.children[i]

    celda.insertAdjacentHTML('beforeend', `<img src="${hamburguesas[i].image}" height="100" width="100">`);
    celda.insertAdjacentHTML('beforeend', `<h3>${hamburguesas[i].name}</h3>`);
    celda.insertAdjacentHTML('beforeend', `<p>${hamburguesas[i].description}</p>`);
    celda.insertAdjacentHTML('beforeend', `<p><strong>$ ${hamburguesas[i].price}</strong></p>`);
    celda.insertAdjacentHTML('beforeend', `<button type="button" class="btn btn-dark">Dark</button>`);
    
    let boton = celda.lastElementChild
    boton.addEventListener("click", function(){cargarACarrito(hamburguesas[i])}, false);
}

let navCarrito = document.getElementById("navCarrito");
navCarrito.addEventListener("click", function(){cargarOrden()}, false);
}


function cargarComida(element) {

    let tituloActual = document.getElementById("tituloComida");
    tituloActual.innerHTML = element.name;
    
    var fila = document.getElementsByClassName("row")[0];
    let productos = element.products;

    for(let i = 0; i < productos.length; i++) {
        
        celda = fila.children[i]
        celda.innerHTML = `<img src="${productos[i].image}" height="100" width="100">
        <h3>${productos[i].name}</h3>
        <p>${productos[i].description}</p>
        <p><strong>$ ${productos[i].price}</strong></p>
        <button type="button" class="btn btn-dark">Dark</button>`;

        let boton = celda.lastElementChild
        boton.addEventListener("click", function(){cargarACarrito(productos[i])}, false);
    }
}

function cargarACarrito(item) {

    carrito.items.push(item)
    texto = document.getElementById("navNumItems");
    texto.innerHTML = `${carrito.items.length} items`
}

function cargarOrden() {

    let tituloActual = document.getElementById("tituloComida");
    tituloActual.innerHTML = "Orden detail";
    
    var fila = document.getElementsByClassName("row")[0];
    let hijos = fila.children
    let length = hijos.length

for(let i = 0; i <length; i++) {
    fila.removeChild(hijos[0]);
}

    fila.insertAdjacentHTML('beforeend', `<table class="table"> </table>`);
    let tabla = fila.firstElementChild
    tabla.insertAdjacentHTML('beforeend', `<thead>
    <tr>
      <th scope="col">Item</th>
      <th scope="col">Qty.</th>
      <th scope="col">Description</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Unit Amount</th>
      <th scope="col">Unit Modify</th>
    </tr>
  </thead>`);
  tabla.insertAdjacentHTML('beforeend', `<tbody></tbody>`)

for(let i = 0; i <carrito.items.length; i++) {
    
    tabla.insertAdjacentHTML('beforeend', `<tr>
    <th scope="row">${i}</th>
    <td>1</td>
    <td>${carrito.items[i].name}</td>
    <td>${carrito.items[i].price}</td>
    <td>sumatoria</td>
    <td>boton</td>
  </tr>`);

}

tabla.insertAdjacentHTML('afterend', `<button type="button" class="btn btn-danger align: right">Cancel</button>`);
let boton = tabla.nextElementSibling
boton.addEventListener("click", function(){modalCancelarOrden()}, false);
}

function modalCancelarOrden() {
    console.log("xd")
    let body = document.getElementsByTagName("body")[0];
    console.log(body)
    body.insertAdjacentHTML('beforeend', `<div id="myModal" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
  
    </div>
  </div>`);

}