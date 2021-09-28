const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"
let datos;

fetch(url).then(res=>res.json()).then(res=>{

    datos = res
    console.log(datos)

    cargar()
})

async function cargar () {
    const nav = document.getElementsByClassName("navbar navbar-expand-lg navbar-light bg-light")[0];

    for(let i = 0; i < datos.length; i++) {

    const element = document.createElement("nav-item");
    element.innerHTML = `<a class="nav-item nav-link" href="#">${datos[i].name}</a>`
    //element.onclick = cargarContenido(datos[i])
    
    nav.appendChild(element)
}
}

async function cargarContenido(element) {

    //const sig = document.getElementsByTagName("b")[0];
    //console.log(sig)
    //const titulo = document.createElement("title");
    //sig.innerHTML = `${element.name}`
    
}